"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Accueil", href: "/", num: "01" },
  { label: "Services", href: "/services", num: "02" },
  { label: "Portfolio", href: "/portfolio", num: "03" },
  { label: "À Propos", href: "/about", num: "04" },
  { label: "Contact", href: "/contact", num: "05" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeMenu]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          BURGER BUTTON — Three-line with terracotta signature bar
      ═══════════════════════════════════════════════════════════ */}
      <button
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] focus:outline-none focus-visible:outline-2 focus-visible:outline-primary"
      >
        {/* Top line */}
        <motion.span
          animate={
            isOpen
              ? { rotate: 45, y: 7, width: 24, backgroundColor: "var(--primary)" }
              : { rotate: 0, y: 0, width: 24, backgroundColor: "var(--foreground)" }
          }
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="block h-[2px] origin-center"
          style={{ width: 24 }}
        />
        {/* Middle line — terracotta signature, shorter */}
        <motion.span
          animate={
            isOpen
              ? { opacity: 0, scaleX: 0 }
              : { opacity: 1, scaleX: 1 }
          }
          transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
          className="block h-[2px] origin-center"
          style={{ width: 12, backgroundColor: "var(--primary)" }}
        />
        {/* Bottom line */}
        <motion.span
          animate={
            isOpen
              ? { rotate: -45, y: -7, width: 24, backgroundColor: "var(--foreground)" }
              : { rotate: 0, y: 0, width: 24, backgroundColor: "var(--foreground)" }
          }
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="block h-[2px] origin-center"
          style={{ width: 24 }}
        />
      </button>

      {/* ═══════════════════════════════════════════════════════════
          FULLSCREEN OVERLAY — Cinematic menu takeover
      ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40"
          >
            {/* Background layers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
              style={{ background: "rgba(5, 8, 16, 0.97)" }}
            />

            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
              }}
            />

            {/* Signature terracotta line at top */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="absolute top-0 left-0 right-0 h-[2px] origin-left"
              style={{
                background: "linear-gradient(90deg, var(--primary) 0%, rgba(196,92,59,0.3) 100%)",
              }}
            />

            {/* ═══════════════════════════════════════════════════════════
                MENU CONTENT
            ═══════════════════════════════════════════════════════════ */}
            <div className="relative z-10 flex h-full flex-col justify-between px-6 pt-24 pb-8 sm:px-10">

              {/* Navigation links */}
              <nav className="flex flex-col" aria-label="Navigation mobile">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + i * 0.08,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    className="group border-b border-white/[0.06]"
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center gap-5 py-5 no-underline [&::after]:hidden"
                    >
                      {/* Number index */}
                      <span
                        className="text-[0.7rem] font-medium tracking-[0.2em] tabular-nums transition-colors duration-300 group-hover:text-primary"
                        style={{ color: "var(--text-subtle)", minWidth: "1.5rem" }}
                      >
                        {link.num}
                      </span>

                      {/* Terracotta vertical bar — appears on hover */}
                      <motion.span
                        className="h-5 w-[3px] origin-center"
                        style={{ backgroundColor: "var(--primary)" }}
                        initial={{ scaleY: 0, opacity: 0 }}
                        whileHover={{ scaleY: 1, opacity: 1 }}
                        transition={{ duration: 0.25 }}
                      />

                      {/* Link label */}
                      <span
                        className="text-[clamp(1.75rem,6vw,2.5rem)] font-bold tracking-tight transition-all duration-300 group-hover:text-foreground group-hover:translate-x-2"
                        style={{
                          color: "var(--text-secondary)",
                          fontFamily: "var(--font-display)",
                          lineHeight: 1.1,
                        }}
                      >
                        {link.label}
                      </span>

                      {/* Arrow — slides in from left on hover */}
                      <ArrowRight
                        className="ml-auto h-5 w-5 -translate-x-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        style={{ color: "var(--primary)" }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* ═══════════════════════════════════════════════════════════
                  BOTTOM — CTA + Footer
              ═══════════════════════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="flex flex-col gap-6"
              >
                {/* CTA Button */}
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="cta-outline-btn group flex w-full items-center justify-center gap-2.5 px-4 py-2 bg-transparent border border-[#C45C3B] hover:bg-[#C45C3B] no-underline [&::after]:hidden"
                >
                  <span className="text-xs tracking-[0.1em] uppercase font-medium text-[#C45C3B] group-hover:text-[#050810] transition-colors duration-300">
                    Discutons de votre projet
                  </span>
                  <svg
                    className="w-3.5 h-3.5 text-[#C45C3B] group-hover:text-[#050810] transition-all duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                {/* Footer info */}
                <span
                  className="text-[0.7rem] tracking-[0.15em] uppercase"
                  style={{ color: "var(--text-subtle)" }}
                >
                  &copy; 2026 Neurolia
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
