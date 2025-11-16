import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { Button } from './common/Button';
import { useI18n } from '../hooks/useI18n';
import { RefreshCw } from './LucideIcons';
import type { AffiliateStat, Connection } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const affiliatePlatforms = [
    { id: "binance", name: "Binance" },
    { id: "shopee", name: "Shopee VN" },
    { id: "tiki", name: "Tiki" },
    { id: "cj", name: "CJ Affiliate" },
    { id: "clickbank", name: "ClickBank" }
];

const prepareAffiliateData = async (): Promise<AffiliateStat[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const connections: Record<string, Connection> = JSON.parse(localStorage.getItem('universal-connections') || '{}');
    
    const data: AffiliateStat[] = affiliatePlatforms.map(platform => {
        const isConnected = !!connections[platform.id];
        // In a real app, you would fetch actual data here if connected.
        // For this version, we show 0 if not connected or if data isn't implemented.
        return {
            name: platform.name,
            revenue: 0,
            clicks: 0,
            conversions: 0,
            connected: isConnected,
            error: isConnected ? "Real data fetching is not implemented." : undefined,
        };
    });

    return data;
};

export const AffiliateDashboard: React.FC = () => {
    const { t } = useI18n();
    const [stats, setStats] = useState<AffiliateStat[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const data = await prepareAffiliateData();
        setStats(data);
        setLastUpdated(new Date());
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchData(); // onStartup
        const interval = setInterval(fetchData, 5 * 60 * 1000); // Auto-refresh every 5 mins
        return () => clearInterval(interval);
    }, [fetchData]);

    const totals = stats.reduce((acc, curr) => ({
        revenue: acc.revenue + curr.revenue,
        clicks: acc.clicks + curr.clicks,
        conversions: acc.conversions + curr.conversions,
    }), { revenue: 0, clicks: 0, conversions: 0 });

    const chartData = stats.filter(s => s.connected);

    const chartTooltipStyle = {
        backgroundColor: 'rgba(26, 32, 44, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        color: '#e2e8f0'
    };
    
    return (
        <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <CardTitle>{t('affiliateDashboard.title')}</CardTitle>
                    <CardDescription>{t('affiliateDashboard.description')}</CardDescription>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                    {lastUpdated && <p className="text-xs text-gray-400">{t('affiliateDashboard.lastUpdated', { time: lastUpdated.toLocaleTimeString() })}</p>}
                    <Button variant="secondary" onClick={fetchData} isLoading={isLoading} icon={<RefreshCw className="h-4 w-4" />}>
                        {isLoading ? t('affiliateDashboard.refreshingButton') : t('affiliateDashboard.refreshButton')}
                    </Button>
                </div>
            </CardHeader>
            <div className="p-4 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard title={t('affiliateDashboard.totalRevenue')} value={`$${totals.revenue.toLocaleString()}`} />
                    <StatCard title={t('affiliateDashboard.totalClicks')} value={totals.clicks.toLocaleString()} />
                    <StatCard title={t('affiliateDashboard.totalConversions')} value={totals.conversions.toLocaleString()} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">{t('affiliateDashboard.chartTitle')}</h3>
                    <div className="h-80 pr-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit="$" />
                                <Tooltip contentStyle={chartTooltipStyle} cursor={{fill: 'rgba(0, 153, 255, 0.1)'}} />
                                <Bar dataKey="revenue" fill="#0099ff" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const StatCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
    <div className="glass-card p-4 rounded-lg text-center">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white font-digital tracking-wider">{value}</p>
    </div>
);