# Zion4Commerce Website

New website for Zion4Commerce, built from scratch. It replaces the current site at https://zion4commerce.com/.

## Phases

| # | Phase | Status | Output |
|---|---|---|---|
| 1 | Audit the current site | Done, except database-driven content (team profiles, live About copy) | `docs/old-site/` |
| 2 | Sitemap, content plan, design direction | Not started | `docs/plan/` |
| 3 | Build the new site | Not started | app code |
| 4 | QA, SEO redirects from old URLs, launch | Not started | `docs/launch/` |

## Phase 1 scope

Capture every page, tab, menu and submenu on the current site:

- Full URL map, including sitemap.xml and footer links
- Page text, headings, buttons and CTAs
- Services, case studies, testimonials, stats, client logos
- Blog posts and categories
- Forms and their fields
- Contact details, social links, legal pages
- Images and other media references
- SEO titles and meta descriptions per page

## Design and QA tooling

| Tool | Type | Location | Use |
|---|---|---|---|
| design-taste-frontend ([Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)) | Skill | `.claude/skills/design-taste-frontend` | Visual direction, layout, type, color |
| web-design-guidelines ([vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)) | Skill | `.claude/skills/web-design-guidelines` | UI and accessibility review |
| playwright-cli ([microsoft/playwright-cli](https://github.com/microsoft/playwright-cli)) | Skill + CLI | `.claude/skills/playwright-cli` | Browser testing and screenshots. CLI: `npm install -g @playwright/cli@latest` |
| impeccable ([pbakaus/impeccable](https://github.com/pbakaus/impeccable)) | Plugin | `.claude/settings.json` | Design critique, audit, polish. Runs hooks on edits. |
| awesome-design-md ([VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)) | Reference library | `docs/design-references/awesome-design-md` | 84 DESIGN.md files from known brands |

`skills-lock.json` pins the skill sources. Restore with `npx skills experimental_install`.

## Rules

- Never commit secrets. Use `.env.example` for variable names only.
