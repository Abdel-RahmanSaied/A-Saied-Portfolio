"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, ExternalLink, ChevronLeft, Users, Zap, MapPin, Database, Server, Cloud, Wifi } from "lucide-react";
import Link from "next/link";
import GlowCard from "@/components/GlowCard";

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

const archNodes = [
  { label: "Client · Driver · Admin Apps", sub: "Role-based entry points with separate permission scopes", icon: <Users className="w-4 h-4" /> },
  { label: "Django REST API", sub: "Business logic, authentication (Knox), data validation", icon: <Server className="w-4 h-4" /> },
  { label: "PostGIS + PostgreSQL", sub: "Geospatial routing, region management, trip records", icon: <MapPin className="w-4 h-4" /> },
  { label: "Redis + Celery", sub: "Message broker, async task queue, hot-path caching", icon: <Database className="w-4 h-4" /> },
  { label: "WebSocket Layer", sub: "Real-time trip tracking pushed to client and driver apps", icon: <Wifi className="w-4 h-4" /> },
];

function ArchDiagram() {
  return (
    <div className="space-y-2">
      {archNodes.map((node, i) => (
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
            {i === 3 && (
              <div className="ml-auto flex items-center gap-2 text-xs text-zinc-700">
                <span className="border border-zinc-800 rounded px-2 py-0.5 font-mono">+ AWS S3</span>
              </div>
            )}
          </motion.div>
          {i < archNodes.length - 1 && (
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
      <motion.div
        className="mt-4 ml-16 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/30 border-dashed"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.45 }}
      >
        <p className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-1">AWS S3 (async)</p>
        <p className="text-xs text-zinc-600">Media storage — driver documents, profile images — handled as Celery tasks, never blocking the request cycle</p>
      </motion.div>
    </div>
  );
}

const inView = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export default function MuriCaseStudy() {
  const outcomes = [
    { icon: <Users className="w-5 h-5" />,   value: "3",       label: "User roles in one system",       sub: "Client · Driver · Admin — fully isolated permissions" },
    { icon: <MapPin className="w-5 h-5" />,   value: "PostGIS", label: "Geospatial engine",              sub: "Region-aware routing with native geo-query performance" },
    { icon: <Wifi className="w-5 h-5" />,     value: "<1s",     label: "Trip status update delivery",    sub: "WebSocket push vs. polling" },
    { icon: <Cloud className="w-5 h-5" />,    value: "2",       label: "Languages supported",            sub: "Full Arabic and English localization (i18n)" },
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
                Mobility & Trip Management
              </span>
              <span className="text-xs text-zinc-700">· 9 min read</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">Building MURI</h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-10">
              How I architected a multi-role transportation platform with geospatial routing, real-time trip
              tracking, and package-based subscription management — deployed and live at muri.sa.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a href="https://muri.sa/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Live Platform
              </a>
              <span className="text-xs text-zinc-700">Role: Backend Engineer & Team Lead · ASAS IT</span>
            </div>
          </motion.div>
        </section>

        {/* ── The Problem ── */}
        <section>
          <SectionLabel number="01" label="The Problem" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            <WordReveal text="Three user types. One coherent system." />
          </h2>
          <div className="space-y-4 text-zinc-500 text-sm leading-relaxed">
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
              Transportation platforms look simple on the surface — a passenger books, a driver accepts, the trip happens.
              The complexity is in the seams: how do you give three completely different user types — clients, drivers,
              and administrators — a single backend that enforces the right rules for each without tangling the logic?
            </motion.p>
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ ...inView, show: { ...inView.show, transition: { delay: 0.1, duration: 0.55 } } }}>
              MURI added a further dimension: subscription packages. Clients don&apos;t pay per trip — they buy packages.
              This means trip availability is gated by subscription state, expiry, and remaining quota — all of which
              must be checked atomically to avoid race conditions when two requests arrive simultaneously.
            </motion.p>
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ ...inView, show: { ...inView.show, transition: { delay: 0.2, duration: 0.55 } } }}>
              And throughout, the system needs to answer geographic questions in real time: which drivers are within range?
              What regions are serviced? What is the estimated route? A plain latitude/longitude column in PostgreSQL
              cannot answer these efficiently at scale.
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
                "Isolated permission scopes for clients, drivers, and administrators",
                "Geospatial queries for driver availability and region management",
                "Subscription-gated trip booking with atomic quota checks",
                "Real-time trip status pushed to both client and driver without polling",
                "Full Arabic and English localization across all user-facing content",
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
            <WordReveal text="Five layers. Role-aware at every level." />
          </h2>
          <motion.p className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-xl"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
            The system is organized into modular Django apps — one per role and concern — sharing a single
            PostGIS-enabled database with a clear async layer for tasks and real-time updates.
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
            <DecisionCard number="01" title="PostGIS over plain lat/lng columns"
              body="Storing coordinates as two float columns works until you need to query 'find all drivers within 5km'. That query becomes a full table scan with manual Haversine math. PostGIS gives us native spatial indexes, proximity queries in a single SQL call, and region polygon support — all without a separate geospatial service."
              delay={0} />
            <DecisionCard number="02" title="Modular app structure by role, not by feature"
              body="The alternative — a single 'users' model with a role field — leads to spaghetti permissions. Separating client, driver, and administrator into distinct Django apps meant each had its own serializers, viewsets, and permission classes. Onboarding a new role never touches existing code."
              delay={0.07} />
            <DecisionCard number="03" title="WebSocket push for trip tracking"
              body="Polling every 2 seconds for driver location means 30 requests per minute per active trip. At modest scale this becomes expensive. WebSocket connections stay open for the duration of the trip, pushing location updates server-side. Driver location is updated via Celery → Redis → WebSocket channel group."
              delay={0.14} />
            <DecisionCard number="04" title="Atomic subscription quota checks with Redis locks"
              body="When two concurrent requests try to book the last trip in a subscription package, a naive check-then-decrement approach creates a race condition. Redis distributed locks ensure the quota check and decrement happen atomically — one request wins, the other gets a clear 'quota exhausted' response."
              delay={0.21} />
          </div>
        </section>

        {/* ── Outcomes ── */}
        <section>
          <SectionLabel number="04" label="Outcomes" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            <WordReveal text="A system built to scale with the market." />
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
            <WordReveal text="What made this hard." />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <MapPin className="w-4 h-4" />, title: "Geospatial complexity", body: "PostGIS documentation is dense. Getting spatial indexes right for proximity queries took iteration — the wrong index type caused slow queries under load that only surfaced in staging." },
              { icon: <Zap className="w-4 h-4" />,    title: "Real-time consistency", body: "Keeping trip state in sync between client, driver, and admin views required careful ordering of WebSocket events. We built an event log to replay missed updates on reconnection." },
              { icon: <Users className="w-4 h-4" />,  title: "Permission surface area", body: "Multi-role systems have a large permission surface. We built a custom permission matrix tested with over 50 test cases covering edge conditions — an admin shouldn't be able to create a trip as a client." },
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
            <h3 className="text-xl font-bold text-white mb-2">Read the Hayyak case study</h3>
            <p className="text-zinc-500 text-sm mb-6">How I integrated Opera PMS and dual payment gateways into a multi-tenant hotel system.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/case-studies/hayyak">
                <motion.button className="flex items-center gap-2 px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold rounded-xl transition-colors"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  Hayyak Case Study <ArrowRight className="w-4 h-4" />
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
