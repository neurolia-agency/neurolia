"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimSocialRepurposing() {
  const delays = useMemo(() => [0.5, 2.0, 1.5, 1.5, 1.5, 2.0], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Repurposing de contenu"
      title="1 article de blog → 5 contenus différents"
      device="desktop"
      deviceTitle="Neurolia — Repurposing IA"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Source article */}
          {count >= 1 && (
            <motion.div
              key="source"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">📝</span>
                <p className="text-xs font-medium text-text-primary">
                  Comment choisir son architecte ?
                </p>
              </div>
              <p className="text-[10px] text-text-muted">
                1 200 mots — blog.cabinet-renaud.fr
              </p>
            </motion.div>
          )}

          {/* Step 2: Key points extraction */}
          {count >= 2 && (
            <motion.div
              key="extraction"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 px-1">
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span className="text-xs text-text-muted">Extraction des points clés...</span>
              </div>
              <div className="space-y-1 px-1">
                {[
                  "Vérifier les références et projets réalisés",
                  "Comparer au moins 3 devis détaillés",
                  "Vérifier les assurances obligatoires",
                  "Privilégier la proximité géographique",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-1.5">
                    <span className="text-[10px] text-primary mt-0.5">•</span>
                    <span className="text-[10px] text-text-muted">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Instagram carousel */}
          {count >= 3 && (
            <motion.div
              key="instagram"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2.5"
            >
              <span className="mt-0.5 text-lg">📸</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-text-primary">Carrousel Instagram</p>
                <p className="text-[10px] text-text-muted">5 slides — Les 5 critères pour choisir son architecte</p>
              </div>
              <StatusBadge variant="success">Prêt</StatusBadge>
            </motion.div>
          )}

          {/* Step 4: LinkedIn */}
          {count >= 4 && (
            <motion.div
              key="linkedin"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2.5"
            >
              <span className="mt-0.5 text-lg">💼</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-text-primary">Article LinkedIn</p>
                <p className="text-[10px] text-text-muted">Version pro avec chiffres du secteur</p>
              </div>
              <StatusBadge variant="success">Prêt</StatusBadge>
            </motion.div>
          )}

          {/* Step 5: Facebook + Story */}
          {count >= 5 && (
            <motion.div
              key="fb-story"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1.5"
            >
              <div className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2.5">
                <span className="mt-0.5 text-lg">📘</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-text-primary">Post Facebook</p>
                  <p className="text-[10px] text-text-muted">Version courte + lien vers l&apos;article</p>
                </div>
                <StatusBadge variant="success">Prêt</StatusBadge>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2.5">
                <span className="mt-0.5 text-lg">📱</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-text-primary">Story</p>
                  <p className="text-[10px] text-text-muted">Citation clé + swipe up</p>
                </div>
                <StatusBadge variant="success">Prêt</StatusBadge>
              </div>
            </motion.div>
          )}

          {/* Step 6: Summary */}
          {count >= 6 && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-text-primary">5 contenus générés</p>
                  <p className="text-[10px] text-text-muted">3 plateformes — ~45 min gagnées</p>
                </div>
                <StatusBadge variant="success">Prêt à publier</StatusBadge>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
