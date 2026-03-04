"use client";

import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { NrEmphasis } from "@/components/ui/nr-emphasis";

/**
 * CTA FINAL - "THE CLOSING SCENE"
 *
 * Direction: Dramatic full-width cinematic closer
 * Typography that commands attention
 * Single, clear call to action
 */

export default function CtaFinal() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] sm:min-h-[90vh] md:min-h-screen py-12 sm:py-16 md:py-28 lg:py-36 overflow-hidden flex flex-col justify-center"
      style={{ backgroundColor: "#050810" }}
    >
      {/* Dramatic terracotta glow - centered */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] sm:w-[70vw] sm:h-[70vw] md:w-[80vw] md:h-[80vw] max-w-[1000px] max-h-[1000px] pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          className="w-full h-full blur-[200px]"
          style={{
            background: "radial-gradient(circle, rgba(196,92,59,0.2) 0%, rgba(196,92,59,0.05) 40%, transparent 70%)",
            opacity,
          }}
        />
      </div>

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(245,245,245,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(245,245,245,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
        aria-hidden="true"
      />

      {/* Horizontal lines - top and bottom */}
      <div
        className="absolute top-10 sm:top-14 md:top-20 left-[10%] right-[10%] h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(196,92,59,0.2), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 sm:bottom-14 md:bottom-20 left-[10%] right-[10%] h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(196,92,59,0.2), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-[1200px] mx-auto text-center">
        <motion.div style={{ y }}>
          {/* Eyebrow */}
          <motion.div
            className="mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-4">
              <span className="w-8 h-px bg-[#C45C3B]" />
              <span className="text-[0.625rem] tracking-[0.3em] uppercase text-[#737373] font-medium">
                Votre prochaine étape
              </span>
              <span className="w-8 h-px bg-[#C45C3B]" />
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h2
            className="mb-6 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.02em] leading-[0.95]"
            style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="block text-[#9A9A9A]">
              Pendant que vous hésitez,
            </span>
            <span className="block text-[#F5F5F5]">
              vos concurrents avancent
              <span className="text-[#C45C3B]">.</span>
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-base md:text-lg text-[#A3A3A3] leading-[1.7] mb-8 sm:mb-10 md:mb-14 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Un appel de
            <span className="text-[#D4D4D4]"> 30 minutes </span>
            suffit pour analyser votre situation et identifier vos{" "}
            <NrEmphasis>leviers de croissance</NrEmphasis>. Sans engagement, sans jargon.
          </motion.p>

          {/* What happens next - 3 steps */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-8 lg:gap-12 mb-10 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {[
              { step: "01", text: "Vous réservez un créneau" },
              { step: "02", text: "On analyse votre situation" },
              { step: "03", text: "Vous recevez un plan d\u2019action" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3">
                <span
                  className="text-base sm:text-lg font-bold text-[#C45C3B] tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
                >
                  {item.step}
                </span>
                <span className="text-sm text-[#A3A3A3] tracking-wide">
                  {item.text}
                </span>
                {i < 2 && (
                  <span className="hidden md:block w-8 h-px bg-[rgba(196,92,59,0.3)] ml-3" />
                )}
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-8 py-4 md:px-4 md:py-2 bg-[#C45C3B] hover:bg-[#D4683F] transition-all duration-300"
            >
              <span className="text-xs tracking-[0.1em] uppercase font-medium text-[#050810]">
                Réserver mon appel gratuit
              </span>
              <svg
                className="w-3.5 h-3.5 text-[#050810] transition-all duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Final trust + urgency signals */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.6875rem] text-[#525252] tracking-wide">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/70 shrink-0" />
                  Créneaux disponibles cette semaine
                </span>
                <span className="hidden sm:block w-px h-3 bg-[#333]" />
                <span>30 min, sans engagement</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
