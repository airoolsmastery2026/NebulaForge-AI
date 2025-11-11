import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { Button } from './common/Button';
import { useI18n } from '../hooks/useI18n';
import { Bot } from './LucideIcons';
import type { Connection } from '../types';

const platformsToCheck = [
  { id: 'crypto_com', name: "Crypto.com", category: "Crypto", signup: "https://crypto.com/vi/product-news/exchange-affiliate-2-0" },
  { id: 'binance', name: "Binance", category: "Crypto", signup: "https://accounts.binance.com/affiliate" },
  { id: 'shopee', name: "Shopee VN", category: "E-Commerce", signup: "https://affiliate.shopee.vn/" },
  { id: 'tiki', name: "Tiki Affiliate", category: "E-Commerce", signup: "https://affiliate.tiki.vn/" },
  { id: 'host123', name: "123HOST", category: "Hosting", signup: "https://123host.vn/en/affiliates.html" },
  { id: 'facebook_ads', name: "Facebook Ads", category: "Social Media", signup: "https://www.facebook.com/business/partner-programs/affiliate" },
  { id: 'tiktok_ads', name: "TikTok Creator / Ads", category: "Social Media", signup: "https://www.tiktok.com/business/affiliate" },
  { id: 'youtube_partner', name: "YouTube Partner / Affiliate", category: "Social Media", signup: "https://www.youtube.com/yt/creators/monetization/affiliate/" },
  { id: 'instagram_affiliate', name: "Instagram Affiliate", category: "Social Media", signup: "https://www.facebook.com/business/instagram/affiliate" },
  { id: 'twitter_affiliate', name: "Twitter Affiliate", category: "Social Media", signup: "https://ads.twitter.com/affiliate" }
];

export const AffiliateMonitor: React.FC = () => {
    const { t } = useI18n();
    const [isLoading, setIsLoading] = useState(false);
    const [report, setReport] = useState<string | null>(null);

    const handleCheckStatus = async () => {
        setIsLoading(true);
        setReport(null);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

        let reportContent = `${t('automation.statusReportHeader')}\n\n`;
        const connections: Record<string, Connection> = JSON.parse(localStorage.getItem('universal-connections') || '{}');

        for (const p of platformsToCheck) {
            // Simulate link check to avoid CORS issues in a real frontend
            const isLinkOk = Math.random() > 0.1; // 90% chance of success
            let status = isLinkOk ? t('automation.statusActive') : t('automation.statusError');
            
            const connectionData = connections[p.id];
            const hasToken = connectionData && Object.values(connectionData.credentials).some(val => val && val.length > 5);

            if (p.category === 'Social Media' && !hasToken) {
                status += t('automation.statusTokenMissing');
            }
            
            reportContent += `${status}: ${p.name}\n`;
        }
        
        console.log("--- AFFILIATE & SOCIAL HUB REPORT ---");
        console.log(reportContent);
        console.log("--- NOTIFICATION PAYLOADS (DEMO) ---");
        console.log(`Telegram Message: {\n  chat_id: 'YOUR_CHAT_ID',\n  text: "${reportContent.substring(0, 50)}..."\n}`);
        console.log(`Email: {\n  to: 'YOUR_ADMIN_EMAIL',\n  subject: 'Affiliate & Social Media Hub Daily Report',\n  body: "${reportContent.substring(0, 50)}..."\n}`);

        setReport(reportContent);
        setIsLoading(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('automation.affiliateMonitorTitle')}</CardTitle>
                <CardDescription>{t('automation.affiliateMonitorDescription')}</CardDescription>
            </CardHeader>
            <div className="p-4 space-y-4">
                <div className="flex justify-center">
                    <Button onClick={handleCheckStatus} isLoading={isLoading} icon={<Bot className="h-4 w-4" />}>
                        {isLoading ? t('automation.runningCheck') : t('automation.runCheck')}
                    </Button>
                </div>

                {report && (
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-300">{t('automation.reportTitle')}</h3>
                        <pre className="bg-gray-900/50 p-3 rounded-md text-gray-200 text-xs overflow-x-auto whitespace-pre-wrap">
                            <code>{report}</code>
                        </pre>
                    </div>
                )}
                
                <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-base font-semibold text-gray-200">{t('automation.notificationSettingsTitle')}</h3>
                    <p className="text-sm text-gray-400 mb-4">{t('automation.notificationSettingsDescription')}</p>
                    <div className="space-y-3">
                        <input type="text" placeholder={t('automation.telegramBotToken')} className="w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                        <input type="text" placeholder={t('automation.telegramChatId')} className="w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                        <input type="email" placeholder={t('automation.adminEmail')} className="w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                    </div>
                    <p className="text-xs text-red-400 mt-3 font-semibold">{t('automation.securityWarning')}</p>
                </div>
            </div>
        </Card>
    );
};