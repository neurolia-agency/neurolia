"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TERRACOTTA = "#C45C3B";

const benefits = [
  { text: "Visibilit\u00e9", color: "#D4A574" },    // warm sand
  { text: "Conversion", color: "#C4829B" },          // dusty rose
  { text: "Automatisation", color: "#7B9EC4" },      // steel blue
  { text: "Libert\u00e9", color: "#8BB89E" },        // sage green
  { text: "Performance", color: "#D49B7A" },         // warm copper
  { text: "Sur-mesure", color: "#A68BC4" },          // soft lavender
  { text: "Excellence", color: "#6BBAB0" },          // muted teal
  { text: "Croissance", color: "#CDB87A" },          // warm gold
  { text: "Impact", color: "#B88BA6" },              // dusty mauve
  { text: "Confiance", color: "#8AAAB8" },           // soft blue-gray
];

function BenefitItem({ text, color }: { text: string; color: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [0.2, 0.2, 1, 0.2, 0.2]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [color, color, TERRACOTTA, color, color]
  );

  return (
    <motion.li
      ref={ref}
      style={{ opacity, color: textColor }}
      className="leading-[1.3]"
    >
      {text}
    </motion.li>
  );
}

export default function ScrollBenefits() {
  return (
    <section
      className="relative"
      style={{ backgroundColor: "#000" }}
    >
      <div className="px-4 md:px-12 lg:px-20 max-w-[1440px] mx-auto py-[15vh] sm:py-[25vh] md:py-[35vh]">
        <div className="grid grid-cols-[auto_1fr] items-start gap-2 sm:gap-4 md:gap-8 lg:gap-12">
          {/* Sticky logo */}
          <div
            className="self-start sticky min-w-max"
            style={{ top: "calc(50vh - clamp(0.525rem, 2.1vw, 1.925rem))" }}
          >
            <img
              src="/logo/neurolia-light.svg"
              alt="Neurolia"
              className="h-[clamp(1.05rem,4.2vw,3.85rem)] w-auto"
            />
          </div>

          {/* Scrolling benefits */}
          <ul
            className="text-[clamp(1.725rem,6.9vw,6.325rem)] font-[600] list-none p-0 m-0 tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
            }}
          >
            {benefits.map((b) => (
              <BenefitItem key={b.text} text={b.text} color={b.color} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
