"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    slug: "reseaux-sociaux",
    name: "Réseaux sociaux",
    tagline: "Publiez sans effort, partout",
    icon: "📱",
  },
  {
    slug: "mailing",
    name: "Mailing",
    tagline: "Des emails qui arrivent et convertissent",
    icon: "✉️",
  },
  {
    slug: "assistants",
    name: "Assistants quotidiens",
    tagline: "Un assistant IA qui agit pour vous",
    icon: "🧠",
  },
  {
    slug: "chatbot",
    name: "Chatbot",
    tagline: "Répondez 24/7 intelligemment",
    icon: "💬",
  },
  {
    slug: "devis-facturation",
    name: "Devis & Facturation",
    tagline: "Du devis au paiement en 30 secondes",
    icon: "📄",
  },
];

export default function MenuPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg px-6 py-16">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary opacity-[0.06] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-primary opacity-[0.04] blur-[150px]" />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-4"
      >
        <Image
          src="/neurolia/logo_neurolia_light.svg"
          alt="Neurolia"
          width={180}
          height={40}
          priority
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 mb-2 font-display text-4xl font-bold text-text-primary md:text-5xl"
      >
        Nos services d&apos;automatisation
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 mb-14 text-lg text-text-muted"
      >
        Sélectionnez une démo
      </motion.p>

      {/* Service grid */}
      <div className="relative z-10 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
          >
            <Link
              href={`/${service.slug}`}
              className="group flex flex-col items-center rounded-lg border border-[var(--border)] bg-surface-card p-8 text-center transition-all duration-300 hover:border-primary/40 hover:bg-surface"
            >
              <span className="mb-4 text-4xl">{service.icon}</span>
              <h2 className="mb-2 text-xl font-bold text-text-primary transition-colors group-hover:text-primary">
                {service.name}
              </h2>
              <p className="text-sm text-text-muted">{service.tagline}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 mt-14 text-sm text-text-muted"
      >
        Navigation clavier : flèches ← → pour les slides, Esc pour revenir ici
      </motion.p>
    </div>
  );
}
