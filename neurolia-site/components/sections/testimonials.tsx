"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * TESTIMONIALS SECTION - "THE VOICES"
 *
 * Direction: Dramatic quote layouts with oversized punctuation
 * Staggered cards that feel like pulled quotes from a magazine
 */

const testimonials = [
  {
    quote: "Depuis la refonte, nos pages produits convertissent vraiment. Les fiches sont claires, le parcours d'achat est fluide, et les automatisations mailing nous font gagner un temps fou sur la relance client. On a enfin un site à la hauteur de nos produits.",
    author: "Fabrizio Sciola",
    role: "Fondateur",
    company: "Future of Grow",
    highlight: "2x",
    highlightLabel: "plus de commandes en ligne",
  },
  {
    quote: "Ils ont su capter l'identité de La Pause dès le premier échange. Le logo, l'univers visuel, tout est cohérent et nous ressemble. Nos clients nous disent que ça donne envie de pousser la porte. C'est exactement ce qu'on voulait.",
    author: "Patricia Caplain",
    role: "Gérante",
    company: "La Pause",
    highlight: "100%",
    highlightLabel: "fidèle à notre identité",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      className="relative min-h-screen py-8 md:py-12 lg:py-32 overflow-hidden flex flex-col justify-center"
      style={{ backgroundColor: "#050810" }}
    >
      {/* Large decorative quote mark */}
      <div
        className="absolute top-10 right-[3%] text-[40rem] font-black leading-none text-[rgba(196,92,59,0.04)] select-none pointer-events-none hidden md:block"
        style={{ fontFamily: "Georgia, serif" }}
        aria-hidden="true"
      >
        "
      </div>

      {/* Vertical accent line */}
      <div
        className="absolute left-[8%] top-0 bottom-0 w-px hidden lg:block"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(245,245,245,0.08) 30%, rgba(245,245,245,0.08) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div ref={containerRef} className="px-2 sm:px-6 md:px-12 lg:px-20 max-w-[100rem] mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-14 md:mb-28 lg:mb-32 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[0.6875rem] sm:text-[0.625rem] tracking-[0.3em] uppercase text-[#C45C3B] font-medium block mb-3">
            Témoignages
          </span>
          <h2
            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.02em] leading-[1.0]"
            style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
          >
            <span className="text-[#9A9A9A]">Nos clients témoignent.</span>
            <br />
            <span className="text-[#F5F5F5]">Leurs résultats parlent</span>
            <span className="text-[#C45C3B]">.</span>
          </h2>
        </motion.div>

        {/* Testimonials - Asymmetric stack */}
        <div className="space-y-6 sm:space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={`relative ${index === 1 ? "md:mt-20 lg:mt-32" : ""}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
            >
              <div
                className="relative p-5 sm:p-6 md:p-10 lg:p-14 border border-[rgba(245,245,245,0.08)]"
                style={{ backgroundColor: "rgba(10,15,26,0.75)" }}
              >
                {/* Opening quote mark */}
                <div
                  className="absolute -top-8 -left-3 text-9xl font-black text-[#C45C3B] opacity-30 leading-none"
                  style={{ fontFamily: "Georgia, serif" }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                {/* Metric highlight */}
                <div className="mb-8 flex items-baseline gap-3">
                  <span
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-[#C45C3B] tracking-[-0.03em]"
                    style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
                  >
                    {testimonial.highlight}
                  </span>
                  <span className="text-sm md:text-base uppercase tracking-[0.1em] text-[#737373] font-medium">
                    {testimonial.highlightLabel}
                  </span>
                </div>

                {/* Quote text */}
                <blockquote className="mb-8">
                  <p className="text-sm md:text-base text-[#D4D4D4] leading-[1.75] font-light">
                    {testimonial.quote}
                  </p>
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center gap-4">
                  {/* Terracotta line */}
                  <span className="w-6 sm:w-8 md:w-10 h-px bg-[#C45C3B]" />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-[#F5F5F5] leading-none">
                      {testimonial.author}
                    </span>
                    <span className="text-xs text-[#5E5E5E] leading-none">
                      {testimonial.role}, {testimonial.company}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust bridge CTA after testimonials */}
        <motion.div
          className="mt-24 md:mt-28 lg:mt-36 flex flex-col items-center gap-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <p className="text-sm text-[#737373] tracking-wide">
            Chaque projet commence par un échange de 30 minutes, sans engagement.
          </p>
          <Link
            href="/contact"
            className="cta-outline-btn group inline-flex items-center gap-2.5 px-4 py-2 bg-transparent border border-[#C45C3B] hover:bg-[#C45C3B]"
          >
            <span className="text-xs tracking-[0.1em] uppercase font-medium text-[#C45C3B] group-hover:text-[#050810] transition-colors duration-300">
              Discuter de votre projet
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
