"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { ChatBubble } from "@/components/ui/simulation/ChatBubble";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { NotificationToast } from "@/components/ui/simulation/NotificationToast";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimChatbotOnboarding() {
  const delays = useMemo(
    () => [0.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
    []
  );
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Onboarding client"
      title="Nouveau client ? Le bot l’accompagne."
      device="phone"
      deviceTitle="WhatsApp — Onboarding"
    >
      <div className="space-y-2">
        <AnimatePresence>
          {/* 1: Welcome */}
          {count >= 1 && (
            <ChatBubble key="b0" role="bot">
              Bienvenue chez Cabinet Renaud ! 🎉 Je vais vous guider dans les premières étapes de votre projet.
            </ChatBubble>
          )}

          {/* 2: Step 1 */}
          {count >= 2 && (
            <ChatBubble key="b1" role="bot">
              Étape 1/4 — Pouvez-vous m&apos;envoyer les plans de votre terrain ou maison actuelle ?
            </ChatBubble>
          )}

          {/* 3: User sends document */}
          {count >= 3 && (
            <ChatBubble key="u1" role="user">
              <div className="flex items-center gap-2">
                <span className="text-sm">📎</span>
                <span className="text-[11px]">plan_maison.pdf</span>
              </div>
            </ChatBubble>
          )}

          {/* 4: Step 2 - Budget */}
          {count >= 4 && (
            <ChatBubble key="b2" role="bot">
              <p>✓ Document reçu ! Étape 2/4 — Quel est votre budget approximatif ?</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[10px] text-text-muted">
                  &lt; 50k
                </span>
                <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                  50-80k
                </span>
                <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[10px] text-text-muted">
                  &gt; 80k
                </span>
              </div>
            </ChatBubble>
          )}

          {/* 5: User selects budget */}
          {count >= 5 && (
            <ChatBubble key="u2" role="user">
              50-80k
            </ChatBubble>
          )}

          {/* 6: Step 3 - Timeline */}
          {count >= 6 && (
            <ChatBubble key="b3" role="bot">
              <p>Étape 3/4 — Date souhaitée pour les travaux ?</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                  Printemps 2026
                </span>
                <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[10px] text-text-muted">
                  Été 2026
                </span>
                <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[10px] text-text-muted">
                  Pas pressé
                </span>
              </div>
            </ChatBubble>
          )}

          {/* 7: Step 4 - Complete */}
          {count >= 7 && (
            <ChatBubble key="b4" role="bot">
              <p>✓ Profil complété ! Étape 4/4</p>
              <p className="mt-1 text-[10px] text-text-muted">
                Votre architecte référent est M. Renaud. Premier RDV proposé : <span className="font-medium text-primary">Jeudi 14h</span>
              </p>
            </ChatBubble>
          )}

          {/* 8: Progress + notification */}
          {count >= 8 && (
            <motion.div key="complete" className="space-y-2">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-medium text-text-primary">Onboarding</span>
                  <span className="text-[10px] text-emerald-400">100%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[var(--surface-card)]">
                  <div className="h-full w-full rounded-full bg-emerald-500" />
                </div>
              </div>
              <div className="flex items-center gap-2 px-1">
                <StatusBadge variant="success">Dossier créé</StatusBadge>
              </div>
              <NotificationToast>
                📋 Fiche client envoyée à M. Renaud
              </NotificationToast>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
