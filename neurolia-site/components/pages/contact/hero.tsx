"use client";

import { motion } from "framer-motion";
import { BackgroundCircles } from "@/components/ui/background-circles";
import { NrEmphasis } from "@/components/ui/nr-emphasis";

/**
 * CONTACT HERO - "THE INVITATION"
 *
 * Direction: Cinematic opening that mirrors the landing hero's intensity
 * but with an intimate, conversational tone. The visitor has already
 * been convinced — now we welcome them.
 */

export default function ContactHero() {
  return (
    <section
      className="relative min-h-[70dvh] flex flex-col overflow-hidden"
      style={{ backgroundColor: "#050810" }}
    >
      {/* Nebula orb — same as homepage hero for visual continuity */}
      <BackgroundCircles variant="terracotta" />

      {/* Breathing lines — subtle, fewer than hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px hero-breathe-line"
            style={{
              top: `${20 + i * 25}%`,
              background: `linear-gradient(90deg, transparent, rgba(196,92,59,${0.04 - i * 0.008}), transparent)`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

{/* Top spacer */}
      <div className="flex-[0.55]" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            className="mb-3 md:mb-4"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="inline-flex items-center justify-center gap-4 text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#737373] font-medium">
              <motion.span
                className="w-10 h-px bg-[#C45C3B]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              Votre prochaine étape
              <motion.span
                className="w-10 h-px bg-[#C45C3B]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="relative text-[clamp(2rem,5.5vw,3.75rem)] font-[900] tracking-[-0.03em] leading-[0.95]"
            style={{ fontFamily: "var(--font-hero, 'Lexend', sans-serif)" }}
          >
            <span className="sr-only">
              Parlons de vos objectifs.
            </span>
            <span aria-hidden="true">
              <span className="block text-[#F5F5F5]">
                {["Parlons", "de", "vos"].map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.3em]"
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.6 + i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block text-[#F5F5F5]">
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 1.0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="relative hero-respire-glow">
                    objectifs
                    <span className="text-[#C45C3B] hero-dot-pulse">.</span>
                  </span>
                </motion.span>
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-4 md:mt-5 text-base md:text-lg text-[#A3A3A3] leading-[1.7] max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
          >
            Décrivez votre projet en quelques mots.
            <br />
            Un expert Neurolia vous rappelle sous 24h pour analyser vos besoins.
          </motion.p>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="flex-[0.35]" aria-hidden="true" />

      {/* Transition line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(196,92,59,0.3), transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: 2,
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </section>
  );
}
