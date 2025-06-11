"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Let's Talk", href: "/lets-talk" },
  ];

  // Toggle logic
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && !(e.target as HTMLElement).closest("nav")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="A.Saied Dev - Home">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="ml-2 text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
              A.Saied Dev
            </span>
          </Link>

          {/* Desktop Menu (centered items) */}
          <div className="hidden md:flex justify-center flex-1">
            <div className="flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu icon */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Items */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-slate-950/95 backdrop-blur-md border-t border-white/10 transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-4 space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-slate-300 hover:text-white hover:bg-white/5 px-3 py-3 rounded-md text-sm font-medium transition-all duration-300"
              onClick={closeMenu}
              style={{
                animationDelay: isOpen ? `${index * 100}ms` : "0ms"
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;