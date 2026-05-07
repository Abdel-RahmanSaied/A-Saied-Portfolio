"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, ExternalLink, ChevronLeft, Users, CheckCircle, Search, Star, MessageSquare, BarChart3, Briefcase } from "lucide-react";
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

const vettingStages = [
  { label: "Stage 1 — AI Screening", sub: "Automated profile analysis, skill extraction, and initial scoring", icon: <Search className="w-4 h-4" />, badge: "Automated" },
  { label: "Stage 2 — Expert Interview", sub: "Senior engineer assessment — live technical evaluation", icon: <Users className="w-4 h-4" />, badge: "Human" },
  { label: "Stage 3 — Profile Verification", sub: "Portfolio review, reference checks, background validation", icon: <CheckCircle className="w-4 h-4" />, badge: "Verified" },
];

function VettingPipeline() {
  return (
    <div className="space-y-2">
      {vettingStages.map((stage, i) => (
        <div key={stage.label}>
          <motion.div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300"
            initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.45 }}>
            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 shrink-0">{stage.icon}</div>
            <div className="flex-1">
              <p className="font-semibold text-zinc-200 text-sm">{stage.label}</p>
              <p className="text-xs text-zinc-600 mt-0.5">{stage.sub}</p>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded-full shrink-0">
              {stage.badge}
            </span>
          </motion.div>
          {i < vettingStages.length - 1 && (
            <motion.div className="flex justify-start pl-6 py-1 text-zinc-800"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.1, duration: 0.3 }}>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          )}
        </div>
      ))}
      <motion.div className="mt-4 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/30 border-dashed"
        initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.45 }}>
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-2">
          <Star className="w-3 h-3" /> Verified Badge + Quality Guarantee
        </p>
        <p className="text-xs text-zinc-600">Approved engineers get a Verified badge. Companies get a free replacement guarantee if the hire doesn&apos;t meet expectations.</p>
      </motion.div>
    </div>
  );
}

const inView = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export default function MaxpeakCaseStudy() {
  const outcomes = [
    { icon: <CheckCircle className="w-5 h-5" />, value: "3",      label: "Stage vetting pipeline",      sub: "AI screening → expert interview → profile verification" },
    { icon: <Users className="w-5 h-5" />,       value: "2",      label: "Markets served",              sub: "Egypt (supply) · Saudi Arabia (demand)" },
    { icon: <Star className="w-5 h-5" />,         value: "100%",   label: "Replacement guarantee",       sub: "Free replacement if the hire doesn't meet expectations" },
    { icon: <BarChart3 className="w-5 h-5" />,   value: "2",      label: "Languages supported",         sub: "Arabic and English, bilingual from day one" },
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
                Elite Talent Marketplace
              </span>
              <span className="text-xs text-zinc-700">· 7 min read</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">Building Maxpeak</h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-10">
              How a 3-stage AI-powered vetting pipeline solved the Egypt-to-Saudi talent trust problem —
              connecting elite Egyptian engineers with Saudi companies through verified, guaranteed hiring.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a href="http://maxpeak.net/" target="_blank" rel="noopener noreferrer"
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
            <WordReveal text="The Egypt-Saudi talent corridor has a trust problem." />
          </h2>
          <div className="space-y-4 text-zinc-500 text-sm leading-relaxed">
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
              Saudi companies need software engineers. Egypt has a large pool of talented engineers hungry for
              premium opportunities. The corridor exists — but no trusted platform serves it. Global platforms
              like Toptal and Andela are expensive for SMBs and lack regional focus. Local job boards are
              full of noise — unverified profiles with inflated CVs and no quality signal.
            </motion.p>
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ ...inView, show: { ...inView.show, transition: { delay: 0.1, duration: 0.55 } } }}>
              The root issue is trust asymmetry. Saudi companies can&apos;t reliably evaluate Egyptian candidates
              remotely. Egyptian engineers can&apos;t prove their quality without a trusted intermediary. Every hire
              is a leap of faith — and when it fails, both sides lose time and money with no recourse.
            </motion.p>
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ ...inView, show: { ...inView.show, transition: { delay: 0.2, duration: 0.55 } } }}>
              Maxpeak&apos;s answer was a rigorous 3-stage vetting process that makes the verification work happen
              before the hire — so by the time a company sees a profile, the quality question is already answered.
              And to back it up: a free replacement guarantee if the hire doesn&apos;t meet expectations.
            </motion.p>
          </div>
          <motion.div className="mt-8 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">Core requirements</p>
            <ul className="space-y-2">
              {[
                "3-stage vetting pipeline: AI screening, expert interview, profile verification",
                "Verified badge system with quality guarantee for companies",
                "Contact protection — companies and engineers can't bypass the platform to connect directly",
                "Bilingual (Arabic/English) from day one — both markets need it",
                "In-app chat, analytics dashboards, and integrated payments for subscriptions",
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

        {/* ── Vetting Pipeline ── */}
        <section>
          <SectionLabel number="02" label="The Vetting Pipeline" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            <WordReveal text="Trust is built before the first interview." />
          </h2>
          <motion.p className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-xl"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
            The entire product thesis rests on this pipeline. Every engineer in the talent pool has passed
            all three stages — companies browse only verified talent.
          </motion.p>
          <VettingPipeline />
        </section>

        {/* ── Key Decisions ── */}
        <section>
          <SectionLabel number="03" label="Key Decisions" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            <WordReveal text="What we chose and why." />
          </h2>
          <div className="space-y-3">
            <DecisionCard number="01" title="AI-first screening to scale the top of the funnel"
              body="Manual review of every applicant profile doesn't scale. We built an AI screening layer that extracts skills from CVs, scores candidates against a rubric, and surfaces the top candidates for expert review. This cut the expert review workload by ~60% while improving signal quality — reviewers spend time on candidates who already passed an objective bar."
              delay={0} />
            <DecisionCard number="02" title="Contact protection by design, not policy"
              body="Marketplaces bleed when users go around the platform. We built contact protection at the data layer: engineer contact details are never returned by the API. In-app messaging is the only channel, and it's logged. This keeps all relationships platform-mediated and enforceable by the quality guarantee."
              delay={0.07} />
            <DecisionCard number="03" title="Bilingual from the first line of code"
              body="Adding i18n to an existing app is painful. We used Django's i18n framework from day one — all user-facing strings are translation-wrapped, all dates and numbers are locale-aware. The Arabic UI required full RTL layout support in React 18, handled via CSS logical properties rather than mirrored stylesheets."
              delay={0.14} />
            <DecisionCard number="04" title="Quality guarantee as a product feature, not a promise"
              body="A replacement guarantee only works if it's enforceable. We built a structured dispute flow into the platform: companies can open a replacement request within a defined window, which triggers a review process and, if valid, re-enters them into the matching pool at no cost. The guarantee is code, not just copy."
              delay={0.21} />
          </div>
        </section>

        {/* ── Outcomes ── */}
        <section>
          <SectionLabel number="04" label="Outcomes" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            <WordReveal text="A marketplace built on verified trust." />
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
            <WordReveal text="Where the hard problems lived." />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <Search className="w-4 h-4" />,      title: "AI screening calibration", body: "The AI scorer needed to be calibrated against real expert review outcomes. We ran a shadow mode for the first 200 applications — AI scores were logged but not shown — then tuned the scoring weights against expert decisions." },
              { icon: <MessageSquare className="w-4 h-4" />, title: "Chat at scale", body: "In-app messaging sounds simple. Enforcing contact protection without making the UX feel like a walled garden required careful message filtering, rate limiting, and a clear escalation path for disputes — all without false positives that block legitimate communication." },
              { icon: <Briefcase className="w-4 h-4" />,    title: "CV parsing variance", body: "Egyptian engineers submit CVs in wildly different formats — Word, PDF, image scans, mixed Arabic/English. Building an extraction pipeline that reliably pulls skills and experience from unstructured documents required iterating through several NLP approaches before settling on a hybrid rule + model approach." },
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
            <h3 className="text-xl font-bold text-white mb-2">Read the Twiscope case study</h3>
            <p className="text-zinc-500 text-sm mb-6">How I built a platform processing 5M+ data points daily with ML-driven trend detection.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/case-studies/twiscope">
                <motion.button className="flex items-center gap-2 px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold rounded-xl transition-colors"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  Twiscope Case Study <ArrowRight className="w-4 h-4" />
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
