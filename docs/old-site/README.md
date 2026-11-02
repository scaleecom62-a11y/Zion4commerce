# Current Site Inventory: zion4commerce.com

Captured: 2 Nov 2026, from https://zion4commerce.com/

## How the old site is built

- Single-page React app (Vite), generated on bolt.new. Every URL returns the same empty HTML shell, and content renders only after JavaScript runs.
- The page content is mostly hardcoded in the JS bundle (`/assets/index-I4MJ9tp8.js`).
- Some content comes from a Supabase database (project `ogwbiumnxavqwrrncvlz`), which is not in our Supabase account.
- There is no sitemap.xml and no robots.txt. Both URLs return the app shell.
- An admin CMS lives at `/admin/*` behind a login.

## Method

1. Read the JS bundle to find every route, link, data query and text string.
2. Rendered each public route in headless Chromium at desktop (1440px) and mobile (390px).
3. Captured visible text, links, images, forms, meta tags and full-page screenshots.
4. Compared bundle strings with rendered text to find hidden states (success messages, loaders).

## Files

| File | Contents |
|---|---|
| [url-map.md](url-map.md) | Every URL, anchor and outbound link |
| [global.md](global.md) | Header, footer, contact details, brand, colors, fonts |
| [pages/home.md](pages/home.md) | Home page, full text |
| [pages/about.md](pages/about.md) | About page, full text |
| [pages/team.md](pages/team.md) | Team page and team profile template |
| [pages/connect.md](pages/connect.md) | Contact page and form |
| [admin-cms.md](admin-cms.md) | Admin panel modules and database tables |
| [seo.md](seo.md) | Titles, meta tags, structured data |
| [assets.md](assets.md) | Images and logo |
| [findings.md](findings.md) | Problems and inconsistencies to fix in the new site |
| `screenshots/` | Full-page screenshots, desktop and mobile |
| `assets/` | Downloaded images |

## Gap: database content not captured

The cloud environment blocks `ogwbiumnxavqwrrncvlz.supabase.co`. So these parts show fallback text or nothing:

| Page | Database content | What we captured |
|---|---|---|
| `/about` | `page_content` rows: hero, story, values, about_cta | Built-in fallback text. Live text may differ. |
| `/team` | `team_members` list, plus `page_content`: hero, value_props, team_cta | "No team members found." plus fallback text |
| `/team/<slug>` | One `team_members` row per person | Nothing. Slugs unknown. |

The home page team section is hardcoded, so the 6 team members and their LinkedIn URLs are captured there.

To close the gap: add `ogwbiumnxavqwrrncvlz.supabase.co` to the environment's allowed domains, or export the `page_content`, `team_members` and `blog_posts` tables from the bolt.new Supabase project.
