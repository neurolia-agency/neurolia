"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BackgroundCircles } from "@/components/ui/background-circles";

export default function Hero() {
  const [respireReady, setRespireReady] = useState(false);

  useEffect(() => {
    // "respire" reveal starts after "Un business qui" finishes (~1.6s)
    // We add a breath pause before it appears
    const timer = setTimeout(() => setRespireReady(true), 1160);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-[100dvh] grid grid-rows-[1fr_auto] overflow-hidden"
      style={{ backgroundColor: "#050810" }}
    >
      {/* Background circles */}
      <BackgroundCircles variant="terracotta" />

      {/* Breathing lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px hero-breathe-line"
            style={{
              top: `${15 + i * 20}%`,
              background: `linear-gradient(90deg, transparent, rgba(196,92,59,${0.05 - i * 0.008}), transparent)`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Contenu principal — 1fr prend tout l'espace, centering garanti */}
      <div className="relative z-10 flex items-center justify-center px-6 md:px-12 lg:px-20 pt-[calc(20vh+24px)] sm:pt-[calc(22vh+32px)] md:pt-[calc(25vh+40px)]">
        <div className="max-w-5xl text-center">

          {/* Tagline — blur-to-focus */}
          <motion.div
            className="mb-2 md:mb-[-6px]"
            initial={{ opacity: 0, filter: "blur(3px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="inline-flex items-center justify-center gap-4 text-[clamp(0.5625rem,1.5vw,0.6875rem)] md:text-[0.75rem] tracking-[0.3em] uppercase text-[#737373] font-medium">
              <motion.span
                className="w-6 sm:w-8 md:w-10 h-px bg-[#C45C3B]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              Agence web & automatisation
              <motion.span
                className="w-6 sm:w-8 md:w-10 h-px bg-[#C45C3B]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1 className="relative">
            <span className="sr-only">Un business qui respire.</span>
            <span aria-hidden="true" className="block">
              {/* "Un business qui" — smooth blur-to-focus stagger */}
              {["Un", "business", "qui"].map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em] text-[clamp(2rem,5.5vw,3.75rem)] tracking-[-0.03em] leading-[0.78] md:leading-[0.75] lg:leading-[0.72] text-[#F5F5F5]"
                  style={{
                    fontFamily: "var(--font-hero, 'Lexend', sans-serif)",
                    fontWeight: 900,
                  }}
                  initial={{ opacity: 0, filter: "blur(5px)", y: 4 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 1.3,
                    delay: 0.5 + i * 0.22,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}

              {/* "respire." — delayed entrance, scale-up reveal, terracotta color transition */}
              <span
                className="inline-block relative text-[clamp(2rem,5.5vw,3.75rem)] tracking-[-0.03em] leading-[0.78] md:leading-[0.75] lg:leading-[0.72]"
                style={{
                  fontFamily: "var(--font-hero, 'Lexend', sans-serif)",
                  fontWeight: 900,
                }}
              >
                {/* "respire" — letter-by-letter reveal */}
                <span className={`relative z-10 inline-block${respireReady ? " hero-respire-glow-loop" : ""}`}>
                  {"respire".split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      className="inline-block text-[#F5F5F5]"
                      initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
                      animate={respireReady ? {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      } : {}}
                      transition={{
                        duration: 0.7,
                        delay: i * 0.14,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>

                {/* Dot — pops in after last letter */}
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={respireReady ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="relative z-10 inline-block text-[#C45C3B]"
                >
                  .
                </motion.span>

                {/* Underline — draws from left after letters */}
                <motion.span
                  className="absolute -bottom-[0.12em] left-0 right-0 h-[3px] bg-[#C45C3B] origin-left z-0"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={respireReady ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.0, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </span>
            </span>
          </motion.h1>

          {/* Sous-titre — blur-to-focus */}
          <motion.p
            className="mt-[15px] mb-6 md:mb-8 text-base md:text-lg text-[#A3A3A3] leading-[1.2] max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, filter: "blur(4px)", y: 6 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.0, delay: 2.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Nous concevons des sites web qui convertissent <br />
            et des automatisations qui libèrent votre temps.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              href="#services"
              className="cta-outline-btn group inline-flex items-center gap-2 px-3 py-1.5 bg-[#C45C3B] border border-[#C45C3B] hover:bg-transparent"
            >
              <span className="text-[clamp(0.5625rem,1.5vw,0.6875rem)] tracking-[0.1em] uppercase font-medium text-[#050810] group-hover:text-[#C45C3B] transition-colors duration-300">
                Découvrir notre approche
              </span>
              <svg
                className="w-3 h-3 text-[#050810] group-hover:text-[#C45C3B] transition-all duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator + Trust signals */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 3.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className="relative w-[1px] h-4 overflow-hidden"
            style={{ backgroundColor: "rgba(82, 82, 82, 0.3)" }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1/2 hero-scroll-line"
              style={{ backgroundColor: "#C45C3B" }}
            />
          </div>
          <span className="text-[clamp(0.5625rem,1.5vw,0.6875rem)] tracking-[0.3em] uppercase text-[#737373] hero-defiler-pulse">
            Défiler
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-2 text-[clamp(0.5625rem,1.5vw,0.6875rem)] tracking-[0.1em] text-[#525252]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/70" />
            Réponse sous 24h
          </span>
          <span className="w-px h-3 bg-[#333]" />
          <span>Premier échange gratuit</span>
          <span className="w-px h-3 bg-[#333]" />
          <span>Sans engagement</span>
        </div>
      </motion.div>

      {/* Ligne de transition */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(196,92,59,0.3), transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 3.8, duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </section>
  );
}
