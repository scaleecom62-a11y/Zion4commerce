# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: Next.js (App Router, TypeScript), Tailwind CSS v4 with CSS custom-property tokens, Supabase (Postgres, Storage, Auth) in Tasqr's existing project `folwture`, hosted on Vercel. Chosen for server-rendered HTML (search visibility) and to match Tasqr's stack so one team maintains both.

## Users

Two audiences:

1. **Prospective clients** evaluating a marketplace growth partner. Four segments, all confirmed:
   - Indian brands going global (Amazon US/UK/EU/UAE, TikTok Shop US)
   - Established US/UK D2C brands growing Amazon and adding TikTok Shop
   - Legacy or offline brands launching on Amazon and TikTok Shop for the first time
   - Brands already on Amazon with high TACoS or flat sales
   Their job: decide whether Zion4Commerce can grow them profitably, then request a free audit.
2. **Site editors** (Zion4Commerce admins, already Tasqr users) who change any page content without a developer.

## Product Purpose

Zion4Commerce is a marketplace growth agency for Amazon and TikTok Shop. The website exists to turn qualified brand owners into free-audit requests, routed by email to arjun@zion4commerce.com with aditya@zion4commerce.com in CC. Success: more qualified audit requests, measurable by source.

## Positioning

What the site leads with, confirmed by the client:

1. **Profit-first.** Success is judged on TACoS and contribution margin, not revenue or ROAS alone.
2. **The Halo Effect.** Amazon and TikTok Shop run together. TikTok Shop demand lifts Amazon organic rank, so the paid-to-organic ratio improves.
3. **Global marketplaces.** One partner runs Amazon US, UK, CA, DE, UAE and TikTok Shop US for a brand.

Core offer is Amazon + TikTok Shop only. Walmart and Target+ are not offered on the site.

## Operating Context

- Engagement starts with a free audit: ads, listings, pricing, competition, profitability.
- Process the client already uses: research and audit, then design and optimise (listings, PPC architecture, A+ content, Halo Effect), then grow and scale (new markets as profitability compounds).
- Vocabulary clients and team use: TACoS, ROAS, ACoS, BSR, CVR, contribution margin, A+ content, PPC, paid-to-organic ratio.
- Team data lives in Tasqr (`profiles` table). The website shows only opted-in, active people and only safe fields.

## Capabilities and Constraints

- Services offered: marketplace expansion (Amazon global, TikTok Shop), performance marketing (PPC), revenue and margin optimisation, full-funnel marketplace management (listings, content, reviews, retention).
- Every visible element of the site must be editable by non-developers in a Shopify-style visual editor at `/admin`, with draft, preview, publish and version history.
- Contact form saves every lead to the database first, then emails. Email provider: undecided.
- Privacy policy and terms pages are required (form collects personal data from UK/EU visitors).
- Team members' private HR fields (phone, date of birth, email, employee ID, Zoho IDs, joining date) must never reach the website.

## Brand Commitments

- Name: Zion4Commerce.
- Logo: keep the hexagon mountain badge. Best source: `scaleecom62-a11y/folwture` → `public/zion4commerce-logo.png` (256×256, transparent). No vector exists yet.
- Colors and typography: open. The old navy and sky-blue palette is not binding.
- Voice: direct operator language, numbers over adjectives. No hype.

## Evidence on Hand

All figures confirmed as verified by the client on 2 Nov 2026:

- 13+ years: founder Arjun S's eCommerce experience (ex-VP eCommerce Ergode, ex-Director eCommerce California Design Den).
- $50M+ revenue managed. 50+ brands scaled. 500+ projects delivered. 15+ countries.
- Named client: Maison d'Hermine (premium designer table and kitchen linen), Amazon global marketplaces + TikTok Shop US. TACoS dropped within 90 days, ROAS grew weekly. Logo: `docs/old-site/assets/client-maison-dhermine.jpeg`.
- Case: anonymous premium skincare brand, $50K → $192K monthly Amazon revenue in 6 months (+285%), ROAS 4.8x, TACoS 12%, CVR 18.2%.
- Case: premium designer table and kitchen linen brand, +420% international sales, launched UK, DE, CA (3 marketplaces), 45+ SKUs.
- Case: anonymous supplement company, profit margin +65%, sales +180%, 4.8★ reviews.
- Anonymous client: +156% revenue growth, 4.2x ROAS.
- Partner status claimed on old site: TikTok Shop Partner, Amazon Ads verified partner, Amazon Seller Central Partner Network. Official badge files not on hand.
- Team: 9 active people in Tasqr. Only one has a photo.

Absent, must not be fabricated: testimonials beyond the Maison d'Hermine quote, other client names or logos, press mentions, pricing, case-study time periods other than those stated.

## Product Principles

1. Lead with profit, not activity. Every claim ties to TACoS, margin or organic rank.
2. Show proof with numbers and context. No claim without a figure; no figure without a client or scope.
3. Amazon and TikTok Shop are one system. Present them together, never as two separate services.
4. The free audit is the single action. Every page points to it.
5. The team edits the site themselves. Nothing on a page may require a developer to change.

## Accessibility & Inclusion

Target WCAG 2.2 AA for the public site and the editor. Readers include non-native English speakers (India, Europe): plain words, defined acronyms on first use.
