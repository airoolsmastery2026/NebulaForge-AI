
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { VideoIdea, RenderJob } from '../types';
import { Page } from '../types';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { Button } from './common/Button';
import { Youtube, GitBranch, Share2, Check, Video, Bot } from './LucideIcons';
import { useI18n } from '../hooks/useI18n';
import { SystemLog } from './SystemLog';

interface DashboardProps {
    videoIdeas: VideoIdea[];
    renderJobs: RenderJob[];
    setCurrentPage: (page: Page) => void;
}

const revenueData = [
  { name: 'Jan', revenue: 120 },
  { name: 'Feb', revenue: 190 },
  { name: 'Mar', revenue: 150 },
  { name: 'Apr', revenue: 210 },
  { name: 'May', revenue: 250 },
  { name: 'Jun', revenue: 310 },
];

const StatCard: React.FC<{title: string, value: string, change: string}> = ({title, value, change}) => {
    const isPositive = change.startsWith('+');
    return (
        <Card className="p-4">
            <p className="text-gray-400 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-white font-digital tracking-wider">{value}</p>
            <p className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>{change}</p>
        </Card>
    );
};


export const Dashboard: React.FC<DashboardProps> = ({ videoIdeas, renderJobs, setCurrentPage }) => {
    const { t } = useI18n();

    // The 'name' property was causing an issue with the StatCard component's props.
    // It has been renamed to 'title' to align with the expected props.
    // Additionally, a unique 'id' has been added for a stable 'key' prop during mapping.
    const stats = [
        { id: 'views', title: t('dashboard.totalViews'), value: '7.1M', change: '+15.2%' },
        { id: 'earnings', title: t('dashboard.totalEarnings'), value: '$18,920', change: '+21.7%' },
        { id: 'videos', title: t('dashboard.videosCreated'), value: '112', change: `+${(renderJobs.filter(j => j.status === 'Completed').length)} this week` },
        { id: 'conversion', title: t('dashboard.conversionRate'), value: '14.1%', change: '-0.5%' },
    ];

    return (
        <div className="space-y-6">
            <Card className="lg:col-span-3">
                <div className="p-6 flex flex-col md:flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl">{t('dashboard.ctaTitle')}</CardTitle>
                        <CardDescription>{t('dashboard.ctaDescription')}</CardDescription>
                    </div>
                    <Button size="lg" className="mt-4 md:mt-0" onClick={() => setCurrentPage(Page.PRODUCT_SCOUT)} icon={<Bot className="h-5 w-5" />}>
                        {t('dashboard.ctaButton')}
                    </Button>
                </div>
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Main Column */}
                <div className="lg:col-span-2 space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map(({ id, ...statProps }) => <StatCard key={id} {...statProps}/>)}
                    </div>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>{t('dashboard.revenue_trends')}</CardTitle>
                            <CardDescription>+25% {t('Last Month')}</CardDescription>
                        </CardHeader>
                        <div className="h-80 pr-4 p-4">
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '3 3' }}
                                        contentStyle={{ 
                                            backgroundColor: 'rgba(26, 32, 44, 0.7)',
                                            borderColor: 'rgba(255, 255, 255, 0.1)',
                                            color: '#E5E7EB'
                                        }} 
                                    />
                                    <XAxis dataKey="name" stroke="#6B7280" dy={5} />
                                    <YAxis stroke="#6B7280" dx={-5} unit="$" />
                                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#colorRevenue)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
                {/* Side Column */}
                <div className="lg:col-span-1 space-y-6">
                    <SystemLog renderJobs={renderJobs} />
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('dashboard.videoIdeasTitle')}</CardTitle>
                            <CardDescription>{t('dashboard.videoIdeasDescription')}</CardDescription>
                        </CardHeader>
                        <div className="p-4 space-y-3">
                            {videoIdeas.slice(0, 4).map(idea => (
                                <div key={idea.id} className="flex items-center justify-between bg-gray-800/50 p-3 rounded-md">
                                    <div className="flex items-center">
                                        <Youtube className="w-4 h-4 mr-3 text-red-500" />
                                        <span className="text-gray-300 text-sm truncate">{idea.title}</span>
                                    </div>
                                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                                        idea.status === "Generated" ? "bg-blue-500/20 text-blue-300" :
                                        idea.status === "In Production" ? "bg-yellow-500/20 text-yellow-300" :
                                        "bg-green-500/20 text-green-300"
                                    }`}>{t(`automation.${idea.status}`)}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
