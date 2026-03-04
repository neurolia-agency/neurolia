"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { NrEmphasis } from "@/components/ui/nr-emphasis";

// ─── Feature item with icon ─────────────────────────────────
function FeatureItem({
  icon,
  title,
  description,
  index,
  isInView,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: 16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.12 }}
    >
      <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center border border-[rgba(245,245,245,0.08)] bg-[rgba(196,92,59,0.04)]">
        <div className="w-4 h-4 text-[#C45C3B]">{icon}</div>
      </div>
      <div>
        <h4
          className="text-[15px] font-bold text-[#F5F5F5] mb-1 tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
        >
          {title}
        </h4>
        <p className="text-[13px] text-[#A3A3A3] leading-[1.6]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Feature icons ──────────────────────────────────────────
const featureIcons = {
  sync: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
      <path d="M4 12a8 8 0 0114-5.3" strokeWidth="1.5" />
      <path d="M20 12a8 8 0 01-14 5.3" strokeWidth="1.5" />
      <path d="M18 2v5h-5" strokeWidth="1.5" />
      <path d="M6 22v-5h5" strokeWidth="1.5" />
    </svg>
  ),
  bot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
      <rect x="4" y="8" width="16" height="12" rx="1" strokeWidth="1.5" />
      <circle cx="9" cy="14" r="1.5" strokeWidth="1.5" />
      <circle cx="15" cy="14" r="1.5" strokeWidth="1.5" />
      <path d="M12 4v4" strokeWidth="1.5" />
      <circle cx="12" cy="3" r="1" strokeWidth="1.5" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
      <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
      <path d="M12 7v5l3 3" strokeWidth="1.5" />
    </svg>
  ),
};

// ─── Main Section Component ─────────────────────────────────
export default function ServiceDeepDiveAuto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const features = [
    {
      icon: featureIcons.sync,
      title: "Zéro saisie manuelle",
      description:
        "Connexion directe CRM, facturation, agenda. Vos outils se parlent enfin sans que vous leviez le petit doigt.",
    },
    {
      icon: featureIcons.bot,
      title: "Agents IA de qualification",
      description:
        "Vos prospects reçoivent une réponse en moins de 2 minutes, 24h/24. Vous ne perdez plus aucune opportunité.",
    },
    {
      icon: featureIcons.clock,
      title: "+10h/semaine récupérées",
      description:
        "Du temps réinvesti sur votre cœur de métier, pas sur de la paperasse.",
    },
  ];

  return (
    <section
      id="automatisation"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#050810" }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-[5%] right-[5%] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(196,92,59,0.12), transparent)",
        }}
        aria-hidden="true"
      />

      <div
        ref={sectionRef}
        className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto py-20 md:py-28 lg:py-36"
      >
        {/* Zig-Zag INVERSÉ: Visual LEFT / Text RIGHT */}
        <div className="flex flex-col lg:flex-row-reverse lg:items-center gap-16 lg:gap-28">
          {/* ── Text column ── */}
          <div className="flex-[1.6] min-w-0">
            {/* Eyebrow */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-3">
                <span className="w-8 h-px bg-[#C45C3B]" />
                <span className="text-xs tracking-[0.2em] uppercase text-[#C45C3B] font-medium">
                  L&apos;Automatisation
                </span>
              </span>
            </motion.div>

            {/* H2 */}
            <motion.h2
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.02em] text-[#F5F5F5] leading-[1.05] mb-6"
              style={{
                fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Vos opérations sur
              <br />
              <NrEmphasis variant="trace">pilote automatique</NrEmphasis>
              <span className="text-[#C45C3B]">.</span>
            </motion.h2>

            {/* Body copy */}
            <motion.p
              className="text-[15px] md:text-base text-[#A3A3A3] leading-[1.7] mb-8 max-w-xl"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Relances, devis, suivi client, facturation… Vous passez plus de
              temps à gérer qu&apos;à{" "}
              <span className="text-[#D4D4D4] font-medium">
                faire ce que vous aimez
              </span>
              . Neurolia déploie des assistants invisibles qui absorbent la
              paperasse et libèrent vos journées.
            </motion.p>

            {/* Features list */}
            <div className="space-y-5 mb-8">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Micro-CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5"
              >
                <span className="w-[3px] h-5 bg-[#C45C3B] group-hover:h-6 transition-all duration-300" />
                <span className="text-xs tracking-[0.1em] uppercase font-medium text-[#737373] group-hover:text-[#C45C3B] transition-colors duration-300">
                  J&apos;optimise mon temps
                </span>
                <svg
                  className="w-3.5 h-3.5 text-[#525252] group-hover:text-[#C45C3B] group-hover:translate-x-0.5 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="square"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* ── Visual column — AI image ── */}
          {/* ── Visual column — AI image ── */}
          <motion.div
            className="w-full lg:w-[38%] flex-shrink-0"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <img
                src="/images/ai.webp"
                alt="Intelligence artificielle et automatisation — agents IA au service de votre productivité"
                className="w-full h-auto"
              />
              {/* Gradient overlay — top */}
              <div
                className="absolute inset-x-0 top-0 h-[30%] pointer-events-none"
                style={{ background: "linear-gradient(to bottom, #050810, transparent)" }}
              />
              {/* Gradient overlay — bottom */}
              <div
                className="absolute inset-x-0 bottom-0 h-[35%] pointer-events-none"
                style={{ background: "linear-gradient(to top, #050810, transparent)" }}
              />
              {/* Gradient overlay — left (côté bord page) */}
              <div
                className="absolute inset-y-0 left-0 w-[30%] pointer-events-none"
                style={{ background: "linear-gradient(to right, #050810, transparent)" }}
              />
              {/* Gradient overlay — right (côté texte) */}
              <div
                className="absolute inset-y-0 right-0 w-[25%] pointer-events-none"
                style={{ background: "linear-gradient(to left, #050810, transparent)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
