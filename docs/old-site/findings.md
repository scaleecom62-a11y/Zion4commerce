# Findings: What the New Site Must Fix

Each item: what we observed, why it matters, and the open question it raises.

## A. Lead capture (highest business impact)

| # | Observation | Why it matters |
|---|---|---|
| A1 | Form submissions only go into a database table. The site code sends no email alert. | Leads may sit unseen. The form promises a reply "within 24 hours". |
| A2 | Every CTA ("Get Free Audit", "Book a Consultation", "Get Started") leads to the same long form. No calendar booking exists. | "Book a Consultation" sets an expectation the page doesn't meet. |
| A3 | No analytics, tag manager or ad pixels on the site. | Nobody can measure traffic, form conversion rate or lead source today. |
| A4 | No spam protection on the form. | Junk leads once the site gets traffic. |
| A5 | Contact email is a Gmail address and is not clickable. | Weak trust signal for a growth agency selling to brands. |

**Open questions:** How do leads reach the team today? How many leads came in over the last 90 days? Is a booking tool (Calendly, HubSpot) in use?

## B. Credibility and claim consistency

| # | Claim on Home | Claim elsewhere | Conflict |
|---|---|---|---|
| B1 | Arjun S: "13+ years" | About: "10+ years" | Same person, different number |
| B2 | "$50M+ Revenue Generated" | About: "$50M+ Revenue Managed" | Generated and managed mean different things |
| B3 | "50+ Active Clients" | About: "50+ Brands Scaled" | Different claims, same number |
| B4 | "500+ Projects Delivered" | none | No definition of a project |
| B5 | Team "10+ years combined experience" | Founder alone has 10 to 13+ years | The combined figure undersells the team |
| B6 | Case study "+420% International Sales" says UK, DE, CA (3 markets) | Same card: "Markets 7" | 3 named vs 7 counted |
| B7 | About hero cards "+156% Revenue Growth", "4.2x ROAS" | none | No source, client or time period |
| B8 | Featured result shows only words ("Strong", "Growing", "Significant drop") | none | No numbers in the strongest proof section |
| B9 | 2 of 3 case studies are anonymous ("Premium Skincare Brand", "Supplement Company") | | Low verifiability |
| B10 | Partner badges are drawn in HTML, not official badge files | | Check eligibility and the official badge rules for Amazon Ads Verified Partner, the Amazon SPN listing and TikTok Shop Partner |

**Open questions:** Which numbers are verified and current? Which clients allow us to use their name and logo? What time period does each case study cover?

## C. Positioning and services

| # | Observation |
|---|---|
| C1 | The hero says "Amazon & TikTok Shop". The services and CTAs also name Walmart, and About names Target+. The core offer is unclear. |
| C2 | Three different service lists: 4 on Home, 3 in the footer, 8 on the form. "Full-Funnel Strategy" is missing from the footer. "Brand Store Design" and "Inventory Management" appear only on the form. |
| C3 | No service detail pages, pricing models, engagement models or minimum spend. |
| C4 | "Halo Effect thesis" appears once with no explanation. It could be a signature idea worth its own section. |
| C5 | Target customer is "D2C and legacy brands". No sizes, categories or geographies are named, except the form's ad spend ranges. |
| C6 | No FAQs, no blog content, no free resources or lead magnets. |

**Open questions:** Which marketplaces and services drive most revenue today? Who is the ideal client (category, revenue band, region)? Does the free audit deliver something concrete, such as a report?

## D. Technical and SEO

| # | Observation |
|---|---|
| D1 | Client-side only app. Crawlers and social previews see an empty page titled "Zion Commerce Agency Site Visual CMS". |
| D2 | Share previews show the bolt.new image. The bolt.new badge script loads on every page. |
| D3 | No sitemap, robots.txt, meta descriptions, canonical tags or Organization schema. No favicon. |
| D4 | Unknown URLs return HTTP 200 instead of 404. |
| D5 | `/connect` never sets its own title. |
| D6 | The domain does not appear in search results. |
| D7 | Privacy Policy and Terms links are dead. The form collects personal data, so a privacy policy is needed (GDPR for UK/EU leads). |
| D8 | Copyright reads 2024. |
| D9 | The team page depends on a third-party database not in our account. If it pauses, the team page goes empty. |
| D10 | The logo is a 1.7 MB AI-generated PNG with no vector source. |

## E. Content and UX

| # | Observation |
|---|---|
| E1 | Header nav changes between Home (Services, About, Team) and inner pages (About, Team). Inner pages have no route back to services. |
| E2 | Two different footers with two different taglines. |
| E3 | 4 of 6 team members show initials instead of photos. |
| E4 | Team appears on Home, About text and `/team`. That's heavy repetition for a 6-person team. |
| E5 | Admin login link is public in every footer. |
| E6 | Blog and custom pages can be created in the admin but never appear on the site. |
| E7 | The 404 page uses an off-brand brown button. |

## Data still needed before design starts

1. Live content from the bolt.new Supabase database: team profiles, About copy, any blog drafts, past leads.
2. Verified numbers for every stat and case study, with dates.
3. Client permissions for names and logos.
4. Official partner status proof and badge files.
5. Ideal client profile and priority services.
6. How leads should be handled: email recipient, CRM, booking tool.
