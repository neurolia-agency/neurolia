"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  role: "user" | "bot" | "system";
  children?: React.ReactNode;
  typing?: boolean;
  className?: string;
}

export function ChatBubble({
  role,
  children,
  typing,
  className,
}: ChatBubbleProps) {
  const isUser = role === "user";
  const isSystem = role === "system";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex",
        isUser ? "justify-end" : "justify-start",
        className
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
          isUser && "bg-primary text-white rounded-br-md",
          !isUser &&
            !isSystem &&
            "bg-[var(--surface-card)] text-text-primary border border-[var(--border)] rounded-bl-md",
          isSystem &&
            "bg-transparent text-text-muted text-xs italic text-center w-full max-w-full"
        )}
      >
        {typing ? (
          <div className="flex items-center gap-1 py-1">
            <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted [animation-delay:0ms]" />
            <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted [animation-delay:150ms]" />
            <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted [animation-delay:300ms]" />
          </div>
        ) : (
          children
        )}
      </div>
    </motion.div>
  );
}
