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
      // Generated photography (Higgsfield). Replace with local copies via scripts/localise-images.mjs.
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net", pathname: "/**" },
      // Media uploaded in the editor.
      ...(supabaseHost ? [{ protocol: "https" as const, hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }] : []),
    ],
  },
  async redirects() {
    // Old site paths.
    return [{ source: "/connect", destination: "/contact", permanent: true }];
  },
};

export default nextConfig;
