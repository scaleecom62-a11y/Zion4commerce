# Team Sync: Tasqr → Website

Status: proposed, awaiting approval.

## Facts from the Tasqr repo (`scaleecom62-a11y/folwture`, commit 7c0c32b)

- Tasqr is Next.js 16 + Supabase, live at tasqr.in.
- Employees live in the `profiles` table.
- Fields useful for the website: `full_name`, `avatar_url` (Supabase storage bucket `avatars`, public URL), `designation`, `department`, `company_role`, `is_active`.
- Private fields that must never reach the website: `email`, `phone`, `date_of_birth`, `employee_id`, `joining_date`, `manager_id`, `zoho_employee_id`, `zoho_employee_code`, `role`.
- Missing for the website: public bio, LinkedIn URL, display order, URL slug, and a "show on website" switch.
- Tasqr's Supabase project is not in the Supabase account connected to this session (checked `zion4tiktok` and `amalyze`. `zion4ops` is paused).
- Tasqr has a clean 256×256 transparent logo at `public/zion4commerce-logo.png`, better than the old site's 1.7 MB PNG.

## Proposed design

```
Tasqr admin edits profile ──► profiles table (+5 website columns)
                                   │
                    GET tasqr.in/api/public/team
                    (safe fields only, opted-in + active only)
                                   │
                 Website fetches on build and every hour
                 (keeps last good copy if Tasqr is down)
                                   │
                    /team page and /team/<slug> profiles
```

### Changes in Tasqr

1. Database: add to `profiles`
   - `show_on_website boolean default false`
   - `website_slug text unique`
   - `website_bio text`
   - `linkedin_url text`
   - `website_order int`
2. Admin page: a "Website profile" section per employee (admins only) to set those fields.
3. New public endpoint `GET /api/public/team`:
   - Returns only: name, slug, designation, company_role, website_bio, linkedin_url, avatar_url, order.
   - Filters `is_active = true AND show_on_website = true`.
   - Added to the proxy's public paths. Read-only. Cached for 1 hour.

### Changes in the website

1. Fetch the endpoint at build time and revalidate hourly.
2. If the fetch fails, serve the last good list. If there is no last good list, use a fallback file with the 6 people from the old site.
3. Add a "Rebuild" webhook so a profile change can show up instantly instead of within the hour.

## Why this design

| Concern | How it's handled |
|---|---|
| Privacy | Only 8 safe fields ever leave Tasqr. The website has no database key. |
| Consent | Default is hidden. An admin must switch each person on. |
| Leavers | Deactivating someone in Tasqr removes them from the website within an hour. |
| Tasqr downtime | Website keeps showing the last good team list. |
| One source of truth | Name, title and photo are edited once, in Tasqr. |

## Alternative: one-time export

Run one SQL query in Tasqr's Supabase, save as CSV, and convert it to a team file in the website repo. No Tasqr code changes, but every update is manual.

## Needed to proceed

1. Approval to change the Tasqr repo (this session has read-only access to it now).
2. Access to Tasqr's Supabase project to run the migration, or someone runs the SQL in its dashboard.
3. Who appears on the website: everyone active, or chosen people only.
