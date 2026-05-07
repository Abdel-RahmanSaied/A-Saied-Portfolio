"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Github, Linkedin, Mail, MessageCircleMore,
  Shield, Database, Server, Cloud, ExternalLink, ChevronDown,
  Building2, Car, BarChart3, Lock, BrainCircuit, Briefcase, Smartphone, Terminal,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import GlowCard from "./GlowCard";

const NetworkCanvas = dynamic(() => import("./NetworkCanvas"), { ssr: false });

// ── Rotating role text ───────────────────────────────────────
const ROLES = ["Backend Architect", "Team Lead", "Security Engineer", "Data Engineer"];

function RotatingRole() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-block relative h-5 overflow-hidden align-bottom" style={{ minWidth: 165 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          className="absolute left-0 top-0 whitespace-nowrap"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {ROLES[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ── Animated counter ─────────────────────────────────────────
function AnimatedCounter({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref   = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          const duration  = 1600;
          const startTime = performance.now();
          const tick = (now: number) => {
            const p  = Math.min((now - startTime) / duration, 1);
            const ep = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(ep * end));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

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

// ── Tech marquee ─────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "Python", "Django", "Go", "FastAPI", "PostgreSQL", "Redis",
  "Docker", "AWS", "Kubernetes", "Celery", "Next.js", "TypeScript",
  "DAST", "SAST", "CI/CD", "Linux", "Elasticsearch", "WebSockets",
];

function TechMarquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden py-5 border-y border-zinc-800/40 select-none">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-[11px] font-semibold uppercase tracking-widest text-zinc-700">
            {item}
            <span className="ml-10 text-zinc-800">·</span>
          </span>
        ))}
      </motion.div>
    </div>
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

export default function HomeScreen() {

  const stats = [
    { end: 6,  prefix: "",  suffix: "+",  label: "Years Experience" },
    { end: 10, prefix: "",  suffix: "+",  label: "Systems Shipped" },
    { end: 5,  prefix: "",  suffix: "M+", label: "Data Points / Day" },
    { end: 70, prefix: "~", suffix: "%",  label: "Noise Reduction" },
    { end: 5,  prefix: "",  suffix: "+",  label: "Industries" },
  ];

  const featuredProjects = [
    {
      tag: "OSINT Analytics Platform",
      title: "Twiscope",
      description:
        "Multi-platform OSINT system monitoring Twitter/X, Instagram, TikTok, Google, and news — 5M+ data points daily. ML-driven sentiment analysis, influencer tracking, real-time alerts, and subscription management.",
      metrics: ["5M+ data points/day", "5 platforms", "ML sentiment"],
      tech: ["Python", "Django", "Celery", "Redis", "AWS", "ML"],
      live: "https://twiscope.net/",
      caseStudy: "/case-studies/twiscope",
    },
    {
      tag: "API Security Scanner",
      title: "Fendix",
      description:
        "Open-source hybrid DAST + SAST scanner. Correlated findings cut false positives ~70% — only alerts when both engines independently agree. Single Go binary, SARIF export, zero telemetry.",
      metrics: ["~70% fewer false positives", "15+ vuln categories", "Zero telemetry"],
      tech: ["Go", "Next.js", "TypeScript", "Docker"],
      github: "https://github.com/Abdel-RahmanSaied/Fendix",
      live: "https://fendix.dev",
      caseStudy: "/case-studies/fendix",
    },
  ];

  const services = [
    { icon: <Server className="w-5 h-5" />,   title: "Backend Engineering", desc: "Scalable Python & Django APIs handling millions of daily operations" },
    { icon: <Database className="w-5 h-5" />, title: "Data Engineering",    desc: "High-throughput pipelines, real-time analytics, and ML integration" },
    { icon: <Cloud className="w-5 h-5" />,    title: "DevOps & Cloud",      desc: "AWS, Docker, Nginx, CI/CD — faster deploys, fewer incidents" },
    { icon: <Shield className="w-5 h-5" />,   title: "Security Tooling",    desc: "DAST + SAST scanning with correlated findings and zero noise" },
  ];

  const techGroups = [
    { label: "Backend",  items: ["Python", "Django", "FastAPI", "DRF", "Node.js"] },
    { label: "Data",     items: ["PostgreSQL", "Redis", "MongoDB", "Celery", "Elasticsearch"] },
    { label: "DevOps",   items: ["Docker", "AWS", "GCP", "Nginx", "CI/CD", "Kubernetes"] },
    { label: "Security", items: ["Go", "DAST", "SAST", "SARIF", "GitHub Actions"] },
    { label: "Mobile",   items: ["Flutter", "Dart", "Firebase"] },
  ];

  const industries = [
    { icon: <BarChart3 className="w-5 h-5" />,    label: "Social Intelligence", note: "Twiscope" },
    { icon: <Lock className="w-5 h-5" />,          label: "Cybersecurity",        note: "Fendix" },
    { icon: <Briefcase className="w-5 h-5" />,     label: "Talent & HR",          note: "Maxpeak" },
    { icon: <BrainCircuit className="w-5 h-5" />,  label: "AI / ML",              note: "Sanad AI" },
    { icon: <Car className="w-5 h-5" />,           label: "Transportation",        note: "MURI" },
    { icon: <Building2 className="w-5 h-5" />,     label: "Hospitality",          note: "Hayyak" },
    { icon: <Smartphone className="w-5 h-5" />,    label: "Mobile",               note: "Check-In, Gymawy" },
  ];

  const allProjects = [
    { title: "Twiscope",            tagline: "OSINT Analytics Platform",          category: "Analytics", live: "https://twiscope.net/",   tech: ["Django", "Celery", "Redis", "AWS"] },
    { title: "Fendix",              tagline: "Hybrid DAST + SAST Scanner",        category: "Security",  live: "https://fendix.dev",       tech: ["Go", "Docker", "SARIF"] },
    { title: "Maxpeak",             tagline: "Elite Talent Marketplace",           category: "Backend",   live: "http://maxpeak.net/",      tech: ["Django 4.2", "React 18", "Redis"] },
    { title: "Sanad AI",            tagline: "Twiscope AI Assistant",             category: "AI / ML",   live: undefined,                  tech: ["FastAPI", "OpenAI", "Elasticsearch"] },
    { title: "MURI",                tagline: "Mobility & Trip Platform",          category: "Backend",   live: "https://muri.sa/",         tech: ["Django", "PostGIS", "Celery"] },
    { title: "Check-In",            tagline: "Attendance & Check-In System",      category: "Mobile",    live: "https://check-in.sa/",     tech: ["Flutter", "Dart"] },
    { title: "Hayyak",              tagline: "Hotel Management & Reservation",    category: "Backend",   live: undefined,                  tech: ["Django 5.1", "Opera PMS", "Celery"] },
    { title: "Shmoos",              tagline: "Accommodation System Integration",  category: "Backend",   live: undefined,                  tech: ["FastAPI", "GCP", "Docker"] },
    { title: "ElevenLabs Dubbing",  tagline: "AI Voice Dubbing Service",          category: "AI / ML",   live: undefined,                  tech: ["Django", "ElevenLabs API", "Redis"] },
    { title: "Gymawy",              tagline: "Fitness Mobile App",                category: "Mobile",    live: undefined,                  tech: ["Flutter", "Django REST", "Firebase"] },
  ];

  const socials = [
    { icon: <Github className="w-4 h-4" />,            href: "https://github.com/Abdel-RahmanSaied",           label: "GitHub" },
    { icon: <Linkedin className="w-4 h-4" />,          href: "https://www.linkedin.com/in/abdel-rahman-saied", label: "LinkedIn" },
    { icon: <Mail className="w-4 h-4" />,              href: "mailto:abdelrahman.saied@asasit.com",            label: "Email" },
    { icon: <MessageCircleMore className="w-4 h-4" />, href: "https://wa.me/966558046143",                     label: "WhatsApp" },
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <NetworkCanvas />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700/60 bg-zinc-900/70 backdrop-blur-sm text-zinc-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to new opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.02] mb-4 text-white"
          >
            Abdel-Rahman
            <br />
            <span className="text-zinc-400">Saied</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-xs font-semibold text-zinc-600 uppercase tracking-[0.22em] mb-6 flex items-center justify-center gap-2 flex-wrap"
          >
            Senior Software Engineer
            <span className="text-zinc-800">·</span>
            <RotatingRole />
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={3}
            className="text-base sm:text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed mb-10"
          >
            I build scalable backend systems, real-time data pipelines, and security tools —
            software that handles millions of operations daily.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={4}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-9"
          >
            <Link href="/portfolio">
              <motion.button
                className="flex items-center justify-center gap-2 px-7 py-3 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold rounded-xl transition-colors duration-200 w-full sm:w-auto"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                View My Work <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link href="/lets-talk">
              <motion.button
                className="flex items-center justify-center gap-2 px-7 py-3 border border-zinc-700/60 hover:border-zinc-500 text-zinc-400 hover:text-zinc-100 text-sm font-semibold rounded-xl transition-all duration-200 hover:bg-zinc-800/40 backdrop-blur-sm w-full sm:w-auto"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Let&apos;s Talk
              </motion.button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} custom={5} className="flex gap-3 justify-center mb-16">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-zinc-700/50 hover:border-zinc-500 text-zinc-600 hover:text-zinc-200 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800 transition-all duration-200"
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={6}
            className="flex flex-col items-center gap-1.5 text-zinc-700"
          >
            <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Marquee ───────────────────────────────────────────── */}
      <TechMarquee />

      {/* ── Manifesto ─────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-zinc-700 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Philosophy
          </motion.p>
          <blockquote className="text-2xl sm:text-3xl md:text-[2.5rem] font-bold text-zinc-300 leading-tight">
            <WordReveal
              text="The best systems are invisible to the user and exhausting for the attacker."
              className="text-zinc-300"
            />
          </blockquote>
          <motion.p
            className="mt-8 text-sm text-zinc-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            — What I optimize for in every system I architect.
          </motion.p>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-zinc-800/40">
        <div className="max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-5 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="text-3xl sm:text-4xl font-black text-white mb-1 tabular-nums">
                <AnimatedCounter end={s.end} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="text-xs text-zinc-600 font-medium uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-zinc-800/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-12 flex items-end justify-between"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-2">
                <span className="text-zinc-800 mr-2">01</span>Featured Work
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                <WordReveal text="Projects I've built & shipped" />
              </h2>
            </div>
            <Link href="/portfolio" className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-300 transition-colors group">
              All projects <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="space-y-4">
            {featuredProjects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
              >
                <GlowCard className="rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-300 group">
                  <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <div className="absolute top-0 left-0 right-0 h-px bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-t-2xl" />
                    <div className="relative p-7 sm:p-8 flex flex-col lg:flex-row lg:items-start gap-7">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-1">{p.tag}</p>
                        <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed mb-5">{p.description}</p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {p.metrics.map((m) => (
                            <span key={m} className="text-xs px-3 py-1 rounded-full border border-zinc-800 text-zinc-400 bg-zinc-900">
                              {m}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {p.tech.map((t) => (
                            <motion.span
                              key={t}
                              className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-500 font-mono border border-zinc-700/50 hover:border-zinc-500 hover:text-zinc-300 transition-all duration-200"
                              whileHover={{ y: -1 }}
                            >
                              {t}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      <div className="flex lg:flex-col gap-2.5 shrink-0">
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold transition-colors whitespace-nowrap"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Live Site
                        </a>
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 text-xs font-semibold transition-all whitespace-nowrap"
                          >
                            <Github className="w-3.5 h-3.5" /> Source
                          </a>
                        )}
                        <Link href={p.caseStudy}>
                          <span className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-600 text-zinc-600 hover:text-zinc-300 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer">
                            <ArrowRight className="w-3.5 h-3.5" /> Case Study
                          </span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </GlowCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-6 sm:hidden"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            <Link href="/portfolio">
              <span className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-300 transition-colors duration-200 cursor-pointer group">
                View all projects <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Industries ────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-zinc-800/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-10"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-2">
              <span className="text-zinc-800 mr-2">02</span>Sectors
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <WordReveal text="Industries I've built for" />
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.label}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 text-center group"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                whileHover={{ y: -3 }}
              >
                <div className="text-zinc-600 group-hover:text-zinc-300 transition-colors duration-200">
                  {ind.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors leading-tight mb-1">{ind.label}</p>
                  <p className="text-[10px] text-zinc-700 leading-tight">{ind.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Projects ──────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-zinc-800/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-12 flex items-end justify-between"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-2">
                <span className="text-zinc-800 mr-2">03</span>All Work
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                <WordReveal text="Every system I've shipped" />
              </h2>
            </div>
            <Link href="/portfolio" className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-300 transition-colors group">
              Full details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allProjects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
              >
                <GlowCard className="rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 group h-full">
                  <div className="p-5 flex items-start justify-between gap-4 h-full">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-700 border border-zinc-800 px-2 py-0.5 rounded-full">
                          {p.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors mb-1">{p.title}</h3>
                      <p className="text-xs text-zinc-600 mb-3">{p.tagline}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech.map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-600 font-mono border border-zinc-700/40">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 p-2 rounded-lg border border-zinc-800 text-zinc-700 hover:border-zinc-600 hover:text-zinc-300 transition-all duration-200 mt-0.5"
                        aria-label={`Visit ${p.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Source ───────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-zinc-800/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
          >
            <GlowCard className="rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 group" glowSize={500}>
              <div className="p-8 sm:p-10 flex flex-col lg:flex-row items-start gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
                      <Lock className="w-4 h-4 text-zinc-300" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">Open Source</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Fendix — Free, Open, Zero Telemetry</h2>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-5 max-w-xl">
                    A hybrid DAST + SAST API security scanner that only fails your build when both engines agree on the same vulnerability.
                    Single binary. No phone-home. Signed releases via Sigstore. Installable in 30 seconds.
                  </p>
                  <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 font-mono text-xs text-zinc-400 w-fit mb-5 group/code hover:border-zinc-700 transition-colors">
                    <Terminal className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                    <span>brew tap Abdel-RahmanSaied/fendix <span className="text-zinc-700">&amp;&amp;</span> brew install fendix</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Go", "Docker", "SARIF", "Sigstore", "Homebrew", "GitHub Actions"].map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-500 font-mono border border-zinc-700/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex lg:flex-col gap-2.5 shrink-0">
                  <a
                    href="https://fendix.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold transition-colors whitespace-nowrap"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live Site
                  </a>
                  <a
                    href="https://github.com/Abdel-RahmanSaied/Fendix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 text-xs font-semibold transition-all whitespace-nowrap"
                  >
                    <Github className="w-3.5 h-3.5" /> Source
                  </a>
                  <Link href="/case-studies/fendix">
                    <span className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-600 text-zinc-600 hover:text-zinc-300 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer">
                      <ArrowRight className="w-3.5 h-3.5" /> Case Study
                    </span>
                  </Link>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-zinc-800/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-12"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-2">
              <span className="text-zinc-800 mr-2">04</span>Expertise
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <WordReveal text="What I do" />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.48 }}
              >
                <GlowCard className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 group h-full">
                  <motion.div
                    className="p-2.5 rounded-xl bg-zinc-800 group-hover:bg-zinc-700 inline-flex mb-4 text-zinc-300 transition-colors duration-200"
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {s.icon}
                  </motion.div>
                  <h3 className="font-semibold text-zinc-100 text-sm mb-2">{s.title}</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">{s.desc}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-zinc-800/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-12"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-2">
              <span className="text-zinc-800 mr-2">05</span>Stack
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <WordReveal text="Technologies I work with" />
            </h2>
          </motion.div>

          <div className="space-y-5">
            {techGroups.map((group, gi) => (
              <motion.div
                key={group.label}
                className="flex flex-col sm:flex-row sm:items-center gap-3"
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.08, duration: 0.45 }}
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-700 sm:w-20 shrink-0">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((t, ti) => (
                    <motion.span
                      key={t}
                      className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-500 text-sm font-medium hover:border-zinc-600 hover:text-zinc-300 transition-all duration-200 cursor-default"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.08 + ti * 0.04, duration: 0.35 }}
                      whileHover={{ y: -2, scale: 1.04 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-32 px-6 border-t border-zinc-800/40">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">
              <span className="text-zinc-800 mr-2">06</span>Let&apos;s work together
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
              Got a project in mind?
            </h2>
            <p className="text-zinc-500 mb-10 leading-relaxed max-w-lg mx-auto text-sm">
              Whether it&apos;s scaling a backend, leading a team, or shipping a security-first tool —
              I&apos;m ready to help you build it right.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/lets-talk">
                <motion.button
                  className="px-8 py-3 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold rounded-xl transition-colors duration-200 w-full sm:w-auto"
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get in Touch
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  className="px-8 py-3 border border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-zinc-200 text-sm font-semibold rounded-xl transition-all duration-200 hover:bg-zinc-800/40 w-full sm:w-auto"
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  About Me
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
