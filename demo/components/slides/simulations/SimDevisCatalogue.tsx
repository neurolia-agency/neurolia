"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { DocumentPreview } from "@/components/ui/simulation/DocumentPreview";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimDevisCatalogue() {
  const delays = useMemo(() => [0.5, 1.5, 2.0, 1.5, 2.0, 1.5], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Catalogue intelligent"
      title="Vos tarifs appliqués automatiquement"
      device="desktop"
      deviceTitle="Neurolia — Catalogue & Tarification"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Search bar */}
          {count >= 1 && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-2.5"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">🔍</span>
                <span className="text-xs text-text-primary">tableau électrique</span>
                <span className="ml-auto text-[10px] text-text-muted">Entrée ↵</span>
              </div>
            </motion.div>
          )}

          {/* Step 2: Catalog results */}
          {count >= 2 && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              {[
                { name: "Disjoncteur 20A", price: "15€/u", ref: "CAT-001" },
                { name: "Différentiel 30mA", price: "85€/u", ref: "CAT-002" },
                { name: "Main d’œuvre élec.", price: "55€/h", ref: "MO-01" },
              ].map((item) => (
                <div
                  key={item.ref}
                  className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-text-primary">{item.name}</p>
                    <p className="text-[10px] text-text-muted">{item.ref}</p>
                  </div>
                  <span className="text-[11px] font-bold text-primary">{item.price}</span>
                  <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                    + Ajouter
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Step 3: Cart with quantities */}
          {count >= 3 && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            >
              <p className="text-[10px] font-medium text-text-muted mb-2">Panier devis :</p>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-text-muted">12x Disjoncteur 20A</span>
                  <span className="text-text-primary font-medium">180€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">1x Différentiel 30mA</span>
                  <span className="text-text-primary font-medium">85€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">3h Main d’œuvre</span>
                  <span className="text-text-primary font-medium">165€</span>
                </div>
                <div className="border-t border-[var(--border)] pt-1 flex justify-between font-medium">
                  <span className="text-text-primary">Sous-total HT</span>
                  <span className="text-primary">430€</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: AI suggestion - volume discount */}
          {count >= 4 && (
            <motion.div
              key="discount"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-2.5"
            >
              <p className="text-[11px] text-amber-400 font-medium mb-0.5">
                💡 Remise volume détectée
              </p>
              <p className="text-[10px] text-text-muted">
                -10% sur disjoncteurs (&gt;10 unités) :{" "}
                <span className="line-through">180€</span>{" "}
                <span className="font-medium text-emerald-400">162€</span>
              </p>
            </motion.div>
          )}

          {/* Step 5: Document preview with margin */}
          {count >= 5 && (
            <motion.div key="preview" className="space-y-2">
              <DocumentPreview
                title="Devis — Tableau électrique"
                lines={[
                  { label: "12x Disjoncteur 20A (-10%)", value: "162,00€" },
                  { label: "1x Différentiel 30mA", value: "85,00€" },
                  { label: "Main d’œuvre (3h)", value: "165,00€" },
                  { label: "TVA 20%", value: "82,40€" },
                ]}
                total="494,40€ TTC"
              />
              <div className="flex items-center gap-2 px-1">
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400">
                  Marge brute : 42%
                </span>
                <span className="text-[9px] text-text-muted">(visible uniquement pro)</span>
              </div>
            </motion.div>
          )}

          {/* Step 6: Time saved */}
          {count >= 6 && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5 text-center"
            >
              <p className="text-xs font-medium text-text-primary">
                Devis généré en 30 secondes
              </p>
              <p className="text-[10px] text-text-muted">
                vs 25 min manuellement
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
