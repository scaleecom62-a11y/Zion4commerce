import type { PageContent, SiteSettings } from "@/lib/content/schema";
import type { TeamMember } from "@/components/site/shared";

/** Messages between the editor and its preview iframe (same origin only). */
export type ToPreview =
  | { type: "z-render"; settings: SiteSettings; page: PageContent; team: TeamMember[] }
  | { type: "z-highlight"; sectionId: string | null; scroll: boolean };

export type FromPreview =
  | { type: "z-ready" }
  | { type: "z-select"; sectionId: string | null; field: string | null; region: "header" | "footer" | null };
