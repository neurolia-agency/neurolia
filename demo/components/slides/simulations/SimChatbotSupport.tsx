"use client";

import { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { ChatBubble } from "@/components/ui/simulation/ChatBubble";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimChatbotSupport() {
  const delays = useMemo(
    () => [0.5, 1.2, 1.0, 2.0, 1.5, 1.0, 2.0, 1.5, 1.0],
    []
  );
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Support technique N1"
      title="23h, un client a un problème. Le bot résout."
      device="phone"
      deviceTitle="Support — MonSite.fr"
    >
      <div className="space-y-2">
        <AnimatePresence>
          {/* 1: Bot greeting */}
          {count >= 1 && (
            <ChatBubble key="b0" role="bot">
              Bonjour ! Décrivez votre problème et je vais vous aider.
            </ChatBubble>
          )}

          {/* 2: User describes problem */}
          {count >= 2 && (
            <ChatBubble key="u1" role="user">
              Je n&apos;arrive plus à me connecter à mon compte
            </ChatBubble>
          )}

          {/* 3: Bot typing */}
          {count >= 3 && count < 4 && (
            <ChatBubble key="bt1" role="bot" typing />
          )}

          {/* 4: Bot diagnostic with choices */}
          {count >= 4 && (
            <ChatBubble key="b1" role="bot">
              <p>Je vais vous guider. Quel message d&apos;erreur voyez-vous ?</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                  Mot de passe incorrect
                </span>
                <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[10px] text-text-muted">
                  Page blanche
                </span>
                <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[10px] text-text-muted">
                  Autre
                </span>
              </div>
            </ChatBubble>
          )}

          {/* 5: User selects */}
          {count >= 5 && (
            <ChatBubble key="u2" role="user">
              Mot de passe incorrect
            </ChatBubble>
          )}

          {/* 6: Bot typing */}
          {count >= 6 && count < 7 && (
            <ChatBubble key="bt2" role="bot" typing />
          )}

          {/* 7: Bot resolves */}
          {count >= 7 && (
            <ChatBubble key="b2" role="bot">
              <p>
                ✓ Lien de réinitialisation envoyé à{" "}
                <span className="font-medium text-primary">m***@email.fr</span>
              </p>
              <p className="mt-1 text-[10px] text-text-muted">
                Vérifiez vos spams si besoin. Le lien expire dans 24h.
              </p>
            </ChatBubble>
          )}

          {/* 8: User confirms */}
          {count >= 8 && (
            <ChatBubble key="u3" role="user">
              Ça marche, merci !
            </ChatBubble>
          )}

          {/* 9: Bot closes + status */}
          {count >= 9 && (
            <ChatBubble key="b3" role="bot">
              <p>Parfait ! 😊 Problème résolu en 45 secondes.</p>
              <div className="mt-2">
                <StatusBadge variant="success">Résolu ✓</StatusBadge>
              </div>
              <p className="mt-1 text-[10px] text-text-muted">
                Sans intervention humaine
              </p>
            </ChatBubble>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
