"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface BackgroundCirclesProps {
  className?: string;
  variant?: keyof typeof COLOR_VARIANTS;
}

const COLOR_VARIANTS = {
  primary: {
    border: [
      "border-emerald-500/60",
      "border-cyan-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-emerald-500/30",
  },
  secondary: {
    border: [
      "border-violet-500/60",
      "border-fuchsia-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-violet-500/30",
  },
  tertiary: {
    border: [
      "border-orange-500/60",
      "border-yellow-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-orange-500/30",
  },
  quaternary: {
    border: [
      "border-purple-500/60",
      "border-pink-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-purple-500/30",
  },
  quinary: {
    border: [
      "border-red-500/60",
      "border-rose-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-red-500/30",
  },
  senary: {
    border: [
      "border-blue-500/60",
      "border-sky-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-blue-500/30",
  },
  septenary: {
    border: [
      "border-gray-500/60",
      "border-gray-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-gray-500/30",
  },
  octonary: {
    border: [
      "border-red-500/60",
      "border-rose-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-red-500/30",
  },
  terracotta: {
    border: [
      "border-[#C45C3B]/50",
      "border-[#C45C3B]/30",
      "border-slate-700/20",
    ],
    gradient: "from-[#C45C3B]/25",
  },
} as const;

const AnimatedGrid = () => (
  <motion.div
    className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"
    animate={{
      backgroundPosition: ["0% 0%", "100% 100%"],
    }}
    transition={{
      duration: 40,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    }}
  >
    <div className="h-full w-full [background-image:repeating-linear-gradient(100deg,#64748B_0%,#64748B_1px,transparent_1px,transparent_4%)] opacity-10" />
  </motion.div>
);

export function BackgroundCircles({
  className,
  variant = "terracotta",
}: BackgroundCirclesProps) {
  const variantStyles = COLOR_VARIANTS[variant];

  return (
    <div
      className={clsx(
        "absolute inset-0 flex items-center justify-center pointer-events-none",
        className
      )}
    >
      <AnimatedGrid />
      <div className="absolute h-[672px] w-[672px] -translate-y-[8%]">
        {/* Couche 1 — Base ambiante, rotation lente */}
        <motion.div
          className="absolute rounded-full blur-[18px]"
          style={{
            width: 400,
            height: 400,
            top: "calc(50% - 200px)",
            left: "calc(50% - 200px)",
            background: "radial-gradient(ellipse 55% 40% at 60% 40%, rgba(196,92,59,0.32) 0%, rgba(196,92,59,0.08) 50%, transparent 70%)",
            willChange: "transform",
          }}
          animate={{
            scale: [1, 1.08, 1.14, 1.02, 1],
            rotate: [0, 360],
            x: [0, 40, -25, 55, 0],
            y: [0, -30, 45, -15, 0],
          }}
          transition={{
            scale: { duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            rotate: { duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            x: { duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            y: { duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />

        {/* Couche 2 — Noyau décentré, large dérive */}
        <motion.div
          className="absolute rounded-full blur-[14px]"
          style={{
            width: 400,
            height: 400,
            top: "calc(50% - 200px)",
            left: "calc(50% - 200px)",
            background: "radial-gradient(ellipse 75% 45% at 35% 60%, rgba(196,92,59,0.32) 0%, rgba(196,92,59,0.08) 50%, transparent 70%)",
            willChange: "transform",
          }}
          animate={{
            x: [0, 100, -60, 130, -40, 0],
            y: [0, -70, 90, -30, 60, 0],
            scale: [1, 1.12, 0.9, 1.18, 0.95, 1],
          }}
          transition={{
            x: { duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            y: { duration: 13, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            scale: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />

        {/* Couche 3 — Accent chaud, dérive rapide et ample */}
        <motion.div
          className="absolute rounded-full blur-[10px]"
          style={{
            width: 250,
            height: 250,
            top: "calc(50% - 125px)",
            left: "calc(50% - 125px)",
            background: "radial-gradient(ellipse 60% 40% at 65% 35%, rgba(196,92,59,0.32) 0%, rgba(196,92,59,0.08) 45%, transparent 65%)",
            willChange: "transform",
          }}
          animate={{
            x: [70, -110, 40, -80, 95, 70],
            y: [-60, 50, -90, 70, -25, -60],
            scale: [1, 1.18, 0.85, 1.25, 0.92, 1],
          }}
          transition={{
            x: { duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            y: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            scale: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />
      </div>
    </div>
  );
}
