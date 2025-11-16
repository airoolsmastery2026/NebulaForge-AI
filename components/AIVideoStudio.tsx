

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { Button } from './common/Button';
import { Spinner } from './common/Spinner';
import { useI18n } from '../hooks/useI18n';
import type { ProductWithContent, RenderJob, AIModel, Scene, SoundEffect, VideoEffect } from '../types';
import { startSceneVideoGeneration, checkVideoGenerationStatus, getVideoResult, generateSpeech, generateMusic, generateSfx } from '../services/geminiService';
import { Mic2, Film, Music, Bot, Volume2, Play, Wand2 } from './LucideIcons';

interface AIVideoStudioProps {
    productsWithContent: ProductWithContent[];
    onAddRenderJob: (job: Omit<RenderJob, 'id'>) => void;
}

const voiceModels: AIModel[] = ['gemini-2.5-flash-preview-tts', 'ElevenLabs Voice AI'];
const videoModels: AIModel[] = ['VEO 3.1 (Fast)', 'VEO 3.1 (HQ)', 'KlingAI', 'Sora 2', 'Dreamina'];
const musicModels: AIModel[] = ['Suno'];
const sfxModels: AIModel[] = ['Gemini SFX Generator'];
const videoEffects: VideoEffect[] = ['glitch', 'vintage', 'neon'];

type ActiveTab = 'visuals' | 'voice' | 'music' | 'sfx' | 'effects';

const Waveform: React.FC = () => (
    <div className="flex items-center h-full w-full px-2 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
            <div
                key={i}
                className="w-full bg-cyan-400 rounded-sm"
                style={{ height: `${20 + Math.sin(i / 2) * 15 + Math.random() * 10}%`, minWidth: '2px', marginRight: '2px' }}
            />
        ))}
    </div>
);

const TimelineTrack: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; }> = ({ title, icon, children }) => (
    <div className="flex items-center space-x-3 p-1">
        <div className="flex flex-col items-center w-20 text-center flex-shrink-0">
            {icon}
            <span className="text-xs text-gray-400 mt-1">{title}</span>
        </div>
        <div className="flex-grow h-20 bg-gray-800/50 rounded-md flex items-center border-2 border-dashed border-gray-700 overflow-hidden">
            {children}
        </div>
    </div>
);

const EffectBadge: React.FC<{ effect: VideoEffect }> = ({ effect }) => {
    const { t } = useI18n();
    const effectStyles: Record<VideoEffect, string> = {
        glitch: 'bg-purple-500/80 text-white',
        vintage: 'bg-amber-600/80 text-white',
        neon: 'bg-cyan-400/80 text-black',
    };
    const effectName = t(`effectNames.${effect}`);
    return (
        <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${effectStyles[effect]}`} title={effectName}>
            {effectName[0]}
        </span>
    );
};


export const AIVideoStudio: React.FC<AIVideoStudioProps> = ({ productsWithContent, onAddRenderJob }) => {
    const { t } = useI18n();
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [activeTab, setActiveTab] = useState<ActiveTab>('visuals');

    const [voiceoverData, setVoiceoverData] = useState<string | null>(null);
    const [musicData, setMusicData] = useState<string | null>(null);
    const [sfxLibrary, setSfxLibrary] = useState<SoundEffect[]>([]);
    
    const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
    const [isGeneratingMusic, setIsGeneratingMusic] = useState(false);
    const [isGeneratingSfx, setIsGeneratingSfx] = useState(false);
    
    const [voiceModel, setVoiceModel] = useState<AIModel>(voiceModels[0]);
    const [musicModel, setMusicModel] = useState<AIModel>(musicModels[0]);
    const [sfxModel, setSfxModel] = useState<AIModel>(sfxModels[0]);
    const [musicPrompt, setMusicPrompt] = useState('Upbeat, inspiring electronic background music');
    const [sfxPrompt, setSfxPrompt] = useState('');

    const productsWithScript = useMemo(() =>
        productsWithContent.filter(p => p.content.script && p.content.script.trim() !== ''),
        [productsWithContent]
    );

    // --- Memory Leak Fix: Cleanup Blob URLs ---
    useEffect(() => {
        // This effect's cleanup function will run when the component unmounts.
        return () => {
            scenes.forEach(scene => {
                if (scene.videoUrl && scene.videoUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(scene.videoUrl);
                }
            });
        };
    }, [scenes]);

    const handleProductSelect = (productId: string) => {
        // Revoke old blob URLs before setting new scenes to prevent memory leaks
        scenes.forEach(scene => {
            if (scene.videoUrl && scene.videoUrl.startsWith('blob:')) {
                URL.revokeObjectURL(scene.videoUrl);
            }
        });
        
        setSelectedProductId(productId);
        const product = productsWithContent.find(p => p.id === productId);
        if (product?.content.script) {
            const scriptSentences = product.content.script.split(/[.\n]+/).filter(s => s.trim() !== '');
            setScenes(scriptSentences.map((s, i) => ({
                id: i, text: s.trim(), prompt: s.trim(), model: videoModels[0], generationStatus: 'idle', effects: []
            })));
        } else {
            setScenes([]);
        }
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
        setScenes(prev => prev.map(s => s.id === sceneId ? { ...s, generationStatus: 'generating' } : s));
        const operation = await startSceneVideoGeneration(scene.prompt, scene.model);
        if (operation) {
            setScenes(prev => prev.map(s => s.id === sceneId ? { ...s, videoOperation: operation } : s));
        } else {
            setScenes(prev => prev.map(s => s.id === sceneId ? { ...s, generationStatus: 'failed' } : s));
        }
    }, [scenes]);
    
    useEffect(() => {
        const pollInterval = setInterval(async () => {
            const scenesToPoll = scenes.filter(s => s.generationStatus === 'generating' && s.videoOperation && !s.videoOperation.done);
            if (scenesToPoll.length === 0) return;

            for (const scene of scenesToPoll) {
                const updatedOperation = await checkVideoGenerationStatus(scene.videoOperation);
                if (updatedOperation.done) {
                    if (updatedOperation.error) {
                        console.error(`Video generation failed for scene ${scene.id}:`, updatedOperation.error);
                        setScenes(prev => prev.map(s => s.id === scene.id ? { ...s, generationStatus: 'failed' } : s));
                    } else {
                        const videoUri = updatedOperation.response?.generatedVideos?.[0]?.video?.uri;
                        if (videoUri) {
                            const videoBlob = await getVideoResult(videoUri);
                            if (videoBlob) {
                                const blobUrl = URL.createObjectURL(videoBlob);
                                setScenes(prev => prev.map(s => {
                                    if (s.id === scene.id) {
                                        // Revoke old URL if it exists before setting new one
                                        if (s.videoUrl && s.videoUrl.startsWith('blob:')) {
                                            URL.revokeObjectURL(s.videoUrl);
                                        }
                                        return { ...s, generationStatus: 'completed', videoUrl: blobUrl, videoOperation: updatedOperation };
                                    }
                                    return s;
                                }));
                            } else {
                                setScenes(prev => prev.map(s => s.id === scene.id ? { ...s, generationStatus: 'failed' } : s));
                            }
                        } else {
                            setScenes(prev => prev.map(s => s.id === scene.id ? { ...s, generationStatus: 'failed' } : s));
                        }
                    }
                } else {
                    setScenes(prev => prev.map(s => s.id === scene.id ? { ...s, videoOperation: updatedOperation } : s));
                }
            }
        }, 10000); // Poll every 10 seconds

        return () => clearInterval(pollInterval);
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
        if (audioB64) {
            setSfxLibrary(prev => [...prev, { id: Date.now(), name: sfxPrompt, audioData: audioB64 }]);
        }
        setSfxPrompt('');
        setIsGeneratingSfx(false);
    }, [sfxPrompt]);

    const handleToggleEffect = useCallback((sceneId: number, effect: VideoEffect) => {
        setScenes(prevScenes => {
            return prevScenes.map(scene => {
                if (scene.id === sceneId) {
                    const currentEffects = scene.effects || [];
                    const hasEffect = currentEffects.includes(effect);
                    const newEffects = hasEffect 
                        ? currentEffects.filter(e => e !== effect) 
                        : [...currentEffects, effect];
                    return { ...scene, effects: newEffects };
                }
                return scene;
            });
        });
    }, []);
    
    const handleSendToRender = () => {
        const product = productsWithContent.find(p => p.id === selectedProductId);
        if(!product) return;
        const modelsUsed = new Set<AIModel>();
        if(voiceoverData) modelsUsed.add(voiceModel);
        if(musicData) modelsUsed.add(musicModel);
        if(sfxLibrary.length > 0) modelsUsed.add(sfxModel);
        scenes.forEach(s => s.videoUrl && modelsUsed.add(s.model));
        
        onAddRenderJob({
            productName: `${product.name} (Studio Pro)`,
            status: 'Queued',
            progress: 0,
            createdAt: new Date().toISOString(),
            models: Array.from(modelsUsed),
            audioData: voiceoverData || undefined,
            scenes: scenes.filter(s => s.videoUrl)
        });
    };

    const selectedProduct = productsWithContent.find(p => p.id === selectedProductId);
    const canRender = voiceoverData && scenes.some(s => s.videoUrl);
    const selectClasses = "w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm text-gray-100";
    const inputClasses = "flex-grow bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-gray-100";
    
    const tabButtonClasses = (tabName: ActiveTab) => 
      `flex-1 p-2 text-sm font-semibold rounded-md flex items-center justify-center space-x-2 transition-colors ${
        activeTab === tabName ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-700/50'
      }`;

    const firstSceneWithVideo = scenes.find(s => s.videoUrl);

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
                    <div className="lg:col-span-2">
                        <Card>
                             <CardHeader>
                                <CardTitle>{t('aiVideoStudio.controls')}</CardTitle>
                            </CardHeader>
                            <div className="p-2 space-y-4">
                                <div className="flex space-x-1 p-1 bg-gray-800/50 rounded-lg">
                                    <button onClick={() => setActiveTab('visuals')} className={tabButtonClasses('visuals')}><Film className="h-4 w-4" /><span>{t('aiVideoStudio.scriptAndVisuals')}</span></button>
                                    <button onClick={() => setActiveTab('effects')} className={tabButtonClasses('effects')}><Wand2 className="h-4 w-4" /><span>{t('aiVideoStudio.effects')}</span></button>
                                    <button onClick={() => setActiveTab('voice')} className={tabButtonClasses('voice')}><Mic2 className="h-4 w-4" /><span>{t('aiVideoStudio.voiceover')}</span></button>
                                    <button onClick={() => setActiveTab('music')} className={tabButtonClasses('music')}><Music className="h-4 w-4" /><span>{t('aiVideoStudio.music')}</span></button>
                                    <button onClick={() => setActiveTab('sfx')} className={tabButtonClasses('sfx')}><Volume2 className="h-4 w-4" /><span>{t('aiVideoStudio.sfx')}</span></button>
                                </div>
                                <div className="p-2 max-h-[70vh] overflow-y-auto">
                                    {activeTab === 'visuals' && (
                                         <div className="space-y-3">
                                            {scenes.map(scene => (
                                                <Card key={scene.id} className="bg-gray-800/50">
                                                    <div className="p-3">
                                                        <div className="flex gap-3">
                                                            <div className="w-24 h-14 bg-gray-900/50 rounded-md flex-shrink-0 flex items-center justify-center">
                                                                {scene.generationStatus === 'generating' ? <Spinner/> : 
                                                                 scene.videoUrl ? <video src={scene.videoUrl} className="w-full h-full object-cover rounded-md" controls muted loop playsInline /> : 
                                                                 <Film className="w-6 h-6 text-gray-600"/>}
                                                            </div>
                                                            <div className="flex-grow space-y-1">
                                                                <p className="text-xs text-gray-400 italic line-clamp-2">"{scene.text}"</p>
                                                                <textarea value={scene.prompt} onChange={e => setScenes(prev => prev.map(s => s.id === scene.id ? {...s, prompt: e.target.value} : s))} rows={2} className={`${inputClasses} w-full text-xs`}/>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2 mt-2">
                                                            <select value={scene.model} onChange={e => setScenes(prev => prev.map(s => s.id === scene.id ? {...s, model: e.target.value as AIModel} : s))} className={`${selectClasses} text-xs flex-grow`}>
                                                                {videoModels.map(m => <option key={m} value={m}>{m}</option>)}
                                                            </select>
                                                            <Button size="sm" onClick={() => handleGenerateClip(scene.id)} isLoading={scene.generationStatus === 'generating'}>{scene.videoUrl ? t('contentGenerator.regenerate') : t('aiVideoStudio.generateVisuals')}</Button>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                    {activeTab === 'effects' && (
                                        <div className="space-y-3">
                                            {scenes.map(scene => {
                                                const sceneEffects = scene.effects || [];
                                                return (
                                                    <Card key={scene.id} className="bg-gray-800/50">
                                                        <div className="p-3">
                                                            <div className="flex gap-3 items-center">
                                                                <div className="relative w-16 h-9 bg-gray-900/50 rounded-md flex-shrink-0">
                                                                    {scene.videoUrl && <video src={scene.videoUrl} className="w-full h-full object-cover rounded-md" muted loop playsInline />}
                                                                </div>
                                                                <p className="text-xs text-gray-400 italic flex-grow line-clamp-2">"{scene.text}"</p>
                                                            </div>
                                                            <div className="mt-2 flex flex-wrap gap-2">
                                                                {videoEffects.map(effect => (
                                                                    <Button
                                                                        key={effect}
                                                                        size="sm"
                                                                        variant={sceneEffects.includes(effect) ? 'primary' : 'secondary'}
                                                                        onClick={() => handleToggleEffect(scene.id, effect)}
                                                                    >
                                                                        {t(`effectNames.${effect}`)}
                                                                    </Button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </Card>
                                                );
                                            })}
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
                            <CardHeader><CardTitle>{t('aiVideoStudio.preview')}</CardTitle></CardHeader>
                            <div className="p-4">
                                <div className="relative aspect-video bg-gray-900 rounded-md flex items-center justify-center overflow-hidden">
                                    {firstSceneWithVideo ? 
                                        <video src={firstSceneWithVideo.videoUrl} className="w-full h-full object-contain" autoPlay muted loop playsInline/> :
                                        <Film className="w-16 h-16 text-gray-700"/>
                                    }
                                    {firstSceneWithVideo?.effects && firstSceneWithVideo.effects.length > 0 && (
                                        <div className="absolute top-2 left-2 flex flex-col space-y-1 z-10">
                                            {firstSceneWithVideo.effects.map(effect => <EffectBadge key={effect} effect={effect} />)}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group">
                                        <Play className="w-16 h-16 text-white/50 group-hover:text-white/80 transition-colors cursor-pointer group-hover:scale-110"/>
                                    </div>
                                </div>
                            </div>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>{t('aiVideoStudio.timeline')}</CardTitle>
                                <CardDescription>{t('aiVideoStudio.timelineDescription')}</CardDescription>
                            </CardHeader>
                             <div className="p-4 space-y-1">
                                <TimelineTrack title={t('aiVideoStudio.videoTrack')} icon={<Film className="h-5 w-5 text-gray-300" />}>
                                    {scenes.some(s => s.videoUrl) ? 
                                    <div className="flex items-center h-full p-1 space-x-1 overflow-x-auto">
                                        {scenes.map(s => (
                                            <div key={s.id} className="relative h-full aspect-video rounded flex-shrink-0 bg-gray-700">
                                                {s.videoUrl ? <video src={s.videoUrl} className="w-full h-full object-cover rounded" muted loop playsInline/> : null}
                                                {s.effects && s.effects.length > 0 && (
                                                    <div className="absolute top-1 right-1 flex space-x-0.5">
                                                        {s.effects.map(effect => <EffectBadge key={effect} effect={effect} />)}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    : <span className="text-xs text-gray-500 w-full text-center">Empty Track</span>}
                                </TimelineTrack>
                                <TimelineTrack title={t('aiVideoStudio.voiceTrack')} icon={<Mic2 className="h-5 w-5 text-gray-300" />}>
                                    {voiceoverData ? <Waveform /> : <span className="text-xs text-gray-500 w-full text-center">Empty Track</span>}
                                </TimelineTrack>
                                <TimelineTrack title={t('aiVideoStudio.musicTrack')} icon={<Music className="h-5 w-5 text-gray-300" />}>
                                    {musicData ? <Waveform /> : <span className="text-xs text-gray-500 w-full text-center">Empty Track</span>}
                                </TimelineTrack>
                                <TimelineTrack title={t('aiVideoStudio.sfxTrack')} icon={<Volume2 className="h-5 w-5 text-gray-300" />}>
                                    {sfxLibrary.length > 0 ? <div className="flex items-center h-full px-2">{sfxLibrary.map(sfx => <div key={sfx.id} className="h-3/5 w-10 bg-purple-500/50 rounded-sm mr-2 flex-shrink-0" title={sfx.name} />)}</div> : <span className="text-xs text-gray-500 w-full text-center">Empty Track</span>}
                                </TimelineTrack>
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