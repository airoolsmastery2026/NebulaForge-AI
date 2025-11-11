import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { Button } from './common/Button';
import { useI18n } from '../hooks/useI18n';
import type { FacebookTokenData } from '../types';
import { exchangeShortLivedToken } from '../services/facebookService';
import { PlatformLogo } from './PlatformLogo';
import { RefreshCw, Trash, Zap } from './LucideIcons';

type Status = 'disconnected' | 'connected' | 'refreshing' | 'error';

const STORAGE_KEY = 'fb_token_data';
const REFRESH_THRESHOLD_DAYS = 50;

const StatusIndicator: React.FC<{ status: Status }> = ({ status }) => {
    const { t } = useI18n();
    const statusConfig = {
        disconnected: { color: 'bg-red-500', pulse: false, labelKey: 'connections.status_disconnected' },
        connected: { color: 'bg-green-500', pulse: true, labelKey: 'connections.status_connected' },
        refreshing: { color: 'bg-yellow-500', pulse: true, labelKey: 'connections.status_refreshing' },
        error: { color: 'bg-red-700', pulse: false, labelKey: 'connections.status_error' },
    };
    const config = statusConfig[status];

    return (
        <div className="flex items-center space-x-2">
            <div className="relative flex h-3 w-3">
                <span className={`absolute inline-flex h-full w-full rounded-full ${config.color} ${config.pulse ? 'animate-ping' : ''} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${config.color}`}></span>
            </div>
            <span className="text-sm font-medium text-gray-300">{t(config.labelKey)}</span>
        </div>
    );
};

export const FacebookTokenManager: React.FC = () => {
    const { t } = useI18n();
    const [status, setStatus] = useState<Status>('disconnected');
    const [tokenData, setTokenData] = useState<FacebookTokenData | null>(null);
    const [countdown, setCountdown] = useState('');
    const [needsRefresh, setNeedsRefresh] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [appId, setAppId] = useState('');
    const [appSecret, setAppSecret] = useState('');
    const [shortLivedToken, setShortLivedToken] = useState('');

    const updateTokenData = useCallback((data: FacebookTokenData | null) => {
        setTokenData(data);
        if (data) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            setStatus('connected');
            setError(null);
            console.log("Facebook token data saved:", data);
        } else {
            localStorage.removeItem(STORAGE_KEY);
            setStatus('disconnected');
        }
    }, []);

    const handleConnect = async () => {
        if (!appId || !appSecret || !shortLivedToken) {
            setError("All fields are required.");
            return;
        }
        setStatus('refreshing');
        setError(null);

        try {
            const result = await exchangeShortLivedToken({ appId, appSecret, shortLivedToken });
            const now = Date.now();
            const expiresAt = now + (result.expires_in * 1000);
            updateTokenData({
                longLivedToken: result.access_token,
                expiresAt,
                lastUpdated: now,
            });
            setShortLivedToken('');
            setNeedsRefresh(false);
        } catch (err) {
            console.error("Facebook token exchange failed:", err);
            setStatus('error');
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setTokenData(null);
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    const handleDisconnect = () => {
        updateTokenData(null);
        setAppId('');
        setAppSecret('');
        setShortLivedToken('');
    };

    useEffect(() => {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            if (storedData) {
                const parsedData: FacebookTokenData = JSON.parse(storedData);
                setTokenData(parsedData);
                setStatus('connected');
            }
        } catch (e) {
            console.error("Failed to load Facebook token data from storage:", e);
        }
    }, []);

    useEffect(() => {
        if (!tokenData) {
            setCountdown('');
            return;
        }

        const interval = setInterval(() => {
            const now = Date.now();
            const remaining = tokenData.expiresAt - now;

            if (remaining <= 0) {
                setCountdown("Expired");
                setStatus('disconnected');
                return;
            }
            
            const daysSinceUpdate = (now - tokenData.lastUpdated) / (1000 * 60 * 60 * 24);
            if (daysSinceUpdate > REFRESH_THRESHOLD_DAYS) {
                setNeedsRefresh(true);
            }

            const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            setCountdown(`${days}d ${hours}h`);
        }, 1000);

        return () => clearInterval(interval);
    }, [tokenData]);

    const maskedToken = tokenData?.longLivedToken ? `${tokenData.longLivedToken.substring(0, 10)}...${tokenData.longLivedToken.slice(-5)}` : 'N/A';

    return (
        <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-3">
                    <PlatformLogo platformId="facebook" />
                    <div>
                        <CardTitle>{t('fbTokenManager.title')}</CardTitle>
                        <CardDescription>{t('fbTokenManager.description')}</CardDescription>
                    </div>
                </div>
                <div className="mt-4 sm:mt-0">
                    <StatusIndicator status={status} />
                </div>
            </CardHeader>

            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input Section */}
                    <div className="space-y-4">
                        {status !== 'connected' && (
                            <>
                                <InputField label={t('fbTokenManager.appId')} tooltip={t('fbTokenManager.appIdTooltip')} value={appId} onChange={setAppId} />
                                <InputField label={t('fbTokenManager.appSecret')} tooltip={t('fbTokenManager.appSecretTooltip')} value={appSecret} onChange={setAppSecret} type="password" />
                            </>
                        )}

                        {(status !== 'connected' || needsRefresh) && (
                            <InputField label={t('fbTokenManager.shortToken')} tooltip={t('fbTokenManager.shortTokenTooltip')} value={shortLivedToken} onChange={setShortLivedToken} type="password" />
                        )}

                        {error && <p className="text-sm text-red-400">{t('fbTokenManager.errorPrefix')}: {error}</p>}

                        {/* Fix: Refactor button logic to correctly handle loading states and fix TypeScript error. */}
                        <div className="flex items-center space-x-2">
                           {status === 'refreshing' ? (
                               <Button isLoading={true} icon={<RefreshCw className="h-4 w-4" />}>
                                   {tokenData ? t('fbTokenManager.forceRefreshButton') : t('fbTokenManager.connectButton')}
                               </Button>
                           ) : (
                               <>
                                   {(status === 'disconnected' || status === 'error') && <Button onClick={handleConnect} icon={<Zap className="h-4 w-4" />}>{t('fbTokenManager.connectButton')}</Button>}
                                   {status === 'connected' && needsRefresh && <Button onClick={handleConnect} icon={<RefreshCw className="h-4 w-4" />}>{t('fbTokenManager.forceRefreshButton')}</Button>}
                               </>
                           )}
                        </div>
                    </div>

                    {/* Status Display Section */}
                    {status === 'connected' && tokenData && (
                         <div className="glass-card p-4 rounded-md border border-gray-700 space-y-3">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-400">{t('fbTokenManager.currentToken')}</h4>
                                <p className="font-mono text-sm text-gray-200 break-all">{maskedToken}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400">{t('fbTokenManager.nextRefresh')}</h4>
                                    <p className="text-lg font-bold text-gray-100">{countdown}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400">{t('fbTokenManager.lastUpdated')}</h4>
                                    <p className="text-sm text-gray-200">{new Date(tokenData.lastUpdated).toLocaleString()}</p>
                                </div>
                            </div>
                            {needsRefresh && <p className="text-sm text-yellow-400 font-semibold">{t('fbTokenManager.refreshNeeded')}</p>}

                            <div className="flex items-center space-x-2 pt-2">
                               <Button size="sm" variant="secondary" onClick={() => setNeedsRefresh(true)} icon={<RefreshCw className="h-4 w-4" />}>{t('fbTokenManager.forceRefreshButton')}</Button>
                               <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/10" onClick={handleDisconnect} icon={<Trash className="h-4 w-4" />}>{t('fbTokenManager.disconnectButton')}</Button>
                            </div>
                         </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

const InputField: React.FC<{ label: string, tooltip: string, value: string, onChange: (val: string) => void, type?: string }> = ({ label, tooltip, value, onChange, type = "text" }) => (
    <div>
        <label className="text-sm font-medium text-gray-300 block mb-1">{label}</label>
        <input
            type={type}
            title={tooltip}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
        />
    </div>
);
