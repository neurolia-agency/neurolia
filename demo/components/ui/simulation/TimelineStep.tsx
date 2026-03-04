"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineStepProps {
  status: "pending" | "active" | "done";
  children: React.ReactNode;
  className?: string;
}

export function TimelineStep({ status, children, className }: TimelineStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex items-start gap-3", className)}
    >
      {/* Dot */}
      <div className="mt-1.5 flex-shrink-0">
        <div
          className={cn(
            "h-2.5 w-2.5 rounded-full border-2",
            status === "done" && "border-emerald-400 bg-emerald-400",
            status === "active" && "border-primary bg-primary animate-pulse",
            status === "pending" && "border-text-muted bg-transparent"
          )}
        />
      </div>
      {/* Content */}
      <div
        className={cn(
          "text-sm",
          status === "done" && "text-emerald-400",
          status === "active" && "text-text-primary",
          status === "pending" && "text-text-muted"
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
