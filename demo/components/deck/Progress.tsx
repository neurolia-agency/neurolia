"use client";

import { motion } from "framer-motion";

interface ProgressProps {
  current: number;
  total: number;
}

export function Progress({ current, total }: ProgressProps) {
  return (
    <div className="absolute bottom-0 left-0 z-30 flex w-full gap-1 px-6 pb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="relative h-1 flex-1 overflow-hidden rounded-full bg-[var(--border)]"
        >
          {i <= current && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary"
              initial={i === current ? { scaleX: 0 } : false}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
