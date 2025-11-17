import { getConnections } from './apiService';

/**
 * Triggers a Vercel deploy hook.
 * @returns {Promise<{success: boolean, message: string}>} An object indicating the result of the operation.
 */
export const triggerVercelDeploy = async (): Promise<{ success: boolean; message: string }> => {
    try {
        const connections = getConnections();
        const vercelHookUrl = connections?.vercel?.credentials?.DEPLOY_HOOK_URL;

        if (!vercelHookUrl || !vercelHookUrl.startsWith('https://api.vercel.com/v1/integrations/deploy')) {
            return {
                success: false,
                message: 'Vercel Deploy Hook is not configured or is invalid. Please set it up in Connections.',
            };
        }

        console.log('Triggering Vercel deployment...');

        const response = await fetch(vercelHookUrl, {
            method: 'POST',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
            const errorMessage = errorData?.error?.message || `Failed with status: ${response.status}`;
            console.error('Vercel deploy trigger failed:', errorMessage);
            return {
                success: false,
                message: `Deployment trigger failed: ${errorMessage}`,
            };
        }
        
        // Vercel returns job details on success
        const result = await response.json();
        console.log('Vercel deployment triggered successfully:', result);

        return {
            success: true,
            message: 'Deployment successfully triggered on Vercel!',
        };

    } catch (error) {
        console.error('An unexpected error occurred while triggering deployment:', error);
        const message = error instanceof Error ? error.message : 'An unknown network error occurred.';
        return {
            success: false,
            message: `Error: ${message}`,
        };
    }
};
