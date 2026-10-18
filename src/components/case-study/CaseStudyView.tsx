import Link from "next/link";
import { ArrowRight, ChevronLeft, ExternalLink } from "lucide-react";
import GlowCard from "@/components/GlowCard";
import ArchitectureDiagram from "./ArchitectureDiagram";
import type { CaseStudy } from "@/lib/case-study-types";

function SectionLabel({ number, label }: { number: number; label: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-3">
      <span aria-hidden="true" className="text-fg-faint mr-2">
        {String(number).padStart(2, "0")}
      </span>
      {label}
    </p>
  );
}

function Section({
  number,
  label,
  title,
  id,
  children,
}: {
  number: number;
  label: string;
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`section-${number}`} className={id ? "scroll-mt-24" : undefined}>
      <SectionLabel number={number} label={label} />
      <h2 id={`section-${number}`} className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function CaseStudyView({ study, next }: { study: CaseStudy; next?: CaseStudy }) {
  let n = 0;
  const num = () => ++n;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <article className="relative max-w-4xl mx-auto px-5 sm:px-6 py-16 sm:py-24 space-y-20">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-zinc-200 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          All case studies
        </Link>

        {/* ── Header ── */}
        <header className="-mt-12">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300 border border-zinc-700 px-3 py-1 rounded-full">
              {study.kicker}
            </span>
            <span className="text-xs text-fg-faint">{study.readTime}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.05] mb-5">{study.headline}</h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl mb-7">{study.summary}</p>
          <div className="flex flex-wrap items-center gap-3">
            {study.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-700 text-sm font-semibold text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800/50 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /> {l.label}
              </a>
            ))}
            <span className="text-sm text-fg-muted">{study.role}</span>
          </div>

          {study.facts.length > 0 && (
            <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-800">
              {study.facts.map((f) => (
                <div key={f.label} className="bg-zinc-950 px-4 py-4 flex flex-col-reverse gap-1">
                  <dt className="text-[11px] uppercase tracking-wider text-fg-faint">{f.label}</dt>
                  <dd className="text-lg font-bold text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </header>

        <Section number={num()} label="The problem" title="What needed solving">
          <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl">
            {study.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>

        <Section number={num()} label="Constraints" title="What the design had to respect">
          <ul className="grid gap-3 sm:grid-cols-2">
            {study.constraints.map((c) => (
              <li key={c} className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 text-sm text-zinc-300 leading-relaxed">
                <ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-fg-faint" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </Section>

        <Section number={num()} label="Architecture" title="How the system fits together">
          <p className="text-zinc-400 leading-relaxed max-w-3xl mb-6">{study.architecture.intro}</p>
          <ArchitectureDiagram layers={study.architecture.layers} label={`${study.title} architecture`} />
          {study.architecture.notes && (
            <ul className="mt-5 space-y-2 text-sm text-fg-muted leading-relaxed">
              {study.architecture.notes.map((note) => (
                <li key={note} className="flex gap-2">
                  <span aria-hidden="true" className="text-fg-faint">—</span>
                  {note}
                </li>
              ))}
            </ul>
          )}
        </Section>

        {study.products && (
          <Section number={num()} label="Products" title="What runs on the platform">
            <div className="grid gap-4 md:grid-cols-2">
              {study.products.map((p) => (
                <GlowCard key={p.name} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <p className="text-sm text-zinc-400 mt-1.5 mb-4 leading-relaxed">{p.summary}</p>
                  <ul className="space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2 text-sm text-fg-muted leading-relaxed">
                        <ArrowRight className="w-3.5 h-3.5 mt-1 shrink-0 text-zinc-600" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  {p.scope && <p className="mt-4 text-xs text-fg-faint leading-relaxed border-t border-zinc-800 pt-3">{p.scope}</p>}
                </GlowCard>
              ))}
            </div>
          </Section>
        )}

        {study.features && (
          <Section number={num()} label="Features" title="Everything it can do" id="features">
            <div className="grid gap-4 md:grid-cols-2">
              {study.features.map((f) => (
                <div key={f.group} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                  <h3 className="font-semibold text-zinc-100 mb-3">{f.group}</h3>
                  <ul className="space-y-2">
                    {f.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-fg-muted leading-relaxed">
                        <ArrowRight className="w-3.5 h-3.5 mt-1 shrink-0 text-zinc-600" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section number={num()} label="Engineering decisions" title="What was chosen, and why">
          <ol className="space-y-3">
            {study.decisions.map((d, i) => (
              <li key={d.title}>
                <GlowCard className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                  <div className="flex gap-4">
                    <span aria-hidden="true" className="text-xs font-mono text-fg-faint mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-semibold text-zinc-100 mb-2">{d.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">{d.body}</p>
                    </div>
                  </div>
                </GlowCard>
              </li>
            ))}
          </ol>
        </Section>

        <Section number={num()} label="Trade-offs" title="What those choices cost">
          <div className="rounded-2xl border border-zinc-800 overflow-hidden divide-y divide-zinc-800">
            {study.tradeoffs.map((t) => (
              <div key={t.choice} className="grid sm:grid-cols-[1fr_1.3fr] gap-2 sm:gap-6 p-5 bg-zinc-900/20">
                <p className="text-sm font-semibold text-zinc-200">{t.choice}</p>
                <p className="text-sm text-fg-muted leading-relaxed">{t.cost}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section number={num()} label="Outcomes" title="What it delivered">
          <div className="grid gap-4 sm:grid-cols-2">
            {study.outcomes.map((o) => (
              <div key={o.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                <h3 className="font-semibold text-zinc-100 mb-2">{o.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{o.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <section aria-labelledby="my-role" className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h2 id="my-role" className="text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-4">
              My role
            </h2>
            <ul className="space-y-2.5">
              {study.myRole.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                  <ArrowRight className="w-3.5 h-3.5 mt-1 shrink-0 text-zinc-600" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-4">Scope notes</h2>
            <ul className="space-y-2.5">
              {study.scopeNotes.map((s) => (
                <li key={s} className="text-sm text-fg-muted leading-relaxed">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="flex flex-wrap gap-2">
          {study.tags.map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 font-mono border border-zinc-700/50">
              {t}
            </span>
          ))}
        </footer>

        {next && (
          <Link
            href={`/case-studies/${next.slug}`}
            className="group block rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 hover:border-zinc-600 transition-colors"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-2">Next case study</p>
            <p className="text-xl font-bold text-white mb-1">{next.title}</p>
            <p className="text-sm text-fg-muted mb-4">{next.summary}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-200">
              Read it <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </span>
          </Link>
        )}
      </article>
    </div>
  );
}
