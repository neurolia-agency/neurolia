"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

/**
 * CONTACT FAQ - "THE REASSURANCE"
 *
 * Direction: Answers the final objections before commitment.
 * Accordion-style, clean and minimal, same visual DNA.
 * Closes with a final CTA to bring them back to the form.
 */

const faqs = [
  {
    question:
      "Qu'est-ce qui est inclus concrètement dans l'analyse gratuite ?",
    answer:
      "Ce n'est pas un simple appel commercial. Nous analysons votre présence actuelle (ou votre projet) et nous vous livrons un plan d'action vidéo avec des pistes d'amélioration immédiates. C'est 100\u00a0% offert et sans engagement.",
  },
  {
    question:
      "Combien de temps faut-il pour mettre en place mon écosystème ?",
    answer:
      "Nous sommes rapides. Comptez 2 à 4 semaines pour un site vitrine stratégique complet, et environ 1 semaine pour la mise en place d'automatisations IA. Nous validons le calendrier précis avec vous dès le début.",
  },
  {
    question:
      "Une fois le site livré, est-ce que je suis propriétaire à 100\u00a0% ?",
    answer:
      "OUI. Contrairement aux solutions par abonnement (Wix, Shopify) ou certaines agences, tout vous appartient\u00a0: le nom de domaine, le code et le contenu. Vous êtes libre et indépendant.",
  },
  {
    question:
      "Je n'y connais rien en technique, vais-je pouvoir gérer mon site ?",
    answer:
      "Absolument. Nous concevons le site pour qu'il soit simple à utiliser. De plus, nous vous formons à la prise en main et nous vous fournissons des tutoriels vidéo personnalisés pour modifier vos textes ou images en toute autonomie.",
  },
  {
    question: "Proposez-vous des facilités de paiement ?",
    answer:
      "Nous savons que la trésorerie est clé pour une entreprise. C'est pourquoi nous proposons systématiquement un paiement échelonné en 2 ou 3 fois sans frais pour accompagner votre investissement.",
  },
];

function FaqItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="group border-b border-[rgba(245,245,245,0.06)] cursor-pointer hover:bg-[rgba(245,245,245,0.02)] transition-colors duration-300 px-4"
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
    >
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-[#C45C3B] tracking-[-0.02em] shrink-0 w-6 text-right">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-base md:text-lg font-medium text-[#F5F5F5] group-hover:text-[#D4D4D4] transition-colors duration-300">
            {question}
          </span>
        </div>
        <span className="relative w-5 h-5 shrink-0 ml-4">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-px bg-[#C45C3B]" />
          <span
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-px bg-[#C45C3B] transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-90"}`}
          />
        </span>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-10 text-sm md:text-base text-[#A3A3A3] leading-[1.7] max-w-2xl font-light">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#050810" }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(245,245,245,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(245,245,245,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
        aria-hidden="true"
      />

      <div
        ref={containerRef}
        className="px-6 md:px-12 lg:px-20 max-w-[1100px] mx-auto"
      >
        {/* Section header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-[#C45C3B]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C45C3B] font-medium">
              Questions fréquentes
            </span>
            <span className="w-8 h-px bg-[#C45C3B]" />
          </span>
          <h2
            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.02em] leading-[1.0]"
            style={{
              fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
            }}
          >
            <span className="text-[#9A9A9A]">Tout ce que vous devez</span>
            <br />
            <span className="text-[#F5F5F5]">savoir</span>
            <span className="text-[#C45C3B]">.</span>
          </h2>
        </motion.div>

        {/* FAQ items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-[rgba(245,245,245,0.06)]"
        >
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </motion.div>

        {/* Final micro-CTA */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm text-[#737373] tracking-wide">
            Encore des questions ? Parlons-en directement.
          </p>
          <Link
            href="/contact"
            className="cta-outline-btn group inline-flex items-center gap-2.5 px-4 py-2 bg-transparent border border-[#C45C3B] hover:bg-[#C45C3B]"
          >
            <span className="text-xs tracking-[0.1em] uppercase font-medium text-[#C45C3B] group-hover:text-[#050810] transition-colors duration-300">
              Nous contacter
            </span>
            <svg
              className="w-3.5 h-3.5 text-[#C45C3B] group-hover:text-[#050810] transition-all duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="square"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
