"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ============================================
   CARD 01 — "On écoute" : SCAN CONTINU
   Checklist avec ligne de scan + check pulse
   ============================================ */
function AuditMock() {
  const checklistItems = [
    "Objectifs business",
    "Présence digitale",
    "Concurrence directe",
    "Potentiel de croissance",
  ];

  const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 7L5.5 10L11.5 4" stroke="#C45C3B" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );

  return (
    <div
      className="relative p-3 sm:p-4 md:p-5 lg:h-full"
      style={{ backgroundColor: "#050810" }}
    >
      <div className="text-[0.625rem] tracking-[0.2em] uppercase text-[#525252] mb-4 font-medium">
        AUDIT DE SITUATION
      </div>

      {/* Mobile: static checklist, always visible */}
      <div className="lg:hidden flex flex-col gap-2 sm:gap-3">
        {checklistItems.map((label, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
              <CheckIcon />
            </div>
            <span className="text-[0.8125rem] text-[#6B6B6B]">{label}</span>
          </div>
        ))}
      </div>

      {/* Desktop: animated scan beam + reveal */}
      <div className="hidden lg:block relative overflow-hidden">
        <div className="process-scan absolute inset-0 pointer-events-none z-10">
          <div
            className="absolute left-0 right-0 top-0 h-[2px]"
            style={{
              background: "linear-gradient(to right, transparent, #C45C3B 15%, #C45C3B 85%, transparent)",
              boxShadow: "0 0 6px 1px rgba(196,92,59,0.6), 0 0 16px 3px rgba(196,92,59,0.25), 0 0 32px 6px rgba(196,92,59,0.08)",
            }}
          />
        </div>
        <div className="flex flex-col gap-3">
          {checklistItems.map((label, i) => (
            <div key={i} className={`process-check-reveal-${i} flex items-center gap-3`}>
              <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                <CheckIcon />
              </div>
              <span className="text-[0.8125rem] text-[#6B6B6B]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================
   CARD 02 — "On propose" : CONTEXTE CLIENT
   Dimensions personnalisées avec barres de progression
   ============================================ */
function ProposalMock() {
  const dimensions = [
    { label: "Votre secteur d\u2019activité", fill: "85%" },
    { label: "Vos enjeux prioritaires", fill: "72%" },
    { label: "Votre ambition", fill: "93%" },
  ];

  return (
    <div className="p-3 sm:p-4 md:p-5 lg:h-full" style={{ backgroundColor: "#050810" }}>
      <div className="text-[0.625rem] tracking-[0.2em] uppercase text-[#525252] mb-4 font-medium">
        PROPOSITION PERSONNALISÉE
      </div>

      {/* Mobile: static bars */}
      <div className="lg:hidden flex flex-col gap-3.5">
        {dimensions.map((dim, i) => (
          <div key={i}>
            <div className="flex items-center gap-3 mb-1.5">
              <div className="flex-shrink-0 w-[3px] h-4 bg-[#C45C3B]" />
              <span className="text-[0.8125rem] text-[#A3A3A3]">{dim.label}</span>
            </div>
            <div className="ml-[15px] h-[2px] bg-[rgba(196,92,59,0.08)]">
              <div className="h-full bg-[#C45C3B]/50" style={{ width: dim.fill }} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: animated pulse + fill */}
      <div className="hidden lg:block">
        <div className="flex flex-col gap-3.5 mb-4">
          {dimensions.map((dim, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-1.5">
                <div
                  className="process-module-pulse flex-shrink-0 w-[3px] h-4"
                  style={{ backgroundColor: "#C45C3B", animationDelay: `${i * 1.3}s` }}
                />
                <span className="text-[0.8125rem] text-[#A3A3A3]">{dim.label}</span>
              </div>
              <div className="ml-[15px] h-[2px] bg-[rgba(196,92,59,0.08)] relative overflow-hidden">
                <div
                  className="process-context-fill absolute left-0 top-0 h-full bg-[#C45C3B]/50"
                  style={{ "--fill-to": dim.fill, animationDelay: `${i * 1.3}s` } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================
   CARD 03 — "On livre" : ÉCOSYSTÈME VIVANT
   Site shimmer + data flow + dashboard pulse
   ============================================ */
function EcosystemMock() {
  return (
    <div className="p-3 sm:p-4 md:p-5 lg:h-full" style={{ backgroundColor: "#050810" }}>
      <div className="text-[0.625rem] tracking-[0.2em] uppercase text-[#525252] mb-4 font-medium">
        ÉCOSYSTÈME EN PRODUCTION
      </div>

      {/* Mobile: static ecosystem */}
      <div className="lg:hidden">
        {/* Site */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[0.75rem] text-[#6B6B6B]">Site</span>
            <span className="text-[0.625rem] tracking-[0.15em] uppercase text-[#34D399] font-medium">EN LIGNE</span>
          </div>
          <div className="h-[6px] w-full" style={{ backgroundColor: "#C45C3B" }} />
        </div>
        {/* Automations */}
        <div className="mb-4">
          <div className="text-[0.75rem] text-[#6B6B6B] mb-2">Automatisations</div>
          <div className="flex items-center">
            {["CRM", "Email", "Factu."].map((node, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-2 h-2" style={{ backgroundColor: "#C45C3B" }} />
                  <span className="text-[0.5625rem] text-[#525252] mt-1">{node}</span>
                </div>
                {i < 2 && <div className="flex-1 h-px mx-1" style={{ backgroundColor: "rgba(196,92,59,0.2)" }} />}
              </div>
            ))}
          </div>
        </div>
        {/* Dashboard */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[0.75rem] text-[#6B6B6B]">Dashboard</span>
            <span className="flex items-center gap-1.5 text-[0.625rem] tracking-[0.15em] uppercase text-[#34D399] font-medium">
              <span className="w-1.5 h-1.5 inline-block" style={{ backgroundColor: "#34D399" }} />
              ACTIF
            </span>
          </div>
          <div className="flex gap-4">
            <div>
              <span className="text-[1.125rem] font-bold text-[#F5F5F5] tracking-tight" style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}>127</span>
              <span className="text-[0.5625rem] text-[#525252] uppercase tracking-wider block">leads</span>
            </div>
            <div>
              <span className="text-[1.125rem] font-bold text-[#F5F5F5] tracking-tight" style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}>4.2%</span>
              <span className="text-[0.5625rem] text-[#525252] uppercase tracking-wider block">taux conv.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: animated ecosystem */}
      <div className="hidden lg:block">
        {/* Site: progress bar + shimmer */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[0.75rem] text-[#6B6B6B]">Site</span>
            <span className="process-online-pulse text-[0.625rem] tracking-[0.15em] uppercase text-[#34D399] font-medium">EN LIGNE</span>
          </div>
          <div className="relative h-[6px] w-full overflow-hidden" style={{ backgroundColor: "rgba(196,92,59,0.15)" }}>
            <div className="absolute inset-0" style={{ backgroundColor: "#C45C3B" }} />
            <div
              className="process-shimmer absolute inset-0 w-1/3"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
            />
          </div>
        </div>
        {/* Automations: data flow */}
        <div className="mb-4">
          <div className="text-[0.75rem] text-[#6B6B6B] mb-2">Automatisations</div>
          <div className="flex items-center gap-0">
            <div className="flex flex-col items-center">
              <div className="process-status-pulse w-2 h-2" style={{ backgroundColor: "#C45C3B", animationDelay: "0s" }} />
              <span className="text-[0.5625rem] text-[#525252] mt-1">CRM</span>
            </div>
            <div className="relative flex-1 h-px mx-1 overflow-hidden" style={{ backgroundColor: "rgba(196,92,59,0.2)" }}>
              <div className="process-data-flow absolute top-[-1px] left-0 w-[4px] h-[3px]" style={{ backgroundColor: "#C45C3B", "--flow-distance": "100px" } as React.CSSProperties} />
            </div>
            <div className="flex flex-col items-center">
              <div className="process-status-pulse w-2 h-2" style={{ backgroundColor: "#C45C3B", animationDelay: "0.8s" }} />
              <span className="text-[0.5625rem] text-[#525252] mt-1">Email</span>
            </div>
            <div className="relative flex-1 h-px mx-1 overflow-hidden" style={{ backgroundColor: "rgba(196,92,59,0.2)" }}>
              <div className="process-data-flow absolute top-[-1px] left-0 w-[4px] h-[3px]" style={{ backgroundColor: "#C45C3B", "--flow-distance": "100px", animationDelay: "1.2s" } as React.CSSProperties} />
            </div>
            <div className="flex flex-col items-center">
              <div className="process-status-pulse w-2 h-2" style={{ backgroundColor: "#C45C3B", animationDelay: "1.6s" }} />
              <span className="text-[0.5625rem] text-[#525252] mt-1">Factu.</span>
            </div>
          </div>
        </div>
        {/* Dashboard */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[0.75rem] text-[#6B6B6B]">Dashboard</span>
            <span className="process-status-pulse flex items-center gap-1.5 text-[0.625rem] tracking-[0.15em] uppercase text-[#34D399] font-medium">
              <span className="w-1.5 h-1.5 inline-block" style={{ backgroundColor: "#34D399" }} />
              ACTIF
            </span>
          </div>
          <div className="flex gap-4">
            <div className="process-metric-pulse">
              <span className="text-[1.125rem] font-bold text-[#F5F5F5] tracking-tight" style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}>127</span>
              <span className="text-[0.5625rem] text-[#525252] uppercase tracking-wider block">leads</span>
            </div>
            <div className="process-metric-pulse" style={{ animationDelay: "2s" }}>
              <span className="text-[1.125rem] font-bold text-[#F5F5F5] tracking-tight" style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}>4.2%</span>
              <span className="text-[0.5625rem] text-[#525252] uppercase tracking-wider block">taux conv.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   MOCK COMPONENTS MAP
   ============================================ */
const mockComponents = [AuditMock, ProposalMock, EcosystemMock];

/* ============================================
   PROCESS STEPS DATA
   ============================================ */
const processSteps = [
  {
    number: "01",
    title: "On écoute",
    description:
      "Un appel de 30 minutes pour comprendre votre activité, vos objectifs, et identifier les leviers les plus rentables pour vous.",
  },
  {
    number: "02",
    title: "On propose",
    description:
      "Vous recevez une recommandation claire avec un plan d\u2019action et un calendrier. Pas de surprise.",
  },
  {
    number: "03",
    title: "On livre",
    description:
      "On construit, vous validez. Des points réguliers, une mise en production soignée, et un suivi après lancement.",
  },
];

/* ============================================
   PROCESS SECTION
   ============================================ */
export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      className="relative py-8 md:py-12 lg:py-32"
      style={{ backgroundColor: "#050810" }}
    >

      <div
        ref={sectionRef}
        className="px-1 sm:px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto"
      >
        {/* Section header — left-aligned */}
        <div className="mb-14 md:mb-20">
          <motion.div
            className="flex items-center gap-3 mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="w-8 h-px bg-[#C45C3B]" />
            <span className="text-xs tracking-[0.2em] uppercase text-[#C45C3B] font-medium">
              Notre process
            </span>
          </motion.div>

          <motion.h2
            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.02em] leading-[1.0] max-w-2xl"
            style={{
              fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-[#9A9A9A]">Notre méthode.</span>
            <br />
            <span className="text-[#F5F5F5]">3 étapes, zéro flou</span>
            <span className="text-[#C45C3B]">.</span>
          </motion.h2>
        </div>

        {/* 3-column card grid — subgrid aligns title/desc/mock rows across cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-6 lg:gap-y-0 mb-16 md:mb-20">
          {processSteps.map((step, index) => {
            const MockComponent = mockComponents[index];
            return (
              <motion.div
                key={index}
                className="group relative lg:row-span-3 lg:grid lg:grid-rows-[subgrid]"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {/* Signature vertical bar */}
                <div className="absolute left-0 top-0 w-[3px] h-8 bg-[#C45C3B] group-hover:h-full transition-all duration-500" />

                {/* Row 1: Title */}
                <div
                  className="pl-4 pr-4 sm:pl-5 sm:pr-5 lg:pl-6 lg:pr-6 pt-5 sm:pt-6 lg:pt-7 pb-px border-t border-r border-[rgba(245,245,245,0.06)] group-hover:border-[rgba(196,92,59,0.2)] transition-all duration-400"
                  style={{ backgroundColor: "#0A0F1A" }}
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <h3
                      className="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-[#F5F5F5] tracking-[-0.01em]"
                      style={{
                        fontFamily:
                          "var(--font-display, 'Satoshi', sans-serif)",
                      }}
                    >
                      {step.title}
                    </h3>
                    <span
                      className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-[#C45C3B]/40 tracking-[-0.03em] leading-none"
                      style={{
                        fontFamily:
                          "var(--font-display, 'Satoshi', sans-serif)",
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Row 2: Description */}
                <div
                  className="pl-4 pr-4 sm:pl-5 sm:pr-5 lg:pl-6 lg:pr-6 pb-px border-r border-[rgba(245,245,245,0.06)] group-hover:border-[rgba(196,92,59,0.2)] transition-all duration-400"
                  style={{ backgroundColor: "#0A0F1A" }}
                >
                  <p className="text-sm text-[#A3A3A3] leading-[1.7] mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Row 3: Mock — subgrid ensures this row is equal height across cards */}
                <div
                  className="pl-4 pr-4 sm:pl-5 sm:pr-5 lg:pl-6 lg:pr-6 pb-5 sm:pb-6 lg:pb-7 border-r border-b border-[rgba(245,245,245,0.06)] group-hover:border-[rgba(196,92,59,0.2)] transition-all duration-400"
                  style={{ backgroundColor: "#0A0F1A" }}
                >
                  <div className="border border-[rgba(245,245,245,0.04)] lg:h-full">
                    <MockComponent />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center gap-4 -mt-[15px]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/contact"
            className="cta-outline-btn group inline-flex items-center gap-2.5 px-4 py-2 bg-transparent border border-[#C45C3B] hover:bg-[#C45C3B]"
          >
            <span className="text-xs tracking-[0.1em] uppercase font-medium text-[#C45C3B] group-hover:text-[#050810] transition-colors duration-300 whitespace-nowrap">
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

        </motion.div>
      </div>
    </section>
  );
}
