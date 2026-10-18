import Link from "next/link";
import { ArrowRight, ExternalLink, Github, ListChecks } from "lucide-react";
import GlowCard from "@/components/GlowCard";
import type { CaseStudy } from "@/lib/case-study-types";
import { localePath, type Locale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";
import { site } from "@/lib/site";
import type { Ui } from "@/lib/ui";

export default function OpenSourceView({
  locale,
  ui,
  projects,
  caseStudies,
}: {
  locale: Locale;
  ui: Ui;
  projects: Project[];
  caseStudies: CaseStudy[];
}) {
  const t = ui.openSource;
  const openSource = projects.filter((p) => p.openSource);
  const hasFeatures = (slug: string) => Boolean(caseStudies.find((c) => c.slug === slug)?.features);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 py-20 sm:py-24">
        <header className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-3">{t.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
            {t.titleLine1}
            <br />
            <span className="text-zinc-400">{t.titleLine2}</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl leading-relaxed">
            {t.intro}{" "}
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 underline decoration-zinc-600 underline-offset-4 hover:decoration-zinc-300"
            >
              GitHub
            </a>
            .
          </p>
        </header>

        <ul className="space-y-6">
          {openSource.map((p) => {
            const os = p.openSource!;
            return (
              <li key={p.slug} id={p.slug} className="scroll-mt-24">
                <GlowCard className="rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors duration-300" glowSize={400}>
                  <article className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="text-xs font-mono px-2.5 py-1 rounded-md border border-zinc-600 text-zinc-200">{os.license}</span>
                      <span className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300">{os.status}</span>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-fg-faint ms-1">
                        {p.engagement} · {p.role}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-white">{p.title}</h2>
                    <p className="text-sm text-zinc-300 mb-3">{p.tagline}</p>
                    <p className="text-sm text-fg-muted leading-relaxed max-w-3xl mb-6">{p.description}</p>

                    <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-3">{t.highlights}</h3>
                    <ul className="grid gap-2 md:grid-cols-2 mb-6">
                      {os.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                          <ArrowRight className="w-3.5 h-3.5 mt-1 shrink-0 text-zinc-600 rtl:-scale-x-100" aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <ul aria-label={ui.common.technology} className="flex flex-wrap gap-1.5 mb-6">
                      {p.techStack.map((tech) => (
                        <li key={tech} className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 font-mono border border-zinc-700/50">
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" aria-hidden="true" /> {ui.common.sourceOnGitHub}
                        </a>
                      )}
                      {p.caseStudy && (
                        <Link
                          href={localePath(locale, p.caseStudy)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white text-xs font-semibold transition-colors"
                        >
                          <ArrowRight className="w-3.5 h-3.5 rtl:-scale-x-100" aria-hidden="true" /> {ui.common.caseStudy}
                        </Link>
                      )}
                      {p.caseStudy && hasFeatures(p.slug) && (
                        <Link
                          href={`${localePath(locale, p.caseStudy)}#features`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white text-xs font-semibold transition-colors"
                        >
                          <ListChecks className="w-3.5 h-3.5" aria-hidden="true" /> {t.featureList}
                        </Link>
                      )}
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white text-xs font-semibold transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /> {ui.common.website}
                        </a>
                      )}
                    </div>
                  </article>
                </GlowCard>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
