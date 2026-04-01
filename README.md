# Zion4Commerce — Premium Next.js + Sanity Website

A production-grade, fully dynamic marketing website for Zion4Commerce built with
**Next.js 14 App Router**, **Tailwind CSS**, and **Sanity v3** headless CMS.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Folder Structure](#2-folder-structure)
3. [Tech Stack Decisions](#3-tech-stack-decisions)
4. [Prerequisites](#4-prerequisites)
5. [Local Setup (Step-by-Step)](#5-local-setup-step-by-step)
6. [Sanity CMS Setup](#6-sanity-cms-setup)
7. [Environment Variables](#7-environment-variables)
8. [Development Workflow](#8-development-workflow)
9. [Deployment to Vercel](#9-deployment-to-vercel)
10. [CMS User Guide (Non-Technical)](#10-cms-user-guide-non-technical)
11. [Adding New Pages](#11-adding-new-pages)
12. [Email Setup (Contact Form)](#12-email-setup-contact-form)
13. [Performance & SEO](#13-performance--seo)
14. [Customisation Guide](#14-customisation-guide)

---

## 1. Project Overview

| Feature | Detail |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom design tokens |
| CMS | Sanity v3 (embedded studio at `/studio`) |
| Deployment | Vercel (zero-config) |
| Forms | react-hook-form + zod + Resend email |
| Fonts | Trirong (headings) + DM Sans (UI) + Sora (body) |
| Animations | CSS intersection observer reveals |
| SEO | Auto-generated sitemap, robots.txt, JSON-LD, OG tags |

### Pages

| Route | Description |
|---|---|
| `/` | Home — hero, marquee, marketplaces, services, stats, process, testimonials, CTA |
| `/about` | About — story, values, team grid, CTA |
| `/services` | Services listing — all 6 services with Halo Effect section |
| `/services/[slug]` | Individual service detail |
| `/blog` | Blog listing — featured post + grid |
| `/blog/[slug]` | Blog post detail with rich text |
| `/contact` | Contact — form with validation, process steps |
| `/studio` | **Sanity Studio** — content management (protected by Sanity auth) |

---

## 2. Folder Structure

```
zion4commerce/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (home)/                 # Route group — home page
│   │   │   ├── page.tsx            # Home page (server component)
│   │   │   └── loading.tsx         # Skeleton loader
│   │   ├── about/page.tsx          # About page
│   │   ├── services/
│   │   │   ├── page.tsx            # Services listing
│   │   │   └── [slug]/page.tsx     # Service detail
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog listing
│   │   │   └── [slug]/page.tsx     # Blog post
│   │   ├── contact/
│   │   │   ├── page.tsx            # Contact page (server)
│   │   │   └── ContactForm.tsx     # Form (client component)
│   │   ├── studio/[[...tool]]/     # Embedded Sanity Studio
│   │   ├── api/
│   │   │   ├── contact/route.ts    # Contact form handler
│   │   │   └── revalidate/route.ts # Sanity webhook revalidation
│   │   ├── layout.tsx              # Root layout (fonts, metadata, Navbar, Footer)
│   │   ├── not-found.tsx           # 404 page
│   │   ├── error.tsx               # Error boundary
│   │   ├── sitemap.ts              # Auto sitemap
│   │   └── robots.ts               # robots.txt
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Sticky responsive nav
│   │   │   └── Footer.tsx          # Detailed footer
│   │   ├── sections/               # Page section components
│   │   │   ├── HeroSection.tsx     # Animated hero
│   │   │   ├── MarqueeStrip.tsx    # Scrolling ticker
│   │   │   ├── MarketplacesSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── index.tsx           # Stats, Process, Testimonials, CTA
│   │   │   └── (barrel re-exports)
│   │   ├── ui/
│   │   │   ├── Skeleton.tsx        # Loading skeletons
│   │   │   └── Toaster.tsx         # Toast notifications
│   │   └── shared/
│   │       └── ScrollRevealProvider.tsx
│   │
│   ├── hooks/
│   │   └── useScrollReveal.ts      # Intersection observer hook
│   │
│   ├── lib/
│   │   ├── sanity.ts               # Sanity client + image URL builder
│   │   ├── queries.ts              # All GROQ queries
│   │   └── utils.ts                # cn(), formatDate(), etc.
│   │
│   ├── types/
│   │   └── index.ts                # All TypeScript types
│   │
│   └── styles/
│       └── globals.css             # Design tokens + global styles
│
├── sanity/
│   ├── sanity.config.ts            # Studio configuration
│   ├── lib/
│   │   └── structure.ts            # Custom desk structure
│   └── schemas/
│       ├── index.ts                # Schema registry
│       ├── siteSettings.ts         # Global settings singleton
│       ├── homePage.ts             # Home page singleton
│       ├── schemas.ts              # All collection schemas
│       └── (barrel re-exports)
│
├── public/                         # Static assets (logos, OG image)
├── .env.example                    # Environment variable template
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. Tech Stack Decisions

### Why Next.js 14 App Router?
- **Server Components** by default = faster TTFB, smaller JS bundles
- **Streaming & Suspense** for progressive rendering
- **Built-in image optimisation** via `next/image`
- **File-based routing** keeps pages simple and co-located
- **Vercel-native** — deploys with zero config

### Why Sanity?
- **Non-technical friendly** — clean, Google Docs-like editing UI
- **Structured schemas** prevent editors from breaking layouts
- **CDN-powered** image delivery (auto WebP/AVIF)
- **GROQ** — powerful query language, no N+1 fetches
- **Embedded studio** at `/studio` — no separate deployment needed
- **Webhook revalidation** — publish content → page updates in seconds

### Why Tailwind CSS?
- Utility-first = no CSS file explosion as the project grows
- Design token system via `tailwind.config.ts`
- **No CSS-in-JS runtime** = better performance

---

## 4. Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | 18.17+ | https://nodejs.org |
| npm | 9+ | Included with Node |
| Git | Any | https://git-scm.com |
| Sanity account | Free | https://www.sanity.io |

---

## 5. Local Setup (Step-by-Step)

### Step 1 — Clone or unzip the project

```bash
# If using git:
git clone <your-repo-url>
cd zion4commerce

# Or simply unzip the folder and navigate into it
cd zion4commerce
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Set up environment variables

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in your values (see [Section 7](#7-environment-variables)).

### Step 4 — Run the development server

```bash
npm run dev
```

Open **http://localhost:3000**

> The site works without a Sanity project — it uses hardcoded fallback content.
> Connect Sanity when you're ready to make content editable.

---

## 6. Sanity CMS Setup

### Step 1 — Create a Sanity project

1. Go to **https://www.sanity.io/get-started**
2. Sign up / log in
3. Create a new project:
   - **Name:** Zion4Commerce
   - **Dataset:** `production`
   - **Template:** Clean (no template)
4. Note your **Project ID** (shown on the project page)

### Step 2 — Add Project ID to .env.local

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz   # ← your actual ID
NEXT_PUBLIC_SANITY_DATASET=production
```

### Step 3 — Add localhost CORS origin

In Sanity dashboard → **API** → **CORS Origins** → Add:
```
http://localhost:3000
```
Check "Allow credentials".

For production, also add `https://yoursite.com`.

### Step 4 — Generate API Token

In Sanity dashboard → **API** → **Tokens** → **Add API token**:
- **Name:** Next.js Server
- **Permissions:** Editor (or Viewer for read-only)

Copy the token to `.env.local`:
```env
SANITY_API_TOKEN=sk...your_token
```

### Step 5 — Access the Studio

Start your dev server and visit:
```
http://localhost:3000/studio
```

Log in with your Sanity account. You'll see the full CMS with all schemas loaded.

### Step 6 — Add initial content

In the Studio:
1. Click **⚙️ Site Settings** → Fill in site name, email, logo
2. Click **🏠 Home Page** → Edit hero, stats, CTA sections
3. Click **🛠 Services** → Add 6 service documents
4. Click **👥 Team Members** → Add team profiles
5. Click **📝 Blog Posts** → Create your first article

### Step 7 — Set up Webhook (for live content updates)

In Sanity dashboard → **API** → **Webhooks** → **Add webhook**:
- **Name:** Next.js Revalidation
- **URL:** `https://yoursite.com/api/revalidate?secret=YOUR_SECRET`
- **Trigger on:** Create, Update, Delete
- **Filter:** (leave blank — revalidate all)

Set the same secret in your environment:
```env
SANITY_WEBHOOK_SECRET=your_random_secret_string
```

---

## 7. Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | From Sanity dashboard |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Usually `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Yes | Date string, e.g. `2024-01-01` |
| `SANITY_API_TOKEN` | Yes | Server-only API token |
| `SANITY_WEBHOOK_SECRET` | Yes | Random string for webhook auth |
| `NEXT_PUBLIC_SITE_URL` | Yes | Full URL e.g. `https://zion4commerce.com` |
| `RESEND_API_KEY` | Recommended | For contact form emails |
| `RESEND_FROM_EMAIL` | Recommended | Sending address |
| `RESEND_TO_EMAIL` | Recommended | Receiving address |

---

## 8. Development Workflow

```bash
# Start dev server (Next.js + hot reload)
npm run dev

# Type checking
npm run typecheck

# Lint
npm run lint

# Production build (test before deploying)
npm run build
npm run start
```

---

## 9. Deployment to Vercel

### Option A — Vercel CLI (recommended)

```bash
npm install -g vercel
vercel

# Follow prompts:
# - Link to existing project? No → create new
# - Project name: zion4commerce
# - Framework: Next.js (auto-detected)
```

### Option B — Vercel Dashboard

1. Push code to GitHub/GitLab/Bitbucket
2. Go to **https://vercel.com/new**
3. Import your repository
4. Vercel auto-detects Next.js — click **Deploy**

### Add Environment Variables to Vercel

In Vercel dashboard → **Settings** → **Environment Variables**:
- Add all variables from your `.env.local`
- Select **Production**, **Preview**, and **Development** environments

### Add Vercel domain to Sanity CORS

In Sanity → **API** → **CORS Origins** → Add your Vercel URL:
```
https://zion4commerce.vercel.app
https://zion4commerce.com    ← your custom domain
```

### Deploy Sanity Studio (optional)

The Studio is embedded at `/studio` — it deploys automatically with your site.

For a standalone studio URL (sanity.io/your-project):
```bash
cd sanity
npx sanity deploy
```

---

## 10. CMS User Guide (Non-Technical)

### How to edit the home page

1. Visit `https://yoursite.com/studio`
2. Log in with your Sanity account
3. Click **🏠 Home Page** in the left menu
4. Click any section to expand it (Hero, Stats, Services, CTA, etc.)
5. Edit the text — changes auto-save as drafts
6. Click **Publish** in the top-right to push changes live

### How to add a blog post

1. Click **📝 Blog Posts** → **+ New Blog Post**
2. Fill in:
   - **Title** — your post headline
   - **Slug** — auto-generated, can be edited
   - **Excerpt** — 1-2 sentence summary (shown in listings)
   - **Body** — full rich text content (bold, links, images, headings)
   - **Cover Image** — drag & drop from your computer
   - **Author** — select from team members
   - **Published At** — defaults to today
   - **Categories** — tag for filtering
3. Click **Publish**

### How to add a team member

1. Click **👥 Team Members** → **+ New Team Member**
2. Fill in name, role, bio, LinkedIn, and upload photo
3. Set **Display Order** (1 = first)
4. Check **Show on Home Page** to feature them
5. Click **Publish**

### How to upload images

- Drag & drop anywhere an image field appears
- Sanity automatically optimises, crops, and CDN-delivers all images
- Always fill in the **Alt text** field for accessibility

### Publishing vs Drafts

- All changes are **drafts** until you click **Publish**
- You can save drafts and come back later
- Clicking **Publish** pushes the change live within ~5 seconds (via webhook)

---

## 11. Adding New Pages

### Step 1 — Create the page file

```
src/app/your-page/page.tsx
```

### Step 2 — Add to Sanity (if CMS-driven)

In `sanity/schemas/`, create a new schema file and register it in `sanity/schemas/index.ts`.

### Step 3 — Add to navigation

Edit `src/components/layout/Navbar.tsx` → add to the `navLinks` array.

### Step 4 — Add to sitemap

`src/app/sitemap.ts` → add a static entry to the `staticPages` array.

---

## 12. Email Setup (Contact Form)

The contact form currently logs submissions to the server console.
To enable real email delivery:

### Using Resend (recommended)

1. Sign up at **https://resend.com** (free tier: 3,000 emails/month)
2. Add your domain or use their test domain
3. Get your API key → add to `.env.local`:
   ```env
   RESEND_API_KEY=re_...
   ```
4. In `src/app/api/contact/route.ts`, uncomment the **Option A: Resend** block
5. Update the `from`, `to`, and `subject` fields as needed

---

## 13. Performance & SEO

### Built-in optimisations

| Feature | Implementation |
|---|---|
| Image optimisation | `next/image` with automatic WebP/AVIF |
| Font loading | `next/font` with `display: swap` |
| Code splitting | Automatic per-page by Next.js |
| Static generation | All pages pre-rendered at build time |
| ISR (Incremental Static Regeneration) | 1-hour revalidation + on-demand via webhook |
| Lazy loading | Images load only when in viewport |
| Scroll animations | CSS-only intersection observer (no JS overhead) |

### SEO features

- Auto-generated `sitemap.xml` at `/sitemap.xml`
- Auto-generated `robots.txt` at `/robots.txt`
- JSON-LD structured data (Organization + Article schemas)
- Open Graph + Twitter Card meta tags on every page
- Dynamic `<title>` and `<description>` per page
- Semantic HTML (`<article>`, `<nav>`, `<main>`, `<aside>`, etc.)
- `aria-label` on interactive elements

### Lighthouse targets

| Metric | Target |
|---|---|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

---

## 14. Customisation Guide

### Brand colors

Edit `tailwind.config.ts` → `theme.extend.colors.zion`:

```ts
zion: {
  navy:  '#0D1B2A',  // Main dark background
  blue:  '#003E78',  // Primary buttons, headings
  aqua:  '#2BA6DA',  // Accent / links
  green: '#1EC28B',  // CTAs (book consultation buttons)
  // ...
}
```

Then update `src/styles/globals.css` CSS variables to match.

### Fonts

Edit `src/app/layout.tsx` → swap the Google Font imports.
Update `tailwind.config.ts` → `fontFamily` keys.
Update `src/styles/globals.css` → CSS variables.

### Navigation links

Edit `src/components/layout/Navbar.tsx` → `navLinks` array.

### Footer links

Edit `src/components/layout/Footer.tsx` → `footerLinks` object.

### Services (hardcoded fallback)

Edit `src/app/services/page.tsx` → `defaultServices` array.
(These only show when Sanity has no services — replace with CMS data once set up.)

---

## Support

- **Sanity docs:** https://www.sanity.io/docs
- **Next.js docs:** https://nextjs.org/docs
- **Tailwind docs:** https://tailwindcss.com/docs
- **Resend docs:** https://resend.com/docs
- **Vercel docs:** https://vercel.com/docs
