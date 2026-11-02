import "./(site)/site.css";
import { SiteFooter, SiteHeader, colorVars } from "@/components/site/Chrome";
import { NotFoundBand } from "@/components/site/NotFoundBand";
import { getPublishedSite } from "@/lib/content/store";

export const metadata = { title: "Not found · Zion4Commerce", robots: { index: false } };

export default async function GlobalNotFound() {
  const site = await getPublishedSite();
  return (
    <div className="site" style={colorVars(site.settings)}>
      <SiteHeader site={site.settings} />
      <main id="main">
        <NotFoundBand />
      </main>
      <SiteFooter site={site.settings} />
    </div>
  );
}
