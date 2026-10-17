import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlowCard from "@/components/GlowCard";
import { caseStudies } from "@/lib/case-studies";

export default function CaseStudiesIndex() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 py-20 sm:py-24">
        <header className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-3">Case studies</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
            Engineering decisions
            <br />
            <span className="text-zinc-400">behind shipped systems.</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl leading-relaxed">
            Each study follows the same path — problem, constraints, architecture, decisions, trade-offs, outcomes —
            and states what I personally owned and what is out of scope. Numbers appear only where they can be checked.
          </p>
        </header>

        <ul className="space-y-5">
          {caseStudies.map((c) => (
            <li key={c.slug}>
              <GlowCard className="rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors duration-300" glowSize={400}>
                <Link href={`/case-studies/${c.slug}`} className="group block p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-6 mb-5">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-fg-faint mb-2">{c.kicker}</p>
                      <h2 className="text-2xl font-bold text-white mb-2">{c.title}</h2>
                      <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">{c.summary}</p>
                    </div>
                    <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-zinc-300">
                      Read <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </span>
                  </div>
                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-xl overflow-hidden border border-zinc-800 bg-zinc-800 mb-5">
                    {c.facts.map((f) => (
                      <div key={f.label} className="bg-zinc-950 px-4 py-3 flex flex-col-reverse gap-0.5">
                        <dt className="text-[11px] text-fg-faint">{f.label}</dt>
                        <dd className="text-sm font-bold text-white">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <ul className="flex flex-wrap gap-1.5" aria-label="Technology">
                      {c.tags.map((t) => (
                        <li key={t} className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 font-mono border border-zinc-700/50">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <span className="text-xs text-fg-faint">{c.readTime}</span>
                  </div>
                </Link>
              </GlowCard>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link href="/portfolio" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-zinc-200 transition-colors group">
            All projects <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
