"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { ChatBubble } from "@/components/ui/simulation/ChatBubble";
import { NotificationToast } from "@/components/ui/simulation/NotificationToast";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimChatbotProduit() {
  const delays = useMemo(
    () => [0.3, 0.7, 1.5, 1.0, 2.5, 1.5, 1.0, 2.0, 1.5],
    []
  );
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Recommandation produit"
      title="Un conseiller virtuel qui connaît votre catalogue"
      device="desktop"
      deviceTitle="www.boutique-terroir.fr"
    >
      <div className="relative">
        {/* Fake e-commerce header */}
        <AnimatePresence>
          {count >= 1 && (
            <motion.div
              key="bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-3"
            >
              <div className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-2">
                <span className="text-xs font-bold text-primary">Boutique Terroir</span>
                <div className="flex gap-3 text-xs text-text-muted">
                  <span>Coffrets</span>
                  <span>Producteurs</span>
                  <span>🛒</span>
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
                  Bienvenue ! Je peux vous aider à trouver le cadeau parfait 🎁
                </ChatBubble>
              )}

              {/* 3: User request */}
              {count >= 3 && (
                <ChatBubble key="v1" role="user">
                  Je cherche un coffret cadeau autour de 50€
                </ChatBubble>
              )}

              {/* 4: Bot typing */}
              {count >= 4 && count < 5 && (
                <ChatBubble key="bt1" role="bot" typing />
              )}

              {/* 5: Bot product suggestions */}
              {count >= 5 && (
                <ChatBubble key="b1" role="bot">
                  <p className="mb-2">Voici 3 coffrets dans votre budget :</p>
                  <div className="space-y-1.5">
                    {[
                      { name: "Coffret Terroir", price: "45€", rating: "⭐ 4.6" },
                      { name: "Coffret Gourmand", price: "52€", rating: "⭐ 4.8" },
                      { name: "Coffret Prestige", price: "58€", rating: "⭐ 4.9" },
                    ].map((p) => (
                      <div
                        key={p.name}
                        className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5"
                      >
                        <span className="text-[11px] font-medium text-text-primary">{p.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-text-muted">{p.rating}</span>
                          <span className="text-[11px] font-bold text-primary">{p.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ChatBubble>
              )}

              {/* 6: User asks detail */}
              {count >= 6 && (
                <ChatBubble key="v2" role="user">
                  Le Gourmand, c&apos;est quoi dedans ?
                </ChatBubble>
              )}

              {/* 7: Bot typing */}
              {count >= 7 && count < 8 && (
                <ChatBubble key="bt2" role="bot" typing />
              )}

              {/* 8: Bot detail + CTA */}
              {count >= 8 && (
                <ChatBubble key="b2" role="bot">
                  <p className="font-medium text-text-primary mb-1">Coffret Gourmand :</p>
                  <ul className="space-y-0.5 text-[10px] text-text-muted mb-2">
                    <li>• Foie gras de canard 180g</li>
                    <li>• Confiture de figues artisanale</li>
                    <li>• Vin de Marcillac 37.5cl</li>
                    <li>• Sablés aux noix du Périgord</li>
                  </ul>
                  <p className="text-[10px] text-text-muted mb-2">
                    ⭐ 4.8/5 — 127 avis
                  </p>
                  <span className="inline-block rounded-md bg-primary px-3 py-1 text-[10px] font-medium text-white">
                    Ajouter au panier — 52€
                  </span>
                </ChatBubble>
              )}

              {/* 9: Cart notification */}
              {count >= 9 && (
                <motion.div key="cart" className="space-y-2">
                  <NotificationToast>
                    🛒 Ajouté au panier
                  </NotificationToast>
                  <div className="px-1">
                    <StatusBadge variant="active">Vente assistée IA</StatusBadge>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SimulationSlide>
  );
}
