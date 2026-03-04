"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";

/**
 * PRICING / INVESTISSEMENT
 *
 * Direction: 3 pricing cards - dark, brushed metal aesthetic
 * Card 2 (L'Écosystème) = featured with terracotta glow border
 * Hover: translateY(-5px) + shadow lift
 * Sharp edges (radius 0), Neurolia DNA
 */

const plans = [
  {
    id: "essentiel",
    tier: "L'Essentiel",
    label: "Site Vitrine Stratégique",
    description: "Pour les entreprises qui veulent exister et rassurer.",
    price: "2 500 €",
    pricePrefix: "À partir de",
    features: [
      "Design UI sur-mesure",
      "Intégration responsive parfaite",
      "Optimisation technique Google (SEO de base)",
      "Formation à la prise en main",
    ],
    cta: "Choisir L'Essentiel",
    ctaStyle: "outline" as const,
    featured: false,
  },
  {
    id: "ecosysteme",
    tier: "L'Écosystème",
    label: "Site + Automatisation",
    description: "Pour ceux qui veulent attirer et convertir automatiquement.",
    price: "4 500 €",
    pricePrefix: "À partir de",
    badge: "Recommandé",
    includesFrom: "Tout \"L'Essentiel\" + :",
    features: [
      "Architecture de conversion avancée",
      "Connexion CRM & Emailing",
      "Mise en place d'un Assistant IA (FAQ/Devis)",
      "Tableau de bord de pilotage",
    ],
    cta: "Choisir L'Écosystème",
    ctaStyle: "solid" as const,
    featured: true,
  },
  {
    id: "sur-mesure",
    tier: "Sur-Mesure",
    label: "Projets complexes",
    description: "Plateformes spécifiques, SAAS, E-commerce lourd.",
    price: "Sur Devis",
    pricePrefix: null,
    footer: "Audit approfondi nécessaire.",
    features: [
      "Audit technique & UX approfondi",
      "Développement spécifique (React/Headless)",
      "Connexions API complexes (ERP, SAAS)",
      "Ateliers de co-conception stratégique",
    ],
    cta: "Nous contacter",
    ctaStyle: "link" as const,
    featured: false,
  },
];

function PricingCard({
  plan,
  index,
  isInView,
}: {
  plan: (typeof plans)[number];
  index: number;
  isInView: boolean;
}) {
  const [gleamPos, setGleamPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef(0);
  const mouseDataRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseDataRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = 0;
          setGleamPos(mouseDataRef.current);
        });
      }
    },
    []
  );

  return (
    <motion.div
      className="relative flex flex-col pt-8"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
    >
      {/* Crown badge — glass morphism with animated gradient border */}
      {plan.badge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          {/* Outer glow */}
          <div
            className="absolute -inset-3 blur-xl opacity-40 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(196,92,59,0.5) 0%, transparent 70%)",
            }}
          />
          {/* Gradient border wrapper */}
          <div
            className="relative p-px"
            style={{
              background: "linear-gradient(135deg, rgba(196,92,59,0.8) 0%, rgba(224,120,86,0.4) 40%, rgba(196,92,59,0.15) 60%, rgba(196,92,59,0.6) 100%)",
            }}
          >
            {/* Inner glass */}
            <span
              className="relative inline-flex items-center gap-2 px-5 py-2"
              style={{
                background: "linear-gradient(135deg, rgba(12,16,32,0.95) 0%, rgba(20,24,42,0.9) 100%)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {/* Subtle inner top highlight */}
              <span
                className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(224,120,86,0.3), transparent)",
                }}
              />
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                <path d="M2 12L1 4l4 3 3-5 3 5 4-3-1 8z" fill="url(#crown-fill)" />
                <path d="M2 12L1 4l4 3 3-5 3 5 4-3-1 8z" stroke="url(#crown-stroke)" strokeWidth="0.5" opacity="0.4" />
                <defs>
                  <linearGradient id="crown-fill" x1="1" y1="2" x2="15" y2="12" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#E07856" />
                    <stop offset="50%" stopColor="#F5C4B0" />
                    <stop offset="100%" stopColor="#C45C3B" />
                  </linearGradient>
                  <linearGradient id="crown-stroke" x1="1" y1="2" x2="15" y2="12" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F5C4B0" />
                    <stop offset="100%" stopColor="#E07856" />
                  </linearGradient>
                </defs>
              </svg>
              <span
                className="text-[10px] tracking-[0.16em] uppercase font-bold"
                style={{
                  background: "linear-gradient(135deg, #E07856 0%, #F5C4B0 50%, #E07856 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {plan.badge}
              </span>
            </span>
          </div>
        </div>
      )}

      <div
        className="relative flex flex-col h-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
          transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
          boxShadow: isHovered
            ? plan.featured
              ? "0 20px 60px -10px rgba(196,92,59,0.15), 0 8px 24px -6px rgba(0,0,0,0.4)"
              : "0 20px 60px -10px rgba(0,0,0,0.5), 0 8px 24px -6px rgba(0,0,0,0.3)"
            : "0 0 0 0 transparent",
        }}
      >
        {/* Featured card glow border */}
        {plan.featured && (
          <div
            className="absolute -inset-px pointer-events-none z-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(196,92,59,0.4) 0%, rgba(196,92,59,0.15) 30%, rgba(196,92,59,0.08) 60%, rgba(196,92,59,0.3) 100%)",
            }}
          />
        )}

        <div
          className={`relative flex flex-col h-full px-6 py-6 md:px-7 md:py-7 overflow-hidden z-[1] ${
            plan.featured
              ? "border border-transparent"
              : "border border-[rgba(245,245,245,0.06)]"
          }`}
          style={{
            backgroundColor: plan.featured ? "#0C1020" : "#080C14",
          }}
        >
          {/* Brushed metal texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              maskImage: isHovered
                ? `radial-gradient(600px 400px at ${gleamPos.x}px ${gleamPos.y}px, black 0%, transparent 70%)`
                : "radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)",
              WebkitMaskImage: isHovered
                ? `radial-gradient(600px 400px at ${gleamPos.x}px ${gleamPos.y}px, black 0%, transparent 70%)`
                : "radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)",
            }}
          >
            <svg
              style={{
                width: "100%",
                height: "100%",
                opacity: 0.04,
                mixBlendMode: "screen",
              }}
              preserveAspectRatio="none"
            >
              <defs>
                <filter
                  id={`steel-pricing-${plan.id}`}
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="1.8 0.004"
                    numOctaves={2}
                    seed={42}
                    stitchTiles="stitch"
                    result="scratches"
                  />
                  <feComponentTransfer in="scratches" result="sharp">
                    <feFuncR type="linear" slope={2.2} intercept={-0.45} />
                    <feFuncG type="linear" slope={2.2} intercept={-0.45} />
                    <feFuncB type="linear" slope={2.2} intercept={-0.45} />
                  </feComponentTransfer>
                  <feColorMatrix type="saturate" values="0" />
                </filter>
              </defs>
              <rect
                width="100%"
                height="100%"
                filter={`url(#steel-pricing-${plan.id})`}
              />
            </svg>
          </div>

          {/* Metallic gleam */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              background: plan.featured
                ? `radial-gradient(500px 350px at ${gleamPos.x}px ${gleamPos.y}px, rgba(196,92,59,0.1) 0%, rgba(220,200,180,0.04) 40%, transparent 70%)`
                : `radial-gradient(500px 350px at ${gleamPos.x}px ${gleamPos.y}px, rgba(220,200,180,0.06) 0%, rgba(196,92,59,0.03) 40%, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Tier */}
            <h3
              className="text-[1.25rem] md:text-[1.35rem] font-bold tracking-[-0.02em] text-[#F5F5F5] leading-[1.1]"
              style={{
                fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
              }}
            >
              {plan.tier}
            </h3>

            {/* Label */}
            <span className="mt-1.5 text-[10px] tracking-[0.15em] uppercase text-[#737373] font-medium">
              {plan.label}
            </span>

            {/* Description */}
            <p className="mt-3 text-[13px] text-[#A3A3A3] leading-[1.5] italic">
              {plan.description}
            </p>

            {/* Price */}
            <div className="mt-4 mb-5">
              {plan.pricePrefix ? (
                <span className="block text-[11px] text-[#737373] tracking-wide mb-0.5">
                  {plan.pricePrefix}
                </span>
              ) : (
                <span className="block text-[11px] tracking-wide mb-0.5" aria-hidden="true">&nbsp;</span>
              )}
              <span
                className={`text-[1.75rem] md:text-[2rem] font-bold tracking-[-0.03em] leading-[1] ${
                  plan.featured ? "text-[#C45C3B]" : "text-[#F5F5F5]"
                }`}
                style={{
                  fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
                }}
              >
                {plan.price}
              </span>
            </div>

            {/* Separator */}
            <div
              className="h-px mb-4"
              style={{
                background: plan.featured
                  ? "linear-gradient(to right, rgba(196,92,59,0.25), rgba(196,92,59,0.08), transparent)"
                  : "linear-gradient(to right, rgba(245,245,245,0.08), rgba(245,245,245,0.02), transparent)",
              }}
            />

            {/* Features */}
            <div className="flex-1">
              {plan.includesFrom && (
                <p className="text-[12px] text-[#A3A3A3] font-medium mb-2">
                  {plan.includesFrom}
                </p>
              )}

              {plan.features.length > 0 && (
                <div className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span
                        className={`w-[4px] h-[4px] mt-[6px] flex-shrink-0 ${
                          plan.featured ? "bg-[#C45C3B]" : "bg-[#525252]"
                        }`}
                      />
                      <span className="text-[12px] md:text-[13px] text-[#D4D4D4] leading-[1.45]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {plan.footer && (
                <p className="mt-3 text-[11px] text-[#737373] italic">
                  {plan.footer}
                </p>
              )}
            </div>

            {/* CTA */}
            <div className="mt-5">
              {plan.ctaStyle === "solid" && (
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2 w-full px-3 py-2.5 bg-[#C45C3B] hover:bg-[#D4683F] transition-colors duration-300"
                >
                  <span className="text-[10px] tracking-[0.08em] uppercase font-bold text-[#050810]">
                    {plan.cta}
                  </span>
                  <svg
                    className="w-3 h-3 text-[#050810] transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="square"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              )}

              {plan.ctaStyle === "outline" && (
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2 w-full px-3 py-2.5 border border-[rgba(245,245,245,0.15)] hover:border-[rgba(245,245,245,0.3)] transition-colors duration-300"
                >
                  <span className="text-[10px] tracking-[0.08em] uppercase font-bold text-[#D4D4D4]">
                    {plan.cta}
                  </span>
                  <svg
                    className="w-3 h-3 text-[#D4D4D4] transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="square"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              )}

              {plan.ctaStyle === "link" && (
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2 w-full px-3 py-2.5 border border-[rgba(245,245,245,0.12)] hover:border-[rgba(245,245,245,0.25)] transition-colors duration-300"
                >
                  <span className="text-[10px] tracking-[0.08em] uppercase font-bold text-[#A3A3A3] group-hover:text-[#D4D4D4] transition-colors duration-300">
                    {plan.cta}
                  </span>
                  <svg
                    className="w-3 h-3 text-[#A3A3A3] group-hover:text-[#D4D4D4] transition-all duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="square"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-14 md:py-18 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "#050810" }}
    >
      {/* Subtle horizontal line at top */}
      <div
        className="absolute top-0 left-[5%] right-[5%] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(196,92,59,0.12), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Subtle centered glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vw] max-w-[900px] max-h-[600px] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-full h-full blur-[180px]"
          style={{
            background:
              "radial-gradient(circle, rgba(196,92,59,0.08) 0%, rgba(196,92,59,0.02) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(245,245,245,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(245,245,245,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-3">
              <span className="w-6 h-px bg-[#C45C3B]" />
              <span className="text-[0.625rem] tracking-[0.3em] uppercase text-[#737373] font-medium">
                Investissement
              </span>
              <span className="w-6 h-px bg-[#C45C3B]" />
            </span>
          </motion.div>

          <motion.h2
            className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] leading-[1.1] text-[#F5F5F5] mb-4"
            style={{
              fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
            }}
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            Des offres claires
            <span className="text-[#C45C3B]">.</span>
            <br />
            <span className="text-[#9A9A9A]">
              Un retour sur investissement mesurable
            </span>
            <span className="text-[#C45C3B]">.</span>
          </motion.h2>

          <motion.p
            className="text-sm md:text-base text-[#A3A3A3] leading-[1.6] max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Chaque euro investi dans votre digital doit vous en rapporter
            davantage.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom trust signal */}
        <motion.div
          className="mt-8 md:mt-10 text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.6875rem] text-[#737373] tracking-wide">
            <span className="flex items-center gap-1.5">
              <span className="w-[5px] h-[5px] bg-[#C45C3B]/40" />
              Sans engagement
            </span>
            <span className="hidden sm:block w-px h-3 bg-[#333]" />
            <span className="flex items-center gap-1.5">
              <span className="w-[5px] h-[5px] bg-[#C45C3B]/40" />
              Paiement échelonné possible
            </span>
            <span className="hidden sm:block w-px h-3 bg-[#333]" />
            <span className="flex items-center gap-1.5">
              <span className="w-[5px] h-[5px] bg-[#C45C3B]/40" />
              Devis personnalisé sous 48h
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
