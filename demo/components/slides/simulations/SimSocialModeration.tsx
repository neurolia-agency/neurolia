"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimSocialModeration() {
  const delays = useMemo(() => [0.5, 1.5, 1.5, 1.5, 1.5, 2.0], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Modération"
      title="Vos commentaires filtrés 24/7"
      device="desktop"
      deviceTitle="Neurolia — Modération IA"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Header */}
          {count >= 1 && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-2.5"
            >
              <p className="text-xs font-medium text-text-primary">
                Modération en direct
              </p>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-[10px] text-text-muted">12 nouveaux commentaires</span>
              </span>
            </motion.div>
          )}

          {/* Step 2: Comment OK 1 */}
          {count >= 2 && (
            <motion.div
              key="ok1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-text-primary truncate">
                  &quot;Super restaurant, on reviendra !&quot;
                </p>
              </div>
              <span className="flex-shrink-0 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                ✓ Approuvé
              </span>
            </motion.div>
          )}

          {/* Step 3: Comment OK 2 */}
          {count >= 3 && (
            <motion.div
              key="ok2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-text-primary truncate">
                  &quot;Le magret était délicieux 😋&quot;
                </p>
              </div>
              <span className="flex-shrink-0 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                ✓ Approuvé
              </span>
            </motion.div>
          )}

          {/* Step 4: Toxic comment */}
          {count >= 4 && (
            <motion.div
              key="toxic"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2.5"
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <p className="flex-1 text-[11px] text-text-primary truncate">
                  &quot;C&apos;est nul, arnaque totale !!&quot;
                </p>
                <span className="flex-shrink-0 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                  ⚠️ Signalé
                </span>
              </div>
              <div className="flex gap-2 pl-1">
                <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[10px] text-text-muted cursor-pointer">
                  Masquer
                </span>
                <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] text-primary cursor-pointer">
                  Répondre
                </span>
              </div>
            </motion.div>
          )}

          {/* Step 5: Spam */}
          {count >= 5 && (
            <motion.div
              key="spam"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-text-muted line-through truncate">
                  &quot;Gagnez un iPhone gratuit ici →&quot;
                </p>
              </div>
              <span className="flex-shrink-0 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-medium text-red-400">
                🚫 Spam
              </span>
              <span className="text-[10px] text-red-400">Supprimé</span>
            </motion.div>
          )}

          {/* Step 6: Recap */}
          {count >= 6 && (
            <motion.div
              key="recap"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            >
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[
                  { value: "12", label: "Analysés" },
                  { value: "9", label: "Approuvés" },
                  { value: "2", label: "Signalés" },
                  { value: "1", label: "Spam" },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="text-sm font-bold text-primary">{m.value}</p>
                    <p className="text-[9px] text-text-muted">{m.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-[10px] text-text-muted">
                Temps moyen : &lt;1 seconde
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
