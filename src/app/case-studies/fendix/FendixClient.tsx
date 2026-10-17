"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink, ChevronLeft, Shield, Zap, Code, GitBranch, CheckCircle } from "lucide-react";
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

// ── Fendix architecture diagram ──────────────────────────────
function FendixDiagram() {
  return (
    <div className="space-y-4">
      {/* Input row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: "API Endpoint (live)", sub: "Running service under test", icon: <ExternalLink className="w-4 h-4" /> },
          { label: "Source Code / OpenAPI", sub: "Spec files, route definitions", icon: <Code className="w-4 h-4" /> },
        ].map((node, i) => (
          <motion.div
            key={node.label}
            className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
          >
            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 shrink-0">{node.icon}</div>
            <div>
              <p className="font-semibold text-zinc-200 text-sm">{node.label}</p>
              <p className="text-xs text-zinc-600 mt-0.5">{node.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Arrows down */}
      <div className="grid grid-cols-2 gap-3">
        {[0, 1].map((i) => (
          <motion.div key={i} className="flex justify-center text-zinc-800"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Engine row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: "DAST Engine", sub: "Crafted HTTP requests · Response analysis · Runtime behavior", icon: <Zap className="w-4 h-4" /> },
          { label: "SAST Engine", sub: "AST parsing · Pattern matching · Static vulnerability detection", icon: <Code className="w-4 h-4" /> },
        ].map((node, i) => (
          <motion.div
            key={node.label}
            className="flex items-center gap-3 p-4 rounded-xl border border-zinc-700 bg-zinc-900/60"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28 + i * 0.07, duration: 0.4 }}
          >
            <div className="p-2 rounded-lg bg-zinc-700 text-zinc-300 shrink-0">{node.icon}</div>
            <div>
              <p className="font-semibold text-zinc-100 text-sm">{node.label}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{node.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Both converge */}
      <motion.div
        className="flex justify-center text-zinc-800"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <GitBranch className="w-5 h-5 rotate-180" />
      </motion.div>

      {/* Correlation */}
      <motion.div
        className="flex items-center gap-3 p-5 rounded-xl border border-zinc-600 bg-zinc-900/70"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.55, duration: 0.45 }}
      >
        <div className="p-2 rounded-lg bg-zinc-700 text-white shrink-0">
          <CheckCircle className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-white text-sm">Correlation Engine</p>
          <p className="text-xs text-zinc-400 mt-0.5">Only flags a finding if BOTH engines independently agree · Maps DAST (HTTP) ↔ SAST (code) findings</p>
        </div>
        <span className="text-xs text-zinc-700 font-semibold shrink-0">The core insight</span>
      </motion.div>

      <motion.div
        className="flex justify-center text-zinc-800"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.65, duration: 0.3 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      {/* Output */}
      <motion.div
        className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.72, duration: 0.4 }}
      >
        <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 shrink-0">
          <Shield className="w-4 h-4" />
        </div>
        <div>
          <p className="font-semibold text-zinc-200 text-sm">SARIF Report</p>
          <p className="text-xs text-zinc-600 mt-0.5">Standard format · GitHub Actions · Azure DevOps · Any CI/CD · Zero false-positive noise</p>
        </div>
      </motion.div>
    </div>
  );
}

const inView = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export default function FendixCaseStudy() {
  const outcomes = [
    { icon: <Shield className="w-5 h-5" />,    value: "~70%", label: "False positive reduction",   sub: "vs. standalone DAST or SAST" },
    { icon: <CheckCircle className="w-5 h-5" />, value: "15+",  label: "Vulnerability categories",   sub: "OWASP Top 10 and beyond" },
    { icon: <Zap className="w-5 h-5" />,        value: "1",    label: "Go binary",                   sub: "Zero runtime dependencies" },
    { icon: <Code className="w-5 h-5" />,       value: "0",    label: "Telemetry",                   sub: "Privacy-first, open source" },
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
                API Security Scanner
              </span>
              <span className="text-xs text-zinc-700">· 7 min read · Open source</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
              Building Fendix
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-10">
              Why existing security scanners produce too much noise — and how one insight
              (both engines must agree) reduced false positives by ~70% in a single Go binary.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="https://fendix.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Live Site
              </a>
              <a
                href="https://github.com/Abdel-RahmanSaied/Fendix"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 text-sm font-semibold transition-all"
              >
                <Github className="w-3.5 h-3.5" /> Source
              </a>
              <span className="text-xs text-zinc-700">Role: Creator & Maintainer · Open Source · Go</span>
            </div>
          </motion.div>
        </section>

        {/* ── The Problem ─────────────────────────────────────── */}
        <section>
          <SectionLabel number="01" label="The Problem" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            <WordReveal text="Security tools that cry wolf get ignored." />
          </h2>

          <div className="space-y-4 text-zinc-500 text-sm leading-relaxed">
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
              DAST scanners (Dynamic Application Security Testing) send crafted requests to a running API
              and analyze responses. They catch real runtime behavior but generate false positives when
              a response looks suspicious but is actually expected.
            </motion.p>
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ ...inView, show: { ...inView.show, transition: { delay: 0.1, duration: 0.55 } } }}>
              SAST scanners (Static Application Security Testing) read source code and flag patterns that
              could be vulnerable. They catch code-level issues but have no runtime context — a flagged
              pattern might be safely guarded at the framework level.
            </motion.p>
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ ...inView, show: { ...inView.show, transition: { delay: 0.2, duration: 0.55 } } }}>
              Security teams using either tool alone face noise fatigue. Developers learn to ignore the
              scanner. Real vulnerabilities hide in the noise. The tool becomes theater.
            </motion.p>
          </div>

          <motion.div
            className="mt-8 p-6 rounded-2xl border border-zinc-800/60 bg-zinc-900/30"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <p className="text-sm font-semibold text-white mb-2">The core hypothesis</p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              If a vulnerability is real, both a runtime scanner (DAST) and a static scanner (SAST) should
              independently detect it. When they agree, confidence is high. When only one flags it — it&apos;s
              probably noise.
            </p>
          </motion.div>
        </section>

        {/* ── Architecture ─────────────────────────────────────── */}
        <section>
          <SectionLabel number="02" label="Architecture" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            <WordReveal text="Two engines. One decision." />
          </h2>
          <motion.p
            className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-xl"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
          >
            The architecture is built around the correlation layer — every other component serves it.
          </motion.p>

          <FendixDiagram />
        </section>

        {/* ── Key Decisions ────────────────────────────────────── */}
        <section>
          <SectionLabel number="03" label="Key Decisions" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            <WordReveal text="Technical choices that defined the tool." />
          </h2>

          <div className="space-y-3">
            <DecisionCard
              number="01"
              title="Go for the runtime — single binary, zero dependencies"
              body="Python would be the natural choice for a security tool, but distributing a Python app means managing a runtime, virtualenvs, and dependencies. Go compiles to a single static binary that runs on any Linux or macOS system without installation. For a security tool, frictionless adoption matters."
              delay={0}
            />
            <DecisionCard
              number="02"
              title="Correlation-first design — the central abstraction"
              body="Most hybrid scanners just run DAST and SAST and concatenate the results. Fendix treats correlation as the primary output layer. DAST findings are normalized to code-level references; SAST findings are tagged with runtime relevance. The intersection is what ships to the report."
              delay={0.07}
            />
            <DecisionCard
              number="03"
              title="SARIF output — integrate with any existing toolchain"
              body="Proprietary formats lock users into your ecosystem. SARIF (Static Analysis Results Interchange Format) is the standard supported by GitHub Advanced Security, Azure DevOps, and every major CI/CD platform. Fendix findings appear natively in GitHub PR annotations with no extra setup."
              delay={0.14}
            />
            <DecisionCard
              number="04"
              title="Zero telemetry — open source security tools must be trustworthy"
              body="A security tool that phones home is a contradiction. No usage data, no crash reports, no version pings. Users running Fendix against internal APIs should have absolute confidence their endpoints and findings stay local. Signed releases via GitHub Actions provide integrity without central control."
              delay={0.21}
            />
          </div>
        </section>

        {/* ── Challenges ──────────────────────────────────────── */}
        <section>
          <SectionLabel number="04" label="Engineering Challenges" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            <WordReveal text="The hard parts." />
          </h2>

          <div className="space-y-3">
            {[
              {
                title: "Mapping HTTP findings to code locations",
                body: "DAST produces HTTP-level findings: 'endpoint /users/1 returned a stack trace.' SAST produces code-level findings: 'line 47 of user_controller.go has an unhandled error.' Correlating these requires a normalization layer that understands route patterns, file-to-endpoint mapping, and error propagation paths.",
              },
              {
                title: "Tuning the correlation threshold",
                body: "Too strict: you require exact match on vulnerability type, endpoint, and code line — you catch almost nothing. Too loose: you correlate by vulnerability category only — you still have noise. The final model uses a weighted score: exact endpoint match + matching vuln category + overlapping parameter names = high confidence.",
              },
              {
                title: "15+ vulnerability categories, two detection strategies each",
                body: "Every category (SQLi, XSS, SSRF, path traversal, auth bypass, etc.) needs a DAST probe strategy and a SAST pattern. That's 30+ distinct detection implementations, each requiring testing across multiple frameworks and languages. The scanner is only useful if the coverage is real.",
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.45 }}
              >
                <h4 className="font-semibold text-zinc-200 text-sm mb-2">{c.title}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Outcomes ─────────────────────────────────────────── */}
        <section>
          <SectionLabel number="05" label="Outcomes" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            <WordReveal text="Less noise. More signal." />
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

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section>
          <motion.div
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 md:p-10 text-center"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">Read next</p>
            <h3 className="text-xl font-bold text-white mb-2">Read the Twiscope case study</h3>
            <p className="text-zinc-500 text-sm mb-6">How a distributed Celery + Redis pipeline handles 5M+ data points daily.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/case-studies/twiscope">
                <motion.button
                  className="flex items-center gap-2 px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold rounded-xl transition-colors"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                >
                  Twiscope Case Study <ArrowRight className="w-4 h-4" />
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
