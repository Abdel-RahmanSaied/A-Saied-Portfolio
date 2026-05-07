"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, TrendingUp } from "lucide-react";
import Link from "next/link";
import GlowCard from "@/components/GlowCard";

const cases = [
  {
    slug: "twiscope",
    category: "OSINT Analytics Platform",
    title: "Twiscope",
    description:
      "How I architected a real-time social intelligence platform from the ground up — handling 5M+ data points daily with ML-driven trend detection and sub-second alerting.",
    icon: <TrendingUp className="w-5 h-5" />,
    stats: [
      { value: "5M+",  label: "Data points / day" },
      { value: "25%",  label: "Latency reduction" },
      { value: "5",    label: "Platforms" },
      { value: "<2s",  label: "Alert delivery" },
    ],
    tags: ["Python", "Django", "Celery", "Redis", "AWS", "ML"],
    readTime: "8 min read",
  },
  {
    slug: "fendix",
    category: "API Security Scanner",
    title: "Fendix",
    description:
      "Why existing security scanners generate too much noise — and how a single insight (both DAST and SAST must agree) cut false positives by ~70% in an open-source Go tool.",
    icon: <Shield className="w-5 h-5" />,
    stats: [
      { value: "~70%", label: "False positive reduction" },
      { value: "15+",  label: "Vulnerability categories" },
      { value: "1",    label: "Go binary" },
      { value: "0",    label: "Telemetry" },
    ],
    tags: ["Go", "DAST", "SAST", "SARIF", "Docker", "GitHub Actions"],
    readTime: "7 min read",
  },
  {
    slug: "muri",
    category: "Mobility & Trip Management",
    title: "MURI",
    description:
      "How I designed a multi-role transportation platform with geospatial routing via PostGIS, real-time WebSocket trip tracking, and subscription-gated booking — deployed and live at muri.sa.",
    icon: <ArrowRight className="w-5 h-5" />,
    stats: [
      { value: "3",       label: "User roles" },
      { value: "PostGIS", label: "Geo engine" },
      { value: "<1s",     label: "Trip updates" },
      { value: "2",       label: "Languages" },
    ],
    tags: ["Django", "PostGIS", "Redis", "Celery", "WebSockets", "AWS S3"],
    readTime: "9 min read",
  },
  {
    slug: "hayyak",
    category: "Hospitality Management",
    title: "Hayyak",
    description:
      "How I integrated Opera PMS (OHIP) and dual payment gateways into a multi-tenant hotel management system — with PCI-compliant flows, Firebase push, and real-time WebSocket updates.",
    icon: <Shield className="w-5 h-5" />,
    stats: [
      { value: "Multi", label: "Tenant isolation" },
      { value: "2",     label: "Payment gateways" },
      { value: "PCI",   label: "Compliant flows" },
      { value: "OHIP",  label: "PMS integrated" },
    ],
    tags: ["Django 5.1", "Opera PMS", "Tap Payments", "HyperPay", "Firebase", "Celery"],
    readTime: "8 min read",
  },
  {
    slug: "maxpeak",
    category: "Talent Marketplace",
    title: "Maxpeak",
    description:
      "How a 3-stage AI vetting pipeline solved the Egypt-to-Saudi talent trust problem — connecting elite engineers with Saudi companies through verified, guaranteed hiring.",
    icon: <TrendingUp className="w-5 h-5" />,
    stats: [
      { value: "3",    label: "Vetting stages" },
      { value: "AI",   label: "Powered screening" },
      { value: "2",    label: "Markets served" },
      { value: "100%", label: "Replacement guarantee" },
    ],
    tags: ["Django 4.2", "React 18", "TypeScript", "PostgreSQL", "Redis"],
    readTime: "7 min read",
  },
];

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
            transition={{ delay: i * 0.04, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const inView = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">

        {/* Header */}
        <motion.div
          className="mb-20 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">Case Studies</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
            How the systems
            <br />
            <span className="text-zinc-500">were built.</span>
          </h1>
          <p className="text-zinc-500 leading-relaxed text-sm max-w-lg">
            Not just what was built — the problems, the trade-offs, the architecture decisions,
            and the outcomes. Two projects. Full depth.
          </p>
        </motion.div>

        {/* Case study cards */}
        <div className="space-y-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlowCard className="rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 group" glowSize={400}>
                <Link href={`/case-studies/${c.slug}`}>
                  <motion.div
                    className="p-8 sm:p-10 cursor-pointer"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-4 mb-8">
                      <div>
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                            {c.icon}
                          </div>
                          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">{c.category}</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{c.title}</h2>
                        <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">{c.description}</p>
                      </div>
                      <motion.div
                        className="hidden sm:flex items-center gap-1.5 text-zinc-700 group-hover:text-zinc-300 transition-colors shrink-0 pt-1"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-xs font-semibold uppercase tracking-widest">Read</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-5 rounded-xl border border-zinc-800/60 bg-zinc-900/30">
                      {c.stats.map((s) => (
                        <div key={s.label} className="text-center">
                          <div className="text-xl font-black text-white mb-0.5">{s.value}</div>
                          <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tags + read time */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {c.tags.map((t) => (
                          <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-500 font-mono border border-zinc-700/50">
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-zinc-700 shrink-0">{c.readTime}</span>
                    </div>
                  </motion.div>
                </Link>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          className="mt-20 text-center"
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
        >
          <Link href="/portfolio" className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-300 transition-colors group">
            View all 10 projects <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
