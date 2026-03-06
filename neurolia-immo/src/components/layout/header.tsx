"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  action?: React.ReactNode;
  className?: string;
}

export function Header({ title, showBack, action, className }: HeaderProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-[var(--header-height)] items-center gap-3 bg-surface px-4 shadow-header safe-top",
        className
      )}
    >
      {showBack && (
        <button
          onClick={() => router.back()}
          className="touch-target flex items-center justify-center press-feedback"
          aria-label="Retour"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}
      <h1 className="flex-1 truncate text-lg font-semibold">{title}</h1>
      {action && <div className="flex items-center">{action}</div>}
    </header>
  );
}
