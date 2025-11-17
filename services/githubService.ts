import { getConnections } from './apiService';

const API_BASE = 'https://api.github.com';

interface GitHubConfig {
    token: string;
    repo: string; // "owner/repo"
    path: string;
}

// Function to get config from localStorage
const getConfig = (): GitHubConfig | null => {
    const connections = getConnections();
    const githubConfig = connections?.github?.credentials;
    if (
        !githubConfig ||
        !githubConfig.PERSONAL_ACCESS_TOKEN ||
        !githubConfig.REPOSITORY ||
        !githubConfig.REPOSITORY.includes('/')
    ) {
        return null;
    }
    return {
        token: githubConfig.PERSONAL_ACCESS_TOKEN,
        repo: githubConfig.REPOSITORY,
        path: githubConfig.FILE_PATH || 'nebula-forge-data.json',
    };
};

/**
 * Fetches the content and SHA of a file from the configured GitHub repository.
 * @returns {Promise<{content: any | null, sha: string | null} | null>} An object with content and SHA, or null if not configured.
 */
export const getFile = async (): Promise<{ content: any | null; sha: string | null } | null> => {
    const config = getConfig();
    if (!config) return null; // Not configured, so we don't try to fetch.

    const url = `${API_BASE}/repos/${config.repo}/contents/${config.path}`;
    const response = await fetch(url, {
        headers: {
            Authorization: `token ${config.token}`,
            'Accept': 'application/vnd.github.v3+json',
        },
    });

    if (response.status === 404) {
        return { content: null, sha: null }; // File doesn't exist yet, this is a valid state.
    }
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API Error (Get): ${errorData.message || response.statusText}`);
    }
    
    const data = await response.json();
    if (typeof data.content !== 'string') {
        throw new Error("Invalid content received from GitHub API.");
    }
    
    const content = JSON.parse(atob(data.content));
    return { content, sha: data.sha };
};

/**
 * Saves file content to the configured GitHub repository (creates or updates).
 * @param {object} content The JavaScript object to save as JSON.
 * @param {string | null} sha The SHA of the file if it's being updated. Null if creating.
 * @returns {Promise<{sha: string} | undefined>} An object with the new SHA, or undefined if not configured.
 */
export const saveFile = async (content: object, sha: string | null): Promise<{ sha: string } | undefined> => {
    const config = getConfig();
    if (!config) return undefined; // Not configured, so do nothing.

    const url = `${API_BASE}/repos/${config.repo}/contents/${config.path}`;
    const encodedContent = btoa(JSON.stringify(content, null, 2));

    const body: { message: string; content: string; sha?: string } = {
        message: `Sync: Update data from NebulaForge AI [${new Date().toISOString()}]`,
        content: encodedContent,
    };
    if (sha) {
        body.sha = sha;
    }

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `token ${config.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API Error (Save): ${errorData.message || response.statusText}`);
    }
    
    const data = await response.json();
    return { sha: data.content.sha };
};
