"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DeviceFrameProps {
  type?: "desktop" | "phone";
  title?: string;
  children: ReactNode;
  className?: string;
}

export function DeviceFrame({
  type = "desktop",
  title,
  children,
  className,
}: DeviceFrameProps) {
  const isPhone = type === "phone";

  return (
    <div
      className={cn(
        "mx-auto overflow-hidden rounded-xl border border-[var(--border)] bg-surface shadow-2xl",
        isPhone ? "max-w-[360px]" : "max-w-3xl w-full",
        className
      )}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-card)] px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        {title && (
          <span className="ml-3 text-xs text-text-muted truncate">{title}</span>
        )}
      </div>

      {/* Content area */}
      <div
        className={cn(
          "overflow-y-auto",
          isPhone ? "h-[480px] p-4" : "h-[400px] p-5"
        )}
      >
        {children}
      </div>
    </div>
  );
}
