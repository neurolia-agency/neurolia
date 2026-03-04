"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { NotificationToast } from "@/components/ui/simulation/NotificationToast";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimDevisTresorerie() {
  const delays = useMemo(() => [0.5, 1.5, 2.0, 2.0, 1.5, 1.5], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Suivi de trésorerie"
      title="Votre trésorerie en un coup d’œil"
      device="desktop"
      deviceTitle="Neurolia — Tableau de Bord"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Header + balance */}
          {count >= 1 && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-3 text-center"
            >
              <p className="text-[10px] text-text-muted">Février 2026</p>
              <p className="text-2xl font-bold text-primary">12 450€</p>
              <p className="text-[10px] text-text-muted">Solde actuel</p>
            </motion.div>
          )}

          {/* Step 2: 3 metrics */}
          {count >= 2 && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 gap-2"
            >
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] p-2.5 text-center">
                <p className="text-sm font-bold text-blue-400">6 200€</p>
                <p className="text-[9px] text-text-muted">8 factures en cours</p>
              </div>
              <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-2.5 text-center">
                <p className="text-sm font-bold text-red-400">2 100€</p>
                <p className="text-[9px] text-text-muted">3 impayées</p>
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] p-2.5 text-center">
                <p className="text-sm font-bold text-emerald-400">18 650€</p>
                <p className="text-[9px] text-text-muted">CA du mois</p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Pending invoices list */}
          {count >= 3 && (
            <motion.div
              key="invoices"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              <p className="text-[10px] font-medium text-text-muted px-1">Factures en attente :</p>
              {[
                { client: "Restaurant Bichette", amount: "1 850€", days: "15j", color: "text-red-400" },
                { client: "Cabinet Dupont", amount: "720€", days: "8j", color: "text-amber-400" },
                { client: "Garage Martin", amount: "430€", days: "3j", color: "text-text-muted" },
              ].map((inv) => (
                <div
                  key={inv.client}
                  className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-1.5"
                >
                  <span className="flex-1 text-[11px] font-medium text-text-primary truncate">{inv.client}</span>
                  <span className="text-[11px] font-bold text-primary">{inv.amount}</span>
                  <span className={`text-[10px] font-medium ${inv.color}`}>{inv.days}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Step 4: Forecast */}
          {count >= 4 && (
            <motion.div
              key="forecast"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            >
              <p className="text-[10px] font-medium text-text-muted mb-1.5">Prévision :</p>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-text-muted">Encaissements prévus cette semaine</span>
                  <span className="text-emerald-400 font-medium">+4 300€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Charges à venir</span>
                  <span className="text-red-400 font-medium">-2 800€</span>
                </div>
                <div className="border-t border-[var(--border)] pt-1 flex justify-between">
                  <span className="text-text-primary font-medium">Solde estimé fin de mois</span>
                  <span className="text-primary font-bold">13 950€</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: AI Alert */}
          {count >= 5 && (
            <motion.div
              key="alert"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-2.5"
            >
              <p className="text-[11px] text-amber-400">
                ⚠️ Facture #071 — Restaurant Bichette — 15 jours de retard. Relance automatique programmée.
              </p>
            </motion.div>
          )}

          {/* Step 6: Export */}
          {count >= 6 && (
            <motion.div
              key="export"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1.5"
            >
              <div className="flex items-center gap-3 px-1">
                <StatusBadge variant="success">Export comptable généré ✓</StatusBadge>
                <span className="text-[10px] text-text-muted">Synchronisé avec votre logiciel</span>
              </div>
              <NotificationToast>📊 Export envoyé à la comptabilité</NotificationToast>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
