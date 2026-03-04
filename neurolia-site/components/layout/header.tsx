"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "@/components/layout/mobile-menu";

const SERVICE_DROPDOWN = [
  { label: "Web", href: "/services#web" },
  { label: "Automatisations", href: "/services#automatisation" },
];

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  }, []);

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "À Propos", href: "/about" },
  ];

  return (
    <>
      {/* SVG Filters — Lens Chromatic Aberration + Barrel Distortion */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* Filter 1: RGB channel split (chromatic aberration) */}
          <filter
            id="chromatic-ab"
            colorInterpolationFilters="sRGB"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feColorMatrix type="matrix" in="SourceGraphic" result="red"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
            <feColorMatrix type="matrix" in="SourceGraphic" result="green"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" />
            <feColorMatrix type="matrix" in="SourceGraphic" result="blue"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" />
            {/* Red shifts right, blue shifts left — like real glass dispersion */}
            <feOffset in="red" dx="6" dy="1" result="r" />
            <feOffset in="blue" dx="-6" dy="-1" result="b" />
            <feBlend mode="screen" in="r" in2="green" result="rg" />
            <feBlend mode="screen" in="rg" in2="b" />
          </filter>
        </defs>
      </svg>

      <header className="fixed top-0 left-0 right-0 z-50 py-3 md:py-4 transition-opacity duration-400">

        {/* Layer 1: Glass body — blur + subtle tint */}
        <div
          className="absolute top-2 left-3 right-3 bottom-2 md:top-3 md:left-8 md:right-8 md:bottom-3 overflow-hidden"
          style={{
            borderRadius: '9999px',
            backdropFilter: 'blur(10px) saturate(130%)',
            WebkitBackdropFilter: 'blur(10px) saturate(130%)',
            background: 'rgba(5, 8, 16, 0.2)',
          }}
        />

        {/* Layer 2: Chromatic aberration — edge-only via radial mask */}
        <div
          className="absolute top-2 left-3 right-3 bottom-2 md:top-3 md:left-8 md:right-8 md:bottom-3 pointer-events-none overflow-hidden"
          style={{
            borderRadius: '9999px',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            filter: 'url(#chromatic-ab)',
            opacity: 0.6,
            maskImage: 'radial-gradient(ellipse 85% 80% at center, transparent 35%, rgba(0,0,0,0.5) 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at center, transparent 35%, rgba(0,0,0,0.5) 80%)',
          }}
        />

        {/* Layer 3: Fresnel rim + glass depth (inset shadows + highlight) */}
        <div
          className="absolute top-2 left-3 right-3 bottom-2 md:top-3 md:left-8 md:right-8 md:bottom-3 pointer-events-none"
          style={{
            borderRadius: '9999px',
            boxShadow: [
              /* Fresnel rim — bright top edge (light reflecting off curved glass) */
              'inset 0 1px 1px rgba(255,255,255,0.15)',
              /* Inner vignette — darkening at edges */
              'inset 0 0 40px rgba(0,0,0,0.25)',
              /* Outer glow — subtle light spill */
              '0 0 20px rgba(196,92,59,0.06)',
              /* Drop shadow — glass floats above content */
              '0 8px 32px rgba(0,0,0,0.2)',
            ].join(', '),
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        />

        {/* Layer 4: Specular highlight (lens reflection spot) */}
        <div
          className="absolute top-2 left-3 right-3 bottom-2 md:top-3 md:left-8 md:right-8 md:bottom-3 pointer-events-none"
          style={{
            borderRadius: '9999px',
            background: 'radial-gradient(ellipse 50% 80% at 25% 30%, rgba(255,255,255,0.07) 0%, transparent 60%)',
          }}
        />

        <div className="w-full mx-auto grid grid-cols-[auto_1fr_auto] items-center relative z-10 px-11 md:px-16">

          {/* Logo */}
          <div className="flex items-center min-w-0">
            <Link
              href="/"
              className="transition-opacity duration-300 hover:opacity-80"
              aria-label="Neurolia - Retour à l'accueil"
            >
              <svg
                viewBox="0 0 71.06 13.94"
                className="h-[15px] md:h-[18px] w-auto text-foreground"
                aria-label="Neurolia"
              >
                <path fill="currentColor" d="M7.78,6.66c.47.7.78,1.22,1.17,1.94-.06-.75-.1-1.5-.1-2.41v-3.71c0-1.07-.03-1.73-.13-2.47h3.47c-.1.73-.13,1.42-.13,2.47v8.65c0,.99.05,1.74.13,2.43h-3.57c-.29-.62-.67-1.22-1.22-2.07l-3.01-4.54c-.44-.65-.72-1.14-1.17-2,.08.73.11,1.63.11,2.43v3.65c0,1.12.03,1.84.13,2.54H0c.1-.63.13-1.35.13-2.56V2.43C.13,1.48.1.75,0,0h3.53c.16.44.52,1.09,1.16,2.04l3.09,4.62Z"/>
                <path fill="currentColor" d="M15.99,9.49c.16,1.32.93,2.02,2.21,2.02.65,0,1.22-.21,1.64-.6.24-.23.36-.41.49-.83l2.83.8c-.37.85-.62,1.22-1.07,1.68-.93.91-2.23,1.38-3.84,1.38s-2.85-.46-3.78-1.38c-.96-.98-1.48-2.36-1.48-3.97,0-3.22,2.07-5.36,5.18-5.36,2.54,0,4.31,1.38,4.88,3.81.13.52.2,1.21.24,2.13,0,.07,0,.16.02.33h-7.33ZM20.22,7.25c-.23-1.04-.93-1.6-2.05-1.6s-1.86.52-2.13,1.6h4.18Z"/>
                <path fill="currentColor" d="M34.37,3.61c-.1.77-.13,1.45-.13,2.44v5.03c0,1.12.03,1.79.13,2.44h-3.24v-.7c0-.08,0-.33.02-.44-1.07,1.01-2,1.4-3.39,1.4-1.09,0-1.97-.31-2.59-.91-.65-.65-.93-1.45-.93-2.74v-4.09c0-.94-.05-1.76-.13-2.44h3.39c-.1.78-.13,1.46-.13,2.44v3.34c0,.67.06.96.26,1.22.23.29.59.46,1.06.46.9,0,1.81-.64,2.44-1.68v-3.34c0-.91-.03-1.6-.13-2.44h3.37Z"/>
                <path fill="currentColor" d="M55.22,0c-.1.68-.13,1.35-.13,2.46v8.63c0,.98.03,1.6.13,2.46h-3.4c.1-.73.13-1.29.13-2.46V2.46c0-1.16-.03-1.84-.13-2.46h3.4Z"/>
                <path fill="currentColor" d="M59.42,3.61c-.1.67-.13,1.32-.13,2.46v5.01c0,.88.05,1.76.13,2.46h-3.4c.1-.8.13-1.42.13-2.46v-5.01c0-1.06-.03-1.73-.13-2.46h3.4ZM59.37,0v2.44h-3.3V0h3.3Z"/>
                <path fill="currentColor" d="M70.93,5.95c0-1.14.03-1.79.13-2.46h-3.4c.02.15.04.3.05.44-.71-.38-1.52-.61-2.38-.61-2.82,0-5.11,2.29-5.11,5.11s2.29,5.11,5.11,5.11c.87,0,1.67-.24,2.38-.61-.02.16-.03.32-.05.49h3.4c-.08-.7-.13-1.58-.13-2.46v-5.01ZM65.49,11.1c-1.47,0-2.67-1.19-2.67-2.67s1.19-2.67,2.67-2.67,2.67,1.19,2.67,2.67-1.19,2.67-2.67,2.67Z"/>
                <g>
                  <circle fill="#c45c3b" cx="45.91" cy="8.46" r="1.66"/>
                  <path fill="currentColor" d="M45.91,3.35c-2.82,0-5.11,2.29-5.11,5.11s2.29,5.11,5.11,5.11,5.11-2.29,5.11-5.11-2.29-5.11-5.11-5.11ZM45.91,11.14c-1.48,0-2.69-1.2-2.69-2.69s1.2-2.69,2.69-2.69,2.69,1.2,2.69,2.69-1.2,2.69-2.69,2.69Z"/>
                </g>
                <path fill="currentColor" d="M38.91,7.11c.36-.45.81-.72,1.37-.83.45-1.15,1.23-2.14,2.24-2.82-.29-.04-.54-.05-.84-.05-1.48,0-2.46.44-3.26,1.48v-1.29h-3.25c.1.7.13,1.27.13,2.46v5.02c0,1.06-.03,1.65-.13,2.46h3.38c-.1-.78-.13-1.4-.13-2.45v-2.54c.07-.72.18-1.06.49-1.45Z"/>
              </svg>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex justify-center items-center gap-x-10" aria-label="Navigation principale">
            {navLinks.map((link) =>
              link.label === "Services" ? (
                /* Services — with dropdown */
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <Link
                    href={link.href}
                    className="group relative flex items-center gap-1.5 py-2 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-muted-fg transition-colors duration-300 hover:text-foreground"
                  >
                    {link.label}
                    {/* Chevron */}
                    <svg
                      className="w-2.5 h-2.5 transition-transform duration-300"
                      style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="square"
                    >
                      <path d="M3 4.5L6 7.5L9 4.5" />
                    </svg>
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 8, x: "-50%" }}
                        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        className="absolute left-1/2 top-full pt-1.5"
                      >
                        {/* Invisible hover bridge */}
                        <div className="absolute -top-1.5 left-0 right-0 h-1.5" />

                        <div
                          className="min-w-[220px] overflow-hidden"
                          style={{
                            backgroundColor: "var(--surface-card)",
                            border: "1px solid rgba(136, 146, 176, 0.15)",
                          }}
                        >
                          {/* Terracotta top accent — brand signature */}
                          <div className="h-[2px] w-full" style={{ backgroundColor: "var(--primary)" }} />

                          {/* Service items */}
                          <div className="py-1.5">
                            {SERVICE_DROPDOWN.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setServicesOpen(false)}
                                className="group/item flex items-center gap-3 px-5 py-2.5 transition-colors duration-300 no-underline [&::after]:hidden"
                              >
                                {/* Terracotta bar — appears on hover */}
                                <span
                                  className="h-3 w-[2px] transition-all duration-300 opacity-0 group-hover/item:opacity-100 scale-y-0 group-hover/item:scale-y-100"
                                  style={{ backgroundColor: "var(--primary)" }}
                                />
                                <span
                                  className="text-[0.75rem] font-medium tracking-[0.08em] transition-colors duration-300"
                                  style={{ color: "var(--text-muted)" }}
                                >
                                  <span className="group-hover/item:text-[var(--text-primary)] transition-colors duration-300">
                                    {item.label}
                                  </span>
                                </span>
                              </Link>
                            ))}
                          </div>

                          {/* Separator */}
                          <div
                            className="mx-4 h-px"
                            style={{ backgroundColor: "rgba(136, 146, 176, 0.1)" }}
                          />

                          {/* Tous nos services */}
                          <div className="py-1.5">
                            <Link
                              href="/services"
                              onClick={() => setServicesOpen(false)}
                              className="group/all flex items-center gap-3 px-5 py-2.5 transition-colors duration-300 no-underline [&::after]:hidden"
                            >
                              <span
                                className="h-3 w-[2px] transition-all duration-300 opacity-0 group-hover/all:opacity-100 scale-y-0 group-hover/all:scale-y-100"
                                style={{ backgroundColor: "var(--primary)" }}
                              />
                              <span
                                className="text-[0.75rem] font-medium tracking-[0.08em] transition-colors duration-300"
                                style={{ color: "var(--text-subtle)" }}
                              >
                                <span className="group-hover/all:text-[var(--primary-light)] transition-colors duration-300 whitespace-nowrap">
                                  Tous nos services
                                </span>
                              </span>
                              <svg
                                className="w-3 h-3 ml-auto -translate-x-1 opacity-0 group-hover/all:translate-x-0 group-hover/all:opacity-100 transition-all duration-300"
                                style={{ color: "var(--primary)" }}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="square"
                              >
                                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Standard nav link */
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative py-2 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-muted-fg transition-colors duration-300 hover:text-foreground"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center justify-end">
            <Link
              href="/contact"
              className="cta-outline-btn group hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C45C3B] border border-[#C45C3B] hover:bg-[#D4683F] hover:border-[#D4683F]"
            >
              <span className="text-[10px] tracking-[0.1em] uppercase font-medium text-[#050810] transition-colors duration-300">
                Audit gratuit
              </span>
              <svg
                className="w-2.5 h-2.5 text-[#050810] transition-all duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <div className="lg:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
