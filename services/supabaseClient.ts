import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getConnections } from './apiService';

let supabaseClient: SupabaseClient | null = null;
let lastUrl = '';
let lastKey = '';

export const getSupabaseClient = (): SupabaseClient | null => {
    try {
        const connections = getConnections();
        const supabaseConfig = connections?.supabase?.credentials;

        const supabaseUrl = supabaseConfig?.SUPABASE_URL;
        const supabaseAnonKey = supabaseConfig?.SUPABASE_ANON_KEY;

        // If credentials have changed or client doesn't exist, create a new one
        if (supabaseUrl && supabaseAnonKey && (supabaseUrl !== lastUrl || supabaseAnonKey !== lastKey || !supabaseClient)) {
            lastUrl = supabaseUrl;
            lastKey = supabaseAnonKey;
            supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
        } else if (!supabaseUrl || !supabaseAnonKey) {
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
