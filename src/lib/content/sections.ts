import { FIELD_COLOR_OPTIONS, type Field, type SectionDefinition } from "./schema";

const color = (key = "field", label = "Background"): Field => ({ key, label, type: "color" });
const image = (key = "image", label = "Image"): Field => ({ key, label, type: "image" });

export const SECTION_DEFINITIONS: SectionDefinition[] = [
  {
    type: "hero_waterline",
    label: "Hero: waterline headline",
    description: "Two-line headline: line 1 above the waterline, line 2 below it, on two colour fields.",
    fields: [
      { key: "line1", label: "Headline line 1", type: "text", maxLength: 12, help: "Short. One or two words." },
      { key: "line2", label: "Headline line 2", type: "text", maxLength: 12 },
      { key: "sentence", label: "Supporting sentence", type: "textarea", rows: 3 },
      { key: "action", label: "Button", type: "link" },
      color("lower", "Lower field colour"),
    ],
    defaults: {
      line1: "Grow on",
      line2: "profit",
      sentence:
        "Zion4Commerce runs Amazon and TikTok Shop for brands that want growth they can keep: lower TACoS, higher organic rank, healthier margins.",
      action: { label: "Get a free audit", href: "/contact" },
      lower: "orange",
    },
  },
  {
    type: "printed_list",
    label: "Printed list card",
    description: "A tilted paper card listing names, cut by the section's bottom edge.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "names", label: "Names", type: "strings", itemLabel: "Name" },
      image("image", "Tipped-in photo (optional)"),
      color(),
    ],
    defaults: {
      heading: "Where we sell for you",
      names: [
        "Amazon.com",
        "Amazon.co.uk",
        "Amazon.ca",
        "Amazon.de",
        "Amazon.ae",
        "TikTok Shop US",
        "15+ countries in all",
      ],
      image: { src: "https://d8j0ntlcm91z4.cloudfront.net/user_38cFHiiAnnFDOVtYYDJ4B0v5TyJ/hf_20261102_084334_1d830701-f938-41b4-ab2f-9ea78272c675.png", alt: "Shipping parcels with labels stacked on a packing table" },
      field: "sky",
    },
  },
  {
    type: "verb_panels",
    label: "One verb at a time",
    description: "Full-screen panels. Each holds one verb that stays centred while its picture passes.",
    fields: [
      {
        key: "panels",
        label: "Panels",
        type: "list",
        itemLabel: "Panel",
        titleKey: "verb",
        min: 2,
        max: 5,
        fields: [
          { key: "verb", label: "Verb", type: "text", maxLength: 8 },
          { key: "sentence", label: "Sentence", type: "textarea", rows: 3 },
          image(),
          color("field", "Colour behind the picture"),
        ],
      },
    ],
    defaults: {
      panels: [
        {
          verb: "Audit",
          sentence:
            "We go through your ads, listings, pricing, competitors and unit economics, then show you where margin leaks and where growth is.",
          image: { src: "https://d8j0ntlcm91z4.cloudfront.net/user_38cFHiiAnnFDOVtYYDJ4B0v5TyJ/hf_20261102_084334_0a783c05-3ec6-4783-9fca-a3d651044dc5.png", alt: "Foot of a red sandstone canyon wall in morning light, a trail starting at its base" },
          field: "night",
        },
        {
          verb: "Fix",
          sentence:
            "We rebuild listings, A+ content and the PPC structure, and launch TikTok Shop next to Amazon so each channel feeds the other.",
          image: { src: "https://d8j0ntlcm91z4.cloudfront.net/user_38cFHiiAnnFDOVtYYDJ4B0v5TyJ/hf_20261102_084335_373d6e88-c278-4cee-8836-ec64151b6e6c.png", alt: "A narrow sandstone ridge trail with a safety chain, climbing between two canyon drops" },
          field: "sky",
        },
        {
          verb: "Scale",
          sentence:
            "As organic rank climbs and TACoS falls, we open the next marketplace: the UK, Canada, Germany or the UAE.",
          image: { src: "https://d8j0ntlcm91z4.cloudfront.net/user_38cFHiiAnnFDOVtYYDJ4B0v5TyJ/hf_20261102_084334_5271a8e1-3d1f-4698-9022-87a0f64209bf.png", alt: "View from a summit over layered red canyon ridges and a green river valley" },
          field: "lime",
        },
      ],
    },
  },
  {
    type: "two_words",
    label: "Two words compared",
    description: "A heading, a paragraph, then two giant words side by side.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "paragraph", label: "Paragraph", type: "textarea", rows: 4 },
      { key: "leftWord", label: "Left word", type: "text", maxLength: 9 },
      { key: "rightWord", label: "Right word", type: "text", maxLength: 9 },
      { key: "strikeLeft", label: "Strike through the left word", type: "toggle" },
      color(),
    ],
    defaults: {
      heading: "What we report",
      paragraph:
        "Most agencies report revenue. Revenue can rise while you lose money on every order, so we report TACoS and contribution margin: the two numbers that show whether growth pays for itself.",
      leftWord: "Revenue",
      rightWord: "Margin",
      strikeLeft: true,
      field: "paper",
    },
  },
  {
    type: "tacos_calculator",
    label: "TACoS calculator",
    description: "Visitors enter their sales and ad spend and see their TACoS and the money a lower TACoS frees up.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "intro", label: "Intro", type: "textarea", rows: 3 },
      {
        key: "currency",
        label: "Currency",
        type: "select",
        options: [
          { value: "USD", label: "US dollar" },
          { value: "GBP", label: "Pound" },
          { value: "EUR", label: "Euro" },
          { value: "INR", label: "Rupee" },
          { value: "AED", label: "Dirham" },
        ],
      },
      { key: "sales", label: "Default monthly sales", type: "number", min: 0, step: 1000 },
      { key: "spend", label: "Default monthly ad spend", type: "number", min: 0, step: 500 },
      { key: "target", label: "Default target TACoS (%)", type: "number", min: 1, max: 60, step: 1 },
      { key: "note", label: "Note under the result", type: "textarea", rows: 2 },
      color(),
    ],
    defaults: {
      heading: "Your TACoS, in money",
      intro:
        "TACoS is ad spend divided by total sales, paid and organic. Enter your monthly numbers to see where you stand and what a lower TACoS is worth.",
      currency: "USD",
      sales: 120000,
      spend: 30000,
      target: 15,
      note: "This is arithmetic on your own numbers, not a forecast. The audit tells you what is realistic for your category.",
      field: "lime",
    },
  },
  {
    type: "service_table",
    label: "Services table",
    description: "Every service on one line, at one type size.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "colService", label: "Column 1 title", type: "text" },
      { key: "colWhere", label: "Column 2 title", type: "text" },
      { key: "colIncludes", label: "Column 3 title", type: "text" },
      { key: "colMeasure", label: "Column 4 title", type: "text" },
      {
        key: "rows",
        label: "Services",
        type: "list",
        itemLabel: "Service",
        titleKey: "service",
        fields: [
          { key: "service", label: "Service", type: "text" },
          { key: "where", label: "Where", type: "text" },
          { key: "includes", label: "What it includes", type: "text" },
          { key: "measure", label: "Judged by", type: "text" },
        ],
      },
      color(),
    ],
    defaults: {
      heading: "What we run",
      colService: "Service",
      colWhere: "Where",
      colIncludes: "What it includes",
      colMeasure: "Judged by",
      rows: [
        { service: "Amazon advertising", where: "Amazon", includes: "Sponsored Products, Brands, Display, bids, budgets", measure: "TACoS" },
        { service: "TikTok Shop", where: "TikTok Shop US", includes: "Shop setup, listings, ads, Halo Effect", measure: "Amazon organic rank" },
        { service: "Listing optimisation", where: "Amazon, TikTok Shop", includes: "Titles, bullets, images, keywords", measure: "Conversion rate" },
        { service: "A+ content and Brand Store", where: "Amazon", includes: "A+ modules, Brand Store design", measure: "Conversion rate" },
        { service: "Marketplace expansion", where: "UK, CA, DE, UAE", includes: "Setup, localisation, compliance, logistics", measure: "New-market sales" },
        { service: "Pricing and margin", where: "All channels", includes: "Pricing strategy, margin analysis", measure: "Contribution margin" },
        { service: "Profit tracking", where: "All channels", includes: "Unit economics, profitability reporting", measure: "Contribution margin" },
        { service: "Attribution and budgets", where: "All channels", includes: "Attribution modelling, budget allocation", measure: "TACoS" },
        { service: "Inventory management", where: "Amazon", includes: "Stock planning, replenishment", measure: "In-stock rate" },
        { service: "Reviews", where: "Amazon", includes: "Review and rating management", measure: "Star rating" },
        { service: "Retention", where: "Amazon, TikTok Shop", includes: "Retention campaigns", measure: "Repeat orders" },
        { service: "Account management", where: "All channels", includes: "Account health, weekly reporting", measure: "Account health" },
      ],
      field: "orange",
    },
  },
  {
    type: "case_folders",
    label: "Client results (folders)",
    description: "Each result is a coloured folder with a tab. Folders pile up as the page scrolls.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      {
        key: "cases",
        label: "Results",
        type: "list",
        itemLabel: "Result",
        titleKey: "name",
        min: 1,
        max: 6,
        fields: [
          { key: "name", label: "Client or tab name", type: "text" },
          { key: "category", label: "Category", type: "text" },
          { key: "headline", label: "Headline result", type: "text" },
          { key: "text", label: "Description", type: "textarea", rows: 4 },
          { key: "quote", label: "Client quote (optional)", type: "textarea", rows: 3 },
          {
            key: "metrics",
            label: "Figures",
            type: "list",
            itemLabel: "Figure",
            titleKey: "label",
            max: 4,
            fields: [
              { key: "label", label: "Label", type: "text" },
              { key: "value", label: "Value", type: "text" },
            ],
          },
          image("image", "Logo or picture (optional)"),
          color(),
        ],
      },
    ],
    defaults: {
      heading: "Client results",
      cases: [
        {
          name: "Maison d'Hermine",
          category: "Designer table and kitchen linen · Amazon global, TikTok Shop US",
          headline: "TACoS down within 90 days",
          text: "We rebuilt the ad structure across Amazon's global marketplaces and launched TikTok Shop in the US. TACoS fell within 90 days while ROAS grew week on week, and organic rank kept climbing.",
          quote:
            "Working with Zion4Commerce transformed our Amazon business. TACoS dropped dramatically while organic rank kept climbing.",
          metrics: [
            { label: "TACoS", value: "Down in 90 days" },
            { label: "ROAS", value: "Up every week" },
          ],
          image: { src: "/brand/clients/maison-dhermine.jpeg", alt: "Maison d'Hermine logo" },
          field: "sky",
        },
        {
          name: "Skincare brand",
          category: "Beauty and personal care · Amazon US",
          headline: "$50K to $192K a month",
          text: "In six months, a premium skincare brand grew monthly Amazon revenue by 285% through PPC restructuring and listing optimisation, with TACoS held at 12%.",
          quote: "",
          metrics: [
            { label: "Revenue", value: "+285%" },
            { label: "ROAS", value: "4.8x" },
            { label: "TACoS", value: "12%" },
            { label: "Conversion", value: "18.2%" },
          ],
          image: { src: "", alt: "" },
          field: "lime",
        },
        {
          name: "Supplement brand",
          category: "Health and wellness · Amazon",
          headline: "Profit margin up 65%",
          text: "We reworked pricing and the supply chain to fix unit economics while holding market share. Sales grew alongside margin.",
          quote: "",
          metrics: [
            { label: "Margin", value: "+65%" },
            { label: "Sales", value: "+180%" },
            { label: "Rating", value: "4.8 of 5" },
          ],
          image: { src: "", alt: "" },
          field: "orange",
        },
      ],
    },
  },
  {
    type: "big_figure",
    label: "One big figure",
    description: "One number owns the screen, with a caption saying what was measured.",
    fields: [
      { key: "claim", label: "Claim (heading)", type: "text" },
      { key: "figure", label: "Figure", type: "text", maxLength: 6 },
      { key: "unit", label: "Unit", type: "text", maxLength: 4 },
      { key: "caption", label: "Caption", type: "textarea", rows: 3 },
      color(),
    ],
    defaults: {
      claim: "Revenue we manage",
      figure: "$50M",
      unit: "+",
      caption: "Revenue managed across 50+ brands on Amazon and TikTok Shop, in 15+ countries, to date.",
      field: "night",
    },
  },
  {
    type: "about_facts",
    label: "About: facts and paragraph",
    description: "Key facts on the left, a wide paragraph on the right, then two lists.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "paragraph", label: "Paragraph", type: "textarea", rows: 6 },
      {
        key: "facts",
        label: "Facts",
        type: "list",
        itemLabel: "Fact",
        titleKey: "label",
        max: 4,
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "value", label: "Value", type: "text" },
        ],
      },
      { key: "listsTitle", label: "Record title", type: "text" },
      {
        key: "lists",
        label: "Record lists",
        type: "list",
        itemLabel: "List",
        titleKey: "title",
        max: 2,
        fields: [
          { key: "title", label: "List title", type: "text" },
          {
            key: "items",
            label: "Lines",
            type: "list",
            itemLabel: "Line",
            titleKey: "name",
            fields: [
              { key: "name", label: "Name", type: "text" },
              { key: "meta", label: "Detail", type: "text" },
            ],
          },
        ],
      },
      { key: "link", label: "Link", type: "link" },
      color(),
    ],
    defaults: {
      heading: "About Zion4Commerce",
      paragraph:
        "Zion4Commerce is led by Arjun S, who spent 13+ years running eCommerce for brands, most recently as VP eCommerce at Ergode and Director eCommerce at California Design Den. We take on brands going global, brands new to marketplaces, and brands already on Amazon whose growth has stalled or stopped paying. Every account is run on one rule: growth has to show up in the margin.",
      facts: [
        { label: "Founder", value: "Arjun S" },
        { label: "Experience", value: "13+ years" },
        { label: "Brands scaled", value: "50+" },
        { label: "Projects delivered", value: "500+" },
      ],
      listsTitle: "Track record",
      lists: [
        {
          title: "Founder's past roles",
          items: [
            { name: "Ergode", meta: "VP eCommerce" },
            { name: "California Design Den", meta: "Director eCommerce" },
          ],
        },
        {
          title: "Marketplaces we run",
          items: [
            { name: "Amazon US", meta: "Amazon.com" },
            { name: "Amazon UK", meta: "Amazon.co.uk" },
            { name: "Amazon Canada", meta: "Amazon.ca" },
            { name: "Amazon Germany", meta: "Amazon.de" },
            { name: "Amazon UAE", meta: "Amazon.ae" },
            { name: "TikTok Shop", meta: "United States" },
          ],
        },
      ],
      link: { label: "Meet the team", href: "/team" },
      field: "paper",
    },
  },
  {
    type: "faq_bands",
    label: "Questions (bands)",
    description: "Each question owns a full-width band. All answers are visible.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      {
        key: "items",
        label: "Questions",
        type: "list",
        itemLabel: "Question",
        titleKey: "q",
        fields: [
          { key: "q", label: "Question", type: "text" },
          { key: "a", label: "Answer", type: "textarea", rows: 4 },
        ],
      },
      color("field", "Band colour"),
      color("field2", "Alternate band colour"),
    ],
    defaults: {
      heading: "Questions",
      items: [
        {
          q: "What is in the free audit?",
          a: "We review your ads, listings, pricing, competitors and profitability, and show you where margin leaks and where the growth is. You keep the findings whether or not you work with us.",
        },
        {
          q: "What is TACoS?",
          a: "Total advertising cost of sale: your ad spend divided by your total sales, paid and organic together. It falls when organic sales grow faster than ad spend, which is the sign that growth is paying for itself.",
        },
        {
          q: "What is the Halo Effect?",
          a: "Shoppers who find you on TikTok Shop go on to search for you on Amazon. That extra search demand lifts your Amazon organic rank, so you need less paid traffic. We run both channels together to get it.",
        },
        {
          q: "We have never sold on Amazon. Can you help?",
          a: "Yes. We set up the account, listings, content and ads, launch, then expand to new marketplaces once the first one is profitable.",
        },
        {
          q: "Do you only manage ads?",
          a: "No. We run ads, listings, A+ content, pricing, inventory, reviews and reporting, because TACoS and margin depend on all of them.",
        },
      ],
      field: "sky",
      field2: "paper",
    },
  },
  {
    type: "cta_choice",
    label: "Closing question with two choices",
    description: "A two-line question at the top and bottom edges, two buttons between.",
    fields: [
      { key: "line1", label: "Question line 1", type: "text", maxLength: 14 },
      { key: "line2", label: "Question line 2", type: "text", maxLength: 14 },
      { key: "primary", label: "First choice", type: "link" },
      { key: "secondary", label: "Second choice", type: "link" },
      { key: "note", label: "Line under the buttons", type: "text" },
      color(),
    ],
    defaults: {
      line1: "Where is your",
      line2: "margin going?",
      primary: { label: "Get a free audit", href: "/contact" },
      secondary: { label: "Email us", href: "mailto:zion4commerce@gmail.com" },
      note: "Either way, a person on our team replies within 24 hours.",
      field: "night",
    },
  },
  {
    type: "page_intro",
    label: "Page title band",
    description: "A big page title with one supporting sentence.",
    fields: [
      { key: "title", label: "Title", type: "text", maxLength: 24 },
      { key: "sentence", label: "Sentence", type: "textarea", rows: 3 },
      color(),
    ],
    defaults: {
      title: "Page title",
      sentence: "One sentence that says what this page is for.",
      field: "orange",
    },
  },
  {
    type: "team_grid",
    label: "Team (from Tasqr)",
    description: "Team members pulled live from Tasqr. Choose who shows in Tasqr's website settings.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "intro", label: "Intro", type: "textarea", rows: 3 },
      color(),
    ],
    defaults: {
      heading: "The team",
      intro: "The people who run your account, by name.",
      field: "paper",
    },
  },
  {
    type: "contact_form",
    label: "Audit request form",
    description: "The lead form. Every submission is saved, then emailed.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "intro", label: "Intro", type: "textarea", rows: 3 },
      { key: "steps", label: "What happens next", type: "strings", itemLabel: "Step" },
      { key: "spendRanges", label: "Ad spend options", type: "strings", itemLabel: "Range" },
      { key: "services", label: "Service options", type: "strings", itemLabel: "Service" },
      { key: "submitLabel", label: "Button label", type: "text" },
      { key: "successHeading", label: "Thank-you heading", type: "text" },
      { key: "successText", label: "Thank-you text", type: "textarea", rows: 3 },
      color(),
    ],
    defaults: {
      heading: "Request your free audit",
      intro: "Tell us about your brand. We reply within 24 hours.",
      steps: [
        "We read your request and look at your listings.",
        "We send the audit: where margin leaks and where growth is.",
        "We talk it through on a call. You keep the findings.",
      ],
      spendRanges: ["Under $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+", "Not advertising yet"],
      services: [
        "Amazon advertising",
        "TikTok Shop",
        "Listing optimisation",
        "A+ content and Brand Store",
        "Marketplace expansion",
        "Pricing and margin",
        "Inventory management",
        "Full account management",
      ],
      submitLabel: "Send request",
      successHeading: "Request received",
      successText: "Thank you. We'll reply within 24 hours with next steps for your audit.",
      field: "paper",
    },
  },
  {
    type: "rich_text",
    label: "Text",
    description: "A heading and paragraphs. Blank lines start a new paragraph. Lines starting with ## become subheadings.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "body", label: "Text", type: "textarea", rows: 14 },
      color(),
    ],
    defaults: {
      heading: "Heading",
      body: "Write here.",
      field: "paper",
    },
  },
];

export const SECTION_MAP: Record<string, SectionDefinition> = Object.fromEntries(
  SECTION_DEFINITIONS.map((d) => [d.type, d]),
);

export { FIELD_COLOR_OPTIONS };
