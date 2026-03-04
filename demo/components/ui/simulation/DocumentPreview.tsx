"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DocumentLine {
  label: string;
  value: string;
}

interface DocumentPreviewProps {
  title: string;
  lines?: DocumentLine[];
  total?: string;
  className?: string;
}

export function DocumentPreview({
  title,
  lines,
  total,
  className,
}: DocumentPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "rounded-lg border border-[var(--border)] bg-[var(--surface-card)] p-4",
        className
      )}
    >
      {/* Document header */}
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">📄</span>
        <span className="text-sm font-semibold text-text-primary">{title}</span>
      </div>

      {/* Lines */}
      {lines && lines.length > 0 && (
        <div className="mb-3 space-y-1.5">
          {lines.map((line, i) => (
            <div key={i} className="flex justify-between text-xs">
              <span className="text-text-muted">{line.label}</span>
              <span className="text-text-primary">{line.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Total */}
      {total && (
        <div className="border-t border-[var(--border)] pt-2 flex justify-between">
          <span className="text-xs font-semibold text-text-muted">Total</span>
          <span className="text-sm font-bold text-primary">{total}</span>
        </div>
      )}
    </motion.div>
  );
}
