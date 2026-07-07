import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-display", subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700", "800"] });

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://template-12-webinar-live.vercel.app").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`, template: `%s · ${siteConfig.brand.name}` },
  description: "Live workshops and webinars for African founders, marketers and operators.",
  openGraph: { type: "website", siteName: siteConfig.brand.name, url: siteUrl, locale: "en_NG" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
