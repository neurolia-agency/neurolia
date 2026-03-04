"use client";

import { motion } from "framer-motion";
import { Slide } from "@/components/deck/Slide";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { MetricCard } from "@/components/ui/MetricCard";

interface Metric {
  value: string;
  label: string;
}

interface ResultSlideProps {
  title: string;
  metrics: Metric[];
  footer?: string;
}

export function ResultSlide({ title, metrics, footer }: ResultSlideProps) {
  return (
    <Slide>
      <div className="mb-3 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-primary" />
        <span className="text-sm font-medium uppercase tracking-wider text-primary">
          Résultats
        </span>
      </div>

      <AnimatedText
        text={title}
        as="h1"
        className="mb-14 font-display text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-5xl"
      />

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {metrics.map((metric, i) => (
          <MetricCard
            key={i}
            value={metric.value}
            label={metric.label}
            delay={0.2 + i * 0.12}
          />
        ))}
      </div>

      {footer && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 text-center text-sm text-text-muted"
        >
          {footer}
        </motion.p>
      )}
    </Slide>
  );
}
