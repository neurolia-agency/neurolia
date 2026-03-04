"use client";

import { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { ChatBubble } from "@/components/ui/simulation/ChatBubble";
import { DocumentPreview } from "@/components/ui/simulation/DocumentPreview";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimAssistantRecherche() {
  const delays = useMemo(() => [0.5, 1.0, 2.5, 1.5, 1.0, 2.0], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Recherche documentaire"
      title="Trouvez n’importe quelle info en 5 secondes"
      device="phone"
      deviceTitle="WhatsApp — Assistant IA"
    >
      <div className="space-y-2">
        <AnimatePresence>
          {/* 1: User question */}
          {count >= 1 && (
            <ChatBubble key="u1" role="user">
              Quel est le tarif qu&apos;on a appliqué pour le projet Dupont l&apos;an dernier ?
            </ChatBubble>
          )}

          {/* 2: Bot searching */}
          {count >= 2 && count < 3 && (
            <ChatBubble key="bt1" role="bot">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span className="text-[10px] text-text-muted">🔍 Recherche dans vos documents...</span>
              </div>
            </ChatBubble>
          )}

          {/* 3: Bot found result */}
          {count >= 3 && (
            <ChatBubble key="b1" role="bot">
              <p className="mb-2">
                J&apos;ai trouvé le devis #D-2024-089 du 15 mars 2024 :
              </p>
              <DocumentPreview
                title="Devis #D-2024-089 — Dupont"
                lines={[
                  { label: "Extension 40m²", value: "62 000€ HT" },
                ]}
                total="62 000€ HT"
              />
              <p className="mt-1.5 text-[10px] italic text-text-muted">
                Source : Devis 2024 / Dossier Dupont
              </p>
            </ChatBubble>
          )}

          {/* 4: User follow-up */}
          {count >= 4 && (
            <ChatBubble key="u2" role="user">
              Et la marge sur ce projet ?
            </ChatBubble>
          )}

          {/* 5: Bot typing */}
          {count >= 5 && count < 6 && (
            <ChatBubble key="bt2" role="bot" typing />
          )}

          {/* 6: Bot margin answer */}
          {count >= 6 && (
            <ChatBubble key="b2" role="bot">
              <p>
                Marge brute : <span className="font-semibold text-primary">38% (23 560€)</span>
              </p>
              <p className="mt-1 text-[10px] italic text-text-muted">
                Source : Bilan projet Dupont — clôturé sept. 2024
              </p>
              <div className="mt-2">
                <span className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                  📄 Voir le dossier complet
                </span>
              </div>
            </ChatBubble>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
