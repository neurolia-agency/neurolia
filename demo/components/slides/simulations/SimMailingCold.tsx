"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { StatusBadge } from "@/components/ui/simulation/StatusBadge";
import { TypingText } from "@/components/ui/simulation/TypingText";
import { TimelineStep } from "@/components/ui/simulation/TimelineStep";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

export function SimMailingCold() {
  const delays = useMemo(() => [0.5, 2.0, 2.0, 2.0, 2.5, 2.0], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide
      label="Cold Mailing"
      title="Une campagne ciblée en 2 minutes"
      device="desktop"
      deviceTitle="Neurolia — Cold Mailing IA"
    >
      <div className="space-y-2.5">
        <AnimatePresence>
          {/* Step 1: Targeting form */}
          {count >= 1 && (
            <motion.div
              key="targeting"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-3"
            >
              <p className="mb-2 text-xs font-medium text-text-primary">
                Ciblage campagne
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-text-muted w-16">Secteur</span>
                  <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-medium text-blue-400">
                    Restaurants Aveyron
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-text-muted w-16">Taille</span>
                  <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] font-medium text-purple-400">
                    10-50 salariés
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-text-muted w-16">Rôle</span>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                    Dirigeant
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Extraction */}
          {count >= 2 && (
            <motion.div
              key="extraction"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-text-primary">
                  127 contacts trouvés
                </span>
                <div className="h-1.5 w-24 rounded-full bg-[var(--surface-card)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
              <div className="flex gap-1.5">
                <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] text-blue-400">LinkedIn</span>
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] text-amber-400">Societe.com</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400">Pages Jaunes</span>
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact list */}
          {count >= 3 && (
            <motion.div
              key="contacts"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              {[
                { name: "Pierre Lacombe", company: "Le Cantou", email: "p.lacombe@lecantou.fr" },
                { name: "Marie Fabre", company: "Brasserie du Marché", email: "m.fabre@brasserie.fr" },
                { name: "Jean Rouquier", company: "L’Auberge Aveyronnaise", email: "j.rouquier@auberge.fr" },
                { name: "Claire Delmas", company: "Bistrot des Halles", email: "c.delmas@bistrot.fr" },
              ].map((c) => (
                <div
                  key={c.email}
                  className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-1.5"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-text-primary truncate">
                      {c.name} — {c.company}
                    </p>
                    <p className="text-[10px] text-text-muted truncate">{c.email}</p>
                  </div>
                  <StatusBadge variant="success">Vérifié ✓</StatusBadge>
                </div>
              ))}
            </motion.div>
          )}

          {/* Step 4: Email template */}
          {count >= 4 && (
            <motion.div
              key="template"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-3"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-medium text-text-primary">
                  Objet : Automatisez votre restaurant...
                </p>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                  Personnalisé par IA
                </span>
              </div>
              <div className="text-[11px] text-text-muted">
                <TypingText
                  text="Bonjour Pierre, en tant que dirigeant du Cantou, vous perdez probablement du temps sur la gestion de vos réservations et commandes..."
                  speed={25}
                />
              </div>
            </motion.div>
          )}

          {/* Step 5: Follow-up sequence */}
          {count >= 5 && (
            <motion.div
              key="sequence"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 space-y-1.5"
            >
              <p className="text-[10px] font-medium text-text-muted">Séquence de relance :</p>
              <TimelineStep status="done">J+0 — Email initial envoyé</TimelineStep>
              <TimelineStep status="active">J+3 — Relance personnalisée</TimelineStep>
              <TimelineStep status="pending">J+7 — Dernier rappel + offre</TimelineStep>
            </motion.div>
          )}

          {/* Step 6: Metrics */}
          {count >= 6 && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-4 gap-2"
            >
              {[
                { value: "127", label: "Envoyés" },
                { value: "43%", label: "Ouverture" },
                { value: "12%", label: "Réponse" },
                { value: "8", label: "RDV décrochés" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] p-2 text-center"
                >
                  <p className="text-sm font-bold text-primary">{m.value}</p>
                  <p className="text-[9px] text-text-muted">{m.label}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
