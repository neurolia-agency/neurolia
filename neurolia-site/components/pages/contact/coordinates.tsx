"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { NrEmphasis } from "@/components/ui/nr-emphasis";

/**
 * COORDINATES - "THE DETAILS"
 *
 * Direction: Left sidebar with trust-building copy and concrete details.
 * Same visual hierarchy as the ContactMini left column on the homepage,
 * but expanded with more information for the dedicated page.
 */

const contactDetails = [
  {
    label: "Email",
    value: "contact@neurolia.work",
    href: "mailto:contact@neurolia.work",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    label: "Disponibilités",
    value: "24/7",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const socials = [
  { name: "Instagram", href: "https://instagram.com/neurolia", icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
  { name: "Facebook", href: "https://facebook.com/neurolia", icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
  { name: "X", href: "https://x.com/neurolia", icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
  { name: "LinkedIn", href: "https://linkedin.com/company/neurolia", icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
];

export default function Coordinates() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={containerRef}
      className="lg:sticky lg:top-32"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      {/* Section eyebrow */}
      <span className="inline-flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-[#C45C3B]" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#C45C3B] font-medium">
          Contact
        </span>
      </span>

      {/* Headline — same bicolor pattern as homepage sections */}
      <h2
        className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.02em] leading-[1.0] mb-6"
        style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
      >
        <span className="text-[#F5F5F5]">On vous écoute</span>
        <span className="text-[#C45C3B]">.</span>
      </h2>

      {/* Value prop */}
      <p className="text-base text-[#A3A3A3] leading-[1.7] mb-10 max-w-md font-light">
        Ne restez pas avec vos doutes. Dites-nous où vous en êtes. <NrEmphasis>Nous vous rappelons sous 24h</NrEmphasis> pour auditer votre situation, gratuitement et sans engagement.
      </p>

      {/* Trust indicators — single line */}
      <motion.div
        className="flex items-center gap-6 mb-14"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {[
          { value: "24h", label: "Réponse garantie" },
          { value: "0€", label: "Analyse offerte" },
          { value: "97%", label: "Satisfaits" },
        ].map((item, i) => (
          <div key={i} className="flex items-baseline gap-2">
            <span
              className="text-lg font-bold text-[#F5F5F5] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
              }}
            >
              {item.value}
            </span>
            <span className="text-[11px] text-[#525252] tracking-wide">
              {item.label}
            </span>
            {i < 2 && (
              <span className="ml-4 w-px h-3 bg-[rgba(245,245,245,0.08)]" />
            )}
          </div>
        ))}
      </motion.div>

      {/* Contact details */}
      <div className="space-y-5">
        {contactDetails.map((detail, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -15 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
          >
            <span className="text-[#C45C3B] shrink-0">{detail.icon}</span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#525252] mb-0.5">
                {detail.label}
              </span>
              {detail.href ? (
                <Link
                  href={detail.href}
                  className="text-sm text-[#D4D4D4] hover:text-[#C45C3B] transition-colors duration-300"
                >
                  {detail.value}
                </Link>
              ) : (
                <span className="text-sm text-[#D4D4D4]">{detail.value}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Socials — separated, subtle */}
      <motion.div
        className="mt-8 pt-6 border-t border-[rgba(245,245,245,0.06)]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <span className="text-[10px] uppercase tracking-[0.15em] text-[#525252]">
          Réseaux
        </span>
        <div className="flex items-center gap-4 mt-2.5">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="text-[#525252] hover:text-[#C45C3B] transition-colors duration-300"
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
