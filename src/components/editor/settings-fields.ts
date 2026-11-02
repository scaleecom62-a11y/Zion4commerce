import type { Field } from "@/lib/content/schema";

const linkFields: Field[] = [
  { key: "label", label: "Text", type: "text" },
  { key: "href", label: "Address", type: "text", help: "A page like /about, a section like /#services, or a full https:// address." },
];

/** Every global element of the site, editable from Site settings. Paths are inside SiteSettings. */
export const SETTINGS_GROUPS: { id: string; title: string; fields: Field[] }[] = [
  {
    id: "brand",
    title: "Brand",
    fields: [
      { key: "siteName", label: "Site name", type: "text" },
      { key: "logo", label: "Logo", type: "image" },
    ],
  },
  {
    id: "header",
    title: "Header",
    fields: [
      { key: "nav", label: "Menu links", type: "list", itemLabel: "Link", titleKey: "label", fields: linkFields, max: 6 },
      { key: "headerAction", label: "Header button", type: "link" },
    ],
  },
  {
    id: "colors",
    title: "Colours",
    fields: [
      { key: "colors.paper", label: "Paper (page background)", type: "hex" },
      { key: "colors.mist", label: "Mist (light tint)", type: "hex" },
      { key: "colors.steel", label: "Steel (logo sky)", type: "hex" },
      { key: "colors.navy", label: "Navy (logo outline)", type: "hex" },
      { key: "colors.night", label: "Night (deepest panels)", type: "hex" },
      { key: "colors.accent", label: "Buttons on light backgrounds", type: "hex", help: "White button text must stay readable on this colour." },
      { key: "colors.ink", label: "Ink (text)", type: "hex" },
    ],
  },
  {
    id: "footer",
    title: "Footer",
    fields: [
      { key: "footer.tagline", label: "Tagline", type: "text" },
      {
        key: "footer.columns",
        label: "Link columns",
        type: "list",
        itemLabel: "Column",
        titleKey: "title",
        max: 4,
        fields: [
          { key: "title", label: "Column title", type: "text" },
          { key: "links", label: "Links", type: "list", itemLabel: "Link", titleKey: "label", fields: linkFields },
        ],
      },
      { key: "footer.copyright", label: "Copyright line", type: "text" },
    ],
  },
  {
    id: "contact",
    title: "Contact and leads",
    fields: [
      { key: "contact.email", label: "Public email", type: "text", help: "Shown in the footer and used by 'Email us' buttons." },
      { key: "contact.leadTo", label: "Send audit requests to", type: "text" },
      { key: "contact.leadCc", label: "Copy (CC) audit requests to", type: "text" },
    ],
  },
  {
    id: "seo",
    title: "Search and sharing",
    fields: [
      { key: "seo.titleSuffix", label: "Title suffix", type: "text", help: "Added after every page title in search results, e.g. ' · Zion4Commerce'." },
      { key: "seo.defaultDescription", label: "Default description", type: "textarea", rows: 3 },
    ],
  },
];

export const PAGE_FIELDS: Field[] = [
  { key: "title", label: "Page name (editor only)", type: "text" },
  { key: "seo.title", label: "Title in search results", type: "text", maxLength: 60 },
  { key: "seo.description", label: "Description in search results", type: "textarea", rows: 3, help: "About 150 characters." },
];
