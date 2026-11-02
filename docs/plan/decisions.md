# Project Decisions

Confirmed by Aditya Sah on 2 Nov 2026.

| # | Topic | Decision | Effect on the new site |
|---|---|---|---|
| 1 | Stats and case-study numbers | All verified | Keep all numbers. Fix the conflicts listed in `docs/old-site/findings.md` section B before launch (e.g. 13+ vs 10+ years, "generated" vs "managed"). Each still needs one agreed value. |
| 2 | Client name and logo permissions | All clients mentioned have agreed | Maison d'Hermine can be shown by name and logo. The two anonymous case studies (skincare, supplement) stay anonymous unless real names are supplied. |
| 3 | Core offer | Amazon + TikTok Shop | Drop Walmart and Target+ from headlines, services and CTAs. |
| 4 | Lead routing | Email to arjun@zion4commerce.com, CC aditya@zion4commerce.com | Form sends an email on every submission. Sending domain must be verified (SPF/DKIM) so mail doesn't land in spam. |
| 5 | Tech stack | Claude's choice | Next.js (server-rendered HTML for SEO), Tailwind CSS, deployed on Vercel. |

## Open items from decision 1

These pairs conflict on the old site. Pick one value for each:

- Founder experience: 13+ years (Home) or 10+ years (About)
- $50M+: revenue generated or revenue managed
- 50+: active clients or brands scaled
- Linen brand case study: 3 markets named (UK, DE, CA) vs "Markets 7"
- About hero "+156% revenue growth" and "4.2x ROAS": which client and period
