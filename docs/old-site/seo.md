# SEO Snapshot

## Per page

| URL | `<title>` after JS runs | Meta description | OG image |
|---|---|---|---|
| `/` | Zion4Commerce — Marketplace Growth Partners | None | bolt.new default |
| `/about` | About Zion4Commerce — Digital Commerce Architects | None | bolt.new default |
| `/team` | Zion4Commerce Team — Digital Commerce Architects | None | bolt.new default |
| `/team/<slug>` | From database | From database | bolt.new default |
| `/connect` | Zion Commerce Agency Site Visual CMS | None | bolt.new default |

## What search engines and social previews see

The raw HTML for every URL is identical:

- Title: "Zion Commerce Agency Site Visual CMS"
- No meta description
- `og:image` and `twitter:image`: `https://bolt.new/static/og_default.png` (a bolt.new graphic, not Zion4Commerce)
- Favicon: `/vite.svg`, which doesn't exist (returns the HTML shell)
- Empty `<div id="root">`, no text until JS runs
- A bolt.new badge script is loaded

## Missing

- sitemap.xml
- robots.txt
- Canonical tags
- Organization / LocalBusiness structured data (only team profiles have `Person` schema)
- Analytics or tag manager (no GA, GTM, Meta Pixel or LinkedIn Insight found in the bundle)
- Real 404 status codes (unknown paths return HTTP 200)

## Search visibility

A web search for `site:zion4commerce.com` on 2 Nov 2026 returned no pages from the domain. The site appears to be unindexed or barely indexed.

## Redirects needed at launch

Only 4 public URLs exist: `/`, `/about`, `/team`, `/connect`, plus `/team/<slug>` profiles. If the new site changes any path (for example `/connect` to `/contact`), add a 301 redirect.
