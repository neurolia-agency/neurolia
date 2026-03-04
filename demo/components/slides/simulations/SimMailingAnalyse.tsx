"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimMailingAnalyse() {
  const delays = useMemo(() => [0.5, 1.5, 2.0, 2.0, 2.0, 1.5], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Analyse performance"
      title="Vos campagnes, analysées en temps réel"
      device="desktop"
      deviceTitle="Neurolia — Analytics Email"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Dashboard header */}
          {count >= 1 && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-2.5"
            >
              <p className="text-xs font-medium text-text-primary">
                Rapport — Semaine du 3 février
              </p>
              <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[10px] text-text-muted">
                7 derniers jours ▾
              </span>
            </motion.div>
          )}

          {/* Step 2: Main metrics */}
          {count >= 2 && (
            <motion.div
              key="main-metrics"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-4 gap-2"
            >
              {[
                { value: "12 450", label: "Envoyés", icon: "📨" },
                { value: "47%", label: "Ouverture", icon: "📩" },
                { value: "12%", label: "Clics", icon: "🔗" },
                { value: "3.8%", label: "Conversion", icon: "🎯" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] p-2.5 text-center"
                >
                  <span className="text-sm">{m.icon}</span>
                  <p className="text-lg font-bold text-primary">{m.value}</p>
                  <p className="text-[9px] text-text-muted">{m.label}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Step 3: Comparative bars */}
          {count >= 3 && (
            <motion.div
              key="comparatives"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            >
              <p className="text-[10px] font-medium text-text-muted mb-2">
                vs semaine précédente
              </p>
              <div className="space-y-1.5">
                {[
                  { label: "Ouverture", value: "+5%", positive: true },
                  { label: "Clics", value: "-2%", positive: false },
                  { label: "Conversion", value: "+1.2%", positive: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="text-[10px] text-text-muted w-20">{item.label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-[var(--surface-card)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: item.positive ? "65%" : "40%" }}
                        transition={{ duration: 0.8 }}
                        className={`h-full rounded-full ${item.positive ? "bg-emerald-500" : "bg-red-500"}`}
                      />
                    </div>
                    <span className={`text-[10px] font-medium ${item.positive ? "text-emerald-400" : "text-red-400"}`}>
                      {item.value} {item.positive ? "↑" : "↓"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Top 3 campaigns */}
          {count >= 4 && (
            <motion.div
              key="top-campaigns"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              <p className="text-[10px] font-medium text-text-muted px-1">Top 3 campagnes :</p>
              {[
                { name: "Soldes hiver", open: "58%", click: "15%" },
                { name: "Nouveau produit bio", open: "52%", click: "13%" },
                { name: "Newsletter hebdo", open: "41%", click: "9%" },
              ].map((c, i) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-1.5"
                >
                  <span className="text-[10px] font-bold text-primary">#{i + 1}</span>
                  <span className="flex-1 text-[11px] font-medium text-text-primary truncate">{c.name}</span>
                  <span className="text-[10px] text-emerald-400">{c.open} ouv.</span>
                  <span className="text-[10px] text-blue-400">{c.click} clics</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Step 5: AI Recommendations */}
          {count >= 5 && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3"
            >
              <p className="text-[11px] font-medium text-amber-400 mb-1.5">
                💡 Recommandations IA
              </p>
              <ul className="space-y-1 text-[10px] text-text-muted">
                <li>• Les emails envoyés le mardi à 9h ont +18% d&apos;ouverture</li>
                <li>• Le sujet avec émoji 📦 surperforme de 12%</li>
              </ul>
            </motion.div>
          )}

          {/* Step 6: Export */}
          {count >= 6 && (
            <motion.div
              key="export"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-1"
            >
              <StatusBadge variant="success">Rapport PDF généré ✓</StatusBadge>
              <span className="text-[10px] text-text-muted">
                Envoyé à direction@entreprise.fr
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
