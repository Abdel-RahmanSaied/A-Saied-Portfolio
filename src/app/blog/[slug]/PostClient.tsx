"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { Post, Block } from "@/lib/posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const inView = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

// Turn internal route mentions (/case-studies/x, /blog/x) and known project
// domains into real links, so prose references carry internal-link equity.
const LINK_RE = /(\/(?:case-studies|blog)\/[a-z0-9-]+|\b(?:fendix\.dev|muri\.sa|twiscope\.net)\b)/g;
const LINK_CLASS = "text-zinc-200 underline decoration-zinc-600 underline-offset-2 hover:decoration-zinc-300 transition-colors";

function linkify(text: string): React.ReactNode {
  const parts = text.split(LINK_RE);
  if (parts.length === 1) return text;
  return parts.map((part, idx) => {
    if (/^\/(?:case-studies|blog)\/[a-z0-9-]+$/.test(part)) {
      return <Link key={idx} href={part} className={LINK_CLASS}>{part}</Link>;
    }
    if (/^(?:fendix\.dev|muri\.sa|twiscope\.net)$/.test(part)) {
      return (
        <a key={idx} href={`https://${part}`} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          {part}
        </a>
      );
    }
    return part;
  });
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <motion.h2 key={i} className="text-xl sm:text-2xl font-bold text-white mt-12 mb-4"
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
          {block.text}
        </motion.h2>
      );
    case "h3":
      return (
        <motion.h3 key={i} className="text-lg font-semibold text-zinc-200 mt-8 mb-3"
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
          {block.text}
        </motion.h3>
      );
    case "p":
      return (
        <motion.p key={i} className="text-zinc-400 text-sm sm:text-base leading-relaxed"
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
          {linkify(block.text)}
        </motion.p>
      );
    case "list":
      return (
        <motion.ul key={i} className="space-y-2"
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2.5 text-zinc-400 text-sm leading-relaxed">
              <ArrowRight className="w-3 h-3 text-zinc-700 mt-1 shrink-0" />
              <span>{linkify(item)}</span>
            </li>
          ))}
        </motion.ul>
      );
    case "callout":
      return (
        <motion.div key={i}
          className="my-2 p-5 rounded-xl border border-zinc-700/60 bg-zinc-900/60 border-l-2 border-l-zinc-400"
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
          <p className="text-zinc-300 text-sm leading-relaxed font-medium">{linkify(block.text)}</p>
        </motion.div>
      );
    case "code":
      return (
        <motion.div key={i} className="my-2"
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}>
          <div className="flex items-center justify-between px-4 py-2 rounded-t-xl bg-zinc-800 border border-zinc-700/60 border-b-0">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">{block.lang}</span>
          </div>
          <pre className="p-5 rounded-b-xl bg-zinc-900 border border-zinc-700/60 border-t-0 overflow-x-auto">
            <code className="text-xs text-zinc-300 font-mono leading-relaxed">{block.code}</code>
          </pre>
        </motion.div>
      );
    case "divider":
      return <hr key={i} className="border-zinc-800 my-2" />;
    default:
      return null;
  }
}

export default function PostClient({ post }: { post: Post }) {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24">

        {/* Back */}
        <motion.div className="mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-300 transition-colors group">
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            All articles
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.header
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 border border-zinc-800 px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight">{post.title}</h1>

          <div className="flex items-center gap-4 text-xs text-zinc-600">
            <span>{formatDate(post.date)}</span>
            <span className="text-zinc-800">·</span>
            <span>{post.readTime}</span>
            <span className="text-zinc-800">·</span>
            <span>Abdel-Rahman Saied</span>
          </div>

          <p className="mt-5 text-zinc-400 text-base leading-relaxed border-l-2 border-zinc-800 pl-4">
            {post.summary}
          </p>
        </motion.header>

        {/* Content */}
        <article className="space-y-5">
          {post.content.map((block, i) => renderBlock(block, i))}
        </article>

        {/* Footer */}
        <motion.div
          className="mt-20 pt-10 border-t border-zinc-800"
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-1">Written by</p>
              <p className="text-sm font-semibold text-zinc-200">Abdel-Rahman Saied</p>
              <p className="text-xs text-zinc-600">Senior Software Engineer · Team Lead</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Link href="/blog">
                <motion.button className="flex items-center gap-2 px-5 py-2.5 border border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-zinc-200 text-xs font-semibold rounded-xl transition-all"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  More articles
                </motion.button>
              </Link>
              <Link href="/lets-talk">
                <motion.button className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold rounded-xl transition-colors"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  Get in Touch <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
