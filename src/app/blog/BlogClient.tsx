"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { posts } from "@/lib/posts";
import GlowCard from "@/components/GlowCard";

const inView = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">

        {/* Header */}
        <motion.div
          className="mb-20 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">Writing</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
            Thinking out loud
            <br />
            <span className="text-zinc-500">about systems.</span>
          </h1>
          <p className="text-zinc-500 leading-relaxed text-sm max-w-lg">
            Architecture decisions, hard-won lessons, and honest post-mortems from real production systems.
            Not tutorials — actual problems and how I solved them.
          </p>
        </motion.div>

        {/* Posts */}
        <div className="space-y-4">
          {[...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlowCard className="rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 group" glowSize={400}>
                <Link href={`/blog/${post.slug}`}>
                  <motion.div
                    className="p-7 sm:p-8 cursor-pointer"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="text-xs text-zinc-600">{formatDate(post.date)}</span>
                          <span className="text-zinc-800">·</span>
                          <span className="text-xs text-zinc-600">{post.readTime}</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-zinc-100 transition-colors leading-snug">
                          {post.title}
                        </h2>

                        {/* Summary */}
                        <p className="text-zinc-500 text-sm leading-relaxed mb-4">{post.summary}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-semibold uppercase tracking-widest text-zinc-700 border border-zinc-800 px-2.5 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        className="hidden sm:flex items-center gap-1.5 text-zinc-700 group-hover:text-zinc-300 transition-colors shrink-0 pt-1"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-xs font-semibold uppercase tracking-widest">Read</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          className="mt-20 text-center"
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={inView}
        >
          <p className="text-zinc-700 text-sm">More articles on the way.</p>
        </motion.div>

      </div>
    </main>
  );
}
