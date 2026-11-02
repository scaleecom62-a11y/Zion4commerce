import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_SITE } from "@/lib/content/default-site";

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// ---------- real 404s for unknown pages ----------
// A page that calls notFound() after streaming starts keeps a 200 status, so unknown
// single-segment paths are answered here, before rendering. The list of published
// page addresses is cached per instance for a minute.
const BUILT_IN = new Set(DEFAULT_SITE.pages.map((p) => p.slug));
let known: { slugs: Set<string>; at: number } | null = null;

async function publishedSlugs(): Promise<Set<string>> {
  if (known && Date.now() - known.at < 60_000) return known.slugs;
  let slugs = BUILT_IN;
  if (URL_ && KEY) {
    try {
      const res = await fetch(`${URL_}/rest/v1/site_documents?key=eq.published&select=content`, {
        headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
        signal: AbortSignal.timeout(2500),
      });
      if (res.ok) {
        const rows = (await res.json()) as { content?: { pages?: { slug?: string }[] } }[];
        const pages = rows[0]?.content?.pages;
        if (Array.isArray(pages) && pages.length) slugs = new Set(pages.map((p) => String(p.slug ?? "")));
      }
    } catch {
      // Unreachable: fall back to the built-in pages.
    }
  }
  known = { slugs, at: Date.now() };
  return slugs;
}

async function refreshSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  if (!URL_ || !KEY) return response;
  const supabase = createServerClient(URL_, KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        for (const { name, value } of list) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of list) response.cookies.set(name, value, options);
      },
    },
  });
  try {
    await supabase.auth.getUser();
  } catch {
    // Database unreachable: let the page decide what to show.
  }
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) return refreshSession(request);

  const slug = pathname.slice(1);
  if (slug && !slug.includes("/") && !(await publishedSlugs()).has(slug)) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
    // Single-segment page paths only: skip files, Next internals and metadata routes.
    "/((?!_next|api|brand|images|favicon\\.ico|robots\\.txt|sitemap\\.xml)[^/.]+)",
  ],
};
