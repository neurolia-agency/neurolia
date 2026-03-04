"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { NotificationToast } from "@/components/ui/simulation/NotificationToast";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimSocialVeille() {
  const delays = useMemo(() => [0.5, 2.0, 2.0, 2.0, 1.5, 1.5], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Veille concurrentielle"
      title="Vos concurrents publient, vous êtes alerté"
      device="desktop"
      deviceTitle="Neurolia — Veille Concurrentielle"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Header */}
          {count >= 1 && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-2.5"
            >
              <p className="text-xs font-medium text-text-primary mb-1.5">
                Veille — 3 concurrents suivis
              </p>
              <div className="flex gap-2">
                {["Restaurant A", "Restaurant B", "Restaurant C"].map((name) => (
                  <span
                    key={name}
                    className="rounded-full bg-[var(--surface)] border border-[var(--border)] px-2 py-0.5 text-[10px] text-text-muted"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Alert */}
          {count >= 2 && (
            <motion.div
              key="alert"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3"
            >
              <p className="text-[11px] font-medium text-amber-400 mb-1">
                🔔 Restaurant A a publié une offre promo
              </p>
              <div className="rounded-md bg-[var(--surface-card)] border border-[var(--border)] px-3 py-2">
                <p className="text-[10px] text-text-primary">-20% sur Instagram</p>
                <p className="text-[10px] text-text-muted">Post sponsorisé — il y a 2h</p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Trend analysis */}
          {count >= 3 && (
            <motion.div
              key="trend"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            >
              <p className="text-[11px] font-medium text-text-primary mb-1">
                📊 Tendance détectée
              </p>
              <p className="text-[10px] text-text-muted mb-2">
                2/3 concurrents communiquent sur les menus du terroir cette semaine
              </p>
              <div className="flex gap-1.5 flex-wrap">
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] text-primary">#terroir</span>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] text-primary">#aveyron</span>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] text-primary">#platdujour</span>
              </div>
            </motion.div>
          )}

          {/* Step 4: AI suggestion */}
          {count >= 4 && (
            <motion.div
              key="suggestion"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3"
            >
              <p className="text-[11px] font-medium text-primary mb-1">
                💡 Opportunité
              </p>
              <p className="text-[10px] text-text-muted">
                Aucun concurrent ne communique sur les soirées à thème. Créneau à exploiter !
              </p>
            </motion.div>
          )}

          {/* Step 5: Engagement comparison */}
          {count >= 5 && (
            <motion.div
              key="engagement"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-3"
            >
              <p className="text-[10px] font-medium text-text-muted mb-2">Comparatif engagement :</p>
              <div className="space-y-1.5">
                {[
                  { name: "Vous", value: "4.2%", width: "100%", highlight: true },
                  { name: "Concurrent A", value: "3.8%", width: "90%", highlight: false },
                  { name: "Concurrent B", value: "2.1%", width: "50%", highlight: false },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className={`text-[10px] w-24 ${item.highlight ? "font-medium text-primary" : "text-text-muted"}`}>
                      {item.name}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-[var(--surface)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: item.width }}
                        transition={{ duration: 0.8 }}
                        className={`h-full rounded-full ${item.highlight ? "bg-primary" : "bg-text-muted/30"}`}
                      />
                    </div>
                    <span className={`text-[10px] ${item.highlight ? "font-medium text-primary" : "text-text-muted"}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-end">
                <StatusBadge variant="new">Leader ⭐</StatusBadge>
              </div>
            </motion.div>
          )}

          {/* Step 6: Report */}
          {count >= 6 && (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1.5"
            >
              <StatusBadge variant="success">Rapport hebdo envoyé ✓</StatusBadge>
              <NotificationToast>📊 Rapport de veille disponible</NotificationToast>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
