# Admin CMS (bolt.new build)

Login: `/admin/login`, linked from the footer "Admin" link on every page. We did not log in. This file lists what the code shows.

## Modules

| Module | URL | Role | What it manages |
|---|---|---|---|
| Dashboard | /admin/dashboard | any | Overview |
| Content | /admin/content | any | Edit `page_content` sections for Home, About, Team |
| Pages | /admin/pages, /admin/pages/new | any | `cms_pages` (custom pages) |
| Team | /admin/team | any | `team_members` |
| Blog | /admin/blog, /admin/blog/new | any | `blog_posts` |
| Media | /admin/media | any | `cms_media` uploads |
| Settings | /admin/settings | any | `cms_settings` |
| Users | /admin/users | admin | `users` |
| Audit Log | /admin/audit | admin | `cms_audit_log` |

Content edits save through the Supabase edge function `update-page-content`.

## Database tables (Supabase project `ogwbiumnxavqwrrncvlz`)

`page_content`, `team_members`, `blog_posts`, `cms_pages`, `cms_media`, `cms_settings`, `cms_audit_log`, `users`, `leads`

## Gaps between CMS and public site

- **Blog:** the admin can create blog posts, but no public `/blog` route exists. Any posts in the database are invisible to visitors.
- **Pages:** the admin can create custom pages, but no public route renders `cms_pages`. They are invisible too.
- **Home content:** the admin "Content" editor lists Home, but the home page is hardcoded and ignores the database. Edits to Home do nothing.

## Data to export before the old site is shut down

1. `leads`: every past inquiry. This is customer data. Export it securely and don't commit it to git.
2. `team_members`: bios, headshots, slugs.
3. `blog_posts`: any drafts or written posts.
4. `page_content`: the live About and Team copy.
5. `cms_media`: uploaded images.
