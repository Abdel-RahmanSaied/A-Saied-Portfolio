import "../globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import SiteShell from "@/components/SiteShell";
import { uiAr } from "@/lib/ar/ui";
import { site } from "@/lib/site";

// Arabic site at /ar: right to left, set in IBM Plex Sans Arabic (which also
// carries the Latin letters of the English terms inside the Arabic text).
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: uiAr.site.title,
    template: `%s | ${uiAr.site.name}`,
  },
  description: uiAr.site.description,
  keywords: [...site.keywords],
  authors: [{ name: uiAr.site.name, url: `${site.url}/ar` }],
  creator: uiAr.site.name,
  publisher: uiAr.site.name,
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/apple-icon.png",
  },
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: uiAr.site.title,
    description: uiAr.site.description,
    url: `${site.url}/ar`,
    siteName: site.siteName,
    locale: "ar_EG",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: uiAr.site.title,
    description: uiAr.site.description,
    site: site.social.xHandle,
    creator: site.social.xHandle,
  },
};

export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth" className={plexArabic.variable}>
      <body className="bg-zinc-950 text-zinc-100">
        <SiteShell locale="ar">{children}</SiteShell>
      </body>
    </html>
  );
}
