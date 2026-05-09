"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Code, GraduationCap, Mail, Linkedin,
  Star, ArrowRight, Zap, Target, Users, TrendingUp, Download,
} from "lucide-react";
import Link from "next/link";
import GlowCard from "@/components/GlowCard";

const timelineData = [
  {
    date: "2024 – Present",
    title: "Senior Software Engineer – Team Lead",
    company: "ASAS IT",
    icon: <Users className="w-4 h-4" />,
    details: [
      "Engineered Twiscope — social intelligence platform ingesting 5M+ data points/day across 5 networks using Django, Celery, and Redis",
      "Architected Sanad AI (FastAPI + OpenAI + Elasticsearch) for real-time insight and anomaly surfacing inside Twiscope",
      "Built MURI — multi-role transport platform with PostGIS routing, WebSocket live tracking, and role-scoped booking flows",
      "Delivered Hayyak — multi-tenant hotel system with OHIP (Opera PMS) integration, dual payment failover, and Firebase notifications",
      "Shipped Maxpeak — Egypt-to-Saudi talent marketplace with a 3-stage AI vetting pipeline and bilingual UX",
      "Reduced system latency by 25% and deployment cycle time by 40% through CI/CD restructuring and async optimization",
      "Mentored engineers on distributed systems and security-first practices; led weekly architecture reviews",
    ],
  },
  {
    date: "2023 – 2024",
    title: "Senior Software Engineer – Python Developer",
    company: "ASAS IT",
    icon: <Code className="w-4 h-4" />,
    details: [
      "Led Python/Django development across multiple concurrent product streams, owning API design, data modeling, and service boundaries",
      "Drove technical direction aligned with product roadmaps, translating business requirements into scalable architectural decisions",
      "Established code review standards and test coverage gates that reduced production incident rate by 30%",
      "Onboarded junior engineers through structured sessions on Django internals, async task design, and REST best practices",
    ],
  },
  {
    date: "2022 – 2023",
    title: "Software Engineer – Backend Developer",
    company: "ClouDev Solutions",
    icon: <Zap className="w-4 h-4" />,
    details: [
      "Built and maintained REST APIs serving multiple client-facing web and mobile applications using Django and Node.js",
      "Automated AWS operational workflows, eliminating manual steps from deployment and environment provisioning pipelines",
      "Implemented monitoring and alerting that reduced mean time to detection (MTTD) for production incidents",
      "Optimized database queries and caching strategies, cutting p95 API response times measurably",
    ],
  },
  {
    date: "2022 – 2023",
    title: "Software Engineer",
    company: "Prime Consulting Office (PCO)",
    icon: <Target className="w-4 h-4" />,
    details: [
      "Delivered custom backend solutions for clients across retail, logistics, and professional services verticals",
      "Translated client requirements into RESTful API contracts and technical specifications",
      "Operated in short agile cycles, consistently meeting milestone commitments across multi-client engagements",
    ],
  },
  {
    date: "2020 – 2022",
    title: "Software Engineer – Desktop Developer",
    company: "Co-Source",
    icon: <TrendingUp className="w-4 h-4" />,
    details: [
      "Designed and shipped cross-platform desktop applications in Python, owning full SDLC from requirements through production",
      "Built internal tooling that automated repetitive business workflows, reducing manual processing time for end users",
      "Extended and stabilized legacy desktop codebases, improving reliability and shipping new features for enterprise clients",
    ],
  },
];

const skillGroups = [
  { label: "Backend",  items: ["Python", "Django", "FastAPI", "DRF", "Go", "Node.js", "Celery"] },
  { label: "Data",     items: ["PostgreSQL", "Redis", "MongoDB", "Elasticsearch", "PostGIS", "Kibana"] },
  { label: "DevOps",   items: ["Docker", "AWS", "GCP", "Nginx", "CI/CD", "Linux", "GitHub Actions"] },
  { label: "Security", items: ["DAST", "SAST", "SARIF", "Sigstore", "Fendix"] },
  { label: "Mobile",   items: ["Flutter", "Dart", "Firebase"] },
  { label: "Tools",    items: ["Git", "REST APIs", "WebSockets", "Kubernetes"] },
];

// ── Animated counter ─────────────────────────────────────────
function AnimatedCounter({
  end, prefix = "", suffix = "",
}: { end: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref   = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          const duration  = 1500;
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
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </div>
  );
}

const achievements = [
  { icon: <TrendingUp className="w-5 h-5" />, end: 30, suffix: "%", label: "Performance Improvement" },
  { icon: <Zap className="w-5 h-5" />,        end: 40, suffix: "%", label: "Deployment Speedup" },
  { icon: <Target className="w-5 h-5" />,     end: 5,  suffix: "M+", label: "Daily Data Points" },
  { icon: <Star className="w-5 h-5" />,       end: 6,  suffix: "+",  label: "Years Experience" },
];

const inView = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export default function AboutPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div className="relative bg-zinc-950 text-zinc-100 min-h-screen overflow-hidden">
      {/* Ambient cursor light */}
      <div
        className="pointer-events-none fixed w-80 h-80 bg-white/[0.015] rounded-full blur-3xl transition-all duration-700 ease-out"
        style={{ left: mousePos.x - 160, top: mousePos.y - 160 }}
      />

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-24 space-y-24">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <motion.section
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">About</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">Who am I?</h1>
          <p className="text-zinc-500 leading-relaxed mb-10 text-sm sm:text-base">
            I&apos;m{" "}
            <span className="font-semibold text-zinc-200">Abdel-Rahman Mohamed Saied</span> — Senior
            Software Engineer & Team Lead specializing in scalable backend systems, real-time data
            pipelines, and open-source security tooling.
          </p>

          {/* Achievement cards with animated counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {achievements.map((a, i) => (
              <motion.div
                key={a.label}
                className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}
                whileHover={{ y: -3 }}
              >
                <div className="text-zinc-600 flex justify-center mb-2">{a.icon}</div>
                <div className="text-2xl font-black text-white mb-0.5">
                  <AnimatedCounter end={a.end} suffix={a.suffix} />
                </div>
                <div className="text-xs text-zinc-600">{a.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Summary ───────────────────────────────────────────── */}
        <motion.section
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
        >
          <GlowCard className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">Summary</p>
            <h2 className="text-xl font-bold text-white mb-5">Professional Overview</h2>
            <div className="space-y-4 text-zinc-500 leading-relaxed text-sm">
              <p>
                Senior Software Engineer and Team Lead with 6+ years of experience architecting
                production-grade backend systems across seven industries — from social intelligence
                platforms and hospitality management to AI-driven services and cybersecurity tooling.
              </p>
              <p>
                My primary stack is <span className="text-zinc-300 font-medium">Python and Django</span>,
                used to build systems processing 5M+ data points daily, multi-tenant hotel reservations,
                geospatial trip management, and talent marketplace platforms. I also engineer in{" "}
                <span className="text-zinc-300 font-medium">Go</span>, having designed and shipped Fendix
                — an open-source hybrid DAST + SAST API security scanner that reduced false positives by
                ~70% through correlated-findings logic and ships as a single signed binary.
              </p>
              <p>
                As a team lead, I align engineering decisions with business outcomes: improving system
                performance by 30%, cutting deployment cycles by 40%, and integrating ML models for
                real-time trend detection and sentiment analysis. I operate across the full spectrum —
                from API design and async pipelines to cloud infrastructure, security tooling, and
                mobile backends.
              </p>
            </div>
          </GlowCard>
        </motion.section>

        {/* ── Tech Stack ────────────────────────────────────────── */}
        <motion.section
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">Stack</p>
          <h2 className="text-xl font-bold text-white mb-8">Tech Stack & Expertise</h2>

          <div className="space-y-5">
            {skillGroups.map((group, gi) => (
              <motion.div
                key={group.label}
                className="flex flex-col sm:flex-row sm:items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.07, duration: 0.4 }}
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-700 sm:w-20 shrink-0">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((t) => (
                    <motion.span
                      key={t}
                      className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-500 text-sm font-medium hover:border-zinc-600 hover:text-zinc-300 transition-all duration-200 cursor-default"
                      whileHover={{ y: -1, scale: 1.03 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Timeline ──────────────────────────────────────────── */}
        <motion.section
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">Journey</p>
          <h2 className="text-xl font-bold text-white mb-12">Professional Experience</h2>

          <div className="relative">
            <div className="absolute left-5 top-2 bottom-2 w-px bg-zinc-800 hidden sm:block" />
            <div className="space-y-6">
              {timelineData.map((entry, i) => (
                <motion.div
                  key={i}
                  className="sm:pl-16 relative"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                >
                  <div className="absolute left-[18px] top-5 w-3 h-3 rounded-full bg-zinc-700 ring-4 ring-zinc-950 hidden sm:block" />

                  <motion.div
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 hover:border-zinc-700 transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-zinc-800 shrink-0 text-zinc-400">
                        {entry.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-zinc-100 text-sm mb-0.5">{entry.title}</h3>
                        <div className="flex flex-wrap gap-x-3 mb-4 text-xs">
                          <span className="text-zinc-400 font-medium">{entry.company}</span>
                          <span className="text-zinc-700">·</span>
                          <span className="text-zinc-600">{entry.date}</span>
                        </div>
                        <ul className="space-y-1.5">
                          {entry.details.map((d, j) => (
                            <motion.li
                              key={j}
                              className="flex items-start gap-2 text-xs text-zinc-600"
                              initial={{ opacity: 0, x: -6 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.04 * j, duration: 0.35 }}
                            >
                              <ArrowRight className="w-3 h-3 text-zinc-700 mt-0.5 shrink-0" />
                              {d}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Why Me ────────────────────────────────────────────── */}
        <motion.section
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
        >
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">Why Me</p>
            <h2 className="text-xl font-bold text-white mb-7">Why Work With Me?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Proven ability to lead high-impact projects and deliver results under tight deadlines",
                "Strong balance between deep technical excellence and team mentorship",
                "Deep experience with scalable systems, modern DevOps, and cloud infrastructure",
                "Strategic thinker with a hands-on approach to building meaningful software",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-all duration-300"
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                >
                  <Star className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-zinc-500 leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Education ─────────────────────────────────────────── */}
        <motion.section
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
        >
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300">
                <GraduationCap className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">Education</p>
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              Bachelor&apos;s Degree in Computer Science
            </h3>
            <p className="text-zinc-500 font-medium text-sm mb-2">Higher Technological Institute</p>
            <p className="text-zinc-600 text-sm">Graduated with an A+ in final project and overall good grade.</p>
          </div>
        </motion.section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <motion.section
          className="text-center"
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
        >
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-10 md:p-14">
            <h2 className="text-2xl font-bold text-white mb-3">Let&apos;s Connect</h2>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              Open to freelance opportunities, collaborations, or just a good tech conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link href="/lets-talk">
                <motion.button
                  className="flex items-center gap-2 px-7 py-3 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold rounded-xl transition-colors duration-200 w-full sm:w-auto"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                >
                  <Mail className="w-4 h-4" /> Get in Touch
                </motion.button>
              </Link>
              <motion.a
                href="https://www.linkedin.com/in/abdel-rahman-saied"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3 border border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-zinc-200 text-sm font-semibold rounded-xl transition-all duration-200 hover:bg-zinc-800/40 w-full sm:w-auto"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </motion.a>
              <motion.a
                href="/assets/Abdelrahman_Saied_resume.pdf"
                download
                className="flex items-center gap-2 px-7 py-3 border border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-zinc-200 text-sm font-semibold rounded-xl transition-all duration-200 hover:bg-zinc-800/40 w-full sm:w-auto"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              >
                <Download className="w-4 h-4" /> Download CV
              </motion.a>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
