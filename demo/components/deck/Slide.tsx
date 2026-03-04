"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideProps {
  children: ReactNode;
  className?: string;
}

export function Slide({ children, className }: SlideProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen w-screen items-center justify-center px-8 py-20 md:px-16 lg:px-24",
        className
      )}
    >
      <div className="w-full max-w-5xl">{children}</div>
    </div>
  );
}
