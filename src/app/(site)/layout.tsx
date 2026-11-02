import "./site.css";
import { SiteFooter, SiteHeader, colorVars } from "@/components/site/Chrome";
import { Motion } from "@/components/site/Motion";
import { getPublishedSite } from "@/lib/content/store";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const site = await getPublishedSite();
  return (
    <div className="site" style={colorVars(site.settings)}>
      <a className="sr-only" href="#main">
        Skip to content
      </a>
      <SiteHeader site={site.settings} />
      <main id="main">{children}</main>
      <SiteFooter site={site.settings} />
      <Motion />
    </div>
  );
}
