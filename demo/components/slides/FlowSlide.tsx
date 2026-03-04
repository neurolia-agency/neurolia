"use client";

import { motion } from "framer-motion";
import { Slide } from "@/components/deck/Slide";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { FlowDiagram, type FlowNode } from "@/components/ui/FlowDiagram";

interface FlowSlideProps {
  title: string;
  nodes: FlowNode[];
  stack?: string;
}

export function FlowSlide({ title, nodes, stack }: FlowSlideProps) {
  return (
    <Slide>
      <div className="mb-3 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-primary" />
        <span className="text-sm font-medium uppercase tracking-wider text-primary">
          Comment ça marche
        </span>
      </div>

      <AnimatedText
        text={title}
        as="h1"
        className="mb-14 font-display text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-5xl"
      />

      <FlowDiagram nodes={nodes} className="mb-12" />

      {stack && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mx-auto max-w-xl rounded-lg border border-[var(--border)] bg-surface px-6 py-4 text-center"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
            Stack technique
          </span>
          <p className="mt-1 text-sm text-text-primary md:text-base">
            {stack}
          </p>
        </motion.div>
      )}
    </Slide>
  );
}
