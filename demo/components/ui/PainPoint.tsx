"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PainPointProps {
  icon: string;
  quote: string;
  source?: string;
  className?: string;
  delay?: number;
}

export function PainPoint({
  icon,
  quote,
  source,
  className,
  delay = 0,
}: PainPointProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={cn(
        "flex items-start gap-4 rounded-lg border border-[var(--border)] bg-surface-card p-5",
        className
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-glow)] text-xl">
        {icon}
      </div>
      <div>
        <p className="text-base font-medium leading-relaxed text-text-primary">
          &ldquo;{quote}&rdquo;
        </p>
        {source && (
          <p className="mt-1 text-sm text-text-muted">{source}</p>
        )}
      </div>
    </motion.div>
  );
}
