import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { Button } from './common/Button';
import { Spinner } from './common/Spinner';
import { useI18n } from '../hooks/useI18n';
import type { ProductWithContent, RenderJob, AIModel, Scene, SoundEffect } from '../types';
import { generateSpeech, generateImageForScene, generateMusic, generateSfx } from '../services/geminiService';
import { Mic2, Film, Music, Bot, Volume2 } from './LucideIcons';

interface AIVideoStudioProps {
    productsWithContent: ProductWithContent[];
    onAddRenderJob: (job: Omit<RenderJob, 'id'>) => void;
}

// Model definitions
const voiceModels: AIModel[] = ['gemini-2.5-flash-preview-tts', 'ElevenLabs Voice AI'];
const videoModels: AIModel[] = ['VEO 3.1', 'KlingAI', 'Sora 2', 'Dreamina'];
const musicModels: AIModel[] = ['Suno'];
const sfxModels: AIModel[] = ['Gemini SFX Generator'];

type ActiveTab = 'visuals' | 'voice' | 'music' | 'sfx';


const TimelineTrack: React.FC<{ title: string; icon: React.ReactNode; hasContent: boolean }> = ({ title, icon, hasContent }) => (
    <div className="flex items-center space-x-3 p-2">
        <div className="flex flex-col items-center w-16 text-center">
            {icon}
            <span className="text-xs text-gray-400 mt-1">{title}</span>
        </div>
        <div className="flex-grow h-12 bg-gray-800/50 rounded-md flex items-center justify-center border-2 border-dashed border-gray-700">
            {hasContent ? (
                <div className="w-full h-full bg-primary-500/30 rounded-md" />
            ) : (
                <span className="text-xs text-gray-500">Empty Track</span>
            )}
        </div>
    </div>
);


export const AIVideoStudio: React.FC<AIVideoStudioProps> = ({ productsWithContent, onAddRenderJob }) => {
    const { t } = useI18n();
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [activeTab, setActiveTab] = useState<ActiveTab>('visuals');

    // AI Assets State
    const [voiceoverData, setVoiceoverData] = useState<string | null>(null);
    const [musicData, setMusicData] = useState<string | null>(null);
    const [sfxLibrary, setSfxLibrary] = useState<SoundEffect[]>([]);
    
    // Generation State
    const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
    const [isGeneratingMusic, setIsGeneratingMusic] = useState(false);
    const [isGeneratingSfx, setIsGeneratingSfx] = useState(false);
    
    // UI Models State
    const [voiceModel, setVoiceModel] = useState<AIModel>(voiceModels[0]);
    const [musicModel, setMusicModel] = useState<AIModel>(musicModels[0]);
    const [sfxModel, setSfxModel] = useState<AIModel>(sfxModels[0]);
    const [musicPrompt, setMusicPrompt] = useState('Upbeat, inspiring electronic background music');
    const [sfxPrompt, setSfxPrompt] = useState('');

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
                id: i, text: s.trim(), prompt: s.trim(), model: videoModels[0], isGenerating: false
            })));
        } else {
            setScenes([]);
        }
        // Reset all assets
        setVoiceoverData(null);
        setMusicData(null);
        setSfxLibrary([]);
    };

    const handleGenerateVoiceover = useCallback(async () => {
        const product = productsWithContent.find(p => p.id === selectedProductId);
        if (!product?.content.script) return;
        setIsGeneratingVoice(true);
        const audioB64 = await generateSpeech(product.content.script);
        setVoiceoverData(audioB64);
        setIsGeneratingVoice(false);
    }, [selectedProductId, productsWithContent]);

    const handleGenerateClip = useCallback(async (sceneId: number) => {
        const scene = scenes.find(s => s.id === sceneId);
        if (!scene) return;
        setScenes(prev => prev.map(s => s.id === sceneId ? { ...s, isGenerating: true } : s));
        const imageData = await generateImageForScene(scene.prompt);
        if (imageData) {
            setScenes(prev => prev.map(s => s.id === sceneId ? { ...s, isGenerating: false, thumbnailUrl: `data:image/png;base64,${imageData}` } : s));
        } else {
            setScenes(prev => prev.map(s => s.id === sceneId ? { ...s, isGenerating: false } : s));
        }
    }, [scenes]);

    const handleGenerateMusic = useCallback(async () => {
        if (!musicPrompt) return;
        setIsGeneratingMusic(true);
        const audioB64 = await generateMusic(musicPrompt);
        setMusicData(audioB64);
        setIsGeneratingMusic(false);
    }, [musicPrompt]);

    const handleGenerateSfx = useCallback(async () => {
        if (!sfxPrompt) return;
        setIsGeneratingSfx(true);
        const audioB64 = await generateSfx(sfxPrompt);
        setSfxLibrary(prev => [...prev, { id: Date.now(), name: sfxPrompt, audioData: audioB64 }]);
        setSfxPrompt('');
        setIsGeneratingSfx(false);
    }, [sfxPrompt]);
    
    const handleSendToRender = () => {
        const product = productsWithContent.find(p => p.id === selectedProductId);
        if(!product) return;
        const modelsUsed = new Set<AIModel>();
        if(voiceoverData) modelsUsed.add(voiceModel);
        if(musicData) modelsUsed.add(musicModel);
        if(sfxLibrary.length > 0) modelsUsed.add(sfxModel);
        scenes.forEach(s => s.thumbnailUrl && modelsUsed.add(s.model));
        
        onAddRenderJob({
            productName: `${product.name} (Studio Pro)`,
            status: 'Queued',
            progress: 0,
            createdAt: new Date().toISOString(),
            models: Array.from(modelsUsed),
            audioData: voiceoverData || undefined
        });
    };

    const selectedProduct = productsWithContent.find(p => p.id === selectedProductId);
    const canRender = voiceoverData && scenes.some(s => s.thumbnailUrl);
    const selectClasses = "w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm text-gray-100";
    const inputClasses = "flex-grow bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-gray-100";
    
    const tabButtonClasses = (tabName: ActiveTab) => 
      `flex-1 p-2 text-sm font-semibold rounded-md flex items-center justify-center space-x-2 transition-colors ${
        activeTab === tabName ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-700/50'
      }`;

    return (
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>{t('aiVideoStudio.title')}</CardTitle>
                    <CardDescription>{t('aiVideoStudio.description')}</CardDescription>
                </CardHeader>
                <div className="p-4">
                    <label htmlFor="product-select-studio" className="block text-sm font-medium text-gray-300 mb-2">{t('aiVideoStudio.selectProduct')}</label>
                    <select id="product-select-studio" className={selectClasses} value={selectedProductId || ''} onChange={(e) => handleProductSelect(e.target.value)} disabled={productsWithScript.length === 0}>
                        <option value="" disabled>{productsWithScript.length > 0 ? t('aiVideoStudio.selectProduct') : t('aiVideoStudio.noProducts')}</option>
                        {productsWithScript.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
            </Card>

            {selectedProduct && (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                    {/* Left Panel: Controls */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card>
                             <CardHeader>
                                <CardTitle>{t('aiVideoStudio.controls')}</CardTitle>
                            </CardHeader>
                            <div className="p-2 space-y-4">
                                <div className="flex space-x-1 p-1 bg-gray-800/50 rounded-lg">
                                    <button onClick={() => setActiveTab('visuals')} className={tabButtonClasses('visuals')}><Film className="h-4 w-4" /><span>{t('aiVideoStudio.scriptAndVisuals')}</span></button>
                                    <button onClick={() => setActiveTab('voice')} className={tabButtonClasses('voice')}><Mic2 className="h-4 w-4" /><span>{t('aiVideoStudio.voiceover')}</span></button>
                                    <button onClick={() => setActiveTab('music')} className={tabButtonClasses('music')}><Music className="h-4 w-4" /><span>{t('aiVideoStudio.music')}</span></button>
                                    <button onClick={() => setActiveTab('sfx')} className={tabButtonClasses('sfx')}><Volume2 className="h-4 w-4" /><span>{t('aiVideoStudio.sfx')}</span></button>
                                </div>
                                <div className="p-2">
                                    {activeTab === 'visuals' && (
                                         <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                                            {scenes.map(scene => (
                                                <div key={scene.id} className="p-3 bg-gray-800/50 rounded-md">
                                                    <p className="text-sm text-gray-300 italic mb-2">"{scene.text}"</p>
                                                    <div className="space-y-2">
                                                        <textarea value={scene.prompt} onChange={e => setScenes(prev => prev.map(s => s.id === scene.id ? {...s, prompt: e.target.value} : s))} rows={2} className={`${inputClasses} w-full text-xs`}/>
                                                        <div className="flex gap-2">
                                                            <select value={scene.model} onChange={e => setScenes(prev => prev.map(s => s.id === scene.id ? {...s, model: e.target.value as AIModel} : s))} className={`${selectClasses} text-xs`}>
                                                                {videoModels.map(m => <option key={m} value={m}>{m}</option>)}
                                                            </select>
                                                            <Button size="sm" onClick={() => handleGenerateClip(scene.id)} isLoading={scene.isGenerating}>{t('aiVideoStudio.generateVisuals')}</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                     {activeTab === 'voice' && (
                                        <div className="space-y-4">
                                            <select value={voiceModel} onChange={e => setVoiceModel(e.target.value as AIModel)} className={selectClasses}>
                                                {voiceModels.map(m => <option key={m} value={m}>{m}</option>)}
                                            </select>
                                            <Button onClick={handleGenerateVoiceover} isLoading={isGeneratingVoice} className="w-full">{t('aiVideoStudio.generateVoiceover')}</Button>
                                            {voiceoverData && <audio controls src={`data:audio/wav;base64,${voiceoverData}`} className="w-full mt-2 h-10" />}
                                        </div>
                                    )}
                                    {activeTab === 'music' && (
                                        <div className="space-y-4">
                                            <input type="text" value={musicPrompt} onChange={e => setMusicPrompt(e.target.value)} placeholder={t('aiVideoStudio.musicPromptPlaceholder')} className={`${inputClasses} w-full`}/>
                                            <select value={musicModel} onChange={e => setMusicModel(e.target.value as AIModel)} className={selectClasses}>
                                                {musicModels.map(m => <option key={m} value={m}>{m}</option>)}
                                            </select>
                                            <Button onClick={handleGenerateMusic} isLoading={isGeneratingMusic} className="w-full">{t('aiVideoStudio.generateMusic')}</Button>
                                            {musicData && <audio controls src={`data:audio/wav;base64,${musicData}`} className="w-full mt-2 h-10" />}
                                        </div>
                                    )}
                                    {activeTab === 'sfx' && (
                                        <div className="space-y-4">
                                            <div className="flex gap-2">
                                                <input type="text" value={sfxPrompt} onChange={e => setSfxPrompt(e.target.value)} placeholder={t('aiVideoStudio.sfxPromptPlaceholder')} className={`${inputClasses} w-full`}/>
                                                <Button onClick={handleGenerateSfx} isLoading={isGeneratingSfx}>{t('aiVideoStudio.generateSfx')}</Button>
                                            </div>
                                            <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-1">{t('aiVideoStudio.sfxLibrary')}</h4>
                                            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                                {sfxLibrary.map(sfx => <div key={sfx.id} className="p-2 bg-gray-800/50 rounded"><p className="text-xs text-gray-300 truncate">{sfx.name}</p><audio controls src={`data:audio/wav;base64,${sfx.audioData}`} className="w-full mt-1 h-8" /></div>)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Panel: Preview & Timeline */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('aiVideoStudio.preview')}</CardTitle>
                            </CardHeader>
                            <div className="p-4">
                                <div className="aspect-video bg-gray-900 rounded-md flex items-center justify-center overflow-hidden">
                                    {scenes.find(s => s.thumbnailUrl) ? 
                                        <img src={scenes.find(s => s.thumbnailUrl)?.thumbnailUrl} className="w-full h-full object-contain" alt="Preview"/> :
                                        <Film className="w-16 h-16 text-gray-700"/>
                                    }
                                </div>
                            </div>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>{t('aiVideoStudio.timeline')}</CardTitle>
                            </CardHeader>
                             <div className="p-4 space-y-2">
                                 <div className="flex items-center space-x-3 p-2">
                                    <div className="flex flex-col items-center w-16 text-center"><Film className="h-5 w-5 text-gray-300" /><span className="text-xs text-gray-400 mt-1">{t('aiVideoStudio.videoTrack')}</span></div>
                                    <div className="flex-grow h-16 bg-gray-800/50 rounded-md flex items-center p-1 space-x-1 overflow-x-auto">
                                        {scenes.map(s => <div key={s.id} className={`w-14 h-full rounded flex-shrink-0 bg-gray-700 flex items-center justify-center ${s.isGenerating ? 'animate-pulse' : ''}`}>{s.thumbnailUrl ? <img src={s.thumbnailUrl} className="w-full h-full object-cover rounded"/> : <span className="text-2xl text-gray-500">{s.id+1}</span>}</div>)}
                                    </div>
                                </div>
                                <TimelineTrack title={t('aiVideoStudio.voiceTrack')} icon={<Mic2 className="h-5 w-5 text-gray-300" />} hasContent={!!voiceoverData} />
                                <TimelineTrack title={t('aiVideoStudio.musicTrack')} icon={<Music className="h-5 w-5 text-gray-300" />} hasContent={!!musicData} />
                                <TimelineTrack title={t('aiVideoStudio.sfxTrack')} icon={<Volume2 className="h-5 w-5 text-gray-300" />} hasContent={sfxLibrary.length > 0} />
                            </div>
                        </Card>
                        <Button onClick={handleSendToRender} disabled={!canRender} size="lg" className="w-full" icon={<Bot className="h-5 w-5"/>}>
                           {t('aiVideoStudio.sendToRender')}
                        </Button>
                        {!canRender && <p className="text-xs text-center text-gray-500 mt-2">{t('aiVideoStudio.assetsNeeded')}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};