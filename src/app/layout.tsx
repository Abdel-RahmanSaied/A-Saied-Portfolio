import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CursorFollower from "@/components/CursorFollower";
import ScrollProgress from "@/components/ScrollProgress";
import JsonLd from "@/components/JsonLd";
import MotionProvider from "@/components/MotionProvider";
import { personJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
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
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    site: site.social.xHandle,
    creator: site.social.xHandle,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-zinc-950 text-zinc-100">
        <JsonLd data={personJsonLd()} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3XVC5T3GZE" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3XVC5T3GZE');
        `}</Script>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-zinc-100 focus:text-zinc-950 focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <MotionProvider>
          <ScrollProgress />
          <CursorFollower />
          <Navbar />
          <main id="main-content" className="pt-16">{children}</main>
        </MotionProvider>
      </body>
    </html>
  );
}
