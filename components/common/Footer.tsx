


import React from 'react';
import { useI18n } from '../../hooks/useI18n';

export const Footer: React.FC = () => {
    const { t } = useI18n();
    return (
        <footer className="flex-shrink-0 px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-400 bg-gray-900/70 backdrop-blur-md border-t border-gray-500/30">
            <p>{t('appName')} - {t('appSlogan')}</p>
            <p className="mt-1">{t('copyright', { year: new Date().getFullYear().toString() })}</p>
        </footer>
    );
};