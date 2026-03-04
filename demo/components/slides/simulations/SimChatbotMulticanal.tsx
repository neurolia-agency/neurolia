"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { NotificationToast } from "@/components/ui/simulation/NotificationToast";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimChatbotMulticanal() {
  const delays = useMemo(() => [0.5, 1.5, 1.5, 1.5, 1.5, 2.0], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Multi-canal"
      title="Le même assistant, partout"
      device="desktop"
      deviceTitle="Neurolia — Chatbot Multi-canal"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Two-column header */}
          {count >= 1 && (
            <motion.div
              key="layout"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2">
                <p className="text-[10px] font-medium text-text-muted mb-1">Canaux actifs</p>
                <div className="flex flex-wrap gap-1">
                  {["💬 Site web", "📱 WhatsApp", "💬 Messenger", "📸 Instagram"].map((c) => (
                    <span key={c} className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2">
                <p className="text-[10px] font-medium text-text-muted">Conversations en cours</p>
                <p className="text-lg font-bold text-primary">4</p>
              </div>
            </motion.div>
          )}

          {/* Step 2: Channel 1 - Site web */}
          {count >= 2 && (
            <motion.div
              key="ch1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2"
            >
              <span className="text-sm">💬</span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-text-primary">Site web</p>
                <p className="text-[10px] text-text-muted truncate">&quot;Combien coûte une extension ?&quot;</p>
              </div>
              <StatusBadge variant="active">En cours</StatusBadge>
            </motion.div>
          )}

          {/* Step 3: Channel 2 - WhatsApp */}
          {count >= 3 && (
            <motion.div
              key="ch2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2"
            >
              <span className="text-sm">📱</span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-text-primary">WhatsApp</p>
                <p className="text-[10px] text-text-muted truncate">&quot;Je voudrais un RDV cette semaine&quot;</p>
              </div>
              <StatusBadge variant="success">Répondu ✓</StatusBadge>
            </motion.div>
          )}

          {/* Step 4: Channel 3 - Messenger */}
          {count >= 4 && (
            <motion.div
              key="ch3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2"
            >
              <span className="text-sm">💬</span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-text-primary">Messenger</p>
                <p className="text-[10px] text-text-muted truncate">&quot;Vos horaires d&apos;ouverture ?&quot;</p>
              </div>
              <StatusBadge variant="success">Répondu ✓</StatusBadge>
            </motion.div>
          )}

          {/* Step 5: Channel 4 - Instagram DM */}
          {count >= 5 && (
            <motion.div
              key="ch4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2"
            >
              <span className="text-sm">📸</span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-text-primary">Instagram DM</p>
                <p className="text-[10px] text-text-muted truncate">&quot;Vous faites aussi des rénovations ?&quot;</p>
              </div>
              <StatusBadge variant="active">En cours</StatusBadge>
            </motion.div>
          )}

          {/* Step 6: CRM panel */}
          {count >= 6 && (
            <motion.div
              key="crm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
                <div className="flex items-center gap-4 text-[10px]">
                  <span className="text-text-primary font-medium">4 conversations unifiées</span>
                  <span className="text-primary font-medium">2 leads qualifiés</span>
                </div>
                <p className="mt-1 text-[10px] text-text-muted">
                  Tous synchronisés dans votre CRM
                </p>
              </div>
              <NotificationToast>
                🔔 2 nouveaux leads ajoutés au CRM
              </NotificationToast>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
