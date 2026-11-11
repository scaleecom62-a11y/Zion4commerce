import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { SiteSettings } from "@/lib/content/schema";
import { MobileMenu } from "./MobileMenu";
import { Address, Pic } from "./shared";

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
      <div className="container site-header__inner">
        <Link href="/" className="wordmark" aria-label={`${site.siteName} home`}>
          <Pic src={site.logo.src} alt="" width={80} height={80} sizes="40px" priority />
          <span translate="no">{site.siteName}</span>
        </Link>
        <nav className="site-nav" aria-label="Main">
          <ul className="site-nav__links">
            {site.nav.map((n) => (
              <li key={n.href + n.label}>
                <A href={n.href}>{n.label}</A>
              </li>
            ))}
          </ul>
          <MobileMenu items={site.nav} />
          <A href={site.headerAction.href} className="btn btn--primary btn--sm">
            {site.headerAction.label}
          </A>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ site }: { site: SiteSettings }) {
  return (
    <footer className="site-footer" data-region="footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link href="/" className="wordmark wordmark--light" aria-label={`${site.siteName} home`}>
              <Pic src={site.logo.src} alt="" width={80} height={80} sizes="40px" />
              <span translate="no">{site.siteName}</span>
            </Link>
            {site.footer.tagline && <p>{site.footer.tagline}</p>}
            <a className="site-footer__mail" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            <Address text={site.contact.address} className="site-footer__address" />
            <A href={site.headerAction.href} className="btn btn--light btn--sm">
              {site.headerAction.label}
              <ArrowRight size={16} aria-hidden="true" />
            </A>
          </div>
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
        </div>
        <div className="site-footer__base">
          <p>{site.footer.copyright}</p>
          <p>Amazon and TikTok Shop are trademarks of their owners.</p>
        </div>
      </div>
    </footer>
  );
}

export function colorVars(site: SiteSettings): React.CSSProperties {
  const c = site.colors;
  return {
    ["--c-paper" as string]: c.paper,
    ["--c-mist" as string]: c.mist,
    ["--c-steel" as string]: c.steel,
    ["--c-navy" as string]: c.navy,
    ["--c-night" as string]: c.night,
    ["--c-accent" as string]: c.accent,
    ["--c-ink" as string]: c.ink,
  };
}
