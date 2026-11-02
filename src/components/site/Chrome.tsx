import Link from "next/link";
import type { SiteSettings } from "@/lib/content/schema";
import { HexMark, Pic } from "./shared";

function A({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export function SiteHeader({ site }: { site: SiteSettings }) {
  return (
    <header className="site-header" data-region="header">
      <Link href="/" className="wordmark" aria-label={`${site.siteName} home`}>
        <Pic src={site.logo.src} alt="" width={88} height={88} sizes="44px" priority />
        <span>{site.siteName}</span>
      </Link>
      <nav className="site-nav" aria-label="Main">
        <ul className="site-nav__links">
          {site.nav.map((n) => (
            <li key={n.href + n.label}>
              <A href={n.href}>{n.label}</A>
            </li>
          ))}
        </ul>
        <details className="site-menu">
          <summary>Menu</summary>
          <ul>
            {site.nav.map((n) => (
              <li key={n.href + n.label}>
                <A href={n.href}>{n.label}</A>
              </li>
            ))}
          </ul>
        </details>
        <A href={site.headerAction.href} className="btn btn--small">
          {site.headerAction.label}
        </A>
      </nav>
    </header>
  );
}

export function SiteFooter({ site }: { site: SiteSettings }) {
  return (
    <footer className="site-footer f-lime" data-region="footer">
      <div className="site-footer__mark" aria-hidden="true">
        <HexMark />
        <p className="site-footer__name display">{site.siteName}</p>
      </div>
      <div className="site-footer__cols">
        {site.footer.columns.map((c) => (
          <nav key={c.title} className="site-footer__col" aria-label={c.title}>
            <h2>{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.href + l.label}>
                  <A href={l.href}>{l.label}</A>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="site-footer__contact">
          <p>{site.footer.tagline}</p>
          <p>
            <a className="link" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
          </p>
        </div>
      </div>
      <div className="site-footer__base">
        <p>{site.footer.copyright}</p>
        <A href={site.headerAction.href} className="btn btn--small btn--ink">
          {site.headerAction.label}
        </A>
      </div>
    </footer>
  );
}

export function colorVars(site: SiteSettings): React.CSSProperties {
  const c = site.colors;
  return {
    ["--c-paper" as string]: c.paper,
    ["--c-orange" as string]: c.orange,
    ["--c-sky" as string]: c.sky,
    ["--c-lime" as string]: c.lime,
    ["--c-night" as string]: c.night,
    ["--c-accent" as string]: c.accent,
    ["--c-ink" as string]: c.ink,
  };
}
