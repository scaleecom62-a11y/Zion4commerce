import { DEFAULT_SITE } from "./default-site";
import { SECTION_MAP } from "./sections";
import type { PageContent, SectionInstance, SiteContent, SiteSettings } from "./schema";

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Makes stored content safe to render: drops unknown section types, fills fields
 * added since the content was saved, and keeps settings shaped like the defaults.
 */
export function normaliseSite(raw: unknown): SiteContent {
  if (!isObject(raw)) return DEFAULT_SITE;
  const settingsRaw = isObject(raw.settings) ? raw.settings : {};
  const settings: SiteSettings = {
    ...DEFAULT_SITE.settings,
    ...settingsRaw,
    colors: { ...DEFAULT_SITE.settings.colors, ...(isObject(settingsRaw.colors) ? settingsRaw.colors : {}) },
    contact: { ...DEFAULT_SITE.settings.contact, ...(isObject(settingsRaw.contact) ? settingsRaw.contact : {}) },
    footer: { ...DEFAULT_SITE.settings.footer, ...(isObject(settingsRaw.footer) ? settingsRaw.footer : {}) },
    seo: { ...DEFAULT_SITE.settings.seo, ...(isObject(settingsRaw.seo) ? settingsRaw.seo : {}) },
  } as SiteSettings;

  const pagesRaw = Array.isArray(raw.pages) ? raw.pages : [];
  const pages: PageContent[] = pagesRaw.filter(isObject).map((p) => {
    const sections: SectionInstance[] = (Array.isArray(p.sections) ? p.sections : [])
      .filter(isObject)
      .filter((s) => typeof s.type === "string" && SECTION_MAP[s.type as string])
      .map((s) => {
        const def = SECTION_MAP[s.type as string];
        return {
          id: typeof s.id === "string" ? s.id : `${s.type}-${Math.random().toString(36).slice(2, 8)}`,
          type: s.type as string,
          hidden: s.hidden === true,
          settings: { ...structuredClone(def.defaults), ...(isObject(s.settings) ? s.settings : {}) },
        };
      });
    const seo = isObject(p.seo) ? p.seo : {};
    return {
      slug: String(p.slug ?? ""),
      title: String(p.title ?? p.slug ?? "Page"),
      seo: { title: String(seo.title ?? ""), description: String(seo.description ?? "") },
      sections,
    };
  });

  return { settings, pages: pages.length ? pages : DEFAULT_SITE.pages };
}

export function findPage(site: SiteContent, slug: string): PageContent | undefined {
  return site.pages.find((p) => p.slug === slug);
}

export const RESERVED_SLUGS = new Set(["admin", "api", "auth", "_next", "images", "brand", "studio"]);

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && !RESERVED_SLUGS.has(slug);
}
