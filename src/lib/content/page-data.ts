import "server-only";
import type { Metadata } from "next";
import { findPage } from "./normalise";
import type { PageContent, SiteContent } from "./schema";
import { getPublishedSite, getTeam } from "./store";
import type { RenderData } from "@/components/site/shared";

export async function loadPage(slug: string): Promise<{ site: SiteContent; page: PageContent; data: RenderData } | null> {
  const site = await getPublishedSite();
  const page = findPage(site, slug);
  if (!page) return null;
  const needsTeam = page.sections.some((s) => s.type === "team_grid" && !s.hidden);
  const team = needsTeam ? await getTeam() : [];
  return { site, page, data: { team } };
}

export async function pageMetadata(slug: string): Promise<Metadata> {
  const site = await getPublishedSite();
  const page = findPage(site, slug);
  if (!page) return {};
  const s = site.settings;
  const title = slug === "home" ? `${s.siteName}: ${page.seo.title}` : `${page.seo.title || page.title}${s.seo.titleSuffix}`;
  const description = page.seo.description || s.seo.defaultDescription;
  const path = slug === "home" ? "/" : `/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: s.siteName, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}
