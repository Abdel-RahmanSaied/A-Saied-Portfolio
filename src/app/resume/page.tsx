"use client";

import { motion } from "framer-motion";
import { Download, Mail, Linkedin, Github, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

const inView = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

const experience = [
  {
    title: "Senior Software Engineer — Team Lead",
    company: "ASAS IT",
    period: "2024 – Present",
    highlights: [
      "Engineered Twiscope — a social intelligence platform ingesting 5M+ data points/day across 5 major social networks using Django, Celery, and Redis pipelines",
      "Architected Sanad AI — a FastAPI + OpenAI + Elasticsearch assistant that surfaces real-time insights and anomaly alerts within the Twiscope ecosystem",
      "Built MURI — a multi-role transportation platform featuring PostGIS geospatial routing, WebSocket live tracking, and role-scoped booking flows for riders, drivers, and admins",
      "Delivered Hayyak — a multi-tenant hotel management system integrating Opera PMS (OHIP) via Celery retry queues with DLQ fallback, dual payment gateway failover, and Firebase push notifications",
      "Shipped Maxpeak — an Egypt-to-Saudi talent marketplace with a 3-stage AI vetting pipeline, bilingual (AR/EN) UX, and a contractual quality-replacement guarantee",
      "Reduced system latency by 25% and cut deployment cycle time by 40% through CI/CD restructuring and async task optimization",
      "Mentored engineers on distributed systems design, async patterns, and security-first practices; led weekly architecture reviews",
    ],
  },
  {
    title: "Senior Software Engineer — Python Developer",
    company: "ASAS IT",
    period: "2023 – 2024",
    highlights: [
      "Led Python/Django backend development across multiple concurrent product streams, owning API design, data modeling, and service boundaries",
      "Drove technical direction in alignment with product roadmaps, translating business requirements into scalable architectural decisions",
      "Established code review standards and automated test coverage gates, reducing production incident rate by 30%",
      "Onboarded and ramped up junior engineers through structured technical sessions on Django internals, async task design, and REST best practices",
    ],
  },
  {
    title: "Software Engineer — Backend Developer",
    company: "ClouDev Solutions",
    period: "2022 – 2023",
    highlights: [
      "Built and maintained REST APIs serving multiple client-facing web and mobile applications using Django and Node.js",
      "Automated cloud operational workflows on AWS, eliminating manual steps from deployment and environment provisioning pipelines",
      "Implemented proactive monitoring and alerting that reduced mean time to detection (MTTD) for production incidents",
      "Optimized database queries and caching strategies, contributing to measurable reductions in p95 API response times",
    ],
  },
  {
    title: "Software Engineer",
    company: "Prime Consulting Office (PCO)",
    period: "2022 – 2023",
    highlights: [
      "Delivered custom backend solutions for consulting clients across retail, logistics, and professional services verticals",
      "Translated client business requirements into RESTful API contracts and technical specifications",
      "Operated in short agile cycles, consistently meeting milestone commitments across multi-client engagements",
    ],
  },
  {
    title: "Software Engineer — Desktop Developer",
    company: "Co-Source",
    period: "2020 – 2022",
    highlights: [
      "Designed and shipped cross-platform desktop applications in Python, owning the full SDLC from requirements through production deployment",
      "Built internal tooling that automated repetitive business workflows, reducing manual processing time for end users",
      "Extended and stabilized legacy desktop codebases, improving reliability and shipping new features for enterprise clients",
    ],
  },
];

const skills: { label: string; items: string[] }[] = [
  { label: "Languages",  items: ["Python", "Go", "Dart", "TypeScript", "SQL"] },
  { label: "Backend",    items: ["Django", "FastAPI", "DRF", "Node.js", "Celery"] },
  { label: "Data",       items: ["PostgreSQL", "Redis", "MongoDB", "Elasticsearch", "PostGIS", "Kibana"] },
  { label: "DevOps",     items: ["Docker", "AWS", "GCP", "Nginx", "CI/CD", "GitHub Actions", "Linux"] },
  { label: "Security",   items: ["DAST", "SAST", "SARIF", "Sigstore"] },
  { label: "Mobile",     items: ["Flutter", "Firebase"] },
];

const projects = [
  { name: "Twiscope",  desc: "5M+ data points/day social intelligence platform",       live: "https://twiscope.net/" },
  { name: "Fendix",    desc: "Open-source hybrid DAST + SAST API scanner — ~70% fewer false positives", live: "https://fendix.dev", github: "https://github.com/Abdel-RahmanSaied/Fendix" },
  { name: "MURI",      desc: "Multi-role transportation platform with PostGIS routing", live: "https://muri.sa/" },
  { name: "Maxpeak",   desc: "Egypt→Saudi talent marketplace with 3-stage AI vetting", live: "http://maxpeak.net/" },
  { name: "Check-In",  desc: "Mobile attendance system — Flutter & Dart",              live: "https://check-in.sa/" },
];

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">

        {/* ── Header ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">Resume</p>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 leading-tight">Abdel-Rahman<br />Saied</h1>
              <p className="text-zinc-400 font-medium text-sm">Senior Software Engineer · Team Lead</p>
            </div>
            <a
              href="/assets/Abdelrahman_Saied_resume.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold transition-colors shrink-0 self-start"
            >
              <Download className="w-4 h-4" /> Download PDF
            </a>
          </div>

          {/* Contact strip */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-500">
            <a href="mailto:abdelrahman.saied@asasit.com" className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors">
              <Mail className="w-3.5 h-3.5" /> abdelrahman.saied@asasit.com
            </a>
            <a href="https://www.linkedin.com/in/abdel-rahman-saied" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors">
              <Linkedin className="w-3.5 h-3.5" /> linkedin.com/in/abdel-rahman-saied
            </a>
            <a href="https://github.com/Abdel-RahmanSaied" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors">
              <Github className="w-3.5 h-3.5" /> github.com/Abdel-RahmanSaied
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Egypt · Open to remote & relocation
            </span>
          </div>
        </motion.div>

        <div className="space-y-16">

          {/* ── Summary ── */}
          <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4 pb-2 border-b border-zinc-800">Summary</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Senior Software Engineer and Team Lead with 6+ years of experience architecting production-grade backend
              systems across seven industries — social intelligence, hospitality, transportation, cybersecurity, AI/ML,
              talent marketplaces, and mobile. Primary stack is Python and Django; also engineers in Go (Fendix — open-source
              DAST + SAST scanner) and Flutter. Proven track record leading teams, reducing latency by 25%, cutting deployment
              cycles by 40%, and shipping systems that handle millions of daily operations.
            </p>
          </motion.section>

          {/* ── Experience ── */}
          <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-6 pb-2 border-b border-zinc-800">Experience</h2>
            <div className="space-y-8">
              {experience.map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="font-semibold text-zinc-100 text-sm">{job.title}</h3>
                      <p className="text-zinc-500 text-xs font-medium">{job.company}</p>
                    </div>
                    <span className="text-xs text-zinc-600 shrink-0">{job.period}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {job.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-zinc-500">
                        <ArrowRight className="w-3 h-3 text-zinc-700 mt-0.5 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── Skills ── */}
          <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-6 pb-2 border-b border-zinc-800">Skills</h2>
            <div className="space-y-3">
              {skills.map((group, i) => (
                <motion.div
                  key={group.label}
                  className="flex flex-col sm:flex-row sm:items-center gap-2"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-700 sm:w-20 shrink-0">{group.label}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span key={item} className="text-xs px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-500 font-mono hover:border-zinc-600 hover:text-zinc-300 transition-all duration-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── Notable Projects ── */}
          <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-6 pb-2 border-b border-zinc-800">Notable Projects</h2>
            <div className="space-y-3">
              {projects.map((p, i) => (
                <motion.div
                  key={p.name}
                  className="flex items-start justify-between gap-4 py-2"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-zinc-200">{p.name}</span>
                    <span className="text-zinc-700 mx-2">—</span>
                    <span className="text-xs text-zinc-500">{p.desc}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-300 transition-colors">
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-300 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── Education ── */}
          <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4 pb-2 border-b border-zinc-800">Education</h2>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
              <div>
                <h3 className="font-semibold text-zinc-100 text-sm">Bachelor&apos;s Degree in Computer Science</h3>
                <p className="text-zinc-500 text-xs">Higher Technological Institute</p>
                <p className="text-zinc-600 text-xs mt-1">Graduated with A+ in final project · Overall good grade</p>
              </div>
            </div>
          </motion.section>

          {/* ── CTA ── */}
          <motion.section
            className="pt-4"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
          >
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center">
              <h3 className="text-lg font-bold text-white mb-2">Want to see the work in depth?</h3>
              <p className="text-zinc-500 text-sm mb-6">Detailed case studies, architecture diagrams, and decision breakdowns.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/case-studies">
                  <motion.button className="flex items-center gap-2 px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold rounded-xl transition-colors w-full sm:w-auto justify-center"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    Case Studies <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
                <Link href="/lets-talk">
                  <motion.button className="flex items-center gap-2 px-6 py-2.5 border border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-zinc-200 text-sm font-semibold rounded-xl transition-all w-full sm:w-auto justify-center"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Mail className="w-4 h-4" /> Get in Touch
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </main>
  );
}
