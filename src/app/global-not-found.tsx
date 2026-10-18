import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { uiAr } from "@/lib/ar/ui";
import { localePath, type Locale } from "@/lib/i18n";
import { uiEn, type Ui } from "@/lib/ui";

// Unmatched URLs skip both root layouts, so this page can't tell which
// language the visitor came from: it says the same thing in both.
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: `404 | ${uiEn.site.name}`,
  robots: { index: false },
};

const links = [
  { href: "/", key: "home" },
  { href: "/case-studies", key: "caseStudies" },
  { href: "/blog", key: "blog" },
  { href: "/about", key: "about" },
] as const;

function Message({ locale, ui }: { locale: Locale; ui: Ui }) {
  return (
    <section
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      style={locale === "ar" ? { fontFamily: "var(--font-plex-arabic), sans-serif" } : undefined}
    >
      <h2 className="text-3xl font-black text-white mb-3">{ui.notFound.title}</h2>
      <p className="text-fg-muted text-sm leading-relaxed mb-6">{ui.notFound.body}</p>
      <nav className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a
            key={l.href}
            href={localePath(locale, l.href)}
            className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
          >
            {ui.nav[l.key]}
          </a>
        ))}
      </nav>
    </section>
  );
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className={plexArabic.variable}>
      <body className="bg-zinc-950 text-zinc-100">
        <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
          <h1 className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-10">404</h1>
          <div className="grid gap-12 sm:grid-cols-2 max-w-3xl w-full">
            <Message locale="en" ui={uiEn} />
            <Message locale="ar" ui={uiAr} />
          </div>
        </main>
      </body>
    </html>
  );
}
