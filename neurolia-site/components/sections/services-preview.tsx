"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { NrEmphasis } from "@/components/ui/nr-emphasis";

/**
 * SERVICES SECTION - "LEVIERS DE CROISSANCE"
 *
 * Direction: Bold typographic hero + clean asymmetric cards
 * "CROISSANCE" as the visual anchor
 * Cards with signature vertical bar accent + geometric icons
 */

// Icônes pleines et évocatrices — parlent directement aux clients PME
const ServiceIcon = ({ type }: { type: "vitrine" | "auto" | "ia" }) => {
  const icons = {
    vitrine: (
      // Storefront/vitrine — présence en ligne, être trouvé
      <svg viewBox="0 0 32 32" fill="currentColor" className="w-full h-full">
        {/* Auvent de boutique */}
        <path d="M3 10L5 4H27L29 10H3Z" />
        <path d="M3 10C3 12.2 4.8 13 6.5 13C8.2 13 10 12.2 10 10" opacity="0.6" />
        <path d="M10 10C10 12.2 11.8 13 13.5 13C15.2 13 17 12.2 17 10" opacity="0.5" />
        <path d="M17 10C17 12.2 18.8 13 20.5 13C22.2 13 24 12.2 24 10" opacity="0.6" />
        <path d="M24 10C24 12.2 25.8 13 27.5 13C29.2 13 29 12.2 29 10" opacity="0.5" />
        {/* Corps de la boutique */}
        <rect x="5" y="13" width="22" height="14" opacity="0.2" />
        {/* Porte */}
        <rect x="12" y="18" width="8" height="9" rx="1" opacity="0.5" />
        {/* Fenêtre */}
        <rect x="7" y="16" width="4" height="4" rx="0.5" opacity="0.4" />
        {/* Enseigne lumineuse - petit point */}
        <circle cx="16" cy="15.5" r="1" opacity="0.7" />
      </svg>
    ),
    auto: (
      // Engrenages imbriqués — mécanique bien huilée, tout roule
      <svg viewBox="0 0 32 32" fill="currentColor" className="w-full h-full">
        {/* Grand engrenage */}
        <path d="M12.5 5.5L13.5 3H18.5L19.5 5.5L22 5L24 2.5L27.5 6L25.5 8.5L27 10.5L29.5 10L30 15L27.5 15.5L27.5 18L30 19.5L28.5 23.5L26 22.5L24 24.5L25 27L21.5 29L20 26.5L17.5 27L17 29.5H13L12.5 27L10 26.5L8 29L4.5 27L6 24.5L4.5 22.5L2 23L1 19L3.5 18L3.5 15.5L1 14.5L2 10.5L4.5 11L6 8.5L4.5 6L8 3.5L10 6L12.5 5.5Z" opacity="0.35" />
        <circle cx="16" cy="16" r="5" opacity="0.55" />
        <circle cx="16" cy="16" r="2" fill="#050810" />
        {/* Petit engrenage — connecté */}
        <path d="M24 20L24.8 18.5H27.2L28 20L29 19.5L30 18L29 17L29.8 15.5L29 14L27.5 14.5L27 13.5L28 12L26.5 11L25.5 12.5L24 12L23.5 10.5H22L21.5 12L20.5 12.5L19 11L18 12.5L19.5 13.5L19 15L17.5 14.5L17 16L18.5 17L18.5 18.5L17 19.5L18 21L19.5 19.5L21 20.5L20.5 22H22.5L23 20.5L24 20Z" opacity="0.3" />
        <circle cx="23.5" cy="16.5" r="2.5" opacity="0.5" />
        <circle cx="23.5" cy="16.5" r="1" fill="#050810" />
      </svg>
    ),
    ia: (
      // Éclair/bolt — puissance, vitesse, énergie décuplée
      <svg viewBox="0 0 32 32" fill="currentColor" className="w-full h-full">
        {/* Halo d'énergie */}
        <circle cx="16" cy="16" r="13" opacity="0.1" />
        <circle cx="16" cy="16" r="10" opacity="0.12" />
        {/* Éclair principal — forme pleine et bold */}
        <path d="M18 2L7 18H14.5L12 30L25 13H17L18 2Z" opacity="0.75" />
        {/* Éclat intérieur */}
        <path d="M17 7L10 18H15L13 26L22 14.5H17L17 7Z" opacity="0.35" fill="#050810" />
      </svg>
    ),
  };
  return icons[type];
};

const services = [
  {
    title: "Identité & Performance",
    icon: "vitrine" as const,
    description: (
      <>
        Oubliez le site vitrine qui prend la poussière. Nous concevons votre écosystème complet&nbsp;: un design unique pour{" "}
        <NrEmphasis>marquer les esprits</NrEmphasis>, et une structure technique pour dominer Google. Votre marque mérite d&apos;être vue et admirée.
      </>
    ),
    features: ["Design 100% sur-mesure", "Référencement Google & visibilité locale", "Navigation pensée pour optimiser la conversion"],
    accent: "Web",
    cta: "Explorer l'offre web",
  },
  {
    title: "Pilote Automatique & IA",
    icon: "auto" as const,
    description: (
      <>
        Arrêtez de perdre votre génie dans la paperasse. Nous déployons des assistants invisibles qui gèrent vos tâches répétitives et{" "}
        <NrEmphasis>qualifient vos prospects</NrEmphasis>. Votre entreprise tourne, même quand vous dormez.
      </>
    ),
    features: ["Zéro tâche administrative manuelle (Devis, Factures...)", "Assistant IA : Réponses et qualification 24/7", "+10h/semaine réinvesties sur votre cœur de métier"],
    accent: "Automatisations",
    cta: "Libérer mon temps",
  },
];

function ServiceCard({
  service,
  index,
  isInView,
}: {
  service: (typeof services)[number];
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [gleamPos, setGleamPos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const rafRef = useRef(0);
  const mouseDataRef = useRef({ x: 0, y: 0, w: 1, h: 1 });

  useEffect(() => {
    setCanHover(window.matchMedia("(min-width: 1024px) and (hover: hover)").matches);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseDataRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      w: rect.width,
      h: rect.height,
    };
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const { x, y, w, h } = mouseDataRef.current;
        setGleamPos({ x, y });
        const normalX = (x / w - 0.5) * 2;
        const normalY = (y / h - 0.5) * 2;
        const maxTilt = 4;
        setTilt({
          rotateY: normalX * maxTilt,
          rotateX: -normalY * maxTilt,
        });
      });
    }
  }, [canHover]);

  const handleMouseLeave = useCallback(() => {
    if (!canHover) return;
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, [canHover]);

  return (
    <motion.div
      key={index}
      className="h-full"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
    >
      <Link href="/contact" className="group relative block h-full">
      <div
        className="relative h-full"
        style={canHover ? { perspective: "800px" } : undefined}
        onMouseMove={canHover ? handleMouseMove : undefined}
        onMouseEnter={canHover ? () => setIsHovered(true) : undefined}
        onMouseLeave={canHover ? handleMouseLeave : undefined}
      >
        <div
          ref={cardRef}
          className="svc-card-shine relative px-5 sm:px-6 md:px-7 lg:px-[2.125rem] pt-3 sm:pt-3.5 md:pt-4 lg:pt-[2.5rem] pb-6 sm:pb-7 md:pb-8 lg:pb-[2.5rem] h-full flex flex-col border border-transparent lg:border-[rgba(245,245,245,0.06)] lg:hover:border-[rgba(196,92,59,0.12)] transition-[border-color] duration-700 ease-out overflow-hidden bg-[#111A24] lg:bg-[#0A1018]"
          style={canHover ? {
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transition: isHovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
            transformOrigin: "center center",
            willChange: "transform",
          } : undefined}
        >
          {/* Brushed steel texture — desktop only */}
          {canHover && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                maskImage: isHovered
                  ? `radial-gradient(700px 500px at ${gleamPos.x}px ${gleamPos.y}px, black 0%, transparent 70%)`
                  : "radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)",
                WebkitMaskImage: isHovered
                  ? `radial-gradient(700px 500px at ${gleamPos.x}px ${gleamPos.y}px, black 0%, transparent 70%)`
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
                  <filter id={`steel-${index}`} x="0%" y="0%" width="100%" height="100%">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="1.8 0.004"
                      numOctaves={2}
                      seed={index + 1}
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
                  filter={`url(#steel-${index})`}
                />
              </svg>
            </div>
          )}
          {/* Metallic gleam — desktop only */}
          {canHover && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.3s ease",
                background: `radial-gradient(600px 400px at ${gleamPos.x}px ${gleamPos.y}px, rgba(220,200,180,0.08) 0%, rgba(196,92,59,0.06) 35%, transparent 70%)`,
              }}
            />
          )}
          {/* Brushed metal edge highlight — desktop only */}
          {canHover && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                pointerEvents: "none",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.3s ease",
                background: `radial-gradient(300px circle at ${gleamPos.x}px 0px, rgba(240,220,200,0.25) 0%, rgba(196,92,59,0.06) 50%, transparent 80%)`,
              }}
            />
          )}

          {/* Header: Accent tag gauche + Icon droite */}
          <div className="relative z-10 flex items-center justify-between mb-4">
            <span className="text-[0.6875rem] sm:text-[0.625rem] tracking-[0.2em] uppercase text-[#C45C3B] font-medium">
              {service.accent}
            </span>
            <div className="w-6 h-6 text-[#C45C3B] opacity-60 lg:group-hover:opacity-100 transition-opacity duration-300">
              <ServiceIcon type={service.icon} />
            </div>
          </div>

          {/* Title */}
          <h3
            className="relative z-10 text-[clamp(1.25rem,3vw,1.75rem)] font-bold tracking-[-0.02em] text-[#F5F5F5] mb-3 leading-[1.1]"
            style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p className="relative z-10 text-sm text-[#A3A3A3] mb-5 leading-[1.6] font-light">
            {service.description}
          </p>

          {/* Features - timeline verticale */}
          <div className="relative z-10 mb-5 pl-4">
            <div className="absolute left-0 top-1 bottom-1 w-px bg-[rgba(82,82,82,0.4)] lg:group-hover:bg-[rgba(196,92,59,0.4)] transition-colors duration-500" />
            <div className="space-y-2.5">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 relative">
                  <span
                    className="absolute -left-4 w-[7px] h-[7px] bg-[#525252] lg:group-hover:bg-[#C45C3B] transition-all duration-300"
                    style={{
                      transitionDelay: `${i * 50}ms`,
                      transform: "translateX(-3px)",
                    }}
                  />
                  <span className="text-sm font-medium text-[#D4D4D4]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA label */}
          <div className="relative z-10 mt-auto flex justify-end">
            <span className="flex items-center gap-2">
              <span
                className="text-xs tracking-[0.12em] uppercase font-medium text-[#C45C3B] lg:text-[#525252] lg:group-hover:text-[#C45C3B] transition-colors duration-300"
              >
                {service.cta}
              </span>
              <svg
                className="w-4 h-4 text-[#C45C3B] lg:text-[#525252] lg:group-hover:text-[#C45C3B] transition-all duration-300"
                style={{
                  transform: isHovered ? "translateX(4px)" : "translateX(0)",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="square" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="relative py-8 md:py-12 lg:py-32 overflow-hidden flex flex-col justify-center"
      style={{ backgroundColor: "#050810" }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(196,92,59,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,92,59,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />


      <div ref={containerRef} className="px-2 sm:px-8 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        {/* Section header */}
        <div className="mb-5 md:mb-6 lg:mb-8">
          {/* Eyebrow */}
          <motion.div
            className="mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-3">
              <span className="w-8 h-px bg-[#C45C3B]" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#C45C3B] font-medium">
                Notre approche
              </span>
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.02em] text-[#F5F5F5] leading-[1.0]"
              style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
            >
              2 leviers pour votre{" "}
              <span
                style={{ fontFamily: "var(--font-hero, 'Lexend', sans-serif)" }}
              >
                croissance
              </span>
              <span className="text-[#C45C3B]">.</span>
            </h2>
          </motion.div>

        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-5 lg:gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Mid-page conversion CTA */}
        <motion.div
          className="mt-8 md:mt-10 flex flex-col items-center gap-4 text-center lg:flex-row lg:justify-between lg:items-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 py-1.5">
            <span className="flex items-center gap-2 text-sm font-medium text-[#F5F5F5] tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full bg-[#C45C3B] opacity-50" />
                <span className="relative inline-flex h-2 w-2 bg-[#C45C3B]" />
              </span>
              <span className="text-[#C45C3B] font-bold">3</span> projets en cours
            </span>
            <span className="hidden sm:block w-px h-4 bg-[rgba(245,245,245,0.12)]" />
            <span className="text-sm text-[#A3A3A3]">
              Plus que <span className="text-[#F5F5F5] font-medium">2 créneaux</span> disponibles en mars
            </span>
          </div>
          <Link
            href="/contact"
            className="cta-outline-btn group inline-flex items-center gap-2.5 px-4 py-2 bg-transparent border border-[#C45C3B] hover:bg-[#C45C3B]"
          >
            <span className="text-xs tracking-[0.1em] uppercase font-medium text-[#C45C3B] group-hover:text-[#050810] transition-colors duration-300">
              Réserver votre appel gratuit
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
