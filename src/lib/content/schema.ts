/**
 * Content model shared by the public site and the visual editor.
 *
 * A site is global settings plus pages. A page is an ordered list of section
 * instances. Each section type declares its editable fields once (here), and
 * both the renderer and the editor read that declaration.
 */

export type FieldColor = "paper" | "mist" | "steel" | "navy" | "night";

export interface ImageValue {
  src: string;
  alt: string;
}

export interface LinkValue {
  label: string;
  href: string;
}

export type Field =
  | { key: string; label: string; type: "text"; help?: string; maxLength?: number }
  | { key: string; label: string; type: "textarea"; help?: string; rows?: number }
  | { key: string; label: string; type: "image"; help?: string }
  | { key: string; label: string; type: "link"; help?: string }
  | { key: string; label: string; type: "color"; help?: string }
  | { key: string; label: string; type: "hex"; help?: string }
  | {
      key: string;
      label: string;
      type: "select";
      options: { value: string; label: string }[];
      help?: string;
    }
  | { key: string; label: string; type: "number"; min?: number; max?: number; step?: number; help?: string }
  | { key: string; label: string; type: "toggle"; help?: string }
  | { key: string; label: string; type: "strings"; itemLabel: string; help?: string }
  | {
      key: string;
      label: string;
      type: "list";
      itemLabel: string;
      /** Field whose value names each item in the editor's list. */
      titleKey: string;
      fields: Field[];
      min?: number;
      max?: number;
      help?: string;
    };

export type Settings = Record<string, unknown>;

export interface SectionInstance {
  id: string;
  type: string;
  hidden?: boolean;
  settings: Settings;
}

export interface PageSeo {
  title: string;
  description: string;
}

export interface PageContent {
  slug: string; // "home" renders at "/"
  title: string; // name in the editor
  seo: PageSeo;
  sections: SectionInstance[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteSettings {
  siteName: string;
  logo: ImageValue;
  nav: NavItem[];
  headerAction: LinkValue;
  colors: Record<FieldColor | "accent" | "ink", string>;
  contact: {
    email: string;
    leadTo: string;
    leadCc: string;
  };
  footer: {
    tagline: string;
    columns: { title: string; links: NavItem[] }[];
    copyright: string;
  };
  seo: {
    titleSuffix: string;
    defaultDescription: string;
  };
}

export interface SiteContent {
  settings: SiteSettings;
  pages: PageContent[];
}

export interface SectionDefinition {
  type: string;
  label: string;
  description: string;
  fields: Field[];
  defaults: Settings;
}

export const FIELD_COLOR_OPTIONS: { value: FieldColor; label: string }[] = [
  { value: "paper", label: "Paper" },
  { value: "mist", label: "Mist" },
  { value: "steel", label: "Steel" },
  { value: "navy", label: "Navy" },
  { value: "night", label: "Night" },
];

export function pagePath(slug: string): string {
  return slug === "home" ? "/" : `/${slug}`;
}
