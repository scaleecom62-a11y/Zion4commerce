import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_KEY, SUPABASE_URL, supabaseConfigured, timedFetch } from "./config";

/** Client acting as the signed-in editor (reads the auth cookie). Never use inside 'use cache'. */
export async function userClient() {
  if (!supabaseConfigured) return null;
  const store = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    global: { fetch: timedFetch(10000) },
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          for (const { name, value, options } of list) store.set(name, value, options);
        } catch {
          // Called from a Server Component: cookies are read-only there. The proxy refreshes them.
        }
      },
    },
  });
}

export interface EditorSession {
  userId: string;
  email: string;
  name: string;
}

/** The signed-in user if they are on the website editors list, else null. */
export async function getEditor(): Promise<EditorSession | null> {
  const supabase = await userClient();
  if (!supabase) return null;
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return null;
  const { data: allowed } = await supabase.rpc("is_site_editor");
  if (allowed !== true) return null;
  const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle();
  return { userId: user.id, email: user.email ?? "", name: (profile?.full_name as string | undefined)?.trim() || user.email || "Editor" };
}
