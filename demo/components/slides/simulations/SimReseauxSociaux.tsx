"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { NotificationToast } from "@/components/ui/simulation/NotificationToast";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

function PostCard({
  emoji,
  platform,
  title,
  caption,
  schedule,
}: {
  emoji: string;
  platform: string;
  title: string;
  caption: string;
  schedule: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2.5"
    >
      <span className="mt-0.5 text-lg">{emoji}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium text-text-primary">{platform}</p>
          <StatusBadge variant="pending">{schedule}</StatusBadge>
        </div>
        <p className="mt-0.5 text-[11px] font-medium text-text-primary truncate">
          {title}
        </p>
        <p className="text-[10px] text-text-muted truncate">{caption}</p>
      </div>
    </motion.div>
  );
}

export function SimReseauxSociaux() {
  const delays = useMemo(
    () => [0.5, 1.5, 2.5, 1.0, 0.8, 0.8, 1.2, 1.5, 1.5],
    []
  );
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Posts multi-plateformes"
      title="1 photo, 3 posts, 0 effort"
      device="desktop"
      deviceTitle="Dashboard — Réseaux sociaux"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: WhatsApp conversation header */}
          {count >= 1 && (
            <motion.div
              key="whatsapp-conv"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-lg border border-emerald-500/20 bg-emerald-500/5"
            >
              {/* WhatsApp header bar */}
              <div className="flex items-center gap-2 border-b border-emerald-500/10 bg-emerald-500/10 px-3 py-1.5">
                <span className="text-sm">💬</span>
                <span className="text-[11px] font-semibold text-emerald-400">
                  WhatsApp — Assistant Neurolia
                </span>
                <span className="ml-auto text-[10px] text-text-muted">12:34</span>
              </div>

              <div className="space-y-2 px-3 py-2.5">
                {/* User message: photo */}
                <div className="ml-auto w-4/5">
                  <div className="rounded-lg rounded-tr-none bg-emerald-500/15 px-3 py-2">
                    {/* Photo placeholder */}
                    <div className="mb-2 flex h-20 items-center justify-center rounded-md bg-emerald-500/10 border border-emerald-500/20">
                      <div className="text-center">
                        <span className="text-2xl">📷</span>
                        <p className="text-[9px] text-emerald-400/70">photo_magret.jpg</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-text-primary">
                      Plat du jour — Magret de canard sauce cèpes 🍽️
                    </p>
                    <p className="text-[10px] text-text-muted">
                      Publie sur les 3 réseaux, ton habituel
                    </p>
                  </div>
                  <p className="mt-0.5 text-right text-[9px] text-text-muted">Vous · 12:34 ✓✓</p>
                </div>

                {/* Step 2: Bot reply */}
                {count >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mr-auto w-4/5"
                  >
                    <div className="rounded-lg rounded-tl-none bg-[var(--surface-card)] border border-[var(--border)] px-3 py-2">
                      <p className="text-[11px] text-text-primary">
                        ✓ Photo reçue ! Je prépare 3 posts adaptés pour Instagram, LinkedIn et Facebook.
                      </p>
                    </div>
                    <p className="mt-0.5 text-[9px] text-text-muted">Assistant · 12:34</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: AI processing */}
          {count >= 3 && count < 4 && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-1 text-sm text-text-muted"
            >
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-xs">
                IA en cours — génération de 3 posts...
              </span>
            </motion.div>
          )}

          {/* Step 4: Instagram post */}
          {count >= 4 && (
            <PostCard
              key="post-ig"
              emoji="📸"
              platform="Instagram"
              title="Magret de canard sauce cèpes"
              caption="Notre chef sublime le terroir... #platdujour #gastronomie #aveyron"
              schedule="12h"
            />
          )}

          {/* Step 5: LinkedIn post */}
          {count >= 5 && (
            <PostCard
              key="post-li"
              emoji="💼"
              platform="LinkedIn"
              title="Le terroir au cœur de notre carte"
              caption="Chaque jour, nos producteurs locaux nous inspirent..."
              schedule="18h30"
            />
          )}

          {/* Step 6: Facebook post */}
          {count >= 6 && (
            <PostCard
              key="post-fb"
              emoji="📘"
              platform="Facebook"
              title="Plat du jour : Magret sauce cèpes !"
              caption="Venez découvrir notre plat du jour à partir de 12h. Réservation au..."
              schedule="20h"
            />
          )}

          {/* Step 7: Validation */}
          {count >= 7 && (
            <motion.div
              key="validation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2"
            >
              <span className="text-[11px] text-emerald-400">
                ✓ 3 posts validés et planifiés
              </span>
              <div className="flex gap-1">
                <span className="text-[10px] text-text-muted">12h</span>
                <span className="text-[10px] text-text-muted">·</span>
                <span className="text-[10px] text-text-muted">18h30</span>
                <span className="text-[10px] text-text-muted">·</span>
                <span className="text-[10px] text-text-muted">20h</span>
              </div>
            </motion.div>
          )}

          {/* Step 8: Published toasts */}
          {count >= 8 && (
            <div key="published" className="space-y-1.5">
              <NotificationToast>
                Publié sur Instagram ✓
              </NotificationToast>
              <NotificationToast>
                Publié sur LinkedIn ✓
              </NotificationToast>
              <NotificationToast>
                Publié sur Facebook ✓
              </NotificationToast>
            </div>
          )}

          {/* Step 9: Weekly report */}
          {count >= 9 && (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2.5"
            >
              <span className="text-lg">📊</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-primary">
                  Rapport hebdomadaire
                </p>
                <div className="mt-1 flex gap-4">
                  <span className="text-[10px] text-text-muted">
                    847 impressions
                  </span>
                  <span className="text-[10px] text-emerald-400">
                    +23% engagement
                  </span>
                  <span className="text-[10px] text-text-muted">
                    12 nouveaux abonnés
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
