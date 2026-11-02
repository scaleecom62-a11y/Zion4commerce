import { notFound } from "next/navigation";
import { PageRenderer } from "@/components/site/PageRenderer";
import { loadPage, pageMetadata } from "@/lib/content/page-data";

export function generateMetadata() {
  return pageMetadata("home");
}

export default async function Home() {
  const loaded = await loadPage("home");
  if (!loaded) notFound();
  return <PageRenderer page={loaded.page} site={loaded.site.settings} data={loaded.data} />;
}
