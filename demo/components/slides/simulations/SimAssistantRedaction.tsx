"use client";

import { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { ChatBubble } from "@/components/ui/simulation/ChatBubble";
import { TypingText } from "@/components/ui/simulation/TypingText";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimAssistantRedaction() {
  const delays = useMemo(() => [0.5, 1.0, 2.5, 1.5, 1.5, 1.0], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Rédaction & envoi"
      title="Dictez, l’IA rédige et envoie"
      device="phone"
      deviceTitle="WhatsApp — Assistant IA"
    >
      <div className="space-y-2">
        <AnimatePresence>
          {/* 1: User dictates */}
          {count >= 1 && (
            <ChatBubble key="u1" role="user">
              Envoie un email à Dupont pour confirmer le chantier de lundi, 8h sur site, prévoir les plans modifiés
            </ChatBubble>
          )}

          {/* 2: Bot typing */}
          {count >= 2 && count < 3 && (
            <ChatBubble key="bt1" role="bot" typing />
          )}

          {/* 3: Draft */}
          {count >= 3 && (
            <ChatBubble key="b1" role="bot">
              <p className="mb-1.5">Voici le brouillon :</p>
              <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
                <p className="text-[10px] font-medium text-text-primary mb-0.5">
                  Objet : Confirmation chantier — Lundi 8h
                </p>
                <div className="text-[10px] text-text-muted">
                  <TypingText
                    text="Bonjour M. Dupont, je vous confirme le démarrage du chantier prévu lundi à 8h sur site. Merci de prévoir les plans modifiés. Cordialement."
                    speed={25}
                  />
                </div>
              </div>
            </ChatBubble>
          )}

          {/* 4: Bot asks confirmation */}
          {count >= 4 && (
            <ChatBubble key="b2" role="bot">
              <p className="text-[11px]">
                Destinataire : m.dupont@entreprise.fr — Envoyer ?
              </p>
              <div className="mt-2 flex gap-2">
                <span className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                  Envoyer ✓
                </span>
                <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[10px] text-text-muted">
                  Modifier
                </span>
              </div>
            </ChatBubble>
          )}

          {/* 5: User confirms */}
          {count >= 5 && (
            <ChatBubble key="u2" role="user">
              Envoyer
            </ChatBubble>
          )}

          {/* 6: Confirmed */}
          {count >= 6 && (
            <ChatBubble key="b3" role="bot">
              <p>✓ Email envoyé à M. Dupont</p>
              <p className="mt-1 text-[10px] text-text-muted">
                Rappel ajouté : Lundi 8h — Chantier Dupont
              </p>
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
