// ---
// 
// **CRITICAL SECURITY WARNING**
// 
// This function handles the Facebook token exchange on the client-side.
// This is **NOT SECURE** for a production environment because it exposes
// the `appSecret`. In a real-world application, this logic **MUST** be
// moved to a secure backend server (e.g., a Node.js endpoint or a serverless function).
// The frontend should only send the short-lived token to your backend,
// and the backend would then securely make the call to the Facebook Graph API
// with the `appSecret` and return the long-lived token to the client.
//
// This implementation is for demonstration purposes within the constraints of this
// frontend-only project.
//
// ---

interface ExchangeTokenParams {
    appId: string;
    appSecret: string;
    shortLivedToken: string;
}

interface ExchangeTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export const exchangeShortLivedToken = async (params: ExchangeTokenParams): Promise<ExchangeTokenResponse> => {
    const { appId, appSecret, shortLivedToken } = params;

    const url = new URL('https://graph.facebook.com/v19.0/oauth/access_token');
    url.searchParams.append('grant_type', 'fb_exchange_token');
    url.searchParams.append('client_id', appId);
    url.searchParams.append('client_secret', appSecret);
    url.searchParams.append('fb_exchange_token', shortLivedToken);

    console.log("Attempting to exchange Facebook token. NOTE: This is an insecure client-side call.");

    const response = await fetch(url.toString(), {
        method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMessage = data?.error?.message || 'Failed to exchange token. Check credentials and token validity.';
        console.error("Facebook API Error:", data);
        throw new Error(errorMessage);
    }

    if (!data.access_token || !data.expires_in) {
        console.error("Invalid response from Facebook API:", data);
        throw new Error('Received an invalid response from Facebook API.');
    }

    return data as ExchangeTokenResponse;
};
