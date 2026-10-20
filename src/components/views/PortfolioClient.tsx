"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GlowCard from "@/components/GlowCard";
import { localePath, type Locale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";
import type { Ui } from "@/lib/ui";

type Filter = "All" | Project["category"];

export default function PortfolioClient({ locale, ui, projects }: { locale: Locale; ui: Ui; projects: Project[] }) {
  const t = ui.portfolio;
  const [selected, setSelected] = useState<Filter>("All");
  const categories: Filter[] = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = selected === "All" ? projects : projects.filter((p) => p.category === selected);
  const label = (f: Filter) => (f === "All" ? t.all : ui.common.categories[f]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 py-20 sm:py-24">
        <header className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-3">{t.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">{t.title}</h1>
          <p className="text-zinc-400 max-w-2xl leading-relaxed">{t.intro}</p>
        </header>

        <div role="group" aria-label={t.filterLabel} className="mb-10 flex flex-wrap gap-1 p-1 rounded-xl border border-zinc-800 bg-zinc-900/50 w-fit max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={selected === cat}
              onClick={() => setSelected(cat)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selected === cat ? "bg-zinc-100 text-zinc-900" : "text-fg-muted hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              {label(cat)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={selected}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((project) => (
              <li key={project.slug} id={project.slug}>
                <GlowCard className="relative h-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors duration-300">
                  {project.image && (
                    <div aria-hidden="true" className="absolute end-0 top-0 h-28 w-28 opacity-[0.06] pointer-events-none">
                      <Image src={project.image} alt="" fill sizes="112px" className="object-contain" />
                    </div>
                  )}
                  <article className="relative flex h-full flex-col p-6 sm:p-7">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-fg-faint mb-2">
                      {ui.common.categories[project.category]} · {project.engagement} · {project.role}
                    </p>
                    <h2 className="text-xl font-bold text-white">{project.title}</h2>
                    <p className="text-sm text-zinc-300 mb-3">{project.tagline}</p>
                    {project.caseStudyHook && <p className="text-sm font-medium text-zinc-200 mb-3">{project.caseStudyHook}</p>}
                    <p className="text-sm text-fg-muted leading-relaxed mb-5">{project.cardSummary ?? project.description}</p>
                    <ul aria-label={ui.common.technology} className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech) => (
                        <li key={tech} className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 font-mono border border-zinc-700/50">
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.caseStudy && (
                        <Link
                          href={localePath(locale, project.caseStudy)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold transition-colors"
                        >
                          <ArrowRight className="w-3.5 h-3.5 rtl:-scale-x-100" aria-hidden="true" /> {ui.common.caseStudy}
                        </Link>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white text-xs font-semibold transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /> {ui.common.website}
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white text-xs font-semibold transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" aria-hidden="true" /> {ui.common.source}
                        </a>
                      )}
                    </div>
                  </article>
                </GlowCard>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
