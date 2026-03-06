"use client";

import { Home, CalendarDays, Settings } from "lucide-react";
import { BottomTabBar, type TabItem } from "@/components/layout/bottom-tab-bar";
import { Sidebar } from "@/components/layout/sidebar";

const OWNER_TABS: TabItem[] = [
  {
    href: "/dashboard",
    label: "Accueil",
    icon: Home,
    matchPaths: ["/dashboard", "/cleaning-status", "/reservations", "/anomalies"],
  },
  {
    href: "/calendar",
    label: "Calendrier",
    icon: CalendarDays,
    matchPaths: ["/calendar"],
  },
  {
    href: "/management",
    label: "Gestion",
    icon: Settings,
    matchPaths: ["/management"],
  },
];

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        {children}
      </div>
      <BottomTabBar tabs={OWNER_TABS} />
    </div>
  );
}
