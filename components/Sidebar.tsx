

import React, { useState, useMemo, useEffect } from 'react';
import { Page } from '../types';
import { AnalyticsIcon, DashboardIcon, EditIcon, PublishIcon, SearchIcon, CloseIcon, SparklesIcon, ConnectIcon, TemplateIcon } from './Icons';
import { Video, BookOpen, KeyRound, Film, Github, Bot, ShoppingCart, Users, Code, Settings, MessageSquare, Briefcase, ChevronDown } from './LucideIcons';
import { useI18n } from '../hooks/useI18n';

const Logo = () => {
    const { t } = useI18n();
    return (
        <div className="flex items-center space-x-3 font-digital">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                <path d="M5 3L3 5l2 2 4 4-2 2-2 2 2 2 2-2 2-2 4 4 2 2 2-2-12-12-2-2z"/>
                <path d="m19 21-2-2"/>
                <path d="m21 19-2-2"/>
            </svg>
            <span className="text-xl font-bold text-gray-100 tracking-wider">{t('appName')}</span>
        </div>
    );
};

const navigationGroups = [
    {
        name: 'sidebar.group1',
        items: [
            { name: Page.DASHBOARD, icon: DashboardIcon },
            { name: Page.AUTOMATION, icon: SparklesIcon },
            { name: Page.APP_GUIDE, icon: BookOpen },
        ]
    },
    {
        name: 'sidebar.group2',
        items: [
            { name: Page.PRODUCT_SCOUT, icon: SearchIcon },
            { name: Page.CONTENT_GENERATOR, icon: EditIcon },
            { name: Page.PUBLISHER, icon: PublishIcon },
            { name: Page.AI_VIDEO_STUDIO, icon: Film },
            { name: Page.RENDER_QUEUE, icon: Video },
            { name: Page.PROMPT_TEMPLATES, icon: TemplateIcon },
        ]
    },
    {
        name: 'sidebar.group3',
        items: [
            { name: Page.FACEBOOK_HUB, icon: Bot },
            { name: Page.TIKTOK_HUB, icon: Bot },
            { name: Page.YOUTUBE_HUB, icon: Bot },
            { name: Page.ZALO_HUB, icon: MessageSquare },
            { name: Page.TELEGRAM_HUB, icon: MessageSquare },
            { name: Page.INSTAGRAM_HUB, icon: Bot },
        ]
    },
    {
        name: 'sidebar.group4',
        items: [
            { name: Page.SHOPEE_HUB, icon: ShoppingCart },
            { name: Page.LAZADA_HUB, icon: ShoppingCart },
            { name: Page.TIKI_HUB, icon: ShoppingCart },
            { name: Page.AMAZON_HUB, icon: Briefcase },
        ]
    },
    {
        name: 'sidebar.group5',
        items: [
            { name: Page.CONNECTIONS, icon: ConnectIcon },
            { name: Page.ANALYTICS, icon: AnalyticsIcon },
        ]
    }
];

const NavLink: React.FC<{
    page: Page;
    icon: React.ElementType;
    currentPage: Page;
    onClick: () => void;
}> = ({ page, icon: Icon, currentPage, onClick }) => {
    const { t } = useI18n();
    const isActive = currentPage === page;
    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className={`relative flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors group
            ${isActive
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
        >
            <div className={`absolute left-0 w-1 h-full rounded-r-sm bg-cyan-400 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 scale-y-0 group-hover:opacity-50 group-hover:scale-y-75'}`}></div>
            <Icon className="mr-3 h-5 w-5" />
            <span className="font-sans">{t(page)}</span>
        </a>
    );
}

const NavGroup: React.FC<{
    group: { name: string; items: { name: Page; icon: React.ElementType }[] };
    currentPage: Page;
    onNavigate: (page: Page) => void;
}> = ({ group, currentPage, onNavigate }) => {
    const { t } = useI18n();
    const isGroupActive = useMemo(() => 
        group.items.some(item => item.name === currentPage), 
        [group.items, currentPage]
    );

    const [isOpen, setIsOpen] = useState(isGroupActive || group.name === 'sidebar.group1');

    useEffect(() => {
        if (isGroupActive) {
            setIsOpen(true);
        }
    }, [isGroupActive]);
    
    return (
        <div className="py-1">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider font-sans hover:text-gray-300 transition-colors rounded-md"
                aria-expanded={isOpen}
            >
                <span>{t(group.name)}</span>
                <ChevronDown 
                    className={`h-4 w-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                    aria-hidden="true"
                />
            </button>
            <div 
                className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
            >
                <div className="space-y-1 pt-1 px-2">
                    {group.items.map((item) => (
                        <NavLink
                            key={item.name}
                            page={item.name}
                            icon={item.icon}
                            currentPage={currentPage}
                            onClick={() => onNavigate(item.name)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const SidebarContent: React.FC<{ currentPage: Page, onNavigate: (page: Page) => void }> = ({ currentPage, onNavigate }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-center px-4 h-16 border-b border-cyan-400/10">
                <Logo />
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                {navigationGroups.map((group) => (
                   <NavGroup 
                        key={group.name}
                        group={group}
                        currentPage={currentPage}
                        onNavigate={onNavigate}
                    />
                ))}
            </nav>
        </div>
    );
};

export const Sidebar: React.FC<{
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}> = ({ currentPage, setCurrentPage, isOpen, setOpen }) => {
    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
        setOpen(false); // Close sidebar on mobile after navigation
    };
    
    return (
        <>
            {/* Mobile sidebar with overlay */}
            <div className={`fixed inset-0 z-40 flex md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <div className="fixed inset-0 bg-black/60" onClick={() => setOpen(false)}></div>
                <div className="relative flex w-full max-w-xs flex-1 flex-col glass-card border-r border-cyan-400/20">
                     <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setOpen(false)}
                        >
                            <span className="sr-only">Close sidebar</span>
                            <CloseIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                    </div>
                    <SidebarContent currentPage={currentPage} onNavigate={handleNavigate} />
                </div>
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:inset-y-0">
                <div className="flex flex-col flex-grow glass-card border-r-0">
                    <SidebarContent currentPage={currentPage} onNavigate={handleNavigate} />
                </div>
            </div>
        </>
    );
};