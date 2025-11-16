import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';
import type { AppNotification, User, Session } from '../types';
import { getSupabaseClient } from '../services/supabaseClient';

interface AppContextType {
    session: Session | null;
    user: User | null;
    login: () => void;
    logout: () => void;
    notifications: AppNotification[];
    addNotification: (notification: Omit<AppNotification, 'id'>) => void;
    removeNotification: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [notifications, setNotifications] = useState<AppNotification[]>([]);

    const addNotification = useCallback((notification: Omit<AppNotification, 'id'>) => {
        const id = Date.now();
        setNotifications(prev => [{ ...notification, id }, ...prev]);
    }, []);

    const removeNotification = useCallback((id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

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
        <AppContext.Provider value={{ session, user, login, logout, notifications, addNotification, removeNotification }}>
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