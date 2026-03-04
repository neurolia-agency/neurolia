"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { NrEmphasis } from "@/components/ui/nr-emphasis";

/**
 * FEATURED SERVICES - Immersive Editorial Cards
 *
 * Direction: Magazine-style full-width service blocks
 * Each service = full section with scenario, benefits, metrics
 * Alternating layouts for visual rhythm
 * NO prices — focus on projection and value
 */

// Geometric icons matching Neurolia DNA (sharp, structural)
const ServiceIcon = ({
  type,
}: {
  type: "performance" | "social" | "chatbot" | "auto" | "reactor";
}) => {
  const icons = {
    performance: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect
          x="6"
          y="8"
          width="36"
          height="28"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="6"
          y1="16"
          x2="42"
          y2="16"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M14 24L20 20L26 26L34 18"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect x="14" y="30" width="4" height="2" fill="currentColor" opacity="0.4" />
        <rect x="22" y="30" width="4" height="2" fill="currentColor" opacity="0.4" />
        <rect x="30" y="30" width="4" height="2" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    social: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle
          cx="24"
          cy="24"
          r="16"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="18" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="30" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="32" r="3" stroke="currentColor" strokeWidth="1.5" />
        <line
          x1="20"
          y1="22"
          x2="28"
          y2="22"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          x1="19"
          y1="23"
          x2="23"
          y2="30"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          x1="29"
          y1="23"
          x2="25"
          y2="30"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    ),
    chatbot: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        {/* Brain outline — left hemisphere */}
        <path
          d="M24 10C20 10 16 12 14 15C12 18 12 22 13 25C14 28 16 30 18 32L24 38"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Brain outline — right hemisphere */}
        <path
          d="M24 10C28 10 32 12 34 15C36 18 36 22 35 25C34 28 32 30 30 32L24 38"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Central fissure */}
        <path d="M24 10V38" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        {/* Neural pathways */}
        <path d="M17 18C20 18 22 20 24 20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M31 18C28 18 26 20 24 20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M16 24C19 24 22 26 24 26" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M32 24C29 24 26 26 24 26" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        {/* Neural nodes */}
        <circle cx="17" cy="18" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="31" cy="18" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="16" cy="24" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="32" cy="24" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="24" cy="20" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="24" cy="26" r="1.5" fill="currentColor" opacity="0.5" />
      </svg>
    ),
    auto: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        {/* Hourglass top frame */}
        <path d="M14 8H34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Hourglass bottom frame */}
        <path d="M14 40H34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Hourglass body — top half */}
        <path d="M16 8L24 22" stroke="currentColor" strokeWidth="1.5" />
        <path d="M32 8L24 22" stroke="currentColor" strokeWidth="1.5" />
        {/* Hourglass body — bottom half */}
        <path d="M16 40L24 26" stroke="currentColor" strokeWidth="1.5" />
        <path d="M32 40L24 26" stroke="currentColor" strokeWidth="1.5" />
        {/* Break / crack line */}
        <path d="M20 22L28 26" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        {/* Sand grains — scattered (broken) */}
        <circle cx="22" cy="32" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="26" cy="34" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="24" cy="36" r="1" fill="currentColor" opacity="0.3" />
        {/* Freedom spark */}
        <path d="M36 12L40 8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M38 14L42 12" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      </svg>
    ),
    reactor: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.5" />
        <path d="M24 8V14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 34V40" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 24H14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M34 24H40" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12.3 12.3L16 16" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <path d="M32 32L35.7 35.7" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <path d="M35.7 12.3L32 16" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <path d="M16 32L12.3 35.7" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      </svg>
    ),
  };
  return icons[type];
};

const featuredServices = [
  {
    id: "chatbot-ia",
    icon: "chatbot" as const,
    badge: "Service le plus recommandé",
    title: "Chatbot IA sur-mesure",
    subtitle: "Votre meilleur commercial ne dort jamais.",
    scenario: (
      <>
        Imaginez un commercial qui connaît <NrEmphasis>par cœur chaque produit, chaque tarif, chaque argument</NrEmphasis> de votre entreprise. Qui répond en 2 secondes au lieu de 2 heures. Qui ne prend jamais de pause.
        {"\n\n"}
        Nous intégrons un chatbot IA directement sur votre site web, formé sur l&apos;intégralité de votre savoir-faire&nbsp;: structure de l&apos;entreprise, catalogue commercial, processus internes, FAQ. Il dialogue avec vos visiteurs, qualifie leurs besoins et les convertit en rendez-vous concrets.
      </>
    ),
    benefits: [
      {
        metric: "×3",
        label: "de taux de conversion vs un formulaire classique.",
      },
      {
        metric: "2s",
        label: "de temps de réponse moyen (vs 4h par email).",
      },
      {
        metric: "24/7",
        label: "disponible, même quand vous dormez.",
      },
    ],
    highlights: [
      "Intégré directement sur votre site, prêt à vendre",
      "Formé sur 100% de vos données (offres, tarifs, process)",
      "Répond avec la précision d\u2019un expert métier",
      "Qualifie et convertit vos visiteurs en prospects chauds",
    ],
    forWho: "E-commerce, Cabinets, Prestataires de services",
    cta: "Je veux mon chatbot",
    accent: "IA Conversationnelle",
  },
  {
    id: "automatisation",
    icon: "auto" as const,
    badge: "Impact dès la 1ère semaine",
    title: (<>Votre temps<br />ne se rachète pas</>),
    subtitle: "Votre semaine, libérée.",
    scenario: (
      <>
        Votre expertise a de la valeur, pas vos tâches administratives. Pourtant, chaque semaine, vous perdez des heures sur des{" "}
        <NrEmphasis>micro-tâches invisibles qui vous épuisent</NrEmphasis>
        &nbsp;: relances, saisie de données, tri de fichiers...
        {"\n\n"}
        Nous connectons vos outils pour qu&apos;ils travaillent à votre place. L&apos;objectif est simple&nbsp;:{" "}
        <NrEmphasis>supprimer la friction technique</NrEmphasis> pour alléger votre charge mentale. Retrouvez enfin du temps pour vos clients, votre stratégie ou simplement pour souffler.
      </>
    ),
    benefits: [
      {
        metric: "+10h",
        label: "par semaine gagnée à chaque collaborateur.",
      },
      {
        metric: "0",
        label: "tâche répétitive à gérer manuellement.",
      },
      {
        metric: "100%",
        label: "focus sur votre cœur de métier.",
      },
    ],
    highlights: [
      "Connexion de vos logiciels (fini la double saisie)",
      "L\u2019administratif géré en arrière-plan, sans vous",
      "Réduction drastique de la charge mentale",
      "Des heures récupérées dès la première semaine",
    ],
    forWho: "Équipes commerciales, PME, Prestataires",
    cta: "Je gagne du temps libre",
    accent: "Automatisation Process Internes",
  },
];

// Animated automation dashboard — visual proof of time saved
function AutomationDashboard() {
  const tasks = [
    {
      name: "Relances & follow-ups",
      icon: (
        <svg viewBox="0 0 16 16" fill="none" className="w-[14px] h-[14px]">
          <rect x="1" y="3" width="14" height="10" stroke="currentColor" strokeWidth="1.2" />
          <path d="M1 3l7 5 7-5" stroke="currentColor" strokeWidth="1" />
        </svg>
      ),
    },
    {
      name: "Saisie de données",
      icon: (
        <svg viewBox="0 0 16 16" fill="none" className="w-[14px] h-[14px]">
          <rect x="1" y="1" width="14" height="14" stroke="currentColor" strokeWidth="1.2" />
          <line x1="1" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="0.7" />
          <line x1="1" y1="9" x2="15" y2="9" stroke="currentColor" strokeWidth="0.7" />
          <line x1="6" y1="1" x2="6" y2="15" stroke="currentColor" strokeWidth="0.7" />
        </svg>
      ),
    },
    {
      name: "Tri & classement",
      icon: (
        <svg viewBox="0 0 16 16" fill="none" className="w-[14px] h-[14px]">
          <path d="M3 1h7l3 3v11H3V1z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M10 1v3h3" stroke="currentColor" strokeWidth="1" />
          <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
          <line x1="5" y1="10.5" x2="9" y2="10.5" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
        </svg>
      ),
    },
    {
      name: "Rappels & suivis",
      icon: (
        <svg viewBox="0 0 16 16" fill="none" className="w-[14px] h-[14px]">
          <rect x="1" y="3" width="14" height="12" stroke="currentColor" strokeWidth="1.2" />
          <line x1="1" y1="7" x2="15" y2="7" stroke="currentColor" strokeWidth="1" />
          <line x1="5" y1="1" x2="5" y2="5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="11" y1="1" x2="11" y2="5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative mb-5">
      <div className="relative border border-[rgba(245,245,245,0.04)] bg-[rgba(0,0,0,0.25)] px-3 pt-5 pb-3 overflow-hidden">
        {/* Scan line — terracotta, sweeps top to bottom */}
        <div
          className="absolute left-0 right-0 h-[1px] auto-scan z-10"
          style={{
            background:
              "linear-gradient(to right, transparent 5%, rgba(196,92,59,0.5) 30%, rgba(196,92,59,0.8) 50%, rgba(196,92,59,0.5) 70%, transparent 95%)",
          }}
        />

        {/* Task rows */}
        <div className="relative mt-3">
          {tasks.map((task, i) => (
            <div
              key={i}
              className={`flex items-center justify-between py-2.5 ${
                i < tasks.length - 1
                  ? "border-b border-[rgba(245,245,245,0.03)]"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[#525252]">{task.icon}</span>
                <span className="text-[12px] text-[#737373]">{task.name}</span>
              </div>
              <span
                className={`auto-task-reveal-${i} flex items-center gap-1.5`}
              >
                <span className="w-[4px] h-[4px] bg-[#C45C3B]" />
                <span className="text-[10px] tracking-[0.08em] uppercase font-medium text-[#C45C3B]">
                  Connecté
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Hours saved counter — appears after all tasks connected */}
        <div className="auto-hours-reveal flex items-baseline justify-center gap-1.5 mt-3 pt-3 border-t border-[rgba(245,245,245,0.06)]">
          <span
            className="text-[20px] font-bold text-[#F5F5F5] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
            }}
          >
            +10h
          </span>
          <span className="text-[11px] text-[#525252]">
            /semaine récupérées
          </span>
        </div>
      </div>
    </div>
  );
}

// Single featured service block - alternating layout
function ServiceBlock({
  service,
  index,
}: {
  service: (typeof featuredServices)[number];
  index: number;
}) {
  const blockRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(blockRef, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  // Interactive card state (for site-web homepage-style card)
  const [gleamPos, setGleamPos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);
  const rafRef = useRef(0);
  const mouseDataRef = useRef({ x: 0, y: 0, w: 1, h: 1 });

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    setIsCardHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <div
      id={service.id}
      ref={blockRef}
      className="relative"
      style={{ backgroundColor: index % 2 === 0 ? "#050810" : "#0A0F1A" }}
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

      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto py-20 md:py-28 lg:py-36">
        {/* ── Two-column content: Header + Description + Card — vertically centered ── */}
        <div className={`flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 ${isEven ? "" : "lg:flex-row-reverse"}`}>
          {/* Text column */}
          <div className="flex-1 min-w-0">
            {/* Badge + Title */}
            <div className="mb-4 md:mb-5">
              {"badge" in service && service.badge && (
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#C45C3B]/25 bg-[#C45C3B]/[0.06] text-[#C45C3B]">
                    {service.id === "chatbot-ia" ? (
                      <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0l2.5 5.3L16 6.2l-4 3.8 1 5.5L8 12.8l-5 2.7 1-5.5-4-3.8 5.5-.9z" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M9.5 0L5 8h3.5L7 16l6-9H9l.5-7z" />
                      </svg>
                    )}
                    <span className="text-[10px] tracking-[0.12em] uppercase font-semibold">
                      {service.badge}
                    </span>
                  </span>
                </motion.div>
              )}

              <motion.h2
                className="font-bold text-[var(--text-primary)] text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.02em] leading-[1.0]"
                style={{
                  fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {service.title}
                <span className="text-[#C45C3B]">.</span>
              </motion.h2>
            </div>
            {/* Scenario */}
            <motion.div
              className="text-[15px] md:text-base text-[#A3A3A3] leading-[1.7] mb-5 whitespace-pre-line"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {service.scenario}
            </motion.div>

            {/* Highlights with signature vertical timeline */}
            <motion.div
              className="relative pl-5 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute left-0 top-1 bottom-1 w-px bg-[rgba(82,82,82,0.4)]" />
              <div className="space-y-2.5">
                {service.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 relative">
                    <span
                      className="absolute -left-5 w-[7px] h-[7px] bg-[#C45C3B]"
                      style={{ transform: "translateX(-3px)" }}
                    />
                    <span className="text-[13px] md:text-sm font-medium text-[#D4D4D4]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* For who */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="text-[11px] tracking-[0.15em] text-[#525252] uppercase">
                Pour : {service.forWho}
              </span>
            </motion.div>
          </div>

          {/* Card column */}
          <div className="w-full lg:w-[500px] flex-shrink-0">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div
                className="relative h-full"
                style={{ perspective: "800px" }}
                onMouseMove={handleCardMouseMove}
                onMouseEnter={() => setIsCardHovered(true)}
                onMouseLeave={handleCardMouseLeave}
              >
                <div
                  className="relative px-5 py-5 h-full border border-[rgba(245,245,245,0.06)] hover:border-[rgba(196,92,59,0.15)] transition-[border-color] duration-700 ease-out overflow-hidden"
                  style={{
                    backgroundColor: isEven ? "#0A1018" : "#050810",
                    transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                    transition: isCardHovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
                    transformOrigin: "center center",
                    willChange: "transform",
                  }}
                >
                  {/* Brushed steel texture — revealed by cursor */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      maskImage: isCardHovered
                        ? `radial-gradient(700px 500px at ${gleamPos.x}px ${gleamPos.y}px, black 0%, transparent 70%)`
                        : "radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)",
                      WebkitMaskImage: isCardHovered
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
                        <filter id={`steel-${service.id}`} x="0%" y="0%" width="100%" height="100%">
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
                      <rect width="100%" height="100%" filter={`url(#steel-${service.id})`} />
                    </svg>
                  </div>

                  {/* Metallic gleam — follows cursor */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      opacity: isCardHovered ? 1 : 0,
                      transition: "opacity 0.3s ease",
                      background: `radial-gradient(600px 400px at ${gleamPos.x}px ${gleamPos.y}px, rgba(220,200,180,0.08) 0%, rgba(196,92,59,0.06) 35%, transparent 70%)`,
                    }}
                  />

                  {/* Edge highlight — top */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 1,
                      pointerEvents: "none",
                      opacity: isCardHovered ? 1 : 0,
                      transition: "opacity 0.3s ease",
                      background: `radial-gradient(300px circle at ${gleamPos.x}px 0px, rgba(240,220,200,0.25) 0%, rgba(196,92,59,0.06) 50%, transparent 80%)`,
                    }}
                  />

                  {/* Full-card clickable link */}
                  <Link
                    href="/contact"
                    className="absolute inset-0 z-20"
                    aria-label={service.cta}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header: accent label + icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#C45C3B] font-medium">
                        {service.accent}
                      </span>
                      <div className="w-8 h-8 text-[#C45C3B] opacity-50">
                        <ServiceIcon type={service.icon} />
                      </div>
                    </div>

                    {/* Subtitle */}
                    <h3
                      className="text-[1.1rem] md:text-[1.15rem] font-bold tracking-[-0.02em] text-[#F5F5F5] mb-5 leading-[1.2]"
                      style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
                    >
                      {service.subtitle}
                    </h3>

                    {/* Card content — automation dashboard or benefit metrics */}
                    {service.id === "automatisation" ? (
                      <AutomationDashboard />
                    ) : (
                      <div className="space-y-3 mb-5">
                        {service.benefits.map((benefit, i) => (
                          <motion.div
                            key={i}
                            className="flex items-baseline gap-3"
                            initial={{ opacity: 0, x: 16 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                          >
                            <span className="w-[5px] h-[5px] bg-[#C45C3B] flex-shrink-0 translate-y-[-2px]" />
                            <p className="text-[13px] text-[#8A8A8A] leading-[1.5]">
                              <span
                                className="text-[15px] font-bold text-[#F5F5F5] tracking-[-0.01em] mr-1.5"
                                style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
                              >
                                {benefit.metric}
                              </span>
                              {benefit.label}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Separator */}
                    <div
                      className="h-px mb-4"
                      style={{ background: "linear-gradient(to right, rgba(196,92,59,0.2), rgba(245,245,245,0.04), transparent)" }}
                    />

                    {/* CTA — visual only (card link handles navigation) */}
                    <div
                      className="group/cta flex items-center justify-center gap-2 w-full px-3 py-2 bg-[#C45C3B] pointer-events-none"
                    >
                      <span className="text-[10px] tracking-[0.08em] uppercase font-bold text-[#050810]">
                        {service.cta}
                      </span>
                      <svg
                        className="w-3.5 h-3.5 text-[#050810]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesGrid() {
  return (
    <div id="services-grid">
      {featuredServices.map((service, index) => (
        <ServiceBlock key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}
