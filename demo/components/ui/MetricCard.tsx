"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  value: string;
  label: string;
  className?: string;
  delay?: number;
}

export function MetricCard({
  value,
  label,
  className,
  delay = 0,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={cn(
        "flex flex-col items-center rounded-lg border border-[var(--border)] bg-surface-card p-6 text-center",
        className
      )}
    >
      <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">
        {value}
      </div>
      <div className="text-sm text-text-muted md:text-base">{label}</div>
    </motion.div>
  );
}
