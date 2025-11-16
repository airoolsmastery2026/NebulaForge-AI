
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { Button } from './common/Button';
import { 
    ExternalLink, 
    Save,
    Trash,
    HardDriveDownload,
    HardDriveUpload,
    X as XIcon,
    Zap,
    HelpCircle,
    BookOpen
} from './LucideIcons';
import { useI18n } from '../hooks/useI18n';
import { PlatformLogo } from './PlatformLogo';
import { FacebookTokenManager } from './FacebookTokenManager';
import type { Connection, ConnectionStatus } from '../types';
import { Page } from '../types';
import { checkPlatformStatus } from '../services/platformStatusService';
import { getConnections, saveConnections as saveConnectionsApi } from '../services/apiService';


interface ConnectionField {
    name: string;
    type: 'text' | 'password';
    helpTextKey: string;
    helpUrl?: string;
}

interface Platform {
    id: string;
    nameKey: string;
    icon: React.ReactNode;
    fields: ConnectionField[];
    docsUrl: string;
}

const platforms: Record<string, Platform> = {
    gemini: { id: "gemini", nameKey: "connections.gemini", icon: <PlatformLogo platformId="gemini" />, fields: [{name: 'API_KEY', type: 'password', helpTextKey: 'connections.help.API_KEY'}], docsUrl: 'https://ai.google.dev/gemini-api/docs/api-key' },
    youtube: { id: "youtube", nameKey: "connections.youtube", icon: <PlatformLogo platformId="youtube" />, fields: [{name: 'CLIENT_ID', type: 'text', helpTextKey: 'connections.help.CLIENT_ID'}, {name: 'CLIENT_SECRET', type: 'password', helpTextKey: 'connections.help.CLIENT_SECRET'}], docsUrl: 'https://console.cloud.google.com/apis/credentials' },
    tiktok: { id: "tiktok", nameKey: "connections.tiktok", icon: <PlatformLogo platformId="tiktok" />, fields: [{name: 'CLIENT_KEY', type: 'text', helpTextKey: 'connections.help.CLIENT_KEY'}, {name: 'CLIENT_SECRET', type: 'password', helpTextKey: 'connections.help.CLIENT_SECRET'}], docsUrl: 'https://developers.tiktok.com/documents/get-started' },
    instagram: { id: "instagram", nameKey: "connections.instagram", icon: <PlatformLogo platformId="instagram" />, fields: [{name: 'ACCESS_TOKEN', type: 'password', helpTextKey: 'connections.help.ACCESS_TOKEN'}], docsUrl: 'https://developers.facebook.com/docs/instagram-basic-display-api/getting-started' },
    x_twitter: { id: "x_twitter", nameKey: "connections.x_twitter", icon: <PlatformLogo platformId="x_twitter" />, fields: [{name: 'API_KEY', type: 'text', helpTextKey: 'connections.help.API_KEY'}, {name: 'API_SECRET', type: 'password', helpTextKey: 'connections.help.API_SECRET'}, {name: 'ACCESS_TOKEN', type: 'password', helpTextKey: 'connections.help.ACCESS_TOKEN'}, {name: 'ACCESS_TOKEN_SECRET', type: 'password', helpTextKey: 'connections.help.ACCESS_TOKEN_SECRET'}], docsUrl: 'https://developer.twitter.com/en/portal/projects-and-apps' },
    pinterest: { id: "pinterest", nameKey: "connections.pinterest", icon: <PlatformLogo platformId="pinterest" />, fields: [{name: 'APP_ID', type: 'text', helpTextKey: 'connections.help.APP_ID'}, {name: 'APP_SECRET', type: 'password', helpTextKey: 'connections.help.APP_SECRET'}], docsUrl: 'https://developers.pinterest.com/docs/getting-started/' },
    clickbank: { id: "clickbank", nameKey: "connections.clickbank", icon: <PlatformLogo platformId="clickbank" />, fields: [{name: 'API_KEY', type: 'password', helpTextKey: 'connections.help.API_KEY'}, {name: 'DEVELOPER_KEY', type: 'password', helpTextKey: 'connections.help.DEVELOPER_KEY'}], docsUrl: 'https://support.clickbank.com/hc/en-us/articles/360004522031-How-do-I-create-an-API-Key-' },
    amazon: { id: "amazon", nameKey: "connections.amazon", icon: <PlatformLogo platformId="amazon" />, fields: [{name: 'ASSOCIATE_TAG', type: 'text', helpTextKey: 'connections.help.ASSOCIATE_TAG'}, {name: 'ACCESS_KEY', type: 'text', helpTextKey: 'connections.help.ACCESS_KEY'}, {name: 'SECRET_KEY', type: 'password', helpTextKey: 'connections.help.SECRET_KEY'}], docsUrl: 'https://webservices.amazon.com/paapi5/documentation/getting-started/register.html' },
    shareasale: { id: "shareasale", nameKey: "connections.shareasale", icon: <PlatformLogo platformId="shareasale" />, fields: [{name: 'MERCHANT_ID', type: 'text', helpTextKey: 'connections.help.MERCHANT_ID'}, {name: 'API_TOKEN', type: 'password', helpTextKey: 'connections.help.API_TOKEN'}, {name: 'API_SECRET', type: 'password', helpTextKey: 'connections.help.API_SECRET'}], docsUrl: 'https://help.shareasale.com/hc/en-us/articles/360044230132-API-Documentation-for-Affiliates' },
    accesstrade: { id: "accesstrade", nameKey: "connections.accesstrade", icon: <PlatformLogo platformId="accesstrade" />, fields: [{name: 'ACCESS_KEY', type: 'text', helpTextKey: 'connections.help.ACCESS_KEY'}, {name: 'SECRET_KEY', type: 'password', helpTextKey: 'connections.help.SECRET_KEY'}], docsUrl: 'https://pub.accesstrade.vn/tools/api_key' },
    digistore24: { id: "digistore24", nameKey: "connections.digistore24", icon: <PlatformLogo platformId="digistore24" />, fields: [{name: 'API_KEY', type: 'password', helpTextKey: 'connections.help.API_KEY'}], docsUrl: 'https://dev.digistore24.com/documentation/api-keys/' },
    jvzoo: { id: "jvzoo", nameKey: "connections.jvzoo", icon: <PlatformLogo platformId="jvzoo" />, fields: [{name: 'API_KEY', type: 'password', helpTextKey: 'connections.help.API_KEY'}], docsUrl: 'https://www.jvzoo.com/developers/api' },
    warriorplus: { id: "warriorplus", nameKey: "connections.warriorplus", icon: <PlatformLogo platformId="warriorplus" />, fields: [{name: 'API_KEY', type: 'password', helpTextKey: 'connections.help.API_KEY'}], docsUrl: 'https://warriorplus.com/account/api' },
    rakuten: { id: "rakuten", nameKey: "connections.rakuten", icon: <PlatformLogo platformId="rakuten" />, fields: [{name: 'ACCESS_TOKEN', type: 'password', helpTextKey: 'connections.help.ACCESS_TOKEN'}, {name: 'SECRET_KEY', type: 'password', helpTextKey: 'connections.help.SECRET_KEY'}], docsUrl: 'https://rakutenadvertising.com/developers/' },
    semrush: { id: "semrush", nameKey: "connections.semrush", icon: <PlatformLogo platformId="semrush" />, fields: [{name: 'API_KEY', type: 'password', helpTextKey: 'connections.help.API_KEY'}, {name: 'AFFILIATE_ID', type: 'text', helpTextKey: 'connections.help.AFFILIATE_ID'}], docsUrl: 'https://www.semrush.com/affiliates/' },
    hubspot: { id: "hubspot", nameKey: "connections.hubspot", icon: <PlatformLogo platformId="hubspot" />, fields: [{name: 'API_KEY', type: 'password', helpTextKey: 'connections.help.API_KEY'}], docsUrl: 'https://developers.hubspot.com/docs/api/overview' },
    cloudways: { id: "cloudways", nameKey: "connections.cloudways", icon: <PlatformLogo platformId="cloudways" />, fields: [{name: 'EMAIL', type: 'text', helpTextKey: 'connections.help.EMAIL'}, {name: 'API_KEY', type: 'password', helpTextKey: 'connections.help.API_KEY'}], docsUrl: 'https://developers.cloudways.com/docs/api-playground' },
    cj: { id: "cj", nameKey: "connections.cj", icon: <PlatformLogo platformId="cj" />, fields: [{name: 'PERSONAL_ACCESS_TOKEN', type: 'password', helpTextKey: 'connections.help.PERSONAL_ACCESS_TOKEN'}], docsUrl: 'https://developers.cj.com/authentication' },
    shopee: { id: "shopee", nameKey: "connections.shopee", icon: <PlatformLogo platformId="shopee" />, fields: [{name: 'PARTNER_ID', type: 'text', helpTextKey: 'connections.help.PARTNER_ID'}, {name: 'API_KEY', type: 'password', helpTextKey: 'connections.help.API_KEY'}], docsUrl: 'https://open.shopee.com/documents' },
    telegram: { id: "telegram", nameKey: "connections.telegram", icon: <PlatformLogo platformId="telegram" />, fields: [{name: 'BOT_TOKEN', type: 'password', helpTextKey: 'connections.help.BOT_TOKEN'}], docsUrl: 'https://core.telegram.org/bots#6-botfather' },
    lazada: { id: "lazada", nameKey: "connections.lazada", icon: <PlatformLogo platformId="lazada" />, fields: [{name: 'APP_KEY', type: 'text', helpTextKey: 'connections.help.APP_KEY'}, {name: 'APP_SECRET', type: 'password', helpTextKey: 'connections.help.APP_SECRET'}], docsUrl: 'https://open.lazada.com/doc/doc.htm' },
    tiki: { id: "tiki", nameKey: "connections.tiki", icon: <PlatformLogo platformId="tiki" />, fields: [{name: 'CLIENT_ID', type: 'text', helpTextKey: 'connections.help.CLIENT_ID'}, {name: 'CLIENT_SECRET', type: 'password', helpTextKey: 'connections.help.CLIENT_SECRET'}], docsUrl: 'https://open.tiki.vn/docs/' },
    zalo: { id: "zalo", nameKey: "connections.zalo", icon: <PlatformLogo platformId="zalo" />, fields: [{name: 'APP_ID', type: 'text', helpTextKey: 'connections.help.APP_ID'}, {name: 'APP_SECRET', type: 'password', helpTextKey: 'connections.help.APP_SECRET'}], docsUrl: 'https://developers.zalo.me/docs/api/official-account-api' },
    momo: { id: "momo", nameKey: "connections.momo", icon: <PlatformLogo platformId="momo" />, fields: [{name: 'PARTNER_CODE', type: 'text', helpTextKey: 'connections.help.PARTNER_CODE'}, {name: 'ACCESS_KEY', type: 'text', helpTextKey: 'connections.help.ACCESS_KEY'}, {name: 'SECRET_KEY', type: 'password', helpTextKey: 'connections.help.SECRET_KEY'}], docsUrl: 'https://developers.momo.vn' },
    vnpay: { id: "vnpay", nameKey: "connections.vnpay", icon: <PlatformLogo platformId="vnpay" />, fields: [{name: 'TMN_CODE', type: 'text', helpTextKey: 'connections.help.TMN_CODE'}, {name: 'HASH_SECRET', type: 'password', helpTextKey: 'connections.help.HASH_SECRET'}], docsUrl: 'https://sandbox.vnpayment.vn/apis/docs/huong-dan-tich-hop/' },
    crypto_com: { id: "crypto_com", nameKey: "connections.crypto_com", icon: <PlatformLogo platformId="crypto_com" />, fields: [{name: 'REFERRAL_CODE', type: 'text', helpTextKey: 'connections.help.REFERRAL_CODE'}], docsUrl: 'https://crypto.com/vi/product-news/exchange-affiliate-2-0' },
    binance: { id: "binance", nameKey: "connections.binance", icon: <PlatformLogo platformId="binance" />, fields: [{name: 'API_KEY', type: 'text', helpTextKey: 'connections.help.API_KEY'}, {name: 'API_SECRET', type: 'password', helpTextKey: 'connections.help.API_SECRET'}], docsUrl: 'https://accounts.binance.com/affiliate' },
    bybit: { id: "bybit", nameKey: "connections.bybit", icon: <PlatformLogo platformId="bybit" />, fields: [{name: 'API_KEY', type: 'text', helpTextKey: 'connections.help.API_KEY'}, {name: 'API_SECRET', type: 'password', helpTextKey: 'connections.help.API_SECRET'}], docsUrl: 'https://www.bybit.com/en/affiliates/' },
    host123: { id: "host123", nameKey: "connections.host123", icon: <PlatformLogo platformId="host123" />, fields: [{name: 'AFFILIATE_ID', type: 'text', helpTextKey: 'connections.help.AFFILIATE_ID'}], docsUrl: 'https://123host.vn/en/affiliates.html' },
    facebook_ads: { id: "facebook_ads", nameKey: "connections.facebook_ads", icon: <PlatformLogo platformId="facebook" />, fields: [{name: 'APP_ID', type: 'text', helpTextKey: 'connections.help.APP_ID'}, {name: 'APP_SECRET', type: 'password', helpTextKey: 'connections.help.APP_SECRET'}, {name: 'REDIRECT_URI', type: 'text', helpTextKey: 'connections.help.REDIRECT_URI'}], docsUrl: 'https://www.facebook.com/business/partner-programs/affiliate' },
    tiktok_ads: { id: "tiktok_ads", nameKey: "connections.tiktok_ads", icon: <PlatformLogo platformId="tiktok" />, fields: [{name: 'CLIENT_ID', type: 'text', helpTextKey: 'connections.help.CLIENT_ID'}, {name: 'CLIENT_SECRET', type: 'password', helpTextKey: 'connections.help.CLIENT_SECRET'}, {name: 'REDIRECT_URI', type: 'text', helpTextKey: 'connections.help.REDIRECT_URI'}], docsUrl: 'https://www.tiktok.com/business/affiliate' },
    youtube_partner: { id: "youtube_partner", nameKey: "connections.youtube_partner", icon: <PlatformLogo platformId="youtube" />, fields: [{name: 'CLIENT_ID', type: 'text', helpTextKey: 'connections.help.CLIENT_ID'}, {name: 'CLIENT_SECRET', type: 'password', helpTextKey: 'connections.help.CLIENT_SECRET'}, {name: 'REDIRECT_URI', type: 'text', helpTextKey: 'connections.help.REDIRECT_URI'}], docsUrl: 'https://www.youtube.com/yt/creators/monetization/affiliate/' },
    instagram_affiliate: { id: "instagram_affiliate", nameKey: "connections.instagram_affiliate", icon: <PlatformLogo platformId="instagram" />, fields: [{name: 'CLIENT_ID', type: 'text', helpTextKey: 'connections.help.CLIENT_ID'}, {name: 'CLIENT_SECRET', type: 'password', helpTextKey: 'connections.help.CLIENT_SECRET'}, {name: 'REDIRECT_URI', type: 'text', helpTextKey: 'connections.help.REDIRECT_URI'}], docsUrl: 'https://www.facebook.com/business/instagram/affiliate' },
    twitter_affiliate: { id: "twitter_affiliate", nameKey: "connections.twitter_affiliate", icon: <PlatformLogo platformId="x_twitter" />, fields: [{name: 'CLIENT_ID', type: 'text', helpTextKey: 'connections.help.CLIENT_ID'}, {name: 'CLIENT_SECRET', type: 'password', helpTextKey: 'connections.help.CLIENT_SECRET'}, {name: 'REDIRECT_URI', type: 'text', helpTextKey: 'connections.help.REDIRECT_URI'}], docsUrl: 'https://ads.twitter.com/affiliate' },
    facebook_token_engine: { id: "facebook_token_engine", nameKey: "connections.facebook_token_engine", icon: <PlatformLogo platformId="facebook_token_engine" />, fields: [], docsUrl: 'https://developers.facebook.com/docs/facebook-login/access-tokens' },
    microsoft: { id: "microsoft", nameKey: "connections.microsoft", icon: <PlatformLogo platformId="microsoft" />, fields: [{name: 'AZURE_CLIENT_ID', type: 'text', helpTextKey: 'connections.help.AZURE_CLIENT_ID'}, {name: 'AZURE_CLIENT_SECRET', type: 'password', helpTextKey: 'connections.help.AZURE_CLIENT_SECRET'}], docsUrl: 'https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade' },
    github: { id: "github", nameKey: "connections.github", icon: <PlatformLogo platformId="github" />, fields: [{name: 'CLIENT_ID', type: 'text', helpTextKey: 'connections.help.CLIENT_ID'}, {name: 'CLIENT_SECRET', type: 'password', helpTextKey: 'connections.help.CLIENT_SECRET'}], docsUrl: 'https://github.com/settings/developers' },
    discord: { id: "discord", nameKey: "connections.discord", icon: <PlatformLogo platformId="discord" />, fields: [{name: 'CLIENT_ID', type: 'text', helpTextKey: 'connections.help.CLIENT_ID'}, {name: 'CLIENT_SECRET', type: 'password', helpTextKey: 'connections.help.CLIENT_SECRET'}], docsUrl: 'https://discord.com/developers/applications' },
    spotify: { id: "spotify", nameKey: "connections.spotify", icon: <PlatformLogo platformId="spotify" />, fields: [{name: 'CLIENT_ID', type: 'text', helpTextKey: 'connections.help.CLIENT_ID'}, {name: 'CLIENT_SECRET', type: 'password', helpTextKey: 'connections.help.CLIENT_SECRET'}], docsUrl: 'https://developer.spotify.com/dashboard' },
    linkedin: { id: "linkedin", nameKey: "connections.linkedin", icon: <PlatformLogo platformId="linkedin" />, fields: [{name: 'CLIENT_ID', type: 'text', helpTextKey: 'connections.help.CLIENT_ID'}, {name: 'CLIENT_SECRET', type: 'password', helpTextKey: 'connections.help.CLIENT_SECRET'}], docsUrl: 'https://www.linkedin.com/developers/apps' },
    googledrive: { id: "googledrive", nameKey: "connections.googledrive", icon: <PlatformLogo platformId="googledrive" />, fields: [{name: 'CLIENT_ID', type: 'text', helpTextKey: 'connections.help.CLIENT_ID'}, {name: 'CLIENT_SECRET', type: 'password', helpTextKey: 'connections.help.CLIENT_SECRET'}], docsUrl: 'https://console.cloud.google.com/apis/credentials' },
};

const platformCategories = [
    { 
        nameKey: 'connections.category_ai', 
        platforms: ['gemini']
    },
    {
        nameKey: 'connections.category_social',
        platforms: ['facebook_token_engine', 'youtube', 'tiktok', 'instagram', 'x_twitter', 'pinterest', 'telegram', 'zalo', 'facebook_ads', 'tiktok_ads', 'youtube_partner', 'instagram_affiliate', 'twitter_affiliate']
    },
    {
        nameKey: 'connections.category_developer',
        platforms: ['microsoft', 'github', 'discord', 'spotify', 'linkedin', 'googledrive']
    },
    {
        nameKey: 'connections.category_affiliate',
        platforms: ['clickbank', 'amazon', 'shareasale', 'accesstrade', 'digistore24', 'jvzoo', 'warriorplus', 'rakuten', 'semrush', 'hubspot', 'cloudways', 'cj', 'host123']
    },
    {
        nameKey: 'connections.category_crypto_financial',
        platforms: ['crypto_com', 'binance', 'bybit', 'shopee', 'lazada', 'tiki', 'momo', 'vnpay']
    }
];

const StatusIndicator: React.FC<{status: ConnectionStatus}> = ({ status }) => {
    const baseClass = 'w-3 h-3 rounded-full';
    switch(status) {
        case 'connected': return <div className={`${baseClass} bg-green-500`}></div>
        case 'refreshing': return <div className={`${baseClass} bg-yellow-500`}></div>
        case 'disconnected':
        default: return <div className={`${baseClass} bg-red-500`}></div>
    }
};

const ConnectionModal: React.FC<{
    platform: Platform;
    connection: Connection | null;
    onSave: (connectionData: Connection) => void;
    onDisconnect: (id: string) => void;
    onClose: () => void;
}> = ({ platform, connection, onSave, onDisconnect, onClose }) => {
    const { t } = useI18n();
    const [credentials, setCredentials] = useState<Record<string, string>>({});
    const [statusCheck, setStatusCheck] = useState<{ running: boolean; message: string | null }>({ running: false, message: null });
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCredentials(connection?.credentials || platform.fields.reduce((acc, f) => ({...acc, [f.name]: ''}), {}));
        setStatusCheck({ running: false, message: null });
    }, [connection, platform]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleSave = () => {
        const newConnection = {
            id: platform.id,
            username: `${t(platform.nameKey)} User`,
            status: 'connected' as ConnectionStatus,
            autoMode: true,
            credentials,
        };
        onSave(newConnection);
        onClose();
    };
    
    const handleDisconnectClick = () => {
        onDisconnect(platform.id);
    };

    const handleCheckStatus = async () => {
        setStatusCheck({ running: true, message: null });
        const result = await checkPlatformStatus(platform.id, credentials);
        setStatusCheck({ running: false, message: result.message });
    };
    
    const isConnected = connection?.status === 'connected' || connection?.status === 'refreshing';
    
    return (
        <div ref={modalRef} className="glass-card w-96 rounded-lg shadow-2xl p-4 space-y-3" onClick={e => e.stopPropagation()}>
             <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold text-base text-gray-100">{t(platform.nameKey)}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                        <StatusIndicator status={connection?.status || 'disconnected'} />
                        <span className="text-xs text-gray-400">{t(`connections.status_${connection?.status || 'disconnected'}`)}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                     <a href={platform.docsUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors" title={t('connections.getApiKeyHelp')}>
                        <ExternalLink className="h-4 w-4" />
                    </a>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <XIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
            
            {!isConnected && platform.fields.map(field => (
                <div key={field.name}>
                    <div className="flex items-center space-x-2 mb-1">
                        <label htmlFor={`${platform.id}-${field.name}`} className="text-xs text-gray-400 block font-mono">{field.name}</label>
                        <div data-tooltip={t(field.helpTextKey) + (field.helpUrl ? `\n\n${t('connections.help.clickForDocs')}` : '')}>
                           <a href={field.helpUrl || '#'} target="_blank" rel="noopener noreferrer" onClick={e => {if (!field.helpUrl) e.preventDefault()}} aria-label={`Help for ${field.name}`}>
                                <HelpCircle className="h-4 w-4 text-gray-500 hover:text-cyan-400"/>
                           </a>
                        </div>
                    </div>
                    <input 
                        id={`${platform.id}-${field.name}`}
                        type={field.type}
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-md px-2 py-1.5 text-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
                        value={credentials[field.name] || ''}
                        onChange={(e) => setCredentials(prev => ({ ...prev, [field.name]: e.target.value }))}
                    />
                </div>
            ))}
            
            {isConnected && (
                <div className="space-y-3 pt-2">
                    <Button size="sm" variant="secondary" onClick={handleCheckStatus} isLoading={statusCheck.running} className="w-full">
                        {statusCheck.running ? t('connections.testing') : t('connections.testConnection')}
                    </Button>
                    {statusCheck.message && (
                        <div className={`text-xs p-2 rounded-md ${statusCheck.message.startsWith('Success') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                            {statusCheck.message}
                        </div>
                    )}
                </div>
            )}

            <div className="flex justify-end space-x-2 pt-2">
                {isConnected ? (
                     <Button size="sm" variant="secondary" onClick={handleDisconnectClick} icon={<Trash className="h-3 w-3" />}>{t('connections.disconnect')}</Button>
                ) : (
                    <>
                        <Button size="sm" variant="ghost" onClick={onClose}>{t('connections.cancel')}</Button>
                        <Button size="sm" onClick={handleSave} icon={<Save className="h-3 w-3"/>}>{t('connections.saveAndConnect')}</Button>
                    </>
                )}
            </div>
        </div>
    )
}

const PlatformCard: React.FC<{
    platform: Platform, 
    connection: Connection | null,
    onClick: () => void;
}> = ({ platform, connection, onClick }) => {
    const { t } = useI18n();
    const isSpecialEngine = platform.id === 'facebook_token_engine';

    return (
        <button 
            onClick={onClick}
            className="relative w-full text-center group flex flex-col items-center justify-center p-4 rounded-lg glass-card transition-all duration-300 transform hover:-translate-y-1 hover:border-primary-500/50"
        >
             {!isSpecialEngine && (
                <div className="absolute top-2 right-2" title={t(`connections.status_${connection?.status || 'disconnected'}`)}>
                    <StatusIndicator status={connection?.status || 'disconnected'} />
                </div>
             )}
              {isSpecialEngine && (
                <div className="absolute top-2 right-2 text-primary-400" title={t('fbTokenManager.title')}>
                    <Zap className="h-4 w-4" />
                </div>
              )}
            {platform.icon}
            <span className="mt-2 font-semibold text-sm text-gray-200">{t(platform.nameKey)}</span>
        </button>
    );
};

interface ConnectionsProps {
    setCurrentPage: (page: Page) => void;
}

export const Connections: React.FC<ConnectionsProps> = ({ setCurrentPage }) => {
    const { t } = useI18n();
    const [connections, setConnections] = useState<Record<string, Connection>>({});
    const [activePlatformId, setActivePlatformId] = useState<string | null>(null);
    const [isFbTokenManagerOpen, setIsFbTokenManagerOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setConnections(getConnections());
    }, []);
    
    const handleSave = (connData: Connection) => {
        const newConnections = { ...connections, [connData.id]: connData };
        saveConnectionsApi(newConnections);
        setConnections(newConnections);
    };
    
    const handleDisconnect = (id: string) => {
        const {[id]: _, ...rest} = connections;
        saveConnectionsApi(rest);
        setConnections(rest);
        setActivePlatformId(null);
    };

    const handleBackup = () => {
        const dataStr = JSON.stringify(connections, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const link = document.createElement('a');
        link.setAttribute('href', dataUri);
        link.setAttribute('download', 'connections_backup.json');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    const handleRestoreClick = () => { fileInputRef.current?.click(); };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                if (typeof e.target?.result === 'string') {
                    const restoredConns = JSON.parse(e.target.result);
                    saveConnectionsApi(restoredConns);
                    setConnections(restoredConns);
                }
            } catch (err) { console.error("Failed to restore connections:", err); }
        };
        reader.readAsText(file);
    };
    
    const activePlatform = activePlatformId ? platforms[activePlatformId] : null;

    return (
        <>
            <div className="space-y-8">
                <Card>
                    <CardHeader className="text-center !p-6 flex flex-col sm:flex-row justify-between items-center">
                        <div>
                            <CardTitle className="text-2xl">{t('connections.hubTitle')}</CardTitle>
                            <CardDescription>{t('connections.hubDescription')}</CardDescription>
                        </div>
                        <div className="flex justify-center space-x-2 mt-4 sm:mt-0">
                            <Button variant="secondary" onClick={() => setCurrentPage(Page.API_DOCS)} icon={<BookOpen className="h-4 w-4"/>}>{t('connections.setupGuide')}</Button>
                            <Button variant="secondary" onClick={handleBackup} icon={<HardDriveDownload className="h-4 w-4"/>} title={t('connections.backupTooltip')}>{t('connections.backup')}</Button>
                            <Button variant="secondary" onClick={handleRestoreClick} icon={<HardDriveUpload className="h-4 w-4"/>} title={t('connections.restoreTooltip')}>{t('connections.restore')}</Button>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".json" />
                        </div>
                    </CardHeader>
                </Card>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {platformCategories.map(category => (
                        <Card key={category.nameKey}>
                            <CardHeader>
                                <CardTitle>{t(category.nameKey)}</CardTitle>
                            </CardHeader>
                            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {category.platforms.map(platformId => {
                                    const platform = platforms[platformId];
                                    if (!platform) return null;
                                    const handleClick = () => {
                                        if (platform.id === 'facebook_token_engine') {
                                            setIsFbTokenManagerOpen(true);
                                        } else {
                                            setActivePlatformId(platform.id);
                                        }
                                    };
                                    return (
                                        <PlatformCard
                                            key={platform.id}
                                            platform={platform}
                                            connection={connections[platform.id] || null}
                                            onClick={handleClick}
                                        />
                                    );

                                })}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {activePlatform && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setActivePlatformId(null)}
                >
                    <ConnectionModal 
                        platform={activePlatform}
                        connection={connections[activePlatform.id] || null}
                        onSave={handleSave}
                        onDisconnect={handleDisconnect}
                        onClose={() => setActivePlatformId(null)}
                    />
                </div>
            )}
            
            {isFbTokenManagerOpen && (
                 <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsFbTokenManagerOpen(false)}
                >
                    <div onClick={e => e.stopPropagation()} className="relative">
                        <button 
                             onClick={() => setIsFbTokenManagerOpen(false)} 
                             className="absolute -top-3 -right-3 z-10 p-1 bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
                             aria-label="Close"
                         >
                             <XIcon className="h-5 w-5" />
                         </button>
                        <FacebookTokenManager />
                    </div>
                </div>
            )}
        </>
    );
};