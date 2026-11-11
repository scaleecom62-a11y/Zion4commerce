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
    section("case_studies"),
    section("split", {
      eyebrow: "Global marketplaces",
      heading: "One partner for every marketplace you sell on",
      text: "We run Amazon in the US, UK, Canada, Germany and the UAE, and TikTok Shop in the US, from listings and ads to compliance and logistics. Brands going global keep one team and one set of numbers.",
      bullets: ["Localised listings and A+ content", "Marketplace compliance and logistics", "One report across every marketplace"],
      link: { label: "Talk to us about expansion", href: "/contact" },
      visual: "image",
      image: { src: IMAGES.fulfilment, alt: "Ecommerce fulfilment centre with parcels moving along a conveyor between stocked shelves" },
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
      link: { label: "Get a free audit", href: "/contact" },
      visual: "image",
      image: { src: IMAGES.teamReview, alt: "Growth team reviewing a marketplace sales dashboard on a wall screen" },
      flip: false,
      field: "paper",
    }),
    section("stats", { field: "mist" }),
    section("split"),
    section("steps"),
    section("cta_band"),
  ],
};

const zion4tiktok: PageContent = {
  slug: "zion4tiktok",
  title: "Zion4TikTok app",
  seo: {
    title: "Zion4TikTok: creator collaborations for TikTok Shop",
    description:
      "Zion4TikTok is a TikTok Shop app for sellers in the UK and US. Search creators, send collaboration invites, create affiliate links and track the sales each creator drives.",
  },
  sections: [
    section("page_intro", {
      eyebrow: "TikTok Shop app",
      title: "Zion4TikTok: run creator collaborations from one place",
      sentence:
        "Zion4TikTok is a TikTok Shop app for sellers in the UK and US. Find creators who fit your products, invite them to collaborate, share affiliate links and see the sales each creator drives.",
      field: "mist",
    }),
    section("feature_grid", {
      eyebrow: "Features",
      heading: "What Zion4TikTok does",
      intro: "Four tools that take a creator collaboration from the first search to the final sale.",
      items: [
        { icon: "search", title: "Creator search", text: "Search TikTok creators by category, audience size and performance, and build a shortlist of the ones that fit your products.", bullets: [] },
        { icon: "send", title: "Collaboration invites", text: "Send collaboration invitations to creators with the products and commission on offer, then track who accepts.", bullets: [] },
        { icon: "link", title: "Affiliate links", text: "Create affiliate links for your products so creators can promote them and earn commission on every sale.", bullets: [] },
        { icon: "chart", title: "Creator sales", text: "See the orders and sales each creator drives, so you know which partnerships to grow and which to stop.", bullets: [] },
      ],
      field: "paper",
    }),
    section("steps", {
      eyebrow: "How it works",
      heading: "From connection to creator sales in four steps",
      intro: "Zion4TikTok works inside your TikTok Shop seller account. You stay in control of every invitation and link.",
      items: [
        { icon: "shop", title: "Connect your shop", text: "Install Zion4TikTok from TikTok Shop Seller Center and authorise it for your UK or US shop." },
        { icon: "search", title: "Find creators", text: "Search creators and shortlist the ones whose audience matches your products." },
        { icon: "send", title: "Invite and share links", text: "Send collaboration invites and give each creator an affiliate link for your products." },
        { icon: "chart", title: "Track sales", text: "Follow the orders and sales each creator drives and grow the partnerships that pay." },
      ],
      field: "mist",
    }),
    section("split", {
      eyebrow: "Who it is for",
      heading: "Built for TikTok Shop sellers in the UK and US",
      text: "Zion4TikTok is for brands that sell on TikTok Shop and want to grow sales through creators. It is built and supported by Zion4Commerce, a TikTok Shop and Amazon growth agency.",
      bullets: ["TikTok Shop UK and TikTok Shop US sellers", "Brands that run creator outreach themselves", "Teams that want sales reported by creator"],
      link: { label: "Contact us about Zion4TikTok", href: "/contact" },
      visual: "image",
      image: { src: IMAGES.workspace, alt: "Laptop showing a sales dashboard next to a phone showing a product page and product boxes" },
      flip: false,
      field: "paper",
    }),
    section("faq", {
      eyebrow: "FAQ",
      heading: "Questions about Zion4TikTok",
      items: [
        { q: "Who can use Zion4TikTok?", a: "Sellers with an active TikTok Shop account in the UK or the US." },
        { q: "How do I connect my shop?", a: "Install Zion4TikTok from TikTok Shop Seller Center and approve the permissions it asks for. You can remove the app at any time from Seller Center, and it then stops accessing your shop." },
        { q: "What data does Zion4TikTok use?", a: "Only the data TikTok Shop shares with the app after you authorise it: your shop and product details, creator profiles, collaboration invitations, affiliate links and the orders made through them. We use it only to run the app for your shop. Our privacy policy has the details." },
        { q: "Who makes Zion4TikTok?", a: "Zion4Commerce Inc, 8 The Green, Ste B, Dover, DE 19901, USA. We are a TikTok Shop and Amazon growth agency." },
        { q: "How do I get help?", a: "Email zion4commerce@gmail.com. We reply within 24 hours." },
      ],
      field: "paper",
    }),
    section("cta_band", {
      heading: "Questions about Zion4TikTok?",
      text: "Email us and we will help you set it up for your shop.",
      primary: { label: "Email support", href: "mailto:zion4commerce@gmail.com" },
      secondary: { label: "Privacy policy", href: "/privacy" },
    }),
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
  seo: { title: "Privacy policy", description: "How Zion4Commerce and the Zion4TikTok app collect and use data." },
  sections: [
    section("rich_text", {
      heading: "Privacy policy",
      body: `Draft for legal review. Last updated: November 2026.

## Who we are
Zion4Commerce Inc, 8 The Green, Ste B, Dover, DE 19901, USA. This policy covers this website and the Zion4TikTok app for TikTok Shop.

## What we collect
When you request an audit we collect your name, email address, and anything else you choose to give us: company, phone number, website, country, ad spend range, the services you are interested in and your message.

## Why we collect it
To reply to your request, prepare your audit and talk to you about working together. We do not sell your data and we do not use it for anything else.

## Where it is stored
Requests are stored in our database and sent by email to our team. Our providers process data on our behalf under contract.

## How long we keep it
We keep audit requests for up to 24 months, then delete them, unless you become a client.

## Zion4TikTok app: what it accesses
When a seller installs Zion4TikTok and authorises it in TikTok Shop, TikTok Shop shares the data covered by the permissions the seller approves. This includes the shop name and ID, the product list, creator profiles and performance figures, collaboration invitations, affiliate links, and orders made through those links. The app does not access data the seller has not authorised.

## Zion4TikTok app: how we use it
We use this data only to run the app for that seller: searching creators, sending and tracking collaboration invitations, creating affiliate links and reporting sales by creator. We do not sell it, we do not use it for advertising, and we do not share it with other sellers.

## Zion4TikTok app: storage and deletion
App data is stored in our database and kept while the shop stays connected. When a seller removes the app in TikTok Shop Seller Center, the app stops accessing the shop. We delete that shop's data within 30 days of removal, or sooner if the seller asks us by email.

## Your rights
You can ask to see, correct or delete your data at any time. If you are in the UK or EU you also have the right to object and to complain to your data protection authority.

## Contact
Email zion4commerce@gmail.com about anything in this policy, or write to Zion4Commerce Inc, 8 The Green, Ste B, Dover, DE 19901, USA.`,
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

## Company
This website is run by Zion4Commerce Inc, 8 The Green, Ste B, Dover, DE 19901, USA.

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
      { label: "Zion4TikTok", href: "/zion4tiktok" },
      { label: "About", href: "/about" },
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
      address: "Zion4Commerce Inc\n8 The Green, Ste B\nDover, DE 19901, USA",
      leadTo: "arjun@zion4commerce.com",
      leadCc: "aditya@zion4commerce.com",
    },
    footer: {
      tagline: "",
      columns: [
        { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Results", href: "/#results" }, { label: "Contact", href: "/contact" }] },
        { title: "Services", links: [{ label: "Amazon advertising", href: "/#services" }, { label: "TikTok Shop", href: "/#services" }, { label: "Marketplace expansion", href: "/#services" }, { label: "Zion4TikTok app", href: "/zion4tiktok" }] },
        { title: "Get started", links: [{ label: "Free audit", href: "/contact" }, { label: "FAQ", href: "/#questions" }] },
        { title: "Legal", links: [{ label: "Privacy policy", href: "/privacy" }, { label: "Terms", href: "/terms" }] },
      ],
      copyright: "© 2026 Zion4Commerce Inc. All rights reserved.",
    },
    seo: {
      titleSuffix: " · Zion4Commerce",
      defaultDescription: "Zion4Commerce grows Amazon and TikTok Shop brands on profit: lower TACoS, higher organic rank, healthier margins.",
    },
  },
  pages: [home, about, zion4tiktok, contact, privacy, terms],
};
