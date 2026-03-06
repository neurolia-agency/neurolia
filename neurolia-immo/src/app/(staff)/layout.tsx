"use client";

import { CalendarDays, User } from "lucide-react";
import { BottomTabBar, type TabItem } from "@/components/layout/bottom-tab-bar";

const STAFF_TABS: TabItem[] = [
  {
    href: "/planning",
    label: "Planning",
    icon: CalendarDays,
    matchPaths: ["/planning", "/task", "/property-info"],
  },
  {
    href: "/profile",
    label: "Profil",
    icon: User,
    matchPaths: ["/profile"],
  },
];

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      {children}
      <BottomTabBar tabs={STAFF_TABS} />
    </div>
  );
}
