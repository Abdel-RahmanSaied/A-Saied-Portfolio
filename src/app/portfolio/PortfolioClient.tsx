"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GlowCard from "@/components/GlowCard";
import { projects } from "@/lib/projects";

export default function PortfolioClient() {
  const [selected, setSelected] = useState("All");
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = selected === "All" ? projects : projects.filter((p) => p.category === selected);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 py-20 sm:py-24">
        <header className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-3">Work</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Projects</h1>
          <p className="text-zinc-400 max-w-2xl leading-relaxed">
            Platforms I lead or build at ASAS IT, freelance hospitality work, and products I founded. Each entry says
            who the work was for and links to a case study with the architecture and my role.
          </p>
        </header>

        <div role="group" aria-label="Filter by category" className="mb-10 flex flex-wrap gap-1 p-1 rounded-xl border border-zinc-800 bg-zinc-900/50 w-fit max-w-full">
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
              {cat}
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
                    <div aria-hidden="true" className="absolute right-0 top-0 h-28 w-28 opacity-[0.06] pointer-events-none">
                      <Image src={project.image} alt="" fill sizes="112px" className="object-contain" />
                    </div>
                  )}
                  <article className="relative flex h-full flex-col p-6 sm:p-7">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-fg-faint mb-2">
                      {project.category} · {project.engagement} · {project.role}
                    </p>
                    <h2 className="text-xl font-bold text-white">{project.title}</h2>
                    <p className="text-sm text-zinc-300 mb-3">{project.tagline}</p>
                    <p className="text-sm text-fg-muted leading-relaxed mb-5">{project.description}</p>
                    <ul aria-label="Technology" className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((t) => (
                        <li key={t} className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 font-mono border border-zinc-700/50">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.caseStudy && (
                        <Link
                          href={project.caseStudy}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold transition-colors"
                        >
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" /> Case study
                        </Link>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white text-xs font-semibold transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /> Website
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white text-xs font-semibold transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" aria-hidden="true" /> Source
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
