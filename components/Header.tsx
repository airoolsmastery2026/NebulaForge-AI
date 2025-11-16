


import React, { useState, useEffect } from 'react';
import { MenuIcon } from './Icons';
import { useI18n } from '../hooks/useI18n';
import { LanguageSwitcher } from './common/LanguageSwitcher';
import { HeaderClock } from './common/HeaderClock';
import { isGeminiApiActive } from '../services/geminiService';

interface HeaderProps {
    toggleSidebar: () => void;
}

const SystemStatusIndicator: React.FC = () => {
    const { t } = useI18n();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const checkApiStatus = () => {
            setIsActive(isGeminiApiActive());
        };
        
        checkApiStatus();
        const intervalId = setInterval(checkApiStatus, 2000); // Check frequently to be responsive
        
        return () => {
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
            
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <HeaderClock />
            </div>

            <div className="flex items-center space-x-2">
                <LanguageSwitcher />
            </div>
        </header>
    );
};