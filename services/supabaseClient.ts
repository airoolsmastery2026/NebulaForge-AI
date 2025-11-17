import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getConnections } from './apiService';

let supabaseClient: SupabaseClient | null = null;
let lastUrl = '';
let lastKey = '';

// Default fallback credentials to prevent crash on first load
const DEFAULT_SUPABASE_URL = 'https://nyuiypkvveeimqwtsmnz.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55dWl5cGt2dmVlaW1xd3RzbW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyODQ5NDQsImV4cCI6MjA3ODg2MDk0NH0.LC5nmWs1QKstjyXHxzHSeTtzaHslrlnpnuvE8XjZe14';


export const getSupabaseClient = (): SupabaseClient | null => {
    try {
        const connections = getConnections();
        const supabaseConfig = connections?.supabase?.credentials;

        // Use stored credentials first, then fallback to defaults
        let supabaseUrl = supabaseConfig?.SUPABASE_URL;
        let supabaseAnonKey = supabaseConfig?.SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.trim() === '' || supabaseAnonKey.trim() === '') {
            console.warn("Using default Supabase credentials. Please configure your own in the Connections page.");
            supabaseUrl = DEFAULT_SUPABASE_URL;
            supabaseAnonKey = DEFAULT_SUPABASE_ANON_KEY;
        }

        // If credentials have changed or client doesn't exist, create a new one
        if (supabaseUrl && supabaseAnonKey && (supabaseUrl !== lastUrl || supabaseAnonKey !== lastKey || !supabaseClient)) {
            lastUrl = supabaseUrl;
            lastKey = supabaseAnonKey;
            supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
        } else if (!supabaseUrl || !supabaseAnonKey) {
            // This case should not be hit with the fallback, but it's good practice
            supabaseClient = null;
            lastUrl = '';
            lastKey = '';
        }
        
        return supabaseClient;
    } catch (e) {
        console.error("Could not initialize Supabase client", e);
        return null;
    }
};