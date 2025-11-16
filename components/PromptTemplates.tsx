import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { Button } from './common/Button';
import { TemplateIcon } from './Icons';
import { useI18n } from '../hooks/useI18n';

type TemplateType = 'script' | 'titles' | 'description' | 'captions' | 'storyboard' | 'video_payload' | 'comment' | 'ab_test' | 'analytics' | 'voiceover';

interface PromptTemplate {
    id: string;
    nameKey: string;
    type: TemplateType;
    content: string;
}

const initialTemplates: PromptTemplate[] = [
    { 
        id: '1', 
        nameKey: 'promptTemplates.template_names.15s_video_script', 
        type: 'script', 
        content: `System: You are a sales copywriter specializing in 9:16 TikTok videos with a conversion goal. Write a 15-second script with a hook in the first 3 seconds. Structure: Hook (<=3s), Problem (3s), Solution (7s), CTA (2s). Tone: {{tone}}. Do not use words longer than 12 letters in a sentence.\n\nUser payload:\nproduct_name: {{product_name}}\naudience: {{audience}}\ntone: {{tone}}\nbenefit: {{main_benefit}}\ncta: {{cta_text}}`
    },
    { 
        id: '2', 
        nameKey: 'promptTemplates.template_names.caption_hashtag',
        type: 'captions', 
        content: `Role: You are a content strategist. Write 5 short captions (<=100 characters) and 10 relevant hashtags for a promotional video about {{product_name}} targeting {{audience}}. Output as a JSON array of captions and a separate array of hashtags.` 
    },
    { 
        id: '3', 
        nameKey: 'promptTemplates.template_names.product_description', 
        type: 'description', 
        content: `Write a 120-140 word description for the product {{product_name}}, emphasizing {{benefit}}, and ending with the CTA: {{cta}}. Tone: {{tone}}.` 
    },
    { 
        id: '4', 
        nameKey: 'promptTemplates.template_names.tts_voiceover',
        type: 'voiceover', 
        content: `Normalize the following text for Text-to-Speech (TTS), max 45 words, with clear sentence breaks, using natural language suitable for a female voice aged 25-35.\nInput: {{dialogue}}\nOutput:` 
    },
    {
        id: '5',
        nameKey: 'promptTemplates.template_names.short_subtitle',
        type: 'captions',
        content: `Summarize the following audio script into 3-4 subtitle segments, each <= 20 characters, preserving the main idea.\nInput: {{full_script}}`
    },
    {
        id: '6',
        nameKey: 'promptTemplates.template_names.storyboard_generator',
        type: 'storyboard',
        content: `You are a short-form video director. Divide the following script into 3 scenes for a 9:16 video. For each scene, describe the visuals, character actions, on-screen caption, and duration.\nScript: {{short_script}}`
    },
    {
        id: '7',
        nameKey: 'promptTemplates.template_names.video_ai_payload',
        type: 'video_payload',
        content: `Generate a JSON payload for a video AI based on this storyboard.\nscene_1: A 30-year-old woman applying serum, close-up shot on her face, soft lighting, 3s.\nscene_2: Close-up of the product with text overlay 'Ready to be beautiful today', 7s.\nvoice_text: {{tts_ready_text}}\naspect_ratio: "9:16"\nstyle: {{style}}`
    },
    {
        id: '8',
        nameKey: 'promptTemplates.template_names.comment_responder',
        type: 'comment',
        content: `You are a community manager. Write 6 template responses for comments: thanking, purchase instructions, warranty questions, and promotions. Tone: friendly.`
    },
    {
        id: '9',
        nameKey: 'promptTemplates.template_names.ab_test_generator',
        type: 'ab_test',
        content: `Generate 3 short titles (<=35 characters) and 3 thumbnail text variations to A/B test CTR for the product {{product_name}}.`
    },
    {
        id: '10',
        nameKey: 'promptTemplates.template_names.performance_analyzer',
        type: 'analytics',
        content: `Input: {{video_metrics}} including views, ctr, watch_time, orders. Analyze strengths/weaknesses and suggest 3 subsequent optimization actions (A/B test, change hook, change CTA).`
    }
];


export const PromptTemplates: React.FC = () => {
    const [templates, setTemplates] = useState(initialTemplates);
    const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const { t } = useI18n();
    
    const typeStyles: Record<TemplateType, { color: string, label: string }> = {
        script: { color: 'bg-blue-500/20 text-blue-300', label: t('promptTemplates.script') },
        titles: { color: 'bg-green-500/20 text-green-300', label: t('promptTemplates.titles') },
        description: { color: 'bg-yellow-500/20 text-yellow-300', label: t('promptTemplates.description') },
        captions: { color: 'bg-purple-500/20 text-purple-300', label: t('promptTemplates.captions') },
        storyboard: { color: 'bg-indigo-500/20 text-indigo-300', label: t('promptTemplates.storyboard') },
        video_payload: { color: 'bg-pink-500/20 text-pink-300', label: t('promptTemplates.video_payload') },
        comment: { color: 'bg-teal-500/20 text-teal-300', label: t('promptTemplates.comment') },
        ab_test: { color: 'bg-orange-500/20 text-orange-300', label: t('promptTemplates.ab_test') },
        analytics: { color: 'bg-red-500/20 text-red-300', label: t('promptTemplates.analytics') },
        voiceover: { color: 'bg-cyan-500/20 text-cyan-300', label: t('promptTemplates.voiceover') },
    }

    const handleSelectTemplate = (template: PromptTemplate) => {
        setSelectedTemplate(template);
        setIsCreating(false);
    }

    const handleCreateNew = () => {
        setIsCreating(true);
        setSelectedTemplate({ id: `temp_${Date.now()}`, nameKey: '', type: 'script', content: '' });
    }

    const handleSave = () => {
        if (!selectedTemplate) return;
        
        // A real app would have better validation
        const templateToSave = {
            ...selectedTemplate,
            nameKey: isCreating ? `promptTemplates.template_names.custom_${Date.now()}` : selectedTemplate.nameKey
        };

        if (isCreating) {
            setTemplates(prev => [...prev, templateToSave]);
        } else {
            setTemplates(prev => prev.map(t => t.id === templateToSave.id ? templateToSave : t));
        }
        setSelectedTemplate(null);
        setIsCreating(false);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
                 <Button onClick={handleCreateNew} className="w-full">{t('promptTemplates.createButton')}</Button>
                 <Card>
                    <CardHeader>
                        <CardTitle>{t('promptTemplates.templates')}</CardTitle>
                    </CardHeader>
                     <ul className="divide-y divide-gray-800 p-2 list-item-highlight max-h-[60vh] overflow-y-auto">
                        {templates.map(template => (
                             <li key={template.id} onClick={() => handleSelectTemplate(template)} className={`p-3 rounded-lg cursor-pointer ${selectedTemplate?.id === template.id ? 'bg-gray-800/50' : ''}`}>
                                <div className="flex justify-between items-center">
                                     <p className="font-semibold text-bright">{t(template.nameKey) || template.nameKey}</p>
                                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeStyles[template.type].color}`}>{typeStyles[template.type].label}</span>
                                </div>
                                <p className="text-sm text-gray-400 truncate mt-1">{template.content}</p>
                            </li>
                        ))}
                    </ul>
                 </Card>
            </div>
            <div className="lg:col-span-2">
                {selectedTemplate ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>{isCreating ? t('promptTemplates.createTitle') : t('promptTemplates.editTitle')}</CardTitle>
                            <CardDescription>{t('promptTemplates.description')}</CardDescription>
                        </CardHeader>
                        <div className="p-6 space-y-4">
                             <div>
                                <label htmlFor="template-name" className="block text-sm font-medium text-gray-300 mb-1">{t('promptTemplates.nameLabel')}</label>
                                <input 
                                    type="text" 
                                    id="template-name" 
                                    value={t(selectedTemplate.nameKey) || selectedTemplate.nameKey}
                                    onChange={(e) => setSelectedTemplate({...selectedTemplate, nameKey: e.target.value})}
                                    className="w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                            </div>
                            <div>
                                <label htmlFor="template-type" className="block text-sm font-medium text-gray-300 mb-1">{t('promptTemplates.typeLabel')}</label>
                                <select 
                                    id="template-type"
                                    value={selectedTemplate.type}
                                    onChange={(e) => setSelectedTemplate({...selectedTemplate, type: e.target.value as TemplateType})}
                                    className="w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500">
                                    {Object.keys(typeStyles).map(key => (
                                        <option key={key} value={key}>{typeStyles[key as TemplateType].label}</option>
                                    ))}
                                </select>
                            </div>
                             <div>
                                <label htmlFor="template-content" className="block text-sm font-medium text-gray-300 mb-1">{t('promptTemplates.contentLabel')}</label>
                                <textarea 
                                    id="template-content"
                                    rows={10}
                                    value={selectedTemplate.content}
                                    onChange={(e) => setSelectedTemplate({...selectedTemplate, content: e.target.value})}
                                    className="w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 font-mono text-sm"
                                    placeholder={t('promptTemplates.placeholder')}
                                />
                                <p className="text-xs text-gray-500 mt-1">{t('promptTemplates.helpText')}</p>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button variant="secondary" onClick={() => setSelectedTemplate(null)}>{t('promptTemplates.cancel')}</Button>
                                <Button onClick={handleSave}>{t('promptTemplates.save')}</Button>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <div className="flex items-center justify-center h-full rounded-lg border-2 border-dashed border-gray-700">
                        <div className="text-center">
                            <TemplateIcon className="mx-auto h-12 w-12 text-gray-500" />
                            <h3 className="mt-2 text-sm font-semibold text-gray-400">{t('promptTemplates.selectPrompt')}</h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};