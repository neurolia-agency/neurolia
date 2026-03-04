"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { NrEmphasis } from "@/components/ui/nr-emphasis";
import { useReducedMotion } from "@/components/ui/use-reduced-motion";

export default function ServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: "#050810" }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(196,92,59,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,92,59,1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Background texture image */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <img
          src="/images/brain.webp"
          alt=""
          className="w-[120%] max-w-none h-auto opacity-[0.06]"
        />
      </div>

      {/* Content */}
      <div
        ref={containerRef}
        className="relative z-10 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto w-full"
      >
        <div className="py-32 md:py-40 text-center">
          {/* Eyebrow */}
          <motion.div
            className="mb-4 flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-3">
              <span className="w-8 h-px bg-[#C45C3B]" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#C45C3B] font-medium">
                Nos services
              </span>
              <span className="w-8 h-px bg-[#C45C3B]" />
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <h1
              className="text-[clamp(2rem,5.5vw,3.75rem)] font-[900] tracking-[-0.015em] leading-[1.1] mb-6 md:mb-8"
              style={{ fontFamily: "var(--font-hero, 'Lexend', sans-serif)" }}
            >
              <span className="block text-[#F5F5F5]">
                L&apos;arsenal complet
              </span>
              <span className="block text-[#F5F5F5]">
                pour votre croissance
                <span className="text-[#C45C3B]">.</span>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-[clamp(1rem,2.2vw,1.25rem)] text-[#A3A3A3] font-light leading-[1.6] max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Nous ne faisons pas que livrer.
            <br />
            Nous construisons{" "}
            <NrEmphasis>l&apos;architecture durable</NrEmphasis>{" "}
            de votre r&eacute;ussite.
          </motion.p>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(196,92,59,0.25), transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: 1,
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </section>
  );
}
