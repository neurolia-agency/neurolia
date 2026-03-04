"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { TypingText } from "@/components/ui/simulation/TypingText";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";

const emails = [
  {
    from: "Marie Dupont",
    subject: "Demande de devis site web",
    initials: "MD",
    category: "Client",
    catColor: "bg-emerald-500/20 text-emerald-400",
  },
  {
    from: "Compta XYZ",
    subject: "Facture #2025-341 — Échéance",
    initials: "CX",
    category: "Facturation",
    catColor: "bg-amber-500/20 text-amber-400",
  },
  {
    from: "Studio Photo",
    subject: "Proposition partenariat shooting",
    initials: "SP",
    category: "Partenariat",
    catColor: "bg-purple-500/20 text-purple-400",
  },
  {
    from: "Marketing Boost",
    subject: "Multipliez vos leads x10 !!!",
    initials: "MB",
    category: "Spam",
    catColor: "bg-neutral-500/20 text-neutral-400",
  },
  {
    from: "Lucas Martin",
    subject: "Mon site est en panne !!",
    initials: "LM",
    category: "URGENT",
    catColor: "bg-red-500/20 text-red-400",
  },
  {
    from: "Sophie Renard",
    subject: "Candidature — Dev web fullstack",
    initials: "SR",
    category: "Recrutement",
    catColor: "bg-blue-500/20 text-blue-400",
  },
];

const sortedEmails = [emails[4], emails[0], emails[1], emails[2], emails[5], emails[3]];

function EmailRow({
  email,
  classified,
  dimmed,
  highlighted,
}: {
  email: (typeof emails)[0];
  classified: boolean;
  dimmed?: boolean;
  highlighted?: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{
        opacity: dimmed ? 0.25 : 1,
        y: 0,
      }}
      transition={{ duration: 0.3 }}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 transition-colors ${
        highlighted
          ? "border border-red-500/40 bg-red-500/5"
          : "border border-transparent"
      }`}
    >
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--surface-card)] text-[10px] font-bold text-text-muted">
        {email.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-xs font-medium ${dimmed ? "text-text-muted line-through" : "text-text-primary"}`}
        >
          {email.from}
        </p>
        <p
          className={`truncate text-[11px] ${dimmed ? "text-text-muted/50 line-through" : "text-text-muted"}`}
        >
          {email.subject}
        </p>
      </div>
      {classified && (
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${email.catColor}`}
        >
          {email.category}
        </motion.span>
      )}
    </motion.div>
  );
}

export function SimMailing() {
  const delays = useMemo(() => [0.5, 3.0, 3.0, 1.5, 5.0, 3.0], []);
  const count = useSimulationTimeline(delays, true);

  const showInbox = count >= 1 && count < 4;
  const showDetail = count >= 4 && count < 6;
  const showMetrics = count >= 6;

  return (
    <SimulationSlide
      label="Tri & brouillons"
      title="6 emails, triés en 12 secondes"
      device="desktop"
      deviceTitle="Gmail — Tri IA automatisé"
    >
      <AnimatePresence mode="wait">
        {/* ── INBOX VIEW (Steps 1-3) ── */}
        {showInbox && (
          <motion.div
            key="inbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-0.5"
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-text-primary">
                Boîte de réception
              </span>
              <span className="text-[10px] text-text-muted">
                {count >= 3 ? "5 catégories détectées" : "6 non lus"}
              </span>
            </div>

            {(count >= 3 ? sortedEmails : emails).map((email) => (
              <EmailRow
                key={email.initials}
                email={email}
                classified={count >= 2}
                dimmed={count >= 3 && email.category === "Spam"}
                highlighted={count >= 3 && email.category === "URGENT"}
              />
            ))}

            {count >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2"
              >
                <span className="text-[11px] text-emerald-400">
                  ✓ Spam filtré · URGENT priorisé · 5 brouillons en cours...
                </span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ── DETAIL VIEW (Steps 4-5) ── */}
        {showDetail && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {/* Email header */}
            <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-medium text-red-400">
                    URGENT
                  </span>
                  <span className="text-xs font-medium text-text-primary">
                    Lucas Martin
                  </span>
                </div>
                <span className="text-[10px] text-text-muted">23:47</span>
              </div>
              <p className="text-sm font-medium text-text-primary">
                Mon site est en panne !!
              </p>
              <p className="mt-1 text-xs text-text-muted">
                Bonsoir, mon site ne répond plus depuis hier soir. C&apos;est
                critique, j&apos;ai des commandes en cours...
              </p>
            </div>

            {/* AI Draft */}
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-3">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <span className="text-[10px] font-medium text-primary">
                  Agent URGENT — Brouillon
                </span>
              </div>
              <TypingText
                text="Bonjour Lucas, je prends note de l'urgence. Notre équipe technique a été alertée et examine le problème en priorité. Pourriez-vous préciser depuis quand exactement le site ne répond plus ?"
                speed={25}
              />
            </div>

            {/* Step 5: Other drafts ready */}
            {count >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1"
              >
                <p className="mb-1 px-1 text-[10px] font-medium text-text-muted">
                  Autres brouillons générés :
                </p>
                {[
                  { label: "Client — Marie Dupont", color: "text-emerald-400" },
                  { label: "Facturation — Compta XYZ", color: "text-amber-400" },
                  {
                    label: "Partenariat — Studio Photo",
                    color: "text-purple-400",
                  },
                  {
                    label: "Recrutement — Sophie Renard",
                    color: "text-blue-400",
                  },
                ].map((d) => (
                  <div key={d.label} className="flex items-center gap-2 px-1">
                    <span className={`text-[10px] ${d.color}`}>✓</span>
                    <span className="text-[11px] text-text-muted">
                      {d.label}
                    </span>
                    <span className="ml-auto text-[10px] text-emerald-400/70">
                      Brouillon prêt
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ── METRICS VIEW (Step 6) ── */}
        {showMetrics && (
          <motion.div
            key="metrics"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div className="mb-4 text-center">
              <p className="mb-1 text-sm font-semibold text-text-primary">
                Traitement terminé
              </p>
              <p className="text-xs text-text-muted">
                Lundi 8:02 — Inbox triée en ~12 secondes
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "6", label: "Emails traités", icon: "📨" },
                { value: "1", label: "Spam éliminé", icon: "🚫" },
                { value: "5", label: "Brouillons prêts", icon: "✍️" },
                { value: "~25 min", label: "Temps gagné", icon: "⏱️" },
              ].map((m) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] p-3 text-center"
                >
                  <span className="text-lg">{m.icon}</span>
                  <p className="mt-1 text-lg font-bold text-primary">
                    {m.value}
                  </p>
                  <p className="text-[10px] text-text-muted">{m.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-center">
              <p className="text-[11px] text-text-muted">
                8 catégories · 7 agents spécialisés · Mémoire par conversation
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SimulationSlide>
  );
}
