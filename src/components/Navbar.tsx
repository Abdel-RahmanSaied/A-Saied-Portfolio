"use client";

import React, { useState, useEffect, useRef } from "react";
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
  { key: "work",        href: "/case-studies" },
  { key: "blog",        href: "/blog" },
  { key: "letsTalk",    href: "/lets-talk" },
] as const;

export default function Navbar({ locale, nav }: { locale: Locale; nav: Ui["nav"] }) {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
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
    if (!isOpen) return;
    navRef.current?.querySelector<HTMLAnchorElement>("#mobile-menu a")?.focus();
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key !== "Tab") return;
      const items = Array.from(navRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])
        .filter((el) => el.getClientRects().length > 0);
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first?.focus();
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [isOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
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
      className="shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg border border-zinc-700/70 text-sm text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
    >
      {nav.switchLabel}
    </a>
  );

  return (
    <nav ref={navRef} className={`print:hidden fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? "bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/60 shadow-xl shadow-black/40"
        : "bg-transparent"
    }`}>
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-center gap-4 h-16">

          {/* Logo */}
          <Link href={localePath(locale, "/")} className="shrink-0 flex items-center gap-2.5 group">
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

          {/* Desktop: keep all labels on one line; narrower viewports use the compact menu. */}
          <div className="hidden lg:flex items-center gap-1 mx-auto">
            {navItems.map((item) => {
              const href = localePath(locale, item.href);
              const active = pathname === href || (item.href !== "/" && pathname.startsWith(`${href}/`));
              return (
                <Link
                  key={item.key}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative shrink-0 whitespace-nowrap px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
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
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href={localePath(locale, "/resume")}
              className="shrink-0 whitespace-nowrap px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 text-sm font-semibold hover:bg-white transition-colors"
            >
              {nav.resume}
            </Link>
            {languageSwitch}
          </div>

          {/* Tablet and phone: the language switch stays visible next to the menu button */}
          <div className="lg:hidden ms-auto flex items-center gap-2">
            {languageSwitch}
            <button
              ref={toggleRef}
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
            <div className="max-w-7xl mx-auto px-6 py-3 space-y-1">
              {navItems.map((item) => {
                const href = localePath(locale, item.href);
                const active = pathname === href || (item.href !== "/" && pathname.startsWith(`${href}/`));
                return (
                  <Link
                    key={item.key}
                    href={href}
                    aria-current={active ? "page" : undefined}
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
              <Link
                href={localePath(locale, "/resume")}
                className="block px-4 py-3 rounded-xl bg-zinc-100 text-zinc-950 text-sm font-semibold hover:bg-white transition-colors"
              >
                {nav.resume}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
