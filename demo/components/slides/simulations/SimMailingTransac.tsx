"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { NotificationToast } from "@/components/ui/simulation/NotificationToast";
import { TimelineStep } from "@/components/ui/simulation/TimelineStep";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimMailingTransac() {
  const delays = useMemo(() => [0.5, 1.5, 2.0, 2.0, 2.0, 1.5], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Mails transactionnels"
      title="Commande passée, emails envoyés"
      device="desktop"
      deviceTitle="Automatisation — Emails transactionnels"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: New order notification */}
          {count >= 1 && (
            <NotificationToast key="order">
              <p className="text-xs font-medium">
                🛒 Nouvelle commande #4721
              </p>
              <p className="mt-0.5 text-[10px] text-text-muted">
                Marie Dupont — 89,00€
              </p>
            </NotificationToast>
          )}

          {/* Step 2: Confirmation email */}
          {count >= 2 && (
            <motion.div
              key="confirm-email"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-3"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-text-primary">
                  Confirmation de commande
                </p>
                <StatusBadge variant="success">Envoyé ✓</StatusBadge>
              </div>
              <div className="space-y-1 text-[10px] text-text-muted">
                <p>📦 Robe été Lin — 59,00€</p>
                <p>🧢 Chapeau paille — 30,00€</p>
                <div className="border-t border-[var(--border)] pt-1 mt-1">
                  <p className="font-medium text-text-primary">Total : 89,00€</p>
                  <p>Livraison estimée : 12-14 février</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Timeline */}
          {count >= 3 && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 space-y-1.5"
            >
              <p className="text-[10px] font-medium text-text-muted">Suivi de commande :</p>
              <TimelineStep status="done">J+0 — Confirmation envoyée</TimelineStep>
              <TimelineStep status="active">
                <span className="animate-pulse">J+1 — Préparation en cours</span>
              </TimelineStep>
              <TimelineStep status="pending">J+3 — Expédié</TimelineStep>
              <TimelineStep status="pending">J+5 — Livré</TimelineStep>
            </motion.div>
          )}

          {/* Step 4: Shipping email */}
          {count >= 4 && (
            <motion.div
              key="shipping-email"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-3"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium text-text-primary">
                  Votre colis a été expédié
                </p>
                <StatusBadge variant="success">Envoyé ✓</StatusBadge>
              </div>
              <p className="text-[10px] text-text-muted">
                N° de suivi : <span className="font-medium text-primary">6Y12345678</span>
              </p>
            </motion.div>
          )}

          {/* Step 5: Delivery + review */}
          {count >= 5 && (
            <motion.div
              key="delivery-email"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-3"
            >
              <p className="text-xs font-medium text-text-primary mb-1">
                Livraison confirmée
              </p>
              <p className="text-[10px] text-text-muted mb-2">
                Votre commande a bien été livrée !
              </p>
              <div className="rounded-md bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-center">
                <p className="text-[11px] text-text-primary">
                  Notez votre expérience
                </p>
                <p className="text-lg mt-0.5">⭐⭐⭐⭐⭐</p>
              </div>
            </motion.div>
          )}

          {/* Step 6: Metrics */}
          {count >= 6 && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-4 gap-2"
            >
              {[
                { value: "100%", label: "Délivrés" },
                { value: "78%", label: "Ouverts" },
                { value: "34%", label: "Avis collectés" },
                { value: "0", label: "Intervention" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] p-2 text-center"
                >
                  <p className="text-sm font-bold text-primary">{m.value}</p>
                  <p className="text-[9px] text-text-muted">{m.label}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
