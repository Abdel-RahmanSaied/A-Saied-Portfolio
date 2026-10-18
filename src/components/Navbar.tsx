"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { asIconSmall } from "@/lib/brand";
import { basePath, localePath, type Locale } from "@/lib/i18n";
import type { Ui } from "@/lib/ui";

const navItems = [
  { key: "home",        href: "/" },
  { key: "about",       href: "/about" },
  { key: "portfolio",   href: "/portfolio" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "openSource",  href: "/open-source" },
  { key: "philosophy",  href: "/engineering-philosophy" },
  { key: "blog",        href: "/blog" },
  { key: "resume",      href: "/resume" },
  { key: "letsTalk",    href: "/lets-talk" },
] as const;

export default function Navbar({ locale, nav }: { locale: Locale; nav: Ui["nav"] }) {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const other: Locale = locale === "ar" ? "en" : "ar";
  // The same page in the other language; every page exists in both.
  const switchHref = localePath(other, basePath(pathname));

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

  // A plain <a>: the two languages use different root layouts, so this is a full page load anyway.
  const languageSwitch = (
    <a
      href={switchHref}
      hrefLang={nav.switchLang}
      lang={nav.switchLang}
      aria-label={nav.switchAria}
      className="px-3 py-1.5 rounded-lg border border-zinc-700/70 text-sm text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
    >
      {nav.switchLabel}
    </a>
  );

  return (
    <nav className={`print:hidden fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? "bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/60 shadow-xl shadow-black/40"
        : "bg-transparent"
    }`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href={localePath(locale, "/")} className="flex items-center gap-2.5 group">
            <svg
              aria-hidden="true"
              viewBox={asIconSmall.viewBox}
              className="h-7 w-[23px] text-zinc-100 group-hover:text-white transition-colors duration-200"
            >
              <path fill="currentColor" fillRule="evenodd" d={asIconSmall.d} />
            </svg>
            <span dir="ltr" className="font-semibold text-zinc-200 group-hover:text-white transition-colors text-sm tracking-tight">
              asaied<span className="text-zinc-400">.dev</span>
            </span>
          </Link>

          {/* Desktop: nine items plus the language switch need ~1000px, so below lg tablets get the menu button. */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const href = localePath(locale, item.href);
              const active = pathname === href;
              return (
                <Link
                  key={item.key}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-2.5 xl:px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    active ? "text-white font-medium" : "text-fg-muted hover:text-zinc-200 font-normal"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-zinc-800 rounded-lg"
                      transition={{ type: "spring", bounce: 0.12, duration: 0.35 }}
                    />
                  )}
                  <span className="relative z-10">{nav[item.key]}</span>
                </Link>
              );
            })}
            <span className="ms-2">{languageSwitch}</span>
          </div>

          {/* Tablet and phone: the language switch stays visible next to the menu button */}
          <div className="lg:hidden flex items-center gap-2">
            {languageSwitch}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? nav.closeMenu : nav.openMenu}
              className="p-2 rounded-lg text-fg-muted hover:text-zinc-200 hover:bg-zinc-800/60 transition-all"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden border-t border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl"
          >
            <div className="max-w-5xl mx-auto px-6 py-3 space-y-1">
              {navItems.map((item) => {
                const href = localePath(locale, item.href);
                const active = pathname === href;
                return (
                  <Link
                    key={item.key}
                    href={href}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "bg-zinc-800 text-white"
                        : "text-fg-muted hover:text-zinc-200 hover:bg-zinc-800/50"
                    }`}
                  >
                    {nav[item.key]}
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
