"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { NotificationToast } from "@/components/ui/simulation/NotificationToast";
import { TimelineStep } from "@/components/ui/simulation/TimelineStep";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimMailingNurturing() {
  const delays = useMemo(() => [0.5, 2.0, 2.0, 2.0, 2.0, 2.0], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Séquences nurturing"
      title="Du prospect au client, automatiquement"
      device="desktop"
      deviceTitle="Neurolia — Séquence Nurturing"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Trigger */}
          {count >= 1 && (
            <NotificationToast key="trigger">
              <p className="text-xs font-medium">
                👤 Nouveau lead — Thomas Renard
              </p>
              <p className="mt-0.5 text-[10px] text-text-muted">
                Via formulaire site web
              </p>
            </NotificationToast>
          )}

          {/* Step 2: J+0 Welcome */}
          {count >= 2 && (
            <motion.div
              key="j0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 space-y-1.5"
            >
              <TimelineStep status="done">J+0 — Email de bienvenue</TimelineStep>
              <p className="pl-6 text-[10px] text-text-muted italic">
                &quot;Bienvenue Thomas, voici ce que nous pouvons faire pour vous...&quot;
              </p>
            </motion.div>
          )}

          {/* Step 3: J+3 Value */}
          {count >= 3 && (
            <motion.div
              key="j3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 space-y-1.5"
            >
              <TimelineStep status="done">J+3 — Email de valeur</TimelineStep>
              <p className="pl-6 text-[10px] text-text-muted italic">
                &quot;3 conseils pour automatiser votre activité&quot;
              </p>
            </motion.div>
          )}

          {/* Step 4: J+7 Case study */}
          {count >= 4 && (
            <motion.div
              key="j7"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 space-y-1.5"
            >
              <TimelineStep status="done">J+7 — Étude de cas</TimelineStep>
              <p className="pl-6 text-[10px] text-text-muted italic">
                &quot;Comment la Brasserie du Marché a gagné 2h/jour&quot;
              </p>
            </motion.div>
          )}

          {/* Step 5: J+14 Personalized offer */}
          {count >= 5 && (
            <motion.div
              key="j14"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 space-y-1.5"
            >
              <TimelineStep status="active">J+14 — Offre personnalisée</TimelineStep>
              <p className="pl-6 text-[10px] text-text-muted italic">
                &quot;Audit gratuit de vos process — Réservez un créneau&quot;
              </p>
            </motion.div>
          )}

          {/* Step 6: Conversion */}
          {count >= 6 && (
            <motion.div
              key="conversion"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <NotificationToast>
                🎉 Thomas Renard a réservé un créneau
              </NotificationToast>
              <div className="flex items-center gap-3 px-1">
                <StatusBadge variant="new">Converti ⭐</StatusBadge>
                <span className="text-[11px] text-text-muted">
                  Taux de conversion séquence : <span className="font-medium text-emerald-400">23%</span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
