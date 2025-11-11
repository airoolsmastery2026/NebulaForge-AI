import React, { useState } from 'react';
import type { ProductWithContent, RenderJob, ScheduledPost } from '../types';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { Button } from './common/Button';
import { useI18n } from '../hooks/useI18n';
import { startVideoGeneration, generateSpeech } from '../services/geminiService';
import { PostSchedulerModal } from './PostSchedulerModal';
import { Calendar } from './LucideIcons';

interface PublisherProps {
    productsWithContent: ProductWithContent[];
    onAddRenderJob: (job: Omit<RenderJob, 'id'>) => void;
    scheduledPosts: ScheduledPost[];
    onAddScheduledPost: (post: Omit<ScheduledPost, 'id' | 'status'>) => void;
}

export const Publisher: React.FC<PublisherProps> = ({ productsWithContent, onAddRenderJob, scheduledPosts, onAddScheduledPost }) => {
    const [creatingVideo, setCreatingVideo] = useState<string | null>(null);
    const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductWithContent | null>(null);
    const { t } = useI18n();

    const handleCreateVideo = async (product: ProductWithContent) => {
        setCreatingVideo(product.id);
        try {
            const [audioData, videoOperation] = await Promise.all([
                generateSpeech(product.content.script || 'No script available.'),
                startVideoGeneration(product)
            ]);

            if (!videoOperation) {
                 throw new Error("Video generation failed to start.");
            }

            onAddRenderJob({
                productName: product.name,
                status: 'Queued',
                progress: 0,
                createdAt: new Date().toISOString(),
                models: ['VEO 3.1', 'gemini-2.5-flash-preview-tts'],
                videoOperation,
                audioData,
            });
        } catch (error) {
            console.error("Failed to create video job:", error);
        } finally {
            setCreatingVideo(null);
        }
    };

    const handleOpenScheduler = (product: ProductWithContent) => {
        setSelectedProduct(product);
        setIsSchedulerOpen(true);
    };

    const handleCloseScheduler = () => {
        setIsSchedulerOpen(false);
        setSelectedProduct(null);
    };

    const handleSchedulePost = (post: Omit<ScheduledPost, 'id' | 'status'>) => {
        onAddScheduledPost(post);
        handleCloseScheduler();
    };
    
    const readyToPublish = productsWithContent.filter(p => 
        p.content.script && p.content.titles && p.content.seoDescription && p.content.captions
    );

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{t('publisher.title')}</CardTitle>
                    <CardDescription>{t('publisher.description')}</CardDescription>
                </CardHeader>
                <div className="divide-y divide-gray-800 list-item-highlight">
                    {readyToPublish.length > 0 ? readyToPublish.map(product => {
                        const scheduledPost = scheduledPosts.find(p => p.productId === product.id);
                        return (
                            <div key={product.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="mb-4 sm:mb-0">
                                    <h3 className="text-lg font-bold text-bright">{product.name}</h3>
                                    {scheduledPost ? (
                                        <div className="flex items-center text-sm text-green-400 font-semibold mt-1">
                                            <Calendar className="h-4 w-4 mr-1.5" />
                                            {t('publisher.scheduled')} {new Date(scheduledPost.scheduledAt).toLocaleString()}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-400">{t('publisher.readyToPublish')}</p>
                                    )}
                                </div>
                                <div className="flex space-x-2">
                                     <Button 
                                        variant="secondary"
                                        isLoading={creatingVideo === product.id}
                                        onClick={() => handleCreateVideo(product)}>
                                        {creatingVideo === product.id ? t('publisher.creatingVideo') : t('publisher.createVideo')}
                                     </Button>
                                     <Button 
                                        onClick={() => handleOpenScheduler(product)}
                                        disabled={!!scheduledPost}
                                    >
                                        {t('publisher.schedulePost')}
                                     </Button>
                                </div>
                            </div>
                        )
                    }) : (
                         <div className="p-4 text-center text-gray-400">
                            {t('publisher.notReady')}
                        </div>
                    )}
                </div>
            </Card>
            {isSchedulerOpen && selectedProduct && (
                <PostSchedulerModal
                    product={selectedProduct}
                    onClose={handleCloseScheduler}
                    onSchedule={handleSchedulePost}
                />
            )}
        </>
    );
};