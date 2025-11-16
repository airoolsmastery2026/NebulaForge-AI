
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { useI18n } from '../hooks/useI18n';
import { Code } from './LucideIcons';

interface PlaceholderPageProps {
    title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
    const { t } = useI18n();
    return (
        <div className="flex items-center justify-center h-full">
            <Card className="p-8 text-center max-w-lg">
                <CardHeader>
                    <Code className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription>
                        {t('placeholder.underConstruction')}
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
};
