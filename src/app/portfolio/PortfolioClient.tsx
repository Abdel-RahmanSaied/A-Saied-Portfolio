"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import GlowCard from "@/components/GlowCard";

type Project = {
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  image?: string;
  github?: string;
  live?: string;
  category: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Twiscope",
    tagline: "OSINT Analytics Platform",
    description:
      "Multi-platform social intelligence system processing 5M+ data points daily across Twitter/X, Instagram, TikTok, Google, and news sources. Features influencer monitoring, ML-driven sentiment analysis, real-time trend alerts, subscription/payment management, and a dual frontend — Angular for the main app and React for 3D data visualization.",
    techStack: ["Python", "Django", "Celery", "Redis", "AWS", "Angular", "React", "ML"],
    live: "https://twiscope.net/",
    category: "Analytics",
    featured: true,
    image: "/assets/twiscope-logo.png",
  },
  {
    title: "Fendix",
    tagline: "API Security Scanner",
    description:
      "Open-source hybrid DAST + SAST scanner. Correlated findings cut false positives ~70% — only alerts when both engines independently agree. Ships as a single Go binary with SARIF export and signed releases.",
    techStack: ["Go", "Next.js", "TypeScript", "Docker", "GitHub Actions"],
    github: "https://github.com/Abdel-RahmanSaied/Fendix",
    live: "https://fendix.dev",
    category: "Security",
    featured: true,
  },
  {
    title: "Maxpeak",
    tagline: "Elite Talent Marketplace",
    description:
      "Curated hiring platform connecting Saudi companies with vetted Egyptian engineers through a rigorous 3-stage AI-powered vetting process. Bilingual (Arabic/English), with in-app chat, analytics dashboards, payment billing, and a quality-guarantee — free replacement if the hire doesn't meet expectations.",
    techStack: ["Django 4.2", "React 18", "TypeScript", "PostgreSQL", "Redis", "Nginx"],
    live: "http://maxpeak.net/",
    category: "Backend",
  },
  {
    title: "Sanad AI",
    tagline: "Twiscope AI Assistant",
    description:
      "Official AI assistant engine of the Twiscope platform — built on FastAPI with OpenAI integration and async SQS-based message processing. Elasticsearch powers intelligent search and analytics; Kibana and Prometheus/Grafana provide full-stack observability across all AI workloads.",
    techStack: ["FastAPI", "OpenAI", "AWS SQS", "Elasticsearch", "PostgreSQL", "Redis", "Kibana"],
    category: "AI / ML",
  },
  {
    title: "MURI",
    tagline: "Student Transportation Platform",
    description:
      "Student transportation platform serving three roles — client, driver, and admin — each with a dedicated app (Flutter Student & Driver apps, Angular 19 admin dashboard). Modular Django API with PostGIS geospatial routing, package-based subscriptions, HyperPay payments, driver wallet accounting, Firebase push, and real-time trip tracking.",
    techStack: ["Django 4.2", "Flutter", "Angular 19", "PostGIS", "Redis", "Celery", "HyperPay", "Firebase", "PostgreSQL", "AWS S3"],
    live: "https://muri.sa/",
    category: "Backend",
  },
  {
    title: "Check-In App",
    tagline: "Attendance & Check-In System",
    description:
      "Mobile attendance solution with QR-based check-ins, real-time presence tracking, and administrative reporting — built end-to-end with Flutter and Dart.",
    techStack: ["Flutter", "Dart"],
    live: "https://check-in.sa/",
    category: "Mobile",
  },
  {
    title: "Hayyak",
    tagline: "Hospitality Management Platform",
    description:
      "Enterprise multi-tenant hotel management and reservation system integrating with Opera PMS (OHIP) and dual payment gateways (Tap Payments + HyperPay). Full guest lifecycle from booking to check-out, with identity verification, Firebase push notifications, real-time WebSocket updates, and bilingual Arabic/English support.",
    techStack: ["Django 5.1", "Opera PMS", "Tap Payments", "HyperPay", "Celery", "Firebase", "WebSockets", "PostgreSQL"],
    category: "Backend",
  },
  {
    title: "Shmoos",
    tagline: "Accommodation System Integration",
    description:
      "FastAPI adapter for the Shomoos Saudi accommodation management system — exposing a clean REST layer over the Shomoos API for guest and visitor lifecycle management. Features automatic retry with exponential backoff, standardized response formatting, comprehensive logging, and Swagger UI docs. Deployed on GCP.",
    techStack: ["FastAPI", "GCP", "Python", "Docker", "Swagger"],
    category: "Backend",
  },
  {
    title: "ElevenLabs Dubbing",
    tagline: "AI Voice Dubbing Service",
    description:
      "Automated video dubbing pipeline powered by ElevenLabs API. Handles multi-language voice synthesis with async task queuing, orchestrating end-to-end audio replacement workflows.",
    techStack: ["Django", "ElevenLabs API", "Redis", "Celery", "Python"],
    category: "AI / ML",
  },
  {
    title: "Gymawy",
    tagline: "Fitness Mobile App",
    description:
      "Cross-platform fitness app with custom workout plans, real-time progress tracking, and push notifications. Flutter frontend backed by Django REST Framework and Firebase.",
    techStack: ["Flutter", "Django REST Framework", "Firebase", "Dart"],
    category: "Mobile",
  },
];

const stats = [
  { value: "10+",  label: "Production Systems" },
  { value: "5M+",  label: "Data Points / Day" },
  { value: "~70%", label: "False Positive Reduction" },
  { value: "5+",   label: "Industries Served" },
];

// ── 3D tilt card wrapper ─────────────────────────────────────
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref      = useRef<HTMLDivElement>(null);
  const rawX     = useMotionValue(0);
  const rawY     = useMotionValue(0);
  const springX  = useSpring(rawX, { stiffness: 200, damping: 22 });
  const springY  = useSpring(rawY, { stiffness: 200, damping: 22 });
  const rotateX  = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY  = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const onLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [selected, setSelected] = useState("All");
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered   = selected === "All" ? projects : projects.filter((p) => p.category === selected);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">

        {/* Header */}
        <motion.div
          className="mb-14 max-w-2xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">Work</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">My Projects</h1>
          <p className="text-zinc-500 leading-relaxed text-sm">
            Production systems, open-source tools, and shipped products — built for scale and reliability.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45 }}
        >
          <div className="inline-flex gap-1 p-1 rounded-xl border border-zinc-800 bg-zinc-900/50">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selected === cat
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            className="grid grid-cols-1 gap-4"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {filtered.map((project, i) => (
              <TiltCard key={project.title}>
                <GlowCard className="rounded-2xl h-full">
                <motion.article
                  className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-300 h-full"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  {/* Faint bg image */}
                  {project.image && (
                    <div className="absolute inset-0 pointer-events-none">
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500"
                      />
                    </div>
                  )}

                  {/* Glow on top edge on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                  <div className="relative p-7 sm:p-8 h-full flex flex-col">
                    {project.featured && (
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 border border-amber-400/20 bg-amber-400/6 px-2.5 py-1 rounded-full">
                          <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                          Featured
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col flex-1 lg:flex-row lg:items-start gap-6">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-1">{project.tagline}</p>
                        <h2 className="text-lg font-bold text-white mb-3">{project.title}</h2>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-5">{project.description}</p>

                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((t) => (
                            <span
                              key={t}
                              className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-500 font-mono border border-zinc-700/50 hover:border-zinc-600 hover:text-zinc-300 transition-all duration-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex lg:flex-col gap-2.5 shrink-0 mt-auto lg:mt-0">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-500 text-xs font-semibold hover:border-zinc-500 hover:text-zinc-200 transition-all whitespace-nowrap"
                          >
                            <Github className="w-3.5 h-3.5" /> Source
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold transition-colors whitespace-nowrap"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Live
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
                </GlowCard>
              </TiltCard>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className="text-center py-8 px-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-all duration-300"
              whileHover={{ y: -3 }}
            >
              <div className="text-3xl font-black text-white mb-1.5">{s.value}</div>
              <p className="text-xs text-zinc-600 font-medium uppercase tracking-wider">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
