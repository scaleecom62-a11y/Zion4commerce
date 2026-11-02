import type { MetadataRoute } from "next";
import { getPublishedSite } from "@/lib/content/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zion4commerce.com";
  const site = await getPublishedSite();
  return site.pages.map((p) => ({
    url: p.slug === "home" ? base : `${base}/${p.slug}`,
    changeFrequency: "monthly",
    priority: p.slug === "home" ? 1 : p.slug === "contact" ? 0.8 : 0.6,
  }));
}
