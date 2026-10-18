import Link from "next/link";
import { ArrowRight, Download, GraduationCap, Linkedin, Mail, Twitter } from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";
import GlowCard from "@/components/GlowCard";
import RichText from "@/components/RichText";
import type { Career } from "@/lib/career";
import type { Faq } from "@/lib/faq";
import { localePath, type Locale } from "@/lib/i18n";
import { resumePdf, site } from "@/lib/site";
import type { Ui } from "@/lib/ui";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-3">{children}</p>;
}

export default function AboutView({ locale, ui, career, faqs }: { locale: Locale; ui: Ui; career: Career; faqs: Faq[] }) {
  const t = ui.about;
  // The page's own-language name leads; the other spelling follows in brackets.
  const [primaryName, otherName, otherLang] =
    locale === "ar" ? [site.nameArabic, site.nameFull, "en"] : [site.nameFull, site.nameArabic, "ar"];

  return (
    <div className="relative bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 py-20 sm:py-24 space-y-24">

        {/* ── Intro ── */}
        <section className="text-center max-w-3xl mx-auto">
          <Label>{t.eyebrow}</Label>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">{t.title}</h1>
          <p className="text-zinc-400 leading-relaxed mb-12 text-sm sm:text-base">
            {t.introPrefix} <span className="font-semibold text-zinc-100">{primaryName}</span>{" "}
            <span className="text-fg-muted">
              (<bdi lang={otherLang}>{otherName}</bdi>)
            </span>{" "}
            {t.introRest}
          </p>

          <dl className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {career.highlights.map((h) => (
              <div key={h.label} className="flex flex-col-reverse p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40">
                <dt className="text-xs text-fg-muted leading-snug">{h.label}</dt>
                <dd className="text-2xl font-black text-white mb-1">
                  <AnimatedNumber value={h.value} suffix={h.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Overview ── */}
        <section>
          <GlowCard className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7 md:p-10">
            <Label>{t.summaryLabel}</Label>
            <h2 className="text-xl font-bold text-white mb-5">{t.summaryTitle}</h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed text-sm sm:text-[15px] max-w-3xl">
              {t.overview.map((paragraph, i) => (
                <p key={i}>
                  <RichText
                    parts={paragraph}
                    locale={locale}
                    linkClassName="text-zinc-200 underline underline-offset-2 hover:text-white"
                  />
                </p>
              ))}
            </div>
          </GlowCard>
        </section>

        {/* ── Skills ── */}
        <section>
          <Label>{t.skillsLabel}</Label>
          <h2 className="text-xl font-bold text-white mb-8">{t.skillsTitle}</h2>
          <dl className="space-y-5">
            {career.skills.map((group) => (
              <div key={group.label} className="flex flex-col sm:flex-row sm:items-start gap-3">
                <dt className="text-xs font-semibold uppercase tracking-widest text-fg-faint sm:w-44 shrink-0 sm:pt-2">{group.label}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-300 text-sm font-medium">
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Experience ── */}
        <section>
          <Label>{t.journeyLabel}</Label>
          <h2 className="text-xl font-bold text-white mb-10">{t.experienceTitle}</h2>
          <div className="relative sm:ps-12">
          <div aria-hidden="true" className="absolute start-[17px] top-3 bottom-3 w-px bg-zinc-800 hidden sm:block" />
          <ol className="space-y-5">
            {career.experience.map((role) => (
              <li key={`${role.company}-${role.title}`} className="relative">
                <span aria-hidden="true" className="absolute -start-[36px] top-6 w-3 h-3 rounded-full bg-zinc-600 ring-4 ring-zinc-950 hidden sm:block" />
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 hover:border-zinc-700 transition-colors">
                  <h3 className="font-semibold text-zinc-100">{role.title}</h3>
                  <p className="flex flex-wrap gap-x-3 mt-1 mb-3 text-xs">
                    <span className="text-zinc-300 font-medium">
                      {role.company}
                      {role.engagement === "Freelance" ? ` · ${ui.common.engagement.Freelance}` : ""}
                    </span>
                    <span aria-hidden="true" className="text-fg-faint">·</span>
                    <span className="text-fg-muted">{role.start} – {role.end}</span>
                    {role.location && (
                      <>
                        <span aria-hidden="true" className="text-fg-faint">·</span>
                        <span className="text-fg-muted">{role.location}</span>
                      </>
                    )}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{role.summary}</p>
                  {role.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {role.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-fg-muted leading-relaxed">
                          <ArrowRight className="w-3 h-3 text-zinc-600 mt-1.5 shrink-0 rtl:-scale-x-100" aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
          </div>
        </section>

        {/* ── Working style ── */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7 md:p-10">
          <Label>{t.workingStyleLabel}</Label>
          <h2 className="text-xl font-bold text-white mb-7">{t.workingStyleTitle}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.workingStyle.map((point) => (
              <li key={point} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 text-sm text-zinc-400 leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Education ── */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div aria-hidden="true" className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-fg-faint">{t.education}</h2>
          </div>
          <p className="text-base font-bold text-white mb-1">{career.education.degree}</p>
          <p className="text-zinc-300 text-sm mb-1">
            {career.education.school}{locale === "ar" ? "، " : ", "}{career.education.location}
          </p>
          <p className="text-fg-muted text-sm">{career.education.year} · {career.education.note}</p>
        </section>

        {/* ── FAQ ── */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-3 text-center">{t.faqLabel}</p>
          <h2 className="text-xl font-bold text-white mb-8 text-center">{t.faqTitle}</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40">
                <h3 className="text-sm font-semibold text-zinc-100 mb-2">{f.q}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="text-center rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 md:p-14">
          <h2 className="text-2xl font-bold text-white mb-3">{t.ctaTitle}</h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">{career.availability}</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center">
            <Link
              href={localePath(locale, "/lets-talk")}
              className="inline-flex items-center gap-2 px-7 py-3 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" /> {ui.common.getInTouch}
            </Link>
            {[
              { href: site.social.linkedin, icon: <Linkedin className="w-4 h-4" aria-hidden="true" />, label: "LinkedIn" },
              { href: site.social.x, icon: <Twitter className="w-4 h-4" aria-hidden="true" />, label: "X" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold rounded-xl transition-colors"
              >
                {l.icon} {l.label}
              </a>
            ))}
            <a
              href={resumePdf(locale)}
              download
              className="inline-flex items-center gap-2 px-7 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden="true" /> {ui.common.downloadResume}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
