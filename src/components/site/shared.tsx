import NextImage from "next/image";
import type { FieldColor, ImageValue, LinkValue, SectionInstance, Settings, SiteSettings } from "@/lib/content/schema";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string | null;
  bio: string | null;
  photo: string | null;
  linkedin: string | null;
  slug: string;
}

export interface RenderData {
  team: TeamMember[];
}

export interface SectionProps {
  section: SectionInstance;
  site: SiteSettings;
  data: RenderData;
  /** First section on the page owns the page's h1. */
  isFirst: boolean;
}

export function str(s: Settings, key: string, fallback = ""): string {
  const v = s[key];
  return typeof v === "string" ? v : fallback;
}

export function num(s: Settings, key: string, fallback = 0): number {
  const v = s[key];
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

export function list<T = Settings>(s: Settings, key: string): T[] {
  const v = s[key];
  return Array.isArray(v) ? (v as T[]) : [];
}

export function link(s: Settings, key: string): LinkValue {
  const v = s[key] as Partial<LinkValue> | undefined;
  return { label: v?.label ?? "", href: v?.href ?? "#" };
}

export function img(s: Settings, key: string): ImageValue {
  const v = s[key] as Partial<ImageValue> | undefined;
  return { src: v?.src ?? "", alt: v?.alt ?? "" };
}

// Colour names used before the palette moved to the logo's colours.
const LEGACY_FIELD: Record<string, FieldColor> = { orange: "navy", sky: "steel", lime: "mist" };
const FIELDS: FieldColor[] = ["paper", "mist", "steel", "navy", "night"];

export function field(s: Settings, key = "field", fallback: FieldColor = "paper"): string {
  const v = s[key];
  const name = typeof v === "string" ? (LEGACY_FIELD[v] ?? v) : fallback;
  return `f-${FIELDS.includes(name as FieldColor) ? name : fallback}`;
}

/** Marks an element so the editor can select its field when clicked in the preview. */
export function ed(key: string) {
  return { "data-field": key } as const;
}

/** Heading tag: the first section's main heading is the page h1. */
export function H({ first, className, children, ...rest }: { first: boolean; className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) {
  return first ? (
    <h1 className={className} {...rest}>
      {children}
    </h1>
  ) : (
    <h2 className={className} {...rest}>
      {children}
    </h2>
  );
}

export function HexMark({ className }: { className?: string }) {
  // The Zion4Commerce badge, rebuilt from flat shapes with 4px gaps.
  return (
    <svg viewBox="0 0 240 260" className={className} role="img" aria-label="Zion4Commerce mark">
      <polygon points="120,0 240,65 240,195 120,260 0,195 0,65" fill="currentColor" />
      <polygon points="120,14 226,72 226,128 14,128 14,72" fill="var(--c-steel)" />
      <polygon points="14,128 60,84 88,108 128,52 168,104 196,82 226,112 226,132 14,132" fill="var(--c-paper)" />
      <polygon points="14,136 226,136 226,187 120,246 14,187" fill="var(--c-paper)" />
    </svg>
  );
}

const OPTIMISED_HOSTS = [".supabase.co"];

/** One image component for every picture on the site. Optimised when the host is known. */
export function Pic({
  src,
  alt,
  className,
  fill,
  width,
  height,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}) {
  const remote = /^https?:\/\//.test(src);
  const known = !remote || OPTIMISED_HOSTS.some((h) => new URL(src).hostname.endsWith(h.replace(/^\./, "")));
  return (
    <NextImage
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      width={fill ? undefined : (width ?? 1600)}
      height={fill ? undefined : (height ?? 1000)}
      sizes={sizes ?? (fill ? "100vw" : "(max-width: 768px) 100vw, 60vw")}
      priority={priority}
      unoptimized={!known}
    />
  );
}
