"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { NotificationToast } from "@/components/ui/simulation/NotificationToast";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimSocialReponse() {
  const delays = useMemo(() => [0.5, 1.5, 2.0, 2.0, 1.5, 1.5], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Réponse automatique"
      title="Vos commentaires traités en temps réel"
      device="phone"
      deviceTitle="Instagram — Notifications"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Notification */}
          {count >= 1 && (
            <NotificationToast key="notif">
              <p className="text-xs font-medium">
                💬 3 nouveaux commentaires sur votre dernier post
              </p>
            </NotificationToast>
          )}

          {/* Step 2: Comment 1 - Question */}
          {count >= 2 && (
            <motion.div
              key="comment1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2.5"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-medium text-text-primary">@julie_rdz</span>
                <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-medium text-blue-400">
                  Question
                </span>
              </div>
              <p className="text-[10px] text-text-muted mb-1.5">
                C&apos;est ouvert le dimanche ?
              </p>
              <div className="rounded-md bg-blue-500/5 border border-blue-500/20 px-2.5 py-1.5">
                <p className="text-[10px] text-text-muted">
                  <span className="text-blue-400 font-medium">Réponse IA :</span> Bonjour Julie ! Nous sommes ouverts le dimanche midi 🍽️ Réservation au 05 65...
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Comment 2 - Compliment */}
          {count >= 3 && (
            <motion.div
              key="comment2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2.5"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-medium text-text-primary">@foodlover12</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                  Compliment
                </span>
              </div>
              <p className="text-[10px] text-text-muted mb-1.5">
                Magnifique assiette ! 😍
              </p>
              <div className="rounded-md bg-emerald-500/5 border border-emerald-500/20 px-2.5 py-1.5">
                <p className="text-[10px] text-text-muted">
                  <span className="text-emerald-400 font-medium">Réponse IA :</span> Merci beaucoup ! Notre chef sera ravi 👨‍🍳
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 4: Comment 3 - Spam */}
          {count >= 4 && (
            <motion.div
              key="comment3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2.5"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-medium text-text-primary">@promo_spam</span>
                <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-medium text-red-400">
                  Spam
                </span>
              </div>
              <p className="text-[10px] text-text-muted line-through mb-1">
                Gagnez 1000€...
              </p>
              <p className="text-[10px] text-red-400 font-medium">
                🚫 Masqué automatiquement
              </p>
            </motion.div>
          )}

          {/* Step 5: DM - Lead */}
          {count >= 5 && (
            <motion.div
              key="dm-lead"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2.5"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] text-text-muted">DM</span>
                <span className="text-[11px] font-medium text-text-primary">@marie.arch</span>
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                  Lead ⭐
                </span>
              </div>
              <p className="text-[10px] text-text-muted mb-1.5">
                Bonjour, je voudrais réserver pour 6 personnes samedi
              </p>
              <div className="rounded-md bg-amber-500/5 border border-amber-500/20 px-2.5 py-1.5">
                <p className="text-[10px] text-text-muted">
                  <span className="text-amber-400 font-medium">Réponse IA + notification pro envoyée</span>
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 6: Recap */}
          {count >= 6 && (
            <motion.div
              key="recap"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-4 gap-2"
            >
              {[
                { value: "4", label: "Interactions" },
                { value: "2", label: "Réponses auto" },
                { value: "1", label: "Spam filtré" },
                { value: "1", label: "Lead qualifié" },
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
