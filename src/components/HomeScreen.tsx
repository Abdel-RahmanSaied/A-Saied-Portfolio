"use client";

import { motion } from "framer-motion";
import {
  ArrowRight, Github, Linkedin, Mail, MessageCircleMore, Twitter,
  Shield, Database, Server, Cloud, ExternalLink, ChevronDown,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import GlowCard from "./GlowCard";
import AnimatedNumber from "./AnimatedNumber";
import { career } from "@/lib/career";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const NetworkCanvas = dynamic(() => import("./NetworkCanvas"), { ssr: false });

// ── Word-by-word reveal ──────────────────────────────────────
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

// ── Tech marquee (decorative) ────────────────────────────────
const MARQUEE_ITEMS = [
  "Python", "Django", "FastAPI", "Celery", "PostgreSQL", "PostGIS", "Redis",
  "Elasticsearch", "Kong", "AWS", "Docker", "Go", "SAST", "DAST", "CI/CD",
];

function TechMarquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div aria-hidden="true" className="overflow-hidden py-5 border-y border-zinc-800/40 select-none">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600">
            {item}
            <span className="ml-10 text-zinc-700">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-2">
      <span aria-hidden="true" className="text-zinc-600 mr-2">{number}</span>
      {label}
    </p>
  );
}

// ── Variants ─────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const inView = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const primaryBtn =
  "inline-flex items-center justify-center gap-2 px-7 py-3 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold rounded-xl transition-all duration-200 hover:-translate-y-px active:scale-[0.98]";
const secondaryBtn =
  "inline-flex items-center justify-center gap-2 px-7 py-3 border border-zinc-700/60 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:bg-zinc-800/40 hover:-translate-y-px active:scale-[0.98]";

export default function HomeScreen() {
  const featured = projects.filter((p) => p.featured);

  const services = [
    { icon: <Server className="w-5 h-5" />,   title: "Distributed backend systems", desc: "Django/DRF and FastAPI services, Celery pipelines, data models, and APIs built for operational load." },
    { icon: <Database className="w-5 h-5" />, title: "Search, data & AI services",  desc: "Elasticsearch, PostgreSQL/PostGIS, and retrieval-augmented analytics wired into real products." },
    { icon: <Cloud className="w-5 h-5" />,    title: "Product architecture",        desc: "Service boundaries, gateways, payments and third-party integrations, deployment flow, and failure handling." },
    { icon: <Shield className="w-5 h-5" />,   title: "Technical leadership",        desc: "Architecture reviews, code review, planning, and mentoring across backend, frontend, mobile, AI, and QA." },
  ];

  const socials = [
    { icon: <Github className="w-4 h-4" />,            href: site.social.github,               label: "GitHub" },
    { icon: <Linkedin className="w-4 h-4" />,          href: site.social.linkedin,             label: "LinkedIn" },
    { icon: <Twitter className="w-4 h-4" />,           href: site.social.x,                    label: "X" },
    { icon: <Mail className="w-4 h-4" />,              href: `mailto:${site.email}`,           label: "Email" },
    { icon: <MessageCircleMore className="w-4 h-4" />, href: site.social.whatsapp,             label: "WhatsApp" },
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-5 sm:px-6 overflow-hidden">
        <NetworkCanvas />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center py-16"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700/60 bg-zinc-900/70 backdrop-blur-sm text-zinc-300 text-xs font-medium">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to Senior Backend, Technical Lead, and Staff-level roles
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.02] mb-5 text-white"
          >
            Abdel-Rahman
            <br />
            <span className="text-zinc-400">Saied</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-xs sm:text-sm font-semibold text-zinc-300 uppercase tracking-[0.2em] mb-6"
          >
            {career.headline}
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={3}
            className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-10"
          >
            I build Python backends and multi-service platforms — APIs, async pipelines, search, payments,
            and integrations — and lead the cross-functional team that ships them, while staying close to
            the code and production.
          </motion.p>

          <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-3 justify-center mb-9">
            <Link href="/case-studies" className={primaryBtn}>
              Read the case studies <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/lets-talk" className={secondaryBtn}>
              Discuss a role
            </Link>
          </motion.div>

          <motion.ul variants={fadeUp} custom={5} className="flex gap-3 justify-center mb-14">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex p-2.5 rounded-lg border border-zinc-700/50 hover:border-zinc-500 text-zinc-400 hover:text-zinc-100 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} custom={6} aria-hidden="true" className="flex flex-col items-center gap-1.5 text-zinc-600">
            <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <TechMarquee />

      {/* ── Operating model ───────────────────────────────────── */}
      <section className="py-24 sm:py-28 px-5 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent" />
        <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
          <GlowCard className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/90 shadow-2xl shadow-black/60" glowSize={620}>
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff0d,transparent_34%),radial-gradient(circle_at_85%_20%,#ffffff12,transparent_26%),radial-gradient(circle_at_15%_90%,#22c55e12,transparent_24%)] pointer-events-none" />
            <div className="relative grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-7 sm:p-10 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-7">
                    <span aria-hidden="true" className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.8)]" />
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-fg-muted">How I work</p>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.03] tracking-tight mb-6">
                    Build systems the team can trust under pressure.
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
                    My best work sits at the boundary between product and infrastructure: turning ambiguous
                    requirements into service boundaries, queues, data models, observability, and delivery
                    habits that hold up as usage grows.
                  </p>
                </div>
                <ul className="mt-9 flex flex-wrap gap-2">
                  {["Reliability first", "Observable by default", "Simple under pressure", "Hands-on leadership"].map((principle) => (
                    <li key={principle} className="px-3 py-1.5 rounded-full border border-zinc-700/70 bg-zinc-900/80 text-xs font-semibold text-zinc-300">
                      {principle}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative border-t lg:border-t-0 lg:border-l border-zinc-800 bg-zinc-900/30 p-7 sm:p-10 md:p-12">
                <ol className="space-y-3">
                  {[
                    { icon: <Server className="w-4 h-4" />,   title: "Own the boundary",      body: "APIs, domains, queues, permissions" },
                    { icon: <Database className="w-4 h-4" />, title: "Measure the system",    body: "Latency, queue depth, errors, cost" },
                    { icon: <Cloud className="w-4 h-4" />,    title: "Simplify operations",   body: "Deployments, runbooks, recovery paths" },
                    { icon: <Shield className="w-4 h-4" />,   title: "Lead through evidence", body: "Reviews, incidents, trade-offs, docs" },
                  ].map((item) => (
                    <li
                      key={item.title}
                      className="group flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 hover:border-zinc-600 hover:bg-zinc-900/80 transition-colors duration-300"
                    >
                      <div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-zinc-300 group-hover:text-white group-hover:bg-zinc-700 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-200">{item.title}</h3>
                        <p className="text-xs text-fg-muted mt-0.5">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <Link
                  href="/engineering-philosophy"
                  className="group mt-7 inline-flex w-full items-center justify-between rounded-2xl border border-zinc-700 bg-zinc-100 px-5 py-3 text-sm font-bold text-zinc-950 hover:bg-white transition-colors"
                >
                  Read the full philosophy
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </section>

      {/* ── Highlights ────────────────────────────────────────── */}
      <section aria-label="Highlights" className="py-14 px-5 sm:px-6 border-t border-zinc-800/40">
        <dl className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {career.highlights.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="text-xs text-fg-muted font-medium uppercase tracking-wider leading-snug">{s.label}</dt>
              <dd className="text-3xl sm:text-4xl font-black text-white mb-1">
                <AnimatedNumber value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Featured work ─────────────────────────────────────── */}
      <section className="py-24 px-5 sm:px-6 border-t border-zinc-800/40">
        <div className="max-w-5xl mx-auto">
          <motion.div className="mb-12 flex items-end justify-between gap-4" initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
            <div>
              <SectionLabel number="01" label="Featured work" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                <WordReveal text="Systems I lead, build, and own" />
              </h2>
            </div>
            <Link href="/portfolio" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-zinc-200 transition-colors group">
              All projects <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </motion.div>

          <div className="space-y-4">
            {featured.map((p) => (
              <GlowCard key={p.slug} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70 transition-colors duration-300">
                <article className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-1">
                      {p.tagline} · {p.engagement === "Independent" ? "Independent" : p.engagement}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-5">{p.description}</p>
                    <ul className="flex flex-wrap gap-2" aria-label="Technology">
                      {p.techStack.map((t) => (
                        <li key={t} className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 font-mono border border-zinc-700/50">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap lg:flex-col gap-2.5 lg:shrink-0">
                    {p.caseStudy && (
                      <Link
                        href={p.caseStudy}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" /> Case study
                      </Link>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /> Website
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <Github className="w-3.5 h-3.5" aria-hidden="true" /> Source
                      </a>
                    )}
                  </div>
                </article>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── All work ──────────────────────────────────────────── */}
      <section className="py-24 px-5 sm:px-6 border-t border-zinc-800/40">
        <div className="max-w-5xl mx-auto">
          <motion.div className="mb-12 flex items-end justify-between gap-4" initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
            <div>
              <SectionLabel number="02" label="All work" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                <WordReveal text="Across five domains" />
              </h2>
            </div>
            <Link href="/portfolio" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-zinc-200 transition-colors group">
              Full details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </motion.div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={p.caseStudy ?? "/portfolio"}
                  className="group flex h-full items-start justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors duration-300"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-fg-faint mb-2">
                      {p.category} · {p.engagement}
                    </p>
                    <h3 className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors mb-1">{p.title}</h3>
                    <p className="text-xs text-fg-muted">{p.tagline}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 mt-1 shrink-0 text-zinc-600 group-hover:text-zinc-200 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Expertise ─────────────────────────────────────────── */}
      <section className="py-24 px-5 sm:px-6 border-t border-zinc-800/40">
        <div className="max-w-5xl mx-auto">
          <motion.div className="mb-12" initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
            <SectionLabel number="03" label="Expertise" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <WordReveal text="Where I create leverage" />
            </h2>
          </motion.div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s) => (
              <li key={s.title}>
                <GlowCard className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors duration-300 h-full">
                  <div aria-hidden="true" className="p-2.5 rounded-xl bg-zinc-800 inline-flex mb-4 text-zinc-300">{s.icon}</div>
                  <h3 className="font-semibold text-zinc-100 text-sm mb-2">{s.title}</h3>
                  <p className="text-xs text-fg-muted leading-relaxed">{s.desc}</p>
                </GlowCard>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Stack ─────────────────────────────────────────────── */}
      <section className="py-24 px-5 sm:px-6 border-t border-zinc-800/40">
        <div className="max-w-5xl mx-auto">
          <motion.div className="mb-12" initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
            <SectionLabel number="04" label="Stack" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <WordReveal text="Technologies I work with" />
            </h2>
          </motion.div>

          <dl className="space-y-5">
            {career.skills.map((group) => (
              <div key={group.label} className="flex flex-col sm:flex-row sm:items-start gap-3">
                <dt className="text-xs font-semibold uppercase tracking-widest text-fg-faint sm:w-40 shrink-0 sm:pt-2">{group.label}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((t) => (
                      <li key={t} className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-300 text-sm font-medium">
                        {t}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-28 sm:py-32 px-5 sm:px-6 border-t border-zinc-800/40">
        <motion.div className="max-w-2xl mx-auto text-center" initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
          <SectionLabel number="05" label="Let's work together" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 mt-2">Hiring for senior backend leadership?</h2>
          <p className="text-zinc-400 mb-10 leading-relaxed max-w-lg mx-auto text-sm">
            I&apos;m best suited to roles where backend architecture, hands-on delivery, and team leadership
            have to move together.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/lets-talk" className={primaryBtn}>Discuss a role</Link>
            <Link href="/resume" className={secondaryBtn}>View the résumé</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
