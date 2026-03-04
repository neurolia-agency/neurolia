"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { ChatBubble } from "@/components/ui/simulation/ChatBubble";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimAssistantVeille() {
  const delays = useMemo(() => [0.5, 2.0, 2.0, 2.0, 1.5, 1.5, 1.0], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Veille sectorielle"
      title="Les actus de votre secteur, résumées chaque matin"
      device="phone"
      deviceTitle="WhatsApp — Assistant IA"
    >
      <div className="space-y-2">
        <AnimatePresence>
          {/* 1: Morning greeting */}
          {count >= 1 && (
            <ChatBubble key="b0" role="bot">
              ☀️ Bonjour ! Voici votre veille du 8 février :
            </ChatBubble>
          )}

          {/* 2: News 1 */}
          {count >= 2 && (
            <ChatBubble key="b1" role="bot">
              <div className="rounded-md border border-red-500/20 bg-red-500/5 px-2.5 py-2">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm">🏗️</span>
                  <span className="text-[11px] font-medium text-text-primary">Nouvelle norme RE2025</span>
                  <span className="rounded-full bg-red-500/15 px-1.5 py-0.5 text-[9px] font-medium text-red-400">Important</span>
                </div>
                <p className="text-[10px] text-text-muted">
                  Entrée en vigueur avril. Impact sur vos devis isolation.
                </p>
              </div>
            </ChatBubble>
          )}

          {/* 3: News 2 */}
          {count >= 3 && (
            <ChatBubble key="b2" role="bot">
              <div className="rounded-md border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-2">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm">💰</span>
                  <span className="text-[11px] font-medium text-text-primary">Aide MaPrimeRénov élargie</span>
                  <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-medium text-emerald-400">Opportunité</span>
                </div>
                <p className="text-[10px] text-text-muted">
                  Budget augmenté de 20%. Opportunité pour vos clients.
                </p>
              </div>
            </ChatBubble>
          )}

          {/* 4: News 3 */}
          {count >= 4 && (
            <ChatBubble key="b3" role="bot">
              <div className="rounded-md border border-blue-500/20 bg-blue-500/5 px-2.5 py-2">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm">📊</span>
                  <span className="text-[11px] font-medium text-text-primary">Étude INSEE construction</span>
                  <span className="rounded-full bg-blue-500/15 px-1.5 py-0.5 text-[9px] font-medium text-blue-400">Tendance</span>
                </div>
                <p className="text-[10px] text-text-muted">
                  Hausse de 8% des demandes de rénovation en Occitanie.
                </p>
              </div>
            </ChatBubble>
          )}

          {/* 5: AI analysis */}
          {count >= 5 && (
            <ChatBubble key="b4" role="bot">
              <p className="text-[11px]">
                💡 <span className="font-medium">Mon analyse :</span> la combinaison RE2025 + aides élargies va booster la demande. Je suggère de communiquer sur vos certifications.
              </p>
            </ChatBubble>
          )}

          {/* 6: User shares */}
          {count >= 6 && (
            <ChatBubble key="u1" role="user">
              Partage ça à l&apos;équipe
            </ChatBubble>
          )}

          {/* 7: Bot confirms */}
          {count >= 7 && (
            <ChatBubble key="b5" role="bot">
              <p>✓ Veille partagée avec 4 collaborateurs</p>
              <div className="mt-1.5">
                <StatusBadge variant="success">Distribué ✓</StatusBadge>
              </div>
            </ChatBubble>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
