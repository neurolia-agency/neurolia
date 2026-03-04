"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { ChatBubble } from "@/components/ui/simulation/ChatBubble";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimAssistantReporting() {
  const delays = useMemo(() => [0.5, 1.0, 2.5, 1.5, 1.0, 2.0, 1.5, 1.5], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Reporting à la demande"
      title="« CA du mois ? » — Réponse en 3 secondes"
      device="phone"
      deviceTitle="WhatsApp — Assistant IA"
    >
      <div className="space-y-2">
        <AnimatePresence>
          {/* 1: User question */}
          {count >= 1 && (
            <ChatBubble key="u1" role="user">
              CA du mois ?
            </ChatBubble>
          )}

          {/* 2: Bot searching */}
          {count >= 2 && count < 3 && (
            <ChatBubble key="bt1" role="bot">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span className="text-[10px] text-text-muted">📊 Interrogation des données...</span>
              </div>
            </ChatBubble>
          )}

          {/* 3: Bot response with CA */}
          {count >= 3 && (
            <ChatBubble key="b1" role="bot">
              <p>
                CA Février 2026 : <span className="font-bold text-primary">18 650€</span>
              </p>
              <p className="mt-1 text-[10px] text-text-muted">
                vs janvier : <span className="text-emerald-400 font-medium">+12% ↑</span>
              </p>
              <div className="mt-2 flex gap-1">
                <div className="h-6 w-8 rounded bg-text-muted/20" />
                <div className="h-8 w-8 rounded bg-text-muted/30" />
                <div className="h-7 w-8 rounded bg-text-muted/25" />
                <div className="h-10 w-8 rounded bg-primary/40" />
              </div>
            </ChatBubble>
          )}

          {/* 4: User follow-up */}
          {count >= 4 && (
            <ChatBubble key="u2" role="user">
              Détail par client ?
            </ChatBubble>
          )}

          {/* 5: Bot typing */}
          {count >= 5 && count < 6 && (
            <ChatBubble key="bt2" role="bot" typing />
          )}

          {/* 6: Bot detail table */}
          {count >= 6 && (
            <ChatBubble key="b2" role="bot">
              <p className="mb-1.5 text-[10px] font-medium text-text-primary">Top 5 clients :</p>
              <div className="space-y-1">
                {[
                  { name: "Dupont", amount: "5 200€", pct: "28%" },
                  { name: "Martin", amount: "3 800€", pct: "20%" },
                  { name: "Bichette", amount: "2 900€", pct: "16%" },
                  { name: "Fabre", amount: "1 850€", pct: "10%" },
                  { name: "Autres", amount: "4 900€", pct: "26%" },
                ].map((row) => (
                  <div key={row.name} className="flex items-center justify-between text-[10px]">
                    <span className="text-text-muted">{row.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-text-primary">{row.amount}</span>
                      <span className="text-text-muted w-8 text-right">{row.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ChatBubble>
          )}

          {/* 7: User asks to send */}
          {count >= 7 && (
            <ChatBubble key="u3" role="user">
              Envoie ce rapport à la compta
            </ChatBubble>
          )}

          {/* 8: Bot confirms */}
          {count >= 8 && (
            <ChatBubble key="b3" role="bot">
              <p>✓ Rapport PDF envoyé à compta@entreprise.fr</p>
              <div className="mt-1.5">
                <StatusBadge variant="success">Envoyé ✓</StatusBadge>
              </div>
            </ChatBubble>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
