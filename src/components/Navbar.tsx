"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home",          href: "/" },
  { name: "About",         href: "/about" },
  { name: "Portfolio",     href: "/portfolio" },
  { name: "Case Studies",  href: "/case-studies" },
  { name: "Philosophy",    href: "/engineering-philosophy" },
  { name: "Blog",          href: "/blog" },
  { name: "Resume",        href: "/resume" },
  { name: "Let's Talk",    href: "/lets-talk" },
];

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? "bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/60 shadow-xl shadow-black/40"
        : "bg-transparent"
    }`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" aria-label="Home" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 bg-zinc-100 rounded-md flex items-center justify-center group-hover:bg-white transition-colors duration-200">
              <span className="text-zinc-950 font-black text-xs leading-none">AS</span>
            </div>
            <span className="font-semibold text-zinc-200 group-hover:text-white transition-colors text-sm tracking-tight">
              asaied<span className="text-zinc-500">.dev</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    active ? "text-white font-medium" : "text-zinc-500 hover:text-zinc-200 font-normal"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-zinc-800 rounded-lg"
                      transition={{ type: "spring", bounce: 0.12, duration: 0.35 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 transition-all"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden border-t border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl"
          >
            <div className="max-w-5xl mx-auto px-6 py-3 space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
