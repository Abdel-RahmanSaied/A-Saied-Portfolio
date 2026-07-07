"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, ExternalLink, ChevronLeft, Building2, CreditCard, Bell, Shield, Database, Server, Wifi } from "lucide-react";
import Link from "next/link";
import GlowCard from "@/components/GlowCard";

function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-snug mr-[0.22em] last:mr-0">
          <motion.span className="inline-block"
            initial={{ y: "105%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.045, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <motion.p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4 flex items-center gap-2"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
      <span className="text-zinc-800">{number}</span>{label}
    </motion.p>
  );
}

function DecisionCard({ number, title, body, delay = 0 }: { number: string; title: string; body: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.5 }}>
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

const archNodes = [
  { label: "Guest Mobile App / Web Interface", sub: "Reservation, check-in, check-out flows — bilingual Arabic & English", icon: <Building2 className="w-4 h-4" /> },
  { label: "Django 5.1 REST API", sub: "Multi-tenant request routing, Knox auth, Swagger-documented endpoints", icon: <Server className="w-4 h-4" /> },
  { label: "Opera PMS (OHIP Integration)", sub: "Two-way sync with hotel property management system via OHIP API", icon: <Database className="w-4 h-4" /> },
  { label: "Payment Gateway Layer", sub: "Tap Payments (primary) + HyperPay (fallback) — PCI-compliant flows", icon: <CreditCard className="w-4 h-4" /> },
  { label: "Firebase + WebSocket Notifications", sub: "Push notifications for booking updates, real-time status changes", icon: <Bell className="w-4 h-4" /> },
];

function ArchDiagram() {
  return (
    <div className="space-y-2">
      {archNodes.map((node, i) => (
        <div key={node.label}>
          <motion.div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300"
            initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45 }}>
            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 shrink-0">{node.icon}</div>
            <div>
              <p className="font-semibold text-zinc-200 text-sm">{node.label}</p>
              <p className="text-xs text-zinc-600 mt-0.5">{node.sub}</p>
            </div>
            {i === 1 && (
              <div className="ml-auto flex items-center gap-2 text-xs text-zinc-700">
                <span className="border border-zinc-800 rounded px-2 py-0.5 font-mono">+ Celery</span>
              </div>
            )}
          </motion.div>
          {i < archNodes.length - 1 && (
            <motion.div className="flex justify-start pl-6 py-1 text-zinc-800"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 + 0.1, duration: 0.3 }}>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          )}
        </div>
      ))}
      <motion.div className="mt-4 ml-16 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/30 border-dashed"
        initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.45 }}>
        <p className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-1">Celery (async)</p>
        <p className="text-xs text-zinc-600">Email confirmations, payment reconciliation, OHIP sync retries — all off the request cycle</p>
      </motion.div>
    </div>
  );
}

const inView = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export default function HayyakCaseStudy() {
  const outcomes = [
    { icon: <Building2 className="w-5 h-5" />,  value: "Multi",  label: "Tenant hotel isolation",      sub: "Each hotel is a fully isolated configuration unit" },
    { icon: <CreditCard className="w-5 h-5" />, value: "2",      label: "Payment gateways integrated",  sub: "Tap Payments + HyperPay with automatic failover" },
    { icon: <Shield className="w-5 h-5" />,     value: "PCI",    label: "Compliant payment flows",      sub: "No card data stored — tokenized transactions only" },
    { icon: <Wifi className="w-5 h-5" />,       value: "Real",   label: "Time reservation updates",     sub: "WebSocket push across guest, staff, and PMS" },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 space-y-28">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-300 transition-colors group">
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            All case studies
          </Link>
        </motion.div>

        {/* ── Hero ── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600 border border-zinc-800 px-3 py-1 rounded-full">
                Hospitality Management Platform
              </span>
              <span className="text-xs text-zinc-700">· 8 min read</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">Building Hayyak</h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-10">
              How I built a multi-tenant hotel management system that integrates with Opera PMS (OHIP),
              processes payments through dual gateways, and delivers real-time reservation updates via Firebase and WebSockets.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-xs text-zinc-700">Role: Backend Engineer & Team Lead · ASAS IT</span>
            </div>
          </motion.div>
        </section>

        {/* ── The Problem ── */}
        <section>
          <SectionLabel number="01" label="The Problem" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            <WordReveal text="Hotels run on fragmented, aging systems." />
          </h2>
          <div className="space-y-4 text-zinc-500 text-sm leading-relaxed">
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
              The hospitality industry is dominated by Opera PMS — a powerful but complex property management system
              that most hotels already run. The challenge isn&apos;t replacing it; it&apos;s integrating with it. OHIP
              (Oracle Hospitality Integration Platform) provides the API layer, but it demands careful handling:
              the sync between your application&apos;s state and the PMS must be reliable, retryable, and never
              leave reservations in an inconsistent state.
            </motion.p>
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ ...inView, show: { ...inView.show, transition: { delay: 0.1, duration: 0.55 } } }}>
              On top of this, Hayyak needed to support multiple hotels as independent tenants — each with its own
              configuration, staff, room inventory, and payment credentials — without any cross-contamination of data.
              And it needed to collect payments through two gateways (Tap Payments for primary, HyperPay as fallback),
              keeping reconciliation clean across both.
            </motion.p>
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ ...inView, show: { ...inView.show, transition: { delay: 0.2, duration: 0.55 } } }}>
              The guest experience layer added another dimension: identity verification at check-in, push notifications
              for every reservation state change, and real-time WebSocket updates for front-desk staff — all while
              maintaining full Arabic and English support.
            </motion.p>
          </div>
          <motion.div className="mt-8 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">Core requirements</p>
            <ul className="space-y-2">
              {[
                "Bidirectional sync with Opera PMS via OHIP API — reliable and retryable",
                "Multi-tenant isolation: each hotel is a fully independent configuration unit",
                "PCI-compliant payment flows through Tap Payments and HyperPay",
                "Guest identity verification at check-in",
                "Real-time push notifications (Firebase) and WebSocket updates for staff",
              ].map((req, i) => (
                <motion.li key={i} className="flex items-start gap-2 text-xs text-zinc-500"
                  initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}>
                  <ArrowRight className="w-3 h-3 text-zinc-700 mt-0.5 shrink-0" /> {req}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* ── Architecture ── */}
        <section>
          <SectionLabel number="02" label="Architecture" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            <WordReveal text="Five layers. Two gateways. One source of truth." />
          </h2>
          <motion.p className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-xl"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
            The system treats Opera PMS as the authoritative record and uses async Celery tasks to keep
            Hayyak&apos;s database in sync — with retry logic for OHIP timeouts and dead-letter queuing for
            failed syncs.
          </motion.p>
          <ArchDiagram />
        </section>

        {/* ── Key Decisions ── */}
        <section>
          <SectionLabel number="03" label="Key Decisions" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            <WordReveal text="What we chose and why." />
          </h2>
          <div className="space-y-3">
            <DecisionCard number="01" title="Per-hotel tenant isolation via database-level config"
              body="Shared-schema multi-tenancy (a hotel_id column on every table) is simpler to build but fails at isolation — a query bug or missing filter leaks data across tenants. We implemented per-tenant configuration objects stored in the database, with middleware that scopes every request to the authenticated hotel's data partition."
              delay={0} />
            <DecisionCard number="02" title="OHIP integration with Celery retry and dead-letter queue"
              body="Opera PMS OHIP has real-world latency and occasional timeouts. Synchronous OHIP calls in the request cycle would make every reservation action unreliable. We moved all OHIP communication to Celery tasks with exponential backoff retry and a dead-letter queue for manual review of persistently failed syncs."
              delay={0.07} />
            <DecisionCard number="03" title="Dual payment gateway with automatic failover"
              body="Tap Payments is the primary gateway for the Saudi market. HyperPay serves as a hot standby. If a Tap Payments request fails with a gateway error (not a card decline), the system transparently retries through HyperPay. Both gateways use tokenized transactions — no card data ever touches our database."
              delay={0.14} />
            <DecisionCard number="04" title="Knox token auth over JWT for mobile clients"
              body="JWT tokens cannot be revoked without a blocklist. For a hospitality app where staff turnover is common and devices get shared, server-side token revocation is a hard requirement. Knox stores tokens in the database, making immediate revocation a single DB delete — clean and auditable."
              delay={0.21} />
          </div>
        </section>

        {/* ── Outcomes ── */}
        <section>
          <SectionLabel number="04" label="Outcomes" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            <WordReveal text="Enterprise-grade hospitality, fully integrated." />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {outcomes.map((o, i) => (
              <motion.div key={o.label}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.48 }}>
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

        {/* ── Challenges ── */}
        <section>
          <SectionLabel number="05" label="Challenges & Lessons" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            <WordReveal text="Where the real complexity lived." />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <Database className="w-4 h-4" />, title: "OHIP state reconciliation", body: "OHIP can return stale state during high load. We built a reconciliation job that runs nightly, comparing Hayyak's reservation records against OHIP's source of truth and flagging discrepancies for manual review." },
              { icon: <CreditCard className="w-4 h-4" />, title: "Payment reconciliation", body: "Two gateways mean two transaction logs. Building a unified reconciliation view that correctly attributes each transaction — handling partial refunds, gateway retries, and currency rounding — was the hardest accounting problem in the project." },
              { icon: <Shield className="w-4 h-4" />, title: "Identity verification at scale", body: "Guest identity verification (ID scan at check-in) needed to be fast enough to not slow hotel front desks. We offloaded verification to an async background task with an optimistic 'pending verification' state shown immediately." },
            ].map((item, i) => (
              <motion.div key={item.title}
                className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-all duration-300"
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                whileHover={{ y: -2 }}>
                <div className="text-zinc-600 mb-3">{item.icon}</div>
                <h4 className="font-semibold text-zinc-200 text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section>
          <motion.div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 md:p-10 text-center"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">Next</p>
            <h3 className="text-xl font-bold text-white mb-2">Read the Maxpeak case study</h3>
            <p className="text-zinc-500 text-sm mb-6">How a 3-stage AI vetting pipeline solved the Egypt-to-Saudi talent trust problem.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/case-studies/maxpeak">
                <motion.button className="flex items-center gap-2 px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold rounded-xl transition-colors"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  Maxpeak Case Study <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link href="/case-studies">
                <motion.button className="flex items-center gap-2 px-6 py-2.5 border border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-zinc-200 text-sm font-semibold rounded-xl transition-all"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
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
