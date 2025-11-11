import React, { useState, useEffect } from 'react';
import type { ProductWithContent, ScheduledPost, Connection } from '../types';
import { Card, CardHeader, CardTitle } from './common/Card';
import { Button } from './common/Button';
import { useI18n } from '../hooks/useI18n';
import { X } from './LucideIcons';
import { PlatformLogo } from './PlatformLogo';

interface PostSchedulerModalProps {
    product: ProductWithContent;
    onClose: () => void;
    onSchedule: (post: Omit<ScheduledPost, 'id' | 'status'>) => void;
}

const socialPlatforms = [
    'youtube', 'tiktok', 'instagram', 'x_twitter', 'pinterest', 'telegram', 'zalo', 'facebook_ads', 'tiktok_ads', 'youtube_partner', 'instagram_affiliate', 'twitter_affiliate'
];

export const PostSchedulerModal: React.FC<PostSchedulerModalProps> = ({ product, onClose, onSchedule }) => {
    const { t } = useI18n();
    const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [content, setContent] = useState(product.content.captions?.caption || '');
    
    // Set default schedule time to tomorrow at 9 AM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    const defaultScheduleDate = tomorrow.toISOString().slice(0, 16);
    
    const [scheduledAt, setScheduledAt] = useState(defaultScheduleDate);

    useEffect(() => {
        try {
            const storedConnections: Record<string, Connection> = JSON.parse(localStorage.getItem('universal-connections') || '{}');
            const activeSocial = Object.keys(storedConnections).filter(id => socialPlatforms.includes(id));
            setConnectedPlatforms(activeSocial);
            // Pre-select all connected platforms
            setSelectedPlatforms(activeSocial);
        } catch (e) {
            console.error("Failed to load connections for scheduler", e);
        }
    }, []);

    const togglePlatform = (platformId: string) => {
        setSelectedPlatforms(prev =>
            prev.includes(platformId)
                ? prev.filter(id => id !== platformId)
                : [...prev, platformId]
        );
    };

    const handleSubmit = () => {
        if (!content || selectedPlatforms.length === 0 || !scheduledAt) return;
        onSchedule({
            productId: product.id,
            productName: product.name,
            platforms: selectedPlatforms,
            content,
            scheduledAt,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="glass-card w-full max-w-lg rounded-lg shadow-2xl" onClick={e => e.stopPropagation()}>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>{t('publisher.modalTitle', { productName: product.name })}</CardTitle>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </CardHeader>
                <div className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">{t('publisher.modalContentLabel')}</label>
                        <textarea
                            rows={5}
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            className="w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">{t('publisher.modalPlatformsLabel')}</label>
                        <div className="flex flex-wrap gap-2">
                            {connectedPlatforms.length > 0 ? connectedPlatforms.map(platformId => (
                                <button
                                    key={platformId}
                                    onClick={() => togglePlatform(platformId)}
                                    className={`p-2 rounded-lg transition-colors border-2 ${selectedPlatforms.includes(platformId) ? 'bg-primary-500/20 border-primary-500' : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'}`}
                                >
                                    <PlatformLogo platformId={platformId} className="w-6 h-6" />
                                </button>
                            )) : (
                                <p className="text-sm text-gray-400">{t('publisher.noPlatformsConnected')}</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="schedule-time" className="block text-sm font-medium text-gray-300 mb-1">{t('publisher.modalScheduleTimeLabel')}</label>
                        <input
                            id="schedule-time"
                            type="datetime-local"
                            value={scheduledAt}
                            onChange={e => setScheduledAt(e.target.value)}
                            className="w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        />
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                        <Button variant="secondary" onClick={onClose}>{t('publisher.modalCancelButton')}</Button>
                        <Button onClick={handleSubmit}>{t('publisher.modalScheduleButton')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};