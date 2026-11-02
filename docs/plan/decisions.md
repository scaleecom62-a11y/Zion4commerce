# Project Decisions

Confirmed by Aditya Sah on 2 Nov 2026.

| # | Topic | Decision | Effect on the new site |
|---|---|---|---|
| 1 | Stats and case-study numbers | All verified | Keep all numbers. Fix the conflicts listed in `docs/old-site/findings.md` section B before launch (e.g. 13+ vs 10+ years, "generated" vs "managed"). Each still needs one agreed value. |
| 2 | Client name and logo permissions | All clients mentioned have agreed | Maison d'Hermine can be shown by name and logo. The two anonymous case studies (skincare, supplement) stay anonymous unless real names are supplied. |
| 3 | Core offer | Amazon + TikTok Shop | Drop Walmart and Target+ from headlines, services and CTAs. |
| 4 | Lead routing | Email to arjun@zion4commerce.com, CC aditya@zion4commerce.com | Form sends an email on every submission. Sending domain must be verified (SPF/DKIM) so mail doesn't land in spam. |
| 5 | Tech stack | Claude's choice | Next.js (server-rendered HTML for SEO), Tailwind CSS, deployed on Vercel. |

## Resolved claim conflicts (2 Nov 2026)

| Claim | Final wording |
|---|---|
| Founder experience | 13+ years (everywhere, including About) |
| $50M+ | Revenue managed |
| 50+ | Brands scaled |
| Linen brand case study | 3 marketplaces (UK, DE, CA). "Markets 7" was wrong. |
| "+156% revenue growth" and "4.2x ROAS" | Real results, client stays anonymous |

The old "500+ Projects Delivered" and "15+ Countries" stats stay, since all numbers are confirmed as verified.

## Lead email delivery

| Option | Free limit | Needs DNS change | Sends CC | Verdict |
|---|---|---|---|---|
| Resend | 3,000/month, 100/day | Yes, one-time | Yes | **Recommended** |
| Web3Forms | 250 submissions/month | No | Not on free plan (per third-party review) | Fallback if DNS access is not possible |
| Brevo | 300/day | Sender verification | Yes | Works, heavier setup and account approval step |

The form code will keep the provider behind one function, so switching later is a small change.

## Team data

Team members will come from Tasqr. Integration method pending: product URL and export/API options not yet confirmed.
