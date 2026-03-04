"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/components/ui/use-reduced-motion";

export default function PortfolioHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();

  const noMotion = reducedMotion || !inView;

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ backgroundColor: "#050810" }}
    >
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-20 pt-[calc(25vh+40px)]">
        <div ref={ref} className="relative text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <motion.span
            className="block text-[0.625rem] tracking-[0.3em] uppercase text-[var(--primary)] font-medium mb-6"
            initial={reducedMotion ? false : { opacity: 0, y: -10 }}
            animate={noMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Portfolio
          </motion.span>

          {/* Titre H1 — attributs complets */}
          <motion.h1
            className="text-[clamp(2rem,5.5vw,3.75rem)] font-[900] tracking-[-0.03em] leading-[0.95] mb-6"
            style={{
              fontFamily: "var(--font-hero, 'Lexend', sans-serif)",
            }}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={noMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-[#9A9A9A]">Nos derniers projets.</span>
            <br />
            <span className="text-[var(--foreground)]">
              Des résultats concrets
            </span>
            <span className="text-[var(--primary)]">.</span>
          </motion.h1>

          {/* Lead */}
          <motion.p
            className="text-base md:text-lg text-muted-fg leading-relaxed max-w-2xl mx-auto"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={noMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Derrière chaque pixel, il y a l&apos;ambition d&apos;un entrepreneur.
            <br />
            Découvrez comment nous avons transformé leur vision en écosystème
            rentable et durable.
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="flex flex-col items-center gap-4 pb-10"
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={noMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {/* Chevron pulse */}
        <div className="flex flex-col items-center -mt-2 gap-[2px]">
          {[0, 1].map((i) => (
            <motion.svg
              key={i}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              className="text-[#C45C3B]"
              animate={noMotion ? {} : { y: [0, 3, 0], opacity: [0.15 + i * 0.25, 0.6, 0.15 + i * 0.25] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            >
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
            </motion.svg>
          ))}
        </div>
      </motion.div>

      {/* Filigrane décoratif — marquee infini (CSS GPU) */}
      <motion.div
        className="overflow-hidden select-none pointer-events-none relative pb-10"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={noMotion ? {} : { opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{
            width: "max-content",
            fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
            fontSize: "clamp(2.5rem, 8vw, 7rem)",
            fontWeight: 800,
            lineHeight: 1.3,
            letterSpacing: "-0.03em",
            color: "rgba(196, 92, 59, 0.12)",
            WebkitTextStroke: "1.5px var(--primary)",
            opacity: 0.35,
            textShadow: "0 0 40px rgba(196, 92, 59, 0.3), 0 0 80px rgba(196, 92, 59, 0.15)",
            animation: reducedMotion ? "none" : "marquee-scroll 25s linear infinite",
            willChange: "transform",
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="shrink-0 flex items-center">
              <span className="mx-4 md:mx-8">Automatisation</span>
              <span style={{ fontSize: "0.35em", WebkitTextStroke: "none", color: "var(--primary)" }}>●</span>
              <span className="mx-4 md:mx-8">Site Web</span>
              <span style={{ fontSize: "0.35em", WebkitTextStroke: "none", color: "var(--primary)" }}>●</span>
              <span className="mx-4 md:mx-8">AI</span>
              <span style={{ fontSize: "0.35em", WebkitTextStroke: "none", color: "var(--primary)" }}>●</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
