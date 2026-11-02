import "server-only";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL, supabaseConfigured, timedFetch } from "./config";

/** Anonymous client with no cookies. Safe inside 'use cache' scopes. */
export function publicClient() {
  if (!supabaseConfigured) return null;
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: timedFetch(5000) },
  });
}
