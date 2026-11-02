import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { TeamMember } from "@/components/site/shared";
import { publicClient } from "@/lib/supabase/public";
import { DEFAULT_SITE } from "./default-site";
import { normaliseSite } from "./normalise";
import type { SiteContent } from "./schema";

export const SITE_TAG = "site";
export const TEAM_TAG = "team";

/** Published site content. Falls back to the built-in content if the database is unreachable or empty. */
export async function getPublishedSite(): Promise<SiteContent> {
  "use cache";
  cacheTag(SITE_TAG);
  cacheLife("hours");
  const supabase = publicClient();
  if (!supabase) return DEFAULT_SITE;
  try {
    const { data, error } = await supabase.from("site_documents").select("content").eq("key", "published").maybeSingle();
    if (error || !data?.content) return DEFAULT_SITE;
    return normaliseSite(data.content);
  } catch {
    return DEFAULT_SITE;
  }
}

/** Shown only when Tasqr cannot be reached. These six people are already public on the old site. */
export const FALLBACK_TEAM: TeamMember[] = [
  { id: "arjun", slug: "arjun-s", name: "Arjun S", role: "Founder and CEO", department: null, bio: null, photo: null, linkedin: "https://www.linkedin.com/in/arjun-s-0522936a/" },
  { id: "aditya", slug: "aditya-sah", name: "Aditya Sah", role: "Head, Performance Marketing and Analytics", department: null, bio: null, photo: null, linkedin: "https://www.linkedin.com/in/aditya-sah-b0121b101/" },
  { id: "shambhavi", slug: "shambhavi-kumar", name: "Shambhavi Kumar", role: "Head, Partner Success", department: null, bio: null, photo: null, linkedin: "https://www.linkedin.com/in/shambhavi-kumar-7a82b821b/" },
  { id: "prathyush", slug: "prathyush-akansh", name: "Prathyush Akansh", role: "Manager, Social Commerce and Content Strategy", department: null, bio: null, photo: null, linkedin: "https://www.linkedin.com/in/prathyush-akansh/" },
  { id: "madhusmita", slug: "madhusmita-mohanty", name: "Madhusmita Mohanty", role: "Partner Manager", department: null, bio: null, photo: null, linkedin: "https://www.linkedin.com/in/madhusmita-mohanty-4357b5148/" },
  { id: "bhuvan", slug: "bhuvan-v", name: "Bhuvan V", role: "Ecommerce Specialist", department: null, bio: null, photo: null, linkedin: "https://www.linkedin.com/in/bhuvan-v-4544b0375/" },
];

/** Opted-in, active team members from Tasqr. Only safe columns ever leave the database. */
export async function getTeam(): Promise<TeamMember[]> {
  "use cache";
  cacheTag(TEAM_TAG);
  cacheLife("hours");
  const supabase = publicClient();
  if (!supabase) return FALLBACK_TEAM;
  try {
    const { data, error } = await supabase.rpc("site_team");
    if (error || !Array.isArray(data)) return FALLBACK_TEAM;
    return data.map((r: Record<string, unknown>) => ({
      id: String(r.id),
      slug: String(r.slug ?? r.id),
      name: String(r.name ?? ""),
      role: String(r.role ?? ""),
      department: (r.department as string | null) ?? null,
      bio: (r.bio as string | null) ?? null,
      photo: (r.photo as string | null) ?? null,
      linkedin: (r.linkedin as string | null) ?? null,
    }));
  } catch {
    return FALLBACK_TEAM;
  }
}
