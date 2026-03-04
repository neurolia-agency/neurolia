"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { ChatBubble } from "@/components/ui/simulation/ChatBubble";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimAssistants() {
  const delays = useMemo(
    () => [0.8, 0.8, 1.2, 1.4, 0.8, 1.2, 1.4, 0.8, 1.5, 0.8, 0.8, 1.2],
    []
  );
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Briefing matinal"
      title="8h02, votre matinée est déjà organisée"
      device="phone"
      deviceTitle="WhatsApp — Assistant IA"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* 1: Morning briefing request */}
          {count >= 1 && (
            <ChatBubble key="u1" role="user">
              Résume-moi ma journée
            </ChatBubble>
          )}

          {/* 2: Bot typing */}
          {count >= 2 && count < 3 && (
            <ChatBubble key="bt1" role="bot" typing />
          )}

          {/* 3: Structured morning briefing */}
          {count >= 3 && (
            <ChatBubble key="b1" role="bot">
              <p className="mb-1.5 font-medium">📋 Briefing du jour :</p>
              <div className="space-y-1 text-xs">
                <p className="font-medium text-text-primary">3 RDV</p>
                <ul className="space-y-0.5 text-text-muted">
                  <li>🕘 09h — Call équipe</li>
                  <li>🕙 10h — Présentation client Dupont</li>
                  <li>🕝 14h — Review projet Martin</li>
                </ul>
                <p className="mt-1.5 font-medium text-text-primary">
                  2 emails urgents
                </p>
                <ul className="space-y-0.5 text-text-muted">
                  <li>📧 Dupont — validation devis en attente</li>
                  <li>📧 Fournisseur — retard livraison</li>
                </ul>
                <div className="mt-1.5 rounded-md bg-amber-500/10 px-2 py-1">
                  <p className="text-amber-400">
                    ⚠️ Facture #247 — 3 200€ impayée (15 jours)
                  </p>
                </div>
              </div>
            </ChatBubble>
          )}

          {/* 4: User action - respond to email */}
          {count >= 4 && (
            <ChatBubble key="u2" role="user">
              Réponds à Dupont que le devis est valide, on démarre lundi
            </ChatBubble>
          )}

          {/* 5: Bot typing */}
          {count >= 5 && count < 6 && (
            <ChatBubble key="bt2" role="bot" typing />
          )}

          {/* 6: Confirmation */}
          {count >= 6 && (
            <ChatBubble key="b2" role="bot">
              <p>✓ Email envoyé à m.dupont@entreprise.fr</p>
              <p className="mt-0.5 text-[10px] text-text-muted">
                &quot;Bonjour M. Dupont, nous confirmons la validation de votre
                devis. Le démarrage est prévu lundi...&quot;
              </p>
            </ChatBubble>
          )}

          {/* 7: User action - reschedule */}
          {count >= 7 && (
            <ChatBubble key="u3" role="user">
              Décale mon RDV de 14h à 16h et préviens Martin
            </ChatBubble>
          )}

          {/* 8: Bot typing */}
          {count >= 8 && count < 9 && (
            <ChatBubble key="bt3" role="bot" typing />
          )}

          {/* 9: Reschedule confirmed */}
          {count >= 9 && (
            <ChatBubble key="b3" role="bot">
              <p>✓ RDV déplacé à 16h</p>
              <p className="text-[10px] text-text-muted">
                Email envoyé à martin@projet.fr pour l&apos;informer du
                changement
              </p>
            </ChatBubble>
          )}

          {/* 10: PROACTIVE alert from bot */}
          {count >= 10 && (
            <motion.div
              key="proactive"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
            >
              <ChatBubble role="bot">
                <div className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5">
                  <p className="text-xs font-medium text-amber-400">
                    ⚠️ Rappel automatique
                  </p>
                  <p className="mt-0.5 text-[11px] text-text-muted">
                    Facture #247 — 3 200€ impayée depuis 15 jours. Relancer le
                    client ?
                  </p>
                </div>
              </ChatBubble>
            </motion.div>
          )}

          {/* 11: User approves */}
          {count >= 11 && (
            <ChatBubble key="u4" role="user">
              Oui, relance
            </ChatBubble>
          )}

          {/* 12: Relance sent */}
          {count >= 12 && (
            <ChatBubble key="b4" role="bot">
              <p>
                ✓ Email de relance envoyé à facturation@client.fr
              </p>
              <p className="mt-0.5 text-[10px] text-text-muted">
                Rappel poli avec détails de la facture et lien de paiement joint
              </p>
            </ChatBubble>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
