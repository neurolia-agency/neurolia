'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * ABOUT HERO - Traitement typographique premium
 *
 * Concept : Composition asymétrique cinématique
 * - Chaque ligne du titre a son propre traitement
 * - Contraste weight extrême (light vs black)
 * - Accents terracotta sur ponctuation
 * - Révélation staggered théâtrale
 */

// Animation variants
const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const lineVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOutExpo,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
}

export default function AboutHero() {
  return (
    <section className="relative h-[calc(100vh-5rem)] flex flex-col overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/team/bureaux.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Overlay sombre avec gradient asymétrique */}
        <div className="absolute inset-0 bg-[#050810]/70" />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(5,8,16,0.95) 0%, rgba(5,8,16,0.6) 50%, rgba(5,8,16,0.4) 100%)',
          }}
        />
      </div>

      {/* Ligne horizontale terracotta en haut - asymétrique */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] bg-[#C45C3B]"
        initial={{ width: 0 }}
        animate={{ width: '25vw' }}
        transition={{ duration: 1.2, delay: 0.1, ease: easeOutExpo }}
      />

      {/* Contenu principal */}
      <div className="relative flex-1 flex items-center container max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <motion.div
          className="max-w-5xl ml-auto text-right"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Label supérieur - aligné à droite */}
          <motion.div
            className="mb-6 -mr-1"
            variants={fadeUpVariants}
          >
            <span
              className="inline-flex items-center gap-4 text-[11px] font-medium tracking-[0.35em] uppercase"
              style={{ color: '#737373' }}
            >
              À propos de Neurolia
              <span
                className="w-12 h-px"
                style={{ backgroundColor: '#C45C3B' }}
              />
            </span>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════
              TITRE PRINCIPAL - Composition typographique asymétrique
              Chaque ligne a son propre traitement
              ═══════════════════════════════════════════════════════════ */}
          <h1 className="mb-6">
            {/* Ligne 1 : "Votre" - Light weight */}
            <motion.span
              className="block text-[clamp(1.25rem,3vw,2rem)] leading-[1] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-hero, 'Lexend', sans-serif)",
                fontWeight: 300,
                color: '#9A9A9A',
              }}
              variants={lineVariants}
            >
              Votre
            </motion.span>

            {/* Ligne 2 : "croissance" - Black weight, léger décalage gauche */}
            <motion.span
              className="block text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.9] tracking-[-0.03em] mr-[2vw] md:mr-[4vw]"
              style={{
                fontFamily: "var(--font-hero, 'Lexend', sans-serif)",
                fontWeight: 900,
                color: '#F5F5F5',
              }}
              variants={lineVariants}
            >
              croissance
            </motion.span>

            {/* Ligne 3 : "digitale," - même taille, retour aligné */}
            <motion.span
              className="block text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.9] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-hero, 'Lexend', sans-serif)",
                fontWeight: 900,
                color: '#F5F5F5',
              }}
              variants={lineVariants}
            >
              digitale
              <span style={{ color: '#C45C3B' }}>,</span>
            </motion.span>

            {/* Ligne 4 : "notre métier." - Light + Bold combo */}
            <motion.span
              className="relative inline-block text-[clamp(1.25rem,3vw,2rem)] leading-[1] tracking-[-0.02em] mt-2"
              variants={lineVariants}
            >
              <span
                style={{
                  fontFamily: "var(--font-hero, 'Lexend', sans-serif)",
                  fontWeight: 300,
                  color: '#9A9A9A',
                }}
              >
                notre{' '}
              </span>
              <span
                className="relative"
                style={{
                  fontFamily: "var(--font-hero, 'Lexend', sans-serif)",
                  fontWeight: 900,
                  color: '#F5F5F5',
                }}
              >
                métier
                <span style={{ color: '#C45C3B' }}>.</span>
                {/* Soulignement terracotta animé */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px]"
                  style={{ backgroundColor: '#C45C3B' }}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 1.4, ease: easeOutExpo }}
                />
              </span>
            </motion.span>
          </h1>

          {/* ═══════════════════════════════════════════════════════════
              BASELINE - avec barre signature et positionnement premium
              ═══════════════════════════════════════════════════════════ */}
          <motion.div
            className="relative pr-6 border-r-[3px] border-[#C45C3B] max-w-xl mt-6 ml-auto"
            variants={fadeUpVariants}
          >
            <p
              className="text-base md:text-lg leading-[1.8]"
              style={{ color: '#A3A3A3' }}
            >
              Donner un maximum de{' '}
              <span style={{ color: '#D4D4D4' }}>leviers</span>
              {' '}aux entrepreneurs pour gagner du temps, gagner en visibilité et{' '}
              <span style={{ color: '#D4D4D4' }}>convertir plus</span>.
            </p>
          </motion.div>

          {/* Stats rapides - disposition asymétrique avec décalages */}
          <motion.div
            className="flex flex-wrap gap-10 md:gap-14 mt-10 justify-end"
            variants={fadeUpVariants}
          >
            <div className="relative">
              <span
                className="block text-2xl md:text-3xl font-bold tracking-tight"
                style={{ color: '#C45C3B' }}
              >
                5+
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.15em] mt-1 block"
                style={{ color: '#737373' }}
              >
                Années d'expertise
              </span>
            </div>

            <div className="relative">
              <span
                className="block text-2xl md:text-3xl font-bold tracking-tight"
                style={{ color: '#F5F5F5' }}
              >
                100%
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.15em] mt-1 block"
                style={{ color: '#737373' }}
              >
                Clients satisfaits
              </span>
            </div>

            <div className="relative">
              <span
                className="block text-2xl md:text-3xl font-bold tracking-tight"
                style={{ color: '#D4D4D4' }}
              >
                ROI
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.15em] mt-1 block"
                style={{ color: '#737373' }}
              >
                Focus résultats
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - centré en bas */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8, ease: 'easeOut' }}
      >
        <span
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: '#525252' }}
        >
          Découvrir
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" style={{ color: '#C45C3B' }} />
        </motion.div>
      </motion.div>

      {/* Accent corner - bas droite */}
      <div
        className="absolute bottom-0 right-0 w-24 h-[3px]"
        style={{ backgroundColor: '#C45C3B' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[3px] h-24"
        style={{ backgroundColor: '#C45C3B' }}
      />
    </section>
  )
}
