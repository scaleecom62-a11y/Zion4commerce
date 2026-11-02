import { notFound } from "next/navigation";
import { PageRenderer } from "@/components/site/PageRenderer";
import { loadPage, pageMetadata } from "@/lib/content/page-data";
import { getPublishedSite } from "@/lib/content/store";

export async function generateStaticParams() {
  const site = await getPublishedSite();
  return site.pages.filter((p) => p.slug !== "home").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  return pageMetadata(slug);
}

export default async function SitePage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  if (slug === "home") notFound();
  const loaded = await loadPage(slug);
  if (!loaded) notFound();
  return <PageRenderer page={loaded.page} site={loaded.site.settings} data={loaded.data} />;
}
