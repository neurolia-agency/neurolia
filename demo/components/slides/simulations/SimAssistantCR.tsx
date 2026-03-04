"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { TypingText } from "@/components/ui/simulation/TypingText";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { NotificationToast } from "@/components/ui/simulation/NotificationToast";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimAssistantCR() {
  const delays = useMemo(() => [0.5, 2.0, 2.5, 2.0, 1.5, 1.5], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Comptes-rendus"
      title="Réunion terminée, CR envoyé"
      device="desktop"
      deviceTitle="Neurolia — Comptes-Rendus IA"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Meeting header */}
          {count >= 1 && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-2.5"
            >
              <div>
                <p className="text-xs font-medium text-text-primary">
                  Réunion — Projet Martin — 14h-15h
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                <span className="text-[10px] text-red-400">Transcription en cours...</span>
              </div>
            </motion.div>
          )}

          {/* Step 2: Live transcription */}
          {count >= 2 && (
            <motion.div
              key="transcription"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            >
              <div className="space-y-1.5 text-[10px]">
                <p><span className="font-medium text-primary">P. Renaud :</span> <span className="text-text-muted">On valide le plan modifié...</span></p>
                <p><span className="font-medium text-amber-400">Client :</span> <span className="text-text-muted">Le budget reste à 75k ?</span></p>
                <div className="text-text-muted">
                  <span className="font-medium text-primary">P. Renaud : </span>
                  <TypingText text="Oui, confirmé. On démarre les travaux en mars." speed={30} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: AI Summary */}
          {count >= 3 && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3"
            >
              <p className="text-[11px] font-medium text-primary mb-1.5">
                📋 Points clés :
              </p>
              <ul className="space-y-0.5 text-[10px] text-text-muted">
                <li>• Plan modifié validé par le client</li>
                <li>• Budget confirmé à 75 000€</li>
                <li>• Début des travaux prévu en mars</li>
              </ul>
            </motion.div>
          )}

          {/* Step 4: Action items */}
          {count >= 4 && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-3"
            >
              <p className="text-[10px] font-medium text-text-muted mb-1.5">Actions à suivre :</p>
              <div className="space-y-1 text-[10px] text-text-muted">
                <p>☐ Envoyer plans modifiés à M. Martin</p>
                <p>☐ Relancer fournisseur béton</p>
                <p>☐ Bloquer semaine 12 pour début chantier</p>
              </div>
            </motion.div>
          )}

          {/* Step 5: Sent */}
          {count >= 5 && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-1"
            >
              <span className="text-[10px] text-text-muted">
                CR envoyé à : p.renaud@cabinet.fr, martin@email.fr
              </span>
              <StatusBadge variant="success">Distribué ✓</StatusBadge>
            </motion.div>
          )}

          {/* Step 6: Tasks created */}
          {count >= 6 && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1.5"
            >
              <div className="flex items-center gap-2 px-1">
                <StatusBadge variant="success">Tâches créées dans votre agenda ✓</StatusBadge>
              </div>
              <NotificationToast>
                📋 Compte-rendu et tâches synchronisés
              </NotificationToast>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
