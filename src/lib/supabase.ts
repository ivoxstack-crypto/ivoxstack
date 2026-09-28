import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl.startsWith('https://') && Boolean(supabaseAnonKey);

if (!isConfigured) {
  console.error(
    'Supabase is not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. Lead forms and the admin portal will not work.'
  );
}

export const supabase = isConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;
