"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { NotificationToast } from "@/components/ui/simulation/NotificationToast";
import { DocumentPreview } from "@/components/ui/simulation/DocumentPreview";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimDevisSignature() {
  const delays = useMemo(() => [0.5, 2.0, 2.0, 1.5, 1.5, 1.5], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Signature électronique"
      title="Signé en 3 clics, sans imprimer"
      device="phone"
      deviceTitle="Signature — Devis #D-2025-087"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Email received */}
          {count >= 1 && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-3"
            >
              <p className="text-xs font-medium text-text-primary mb-1">
                Vous avez reçu un devis de Lucas Électricité
              </p>
              <span className="inline-block rounded-md bg-primary px-3 py-1 text-[10px] font-medium text-white">
                Consulter le devis →
              </span>
            </motion.div>
          )}

          {/* Step 2: Document preview */}
          {count >= 2 && (
            <DocumentPreview
              key="devis"
              title="Devis #D-2025-087"
              lines={[
                { label: "Disjoncteur 20A x12", value: "180€" },
                { label: "Différentiel 30mA", value: "85€" },
                { label: "Main d’œuvre (3h)", value: "165€" },
                { label: "TVA 20%", value: "86€" },
              ]}
              total="516€ TTC"
            />
          )}

          {/* Step 3: Signature zone */}
          {count >= 3 && count < 4 && (
            <motion.div
              key="sign-zone"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border-2 border-dashed border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-center"
            >
              <p className="text-xs text-text-muted mb-2">Signez ici</p>
              <div className="h-12 rounded-md border border-[var(--border)] bg-[var(--surface-card)]" />
              <label className="mt-2 flex items-center justify-center gap-2">
                <span className="h-3.5 w-3.5 rounded border border-[var(--border)]" />
                <span className="text-[10px] text-text-muted">Lu et approuvé</span>
              </label>
            </motion.div>
          )}

          {/* Step 4: Signature animation */}
          {count >= 4 && (
            <motion.div
              key="signed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border-2 border-emerald-500/30 bg-emerald-500/5 px-4 py-4 text-center"
            >
              <p className="text-xs text-text-muted mb-2">Signature</p>
              <div className="relative h-12 rounded-md border border-emerald-500/20 bg-[var(--surface-card)] overflow-hidden flex items-center justify-center">
                <motion.svg
                  width="120"
                  height="30"
                  viewBox="0 0 120 30"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <motion.path
                    d="M5 20 C15 5, 25 25, 35 15 S55 5, 65 15 S85 25, 95 10 L115 15"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                  />
                </motion.svg>
              </div>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="h-3.5 w-3.5 rounded border border-emerald-500 bg-emerald-500 flex items-center justify-center text-[8px] text-white">✓</span>
                <span className="text-[10px] text-text-muted">Lu et approuvé</span>
              </div>
            </motion.div>
          )}

          {/* Step 5: Validated */}
          {count >= 5 && (
            <motion.div
              key="validated"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1.5"
            >
              <div className="flex items-center gap-3 px-1">
                <StatusBadge variant="success">Signé ✓</StatusBadge>
                <span className="text-[10px] text-text-muted">
                  8 février 2026 à 14:32
                </span>
              </div>
              <p className="text-[10px] text-text-muted px-1">
                Valeur juridique — conforme eIDAS
              </p>
            </motion.div>
          )}

          {/* Step 6: Double notification */}
          {count >= 6 && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1.5"
            >
              <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2">
                <span className="text-[10px] text-text-muted">📄 Client :</span>
                <span className="text-[10px] text-text-primary">PDF signé envoyé ✓</span>
              </div>
              <NotificationToast>
                Lucas — Devis #087 signé !
              </NotificationToast>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
