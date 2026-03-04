"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { ChatBubble } from "@/components/ui/simulation/ChatBubble";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimChatbotFaq() {
  const delays = useMemo(
    () => [0.3, 0.7, 1.5, 1.0, 2.0, 1.5, 0.8, 2.0, 1.5],
    []
  );
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="FAQ intelligente"
      title="Vos clients trouvent la réponse en 10 secondes"
      device="desktop"
      deviceTitle="www.cabinet-renaud-architectes.fr"
    >
      <div className="relative">
        {/* Fake website background */}
        <AnimatePresence>
          {count >= 1 && (
            <motion.div
              key="bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-3"
            >
              <div className="flex items-center justify-between rounded-t-lg border-b border-[var(--border)] bg-[var(--surface-card)] px-4 py-2">
                <span className="text-xs font-bold text-primary">Renaud Architectes</span>
                <div className="flex gap-3 text-xs text-text-muted">
                  <span>Projets</span>
                  <span>Extensions</span>
                  <span>Contact</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat widget */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] p-3">
          <div className="space-y-2">
            <AnimatePresence>
              {/* 2: Bot greeting */}
              {count >= 2 && (
                <ChatBubble key="b0" role="bot">
                  Bonjour ! Je connais tous nos projets et tarifs. Posez-moi votre question 😊
                </ChatBubble>
              )}

              {/* 3: User question 1 */}
              {count >= 3 && (
                <ChatBubble key="v1" role="user">
                  Quels sont vos délais pour une extension ?
                </ChatBubble>
              )}

              {/* 4: Bot typing */}
              {count >= 4 && count < 5 && (
                <ChatBubble key="bt1" role="bot" typing />
              )}

              {/* 5: Bot RAG response */}
              {count >= 5 && (
                <ChatBubble key="b1" role="bot">
                  <p>
                    Pour une extension standard, comptez{" "}
                    <span className="font-semibold text-primary">4 à 6 mois</span>{" "}
                    du permis à la livraison.
                  </p>
                  <div className="mt-1.5 space-y-0.5 text-[10px]">
                    <p>① Étude : 2-3 semaines</p>
                    <p>② Permis : 2-3 mois</p>
                    <p>③ Travaux : 3-4 mois</p>
                  </div>
                  <p className="mt-1.5 text-[10px] italic text-text-muted">
                    Source : Documentation projets 2025
                  </p>
                </ChatBubble>
              )}

              {/* 6: User question 2 */}
              {count >= 6 && (
                <ChatBubble key="v2" role="user">
                  Et pour une surélévation ?
                </ChatBubble>
              )}

              {/* 7: Bot typing */}
              {count >= 7 && count < 8 && (
                <ChatBubble key="bt2" role="bot" typing />
              )}

              {/* 8: Bot response 2 */}
              {count >= 8 && (
                <ChatBubble key="b2" role="bot">
                  <p>
                    La surélévation demande{" "}
                    <span className="font-semibold text-primary">6 à 9 mois</span>{" "}
                    car elle nécessite une étude structurelle approfondie.
                  </p>
                  <p className="mt-1 text-[10px] italic text-text-muted">
                    Source : Cahier technique 2025
                  </p>
                  <div className="mt-2">
                    <span className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                      📅 Prendre RDV pour en discuter
                    </span>
                  </div>
                </ChatBubble>
              )}

              {/* 9: Stats */}
              {count >= 9 && (
                <motion.div key="stats" className="pt-1">
                  <StatusBadge variant="active">
                    FAQ enrichie — 847 questions répondues ce mois
                  </StatusBadge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SimulationSlide>
  );
}
