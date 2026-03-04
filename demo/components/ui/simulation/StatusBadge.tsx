"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  variant: "success" | "pending" | "active" | "new" | "danger";
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<StatusBadgeProps["variant"], string> = {
  success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  active: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  new: "bg-primary/20 text-primary-light border-primary/30",
  danger: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </motion.span>
  );
}
