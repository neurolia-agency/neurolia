"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { NotificationToast } from "@/components/ui/simulation/NotificationToast";
import { TimelineStep } from "@/components/ui/simulation/TimelineStep";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimDevisRelances() {
  const delays = useMemo(() => [0.5, 2.0, 2.0, 2.0, 2.0, 1.5], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Relances automatiques"
      title="Plus jamais d’impayé oublié"
      device="desktop"
      deviceTitle="Neurolia — Suivi & Relances"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Invoice header */}
          {count >= 1 && (
            <motion.div
              key="invoice"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-3"
            >
              <div>
                <p className="text-xs font-medium text-text-primary">
                  #F-2025-071 — Restaurant Bichette
                </p>
                <p className="text-lg font-bold text-primary">1 850€</p>
              </div>
              <StatusBadge variant="pending">En attente</StatusBadge>
            </motion.div>
          )}

          {/* Step 2: J+3 reminder */}
          {count >= 2 && (
            <motion.div
              key="j3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 space-y-1.5"
            >
              <TimelineStep status="done">J+3 — Email de rappel cordial envoyé</TimelineStep>
              <p className="pl-6 text-[10px] text-text-muted italic">
                &quot;Bonjour, sauf erreur de notre part, la facture #071 reste en attente...&quot;
              </p>
            </motion.div>
          )}

          {/* Step 3: J+7 second reminder */}
          {count >= 3 && (
            <motion.div
              key="j7"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 space-y-1.5"
            >
              <TimelineStep status="done">J+7 — 2e relance envoyée</TimelineStep>
              <p className="pl-6 text-[10px] text-text-muted italic">
                Ton plus direct — mention &quot;échéance dépassée&quot;
              </p>
            </motion.div>
          )}

          {/* Step 4: J+14 final reminder */}
          {count >= 4 && (
            <motion.div
              key="j14"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 space-y-1.5"
            >
              <TimelineStep status="done">J+14 — Relance finale</TimelineStep>
              <p className="pl-6 text-[10px] text-text-muted italic">
                Mention mise en demeure possible + lien de paiement
              </p>
            </motion.div>
          )}

          {/* Step 5: Payment received */}
          {count >= 5 && (
            <motion.div
              key="paid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <NotificationToast>
                💰 Paiement reçu — 1 850€
              </NotificationToast>
              <div className="px-1">
                <StatusBadge variant="success">Payé ✓</StatusBadge>
              </div>
            </motion.div>
          )}

          {/* Step 6: Recap */}
          {count >= 6 && (
            <motion.div
              key="recap"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-center"
            >
              <p className="text-xs font-medium text-text-primary mb-1">
                3 relances, 0 intervention, 18 jours
              </p>
              <p className="text-[10px] text-text-muted">
                Email de remerciement envoyé automatiquement
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
