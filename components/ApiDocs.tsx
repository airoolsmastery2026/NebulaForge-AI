import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { Button } from './common/Button';
import { useI18n } from '../hooks/useI18n';
import { PlatformLogo } from './PlatformLogo';
import { ExternalLink, BookOpen } from './LucideIcons';

const platformData = [
    {
        id: 'google',
        logoId: 'google',
        nameKey: 'apiDocs.platforms.google.name',
        instructionsKey: 'apiDocs.platforms.google.instructions',
        consoleUrl: 'https://console.cloud.google.com/apis/credentials',
        docsUrl: 'https://developers.google.com/identity/protocols/oauth2'
    },
    {
        id: 'facebook',
        logoId: 'facebook',
        nameKey: 'apiDocs.platforms.facebook.name',
        instructionsKey: 'apiDocs.platforms.facebook.instructions',
        consoleUrl: 'https://developers.facebook.com/apps',
        docsUrl: 'https://developers.facebook.com/docs/facebook-login'
    },
    {
        id: 'zalo',
        logoId: 'zalo',
        nameKey: 'apiDocs.platforms.zalo.name',
        instructionsKey: 'apiDocs.platforms.zalo.instructions',
        consoleUrl: 'https://developers.zalo.me',
        docsUrl: 'https://developers.zalo.me/docs'
    },
    {
        id: 'tiktok',
        logoId: 'tiktok',
        nameKey: 'apiDocs.platforms.tiktok.name',
        instructionsKey: 'apiDocs.platforms.tiktok.instructions',
        consoleUrl: 'https://developers.tiktok.com/apps',
        docsUrl: 'https://developers.tiktok.com/doc/login-kit-web'
    },
    {
        id: 'microsoft',
        logoId: 'microsoft',
        nameKey: 'apiDocs.platforms.microsoft.name',
        instructionsKey: 'apiDocs.platforms.microsoft.instructions',
        consoleUrl: 'https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade',
        docsUrl: 'https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow'
    },
    {
        id: 'github',
        logoId: 'github',
        nameKey: 'apiDocs.platforms.github.name',
        instructionsKey: 'apiDocs.platforms.github.instructions',
        consoleUrl: 'https://github.com/settings/developers',
        docsUrl: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps'
    },
    {
        id: 'discord',
        logoId: 'discord',
        nameKey: 'apiDocs.platforms.discord.name',
        instructionsKey: 'apiDocs.platforms.discord.instructions',
        consoleUrl: 'https://discord.com/developers/applications',
        docsUrl: 'https://discord.com/developers/docs/topics/oauth2'
    },
    {
        id: 'spotify',
        logoId: 'spotify',
        nameKey: 'apiDocs.platforms.spotify.name',
        instructionsKey: 'apiDocs.platforms.spotify.instructions',
        consoleUrl: 'https://developer.spotify.com/dashboard',
        docsUrl: 'https://developer.spotify.com/documentation/web-api'
    },
    {
        id: 'linkedin',
        logoId: 'linkedin',
        nameKey: 'apiDocs.platforms.linkedin.name',
        instructionsKey: 'apiDocs.platforms.linkedin.instructions',
        consoleUrl: 'https://www.linkedin.com/developers/apps',
        docsUrl: 'https://learn.microsoft.com/en-us/linkedin/shared/authentication'
    }
];

const envExample = `# Google Gemini AI (for script & video generation)
API_KEY=YOUR_GOOGLE_GEMINI_API_KEY

# TikTok API (for automatic video posting)
TIKTOK_ACCESS_TOKEN=YOUR_TIKTOK_ACCESS_TOKEN

# YouTube API (for posting Shorts)
YT_CLIENT_ID=YOUR_YT_CLIENT_ID
YT_CLIENT_SECRET=YOUR_YT_CLIENT_SECRET
YT_REDIRECT_URI=http://localhost:3000/oauth2callback
YT_REFRESH_TOKEN=YOUR_YT_REFRESH_TOKEN

# Facebook / Instagram Reels API
FB_PAGE_ID=YOUR_FB_PAGE_ID
FB_ACCESS_TOKEN=YOUR_FB_PAGE_ACCESS_TOKEN

# Optional video storage path
VIDEO_OUTPUT_PATH=outputs/
`.trim();

const installCommands = `
npm install express puppeteer node-fetch form-data node-cron googleapis
`.trim();

export const ApiDocs: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="space-y-8">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle className="text-3xl">{t('apiDocs.title')}</CardTitle>
                    <CardDescription>{t('apiDocs.description')}</CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('apiDocs.installationTitle')}</CardTitle>
                    <CardDescription>{t('apiDocs.installationDescription')}</CardDescription>
                </CardHeader>
                <div className="p-4">
                    <pre className="bg-gray-800/50 p-4 rounded-md text-gray-200 text-xs overflow-x-auto">
                        <code>{installCommands}</code>
                    </pre>
                </div>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>{t('apiDocs.envTitle')}</CardTitle>
                    <CardDescription>{t('apiDocs.envDescription')}</CardDescription>
                </CardHeader>
                <div className="p-4">
                    <pre className="bg-gray-800/50 p-4 rounded-md text-gray-200 text-xs overflow-x-auto">
                        <code>{envExample}</code>
                    </pre>
                </div>
            </Card>
            
            <Card>
                 <CardHeader>
                    <CardTitle>{t('apiDocs.apiCredentialsTitle')}</CardTitle>
                    <CardDescription>{t('apiDocs.apiCredentialsDescription')}</CardDescription>
                </CardHeader>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {platformData.map((platform) => (
                        <Card key={platform.id} className="flex flex-col bg-gray-800/30">
                            <CardHeader className="flex items-center space-x-4">
                                <PlatformLogo platformId={platform.logoId} className="w-12 h-12" />
                                <CardTitle className="text-xl">{t(platform.nameKey)}</CardTitle>
                            </CardHeader>
                            <div className="p-4 flex-grow">
                                <ul className="space-y-2 text-sm text-gray-300">
                                    {t(platform.instructionsKey).split('\n').map((line: string, index: number) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-primary-400 mr-2 mt-1">&#8227;</span>
                                            <span>{line.replace(/^- /, '')}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-4 border-t border-gray-700 flex flex-col sm:flex-row gap-2">
                                <a href={platform.consoleUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                                    <Button variant="secondary" className="w-full" icon={<ExternalLink className="h-4 w-4" />}>
                                        {t('apiDocs.goToConsole')}
                                    </Button>
                                </a>
                                <a href={platform.docsUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                                    <Button variant="ghost" className="w-full" icon={<BookOpen className="h-4 w-4" />}>
                                        {t('apiDocs.viewDocs')}
                                    </Button>
                                </a>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    );
};