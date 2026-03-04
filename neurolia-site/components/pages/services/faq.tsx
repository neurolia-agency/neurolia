"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * USPs SECTION - "Pourquoi Neurolia?"
 *
 * Direction: Editorial 2-column layout
 * Left: Bold headline + accent
 * Right: 3 USP blocks with signature bar accent
 * Matches the visual language of the rest of the page
 */

const usps = [
  {
    number: "01",
    title: "Un partenaire, pas un prestataire",
    description:
      "Acc\u00e8s direct \u00e0 l\u2019\u00e9quipe, roadmap partag\u00e9e, points de suivi r\u00e9guliers. On avance avec vous, pas \u00e0 c\u00f4t\u00e9 de vous.",
    proof: "R\u00e9ponse sous 24h \u2014 toujours le m\u00eame interlocuteur",
  },
  {
    number: "02",
    title: "Conçus pour convertir, pas juste pour exister",
    description:
      "Architecture SEO-first, temps de chargement ultra-rapide, formulaires de conversion int\u00e9gr\u00e9s. Chaque d\u00e9tail sert un objectif : vous rapporter des clients.",
    proof: "Lighthouse > 90 \u2014 site = actif commercial 24/7",
  },
  {
    number: "03",
    title: "Des r\u00e9sultats qui se mesurent",
    description:
      "Pas de promesses vagues. On fixe des KPIs concrets d\u00e8s le d\u00e9part, et on les suit ensemble chaque mois. Vous voyez exactement ce que vos investissements rapportent.",
    proof: "+40% de demandes en moyenne d\u00e8s le 1er mois",
  },
];

export default function Faq() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
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
        ref={containerRef}
        className="px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left column: Sticky headline */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="w-8 h-px bg-[#C45C3B]" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#C45C3B] font-medium">
                Pourquoi nous
              </span>
            </motion.div>

            <motion.h2
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.02em] leading-[1.0] mb-6"
              style={{
                fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-[#F5F5F5]">
                Ce qui change
                <br />
                avec Neurolia
              </span>
              <span className="text-[#C45C3B]">.</span>
            </motion.h2>

            <motion.p
              className="text-sm text-[#A3A3A3] leading-[1.7] max-w-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              On ne vend pas des sites ou des outils.
              On construit des{" "}
              <span className="text-[#D4D4D4] font-medium">
                leviers de croissance
              </span>{" "}
              qui rapportent plus qu&apos;ils ne coûtent.
            </motion.p>
          </div>

          {/* Right column: USP blocks */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {usps.map((usp, index) => (
                <motion.div
                  key={index}
                  className="group relative border-t border-[rgba(245,245,245,0.06)] py-10 md:py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.1,
                  }}
                >
                  <div className="flex gap-6 md:gap-8">
                    {/* Number */}
                    <span
                      className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-[#C45C3B] tracking-[-0.02em] leading-none shrink-0 mt-1"
                      style={{
                        fontFamily:
                          "var(--font-display, 'Satoshi', sans-serif)",
                      }}
                    >
                      {usp.number}
                    </span>

                    <div className="flex-1">
                      <h3
                        className="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-[#F5F5F5] mb-3 tracking-[-0.01em] leading-tight"
                        style={{
                          fontFamily:
                            "var(--font-display, 'Satoshi', sans-serif)",
                        }}
                      >
                        {usp.title}
                      </h3>

                      <p className="text-sm text-[#A3A3A3] leading-[1.7] mb-4 max-w-lg">
                        {usp.description}
                      </p>

                      {/* Proof point */}
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-px bg-[#C45C3B]" />
                        <span className="text-xs font-medium text-[#D4D4D4] tracking-wide">
                          {usp.proof}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* Bottom border */}
              <div className="border-t border-[rgba(245,245,245,0.06)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
