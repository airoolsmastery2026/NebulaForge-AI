
import React, { createContext, useState, useCallback, useContext } from 'react';
import type { AppNotification } from '../types';

interface AppContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    notifications: AppNotification[];
    addNotification: (notification: Omit<AppNotification, 'id'>) => void;
    removeNotification: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [notifications, setNotifications] = useState<AppNotification[]>([]);

    const login = useCallback(() => setIsAuthenticated(true), []);
    const logout = useCallback(() => setIsAuthenticated(false), []);

    const addNotification = useCallback((notification: Omit<AppNotification, 'id'>) => {
        const id = Date.now();
        setNotifications(prev => [{ ...notification, id }, ...prev]);
    }, []);

    const removeNotification = useCallback((id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    return (
        <AppContext.Provider value={{ isAuthenticated, login, logout, notifications, addNotification, removeNotification }}>
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