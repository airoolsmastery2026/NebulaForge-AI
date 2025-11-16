
import type { Product, GeneratedContent, RenderJob, ScheduledPost, Connection, VideoIdea } from '../types';

interface AppData {
    products: Product[];
    generatedContent: Record<string, GeneratedContent>;
    renderJobs: RenderJob[];
    scheduledPosts: ScheduledPost[];
    videoIdeas: VideoIdea[];
}

const get = <T>(key: string, defaultValue: T): T => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage key “${key}”:`, error);
        return defaultValue;
    }
};

const set = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        // Dispatch a storage event to notify other tabs/components
        window.dispatchEvent(new Event('storage'));
    } catch (error) {
        console.error(`Error writing to localStorage key “${key}”:`, error);
    }
};

// --- API Abstractions ---
// In the future, these would be replaced with fetch() calls to a real backend.

// Connections
export const getConnections = () => get<Record<string, Connection>>('universal-connections', {});
export const saveConnections = (connections: Record<string, Connection>) => set('universal-connections', connections);

// App Data
export const getAppData = () => get<AppData>('nebula-forge-data', {
    products: [],
    generatedContent: {},
    renderJobs: [],
    scheduledPosts: [],
    videoIdeas: [],
});

export const saveAppData = (data: AppData) => set('nebula-forge-data', data);
