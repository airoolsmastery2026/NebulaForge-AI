import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { useI18n } from '../hooks/useI18n';
import { Code, Zap, Settings, BookOpen, KeyRound } from './LucideIcons';

const Section: React.FC<{ title: string, id: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, id, icon, children }) => (
    <Card id={id} className="mb-8 transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary-500/10">
              {icon}
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
            </div>
        </CardHeader>
        <div className="p-6 prose prose-sm sm:prose-base prose-invert max-w-none prose-pre:bg-gray-800/50 prose-pre:text-gray-200 prose-a:text-primary-400 hover:prose-a:text-primary-300">
            {children}
        </div>
    </Card>
);

const tocItems = [
    { id: 'introduction', key: 'introduction_title', icon: <Code className="h-5 w-5 text-primary-600" /> },
    { id: 'gettingStarted', key: 'gettingStarted_title', icon: <Settings className="h-5 w-5 text-primary-600" /> },
    { id: 'coreFeatures', key: 'coreFeatures_title', icon: <Zap className="h-5 w-5 text-primary-600" /> },
    { id: 'bestPractices', key: 'bestPractices_title', icon: <BookOpen className="h-5 w-5 text-primary-600" /> },
    { id: 'apiKeys', key: 'apiKeys_title', icon: <KeyRound className="h-5 w-5 text-primary-600" /> },
];

const masterPrompt = `
🎯 Task: Create a guide table + official links to the page for getting Client ID and Client Secret for popular OAuth platforms.

📋 List of platforms to support:
- Google API
- Facebook (Meta)
- Zalo
- TikTok
- GitHub
- Discord
- Microsoft (Azure)
- Spotify
- LinkedIn

✅ Required output:
1. Clearly display the official link to create an app (clickable URL).
2. Briefly state the location to view Client ID and Client Secret.
3. Attach the official documentation link for each platform.
4. Allow selecting a platform using keywords: “Google”, “Facebook”, “Zalo”, “TikTok”, …
5. If the user selects 1 platform, only show detailed instructions for that platform.

💾 Present the result in Markdown table format or selection cards (UI).
`.trim();

const envExample = `
# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Facebook
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=

# Zalo
ZALO_APP_ID=
ZALO_APP_SECRET=

# TikTok
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=

# GitHub
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Discord
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

# Spotify
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=

# LinkedIn
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=

# Microsoft
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
`.trim();

export const LlamaCoderGuide: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="container mx-auto">
            <Card className="mb-8 text-center">
                <CardHeader>
                    <CardTitle className="text-3xl">{t('llamaCoderGuide.title')}</CardTitle>
                    <CardDescription>{t('llamaCoderGuide.description')}</CardDescription>
                </CardHeader>
            </Card>

            <main>
                {tocItems.map(item => (
                    <Section 
                        key={item.id}
                        id={item.id} 
                        title={t(`llamaCoderGuide.${item.key}`)}
                        icon={React.cloneElement(item.icon, { className: "h-6 w-6 text-primary-600" })}
                    >
                        <p>{t(`llamaCoderGuide.${item.id}_content`)}</p>
                    </Section>
                ))}
                 <Section 
                        id="apiKeys" 
                        title={t('llamaCoderGuide.apiKeys_title')}
                        icon={<KeyRound className="h-6 w-6 text-primary-600" />}
                    >
                        <p>{t('llamaCoderGuide.apiKeys_content_intro')}</p>
                        
                        <h4>{t('llamaCoderGuide.apiKeys_content_master_prompt_title')}</h4>
                        <p>{t('llamaCoderGuide.apiKeys_content_master_prompt_desc')}</p>
                        <pre><code>{masterPrompt}</code></pre>

                        <h4>{t('llamaCoderGuide.apiKeys_content_platform_specific_title')}</h4>
                        <p>{t('llamaCoderGuide.apiKeys_content_platform_specific_desc')}</p>
                        <ul>
                            <li><strong>Google API</strong>
                                <ul>
                                    <li>Link: <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer">https://console.cloud.google.com/apis/credentials</a></li>
                                    <li>Create OAuth 2.0 Client ID, select Web application type.</li>
                                    <li>Client ID and Client Secret are displayed after creation.</li>
                                </ul>
                            </li>
                             <li><strong>Facebook / Instagram</strong>
                                <ul>
                                    <li>Link: <a href="https://developers.facebook.com/apps" target="_blank" rel="noopener noreferrer">https://developers.facebook.com/apps</a></li>
                                    <li>Create App → Settings → Basic.</li>
                                    <li>App ID = Client ID, App Secret = Client Secret.</li>
                                </ul>
                            </li>
                            <li><strong>Zalo</strong>
                                <ul>
                                    <li>Link: <a href="https://developers.zalo.me" target="_blank" rel="noopener noreferrer">https://developers.zalo.me</a></li>
                                    <li>Select "My Applications" → Create New Application.</li>
                                    <li>View App ID and App Secret in "Application Info".</li>
                                </ul>
                            </li>
                             <li><strong>TikTok</strong>
                                <ul>
                                    <li>Link: <a href="https://developers.tiktok.com/apps" target="_blank" rel="noopener noreferrer">https://developers.tiktok.com/apps</a></li>
                                    <li>Create App → My Apps → App Details.</li>
                                    <li>Client Key = Client ID, Client Secret = the secret code.</li>
                                </ul>
                            </li>
                        </ul>

                        <h4>{t('llamaCoderGuide.apiKeys_content_env_title')}</h4>
                        <p>{t('llamaCoderGuide.apiKeys_content_env_desc')}</p>
                        <pre><code>{envExample}</code></pre>

                    </Section>
            </main>
        </div>
    );
};