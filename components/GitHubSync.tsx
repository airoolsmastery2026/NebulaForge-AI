import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { Button } from './common/Button';
import { Spinner } from './common/Spinner';
import { useI18n } from '../hooks/useI18n';
import type { GitHubRepo, RepoStatus } from '../types';
import { ExternalLink, Plus, RefreshCw, Trash, Github } from './LucideIcons';

// --- Local Storage Keys ---
const GITHUB_CONFIG_KEY = 'github_sync_config';
const GITHUB_REPOS_KEY = 'github_sync_repos';

type LogEntry = {
    id: number;
    timestamp: number;
    message: string;
};

// --- Helper Functions ---
const getRelativeTime = (timestamp: number | null, t: (key: string) => string) => {
    if (!timestamp) return t('githubSync.never');
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
};

// --- Component: Status Badge ---
const StatusBadge: React.FC<{ status: RepoStatus }> = ({ status }) => {
    const { t } = useI18n();
    const styles: Record<RepoStatus, string> = {
        synced: 'bg-green-500/20 text-green-300',
        pending: 'bg-slate-500/20 text-slate-300',
        syncing: 'bg-blue-500/20 text-blue-300',
        cloning: 'bg-purple-500/20 text-purple-300',
        error: 'bg-red-500/20 text-red-300',
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full inline-flex items-center ${styles[status]}`}>
            {t(`githubSync.${status}`)}
        </span>
    );
};

// --- Main Component: GitHubSync ---
export const GitHubSync: React.FC = () => {
    const { t } = useI18n();
    
    // --- State ---
    const [pat, setPat] = useState('');
    const [localPath, setLocalPath] = useState('');
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [newRepoName, setNewRepoName] = useState('');
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isAutoSyncing, setIsAutoSyncing] = useState(false);
    const autoSyncIntervalRef = useRef<number | null>(null);

    // --- Logging ---
    const addLog = useCallback((message: string) => {
        setLogs(prev => [{ id: Date.now(), timestamp: Date.now(), message }, ...prev].slice(0, 100));
    }, []);

    // --- Effects for Data Persistence ---
    useEffect(() => {
        try {
            const config = JSON.parse(localStorage.getItem(GITHUB_CONFIG_KEY) || '{}');
            setPat(config.pat || '');
            setLocalPath(config.localPath || '');

            const storedRepos = JSON.parse(localStorage.getItem(GITHUB_REPOS_KEY) || '[]');
            setRepos(storedRepos);
        } catch (e) { console.error("Failed to load GitHub sync data from storage", e); }
    }, []);

    useEffect(() => {
        const config = { pat, localPath };
        localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify(config));
    }, [pat, localPath]);

    useEffect(() => {
        localStorage.setItem(GITHUB_REPOS_KEY, JSON.stringify(repos));
    }, [repos]);

    // --- Core Sync Logic (Simulated) ---
    const runSync = useCallback(async (repoFullName: string) => {
        const isNew = !repos.find(r => r.fullName === repoFullName)?.lastSync;
        const initialStatus: RepoStatus = isNew ? 'cloning' : 'syncing';

        setRepos(prev => prev.map(r => r.fullName === repoFullName ? { ...r, status: initialStatus } : r));
        addLog(t(isNew ? 'githubSync.logCloning' : 'githubSync.logPulling', { repo: repoFullName }));

        // Simulate network delay and potential error
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
        
        const isError = Math.random() < 0.1; // 10% chance of error
        if (isError) {
            setRepos(prev => prev.map(r => r.fullName === repoFullName ? { ...r, status: 'error' } : r));
            addLog(t('githubSync.logError', { repo: repoFullName, error: 'Merge conflict' }));
        } else {
            setRepos(prev => prev.map(r => r.fullName === repoFullName ? { ...r, status: 'synced', lastSync: Date.now() } : r));
            addLog(t(isNew ? 'githubSync.logCloneSuccess' : 'githubSync.logPullSuccess', { repo: repoFullName }));
        }
    }, [addLog, t, repos]);

    // --- Handlers ---
    const handleAddRepo = () => {
        if (!newRepoName.trim() || !newRepoName.includes('/')) return;
        if (repos.some(r => r.fullName === newRepoName.trim())) return;
        const newRepo: GitHubRepo = {
            fullName: newRepoName.trim(),
            status: 'pending',
            lastSync: null,
        };
        setRepos(prev => [newRepo, ...prev]);
        setNewRepoName('');
    };
    
    const handleRemoveRepo = (fullName: string) => {
        setRepos(prev => prev.filter(r => r.fullName !== fullName));
    };

    const handleSyncAll = () => {
        repos.forEach(repo => runSync(repo.fullName));
    };

    const toggleAutoSync = () => {
        setIsAutoSyncing(prev => {
            const willBeOn = !prev;
            if (willBeOn) {
                addLog(t('githubSync.logAutoSync'));
                handleSyncAll();
                autoSyncIntervalRef.current = window.setInterval(() => {
                    handleSyncAll();
                }, 5 * 60 * 1000); // 5 minutes
            } else {
                if (autoSyncIntervalRef.current) {
                    clearInterval(autoSyncIntervalRef.current);
                    autoSyncIntervalRef.current = null;
                }
                addLog(t('githubSync.logAutoSyncComplete'));
            }
            return willBeOn;
        });
    };
    
    useEffect(() => {
        return () => { // Cleanup on component unmount
            if (autoSyncIntervalRef.current) clearInterval(autoSyncIntervalRef.current);
        };
    }, []);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{t('githubSync.title')}</CardTitle>
                    <CardDescription>{t('githubSync.description')}</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    {/* --- Configuration --- */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('githubSync.configTitle')}</CardTitle>
                            <CardDescription>{t('githubSync.configDescription')}</CardDescription>
                        </CardHeader>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300">{t('githubSync.patLabel')}</label>
                                <input type="password" value={pat} onChange={e => setPat(e.target.value)} placeholder={t('githubSync.patPlaceholder')} className="mt-1 w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-100" />
                                <p className="mt-1 text-xs text-gray-400">{t('githubSync.patHelp')} <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">{t('githubSync.getPat')}</a></p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">{t('githubSync.pathLabel')}</label>
                                <input type="text" value={localPath} onChange={e => setLocalPath(e.target.value)} placeholder={t('githubSync.pathPlaceholder')} className="mt-1 w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-100" />
                                <p className="mt-1 text-xs text-gray-400">{t('githubSync.pathHelp')}</p>
                            </div>
                        </div>
                    </Card>

                    {/* --- Activity Log --- */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('githubSync.activityTitle')}</CardTitle>
                            <CardDescription>{t('githubSync.activityDescription')}</CardDescription>
                        </CardHeader>
                        <div className="p-2 h-64 overflow-y-auto">
                            <ul className="space-y-2">
                                {logs.map(log => (
                                    <li key={log.id} className="text-xs text-gray-400 px-2">
                                        <span className="font-mono text-gray-500 mr-2">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                        {log.message}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card>
                </div>
                
                <div className="lg:col-span-2">
                     {/* --- Repository Management --- */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('githubSync.reposTitle')}</CardTitle>
                            <CardDescription>{t('githubSync.reposDescription')}</CardDescription>
                        </CardHeader>
                        <div className="p-4 border-b border-gray-800">
                             <div className="flex gap-2">
                                <input type="text" value={newRepoName} onChange={e => setNewRepoName(e.target.value)} placeholder={t('githubSync.addRepoPlaceholder')} className="flex-grow bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-100" />
                                <Button onClick={handleAddRepo} icon={<Plus className="h-4 w-4" />}>{t('githubSync.addRepoButton')}</Button>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <Button onClick={handleSyncAll} icon={<RefreshCw className="h-4 w-4"/>}>{t('githubSync.syncAllButton')}</Button>
                            <div className="flex items-center space-x-2">
                                <label htmlFor="auto-sync-toggle" className="text-sm font-medium text-gray-300">{t('githubSync.autoSyncLabel')}</label>
                                <input type="checkbox" id="auto-sync-toggle" checked={isAutoSyncing} onChange={toggleAutoSync} className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-primary-600 focus:ring-primary-500" />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-800">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('githubSync.repo')}</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('githubSync.status')}</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('githubSync.lastSync')}</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('githubSync.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800 table-row-highlight">
                                    {repos.map(repo => (
                                        <tr key={repo.fullName}>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-bright flex items-center">
                                                <Github className="h-4 w-4 mr-2 text-gray-400"/>
                                                {repo.fullName}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm"><StatusBadge status={repo.status} /></td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{getRelativeTime(repo.lastSync, t)}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm space-x-2">
                                                <Button size="sm" variant="secondary" onClick={() => runSync(repo.fullName)} isLoading={repo.status === 'syncing' || repo.status === 'cloning'}>{t('githubSync.sync')}</Button>
                                                <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-500" onClick={() => handleRemoveRepo(repo.fullName)}><Trash className="h-4 w-4"/></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};