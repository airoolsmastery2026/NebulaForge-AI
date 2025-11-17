

import type { Product, GeneratedContent, RenderJob, ScheduledPost, Connection, VideoIdea } from '../types';
import { getFile as getFileFromGitHub, saveFile as saveFileToGitHub } from './githubService';

interface AppData {
    products: Product[];
    generatedContent: Record<string, GeneratedContent>;
    renderJobs: RenderJob[];
    scheduledPosts: ScheduledPost[];
    videoIdeas: VideoIdea[];
}

const defaultAppData: AppData = {
    products: [],
    generatedContent: {},
    renderJobs: [],
    scheduledPosts: [],
    videoIdeas: [],
};

// --- Local Storage Abstractions ---
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
        window.dispatchEvent(new StorageEvent('storage', { key }));
    } catch (error) {
        console.error(`Error writing to localStorage key “${key}”:`, error);
    }
};

// A module-level variable to cache the SHA of the file from GitHub
let fileSha: string | null = null;


// --- API Abstractions ---

// Connections
export const getConnections = () => get<Record<string, Connection>>('universal-connections', {});
export const saveConnections = (connections: Record<string, Connection>) => set('universal-connections', connections);

// App Data (now async and GitHub-aware)
export const getAppData = async (): Promise<{ data: AppData; source: 'github' | 'local' }> => {
    try {
        const githubFile = await getFileFromGitHub();
        // If githubFile is null, it means no config. If content is null, file doesn't exist yet.
        if (githubFile && githubFile.content) {
            console.log("Loaded data from GitHub.");
            fileSha = githubFile.sha; // Cache the SHA for future saves
            const localData = get('nebula-forge-data', defaultAppData);
            // Simple merge: GitHub is source of truth, but keep local jobs not in github yet.
            const remoteJobIds = new Set((githubFile.content.renderJobs || []).map(j => j.id));
            const newLocalJobs = (localData.renderJobs || []).filter(j => !remoteJobIds.has(j.id));
            if(newLocalJobs.length > 0) {
              githubFile.content.renderJobs.unshift(...newLocalJobs);
            }
            set('nebula-forge-data', githubFile.content); // Sync local with remote
            return { data: githubFile.content as AppData, source: 'github' };
        } else if (githubFile) {
            // Configured but file not found on GitHub, use local and prepare to create it on next save.
            fileSha = null;
        }
    } catch (error) {
        console.error("Failed to fetch data from GitHub, falling back to local storage.", error);
    }
    
    console.log("Loading data from local storage.");
    const localData = get<AppData>('nebula-forge-data', defaultAppData);
    return { data: localData, source: 'local' };
};

export const saveAppData = async (data: AppData): Promise<{ source: 'github' | 'local' }> => {
    // Always save locally for offline access and as a backup
    set('nebula-forge-data', data);
    
    try {
        const newFileInfo = await saveFileToGitHub(data, fileSha);
        if (newFileInfo) {
            fileSha = newFileInfo.sha; // Update SHA after successful save
            console.log("Successfully saved data to GitHub.");
            return { source: 'github' };
        }
        // If saveFileToGitHub returns nothing, it means GitHub is not configured.
        return { source: 'local' };
    } catch (error) {
        console.error("Failed to save data to GitHub.", error);
        throw error; // Propagate error to be handled by the UI
    }
};