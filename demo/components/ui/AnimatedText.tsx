"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
}

const tags = { h1: "h1", h2: "h2", h3: "h3", p: "p", span: "span" } as const;

export function AnimatedText({
  text,
  as = "p",
  className,
  delay = 0,
}: AnimatedTextProps) {
  const Tag = tags[as];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      <Tag className={cn(className)}>{text}</Tag>
    </motion.div>
  );
}
