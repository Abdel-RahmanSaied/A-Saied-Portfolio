import Link from "next/link";
import { ArrowRight, BookOpen, Gauge, Lock, Network, ShieldCheck, Users } from "lucide-react";

export const metadata = {
  title: "Engineering Philosophy | Abdel-Rahman Saied",
  description:
    "How Abdel-Rahman Saied approaches reliable backend systems, observability, scaling, security, product impact, and hands-on technical leadership.",
};

const principles = [
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Reliability first",
    body: "The best architecture is the one users can depend on during peak load, partial failure, and ordinary maintenance. I design around clear ownership, graceful degradation, predictable recovery, and boring operational paths.",
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    title: "Observability before optimization",
    body: "Before tuning a system, I want traces, metrics, logs, and product signals that explain where time is spent and what users experience. Guesswork is expensive; visibility compounds.",
  },
  {
    icon: <Network className="w-5 h-5" />,
    title: "Simple systems over clever systems",
    body: "Cleverness usually moves cost from implementation to operations. I prefer explicit service boundaries, readable data flows, conservative dependencies, and abstractions that earn their place.",
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    title: "Measure before scaling",
    body: "Scale decisions should come from evidence: throughput, p95 latency, queue depth, error budgets, cost curves, and user impact. Premature scale adds complexity without buying reliability.",
  },
  {
    icon: <ArrowRight className="w-5 h-5" />,
    title: "Product impact over tech hype",
    body: "AI, distributed systems, and platform work only matter when they improve a real workflow. I tie technical choices to faster decisions, better reliability, lower cost, or clearer customer value.",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Security and privacy by design",
    body: "Security is not a release checklist. It belongs in API design, data modeling, access control, logging strategy, dependency management, and the defaults engineers use every day.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Hands-on leadership",
    body: "Technical leadership works best when strategy and implementation stay connected. I lead architecture reviews, mentor engineers, unblock hard decisions, and still inspect the code paths that carry risk.",
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "Documentation as a scaling tool",
    body: "Good documentation reduces meetings, onboarding time, and hidden tribal knowledge. I document decisions, runbooks, contracts, and trade-offs so teams can move without waiting for one person.",
  },
];

export default function EngineeringPhilosophyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <section className="mb-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">
            Engineering Philosophy
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
            Build systems that are
            <br />
            <span className="text-zinc-500">clear, reliable, and useful.</span>
          </h1>
          <p className="text-zinc-500 leading-relaxed text-sm sm:text-base max-w-2xl">
            My strongest work sits between backend architecture, AI infrastructure, product
            ownership, and technical leadership. These are the principles I use when designing
            production systems and leading teams through hard trade-offs.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-300"
            >
              <div className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 inline-flex mb-5">
                {principle.icon}
              </div>
              <h2 className="text-base font-bold text-white mb-3">{principle.title}</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">{principle.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">
            How this shows up
          </p>
          <h2 className="text-2xl font-bold text-white mb-4">From architecture review to production outcome.</h2>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl mb-7">
            I look for the smallest design that can meet the product goal, the observability needed
            to operate it, the security posture it requires, and the team habits that keep it healthy
            after launch.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold rounded-xl transition-colors"
            >
              Read Case Studies <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/lets-talk"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-zinc-200 text-sm font-semibold rounded-xl transition-all hover:bg-zinc-800/40"
            >
              Discuss Technical Lead Roles
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
