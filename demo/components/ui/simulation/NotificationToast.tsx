"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NotificationToastProps {
  children: React.ReactNode;
  className?: string;
}

export function NotificationToast({ children, className }: NotificationToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "ml-auto w-fit rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-2.5 text-sm text-text-primary shadow-lg",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
