import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { Button } from './common/Button';
import { Download } from './LucideIcons';
import type { RenderJob } from '../types';
import { useI18n } from '../hooks/useI18n';
import { checkVideoGenerationStatus, getVideoResult } from '../services/geminiService';
import { GEMINI_TTS_SAMPLE_RATE } from '../constants';


interface RenderQueueProps {
    jobs: RenderJob[];
    setJobs: React.Dispatch<React.SetStateAction<RenderJob[]>>;
}

const statusColors: Record<RenderJob['status'], string> = {
    Queued: 'bg-slate-500/20 text-slate-300',
    Rendering: 'bg-blue-500/20 text-blue-300',
    Completed: 'bg-teal-500/20 text-teal-300',
    Composing: 'bg-purple-500/20 text-purple-300',
    Ready: 'bg-green-500/20 text-green-300',
    Failed: 'bg-red-500/20 text-red-300',
};

const modelColors: Record<string, string> = {
    'Sora 2': 'border-purple-500',
    'VEO 3.1 (Fast)': 'border-blue-500',
    'VEO 3.1 (HQ)': 'border-teal-400',
    'Suno': 'border-pink-500',
    'Dreamina': 'border-yellow-500',
    'KlingAI': 'border-green-500',
    'ElevenLabs Voice AI': 'border-cyan-500',
    'gemini-2.5-flash-preview-tts': 'border-sky-500',
    'Gemini SFX Generator': 'border-indigo-400',
};

// Helper function to decode base64 string to ArrayBuffer
const decode = (base64: string): ArrayBuffer => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};

// Function to create a WAV blob from raw PCM data (in base64)
const createWavBlob = (base64Pcm: string): Blob => {
    const audioData = decode(base64Pcm);
    const sampleRate = GEMINI_TTS_SAMPLE_RATE;
    const numChannels = 1;
    const bitsPerSample = 16;
    const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
    const blockAlign = numChannels * (bitsPerSample / 8);
    const dataSize = audioData.byteLength;
    const wavHeaderSize = 44;
    const fileSize = dataSize + wavHeaderSize;

    const buffer = new ArrayBuffer(fileSize);
    const view = new DataView(buffer);

    // RIFF chunk descriptor
    view.setUint32(0, 0x52494646, false); // "RIFF"
    view.setUint32(4, fileSize - 8, true); // file-size - 8
    view.setUint32(8, 0x57415645, false); // "WAVE"

    // "fmt " sub-chunk
    view.setUint32(12, 0x666d7420, false); // "fmt "
    view.setUint32(16, 16, true); // 16 for PCM
    view.setUint16(20, 1, true); // Audio format 1=PCM
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);

    // "data" sub-chunk
    view.setUint32(36, 0x64617461, false); // "data"
    view.setUint32(40, dataSize, true);

    // Write PCM data
    new Uint8Array(buffer, wavHeaderSize).set(new Uint8Array(audioData));
    
    return new Blob([buffer], { type: 'audio/wav' });
};

export const RenderQueue: React.FC<RenderQueueProps> = ({ jobs, setJobs }) => {
    const { t } = useI18n();
    
    // Effect for polling video generation status
    useEffect(() => {
        const jobsToPoll = jobs.filter(j => (j.status === 'Queued' || j.status === 'Rendering') && j.videoOperation && !j.videoOperation.done);
        if (jobsToPoll.length === 0) return;

        const poll = async () => {
            for (const job of jobsToPoll) {
                const updatedOperation = await checkVideoGenerationStatus(job.videoOperation);
                
                // Use a functional update to prevent race conditions with state
                setJobs(prevJobs => prevJobs.map(j => {
                    if (j.id === job.id) {
                        if (updatedOperation.done) {
                            if (updatedOperation.error) {
                                console.error(`Job ${j.id} failed:`, updatedOperation.error);
                                return { ...j, status: 'Failed', progress: 100, videoOperation: updatedOperation };
                            }
                            const videoUri = updatedOperation.response?.generatedVideos?.[0]?.video?.uri;
                            return { ...j, status: 'Composing', progress: 100, videoOperation: updatedOperation, videoUrl: videoUri };
                        }
                        const progress = j.progress < 95 ? j.progress + Math.floor(Math.random() * 5) : 95;
                        return { ...j, status: 'Rendering', progress, videoOperation: updatedOperation };
                    }
                    return j;
                }));
            }
        };

        const intervalId = setInterval(poll, 10000); // Poll every 10 seconds
        return () => clearInterval(intervalId);
    }, [jobs, setJobs]);

    // Effect for handling state transition: Composing -> Ready
    useEffect(() => {
        const composingJobsExist = jobs.some(j => j.status === 'Composing');
        if (composingJobsExist) {
            const timer = setTimeout(() => {
                setJobs(prevJobs => prevJobs.map(j => 
                    j.status === 'Composing' ? { ...j, status: 'Ready' } : j
                ));
            }, 3000); // Simulate 3-second composition time
            return () => clearTimeout(timer);
        }
    }, [jobs, setJobs]);
    
    const handleDownload = async (job: RenderJob) => {
        const downloadFile = (blob: Blob, fileName: string) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };
    
        // Download main audio if it exists
        if (job.audioData) {
            const audioBlob = createWavBlob(job.audioData);
            downloadFile(audioBlob, `${job.productName}_voiceover.wav`);
        }
    
        // Handle jobs from AI Video Studio
        if (job.scenes && job.scenes.length > 0) {
            for (const [index, scene] of job.scenes.entries()) {
                if (scene.videoOperation?.response) {
                    const videoUri = scene.videoOperation.response?.generatedVideos?.[0]?.video?.uri;
                    if (videoUri) {
                        const videoBlob = await getVideoResult(videoUri);
                        if (videoBlob) {
                            downloadFile(videoBlob, `${job.productName}_scene_${index + 1}.mp4`);
                        }
                    }
                }
            }
        } 
        // Handle simple jobs from Publisher
        else if (job.videoUrl) {
            const videoBlob = await getVideoResult(job.videoUrl);
            if (videoBlob) {
                downloadFile(videoBlob, `${job.productName}_video.mp4`);
            }
        }
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('renderQueue.title')}</CardTitle>
                <CardDescription>{t('renderQueue.description')}</CardDescription>
            </CardHeader>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('renderQueue.product')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('renderQueue.status')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('renderQueue.progress')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('renderQueue.models')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('renderQueue.created')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('renderQueue.actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 table-row-highlight">
                        {jobs.length > 0 ? jobs.map(job => (
                            <tr key={job.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-bright">{job.productName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[job.status]}`}>
                                        {t(`renderQueue.${job.status}`)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <div className="flex items-center">
                                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                                            <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: `${job.progress}%` }}></div>
                                        </div>
                                        <span className="ml-3">{job.progress}%</span>
                                    </div>
                                </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    <div className="flex flex-wrap gap-1">
                                        {job.models.map(model => (
                                            <span key={model} className={`px-2 py-0.5 text-xs rounded border ${modelColors[model] || 'border-gray-600'}`}>{model}</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(job.createdAt).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Button size="sm" variant="ghost" disabled={job.status !== 'Ready'} onClick={() => handleDownload(job)}>
                                        <Download className="h-4 w-4 mr-2" />
                                        Download Package
                                    </Button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                    {t('renderQueue.noJobs')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};