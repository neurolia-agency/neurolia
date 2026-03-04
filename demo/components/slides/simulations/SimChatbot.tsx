"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { ChatBubble } from "@/components/ui/simulation/ChatBubble";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { NotificationToast } from "@/components/ui/simulation/NotificationToast";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimChatbot() {
  const delays = useMemo(
    () => [0.3, 0.7, 1.2, 0.8, 1.5, 1.2, 0.8, 1.5, 1.2, 1.5],
    []
  );
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Qualification de leads"
      title="23h dimanche, un visiteur pose une question"
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
                <span className="text-xs font-bold text-primary">
                  Renaud Architectes
                </span>
                <div className="flex gap-3 text-xs text-text-muted">
                  <span>Projets</span>
                  <span>Extensions</span>
                  <span>Contact</span>
                </div>
              </div>
              <div className="rounded-b-lg bg-[var(--surface)] px-4 py-3">
                <p className="mb-1 text-sm font-semibold text-text-primary">
                  Extensions & surélévations
                </p>
                <p className="text-xs text-text-muted">
                  Agrandissez votre espace de vie avec un projet sur mesure...
                </p>
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
                  Bonjour ! Je suis l&apos;assistant du cabinet Renaud. Comment
                  puis-je vous aider ?
                </ChatBubble>
              )}

              {/* 3: Visitor question */}
              {count >= 3 && (
                <ChatBubble key="v1" role="user">
                  Combien coûte une extension de 30m² ?
                </ChatBubble>
              )}

              {/* 4: Bot typing */}
              {count >= 4 && count < 5 && (
                <ChatBubble key="bt1" role="bot" typing />
              )}

              {/* 5: Bot RAG response with prices */}
              {count >= 5 && (
                <ChatBubble key="b1" role="bot">
                  <p>
                    Pour une extension de 30m², comptez entre{" "}
                    <span className="font-semibold text-primary">
                      45 000€ et 75 000€
                    </span>{" "}
                    selon les finitions et la complexité structurelle.
                  </p>
                  <p className="mt-1 text-[10px] italic text-text-muted">
                    Source : grille tarifaire Cabinet Renaud 2025
                  </p>
                </ChatBubble>
              )}

              {/* 6: Visitor gives context */}
              {count >= 6 && (
                <ChatBubble key="v2" role="user">
                  Budget autour de 60k, à Rodez
                </ChatBubble>
              )}

              {/* 7: Bot typing */}
              {count >= 7 && count < 8 && (
                <ChatBubble key="bt2" role="bot" typing />
              )}

              {/* 8: Bot proposes RDV */}
              {count >= 8 && (
                <ChatBubble key="b2" role="bot">
                  <p>
                    C&apos;est tout à fait réalisable ! Souhaitez-vous réserver
                    un créneau de consultation gratuite ?
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                      Jeu. 10h
                    </span>
                    <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[10px] text-text-muted">
                      Ven. 14h
                    </span>
                  </div>
                </ChatBubble>
              )}

              {/* 9: Visitor books */}
              {count >= 9 && (
                <ChatBubble key="v3" role="user">
                  Jeudi 10h, parfait
                </ChatBubble>
              )}

              {/* 10: Pro notification */}
              {count >= 10 && (
                <motion.div key="notif-wrap" className="space-y-2">
                  <ChatBubble role="bot">
                    <p>
                      ✓ RDV confirmé jeudi 10h. Vous recevrez un email de
                      confirmation. À bientôt !
                    </p>
                    <div className="mt-2">
                      <StatusBadge variant="active">
                        Lead qualifié ⭐⭐⭐
                      </StatusBadge>
                    </div>
                  </ChatBubble>
                  <NotificationToast>
                    <p className="text-xs font-medium">
                      🔔 Nouveau lead — Lundi 8h
                    </p>
                    <p className="mt-0.5 text-[10px] text-text-muted">
                      Extension 30m² · Budget 60k · Rodez · RDV Jeu. 10h
                    </p>
                  </NotificationToast>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SimulationSlide>
  );
}
