import React, { useState, useCallback, useMemo, useEffect, Suspense, lazy } from 'react';
import type { Product, GeneratedContent, VideoIdea, RenderJob, ScheduledPost, AIModel, ProductWithContent } from './types';
import { Page } from './types';
import { generateCaptionsAndHashtags, generateReviewScript, generateSeoDescription, generateVideoTitles, generateSpeech, startVideoGeneration } from './services/geminiService';
import { getAppData, saveAppData } from './services/apiService';
import { useAppContext } from './contexts/AppContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { PageLoader } from './components/common/PageLoader';
import { Notifications } from './components/common/Notifications';

// Lazy load components for code splitting and better performance (Step 8)
const Sidebar = lazy(() => import('./components/Sidebar').then(m => ({ default: m.Sidebar })));
const Header = lazy(() => import('./components/Header').then(m => ({ default: m.Header })));
const ProductScout = lazy(() => import('./components/ProductScout').then(m => ({ default: m.ProductScout })));
const ContentGenerator = lazy(() => import('./components/ContentGenerator').then(m => ({ default: m.ContentGenerator })));
const Publisher = lazy(() => import('./components/Publisher').then(m => ({ default: m.Publisher })));
const Analytics = lazy(() => import('./components/Analytics').then(m => ({ default: m.Analytics })));
const Dashboard = lazy(() => import('./components/Dashboard').then(m => ({ default: m.Dashboard })));
const Automation = lazy(() => import('./components/Automation').then(m => ({ default: m.Automation })));
const Connections = lazy(() => import('./components/Connections').then(m => ({ default: m.Connections })));
const PromptTemplates = lazy(() => import('./components/PromptTemplates').then(m => ({ default: m.PromptTemplates })));
const Footer = lazy(() => import('./components/common/Footer').then(m => ({ default: m.Footer })));
const RenderQueue = lazy(() => import('./components/RenderQueue').then(m => ({ default: m.RenderQueue })));
const AppGuide = lazy(() => import('./components/AppGuide').then(m => ({ default: m.AppGuide })));
const ApiDocs = lazy(() => import('./components/ApiDocs').then(m => ({ default: m.ApiDocs })));
const AIVideoStudio = lazy(() => import('./components/AIVideoStudio').then(m => ({ default: m.AIVideoStudio })));
const ThreeScene = lazy(() => import('./components/ThreeScene').then(m => ({ default: m.ThreeScene })));
const ControlHub = lazy(() => import('./components/ControlHub').then(m => ({ default: m.ControlHub })));
const PlaceholderPage = lazy(() => import('./components/PlaceholderPage').then(m => ({ default: m.PlaceholderPage })));


const AppContent: React.FC = () => {
    const { addNotification, setSyncStatus } = useAppContext();
    const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
    
    // All major state is now loaded from and persisted
    const [products, setProducts] = useState<Product[]>([]);
    const [generatedContent, setGeneratedContent] = useState<Record<string, GeneratedContent>>({});
    const [videoIdeas, setVideoIdeas] = useState<VideoIdea[]>([]);
    const [renderJobs, setRenderJobs] = useState<RenderJob[]>([]);
    const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
    
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    // Load initial state from storage (now async)
    useEffect(() => {
        const loadInitialData = async () => {
            setIsInitialLoading(true);
            const { data, source } = await getAppData();
            setProducts(data.products || []);
            setGeneratedContent(data.generatedContent || {});
            setVideoIdeas(data.videoIdeas || []);
            setRenderJobs(data.renderJobs || []);
            setScheduledPosts(data.scheduledPosts || []);
            setIsInitialLoading(false);
            addNotification({ type: 'info', message: `Data loaded from ${source}.` });
        };
        loadInitialData();
    }, [addNotification]);

    // Memoize app data to use as a stable dependency for the debounced save effect
    const appData = useMemo(() => ({
        products, generatedContent, videoIdeas, renderJobs, scheduledPosts
    }), [products, generatedContent, videoIdeas, renderJobs, scheduledPosts]);

    // Persist state whenever it changes (with debounce)
    useEffect(() => {
        if (isInitialLoading) return; // Don't save while initially loading

        setSyncStatus('syncing');
        const handler = setTimeout(async () => {
            try {
                const { source } = await saveAppData(appData);
                setSyncStatus('success');
                 if (source === 'github') {
                    console.log('Successfully synced data to GitHub.');
                }
            } catch (error) {
                setSyncStatus('error');
                console.error("Failed to sync app data:", error);
                const message = error instanceof Error ? error.message : 'An unknown error occurred.';
                addNotification({ type: 'error', message: `GitHub Sync Failed: ${message}` });
            }
        }, 2000); // Debounce for 2 seconds

        return () => {
            clearTimeout(handler);
        };
    }, [appData, isInitialLoading, setSyncStatus, addNotification]);

    const addProduct = useCallback((newProduct: Product) => {
        setProducts(prev => {
            if (prev.find(p => p.id === newProduct.id)) {
                return prev;
            }
            return [...prev, newProduct];
        });
    }, []);

    const updateGeneratedContent = useCallback((productId: string, newContent: Partial<GeneratedContent>) => {
        setGeneratedContent(prev => ({
            ...prev,
            [productId]: {
                ...(prev[productId] || {}),
                ...newContent
            }
        }));
    }, []);
    
    const addRenderJob = useCallback((newJob: Omit<RenderJob, 'id'>) => {
        setRenderJobs(prev => [{ ...newJob, id: Date.now() }, ...prev]);
        setCurrentPage(Page.RENDER_QUEUE);
        addNotification({ type: 'success', message: `Job for "${newJob.productName}" sent to render queue!` });
    }, [addNotification]);

    const addScheduledPost = useCallback((newPost: Omit<ScheduledPost, 'id' | 'status'>) => {
        setScheduledPosts(prev => [
            { ...newPost, id: Date.now(), status: 'Scheduled' },
            ...prev
        ]);
        addNotification({ type: 'success', message: `Post for "${newPost.productName}" has been scheduled.` });
    }, [addNotification]);

    const startFullAutoPipeline = useCallback(async (product: Product, model: AIModel) => {
        addProduct(product);
        addNotification({ type: 'info', message: `Starting auto-pipeline for "${product.name}"...` });

        try {
            const [script, titles, seoDescription, captions, audioData] = await Promise.all([
                generateReviewScript(product),
                generateVideoTitles(product.name),
                generateSeoDescription(product.name),
                generateCaptionsAndHashtags(product.name),
                generateSpeech(`Hook: Grab their attention in 3 seconds! Main point: ${product.description}. Call to action: Check the link in the bio!`)
            ]);
            
            const fullContent: GeneratedContent = { script, titles, seoDescription, captions };
            updateGeneratedContent(product.id, fullContent);
            
            setCurrentPage(Page.CONTENT_GENERATOR);
            addNotification({ type: 'success', message: 'Content generation complete. Starting video render...' });

            const productWithContent: ProductWithContent = { ...product, content: fullContent };
            const videoOperation = await startVideoGeneration(productWithContent, model);
            
            if (videoOperation) {
                addRenderJob({
                    productName: product.name,
                    status: 'Queued',
                    progress: 0,
                    createdAt: new Date().toISOString(),
                    models: [model, 'gemini-2.5-flash-preview-tts'],
                    videoOperation,
                    audioData
                });
            } else {
                throw new Error("Could not start video generation.");
            }
        } catch (error) {
            console.error("Full auto pipeline failed:", error);
            const message = error instanceof Error ? error.message : 'An unknown error occurred.';
            addNotification({ type: 'error', message: `Pipeline failed: ${message}` });
        }
    }, [addProduct, updateGeneratedContent, addRenderJob, addNotification]);
    
    const productsWithContent = useMemo(() => {
        return products.map(p => ({
            ...p,
            content: generatedContent[p.id] || {}
        }));
    }, [products, generatedContent]);

    const renderPage = () => {
        if (isInitialLoading) {
            return <PageLoader />;
        }

        switch (currentPage) {
            case Page.DASHBOARD:
                return <Dashboard videoIdeas={videoIdeas} renderJobs={renderJobs} setCurrentPage={setCurrentPage} />;
            case Page.AUTOMATION:
                return <Automation videoIdeas={videoIdeas} setVideoIdeas={setVideoIdeas} />;
            case Page.PRODUCT_SCOUT:
                return <ProductScout onStartPipeline={startFullAutoPipeline} />;
            case Page.PROMPT_TEMPLATES:
                return <PromptTemplates />;
            case Page.CONTENT_GENERATOR:
                return <ContentGenerator
                          products={products}
                          generatedContent={generatedContent}
                          onContentUpdate={updateGeneratedContent}
                        />;
            case Page.PUBLISHER:
                return <Publisher 
                    productsWithContent={productsWithContent} 
                    onAddRenderJob={addRenderJob} 
                    scheduledPosts={scheduledPosts}
                    onAddScheduledPost={addScheduledPost}
                />;
            case Page.AI_VIDEO_STUDIO:
                return <AIVideoStudio productsWithContent={productsWithContent} onAddRenderJob={addRenderJob} />;
            case Page.RENDER_QUEUE:
                return <RenderQueue jobs={renderJobs} setJobs={setRenderJobs} />;
            case Page.CONNECTIONS:
                return <Connections setCurrentPage={setCurrentPage} />;
            case Page.ANALYTICS:
                return <Analytics />;
            case Page.API_DOCS:
                return <ApiDocs />;
            case Page.APP_GUIDE:
                return <AppGuide />;
            case Page.FACEBOOK_HUB: return <ControlHub platform="Facebook" />;
            case Page.TIKTOK_HUB: return <ControlHub platform="TikTok" />;
            case Page.YOUTUBE_HUB: return <ControlHub platform="YouTube" />;
            case Page.ZALO_HUB: return <ControlHub platform="Zalo" />;
            case Page.TELEGRAM_HUB: return <ControlHub platform="Telegram" />;
            case Page.INSTAGRAM_HUB: return <ControlHub platform="Instagram" />;
            case Page.X_HUB: return <ControlHub platform="X (Twitter)" />;
            case Page.SHOPEE_HUB: return <ControlHub platform="Shopee" isEcommerce />;
            case Page.LAZADA_HUB: return <ControlHub platform="Lazada" isEcommerce />;
            case Page.TIKI_HUB: return <ControlHub platform="Tiki" isEcommerce />;
            case Page.AMAZON_HUB: return <ControlHub platform="Amazon FBA" isEcommerce />;
            case Page.AI_SYSTEM_OVERVIEW: return <PlaceholderPage title="AI System Overview" />;
            case Page.CONTROL_CENTER: return <PlaceholderPage title="Control Center" />;
            case Page.AI_REVIEW_MARKETPLACE: return <PlaceholderPage title="AI Review Marketplace" />;
            case Page.AI_VIDEO_SELLING_AUTOMATION: return <PlaceholderPage title="AI Video Selling Automation" />;
            default:
                return <Dashboard videoIdeas={videoIdeas} renderJobs={renderJobs} setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="flex h-screen bg-transparent text-gray-100 font-digital">
            <Notifications />
            <Suspense fallback={<div className="w-64 bg-gray-900/50" />}>
                <ThreeScene />
                <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
            </Suspense>
            <div className="flex-1 flex flex-col overflow-hidden">
                <Suspense fallback={<header className="h-16 flex-shrink-0" />}>
                    <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                </Suspense>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-4 sm:p-6 lg:p-8">
                    <Suspense fallback={<PageLoader />}>
                        {renderPage()}
                    </Suspense>
                </main>
                <Suspense fallback={null}>
                    <Footer />
                </Suspense>
            </div>
        </div>
    );
};

const App: React.FC = () => (
    <AppContent />
);


export default App;