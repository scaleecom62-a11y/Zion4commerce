import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : undefined;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Media uploaded in the editor.
      ...(supabaseHost ? [{ protocol: "https" as const, hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }] : []),
    ],
  },
  async redirects() {
    // Old site paths.
    return [
      { source: "/connect", destination: "/contact", permanent: true },
      // The team page is retired for now. Temporary, so it can come back.
      { source: "/team", destination: "/about", permanent: false },
      { source: "/team/:slug", destination: "/about", permanent: false },
    ];
  },
};

export default nextConfig;
