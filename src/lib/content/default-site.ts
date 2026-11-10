import { IMAGES, SECTION_MAP } from "./sections";
import type { PageContent, SectionInstance, Settings, SiteContent } from "./schema";

let counter = 0;
function section(type: string, overrides: Settings = {}): SectionInstance {
  const def = SECTION_MAP[type];
  if (!def) throw new Error(`Unknown section type ${type}`);
  counter += 1;
  return { id: `${type}-${counter}`, type, settings: structuredClone({ ...def.defaults, ...overrides }) };
}

const home: PageContent = {
  slug: "home",
  title: "Home",
  seo: {
    title: "Amazon and TikTok Shop growth, on profit",
    description:
      "Zion4Commerce runs Amazon and TikTok Shop for brands: lower TACoS, higher organic rank, healthier margins. Amazon US, UK, CA, DE, UAE and TikTok Shop US.",
  },
  sections: [
    section("hero"),
    section("stats"),
    section("pill_strip"),
    section("feature_grid"),
    section("split"),
    section("steps"),
    section("tacos_calculator"),
    section("case_studies"),
    section("split", {
      eyebrow: "Global marketplaces",
      heading: "One partner for every marketplace you sell on",
      text: "We run Amazon in the US, UK, Canada, Germany and the UAE, and TikTok Shop in the US, from listings and ads to compliance and logistics. Brands going global keep one team and one set of numbers.",
      bullets: ["Localised listings and A+ content", "Marketplace compliance and logistics", "One report across every marketplace"],
      link: { label: "Talk to us about expansion", href: "/contact" },
      visual: "image",
      image: { src: IMAGES.port, alt: "Container port at dawn with cranes loading a cargo ship" },
      flip: true,
      field: "paper",
    }),
    section("faq"),
    section("cta_band"),
  ],
};

const about: PageContent = {
  slug: "about",
  title: "About",
  seo: {
    title: "About",
    description: "Zion4Commerce is a profit-first Amazon and TikTok Shop growth agency led by Arjun S, with 13+ years in eCommerce.",
  },
  sections: [
    section("page_intro", {
      eyebrow: "About us",
      title: "A marketplace growth partner that answers to your margin",
      sentence: "We grow brands on Amazon and TikTok Shop, and we judge every month by TACoS and contribution margin, not by revenue alone.",
    }),
    section("split", {
      eyebrow: "Who we are",
      heading: "Led by operators, not account managers",
      text: "Zion4Commerce is led by Arjun S, who spent 13+ years running eCommerce for brands, most recently as VP eCommerce at Ergode and Director eCommerce at California Design Den. We work with brands going global, brands new to marketplaces, and brands already on Amazon whose growth has stalled.",
      bullets: ["13+ years running eCommerce for brands", "Amazon US, UK, CA, DE, UAE and TikTok Shop US", "Every account run on one rule: growth has to show up in the margin"],
      link: { label: "Meet the team", href: "/team" },
      visual: "image",
      image: { src: IMAGES.summit, alt: "View from a summit over layered red canyon ridges and a river valley" },
      flip: false,
      field: "paper",
    }),
    section("stats", { field: "mist" }),
    section("split"),
    section("steps"),
    section("cta_band"),
  ],
};

const team: PageContent = {
  slug: "team",
  title: "Team",
  seo: { title: "Team", description: "The Zion4Commerce team: performance marketing, partner success, social commerce and marketplace operations." },
  sections: [
    section("page_intro", {
      eyebrow: "Team",
      title: "The people who run your account",
      sentence: "Marketplace operators, ad specialists and content leads who run your Amazon and TikTok Shop accounts.",
    }),
    section("team_grid", { eyebrow: "", heading: "", intro: "" }),
    section("cta_band"),
  ],
};

const contact: PageContent = {
  slug: "contact",
  title: "Contact",
  seo: { title: "Get a free audit", description: "Request a free Amazon and TikTok Shop audit from Zion4Commerce. We reply within 24 hours." },
  sections: [section("contact_form")],
};

const privacy: PageContent = {
  slug: "privacy",
  title: "Privacy policy",
  seo: { title: "Privacy policy", description: "How Zion4Commerce collects and uses personal data." },
  sections: [
    section("rich_text", {
      heading: "Privacy policy",
      body: `Draft for legal review. Last updated: November 2026.

## What we collect
When you request an audit we collect your name, email address, and anything else you choose to give us: company, phone number, website, country, ad spend range, the services you are interested in and your message.

## Why we collect it
To reply to your request, prepare your audit and talk to you about working together. We do not sell your data and we do not use it for anything else.

## Where it is stored
Requests are stored in our database and sent by email to our team. Our providers process data on our behalf under contract.

## How long we keep it
We keep audit requests for up to 24 months, then delete them, unless you become a client.

## Your rights
You can ask to see, correct or delete your data at any time. If you are in the UK or EU you also have the right to object and to complain to your data protection authority.

## Contact
Email zion4commerce@gmail.com about anything in this policy.`,
    }),
  ],
};

const terms: PageContent = {
  slug: "terms",
  title: "Terms",
  seo: { title: "Terms of use", description: "Terms of use for the Zion4Commerce website." },
  sections: [
    section("rich_text", {
      heading: "Terms of use",
      body: `Draft for legal review. Last updated: November 2026.

## Using this site
This website describes Zion4Commerce's services. You may read and share its pages. You may not copy its content for commercial use without permission.

## Results
Client results on this site are real and specific to each client. They are not a promise of the same results for your brand.

## Trademarks
Amazon and TikTok Shop are trademarks of their owners. Their names are used only to describe the marketplaces we work on.

## Contact
Email zion4commerce@gmail.com with any questions.`,
    }),
  ],
};

export const DEFAULT_SITE: SiteContent = {
  settings: {
    siteName: "Zion4Commerce",
    logo: { src: "/brand/zion4commerce-logo.png", alt: "Zion4Commerce" },
    nav: [
      { label: "Services", href: "/#services" },
      { label: "Results", href: "/#results" },
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
    ],
    headerAction: { label: "Get a free audit", href: "/contact" },
    colors: {
      paper: "#ffffff",
      mist: "#f3f7fa",
      steel: "#9cbccd",
      navy: "#002845",
      night: "#001a2e",
      accent: "#0e6ba8",
      ink: "#0f1b2a",
    },
    contact: {
      email: "zion4commerce@gmail.com",
      leadTo: "arjun@zion4commerce.com",
      leadCc: "aditya@zion4commerce.com",
    },
    footer: {
      tagline: "Amazon and TikTok Shop growth, judged by margin.",
      columns: [
        { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Team", href: "/team" }, { label: "Results", href: "/#results" }] },
        { title: "Services", links: [{ label: "Amazon advertising", href: "/#services" }, { label: "TikTok Shop", href: "/#services" }, { label: "Marketplace expansion", href: "/#services" }] },
        { title: "Get started", links: [{ label: "Free audit", href: "/contact" }, { label: "FAQ", href: "/#questions" }] },
        { title: "Legal", links: [{ label: "Privacy policy", href: "/privacy" }, { label: "Terms", href: "/terms" }] },
      ],
      copyright: "© 2026 Zion4Commerce. All rights reserved.",
    },
    seo: {
      titleSuffix: " · Zion4Commerce",
      defaultDescription: "Zion4Commerce grows Amazon and TikTok Shop brands on profit: lower TACoS, higher organic rank, healthier margins.",
    },
  },
  pages: [home, about, team, contact, privacy, terms],
};
