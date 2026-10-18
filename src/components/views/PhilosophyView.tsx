import Link from "next/link";
import { ArrowRight, BookOpen, Gauge, Lock, Network, ShieldCheck, Users } from "lucide-react";
import { localePath, type Locale } from "@/lib/i18n";
import type { Ui } from "@/lib/ui";

// One icon per principle, in the order of ui.philosophy.principles.
const icons = [
  <ShieldCheck key="reliability" className="w-5 h-5" />,
  <Gauge key="observability" className="w-5 h-5" />,
  <Network key="simple" className="w-5 h-5" />,
  <Gauge key="measure" className="w-5 h-5" />,
  <ArrowRight key="impact" className="w-5 h-5 rtl:-scale-x-100" />,
  <Lock key="security" className="w-5 h-5" />,
  <Users key="leadership" className="w-5 h-5" />,
  <BookOpen key="docs" className="w-5 h-5" />,
];

export default function PhilosophyView({ locale, ui }: { locale: Locale; ui: Ui }) {
  const t = ui.philosophy;
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <section className="mb-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-4">{t.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
            {t.titleLine1}
            <br />
            <span className="text-fg-muted">{t.titleLine2}</span>
          </h1>
          <p className="text-fg-muted leading-relaxed text-sm sm:text-base max-w-2xl">{t.intro}</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.principles.map((principle, i) => (
            <article
              key={principle.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-300"
            >
              <div className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 inline-flex mb-5">{icons[i]}</div>
              <h2 className="text-base font-bold text-white mb-3">{principle.title}</h2>
              <p className="text-sm text-fg-muted leading-relaxed">{principle.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-3">{t.showsLabel}</p>
          <h2 className="text-2xl font-bold text-white mb-4">{t.showsTitle}</h2>
          <p className="text-sm text-fg-muted leading-relaxed max-w-2xl mb-7">{t.showsBody}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={localePath(locale, "/case-studies")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold rounded-xl transition-colors"
            >
              {t.readCaseStudies} <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
            </Link>
            <Link
              href={localePath(locale, "/lets-talk")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-800 hover:border-zinc-600 text-fg-muted hover:text-zinc-200 text-sm font-semibold rounded-xl transition-all hover:bg-zinc-800/40"
            >
              {t.discussRoles}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
