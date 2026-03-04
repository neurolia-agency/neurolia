"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * ALSO SERVICES - Compact grid for supporting services
 * + PROCESS - How we work (3 steps)
 *
 * Direction: Clean, compact presentation for secondary services
 * Follows the editorial rhythm of the featured services
 * Then transitions into how we work together
 */

const secondaryServices = [
  {
    title: "Audit SEO",
    tagline: "Comprenez pourquoi Google vous ignore",
    description:
      "Analyse technique compl\u00e8te, benchmark concurrentiel, et roadmap actionnable pour remonter dans les r\u00e9sultats.",
    highlight: "Quick wins en 2 semaines",
  },
  {
    title: "Contenu SEO mensuel",
    tagline: "Devenez l\u2019autorit\u00e9 de votre march\u00e9",
    description:
      "2 \u00e0 4 articles optimis\u00e9s par mois, recherche de mots-cl\u00e9s, maillage interne et reporting.",
    highlight: "Trafic organique x3 en 6 mois",
  },
  {
    title: "Maintenance & \u00c9volution",
    tagline: "Dormez tranquille, on veille au grain",
    description:
      "Mises \u00e0 jour s\u00e9curit\u00e9, sauvegardes, monitoring, support prioritaire et petites \u00e9volutions incluses.",
    highlight: "Votre CTO externalis\u00e9",
  },
];

const processSteps = [
  {
    number: "01",
    title: "On \u00e9coute",
    description:
      "Un appel de 30 minutes pour comprendre votre activit\u00e9, vos objectifs, et identifier les leviers les plus rentables pour vous.",
  },
  {
    number: "02",
    title: "On propose",
    description:
      "Vous recevez une recommandation claire avec un plan d\u2019action, un calendrier et un budget transparent. Pas de surprise.",
  },
  {
    number: "03",
    title: "On livre",
    description:
      "On construit, vous validez. Des points r\u00e9guliers, une mise en production soign\u00e9e, et un suivi apr\u00e8s lancement.",
  },
];

export default function Process() {
  const secondaryRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const isSecondaryInView = useInView(secondaryRef, {
    once: true,
    margin: "-80px",
  });
  const isProcessInView = useInView(processRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <>
      {/* ════════════════════════════════════════════
          SECONDARY SERVICES - Compact grid
          ════════════════════════════════════════════ */}
      <section
        className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
        style={{ backgroundColor: "#050810" }}
      >
        {/* Top line */}
        <div
          className="absolute top-0 left-[5%] right-[5%] h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(196,92,59,0.12), transparent)",
          }}
          aria-hidden="true"
        />

        <div
          ref={secondaryRef}
          className="px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto"
        >
          {/* Section header */}
          <div className="mb-14 md:mb-16">
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isSecondaryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="w-8 h-px bg-[#C45C3B]" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#C45C3B] font-medium">
                Et aussi
              </span>
            </motion.div>

            <motion.h2
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.02em] text-[#F5F5F5] leading-[1.0]"
              style={{
                fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isSecondaryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Des services qui complètent votre croissance
              <span className="text-[#C45C3B]">.</span>
            </motion.h2>
          </div>

          {/* 3-column cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {secondaryServices.map((service, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isSecondaryInView ? { opacity: 1, y: 0 } : {}
                }
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {/* Signature vertical bar */}
                <div className="absolute left-0 top-0 w-[3px] h-8 bg-[#C45C3B] group-hover:h-full transition-all duration-500" />

                <div
                  className="pl-6 pr-6 py-7 h-full border-t border-r border-b border-[rgba(245,245,245,0.06)] hover:border-[rgba(196,92,59,0.2)] transition-all duration-400 group-hover:bg-[rgba(196,92,59,0.02)]"
                  style={{ backgroundColor: "#0A0F1A" }}
                >
                  <h3
                    className="text-[clamp(1.25rem,3vw,1.75rem)] font-bold tracking-[-0.01em] text-[#F5F5F5] mb-2 leading-tight"
                    style={{
                      fontFamily:
                        "var(--font-display, 'Satoshi', sans-serif)",
                    }}
                  >
                    {service.title}
                  </h3>

                  <p className="text-sm font-medium text-[#C45C3B] mb-4">
                    {service.tagline}
                  </p>

                  <p className="text-sm text-[#A3A3A3] leading-[1.7] mb-5">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#C45C3B]" />
                    <span className="text-xs font-medium text-[#D4D4D4] tracking-wide">
                      {service.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PROCESS - How we work (3 steps)
          ════════════════════════════════════════════ */}
      <section
        className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
        style={{ backgroundColor: "#0A0F1A" }}
      >
        {/* Top line */}
        <div
          className="absolute top-0 left-[5%] right-[5%] h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(196,92,59,0.12), transparent)",
          }}
          aria-hidden="true"
        />

        <div
          ref={processRef}
          className="px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto"
        >
          {/* Section header */}
          <div className="mb-14 md:mb-20">
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isProcessInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="w-8 h-px bg-[#C45C3B]" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#C45C3B] font-medium">
                Comment on travaille
              </span>
            </motion.div>

            <motion.h2
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.02em] leading-[1.0] max-w-2xl"
              style={{
                fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-[#9A9A9A]">Simple.</span>{" "}
              <span className="text-[#F5F5F5]">Transparent.</span>{" "}
              <span className="text-[#F5F5F5]">
                Sans jargon
                <span className="text-[#C45C3B]">.</span>
              </span>
            </motion.h2>
          </div>

          {/* Steps - horizontal on desktop, vertical on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-20">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              >
                {/* Step number - large terracotta */}
                <div className="flex items-start gap-4 mb-4">
                  <span
                    className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-[#C45C3B] tracking-[-0.03em] leading-none"
                    style={{
                      fontFamily:
                        "var(--font-display, 'Satoshi', sans-serif)",
                    }}
                  >
                    {step.number}
                  </span>

                  {/* Connecting line to next step (desktop) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block flex-1 mt-6">
                      <div
                        className="h-px w-full"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(196,92,59,0.3), rgba(196,92,59,0.05))",
                        }}
                      />
                    </div>
                  )}
                </div>

                <h3
                  className="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-[#F5F5F5] mb-3 tracking-[-0.01em]"
                  style={{
                    fontFamily:
                      "var(--font-display, 'Satoshi', sans-serif)",
                  }}
                >
                  {step.title}
                </h3>

                <p className="text-sm text-[#A3A3A3] leading-[1.7]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              href="/contact"
              className="cta-outline-btn group inline-flex items-center gap-2.5 px-4 py-2 bg-transparent border border-[#C45C3B] hover:bg-[#C45C3B]"
            >
              <span className="text-xs tracking-[0.1em] uppercase font-medium text-[#C45C3B] group-hover:text-[#050810] transition-colors duration-300">
                Réserver mon appel gratuit
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

            <div className="flex items-center gap-5 text-[11px] text-[#525252] tracking-wide">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/70" />
                30 min, sans engagement
              </span>
              <span className="w-px h-3 bg-[#333]" />
              <span>Proposition sous 48h</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
