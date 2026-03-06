"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TabItem {
  href: string;
  label: string;
  icon: LucideIcon;
  matchPaths?: string[];
}

interface BottomTabBarProps {
  tabs: TabItem[];
}

export function BottomTabBar({ tabs }: BottomTabBarProps) {
  const pathname = usePathname();

  function isActive(tab: TabItem): boolean {
    if (pathname === tab.href) return true;
    if (tab.matchPaths) {
      return tab.matchPaths.some(
        (path) => pathname === path || pathname.startsWith(path + "/")
      );
    }
    return pathname.startsWith(tab.href + "/");
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[var(--bottom-tab-height)] items-center justify-around border-t border-border bg-surface shadow-nav safe-bottom lg:hidden">
      {tabs.map((tab) => {
        const active = isActive(tab);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-0.5 press-feedback transition-fast",
              active ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="h-[var(--icon-tab)] w-[var(--icon-tab)]" />
            <span className="text-[var(--font-size-tab)] leading-none">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
