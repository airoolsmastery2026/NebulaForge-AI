// ---
//
//                      ****************************************************
//                      *                                                  *
//                      *              DEMONSTRATION MOCK                  *
//                      *                                                  *
//                      ****************************************************
//
// This file is a mock service for demonstrating TikTok API integration.
// In a real-world application, this service would contain functions to
// interact with the official TikTok API for publishing videos and fetching analytics.
//
// The functions here are placeholders and only log to the console.
//
// Publishing Flow in a Real App:
// 1. Get an upload URL from TikTok's API.
// 2. Upload the video file (e.g., from the Render Queue) to the provided URL.
// 3. After upload, create a post on TikTok using the uploaded video's ID.
// 4. This process requires a backend to handle multi-part uploads and API calls securely.
//
// ---

import { getConnections } from './apiService';

/**
 * Checks if the TikTok connection is configured.
 * @returns {boolean} True if an access token for TikTok is found.
 */
export const isTikTokConnected = (): boolean => {
    try {
        const connections = getConnections();
        return !!connections?.tiktok?.credentials?.ACCESS_TOKEN;
    } catch {
        return false;
    }
};

interface TikTokPublishParams {
    videoUrl: string; // In a real app, this would be a file path or Blob
    description: string;
    privacyLevel: 'PUBLIC' | 'FRIENDS_ONLY' | 'PRIVATE';
    disableComments: boolean;
    allowDuet: boolean;
}

/**
 * MOCK FUNCTION: Simulates publishing a video to TikTok.
 * In a real application, this would make a series of calls to the TikTok API.
 * @param {TikTokPublishParams} params - The parameters for the video post.
 * @returns {Promise<{success: boolean, message: string, postId?: string}>}
 */
export const publishVideoToTikTok = async (params: TikTokPublishParams): Promise<{success: boolean, message: string, postId?: string}> => {
    console.log("--- MOCK TIKTOK PUBLISH ---");
    
    if (!isTikTokConnected()) {
        const errorMessage = "TikTok is not connected. Please add an Access Token on the Connections page.";
        console.error(errorMessage);
        return { success: false, message: errorMessage };
    }
    
    const connections = getConnections();
    const accessToken = connections.tiktok.credentials.ACCESS_TOKEN;

    console.log("Attempting to publish to TikTok with params:", params);
    console.log(`Using Access Token starting with: ${accessToken.substring(0, 10)}...`);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app:
    // 1. const uploadUrl = await getTikTokUploadUrl(accessToken);
    // 2. await uploadVideoFile(uploadUrl, params.videoUrl);
    // 3. const result = await createTikTokPost(accessToken, ...);
    
    const mockPostId = `tt_${Date.now()}`;
    const successMessage = `Successfully simulated publishing video to TikTok. Post ID: ${mockPostId}`;
    
    console.log(successMessage);
    console.log("--------------------------");

    return {
        success: true,
        message: successMessage,
        postId: mockPostId,
    };
};
