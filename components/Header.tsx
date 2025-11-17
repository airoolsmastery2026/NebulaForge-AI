import React, { useState, useEffect } from 'react';
import { MenuIcon } from './Icons';
import { useI18n } from '../hooks/useI18n';
import { LanguageSwitcher } from './common/LanguageSwitcher';
import { HeaderClock } from './common/HeaderClock';
import { isGeminiApiActive } from '../services/geminiService';
import { useAppContext } from '../contexts/AppContext';
import { getSupabaseClient } from '../services/supabaseClient';
import { Users, Github, Cloud, CloudCheck, CloudX } from './LucideIcons';
import { Button } from './common/Button';

interface HeaderProps {
    toggleSidebar: () => void;
}

const SyncStatusIndicator: React.FC = () => {
    const { syncStatus } = useAppContext();
    const { t } = useI18n();

    const statusMap = {
        idle: { Icon: CloudCheck, color: 'text-gray-500', title: 'Data saved locally.' },
        syncing: { Icon: Cloud, color: 'text-blue-400 animate-pulse', title: 'Syncing data with GitHub...' },
        success: { Icon: CloudCheck, color: 'text-green-400', title: 'Data successfully synced to GitHub.' },
        error: { Icon: CloudX, color: 'text-red-400', title: 'Failed to sync data with GitHub.' },
    };

    const { Icon, color, title } = statusMap[syncStatus];

    return (
        <div title={title}>
            <Icon className={`w-5 h-5 transition-colors ${color}`} />
        </div>
    );
};

const SystemStatusIndicator: React.FC = () => {
    const { t } = useI18n();
    const [isActive, setIsActive] = useState(isGeminiApiActive);

    useEffect(() => {
        // Listen for storage changes to react to API key updates from the Connections page
        const handleStorageChange = () => {
            setIsActive(isGeminiApiActive());
        };
        window.addEventListener('storage', handleStorageChange);
        
        // Also check periodically
        const intervalId = setInterval(() => setIsActive(isGeminiApiActive()), 2000);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(intervalId);
        };
    }, []);

    const title = isActive ? t('header.statusActive') : t('header.statusInactive');

    return (
        <div className="flex items-center space-x-2" title={title}>
            <div className="relative flex h-3 w-3">
                {isActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </div>
            <span className={`text-sm font-medium hidden lg:block ${isActive ? 'text-green-400' : 'text-red-400'}`}>
                {isActive ? t('header.statusActive') : t('header.statusInactive')}
            </span>
        </div>
    );
};

const UserProfile: React.FC = () => {
    const { session, login, logout, addNotification } = useAppContext();
    const { t } = useI18n();

    const handleLogin = () => {
        const supabase = getSupabaseClient();
        if (supabase) {
            login();
        } else {
            addNotification({ type: 'warning', message: 'Please configure Supabase in Connections to log in.' });
        }
    };
    
    if (!session) {
        return <Button onClick={handleLogin} size="sm" variant="secondary" icon={<Github className="h-4 w-4"/>}>Login</Button>;
    }

    const { user } = session;
    const userName = user.user_metadata?.full_name || user.user_metadata?.name || user.email || 'User';
    const avatarUrl = user.user_metadata?.avatar_url;

    return (
        <div className="flex items-center space-x-3">
            {avatarUrl ? (
                <img src={avatarUrl} alt={userName} className="w-8 h-8 rounded-full" />
            ) : (
                <Users className="w-8 h-8 p-1 bg-gray-700 rounded-full" />
            )}
            <div className="hidden md:block">
                <p className="text-sm font-semibold truncate max-w-[150px]">{userName}</p>
                <button onClick={logout} className="text-xs text-gray-400 hover:text-red-400">Logout</button>
            </div>
        </div>
    );
};

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const { t } = useI18n();
    return (
        <header className="relative z-10 flex-shrink-0 flex h-16 bg-gray-900/60 backdrop-blur-md border-b border-gray-200/10 items-center justify-between px-4 sm:px-6 lg:px-8">
             <div className="flex items-center">
                <button
                    type="button"
                    className="px-4 -ml-4 border-r border-gray-200/10 text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
                    onClick={toggleSidebar}
                >
                    <span className="sr-only">Open sidebar</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="hidden sm:flex items-center space-x-4">
                     <h1 className="text-xl font-semibold text-gray-100 ">{t('appName')}</h1>
                     <SystemStatusIndicator />
                </div>
            </div>
            
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                <HeaderClock />
            </div>

            <div className="flex items-center space-x-4">
                <SyncStatusIndicator />
                <LanguageSwitcher />
                <div className="h-8 w-px bg-gray-700" />
                <UserProfile />
            </div>
        </header>
    );
};