# Build Plan: Website + Visual Editor

## What we are building

1. **Public website** (Persuade mode): Home, About, Team, team profiles, Contact, Privacy, Terms, 404.
2. **Visual editor at `/admin`** (Operate mode), Shopify theme-editor style:
   - Left panel: pages, then the page's sections. Add, reorder (drag), hide, duplicate, delete.
   - Centre: live preview of the real page. Click any element to select it.
   - Right panel: every setting of the selected section or block (text, images, links, buttons, colors, visibility).
   - Global settings: header, navigation, footer, contact details, SEO, brand colors and fonts.
   - Draft vs published, preview before publish, version history with restore.
   - Media library (image upload, alt text).
   - Team section reads live from Tasqr. Editors pick who shows and in what order.
3. **Data and auth**: Supabase (Postgres, Storage, Auth). Editors log in with an allow-listed account.

## Which skill does what

| Phase | Work | Skill / tool | Why this one |
|---|---|---|---|
| 1. Product truth | PRODUCT.md: users, offer, positioning, evidence on hand | **impeccable `init`** | Its interview stops design from inventing facts. Feeds every later step. |
| 2. Argument and copy | One claim per section with its proof. Full copy deck before markup. | **taste-skill** steps 1, 2, 5 (`references/copy.md`) | Its "argument first" rule kills the stock hero → logos → 3 cards sequence. Two-line headline arithmetic. |
| 3. Visual direction | Deal 3 researched directions, choose one, type + palette + section blueprints | **taste-skill** `draw.mjs` | Breaks the model's default look with data from 247 real sites. |
| 3b. References | Compare chosen direction with real brand systems (Stripe, Mercury, Linear, Shopify, Resend) | **awesome-design-md** (`docs/design-references/`) | Concrete tokens and component specs to borrow precision from, not to copy. |
| 3c. Design system record | DESIGN.md + tokens from the direction | **impeccable** new-work, later `impeccable-documenter` agent | One source of truth for future pages and for the editor's theme settings. |
| 4. Build public site | Next.js sections, each section = one editable schema | **taste-skill** step 6 build order | Tokens first, hero, then each section from its blueprint. |
| 5. Build editor | Shopify-style 3-panel editor | **taste-skill** `references/app-screens.md` + `draw.mjs --app`, **impeccable** Operate mode | App screens have different rules (quiet borders and panels are correct there). |
| 6. Gates | Banned patterns, headline lines, margins, contrast, empty stretches, at 1440/768/390 | **taste-skill** `lint.mjs` + `inspect.mjs`, **impeccable** `detect` | Measured in a real browser, not hoped for. |
| 7. Review | Accessibility, forms, focus, motion, copy | **web-design-guidelines** (Vercel), **impeccable** `audit` + `harden` | Vercel's rules are checked line by line with `file:line` output. |
| 8. End-to-end tests | Log in → edit text → add section → publish → visible on site. Contact form. Team sync. | **playwright-cli** | Drives the real browser. Same flows become repeatable Playwright tests. |
| 9. Critique and polish | Screenshot critique, top 3 fixes, 3 rounds max. Motion layer last. | **taste-skill** steps 8–9, **impeccable** `critique`, `polish`, `animate`, `impeccable-finish-reviewer` agent | Two independent reviewers catch different failures. |

### Conflict rule between skills

taste-skill and impeccable overlap on visual decisions. For the **public site**, taste-skill's house rules win (they are stricter and measured). For the **editor**, impeccable Operate mode and taste-skill app-screen rules agree: familiar patterns, precision over expression. Brand facts in PRODUCT.md beat both.

## Technical stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js (App Router), TypeScript | Server-rendered HTML for SEO. Same stack as Tasqr. |
| Styling | Tailwind CSS v4 + CSS custom-property tokens | Editor theme settings write tokens, not class names. |
| Content model | JSON documents: `page → sections[] → blocks[]`, each type with a typed schema (zod) | Same model as Shopify themes. One schema drives both rendering and editor forms. |
| Data | Supabase: `site_pages`, `site_settings`, `site_versions`, `site_media`, `site_leads` | Draft and published copies per page. Row Level Security on every table. |
| Team | View over Tasqr `profiles`, safe columns only | No private HR fields ever reach the site. |
| Images | Supabase Storage bucket `site-media`, served via Next/Image | |
| Rendering | Static + on-demand revalidation on publish | Fast pages, edits live in seconds. |
| Contact form | Server action → save lead → email (provider decided later) | Leads never lost even before email is set up. |
| Hosting | Vercel | |

## Milestones

| # | Deliverable | Done when |
|---|---|---|
| M1 | PRODUCT.md, copy deck, chosen direction, DESIGN.md | User approves direction and copy |
| M2 | Public site from static content files | inspect.mjs 0 FAIL at 3 widths |
| M3 | Content model + Supabase tables + site reads from DB | Same pages render from DB |
| M4 | Editor: pages, sections, fields, live preview, publish | Playwright e2e passes |
| M5 | Media library, global settings, versions, team picker | Playwright e2e passes |
| M6 | Review, polish, motion, SEO, launch checklist | All gates green, user sign-off |
