"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { NotificationToast } from "@/components/ui/simulation/NotificationToast";
import { DocumentPreview } from "@/components/ui/simulation/DocumentPreview";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimDevisFormulaire() {
  const delays = useMemo(() => [0.5, 1.5, 2.5, 2.0, 2.0, 1.5], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Formulaire web → devis"
      title="Le client remplit, le devis se génère"
      device="desktop"
      deviceTitle="Formulaire en ligne — Devis automatique"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Form */}
          {count >= 1 && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-3"
            >
              <p className="text-xs font-medium text-text-primary mb-2">Demande de devis</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Nom", value: "Sophie Martin" },
                  { label: "Service", value: "Site vitrine" },
                  { label: "Pages", value: "5" },
                  { label: "Options", value: "Blog + SEO" },
                ].map((field) => (
                  <div key={field.label} className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5">
                    <p className="text-[9px] text-text-muted">{field.label}</p>
                    <p className="text-[11px] font-medium text-text-primary">{field.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Generate button + spinner */}
          {count >= 2 && count < 3 && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 py-2"
            >
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-xs text-text-muted">Calcul en cours...</span>
            </motion.div>
          )}

          {/* Step 3: Document preview */}
          {count >= 3 && (
            <DocumentPreview
              key="devis"
              title="Devis #D-2025-112 — Sophie Martin"
              lines={[
                { label: "Site vitrine 5 pages", value: "2 500€" },
                { label: "Blog", value: "800€" },
                { label: "SEO", value: "600€" },
                { label: "TVA 20%", value: "780€" },
              ]}
              total="4 680€ TTC"
            />
          )}

          {/* Step 4: Sent + signature available */}
          {count >= 4 && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <StatusBadge variant="success">Envoyé ✓</StatusBadge>
              <span className="text-[10px] text-text-muted">→ sophie.martin@email.fr</span>
              <span className="text-[10px] text-primary">Signature en ligne disponible</span>
            </motion.div>
          )}

          {/* Step 5: Client signs */}
          {count >= 5 && (
            <motion.div
              key="signed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <NotificationToast>
                ✍️ Sophie Martin a signé le devis
              </NotificationToast>
              <div className="px-1">
                <StatusBadge variant="success">Signé ✓</StatusBadge>
              </div>
            </motion.div>
          )}

          {/* Step 6: Auto-transform to invoice */}
          {count >= 6 && (
            <motion.div
              key="invoice"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <StatusBadge variant="success">Facture #F-2025-112 créée ✓</StatusBadge>
                <span className="text-[10px] text-text-muted">Lien de paiement envoyé</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
