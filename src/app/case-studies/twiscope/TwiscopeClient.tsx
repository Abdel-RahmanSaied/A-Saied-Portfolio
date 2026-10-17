"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, ExternalLink, ChevronLeft, Users, Zap, TrendingUp, Database, Server, Cloud } from "lucide-react";
import Link from "next/link";
import GlowCard from "@/components/GlowCard";

// ── Shared helpers ───────────────────────────────────────────
function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-snug mr-[0.22em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "105%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.045, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <motion.p
      className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4 flex items-center gap-2"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <span className="text-zinc-800">{number}</span>
      {label}
    </motion.p>
  );
}

function DecisionCard({ number, title, body, delay = 0 }: { number: string; title: string; body: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <GlowCard className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300">
        <div className="flex items-start gap-4">
          <span className="text-xs font-black text-zinc-700 shrink-0 mt-0.5 font-mono">{number}</span>
          <div>
            <h4 className="font-semibold text-zinc-200 text-sm mb-2">{title}</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">{body}</p>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

// ── Pipeline diagram ─────────────────────────────────────────
const pipelineNodes = [
  { label: "Data Ingestion", sub: "Twitter/X · Telegram · RSS feeds · Webhooks", icon: <Database className="w-4 h-4" /> },
  { label: "Celery Workers", sub: "Distributed async task processing across multiple workers", icon: <Zap className="w-4 h-4" /> },
  { label: "Redis", sub: "Message broker + hot-path cache for frequent queries", icon: <Server className="w-4 h-4" /> },
  { label: "Django REST API", sub: "Business logic, authentication, data enrichment", icon: <Cloud className="w-4 h-4" /> },
  { label: "Dashboard + Real-time Alerts", sub: "WebSocket-powered live updates, <2s delivery", icon: <TrendingUp className="w-4 h-4" /> },
];

function PipelineDiagram() {
  return (
    <div className="space-y-2">
      {/* Main pipeline */}
      {pipelineNodes.map((node, i) => (
        <div key={node.label}>
          <motion.div
            className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300"
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
          >
            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 shrink-0">{node.icon}</div>
            <div>
              <p className="font-semibold text-zinc-200 text-sm">{node.label}</p>
              <p className="text-xs text-zinc-600 mt-0.5">{node.sub}</p>
            </div>
            {/* ML branch marker on Celery node */}
            {i === 1 && (
              <div className="ml-auto flex items-center gap-2 text-xs text-zinc-700">
                <span className="border border-zinc-800 rounded px-2 py-0.5 font-mono">+ ML Engine</span>
              </div>
            )}
          </motion.div>
          {i < pipelineNodes.length - 1 && (
            <motion.div
              className="flex justify-start pl-6 py-1 text-zinc-800"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 + 0.1, duration: 0.3 }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          )}
        </div>
      ))}

      {/* ML engine callout */}
      <motion.div
        className="mt-4 ml-16 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/30 border-dashed"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.45 }}
      >
        <p className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-1">ML Engine (async)</p>
        <p className="text-xs text-zinc-600">
          Trend prediction · Anomaly detection · Runs as Celery tasks — never in the request cycle
        </p>
      </motion.div>
    </div>
  );
}

const inView = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export default function TwiscopeCaseStudy() {
  const outcomes = [
    { icon: <TrendingUp className="w-5 h-5" />, value: "5M+",  label: "Data points processed daily", sub: "Without queue backlog" },
    { icon: <Zap className="w-5 h-5" />,         value: "25%",  label: "Latency reduction",            sub: "Via Redis hot-path caching" },
    { icon: <Database className="w-5 h-5" />,    value: "4–6h", label: "Earlier trend detection",      sub: "vs. manual monitoring" },
    { icon: <Users className="w-5 h-5" />,       value: "<2s",  label: "Alert delivery time",          sub: "End-to-end latency" },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 space-y-28">

        {/* ── Back ────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-300 transition-colors group">
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            All case studies
          </Link>
        </motion.div>

        {/* ── Hero ────────────────────────────────────────────── */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600 border border-zinc-800 px-3 py-1 rounded-full">
                OSINT Analytics Platform
              </span>
              <span className="text-xs text-zinc-700">· 8 min read</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
              Building Twiscope
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-10">
              How I designed and led the development of a real-time social intelligence platform
              that processes 5M+ data points daily — with ML-driven trend detection and sub-second alerting.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="https://twiscope.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Live Platform
              </a>
              <span className="text-xs text-zinc-700">Role: Senior Engineer & Team Lead · 2024 – Present · ASAS IT</span>
            </div>
          </motion.div>
        </section>

        {/* ── The Problem ─────────────────────────────────────── */}
        <section>
          <SectionLabel number="01" label="The Problem" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            <WordReveal text="Intelligence teams drown in signal noise." />
          </h2>

          <div className="space-y-4 text-zinc-500 text-sm leading-relaxed">
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
              Modern intelligence operations require tracking thousands of signals across social media simultaneously.
              The challenge isn&apos;t ingestion — platforms provide APIs. The challenge is making the firehose actionable.
            </motion.p>
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ ...inView, show: { ...inView.show, transition: { delay: 0.1, duration: 0.55 } } }}>
              Raw social data arrives in bursts, often millions of events per day. Without a processing layer
              that can keep up in real-time, analysts are always looking at stale data. And without ML models
              that understand context, every spike looks the same — noise and signal are indistinguishable.
            </motion.p>
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ ...inView, show: { ...inView.show, transition: { delay: 0.2, duration: 0.55 } } }}>
              The team had a working prototype but it couldn&apos;t handle the volume. At peak loads, the queue
              fell behind, alerts arrived hours late, and the ML inference ran synchronously in the request
              cycle — killing API response times.
            </motion.p>
          </div>

          <motion.div
            className="mt-8 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">Core requirements</p>
            <ul className="space-y-2">
              {[
                "Process 5M+ social data events per day without queue backlog",
                "Deliver alerts in under 2 seconds from event occurrence",
                "Run ML inference (trend + anomaly) without blocking API responses",
                "Scale horizontally as data volume grows",
              ].map((req, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 text-xs text-zinc-500"
                  initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  <ArrowRight className="w-3 h-3 text-zinc-700 mt-0.5 shrink-0" /> {req}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* ── Architecture ─────────────────────────────────────── */}
        <section>
          <SectionLabel number="02" label="Architecture" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            <WordReveal text="Five layers. One clear data flow." />
          </h2>
          <motion.p
            className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-xl"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
          >
            The system was redesigned around a clear separation of concerns: ingest, queue, process, serve, visualize.
          </motion.p>

          <PipelineDiagram />
        </section>

        {/* ── Key Decisions ────────────────────────────────────── */}
        <section>
          <SectionLabel number="03" label="Key Decisions" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            <WordReveal text="What we chose and why." />
          </h2>

          <div className="space-y-3">
            <DecisionCard
              number="01"
              title="Celery over threading or asyncio"
              body="Celery tasks are retryable, distributable across multiple machines, and integrate natively with Django. Threading breaks under high concurrency; asyncio requires rewriting the entire Django stack. Celery gave us horizontal scale without changing the existing codebase."
              delay={0}
            />
            <DecisionCard
              number="02"
              title="Redis as both broker and cache"
              body="Rather than running a separate RabbitMQ instance for the broker and Memcached for caching, Redis handled both. This reduced infrastructure complexity and ops overhead. The 25% latency reduction came from caching frequent query patterns in Redis — no DB hit for hot paths."
              delay={0.07}
            />
            <DecisionCard
              number="03"
              title="ML inference as async Celery tasks, never in-request"
              body="Running ML models synchronously in the request cycle is the classic mistake. A 300ms inference call turns every API response into a 300ms+ wait. Moving ML to async Celery tasks kept API p95 latency predictable at under 50ms, while inference ran on dedicated workers."
              delay={0.14}
            />
            <DecisionCard
              number="04"
              title="WebSocket for real-time dashboard, not polling"
              body="Long-polling the API for new alerts would mean 1–10 second delays depending on poll interval. WebSocket connections gave us a push model — when the Django API processes a new alert, it pushes immediately. This is how we hit the <2 second delivery target."
              delay={0.21}
            />
          </div>
        </section>

        {/* ── Outcomes ─────────────────────────────────────────── */}
        <section>
          <SectionLabel number="04" label="Outcomes" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            <WordReveal text="Numbers that moved the business." />
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {outcomes.map((o, i) => (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.48 }}
              >
                <GlowCard className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300">
                  <div className="text-zinc-600 mb-3">{o.icon}</div>
                  <div className="text-3xl font-black text-white mb-1">{o.value}</div>
                  <p className="text-sm font-medium text-zinc-300 mb-0.5">{o.label}</p>
                  <p className="text-xs text-zinc-600">{o.sub}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Leadership ──────────────────────────────────────── */}
        <section>
          <SectionLabel number="05" label="Leadership & Team" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            <WordReveal text="Engineering the team, not just the system." />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <Users className="w-4 h-4" />, title: "Mentorship", body: "Coached junior engineers on distributed systems, async patterns, and production debugging. Pair-reviewed complex Celery tasks until the patterns clicked." },
              { icon: <Zap className="w-4 h-4" />,   title: "Security-First", body: "Enforced authenticated endpoints, encrypted data at rest, and regular dependency audits. Security was a gate, not an afterthought." },
              { icon: <TrendingUp className="w-4 h-4" />, title: "Alignment", body: "Translated technical constraints into product trade-offs for non-technical stakeholders. Kept ML feature scope realistic given inference infrastructure cost." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                whileHover={{ y: -2 }}
              >
                <div className="text-zinc-600 mb-3">{item.icon}</div>
                <h4 className="font-semibold text-zinc-200 text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section>
          <motion.div
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 md:p-10 text-center"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">Next</p>
            <h3 className="text-xl font-bold text-white mb-2">Read the Fendix case study</h3>
            <p className="text-zinc-500 text-sm mb-6">How one insight — both scanners must agree — cut false positives by ~70%.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/case-studies/fendix">
                <motion.button
                  className="flex items-center gap-2 px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold rounded-xl transition-colors"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                >
                  Fendix Case Study <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link href="/case-studies">
                <motion.button
                  className="flex items-center gap-2 px-6 py-2.5 border border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-zinc-200 text-sm font-semibold rounded-xl transition-all"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                >
                  All case studies
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
