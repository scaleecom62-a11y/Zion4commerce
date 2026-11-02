import { SECTION_MAP } from "./sections";
import type { PageContent, SectionInstance, Settings, SiteContent } from "./schema";

let counter = 0;
function section(type: string, overrides: Settings = {}): SectionInstance {
  const def = SECTION_MAP[type];
  if (!def) throw new Error(`Unknown section type ${type}`);
  counter += 1;
  return {
    id: `${type}-${counter}`,
    type,
    settings: structuredClone({ ...def.defaults, ...overrides }),
  };
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
    section("hero_waterline"),
    section("printed_list"),
    section("verb_panels"),
    section("two_words"),
    section("tacos_calculator"),
    section("service_table"),
    section("case_folders"),
    section("big_figure"),
    section("faq_bands"),
    section("cta_choice"),
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
      title: "Profit first",
      sentence:
        "We grow brands on Amazon and TikTok Shop, and we judge every month by TACoS and contribution margin, not by revenue alone.",
      field: "steel",
    }),
    section("about_facts"),
    section("printed_list", {
      heading: "Where we sell for you",
      image: {
        src: "https://d8j0ntlcm91z4.cloudfront.net/user_38cFHiiAnnFDOVtYYDJ4B0v5TyJ/hf_20261102_084335_296d5730-592a-4b34-8a66-4ac87900c400.png",
        alt: "Container port at dawn with cranes loading a cargo ship",
      },
      field: "navy",
    }),
    section("two_words", {
      heading: "Two channels, one system",
      paragraph:
        "TikTok Shop creates demand. Amazon catches it: shoppers who saw you on TikTok search for you on Amazon, and that lifts your organic rank. We call it the Halo Effect, and it is why we run both channels together.",
      leftWord: "TikTok",
      rightWord: "Amazon",
      strikeLeft: false,
      field: "mist",
    }),
    section("verb_panels"),
    section("cta_choice"),
  ],
};

const team: PageContent = {
  slug: "team",
  title: "Team",
  seo: {
    title: "Team",
    description: "The Zion4Commerce team: performance marketing, partner success, social commerce and marketplace operations.",
  },
  sections: [
    section("page_intro", {
      title: "The team",
      sentence: "Marketplace operators, ad specialists and content leads who run your Amazon and TikTok Shop accounts.",
      field: "mist",
    }),
    section("team_grid", { heading: "Who runs your account", intro: "" }),
    section("cta_choice"),
  ],
};

const contact: PageContent = {
  slug: "contact",
  title: "Contact",
  seo: {
    title: "Get a free audit",
    description: "Request a free Amazon and TikTok Shop audit from Zion4Commerce. We reply within 24 hours.",
  },
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
    headerAction: { label: "Free audit", href: "/contact" },
    colors: {
      paper: "#f5f7f8",
      mist: "#dce8ef",
      steel: "#9cbccd",
      navy: "#002845",
      night: "#001a2e",
      accent: "#002845",
      ink: "#0b1620",
    },
    contact: {
      email: "zion4commerce@gmail.com",
      leadTo: "arjun@zion4commerce.com",
      leadCc: "aditya@zion4commerce.com",
    },
    footer: {
      tagline: "Amazon and TikTok Shop growth, judged by margin.",
      columns: [
        {
          title: "Site",
          links: [
            { label: "Services", href: "/#services" },
            { label: "Results", href: "/#results" },
            { label: "About", href: "/about" },
            { label: "Team", href: "/team" },
          ],
        },
        {
          title: "Start",
          links: [
            { label: "Free audit", href: "/contact" },
            { label: "Questions", href: "/#questions" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Privacy policy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
          ],
        },
      ],
      copyright: "© 2026 Zion4Commerce",
    },
    seo: {
      titleSuffix: " · Zion4Commerce",
      defaultDescription:
        "Zion4Commerce grows Amazon and TikTok Shop brands on profit: lower TACoS, higher organic rank, healthier margins.",
    },
  },
  pages: [home, about, team, contact, privacy, terms],
};
