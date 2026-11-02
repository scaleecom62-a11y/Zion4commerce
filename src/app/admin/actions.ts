"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { normaliseSite } from "@/lib/content/normalise";
import type { SiteContent } from "@/lib/content/schema";
import { SITE_TAG, TEAM_TAG } from "@/lib/content/store";
import { editorDemoMode } from "@/lib/editor/mode";
import { getEditor, userClient } from "@/lib/supabase/server";

export type ActionResult<T = undefined> = { ok: true; data?: T } | { ok: false; error: string };

const DEMO: ActionResult = { ok: false, error: "Demo mode: nothing is saved. Connect the database to save and publish." };

async function requireEditor() {
  if (editorDemoMode()) return null;
  const editor = await getEditor();
  if (!editor) throw new Error("You are not signed in as a website editor.");
  const supabase = await userClient();
  if (!supabase) throw new Error("Database is not configured.");
  return { editor, supabase };
}

function fail(e: unknown): { ok: false; error: string } {
  return { ok: false, error: e instanceof Error ? e.message : "Something went wrong." };
}

export async function saveDraft(content: SiteContent): Promise<ActionResult<{ savedAt: string }>> {
  try {
    const ctx = await requireEditor();
    if (!ctx) return DEMO;
    const clean = normaliseSite(content);
    const savedAt = new Date().toISOString();
    const { error } = await ctx.supabase
      .from("site_documents")
      .upsert({ key: "draft", content: clean, updated_at: savedAt, updated_by: ctx.editor.userId });
    if (error) return { ok: false, error: error.message };
    return { ok: true, data: { savedAt } };
  } catch (e) {
    return fail(e);
  }
}

export async function publishSite(content: SiteContent, note: string): Promise<ActionResult<{ publishedAt: string }>> {
  try {
    const ctx = await requireEditor();
    if (!ctx) return DEMO;
    const clean = normaliseSite(content);
    const at = new Date().toISOString();
    const rows = [
      { key: "draft", content: clean, updated_at: at, updated_by: ctx.editor.userId },
      { key: "published", content: clean, updated_at: at, updated_by: ctx.editor.userId },
    ];
    const { error } = await ctx.supabase.from("site_documents").upsert(rows);
    if (error) return { ok: false, error: error.message };
    const { error: vErr } = await ctx.supabase
      .from("site_versions")
      .insert({ content: clean, note: note.slice(0, 200) || null, created_by: ctx.editor.userId });
    if (vErr) return { ok: false, error: `Published, but the version was not recorded: ${vErr.message}` };
    updateTag(SITE_TAG);
    return { ok: true, data: { publishedAt: at } };
  } catch (e) {
    return fail(e);
  }
}

export interface VersionRow {
  id: number;
  note: string | null;
  created_at: string;
  author: string | null;
}

export async function listVersions(): Promise<ActionResult<VersionRow[]>> {
  try {
    const ctx = await requireEditor();
    if (!ctx) return { ok: true, data: [] };
    const { data, error } = await ctx.supabase
      .from("site_versions")
      .select("id, note, created_at, profiles:created_by(full_name)")
      .order("id", { ascending: false })
      .limit(50);
    if (error) return { ok: false, error: error.message };
    return {
      ok: true,
      data: (data ?? []).map((r: Record<string, unknown>) => ({
        id: r.id as number,
        note: (r.note as string | null) ?? null,
        created_at: r.created_at as string,
        author: ((r.profiles as { full_name?: string } | null)?.full_name ?? null)?.trim() ?? null,
      })),
    };
  } catch (e) {
    return fail(e);
  }
}

export async function loadVersion(id: number): Promise<ActionResult<SiteContent>> {
  try {
    const ctx = await requireEditor();
    if (!ctx) return DEMO as ActionResult<SiteContent>;
    const { data, error } = await ctx.supabase.from("site_versions").select("content").eq("id", id).maybeSingle();
    if (error || !data) return { ok: false, error: error?.message ?? "Version not found." };
    return { ok: true, data: normaliseSite(data.content) };
  } catch (e) {
    return fail(e);
  }
}

export interface LeadRow {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  website: string | null;
  phone: string | null;
  country: string | null;
  spend: string | null;
  services: string[];
  message: string | null;
  email_status: string;
}

export async function listLeads(): Promise<ActionResult<LeadRow[]>> {
  try {
    const ctx = await requireEditor();
    if (!ctx) return { ok: true, data: [] };
    const { data, error } = await ctx.supabase
      .from("site_leads")
      .select("id, created_at, name, email, company, website, phone, country, spend, services, message, email_status")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) return { ok: false, error: error.message };
    return { ok: true, data: (data ?? []) as LeadRow[] };
  } catch (e) {
    return fail(e);
  }
}

export interface TeamAdminRow {
  id: string;
  name: string;
  designation: string | null;
  department: string | null;
  photo: string | null;
  is_active: boolean;
  show_on_website: boolean;
  website_order: number;
  website_role: string | null;
  website_bio: string | null;
  linkedin_url: string | null;
}

export async function listTeam(): Promise<ActionResult<TeamAdminRow[]>> {
  try {
    const ctx = await requireEditor();
    if (!ctx) return { ok: true, data: [] };
    const { data, error } = await ctx.supabase.rpc("site_team_admin");
    if (error) return { ok: false, error: error.message };
    return { ok: true, data: (data ?? []) as TeamAdminRow[] };
  } catch (e) {
    return fail(e);
  }
}

export async function saveTeamMember(row: {
  id: string;
  show: boolean;
  order: number;
  role: string;
  bio: string;
  linkedin: string;
}): Promise<ActionResult> {
  try {
    const ctx = await requireEditor();
    if (!ctx) return DEMO;
    const { error } = await ctx.supabase.rpc("site_set_team_member", {
      p_id: row.id,
      p_show: row.show,
      p_order: Math.round(row.order),
      p_role: row.role,
      p_bio: row.bio,
      p_linkedin: row.linkedin,
    });
    if (error) return { ok: false, error: error.message };
    updateTag(TEAM_TAG);
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

export async function signOut() {
  const supabase = await userClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}
