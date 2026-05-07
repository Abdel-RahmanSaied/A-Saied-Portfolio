"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MessageCircleMore, ArrowUpRight, Clock, Briefcase, Zap } from "lucide-react";
import GlowCard from "@/components/GlowCard";

const contacts = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "abdelrahman.saied@asasit.com",
    href: "mailto:abdelrahman.saied@asasit.com",
    desc: "Best for project inquiries",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: "LinkedIn",
    value: "abdel-rahman-saied",
    href: "https://www.linkedin.com/in/abdel-rahman-saied",
    desc: "Professional background & updates",
  },
  {
    icon: <MessageCircleMore className="w-5 h-5" />,
    label: "WhatsApp",
    value: "+966 55 804 6143",
    href: "https://wa.me/966558046143",
    desc: "Quick responses during work hours",
  },
  {
    icon: <Github className="w-5 h-5" />,
    label: "GitHub",
    value: "Abdel-RahmanSaied",
    href: "https://github.com/Abdel-RahmanSaied",
    desc: "Open-source work & code",
  },
];

const availableFor = [
  { icon: <Briefcase className="w-4 h-4" />,         label: "Freelance Projects" },
  { icon: <Zap className="w-4 h-4" />,               label: "Architecture Reviews" },
  { icon: <MessageCircleMore className="w-4 h-4" />, label: "Technical Consultation" },
  { icon: <Clock className="w-4 h-4" />,             label: "Speaking Engagements" },
];

const canHelpWith = [
  "Scalable backend systems with Python & Django",
  "Real-time data pipelines and analytics platforms",
  "API security scanning (DAST + SAST)",
  "DevOps, CI/CD, and cloud infrastructure (AWS)",
  "Team leadership and engineering mentorship",
  "ML integration into production services",
];

export default function LetsTalkPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">

        {/* Header */}
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Contact
          </motion.p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Let&apos;s build something
            <br />
            <motion.span
              className="text-zinc-500 inline-block"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              together
            </motion.span>
          </h1>
          <motion.p
            className="text-zinc-500 leading-relaxed text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Whether you need a senior engineer, a technical co-founder, or just want to talk shop —
            I&apos;m happy to connect. Pick your preferred channel below.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Contact cards */}
          <div className="lg:col-span-2 space-y-3">
            <motion.p
              className="text-xs font-semibold uppercase tracking-widest text-zinc-700 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              Reach me at
            </motion.p>

            {contacts.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlowCard className="rounded-2xl" glowSize={260}>
                  <motion.a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-5 p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-300 relative"
                    whileHover={{ y: -2 }}
                  >
                    <motion.div
                      className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 group-hover:text-zinc-200 transition-colors shrink-0"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {c.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-0.5">{c.label}</p>
                      <p className="font-semibold text-zinc-200 text-sm truncate">{c.value}</p>
                      <p className="text-xs text-zinc-600 mt-0.5">{c.desc}</p>
                    </div>
                    <motion.div
                      className="shrink-0"
                      initial={false}
                      whileHover={{ x: 2, y: -2 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 transition-colors duration-200" />
                    </motion.div>
                  </motion.a>
                </GlowCard>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <GlowCard className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40" glowSize={220}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">Available</p>
                </div>
                <h3 className="font-semibold text-zinc-300 text-sm mb-3">Open for</h3>
                <ul className="space-y-2.5">
                  {availableFor.map((a, i) => (
                    <motion.li
                      key={a.label}
                      className="flex items-center gap-2.5 text-xs text-zinc-500"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                    >
                      <span className="text-zinc-600">{a.icon}</span>
                      {a.label}
                    </motion.li>
                  ))}
                </ul>
              </GlowCard>
            </motion.div>

            {/* Can help with */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.5 }}
            >
              <GlowCard className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40" glowSize={220}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-700 mb-4">I can help with</h3>
                <ul className="space-y-2">
                  {canHelpWith.map((item, i) => (
                    <motion.li
                      key={item}
                      className="flex items-start gap-2 text-xs text-zinc-600 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45 + i * 0.05, duration: 0.4 }}
                    >
                      <span className="text-zinc-700 mt-0.5 shrink-0">→</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </GlowCard>
            </motion.div>

            {/* Response time */}
            <motion.div
              className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/30 text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              whileHover={{ y: -2 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <Clock className="w-4 h-4 text-zinc-700 mx-auto mb-2" />
              </motion.div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Typically responds within <span className="text-zinc-400 font-semibold">24 hours</span> on weekdays.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
