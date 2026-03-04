# Skill : dashboard-kpi-patterns

Snippets TypeScript/React complets pour les KPIs et visualisations dashboard. Tous les composants utilisent les tokens CSS de `globals.css` et suivent le pattern Server Component first.

---

## Conventions

- Les composants sont Server Components par défaut (pas de `"use client"` sauf nécessité)
- Les tokens CSS (`--color-primary`, `--bg-surface`, etc.) sont utilisés via Tailwind ou style inline
- Les skeletons sont fournis avec chaque composant
- Les types TypeScript sont définis localement, à déplacer dans `types/` si réutilisés

---

## Pattern 1 — KPI Card

### Composant Server Component avec skeleton

```tsx
// components/dashboard/KpiCard.tsx
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: number;   // ex: 12.5 = +12.5%
    label?: string;  // ex: "vs semaine dernière"
  };
  icon?: LucideIcon;
  description?: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

export function KpiCard({
  title,
  value,
  unit,
  trend,
  icon: Icon,
  description,
  variant = "default",
  className,
}: KpiCardProps) {
  const isPositive = trend && trend.value > 0;
  const isNeutral  = trend && trend.value === 0;

  const variantStyles: Record<string, string> = {
    default: "border-[var(--border-default)]",
    success: "border-[var(--color-success)] border-l-4",
    warning: "border-[var(--color-warning)] border-l-4",
    danger:  "border-[var(--color-danger)] border-l-4",
    info:    "border-[var(--color-info)] border-l-4",
  };

  const trendColor = isNeutral
    ? "text-[var(--text-muted)]"
    : isPositive
    ? "text-[var(--color-success)]"
    : "text-[var(--color-danger)]";

  return (
    <div
      className={cn(
        "bg-[var(--bg-surface)] rounded-[var(--radius-lg)] border p-4 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[length:var(--text-sm)] font-medium text-[var(--text-muted)] truncate">
            {title}
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-[length:var(--text-2xl)] font-bold text-[var(--text-primary)] tabular-nums">
              {typeof value === "number" ? value.toLocaleString("fr-FR") : value}
            </span>
            {unit && (
              <span className="text-[length:var(--text-sm)] text-[var(--text-muted)]">
                {unit}
              </span>
            )}
          </div>
          {trend && (
            <div className={cn("mt-1 flex items-center gap-1 text-[length:var(--text-xs)]", trendColor)}>
              <span className="font-medium">
                {isPositive ? "▲" : isNeutral ? "—" : "▼"}{" "}
                {Math.abs(trend.value).toFixed(1)}%
              </span>
              {trend.label && (
                <span className="text-[var(--text-muted)]">{trend.label}</span>
              )}
            </div>
          )}
          {description && (
            <p className="mt-1 text-[length:var(--text-xs)] text-[var(--text-muted)]">
              {description}
            </p>
          )}
        </div>
        {Icon && (
          <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-subtle)]">
            <Icon className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
        )}
      </div>
    </div>
  );
}

/* Skeleton */
export function KpiCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-[var(--bg-surface)] rounded-[var(--radius-lg)] border border-[var(--border-default)] p-4",
        className
      )}
    >
      <div className="skeleton h-3 w-24 mb-2 rounded-[var(--radius-base)]" />
      <div className="skeleton h-8 w-32 rounded-[var(--radius-base)]" />
      <div className="skeleton h-3 w-20 mt-2 rounded-[var(--radius-base)]" />
    </div>
  );
}
```

---

## Pattern 2 — KPI Grid

### Grille responsive 4 → 2 → 1 colonnes

```tsx
// components/dashboard/KpiGrid.tsx
import { cn } from "@/lib/utils";

interface KpiGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function KpiGrid({ children, columns = 4, className }: KpiGridProps) {
  const colClass: Record<number, string> = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", colClass[columns], className)}>
      {children}
    </div>
  );
}

// Usage :
// <KpiGrid columns={4}>
//   <KpiCard title="Commandes" value={128} trend={{ value: 12.5, label: "vs semaine dernière" }} />
//   <KpiCard title="CA" value="14 230" unit="€" variant="success" />
//   <KpiCard title="Alertes" value={3} variant="warning" />
//   <KpiCard title="Clients actifs" value={42} />
// </KpiGrid>

// Skeleton grid :
export function KpiGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <KpiCardSkeleton key={i} />
      ))}
    </div>
  );
}
```

---

## Pattern 3 — Chart Wrapper

### Wrapper Recharts utilisant les tokens CSS

```tsx
// components/dashboard/ChartWrapper.tsx
"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface ChartWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  height?: number;
  className?: string;
}

export function ChartWrapper({
  title,
  description,
  children,
  action,
  height = 280,
  className,
}: ChartWrapperProps) {
  return (
    <div
      className={cn(
        "bg-[var(--bg-surface)] rounded-[var(--radius-lg)] border border-[var(--border-default)] p-4 shadow-[var(--shadow-sm)]",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[length:var(--text-md)] font-semibold text-[var(--text-primary)]">
            {title}
          </h3>
          {description && (
            <p className="text-[length:var(--text-sm)] text-[var(--text-muted)] mt-0.5">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0 ml-4">{action}</div>}
      </div>
      <div style={{ height }}>{children}</div>
    </div>
  );
}

/* Hook pour récupérer les tokens CSS en JS (nécessaire pour Recharts) */
export function useChartColors() {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return {
        primary:   "#2563eb",
        secondary: "#f59e0b",
        success:   "#16a34a",
        warning:   "#d97706",
        danger:    "#dc2626",
        muted:     "#94a3b8",
        border:    "#e2e8f0",
      };
    }
    const root = document.documentElement;
    const get = (v: string) =>
      getComputedStyle(root).getPropertyValue(v).trim() || v;

    // Recharts n'accepte pas oklch nativement — utiliser les hex de fallback
    // ou installer une librairie de conversion si oklch est requis
    return {
      primary:   get("--color-primary-hex")   || "#2563eb",
      secondary: get("--color-secondary-hex") || "#f59e0b",
      success:   get("--color-success-hex")   || "#16a34a",
      warning:   get("--color-warning-hex")   || "#d97706",
      danger:    get("--color-danger-hex")    || "#dc2626",
      muted:     "#94a3b8",
      border:    "#e2e8f0",
    };
  }, []);
}

/* Note : Ajouter dans globals.css les versions hex pour Recharts */
/* :root { --color-primary-hex: #2563eb; --color-success-hex: #16a34a; ... } */
```

---

## Pattern 4 — Bar / Line / Donut Charts

### Bar Chart

```tsx
// components/dashboard/charts/BarChart.tsx
"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useChartColors } from "@/components/dashboard/ChartWrapper";

interface BarChartData {
  name: string;
  [key: string]: string | number;
}

interface BarChartProps {
  data: BarChartData[];
  bars: { key: string; label: string; colorKey?: keyof ReturnType<typeof useChartColors> }[];
  showGrid?: boolean;
  showLegend?: boolean;
  formatValue?: (value: number) => string;
}

export function BarChart({
  data,
  bars,
  showGrid = true,
  showLegend = false,
  formatValue = (v) => v.toLocaleString("fr-FR"),
}: BarChartProps) {
  const colors = useChartColors();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={colors.border}
            vertical={false}
          />
        )}
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: colors.muted }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: colors.muted }}
          axisLine={false}
          tickLine={false}
          tickFormatter={formatValue}
          width={48}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-md)",
            fontSize: "12px",
            color: "var(--text-primary)",
          }}
          formatter={(value: number) => [formatValue(value)]}
        />
        {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {bars.map((bar) => (
          <Bar
            key={bar.key}
            dataKey={bar.key}
            name={bar.label}
            fill={colors[bar.colorKey ?? "primary"]}
            radius={[2, 2, 0, 0]}
            maxBarSize={48}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

// Usage :
// <ChartWrapper title="Commandes par semaine" height={240}>
//   <BarChart
//     data={[
//       { name: "Lun", commandes: 12, retours: 2 },
//       { name: "Mar", commandes: 18, retours: 1 },
//     ]}
//     bars={[
//       { key: "commandes", label: "Commandes", colorKey: "primary" },
//       { key: "retours", label: "Retours", colorKey: "danger" },
//     ]}
//   />
// </ChartWrapper>
```

### Line Chart

```tsx
// components/dashboard/charts/LineChart.tsx
"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useChartColors } from "@/components/dashboard/ChartWrapper";

interface LineChartProps {
  data: Array<{ name: string; [key: string]: string | number }>;
  lines: { key: string; label: string; colorKey?: keyof ReturnType<typeof useChartColors>; dashed?: boolean }[];
  showGrid?: boolean;
  formatValue?: (v: number) => string;
}

export function LineChart({
  data,
  lines,
  showGrid = true,
  formatValue = (v) => v.toLocaleString("fr-FR"),
}: LineChartProps) {
  const colors = useChartColors();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
        )}
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: colors.muted }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: colors.muted }}
          axisLine={false}
          tickLine={false}
          tickFormatter={formatValue}
          width={48}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-md)",
            fontSize: "12px",
          }}
          formatter={(value: number) => [formatValue(value)]}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {lines.map((line) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            name={line.label}
            stroke={colors[line.colorKey ?? "primary"]}
            strokeWidth={2}
            strokeDasharray={line.dashed ? "5 5" : undefined}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
```

### Donut Chart

```tsx
// components/dashboard/charts/DonutChart.tsx
"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useChartColors } from "@/components/dashboard/ChartWrapper";

interface DonutChartProps {
  data: Array<{ name: string; value: number }>;
  colorKeys?: Array<keyof ReturnType<typeof useChartColors>>;
  innerRadius?: number;
  outerRadius?: number;
  formatValue?: (v: number) => string;
}

export function DonutChart({
  data,
  colorKeys = ["primary", "secondary", "success", "warning", "info"],
  innerRadius = 55,
  outerRadius = 80,
  formatValue = (v) => v.toLocaleString("fr-FR"),
}: DonutChartProps) {
  const colors = useChartColors();
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={colors[colorKeys[index % colorKeys.length]]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-md)",
            fontSize: "12px",
          }}
          formatter={(value: number) => [
            `${formatValue(value)} (${((value / total) * 100).toFixed(1)}%)`,
          ]}
        />
        <Legend
          wrapperStyle={{ fontSize: 12 }}
          formatter={(value) => (
            <span style={{ color: "var(--text-secondary)" }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
```

---

## Pattern 5 — Alerts Panel

### Panneau d'alertes triées par priorité avec badge count

```tsx
// components/dashboard/AlertsPanel.tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

type AlertPriority = "high" | "medium" | "low";

interface Alert {
  id: string;
  title: string;
  description?: string;
  priority: AlertPriority;
  timestamp: Date;
  href?: string;
}

interface AlertsPanelProps {
  alerts: Alert[];
  maxVisible?: number;
  allAlertsHref?: string;
  className?: string;
}

const priorityConfig: Record<AlertPriority, { label: string; dotClass: string; badgeClass: string }> = {
  high:   { label: "Critique", dotClass: "bg-[var(--color-danger)]",  badgeClass: "bg-[var(--color-danger-light)] text-[var(--color-danger)]" },
  medium: { label: "Attention", dotClass: "bg-[var(--color-warning)]", badgeClass: "bg-[var(--color-warning-light)] text-[var(--color-warning)]" },
  low:    { label: "Info",      dotClass: "bg-[var(--color-info)]",    badgeClass: "bg-[var(--color-info-light)] text-[var(--color-info)]" },
};

export function AlertsPanel({
  alerts,
  maxVisible = 5,
  allAlertsHref,
  className,
}: AlertsPanelProps) {
  const sortOrder: Record<AlertPriority, number> = { high: 0, medium: 1, low: 2 };
  const sorted = [...alerts].sort((a, b) => sortOrder[a.priority] - sortOrder[b.priority]);
  const visible = sorted.slice(0, maxVisible);
  const hiddenCount = Math.max(0, alerts.length - maxVisible);
  const highCount = alerts.filter((a) => a.priority === "high").length;

  return (
    <div className={cn(
      "bg-[var(--bg-surface)] rounded-[var(--radius-lg)] border border-[var(--border-default)] shadow-[var(--shadow-sm)]",
      className
    )}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <h3 className="text-[length:var(--text-md)] font-semibold text-[var(--text-primary)]">
            Alertes
          </h3>
          {highCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[length:var(--text-xs)] font-bold bg-[var(--color-danger)] text-white">
              {highCount}
            </span>
          )}
        </div>
        {allAlertsHref && alerts.length > 0 && (
          <Link
            href={allAlertsHref}
            className="text-[length:var(--text-sm)] text-[var(--color-primary)] hover:underline"
          >
            Voir tout
          </Link>
        )}
      </div>

      {visible.length === 0 ? (
        <div className="px-4 py-8 text-center text-[length:var(--text-sm)] text-[var(--text-muted)]">
          Aucune alerte
        </div>
      ) : (
        <ul className="divide-y divide-[var(--border-subtle)]">
          {visible.map((alert) => {
            const config = priorityConfig[alert.priority];
            const Wrapper = alert.href ? Link : "div";
            return (
              <li key={alert.id}>
                <Wrapper
                  href={alert.href ?? "#"}
                  className={cn(
                    "flex items-start gap-3 px-4 py-3",
                    alert.href && "hover:bg-[var(--bg-subtle)] transition-colors"
                  )}
                >
                  <span className={cn("mt-1.5 shrink-0 w-2 h-2 rounded-full", config.dotClass)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[length:var(--text-sm)] font-medium text-[var(--text-primary)] truncate">
                      {alert.title}
                    </p>
                    {alert.description && (
                      <p className="text-[length:var(--text-xs)] text-[var(--text-muted)] mt-0.5 truncate">
                        {alert.description}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    <span className={cn("text-[length:var(--text-xs)] px-1.5 py-0.5 rounded-[var(--radius-sm)] font-medium", config.badgeClass)}>
                      {config.label}
                    </span>
                    <span className="text-[length:var(--text-xs)] text-[var(--text-muted)]">
                      {alert.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </Wrapper>
              </li>
            );
          })}
        </ul>
      )}

      {hiddenCount > 0 && allAlertsHref && (
        <div className="px-4 py-2 border-t border-[var(--border-subtle)]">
          <Link
            href={allAlertsHref}
            className="text-[length:var(--text-sm)] text-[var(--text-muted)] hover:text-[var(--color-primary)]"
          >
            + {hiddenCount} alerte{hiddenCount > 1 ? "s" : ""} supplémentaire{hiddenCount > 1 ? "s" : ""}
          </Link>
        </div>
      )}
    </div>
  );
}
```

---

## Pattern 6 — Monthly Calendar

### Calendrier mensuel avec événements par jour

```tsx
// components/dashboard/MonthlyCalendar.tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  label: string;
  color?: "primary" | "success" | "warning" | "danger";
}

interface MonthlyCalendarProps {
  events?: CalendarEvent[];
  onDayClick?: (date: string) => void;
  className?: string;
}

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

const colorMap: Record<string, string> = {
  primary: "bg-[var(--color-primary)]",
  success: "bg-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]",
  danger:  "bg-[var(--color-danger)]",
};

export function MonthlyCalendar({ events = [], onDayClick, className }: MonthlyCalendarProps) {
  const [current, setCurrent] = useState(new Date());
  const today = new Date().toISOString().split("T")[0];

  const year  = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);

  // Offset lundi = 0
  const startOffset = (firstDay.getDay() + 6) % 7;
  const totalCells  = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7;

  const eventsByDate = events.reduce<Record<string, CalendarEvent[]>>((acc, e) => {
    acc[e.date] = acc[e.date] ? [...acc[e.date], e] : [e];
    return acc;
  }, {});

  return (
    <div className={cn(
      "bg-[var(--bg-surface)] rounded-[var(--radius-lg)] border border-[var(--border-default)] p-4 shadow-[var(--shadow-sm)]",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrent(new Date(year, month - 1, 1))}
          className="p-1 rounded-[var(--radius-base)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
          aria-label="Mois précédent"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-[length:var(--text-md)] font-semibold text-[var(--text-primary)]">
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={() => setCurrent(new Date(year, month + 1, 1))}
          className="p-1 rounded-[var(--radius-base)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
          aria-label="Mois suivant"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[length:var(--text-xs)] font-medium text-[var(--text-muted)] py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Grille des jours */}
      <div className="grid grid-cols-7 gap-px">
        {Array.from({ length: totalCells }).map((_, i) => {
          const dayNum = i - startOffset + 1;
          if (dayNum < 1 || dayNum > lastDay.getDate()) {
            return <div key={i} />;
          }
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
          const dayEvents = eventsByDate[dateStr] ?? [];
          const isToday = dateStr === today;

          return (
            <button
              key={i}
              onClick={() => onDayClick?.(dateStr)}
              className={cn(
                "flex flex-col items-center p-1 rounded-[var(--radius-base)] text-[length:var(--text-sm)] min-h-[40px] transition-colors hover:bg-[var(--bg-subtle)]",
                isToday && "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]",
                !isToday && "text-[var(--text-primary)]"
              )}
            >
              <span className="font-medium">{dayNum}</span>
              {dayEvents.length > 0 && (
                <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                  {dayEvents.slice(0, 3).map((e, j) => (
                    <span
                      key={j}
                      className={cn("w-1.5 h-1.5 rounded-full", colorMap[e.color ?? "primary"], isToday && "bg-white")}
                      title={e.label}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

---

## Pattern 7 — Timeline

### Chronologie verticale avec entrées horodatées

```tsx
// components/dashboard/Timeline.tsx
import { cn } from "@/lib/utils";

type TimelineVariant = "default" | "success" | "warning" | "danger" | "info";

interface TimelineEntry {
  id: string;
  title: string;
  description?: string;
  timestamp: Date;
  variant?: TimelineVariant;
  icon?: React.ReactNode;
}

interface TimelineProps {
  entries: TimelineEntry[];
  className?: string;
}

const dotStyles: Record<TimelineVariant, string> = {
  default: "bg-[var(--color-gray-400)] border-[var(--bg-surface)]",
  success: "bg-[var(--color-success)] border-[var(--bg-surface)]",
  warning: "bg-[var(--color-warning)] border-[var(--bg-surface)]",
  danger:  "bg-[var(--color-danger)] border-[var(--bg-surface)]",
  info:    "bg-[var(--color-info)] border-[var(--bg-surface)]",
};

export function Timeline({ entries, className }: TimelineProps) {
  return (
    <div className={cn(
      "bg-[var(--bg-surface)] rounded-[var(--radius-lg)] border border-[var(--border-default)] p-4 shadow-[var(--shadow-sm)]",
      className
    )}>
      <ol className="relative">
        {entries.map((entry, index) => (
          <li key={entry.id} className={cn("relative pl-6", index < entries.length - 1 && "pb-4")}>
            {/* Ligne verticale */}
            {index < entries.length - 1 && (
              <div className="absolute left-[7px] top-4 bottom-0 w-px bg-[var(--border-subtle)]" />
            )}
            {/* Dot */}
            <div className={cn(
              "absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-2",
              dotStyles[entry.variant ?? "default"]
            )}>
              {entry.icon && (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  {entry.icon}
                </div>
              )}
            </div>
            {/* Contenu */}
            <div>
              <div className="flex items-start justify-between gap-2">
                <p className="text-[length:var(--text-sm)] font-medium text-[var(--text-primary)]">
                  {entry.title}
                </p>
                <time className="shrink-0 text-[length:var(--text-xs)] text-[var(--text-muted)]">
                  {entry.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </time>
              </div>
              {entry.description && (
                <p className="mt-0.5 text-[length:var(--text-xs)] text-[var(--text-muted)]">
                  {entry.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
```

---

## Pattern 8 — Today Summary Panel

### Panneau de résumé du jour

```tsx
// components/dashboard/TodaySummaryPanel.tsx
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface SummaryItem {
  label: string;
  value: string | number;
  unit?: string;
  status?: "ok" | "warning" | "danger";
}

interface TodaySummaryPanelProps {
  date?: Date;
  items: SummaryItem[];
  note?: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  ok:      "text-[var(--color-success)]",
  warning: "text-[var(--color-warning)]",
  danger:  "text-[var(--color-danger)]",
};

export function TodaySummaryPanel({
  date = new Date(),
  items,
  note,
  className,
}: TodaySummaryPanelProps) {
  const dateLabel = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={cn(
      "bg-[var(--bg-surface)] rounded-[var(--radius-lg)] border border-[var(--border-default)] p-4 shadow-[var(--shadow-sm)]",
      className
    )}>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-[var(--color-primary)]" />
        <h3 className="text-[length:var(--text-md)] font-semibold text-[var(--text-primary)] capitalize">
          {dateLabel}
        </h3>
      </div>

      <dl className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <dt className="text-[length:var(--text-sm)] text-[var(--text-secondary)]">
              {item.label}
            </dt>
            <dd className={cn(
              "text-[length:var(--text-sm)] font-semibold tabular-nums flex items-baseline gap-1",
              item.status ? statusStyles[item.status] : "text-[var(--text-primary)]"
            )}>
              {typeof item.value === "number" ? item.value.toLocaleString("fr-FR") : item.value}
              {item.unit && (
                <span className="text-[length:var(--text-xs)] font-normal text-[var(--text-muted)]">
                  {item.unit}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      {note && (
        <p className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
          {note}
        </p>
      )}
    </div>
  );
}
```

---

## Calculs KPI côté serveur (Supabase)

### Agrégation SQL via Supabase

```typescript
// lib/kpi/fetch-kpis.ts
import { createClient } from "@/lib/supabase/server";

export interface KpiData {
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
  pendingAlerts: number;
  trend: {
    orders:  { value: number; period: string };
    revenue: { value: number; period: string };
  };
}

export async function fetchDashboardKpis(): Promise<KpiData> {
  const supabase = await createClient();

  // Fenêtres temporelles
  const now       = new Date();
  const startWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
  const prevWeek  = new Date(startWeek.getTime() - 7 * 86400 * 1000);

  // Requêtes en parallèle
  const [ordersThisWeek, ordersPrevWeek, revenueResult, activeUsersResult, alertsResult] =
    await Promise.all([
      supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .gte("created_at", startWeek.toISOString()),

      supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .gte("created_at", prevWeek.toISOString())
        .lt("created_at", startWeek.toISOString()),

      supabase.rpc("sum_revenue_current_week"),  // Fonction RPC custom

      supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("status", "active"),

      supabase
        .from("alerts")
        .select("id", { count: "exact", head: true })
        .eq("resolved", false),
    ]);

  const ordersCurrent  = ordersThisWeek.count  ?? 0;
  const ordersPrevious = ordersPrevWeek.count ?? 0;
  const ordersTrend    = ordersPrevious > 0
    ? ((ordersCurrent - ordersPrevious) / ordersPrevious) * 100
    : 0;

  return {
    totalOrders:  ordersCurrent,
    totalRevenue: revenueResult.data ?? 0,
    activeUsers:  activeUsersResult.count ?? 0,
    pendingAlerts: alertsResult.count ?? 0,
    trend: {
      orders:  { value: Math.round(ordersTrend * 10) / 10, period: "vs semaine dernière" },
      revenue: { value: 0, period: "vs semaine dernière" }, // Calculer de même façon
    },
  };
}
```

### Pattern N vs N-1

```typescript
// lib/kpi/compare-periods.ts

type Period = "week" | "month" | "year";

interface PeriodRange {
  current: { start: Date; end: Date };
  previous: { start: Date; end: Date };
  label: string;
}

export function getPeriodRange(period: Period): PeriodRange {
  const now = new Date();

  if (period === "week") {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Lundi
    startOfWeek.setHours(0, 0, 0, 0);
    const prevWeekStart = new Date(startOfWeek.getTime() - 7 * 86400 * 1000);
    return {
      current:  { start: startOfWeek, end: now },
      previous: { start: prevWeekStart, end: startOfWeek },
      label: "vs semaine dernière",
    };
  }

  if (period === "month") {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return {
      current:  { start: startOfMonth, end: now },
      previous: { start: startPrevMonth, end: startOfMonth },
      label: "vs mois dernier",
    };
  }

  // year
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const startPrevYear = new Date(now.getFullYear() - 1, 0, 1);
  return {
    current:  { start: startOfYear, end: now },
    previous: { start: startPrevYear, end: startOfYear },
    label: "vs année dernière",
  };
}

export function calcTrend(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}
```

---

## Pattern de rafraîchissement (revalidate + polling)

```typescript
// app/dashboard/page.tsx — Server Component avec revalidate
import { fetchDashboardKpis } from "@/lib/kpi/fetch-kpis";

export const revalidate = 60; // Revalider toutes les 60 secondes (ISR)

export default async function DashboardPage() {
  const kpis = await fetchDashboardKpis();
  return <DashboardView kpis={kpis} />;
}
```

```tsx
// components/dashboard/AutoRefresh.tsx — Polling client pour "temps réel"
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AutoRefresh({ intervalSeconds = 30 }: { intervalSeconds?: number }) {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      router.refresh(); // Déclenche un re-fetch des Server Components
    }, intervalSeconds * 1000);
    return () => clearInterval(id);
  }, [router, intervalSeconds]);

  return null; // Composant invisible
}

// Utilisation dans le layout :
// <AutoRefresh intervalSeconds={30} />
```
