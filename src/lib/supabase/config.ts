export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

/** fetch with a hard timeout, so an unreachable database never hangs a page. */
export function timedFetch(ms: number): typeof fetch {
  return (input, init) => fetch(input, { ...init, signal: init?.signal ?? AbortSignal.timeout(ms) });
}

export const MEDIA_BUCKET = "site-media";
