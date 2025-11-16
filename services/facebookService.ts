// ---
// 
//                      ****************************************************
//                      *                                                  *
//                      *          CRITICAL SECURITY WARNING               *
//                      *                                                  *
//                      ****************************************************
//
// THIS FILE CONTAINS A MAJOR SECURITY VULNERABILITY AND IS FOR DEMONSTRATION PURPOSES ONLY.
//
// The function `exchangeShortLivedToken` below handles the Facebook token exchange on the CLIENT-SIDE.
// This is **EXTREMELY INSECURE** for a production environment because it requires and exposes
// the `appSecret` directly in the frontend code.
//
// In a real-world application, this logic **MUST** be moved to a secure backend server (e.g., a
// Node.js endpoint, a Python Flask API, or a serverless function). The correct and secure flow is:
//
// 1.  The frontend obtains a short-lived token after the user logs in.
// 2.  The frontend sends ONLY this short-lived token to your secure backend endpoint.
// 3.  The backend server securely stores the `appSecret` (e.g., as an environment variable) and
//     makes the call to the Facebook Graph API to exchange the token.
// 4.  The backend returns the newly obtained long-lived token to the frontend to be used for
//     subsequent API calls.
//
// DO NOT USE THIS CLIENT-SIDE IMPLEMENTATION IN PRODUCTION.
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
    url.searchParams.append('client_secret', appSecret); // <-- DANGER: EXPOSING SECRET ON CLIENT
    url.searchParams.append('fb_exchange_token', shortLivedToken);

    console.warn("CRITICAL SECURITY RISK: Exchanging Facebook token on the client-side. The appSecret is exposed. This must be moved to a backend server in a real application.");

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