"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { TypingText } from "@/components/ui/simulation/TypingText";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { DocumentPreview } from "@/components/ui/simulation/DocumentPreview";
import { NotificationToast } from "@/components/ui/simulation/NotificationToast";
import { TimelineStep } from "@/components/ui/simulation/TimelineStep";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimDevisFacturation() {
  const delays = useMemo(() => [0.5, 0.5, 2.5, 1.2, 1.5, 1.5, 1.2, 2.0], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Devis vocal"
      title="Sur le chantier, devis en 30 secondes"
      device="desktop"
      deviceTitle="Devis & Facturation — IA"
    >
      <div className="space-y-3">
        <AnimatePresence>
          {/* Step 1: Mic pulsing */}
          {count >= 1 && (
            <motion.div
              key="mic"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-primary/20">
                <span className="text-xl">🎙️</span>
              </div>
              <div>
                <span className="text-xs font-medium text-text-primary">
                  Lucas, électricien
                </span>
                <p className="text-[10px] text-text-muted">
                  Enregistrement en cours...
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 2: Transcription */}
          {count >= 2 && (
            <motion.div
              key="transcription"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            >
              <TypingText
                text="Devis pour M. Renaud, rénovation tableau électrique, 12 disjoncteurs, 1 différentiel 30mA"
                speed={35}
              />
            </motion.div>
          )}

          {/* Step 3: Processing + extraction */}
          {count >= 3 && count < 4 && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-1.5"
            >
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span className="text-xs">Extraction en cours...</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pl-6">
                <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] text-blue-400">
                  Client: M. Renaud
                </span>
                <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] text-purple-400">
                  12x Disjoncteur
                </span>
                <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] text-purple-400">
                  1x Diff. 30mA
                </span>
              </div>
            </motion.div>
          )}

          {/* Step 4: PDF devis */}
          {count >= 4 && (
            <DocumentPreview
              key={count >= 7 ? "facture" : "devis"}
              title={
                count >= 7
                  ? "Facture #F-2025-087 — M. Renaud"
                  : "Devis #D-2025-087 — M. Renaud"
              }
              lines={[
                { label: "Disjoncteur 20A x12", value: "180,00€" },
                { label: "Différentiel 30mA x1", value: "85,00€" },
                { label: "Main d'œuvre (3h)", value: "165,00€" },
                { label: "TVA 20%", value: "86,00€" },
              ]}
              total="516,00€ TTC"
            />
          )}

          {/* Step 5: Sent to client */}
          {count >= 5 && count < 6 && (
            <motion.div
              key="sent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <StatusBadge variant="active">Envoyé</StatusBadge>
              <span className="text-[11px] text-text-muted">
                → renaud@email.fr
              </span>
            </motion.div>
          )}

          {/* Step 6: Client signs */}
          {count >= 6 && count < 7 && (
            <motion.div
              key="signed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-3">
                <StatusBadge variant="success">Signé ✓</StatusBadge>
                <span className="text-[11px] text-text-muted">
                  M. Renaud a signé électroniquement
                </span>
              </div>
              <NotificationToast>
                ✍️ Devis signé — Transformation en facture...
              </NotificationToast>
            </motion.div>
          )}

          {/* Step 7: Transformation devis → facture (title changes via key above) */}
          {count >= 7 && (
            <motion.div
              key="transformed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <StatusBadge variant="success">Facture créée ✓</StatusBadge>
              <span className="text-[11px] text-text-muted">
                Lien de paiement joint automatiquement
              </span>
            </motion.div>
          )}

          {/* Step 8: Relance cycle + payment */}
          {count >= 8 && (
            <motion.div
              key="relance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            >
              <p className="text-[10px] font-medium text-text-muted">
                Suivi automatique :
              </p>
              <TimelineStep status="done">
                J+3 — Relance email envoyée
              </TimelineStep>
              <TimelineStep status="done">
                J+7 — 2e relance envoyée
              </TimelineStep>
              <TimelineStep status="done">
                <span className="text-emerald-400">
                  J+9 — Paiement reçu ✓ 516,00€
                </span>
              </TimelineStep>
              <NotificationToast>
                💰 Virement reçu de M. Renaud — 516,00€
              </NotificationToast>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
