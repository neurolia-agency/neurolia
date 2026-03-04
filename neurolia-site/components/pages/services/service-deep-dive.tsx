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
      initial={{ opacity: 0, x: -16 }}
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
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
      <rect x="3" y="3" width="18" height="18" strokeWidth="1.5" />
      <path d="M3 9h18" strokeWidth="1" opacity="0.5" />
      <path d="M7 14l3-2 3 3 4-4" strokeWidth="1.5" />
    </svg>
  ),
  seo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
      <circle cx="11" cy="11" r="7" strokeWidth="1.5" />
      <path d="M16 16l5 5" strokeWidth="1.5" />
      <path d="M8 11h6" strokeWidth="1" opacity="0.5" />
      <path d="M11 8v6" strokeWidth="1" opacity="0.5" />
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
      <path d="M4 4h16v16H4z" strokeWidth="1.5" />
      <path d="M7 8h10" strokeWidth="1.5" />
      <path d="M7 12h7" strokeWidth="1" opacity="0.6" />
      <path d="M7 16h4" strokeWidth="1" opacity="0.4" />
    </svg>
  ),
};

// ─── Main Section Component ─────────────────────────────────
export default function ServiceDeepDive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const features = [
    {
      icon: featureIcons.design,
      title: "Design Signature",
      description:
        "Zéro template, 100% sur-mesure. Chaque pixel sert votre marque et votre conversion.",
    },
    {
      icon: featureIcons.seo,
      title: "Architecture SEO Technique",
      description:
        "Structure, balisage, vitesse : les fondations invisibles pour dominer Google localement.",
    },
    {
      icon: featureIcons.copy,
      title: "Copywriting de conversion inclus",
      description:
        "Chaque mot est pensé pour guider, rassurer et déclencher l'action.",
    },
  ];

  return (
    <section
      id="web"
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
        {/* Zig-Zag: Text LEFT / Visual RIGHT */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-28">
          {/* ── Text column ── */}
          <div className="flex-[1.6] min-w-0">
            {/* Eyebrow */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-3">
                <span className="w-8 h-px bg-[#C45C3B]" />
                <span className="text-xs tracking-[0.2em] uppercase text-[#C45C3B] font-medium">
                  Le Web
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
              Plus qu&apos;une vitrine,
              <br />
              <NrEmphasis variant="trace">une machine à vendre</NrEmphasis>
              <span className="text-[#C45C3B]">.</span>
            </motion.h2>

            {/* Body copy */}
            <motion.p
              className="text-[15px] md:text-base text-[#A3A3A3] leading-[1.7] mb-8 max-w-xl"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Un beau site ne suffit pas. Ce qui compte, c&apos;est un site
              qui{" "}
              <span className="text-[#D4D4D4] font-medium">
                travaille pour vous
              </span>
              &nbsp;: une structure SEO pensée pour dominer Google, une vitesse
              qui rassure vos visiteurs, et une expérience conçue pour
              transformer chaque clic en action.
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
                href="/portfolio"
                className="group inline-flex items-center gap-2.5"
              >
                <span className="w-[3px] h-5 bg-[#C45C3B] group-hover:h-6 transition-all duration-300" />
                <span className="text-xs tracking-[0.1em] uppercase font-medium text-[#737373] group-hover:text-[#C45C3B] transition-colors duration-300">
                  Voir nos réalisations Web
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

          {/* ── Visual column — Web States image ── */}
          <motion.div
            className="w-full lg:w-[38%] flex-shrink-0"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative"
              style={{
                maskImage: `
                  linear-gradient(to right, transparent 0%, black 15%, black 90%, transparent 100%),
                  linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%)
                `,
                maskComposite: "intersect",
                WebkitMaskImage: `
                  linear-gradient(to right, transparent 0%, black 15%, black 90%, transparent 100%),
                  linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%)
                `,
                WebkitMaskComposite: "source-in",
              }}
            >
              <img
                src="/images/web-states.webp"
                alt="Couches techniques d'un site web performant — design, structure et données"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
