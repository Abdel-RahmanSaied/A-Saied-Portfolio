import Link from "next/link";
import { asIconSmall } from "@/lib/brand";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import type { Ui } from "@/lib/ui";

const footerLinks = [
  { key: "about", href: "/about" },
  { key: "portfolio", href: "/portfolio" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "openSource", href: "/open-source" },
  { key: "philosophy", href: "/engineering-philosophy" },
  { key: "blog", href: "/blog" },
  { key: "resume", href: "/resume" },
  { key: "letsTalk", href: "/lets-talk" },
] as const;

export default function SiteFooter({ locale, ui }: { locale: Locale; ui: Ui }) {
  return (
    <footer className="print:hidden border-t border-zinc-800/60 bg-zinc-950 px-5 py-12 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-end">
        <div>
          <Link href={localePath(locale, "/")} className="inline-flex items-center gap-3 text-zinc-100">
            <svg aria-hidden="true" viewBox={asIconSmall.viewBox} className="h-8 w-[27px]">
              <path fill="currentColor" fillRule="evenodd" d={asIconSmall.d} />
            </svg>
            <span dir="ltr" className="font-semibold tracking-tight">
              asaied<span className="text-zinc-500">.dev</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500">{ui.site.description}</p>
        </div>

        <nav aria-label={locale === "ar" ? "روابط الموقع" : "Site links"}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 lg:justify-items-end">
            {footerLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href={localePath(locale, item.href)}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {ui.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-zinc-800/60 pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {ui.site.name}</p>
        <a href={`mailto:${site.email}`} className="transition-colors hover:text-zinc-300">{site.email}</a>
      </div>
    </footer>
  );
}
