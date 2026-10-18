import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";
import type { Ui } from "@/lib/ui";

const links = [
  { href: "/", key: "home" },
  { href: "/case-studies", key: "caseStudies" },
  { href: "/blog", key: "blog" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/about", key: "about" },
] as const;

export default function NotFoundView({ locale, ui }: { locale: Locale; ui: Ui }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-4">404</p>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">{ui.notFound.title}</h1>
        <p className="text-fg-muted text-sm sm:text-base leading-relaxed mb-8">{ui.notFound.body}</p>
        <nav className="flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={localePath(locale, l.href)}
              className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
            >
              {ui.nav[l.key]}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
