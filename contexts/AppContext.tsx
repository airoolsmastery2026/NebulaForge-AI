import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';
import type { AppNotification, User, Session } from '../types';
import { getSupabaseClient } from '../services/supabaseClient';
import { triggerVercelDeploy } from '../services/deploymentService';

type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

interface AppContextType {
    session: Session | null;
    user: User | null;
    login: () => void;
    logout: () => void;
    notifications: AppNotification[];
    addNotification: (notification: Omit<AppNotification, 'id'>) => void;
    removeNotification: (id: number) => void;
    syncStatus: SyncStatus;
    setSyncStatus: (status: SyncStatus) => void;
    isDeploying: boolean;
    deployApp: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
    const [isDeploying, setIsDeploying] = useState(false);
    
    // FIX: Explicitly initialize useRef with undefined to satisfy older/stricter type checkers that expect an argument.
    const syncStatusTimeoutRef = React.useRef<number | undefined>(undefined);

    const handleSetSyncStatus = useCallback((status: SyncStatus) => {
        setSyncStatus(status);
        clearTimeout(syncStatusTimeoutRef.current);
        if (status === 'success' || status === 'error') {
            syncStatusTimeoutRef.current = window.setTimeout(() => {
                setSyncStatus('idle');
            }, 3000);
        }
    }, []);

    const addNotification = useCallback((notification: Omit<AppNotification, 'id'>) => {
        const id = Date.now();
        setNotifications(prev => [{ ...notification, id }, ...prev]);
    }, []);

    const removeNotification = useCallback((id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const deployApp = useCallback(async () => {
        setIsDeploying(true);
        const result = await triggerVercelDeploy();
        if (result.success) {
            addNotification({ type: 'success', message: result.message });
        } else {
            addNotification({ type: 'error', message: result.message });
        }
        setIsDeploying(false);
    }, [addNotification]);

    const setupAuthListener = useCallback(() => {
        const supabase = getSupabaseClient();
        if (!supabase) {
            setSession(null);
            setUser(null);
            return () => {};
        }

        supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
            setSession(currentSession as Session | null);
            setUser(currentSession?.user as User | null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession as Session | null);
            setUser(newSession?.user as User | null);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = setupAuthListener();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'universal-connections') {
                 // Simple way to re-initialize Supabase client and auth listener
                 window.location.reload();
            }
        };
        
        window.addEventListener('storage', handleStorageChange);

        return () => {
            unsubscribe();
            window.removeEventListener('storage', handleStorageChange);
            clearTimeout(syncStatusTimeoutRef.current);
        };
    }, [setupAuthListener]);


    const login = useCallback(async () => {
        const supabase = getSupabaseClient();
        if (supabase) {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
            });
            if (error) {
                addNotification({ type: 'error', message: `Login failed: ${error.message}` });
            }
        } else {
            addNotification({ type: 'warning', message: 'Supabase is not configured. Please set it up in Connections.' });
        }
    }, [addNotification]);

    const logout = useCallback(async () => {
        const supabase = getSupabaseClient();
        if (supabase) {
            const { error } = await supabase.auth.signOut();
            if (error) {
                addNotification({ type: 'error', message: `Logout failed: ${error.message}` });
            }
        }
    }, [addNotification]);
    
    return (
        <AppContext.Provider value={{ session, user, login, logout, notifications, addNotification, removeNotification, syncStatus, setSyncStatus: handleSetSyncStatus, isDeploying, deployApp }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
