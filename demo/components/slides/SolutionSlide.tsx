"use client";

import { motion } from "framer-motion";
import { Slide } from "@/components/deck/Slide";
import { AnimatedText } from "@/components/ui/AnimatedText";

interface Step {
  label: string;
  description: string;
  icon: string;
}

interface UseCase {
  icon: string;
  label: string;
  description: string;
  slideIndex?: number;
}

interface SolutionSlideProps {
  title: string;
  steps: Step[];
  useCases?: UseCase[];
  onNavigate?: (slideIndex: number) => void;
}

export function SolutionSlide({ title, steps, useCases, onNavigate }: SolutionSlideProps) {
  return (
    <Slide>
      <div className="mb-3 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-primary" />
        <span className="text-sm font-medium uppercase tracking-wider text-primary">
          La solution
        </span>
      </div>

      <AnimatedText
        text={title}
        as="h1"
        className="mb-10 font-display text-4xl font-bold leading-tight text-text-primary md:text-5xl lg:text-6xl"
      />

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg border border-[var(--border)] bg-surface-card text-2xl">
              {step.icon}
            </div>
            <h3 className="mb-1 text-lg font-bold text-text-primary">
              {step.label}
            </h3>
            <p className="text-sm text-text-muted">{step.description}</p>

            {i < steps.length - 1 && (
              <motion.div
                className="mt-4 hidden text-primary md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.12 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14m-6-6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {useCases && useCases.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10"
        >
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-text-muted">
            Ce que l&apos;on peut automatiser
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {useCases.map((uc, i) => {
              const isClickable = uc.slideIndex != null && onNavigate;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
                  onClick={isClickable ? () => onNavigate(uc.slideIndex!) : undefined}
                  className={`flex items-start gap-3 rounded-lg border border-[var(--border)] bg-surface-card px-4 py-3 ${
                    isClickable
                      ? "cursor-pointer transition-colors hover:border-primary/40 hover:bg-primary/5"
                      : ""
                  }`}
                >
                  <span className="mt-0.5 text-lg">{uc.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-text-primary">
                      {uc.label}
                    </p>
                    <p className="text-xs text-text-muted">{uc.description}</p>
                  </div>
                  {isClickable && (
                    <span className="mt-0.5 text-xs text-text-muted">&rarr;</span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </Slide>
  );
}
