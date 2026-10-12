import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ─────────────────────────────────────────────────────────────
//  SINGLETON — one client instance shared across the whole app.
//  This is REQUIRED for Supabase Realtime to work reliably.
//  Multiple instances cause duplicate or missed subscriptions,
//  which is why live updates break across devices.
// ─────────────────────────────────────────────────────────────
let _instance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!_instance) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        '[ShalaSync] Missing Supabase env vars.\n' +
        'Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
      );
    }
    _instance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return _instance;
}

// Named singleton export — use this everywhere in the browser
export const supabase = getSupabaseClient();

// Keep createClient() as a compat shim so existing imports still work
export function createClient(): SupabaseClient {
  return getSupabaseClient();
}
