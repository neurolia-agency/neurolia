"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { NrEmphasis } from "@/components/ui/nr-emphasis";

/**
 * CONTACT MINI - "THE INVITATION" (Homepage)
 *
 * Option B: No form. Persuasive block with trust signals
 * and a single CTA linking to /contact.
 *
 * Position: After Testimonials, before FAQ.
 * Tone: Warm, conversational — contrasts with CtaFinal's dramatic urgency.
 *
 * Card effect: Same brushed metal as ServicesPreview cards
 * (steel/terracotta tones, matching animations).
 */

export default function ContactMini() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Brushed steel card — cursor tracking (desktop only, lg+)
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
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#0A0F1A" }}
    >
      {/* Subtle gold ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-full h-full blur-[180px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,97,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 sm:gap-10 md:gap-12 lg:gap-12 items-center">
          {/* Left column — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Surtitre avec lignes */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(245,245,245,0.15)]" />
              <span className="text-[0.625rem] tracking-[0.3em] uppercase text-[#9A9A9A] font-medium">
                VOTRE PROCHAINE ÉTAPE
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(245,245,245,0.15)]" />
            </div>

            <h2
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.02em] leading-[1.1] mb-6"
              style={{
                fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
              }}
            >
              <span className="text-[#9A9A9A]">Pendant que vous hésitez,</span>
              <br />
              <span className="text-[#F5F5F5]">vos concurrents avancent</span>
              <span className="text-[#C45C3B]">.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#D4D4D4] leading-[1.7]">
              Un appel de 30 minutes suffit pour analyser votre situation et identifier <NrEmphasis>vos leviers de croissance</NrEmphasis>. Sans engagement, en toute simplicité.
            </p>
          </motion.div>

          {/* Right column — CTA card with brushed GOLD metal effect */}
          <motion.div
            className="-mx-4 sm:mx-0"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link href="/contact" className="group block">
            <div
              className="relative h-full"
              style={canHover ? { perspective: "800px" } : undefined}
              onMouseMove={canHover ? handleMouseMove : undefined}
              onMouseEnter={canHover ? () => setIsHovered(true) : undefined}
              onMouseLeave={canHover ? handleMouseLeave : undefined}
            >
              <div
                className="svc-card-shine relative px-5 py-5 sm:p-8 md:p-8 lg:p-8 border border-transparent lg:border-[rgba(245,245,245,0.06)] lg:hover:border-[rgba(196,92,59,0.12)] transition-[border-color] duration-700 ease-out overflow-hidden bg-[#111A24] lg:bg-[#0A1018]"
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
                        <filter id="steel-contact" x="0%" y="0%" width="100%" height="100%">
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
                        filter="url(#steel-contact)"
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

                {/* Card content */}
                <div className="relative z-10 space-y-5 sm:space-y-8">
                  {/* What you get */}
                  <div className="space-y-4">
                    <h3
                      className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold text-[#F5F5F5] tracking-[-0.01em] leading-[1.3]"
                      style={{
                        fontFamily:
                          "var(--font-display, 'Satoshi', sans-serif)",
                      }}
                    >
                      <span className="text-[#9A9A9A]">
                        Un appel de 30 minutes.
                      </span>
                      <br />
                      Un plan d&apos;action concret.
                    </h3>
                  </div>

                  {/* Quick benefits */}
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Analyse de votre présence actuelle",
                      "Opportunités identifiées pour votre secteur",
                      "Recommandations personnalisées",
                    ].map((benefit, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: 12 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: 0.4 + i * 0.1,
                        }}
                      >
                        <span className="w-[3px] h-[3px] rounded-full bg-[#C45C3B] mt-[0.6em] shrink-0" />
                        <span className="text-sm text-[#A3A3A3] leading-[1.6]">
                          {benefit}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="pt-1 space-y-3 sm:pt-2 sm:space-y-4 flex flex-col items-center">
                    <div
                      className="cta-pulse-btn inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 bg-[#C45C3B] border border-[#C45C3B] group-hover:bg-[#D4683F] group-hover:border-[#D4683F]"
                    >
                      <span className="text-[0.625rem] sm:text-[0.6875rem] tracking-[0.1em] uppercase font-medium text-[#050810] transition-colors duration-300">
                        Demander mon audit gratuit
                      </span>
                      <svg
                        className="w-3 h-3 text-[#050810] transition-all duration-300 group-hover:translate-x-0.5"
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
                    </div>

                    {/* Microcopy */}
                    <p className="text-[0.625rem] text-[#525252] tracking-wide">
                      Sans engagement &middot; Réponse sous 24h
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
