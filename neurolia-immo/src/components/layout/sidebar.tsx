"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CalendarDays,
  Building2,
  Users,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const DAILY_ITEMS = [
  { href: "/dashboard", label: "Accueil", icon: Home },
  { href: "/calendar", label: "Calendrier", icon: CalendarDays },
];

const MANAGEMENT_ITEMS = [
  { href: "/management/properties", label: "Mes biens", icon: Building2 },
  { href: "/management/team", label: "Mon equipe", icon: Users },
  { href: "/management/settings", label: "Parametres", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:border-r lg:border-border lg:bg-surface">
      <div className="flex h-[var(--header-height)] items-center px-6">
        <span className="text-lg font-bold text-foreground">
          Neurolia-Immo
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {DAILY_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-fast",
                isActive(item.href)
                  ? "bg-primary-50 text-primary"
                  : "text-muted-foreground hover:bg-neutral-100 hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
        <Separator className="my-2" />
        {MANAGEMENT_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-fast",
                isActive(item.href)
                  ? "bg-primary-50 text-primary"
                  : "text-muted-foreground hover:bg-neutral-100 hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
