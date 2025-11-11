import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { Button } from './common/Button';
import { Spinner } from './common/Spinner';
import { useI18n } from '../hooks/useI18n';
import type { ProductWithContent, RenderJob, AIModel } from '../types';
import { generateSpeech } from '../services/geminiService';
import { Mic2, Film, Music, Bot } from './LucideIcons';

interface AIVideoStudioProps {
    productsWithContent: ProductWithContent[];
    onAddRenderJob: (job: Omit<RenderJob, 'id'>) => void;
}

const voiceModels: AIModel[] = ['ElevenLabs Voice AI', 'gemini-2.5-flash-preview-tts'];
const videoModels: AIModel[] = ['VEO 3.1', 'KlingAI', 'Sora 2', 'Dreamina'];
const musicModels: AIModel[] = ['Suno'];

type Scene = {
    id: number;
    text: string;
    prompt: string;
    model: AIModel;
    isGenerating: boolean;
    thumbnailUrl?: string;
};

export const AIVideoStudio: React.FC<AIVideoStudioProps> = ({ productsWithContent, onAddRenderJob }) => {
    const { t } = useI18n();
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [scenes, setScenes] = useState<Scene[]>([]);

    const [voiceModel, setVoiceModel] = useState<AIModel>(voiceModels[0]);
    const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
    const [voiceoverData, setVoiceoverData] = useState<string | null>(null);

    const [musicModel, setMusicModel] = useState<AIModel>(musicModels[0]);
    const [musicPrompt, setMusicPrompt] = useState('Upbeat, inspiring electronic background music');
    const [isGeneratingMusic, setIsGeneratingMusic] = useState(false);
    const [musicData, setMusicData] = useState<string | null>(null);

    const productsWithScript = useMemo(() =>
        productsWithContent.filter(p => p.content.script && p.content.script.trim() !== ''),
        [productsWithContent]
    );

    const handleProductSelect = (productId: string) => {
        setSelectedProductId(productId);
        const product = productsWithContent.find(p => p.id === productId);
        if (product?.content.script) {
            const scriptSentences = product.content.script.split(/[.\n]+/).filter(s => s.trim() !== '');
            setScenes(scriptSentences.map((s, i) => ({
                id: i,
                text: s.trim(),
                prompt: s.trim(),
                model: videoModels[0],
                isGenerating: false
            })));
        } else {
            setScenes([]);
        }
        // Reset generated assets
        setVoiceoverData(null);
        setMusicData(null);
    };

    const handleGenerateVoiceover = async () => {
        const product = productsWithContent.find(p => p.id === selectedProductId);
        if (!product?.content.script) return;

        setIsGeneratingVoice(true);
        const audioB64 = await generateSpeech(product.content.script);
        setVoiceoverData(audioB64);
        setIsGeneratingVoice(false);
    };
    
    const handleGenerateClip = async (sceneId: number) => {
        setScenes(prev => prev.map(s => s.id === sceneId ? { ...s, isGenerating: true } : s));
        // Mock generation
        await new Promise(resolve => setTimeout(resolve, 2000));
        setScenes(prev => prev.map(s => s.id === sceneId ? { ...s, isGenerating: false, thumbnailUrl: `https://picsum.photos/seed/${s.prompt.replace(/\s/g, '')}/200/100` } : s));
    };

    const handleGenerateMusic = async () => {
        setIsGeneratingMusic(true);
        // Mock generation
        await new Promise(resolve => setTimeout(resolve, 1500));
        const silentAudio = "UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABgAAABkYXRhAAAAAA==";
        setMusicData(silentAudio);
        setIsGeneratingMusic(false);
    };
    
    const handleSendToRender = () => {
        const product = productsWithContent.find(p => p.id === selectedProductId);
        if(!product) return;
        
        const modelsUsed = new Set<AIModel>();
        if(voiceoverData) modelsUsed.add(voiceModel);
        if(musicData) modelsUsed.add(musicModel);
        scenes.forEach(s => s.thumbnailUrl && modelsUsed.add(s.model));
        
        onAddRenderJob({
            productName: `${product.name} (Studio)`,
            status: 'Queued',
            progress: 0,
            createdAt: new Date().toISOString(),
            models: Array.from(modelsUsed),
            audioData: voiceoverData || undefined
        });
    };

    const selectedProduct = productsWithContent.find(p => p.id === selectedProductId);
    const canRender = voiceoverData && scenes.some(s => s.thumbnailUrl);
    const selectClasses = "w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-gray-100";
    const inputClasses = "flex-grow bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-gray-100";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left Column: Controls */}
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('aiVideoStudio.title')}</CardTitle>
                        <CardDescription>{t('aiVideoStudio.description')}</CardDescription>
                    </CardHeader>
                    <div className="p-4">
                         <label htmlFor="product-select-studio" className="block text-sm font-medium text-gray-300 mb-2">{t('aiVideoStudio.selectProduct')}</label>
                        <select
                            id="product-select-studio"
                            className={selectClasses}
                            value={selectedProductId || ''}
                            onChange={(e) => handleProductSelect(e.target.value)}
                            disabled={productsWithScript.length === 0}
                        >
                            <option value="" disabled>{productsWithScript.length > 0 ? t('aiVideoStudio.selectProduct') : t('aiVideoStudio.noProducts')}</option>
                            {productsWithScript.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                </Card>

                {selectedProduct && (
                    <Card>
                         <CardHeader>
                            <CardTitle>{t('aiVideoStudio.assetGeneration')}</CardTitle>
                        </CardHeader>
                        <div className="p-4 space-y-4">
                            {/* Voiceover */}
                            <Accordion title={t('aiVideoStudio.voiceover')} icon={<Mic2 className="h-5 w-5" />}>
                                <div className="flex flex-col sm:flex-row gap-2 items-center">
                                    <select value={voiceModel} onChange={e => setVoiceModel(e.target.value as AIModel)} className={`${selectClasses} flex-grow`}>
                                        {voiceModels.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                    <Button onClick={handleGenerateVoiceover} isLoading={isGeneratingVoice} className="w-full sm:w-auto">{t('aiVideoStudio.generateVoiceover')}</Button>
                                </div>
                                {isGeneratingVoice && <Spinner />}
                                {voiceoverData && <audio controls src={`data:audio/wav;base64,${voiceoverData}`} className="w-full mt-2" />}
                            </Accordion>

                            {/* Visuals */}
                             <Accordion title={t('aiVideoStudio.visuals')} icon={<Film className="h-5 w-5" />}>
                                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                    {scenes.map(scene => (
                                        <div key={scene.id} className="p-3 bg-gray-800/50 rounded-md">
                                            <p className="text-sm text-gray-300 italic">"{scene.text}"</p>
                                            <div className="mt-2 flex flex-col sm:flex-row gap-2 items-center">
                                                <input type="text" value={scene.prompt} onChange={e => setScenes(prev => prev.map(s => s.id === scene.id ? {...s, prompt: e.target.value} : s))} placeholder={t('aiVideoStudio.promptForScene', {num: (scene.id + 1).toString()})} className={inputClasses}/>
                                                <select value={scene.model} onChange={e => setScenes(prev => prev.map(s => s.id === scene.id ? {...s, model: e.target.value as AIModel} : s))} className={`${selectClasses} sm:w-36`}>
                                                    {videoModels.map(m => <option key={m} value={m}>{m}</option>)}
                                                </select>
                                                <Button size="sm" onClick={() => handleGenerateClip(scene.id)} isLoading={scene.isGenerating} className="w-full sm:w-auto">{t('aiVideoStudio.generateClip')}</Button>
                                            </div>
                                            {scene.thumbnailUrl && <img src={scene.thumbnailUrl} alt={`Scene ${scene.id+1}`} className="mt-2 rounded-md" />}
                                        </div>
                                    ))}
                                </div>
                             </Accordion>

                             {/* Music */}
                            <Accordion title={t('aiVideoStudio.music')} icon={<Music className="h-5 w-5" />}>
                                <input type="text" value={musicPrompt} onChange={e => setMusicPrompt(e.target.value)} placeholder={t('aiVideoStudio.musicPrompt')} className={`${inputClasses} w-full mb-2`}/>
                                <div className="flex flex-col sm:flex-row gap-2 items-center">
                                    <select value={musicModel} onChange={e => setMusicModel(e.target.value as AIModel)} className={`${selectClasses} flex-grow`}>
                                        {musicModels.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                    <Button onClick={handleGenerateMusic} isLoading={isGeneratingMusic} className="w-full sm:w-auto">{t('aiVideoStudio.generateMusic')}</Button>
                                </div>
                                {isGeneratingMusic && <Spinner />}
                                {musicData && <audio controls src={`data:audio/wav;base64,${musicData}`} className="w-full mt-2" />}
                            </Accordion>
                        </div>
                    </Card>
                )}
            </div>

            {/* Right Column: Preview & Render */}
            <div className="lg:col-span-1 space-y-6">
                <Card className="sticky top-6">
                    <CardHeader>
                        <CardTitle>{t('aiVideoStudio.preview')}</CardTitle>
                    </CardHeader>
                    <div className="p-4">
                        <div className="aspect-video bg-gray-800 rounded-md flex items-center justify-center text-center text-gray-400 p-4">
                            {t('aiVideoStudio.previewPlaceholder')}
                        </div>
                    </div>
                     <div className="p-4 border-t border-gray-700">
                        <Button onClick={handleSendToRender} disabled={!canRender} className="w-full" icon={<Bot className="h-4 w-4"/>}>
                           {t('aiVideoStudio.sendToRender')}
                        </Button>
                        {!canRender && <p className="text-xs text-center text-gray-500 mt-2">{t('aiVideoStudio.assetsNeeded')}</p>}
                    </div>
                </Card>
            </div>
        </div>
    );
};

const Accordion: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="border border-gray-700 rounded-lg">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full p-3 text-left flex justify-between items-center bg-gray-800/50 rounded-t-lg hover:bg-gray-700/80 transition-colors">
                <div className="flex items-center space-x-2">
                    {icon}
                    <span className="font-semibold text-gray-200">{title}</span>
                </div>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && <div className="p-3">{children}</div>}
        </div>
    );
}