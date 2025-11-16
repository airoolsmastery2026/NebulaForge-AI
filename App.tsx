
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProductScout } from './components/ProductScout';
import { ContentGenerator } from './components/ContentGenerator';
import { Publisher } from './components/Publisher';
import { Analytics } from './components/Analytics';
import { Dashboard } from './components/Dashboard';
import { Automation } from './components/Automation';
import { Connections } from './components/Connections';
import { PromptTemplates } from './components/PromptTemplates';
import { Footer } from './components/common/Footer';
import { RenderQueue } from './components/RenderQueue';
import { AppGuide } from './components/AppGuide';
import { ApiDocs } from './components/ApiDocs';
import { AIVideoStudio } from './components/AIVideoStudio';
import { GitHubSync } from './components/GitHubSync';
import { ThreeScene } from './components/ThreeScene';
import { ControlHub } from './components/ControlHub';
import { PlaceholderPage } from './components/PlaceholderPage';
import type { Product, GeneratedContent, VideoIdea, RenderJob, ScheduledPost, AIModel, Connection } from './types';
import { Page } from './types';
import { generateCaptionsAndHashtags, generateReviewScript, generateSeoDescription, generateVideoTitles, generateSpeech, startVideoGeneration } from './services/geminiService';

const mockIdeas: VideoIdea[] = [
  { id: 1, title: "Top 10 Tech Gadgets of 2023", category: "Tech", status: "Generated" },
  { id: 2, title: "Fitness Equipment Buyers Guide", category: "Health", status: "In Production" },
  { id: 3, title: "Home Office Setup Tips", category: "Lifestyle", status: "Published" },
];

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
    const [products, setProducts] = useState<Product[]>([]);
    const [generatedContent, setGeneratedContent] = useState<Record<string, GeneratedContent>>({});
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [videoIdeas, setVideoIdeas] = useState<VideoIdea[]>(mockIdeas);
    const [renderJobs, setRenderJobs] = useState<RenderJob[]>([]);
    const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [demoStarted, setDemoStarted] = useState(false);


    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            const x = (clientX / window.innerWidth) * 2 - 1;
            const y = -(clientY / window.innerHeight) * 2 + 1;
            setMousePosition({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);


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
    }, []);

    const addScheduledPost = useCallback((newPost: Omit<ScheduledPost, 'id' | 'status'>) => {
        setScheduledPosts(prev => [
            { ...newPost, id: Date.now(), status: 'Scheduled' },
            ...prev
        ]);
    }, []);

    const startFullAutoPipeline = useCallback(async (product: Product, model: AIModel) => {
        addProduct(product);

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

        const productWithContent = { ...product, content: fullContent };
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
            console.error("Pipeline failed: Could not start video generation.");
        }
    }, [addProduct, updateGeneratedContent, addRenderJob]);
    
    const startDemo = useCallback(() => {
        if (demoStarted) return;
        
        const demoProducts: Product[] = [
            { id: 'demo-veo-suite', name: 'VEO 3.1 Suite', description: 'Advanced AI video generation toolkit.', features: 'Text-to-video, Image-to-video, Video editing', affiliateLink: 'https://demo.link/veo', commission: 30, rating: 4.8, conversions: 2500 },
            { id: 'demo-kling-ai', name: 'Kling AI Animator', description: 'Create stunning animations from simple prompts.', features: 'Character animation, Scene generation, Style transfer', affiliateLink: 'https://demo.link/kling', commission: 25, rating: 4.6, conversions: 1800 },
        ];
        setProducts(demoProducts);

        const demoContent: Record<string, GeneratedContent> = {
            'demo-veo-suite': {
                script: "Is this the future of video? VEO 3.1 Suite is an AI that creates stunning videos from just text. Imagine typing a sentence and watching it come to life. It's perfect for marketers and creators. Check it out!",
                titles: ["VEO 3.1 Will Blow Your Mind!", "The AI Video Tool You Need", "Create Videos in 5 Seconds"],
                seoDescription: "A review of the VEO 3.1 Suite for AI video generation.",
                captions: { caption: "This AI is insane!", hashtags: ["#AI", "#VideoEditing", "#Tech"] }
            }
        };
        setGeneratedContent(demoContent);

        const demoJobs: RenderJob[] = [
            { id: 9001, productName: 'Kling AI Animator', status: 'Rendering', progress: 75, createdAt: new Date(Date.now() - 5 * 60000).toISOString(), models: ['KlingAI', 'ElevenLabs Voice AI'], videoOperation: { name: 'demo-op-1' } },
            { id: 9002, productName: 'Suno Music Tracks', status: 'Completed', progress: 100, createdAt: new Date(Date.now() - 30 * 60000).toISOString(), models: ['Suno'], videoOperation: { name: 'demo-op-2', done: true }, videoUrl: 'mock-url' }
        ];
        setRenderJobs(demoJobs);

        const demoPosts: ScheduledPost[] = [
            { id: 8001, productId: 'demo-kling-ai', productName: 'Kling AI Animator', platforms: ['youtube', 'tiktok'], content: 'Check out Kling AI!', scheduledAt: new Date(Date.now() + 2 * 24 * 3600000).toISOString(), status: 'Scheduled' }
        ];
        setScheduledPosts(demoPosts);
        
        try {
            const demoConnections: Record<string, Connection> = {
                'youtube': { id: 'youtube', username: 'Demo YouTube User', status: 'connected', autoMode: true, credentials: { CLIENT_ID: 'demo-id' } },
                'tiktok': { id: 'tiktok', username: 'Demo TikTok User', status: 'connected', autoMode: true, credentials: { CLIENT_KEY: 'demo-key' } },
                'clickbank': { id: 'clickbank', username: 'Demo ClickBank User', status: 'connected', autoMode: true, credentials: { API_KEY: 'demo-key' } },
                'shareasale': { id: 'shareasale', username: 'Demo ShareASale User', status: 'refreshing', autoMode: true, credentials: { MERCHANT_ID: 'demo-id' } },
            };
            const existing = JSON.parse(localStorage.getItem('universal-connections') || '{}');
            const updated = { ...existing, ...demoConnections };
            localStorage.setItem('universal-connections', JSON.stringify(updated));
            setCurrentPage(Page.DASHBOARD);
        } catch (e) {
            console.error("Failed to set demo connections", e);
        }

        setDemoStarted(true);
    }, [demoStarted]);


    const productsWithContent = useMemo(() => {
        return products.map(p => ({
            ...p,
            content: generatedContent[p.id] || {}
        }));
    }, [products, generatedContent]);

    const renderPage = () => {
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
            // Align with Sidebar navigation which uses Page.PUBLISHER.
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
            case Page.GITHUB_SYNC:
                return <GitHubSync />;
            case Page.ANALYTICS:
                return <Analytics />;
            case Page.API_DOCS:
                return <ApiDocs />;
            case Page.APP_GUIDE:
                return <AppGuide />;

            // Social Hubs
            case Page.FACEBOOK_HUB: return <ControlHub platform="Facebook" />;
            case Page.TIKTOK_HUB: return <ControlHub platform="TikTok" />;
            case Page.YOUTUBE_HUB: return <ControlHub platform="YouTube" />;
            case Page.ZALO_HUB: return <ControlHub platform="Zalo" />;
            case Page.TELEGRAM_HUB: return <ControlHub platform="Telegram" />;
            case Page.INSTAGRAM_HUB: return <ControlHub platform="Instagram" />;
            case Page.X_HUB: return <ControlHub platform="X (Twitter)" />;

            // E-commerce Hubs
            case Page.SHOPEE_HUB: return <ControlHub platform="Shopee" isEcommerce />;
            case Page.LAZADA_HUB: return <ControlHub platform="Lazada" isEcommerce />;
            case Page.TIKI_HUB: return <ControlHub platform="Tiki" isEcommerce />;
            case Page.AMAZON_HUB: return <ControlHub platform="Amazon FBA" isEcommerce />;

            // Placeholder Pages
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
            <ThreeScene mouseX={mousePosition.x} mouseY={mousePosition.y} />
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
                    startDemo={startDemo} 
                    demoStarted={demoStarted} 
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-4 sm:p-6 lg:p-8">
                    {renderPage()}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default App;