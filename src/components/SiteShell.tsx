import Script from "next/script";
import CursorFollower from "@/components/CursorFollower";
import JsonLd from "@/components/JsonLd";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import SiteFooter from "@/components/SiteFooter";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { personJsonLd } from "@/lib/seo";

// Everything inside <body> that both root layouts share.
export default function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const { ui } = getContent(locale);
  return (
    <>
      <JsonLd data={personJsonLd(locale)} />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-3XVC5T3GZE" strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-3XVC5T3GZE');
      `}</Script>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-zinc-100 focus:text-zinc-950 focus:text-sm focus:font-semibold"
      >
        {ui.common.skipToContent}
      </a>
      <MotionProvider>
        <ScrollProgress />
        <CursorFollower />
        <Navbar locale={locale} nav={ui.nav} />
        <main id="main-content" className="pt-16">{children}</main>
        <SiteFooter locale={locale} ui={ui} />
      </MotionProvider>
    </>
  );
}
