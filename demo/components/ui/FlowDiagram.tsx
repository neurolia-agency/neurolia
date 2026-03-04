"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FlowNode {
  label: string;
  icon?: string;
}

interface FlowDiagramProps {
  nodes: FlowNode[];
  className?: string;
}

export function FlowDiagram({ nodes, className }: FlowDiagramProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-3", className)}>
      {nodes.map((node, i) => (
        <div key={i} className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-surface-card px-4 py-3"
          >
            {node.icon && <span className="text-lg">{node.icon}</span>}
            <span className="text-sm font-medium text-text-primary md:text-base">
              {node.label}
            </span>
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.15 + 0.1 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <motion.path
                  d="M5 12h14m-6-6l6 6-6 6"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                />
              </svg>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
