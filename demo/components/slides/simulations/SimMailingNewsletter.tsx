"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { ChatBubble } from "@/components/ui/simulation/ChatBubble";
import { TypingText } from "@/components/ui/simulation/TypingText";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimMailingNewsletter() {
  const delays = useMemo(() => [0.5, 2.0, 2.5, 2.0, 1.5, 2.0], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Newsletter HTML"
      title="Votre newsletter rédigée en 30 secondes"
      device="desktop"
      deviceTitle="Neurolia — Newsletter IA"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Brief */}
          {count >= 1 && (
            <ChatBubble key="brief" role="user">
              Newsletter de février, thème : soldes d&apos;hiver + nouveau produit bio
            </ChatBubble>
          )}

          {/* Step 2: Processing + theme extraction */}
          {count >= 2 && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 px-1">
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span className="text-xs text-text-muted">Rédaction en cours...</span>
              </div>
              <div className="flex gap-1.5 px-1">
                <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] text-red-400">Soldes</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400">Nouveau produit</span>
                <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] text-green-400">Bio</span>
              </div>
            </motion.div>
          )}

          {/* Step 3: Newsletter preview */}
          {count >= 3 && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-primary/10 px-4 py-2 text-center">
                <div className="mx-auto h-5 w-20 rounded bg-primary/20 mb-1" />
                <p className="text-xs font-bold text-text-primary">
                  Les soldes continuent !
                </p>
              </div>
              {/* Body */}
              <div className="px-4 py-3 space-y-2">
                <div>
                  <p className="text-[10px] font-medium text-text-primary mb-0.5">
                    ❄️ Dernières démarques
                  </p>
                  <div className="text-[10px] text-text-muted">
                    <TypingText
                      text="Profitez de -40% sur toute la collection hiver. Plus que quelques jours pour en profiter..."
                      speed={25}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-text-primary mb-0.5">
                    🌱 Nouveau : gamme bio
                  </p>
                  <p className="text-[10px] text-text-muted">
                    Découvrez notre nouvelle gamme certifiée bio...
                  </p>
                </div>
                <div className="text-center">
                  <span className="inline-block rounded-md bg-primary px-4 py-1 text-[10px] font-medium text-white">
                    Découvrir →
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Stats bar */}
          {count >= 4 && (
            <motion.div
              key="checks"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 flex-wrap"
            >
              <StatusBadge variant="success">Template appliqué ✓</StatusBadge>
              <StatusBadge variant="success">Responsive mobile ✓</StatusBadge>
              <StatusBadge variant="active">Anti-spam : 9.2/10</StatusBadge>
            </motion.div>
          )}

          {/* Step 5: Sending */}
          {count >= 5 && (
            <motion.div
              key="sending"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-text-primary">2 340 destinataires</span>
                <StatusBadge variant="success">Campagne envoyée ✓</StatusBadge>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[var(--surface-card)] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-emerald-500"
                />
              </div>
            </motion.div>
          )}

          {/* Step 6: Live metrics */}
          {count >= 6 && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-4 gap-2"
            >
              {[
                { value: "2 340", label: "Envoyés" },
                { value: "52%", label: "Ouverture" },
                { value: "18%", label: "Clics" },
                { value: "3.2%", label: "Conversion" },
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
