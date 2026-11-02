# Launch Checklist

Status as of 2 Nov 2026. Items marked ☐ need a person.

## Database (Tasqr's Supabase project `folwture`)

- ☐ Approve and apply `supabase/migrations/20261102000001_website_content.sql`: site tables, editor list, leads, media bucket, website fields on profiles.
- ☐ Apply `supabase/migrations/20261102000002_seed_website_team.sql`: shows the six people already public on the old site.
- ☐ First publish from the editor. Until then the live site shows the built-in content, which is identical.
- ☐ Auth → URL configuration: add `https://zion4commerce.com/auth/callback` (and the Vercel preview domain) to the redirect URLs, so Google sign-in works on the website.

## Hosting (Vercel)

- ☐ Import the repo, branch `claude/zealous-sagan-1y1j37` (or merge it to `main` first).
- ☐ Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SITE_URL=https://zion4commerce.com`. Never set `EDITOR_DEMO_MODE` in production.
- ☐ Point the zion4commerce.com domain to Vercel. This replaces the bolt.new site.

## Images

- ☐ Make the generated photos independent of Higgsfield's CDN: allow `d8j0ntlcm91z4.cloudfront.net` in this environment and run `node scripts/localise-images.mjs`, or re-upload the 5 images through the editor's image library.
- ☐ Team headshots: upload photos in Tasqr (profile photo). The website shows initials until then.

## Content to confirm

- ☐ Privacy policy and terms are drafts for legal review (`/privacy`, `/terms`).
- ☐ Contact email in the footer is still `zion4commerce@gmail.com`. Change it in Site → Contact and leads if a domain address should show instead.

## Lead email

- ☐ Choose the email provider (decision deferred). Until then every request is saved and visible in the editor under Leads, with CSV export. The form promises a reply within 24 hours, so someone must check Leads daily until email is connected.

## Old site

- ☐ Export the bolt.new Supabase `leads` table (past inquiries) before the old site is switched off.
- ☐ Redirects in place: `/connect` → `/contact`. The old `/team/<slug>` profile pages are not rebuilt; they fall back to the 404 page.

## Security follow-up (Tasqr, separate repo)

- ☐ Fix Tasqr's `profiles_update` policy: any signed-in user can change their own `role` to `superadmin`. The website does not rely on that role, but Tasqr does.

## Checks run on this build

| Check | Result |
|---|---|
| TypeScript, ESLint | Pass |
| taste-skill lint | 0 FAIL |
| taste-skill inspector (home, 1440/768/390) | Only failures: images blocked in the build sandbox's network; phone screens beyond its 11-screen scroll limit |
| impeccable detect | 0 findings |
| Vercel web interface guidelines | Reviewed; fixes applied (skip link, form focus and kept values, menu, theme colour) |
| Playwright end-to-end (site + editor, demo mode) | 10/10, stable over repeated runs |
