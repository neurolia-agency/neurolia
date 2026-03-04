"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Progress } from "./Progress";

interface DeckProps {
  children: ReactNode[];
  service: string;
  onGoToSlide?: (goTo: (index: number) => void) => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function Deck({ children, service, onGoToSlide }: DeckProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const router = useRouter();
  const total = children.length;

  const goTo = useCallback(
    (next: number, dir: number) => {
      if (next >= 0 && next < total) {
        setDirection(dir);
        setIndex(next);
      }
    },
    [total]
  );

  const goToSlide = useCallback(
    (slideIndex: number) => {
      goTo(slideIndex, slideIndex > index ? 1 : -1);
    },
    [goTo, index]
  );

  useEffect(() => {
    if (onGoToSlide) onGoToSlide(goToSlide);
  }, [onGoToSlide, goToSlide]);

  const prev = useCallback(() => goTo(index - 1, -1), [index, goTo]);
  const next = useCallback(() => goTo(index + 1, 1), [index, goTo]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "Escape") {
        router.push("/");
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev, router]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-bg">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-orb-1 absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary opacity-[0.07] blur-[120px]" />
        <div className="animate-orb-2 absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full bg-primary opacity-[0.05] blur-[150px]" />
      </div>

      {/* Navigation arrows */}
      {index > 0 && (
        <button
          onClick={prev}
          className="absolute left-6 top-1/2 z-30 -translate-y-1/2 rounded-lg p-2 text-text-muted transition-colors hover:text-text-primary"
          aria-label="Slide precedente"
        >
          <ChevronLeft size={32} />
        </button>
      )}
      {index < total - 1 && (
        <button
          onClick={next}
          className="absolute right-6 top-1/2 z-30 -translate-y-1/2 rounded-lg p-2 text-text-muted transition-colors hover:text-text-primary"
          aria-label="Slide suivante"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Escape hint */}
      <div className="absolute left-6 top-6 z-30">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text-primary"
        >
          <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 text-xs">
            Esc
          </kbd>
          <span>Menu</span>
        </button>
      </div>

      {/* Service label */}
      <div className="absolute right-6 top-6 z-30 text-sm text-text-muted">
        {service}
      </div>

      {/* Slide content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 overflow-y-auto"
        >
          {children[index]}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <Progress current={index} total={total} />

      <style jsx global>{`
        @keyframes orb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 40px) scale(1.1); }
        }
        @keyframes orb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -30px) scale(1.15); }
        }
        .animate-orb-1 { animation: orb1 8s ease-in-out infinite; }
        .animate-orb-2 { animation: orb2 10s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
