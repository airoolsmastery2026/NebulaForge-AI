import React, { useState } from 'react';
import type { Product, AIModel } from '../types';
import { Button } from './common/Button';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { Bot, Link } from './LucideIcons';
import { useI18n } from '../hooks/useI18n';
import { scrapeProductInfo } from '../services/geminiService';
import { Spinner } from './common/Spinner';
import { QualitySelector } from './common/QualitySelector';

interface ProductScoutProps {
    onStartPipeline: (product: Product, model: AIModel) => void;
}

export const ProductScout: React.FC<ProductScoutProps> = ({ onStartPipeline }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [selectedModel, setSelectedModel] = useState<AIModel>('VEO 3.1 (Fast)');
    const [error, setError] = useState<string | null>(null);
    const { t } = useI18n();

    const handleScout = async () => {
        if (!url.trim()) return;
        setIsLoading(true);
        setError(null);
        try {
            const product = await scrapeProductInfo(url);
            if (product) {
                onStartPipeline(product, selectedModel);
                setUrl(''); // Clear input on success
            } else {
                setError(t('productScout.scrapeError'));
            }
        } catch (e) {
            setError(t('productScout.scrapeError'));
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{t('productScout.title')}</CardTitle>
                    <CardDescription>{t('productScout.description')}</CardDescription>
                </CardHeader>
                <div className="p-4 space-y-4">
                    <div>
                        <label htmlFor="product-url" className="block text-sm font-medium text-gray-300 mb-2">
                           {t('productScout.urlLabel')}
                        </label>
                        <div className="relative">
                            <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                id="product-url"
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder={t('productScout.urlPlaceholder')}
                                className="w-full bg-gray-800/50 border border-gray-600 rounded-md pl-10 pr-3 py-2 text-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <QualitySelector selectedModel={selectedModel} onChange={setSelectedModel} />
                    </div>

                    {error && <p className="text-center text-sm text-red-400">{error}</p>}
                    
                    <div className="flex justify-center pt-2">
                        <Button
                            onClick={handleScout}
                            isLoading={isLoading}
                            disabled={isLoading || !url.trim()}
                            icon={<Bot className="h-5 w-5"/>}
                            size="lg"
                        >
                            {isLoading ? t('productScout.buttonLoading') : t('productScout.button')}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};