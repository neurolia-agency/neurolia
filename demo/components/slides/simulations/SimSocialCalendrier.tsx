"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimSocialCalendrier() {
  const delays = useMemo(() => [0.5, 2.0, 2.5, 2.0, 1.5, 1.5], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Calendrier éditorial"
      title="Votre mois de contenu, planifié en 1 minute"
      device="desktop"
      deviceTitle="Neurolia — Calendrier Éditorial"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Brand brief input */}
          {count >= 1 && (
            <motion.div
              key="brief"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-3"
            >
              <p className="text-[10px] font-medium text-text-muted mb-1">Brief marque</p>
              <p className="text-xs text-text-primary">
                La Brasserie du Marché — restaurant traditionnel, terroir, convivialité
              </p>
            </motion.div>
          )}

          {/* Step 2: Analysis + theme badges */}
          {count >= 2 && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 px-1">
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span className="text-xs text-text-muted">Analyse de votre charte...</span>
              </div>
              <div className="flex gap-1.5 px-1 flex-wrap">
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] text-amber-400">Terroir</span>
                <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] text-blue-400">Plats du jour</span>
                <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] text-purple-400">Équipe</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400">Événements</span>
              </div>
            </motion.div>
          )}

          {/* Step 3: Week 1 calendar */}
          {count >= 3 && (
            <motion.div
              key="week1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1.5"
            >
              <p className="text-[10px] font-medium text-text-muted px-1">Semaine 1 :</p>
              {[
                { day: "Lundi", emoji: "🍽️", title: "Plat du jour", platform: "Instagram" },
                { day: "Mercredi", emoji: "👨‍🍳", title: "Coulisses cuisine", platform: "LinkedIn" },
                { day: "Vendredi", emoji: "🎉", title: "Soirée weekend", platform: "Facebook" },
              ].map((post) => (
                <div
                  key={post.day}
                  className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2"
                >
                  <span className="text-sm">{post.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-text-primary">{post.day} — {post.title}</p>
                    <p className="text-[10px] text-text-muted">{post.platform}</p>
                  </div>
                  <StatusBadge variant="pending">9h</StatusBadge>
                </div>
              ))}
            </motion.div>
          )}

          {/* Step 4: Week 2 calendar */}
          {count >= 4 && (
            <motion.div
              key="week2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1.5"
            >
              <p className="text-[10px] font-medium text-text-muted px-1">Semaine 2 :</p>
              {[
                { day: "Lundi", emoji: "🥗", title: "Nouveau menu", platform: "Instagram" },
                { day: "Jeudi", emoji: "⭐", title: "Avis client", platform: "LinkedIn" },
                { day: "Samedi", emoji: "📸", title: "Ambiance salle", platform: "Facebook" },
              ].map((post) => (
                <div
                  key={post.day}
                  className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2"
                >
                  <span className="text-sm">{post.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-text-primary">{post.day} — {post.title}</p>
                    <p className="text-[10px] text-text-muted">{post.platform}</p>
                  </div>
                  <StatusBadge variant="pending">9h</StatusBadge>
                </div>
              ))}
            </motion.div>
          )}

          {/* Step 5: Recap */}
          {count >= 5 && (
            <motion.div
              key="recap"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            >
              <p className="text-xs font-medium text-text-primary mb-1.5">
                20 posts planifiés sur 4 semaines
              </p>
              <div className="flex gap-3 text-[10px] text-text-muted">
                <span>📸 Instagram : 8</span>
                <span>💼 LinkedIn : 6</span>
                <span>📘 Facebook : 6</span>
              </div>
            </motion.div>
          )}

          {/* Step 6: Validated */}
          {count >= 6 && (
            <motion.div
              key="validated"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-1"
            >
              <StatusBadge variant="success">Calendrier validé ✓</StatusBadge>
              <span className="text-[10px] text-text-muted">
                Premiers posts programmés pour lundi 9h
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
