
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { Button } from './common/Button';
import { useI18n } from '../hooks/useI18n';
import { Zap, BarChart3, Calendar, Bot, Share2 } from './LucideIcons';

interface ControlHubProps {
    platform: string;
    isEcommerce?: boolean;
}

export const ControlHub: React.FC<ControlHubProps> = ({ platform, isEcommerce = false }) => {
    const { t } = useI18n();

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-col md:flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl">{platform} Control Hub</CardTitle>
                        <CardDescription>{t('controlHub.description', { platform })}</CardDescription>
                    </div>
                    <div className="flex space-x-2 mt-4 md:mt-0">
                        <Button variant="secondary">{t('controlHub.disconnectButton')}</Button>
                        <Button icon={<Zap className="h-4 w-4" />}>{t('controlHub.connectButton')}</Button>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>{t('controlHub.dataPanel')}</CardTitle>
                    </CardHeader>
                    <div className="p-4 text-center text-gray-400 h-64 flex items-center justify-center">
                        {isEcommerce ? 'E-commerce data will be displayed here.' : 'Social media data will be displayed here.'}
                    </div>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{t('controlHub.analysisModule')}</CardTitle>
                    </CardHeader>
                    <div className="p-4 text-center text-gray-400 h-64 flex items-center justify-center">
                        <BarChart3 className="w-16 h-16 text-gray-600" />
                    </div>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{t('controlHub.postingSchedule')}</CardTitle>
                    </CardHeader>
                     <div className="p-4 text-center text-gray-400 h-48 flex items-center justify-center">
                        <Calendar className="w-16 h-16 text-gray-600" />
                    </div>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>{t('controlHub.statistics')}</CardTitle>
                    </CardHeader>
                     <div className="p-4 text-center text-gray-400 h-48 flex items-center justify-center">
                       <Share2 className="w-16 h-16 text-gray-600" />
                    </div>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>{t('controlHub.autoRun')}</CardTitle>
                    </CardHeader>
                     <div className="p-4 text-center text-gray-400 h-48 flex items-center justify-center">
                        <Button size="lg" icon={<Bot className="h-5 w-5"/>}>{t('controlHub.autoRun')}</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};
