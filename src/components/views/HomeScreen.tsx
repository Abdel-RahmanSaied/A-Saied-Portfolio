"use client";

import { motion } from "framer-motion";
import {
  ArrowRight, Github, Linkedin, Mail, MessageCircleMore, Twitter,
  Shield, Database, Server, Cloud, ExternalLink, ChevronDown,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import GlowCard from "@/components/GlowCard";
import AnimatedNumber from "@/components/AnimatedNumber";
import type { Career } from "@/lib/career";
import { localePath, type Locale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";
import { site } from "@/lib/site";
import type { Ui } from "@/lib/ui";

const NetworkCanvas = dynamic(() => import("@/components/NetworkCanvas"), { ssr: false });

// ── Word-by-word reveal ──────────────────────────────────────
function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-snug me-[0.22em] last:me-0">
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

// CSS animation rather than framer-motion: it runs on the compositor
// instead of a JS frame loop, and is skipped under reduced motion. Always
// laid out left to right so the loop stays seamless on Arabic pages too.
function TechMarquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div aria-hidden="true" dir="ltr" className="overflow-hidden py-5 border-y border-zinc-800/40 select-none">
      <div className="flex w-max gap-10 whitespace-nowrap motion-safe:animate-[marquee_28s_linear_infinite]">
        {doubled.map((item, i) => (
          <span key={i} className="text-[11px] font-semibold uppercase tracking-widest text-fg-faint">
            {item}
            <span className="ml-10">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-2">
      <span aria-hidden="true" className="text-fg-faint me-2">{number}</span>
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
// Arrows point the way the text reads, and nudge that way on hover.
const arrow = "rtl:-scale-x-100";
const nudge = "group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform";

export default function HomeScreen({
  locale,
  ui,
  career,
  projects,
}: {
  locale: Locale;
  ui: Ui;
  career: Career;
  projects: Project[];
}) {
  const t = ui.home;
  const lp = (path: string) => localePath(locale, path);
  const featured = projects.filter((p) => p.featured);

  const serviceIcons = [
    <Server key="server" className="w-5 h-5" />,
    <Database key="database" className="w-5 h-5" />,
    <Cloud key="cloud" className="w-5 h-5" />,
    <Shield key="shield" className="w-5 h-5" />,
  ];
  const stepIcons = [
    <Server key="server" className="w-4 h-4" />,
    <Database key="database" className="w-4 h-4" />,
    <Cloud key="cloud" className="w-4 h-4" />,
    <Shield key="shield" className="w-4 h-4" />,
  ];

  const socials = [
    { icon: <Github className="w-4 h-4" />,            href: site.social.github,     label: "GitHub" },
    { icon: <Linkedin className="w-4 h-4" />,          href: site.social.linkedin,   label: "LinkedIn" },
    { icon: <Twitter className="w-4 h-4" />,           href: site.social.x,          label: "X" },
    { icon: <Mail className="w-4 h-4" />,              href: `mailto:${site.email}`, label: ui.letsTalk.contacts.email.label },
    { icon: <MessageCircleMore className="w-4 h-4" />, href: site.social.whatsapp,   label: ui.letsTalk.contacts.whatsapp.label },
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
              {t.badge}
            </span>
          </motion.div>

          {/* The name, title and intro paint immediately (they are the
              page's largest content); only the surrounding UI animates in. */}
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.02] mb-5 text-white">
            {t.nameFirst}
            <br />
            <span className="text-zinc-400">{t.nameLast}</span>
          </h1>

          <p className="text-xs sm:text-sm font-semibold text-zinc-300 uppercase tracking-[0.2em] mb-6">
            {career.headline}
          </p>

          <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-10">{t.intro}</p>

          <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-3 justify-center mb-9">
            <Link href={lp("/case-studies")} className={primaryBtn}>
              {ui.common.readCaseStudies} <ArrowRight className={`w-4 h-4 ${arrow}`} aria-hidden="true" />
            </Link>
            <Link href={lp("/lets-talk")} className={secondaryBtn}>
              {ui.common.discussRole}
            </Link>
          </motion.div>

          <motion.ul variants={fadeUp} custom={5} className="flex gap-3 justify-center mb-14">
            {socials.map((s) => (
              <li key={s.href}>
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

          <motion.div variants={fadeUp} custom={6} aria-hidden="true" className="flex flex-col items-center gap-1.5 text-fg-faint">
            <span className="text-[10px] uppercase tracking-widest font-medium">{t.scroll}</span>
            <ChevronDown className="w-4 h-4 motion-safe:animate-[nudge_1.7s_ease-in-out_infinite]" />
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
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-fg-muted">{t.howIWork}</p>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.03] tracking-tight mb-6">
                    {t.howTitle}
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">{t.howBody}</p>
                </div>
                <ul className="mt-9 flex flex-wrap gap-2">
                  {t.principles.map((principle) => (
                    <li key={principle} className="px-3 py-1.5 rounded-full border border-zinc-700/70 bg-zinc-900/80 text-xs font-semibold text-zinc-300">
                      {principle}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative border-t lg:border-t-0 lg:border-s border-zinc-800 bg-zinc-900/30 p-7 sm:p-10 md:p-12">
                <ol className="space-y-3">
                  {t.steps.map((item, i) => (
                    <li
                      key={item.title}
                      className="group flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 hover:border-zinc-600 hover:bg-zinc-900/80 transition-colors duration-300"
                    >
                      <div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-zinc-300 group-hover:text-white group-hover:bg-zinc-700 transition-colors">
                        {stepIcons[i]}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-200">{item.title}</h3>
                        <p className="text-xs text-fg-muted mt-0.5">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <Link
                  href={lp("/engineering-philosophy")}
                  className="group mt-7 inline-flex w-full items-center justify-between rounded-2xl border border-zinc-700 bg-zinc-100 px-5 py-3 text-sm font-bold text-zinc-950 hover:bg-white transition-colors"
                >
                  {t.readPhilosophy}
                  <ArrowRight className={`w-4 h-4 ${arrow} ${nudge}`} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </section>

      {/* ── Highlights ────────────────────────────────────────── */}
      <section aria-label={t.highlightsLabel} className="py-14 px-5 sm:px-6 border-t border-zinc-800/40">
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
              <SectionLabel number="01" label={t.featuredLabel} />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                <WordReveal text={t.featuredTitle} />
              </h2>
            </div>
            <Link href={lp("/portfolio")} className="hidden sm:inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-zinc-200 transition-colors group">
              {ui.common.allProjects} <ArrowRight className={`w-3 h-3 ${arrow} ${nudge}`} aria-hidden="true" />
            </Link>
          </motion.div>

          <div className="space-y-4">
            {featured.map((p) => (
              <GlowCard key={p.slug} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70 transition-colors duration-300">
                <article className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-1">
                      {p.tagline} · {p.engagement}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-5">{p.description}</p>
                    <ul className="flex flex-wrap gap-2" aria-label={ui.common.technology}>
                      {p.techStack.map((tech) => (
                        <li key={tech} className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 font-mono border border-zinc-700/50">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap lg:flex-col gap-2.5 lg:shrink-0">
                    {p.caseStudy && (
                      <Link
                        href={lp(p.caseStudy)}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <ArrowRight className={`w-3.5 h-3.5 ${arrow}`} aria-hidden="true" /> {ui.common.caseStudy}
                      </Link>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /> {ui.common.website}
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <Github className="w-3.5 h-3.5" aria-hidden="true" /> {ui.common.source}
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
              <SectionLabel number="02" label={t.allWorkLabel} />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                <WordReveal text={t.allWorkTitle} />
              </h2>
            </div>
            <Link href={lp("/portfolio")} className="hidden sm:inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-zinc-200 transition-colors group">
              {t.fullDetails} <ArrowRight className={`w-3 h-3 ${arrow} ${nudge}`} aria-hidden="true" />
            </Link>
          </motion.div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={lp(p.caseStudy ?? "/portfolio")}
                  className="group flex h-full items-start justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors duration-300"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-fg-faint mb-2">
                      {ui.common.categories[p.category]} · {p.engagement}
                    </p>
                    <h3 className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors mb-1">{p.title}</h3>
                    <p className="text-xs text-fg-muted">{p.tagline}</p>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 mt-1 shrink-0 text-zinc-600 group-hover:text-zinc-200 ${arrow} group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-all`}
                    aria-hidden="true"
                  />
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
            <SectionLabel number="03" label={t.expertiseLabel} />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <WordReveal text={t.expertiseTitle} />
            </h2>
          </motion.div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.services.map((s, i) => (
              <li key={s.title}>
                <GlowCard className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors duration-300 h-full">
                  <div aria-hidden="true" className="p-2.5 rounded-xl bg-zinc-800 inline-flex mb-4 text-zinc-300">{serviceIcons[i]}</div>
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
            <SectionLabel number="04" label={t.stackLabel} />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <WordReveal text={t.stackTitle} />
            </h2>
          </motion.div>

          <dl className="space-y-5">
            {career.skills.map((group) => (
              <div key={group.label} className="flex flex-col sm:flex-row sm:items-start gap-3">
                <dt className="text-xs font-semibold uppercase tracking-widest text-fg-faint sm:w-40 shrink-0 sm:pt-2">{group.label}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-300 text-sm font-medium">
                        {item}
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
          <SectionLabel number="05" label={t.ctaLabel} />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 mt-2">{t.ctaTitle}</h2>
          <p className="text-zinc-400 mb-10 leading-relaxed max-w-lg mx-auto text-sm">{t.ctaBody}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={lp("/lets-talk")} className={primaryBtn}>{ui.common.discussRole}</Link>
            <Link href={lp("/resume")} className={secondaryBtn}>{ui.common.viewResume}</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
