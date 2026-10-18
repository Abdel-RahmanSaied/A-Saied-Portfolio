"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MessageCircleMore, Twitter, ArrowUpRight, Clock, Briefcase, Zap } from "lucide-react";
import GlowCard from "@/components/GlowCard";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import type { Ui } from "@/lib/ui";

export default function LetsTalkClient({ locale, ui }: { locale: Locale; ui: Ui }) {
  const t = ui.letsTalk;
  // Cards slide in from the side the text starts on.
  const from = locale === "ar" ? 1 : -1;

  const contacts = [
    { icon: <Mail className="w-5 h-5" />, ...t.contacts.email, value: site.email, href: `mailto:${site.email}` },
    { icon: <Linkedin className="w-5 h-5" />, ...t.contacts.linkedin, value: "abdel-rahman-saied", href: site.social.linkedin },
    { icon: <Twitter className="w-5 h-5" />, ...t.contacts.x, value: site.social.xHandle, href: site.social.x },
    { icon: <MessageCircleMore className="w-5 h-5" />, ...t.contacts.whatsapp, value: site.social.whatsappDisplay, href: site.social.whatsapp },
    { icon: <Github className="w-5 h-5" />, ...t.contacts.github, value: "Abdel-RahmanSaied", href: site.social.github },
  ];
  const availableIcons = [
    <Briefcase key="senior" className="w-4 h-4" />,
    <Zap key="lead" className="w-4 h-4" />,
    <MessageCircleMore key="staff" className="w-4 h-4" />,
    <Clock key="advisory" className="w-4 h-4" />,
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">

        {/* Header paints immediately: it is the page's largest content. */}
        <header className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-3">{t.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            {t.titleLine1}
            <br />
            <span className="text-fg-muted">{t.titleLine2}</span>
          </h1>
          <p className="text-fg-muted leading-relaxed text-sm">{t.intro}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Contact cards */}
          <div className="lg:col-span-2 space-y-3">
            <motion.p
              className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              {t.reachMe}
            </motion.p>

            {contacts.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: 16 * from }}
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
                      <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-0.5">{c.label}</p>
                      <p className="font-semibold text-zinc-200 text-sm truncate">{c.value}</p>
                      <p className="text-xs text-fg-faint mt-0.5">{c.desc}</p>
                    </div>
                    <motion.div
                      className="shrink-0"
                      initial={false}
                      whileHover={{ x: -2 * from, y: -2 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-fg-faint group-hover:text-zinc-400 transition-colors duration-200 rtl:-scale-x-100" />
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
                  <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint">{t.available}</p>
                </div>
                <h2 className="font-semibold text-zinc-300 text-sm mb-3">{t.openFor}</h2>
                <ul className="space-y-2.5">
                  {t.availableFor.map((label, i) => (
                    <motion.li
                      key={label}
                      className="flex items-center gap-2.5 text-xs text-fg-muted"
                      initial={{ opacity: 0, x: 8 * from }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                    >
                      <span className="text-fg-faint">{availableIcons[i]}</span>
                      {label}
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
                <h2 className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-4">{t.helpTitle}</h2>
                <ul className="space-y-2">
                  {t.canHelpWith.map((item, i) => (
                    <motion.li
                      key={item}
                      className="flex items-start gap-2 text-xs text-fg-faint leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45 + i * 0.05, duration: 0.4 }}
                    >
                      <span className="text-fg-faint mt-0.5 shrink-0">{locale === "ar" ? "←" : "→"}</span>
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
                <Clock className="w-4 h-4 text-fg-faint mx-auto mb-2" />
              </motion.div>
              <p className="text-xs text-fg-faint leading-relaxed">
                {t.responds.before}<span className="text-zinc-400 font-semibold">{t.responds.strong}</span>{t.responds.after}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
