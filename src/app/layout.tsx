import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Public_Sans } from "next/font/google";
import "./globals.css";

const display = Big_Shoulders({ subsets: ["latin"], weight: ["800"], variable: "--font-big-shoulders", display: "swap" });
const text = Public_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-public-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://zion4commerce.com"),
  icons: { icon: "/brand/zion4commerce-logo.png" },
};

export const viewport: Viewport = { themeColor: "#f5f7f8" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body>{children}</body>
    </html>
  );
}
