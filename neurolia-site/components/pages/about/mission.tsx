'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * MISSION/VISION - Editorial Monumental
 *
 * Concept : Composition magazine cinématique
 * - Mission traitée comme citation monumentale avec mots-clés en vedette
 * - Vision en bloc décalé asymétrique
 * - Lignes terracotta connectant les deux sections
 * - Révélation staggered théâtrale au scroll
 */

// Animation variants - matching hero style
const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOutExpo,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
}

const lineVariants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1,
      ease: easeOutExpo,
    },
  },
}

const horizontalLineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: easeOutExpo,
    },
  },
}

export default function Mission() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ backgroundColor: '#0A0F1A' }}
    >
      {/* Ligne terracotta verticale gauche - connecteur visuel */}
      <motion.div
        className="absolute left-6 md:left-12 top-0 w-[3px]"
        style={{ backgroundColor: '#C45C3B' }}
        variants={lineVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="h-[40vh]" />
      </motion.div>

      {/* Container principal */}
      <div className="container max-w-7xl mx-auto px-6 lg:px-8">
        {/* ═══════════════════════════════════════════════════════════
            BLOC MISSION - Quote Monumentale
            Traitement cinématique avec mots-clés en vedette
            ═══════════════════════════════════════════════════════════ */}
        <motion.div
          className="relative mb-32 md:mb-48"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Label supérieur */}
          <motion.div
            className="mb-8 md:mb-12"
            variants={fadeUpVariants}
          >
            <span
              className="inline-flex items-center gap-4 text-[11px] font-medium tracking-[0.35em] uppercase"
              style={{ color: '#737373' }}
            >
              <span
                className="w-12 h-px"
                style={{ backgroundColor: '#C45C3B' }}
              />
              Notre Mission
            </span>
          </motion.div>

          {/* Layout deux colonnes - Quote + Description côte à côte */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Colonne gauche : Quote monumentale */}
            <div>
              {/* Ligne 1 : "Donner un maximum de" - H3 Light */}
              <motion.div
                className="mb-2"
                variants={wordVariants}
              >
                <span
                  className="text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.1] tracking-[-0.02em]"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 300,
                    color: '#9A9A9A',
                  }}
                >
                  Donner un maximum de
                </span>
              </motion.div>

              {/* Ligne 2 : "leviers" - H1 Massive, terracotta accent */}
              <motion.div
                className="mb-2"
                variants={wordVariants}
              >
                <span
                  className="text-[clamp(2rem,5vw,3rem)] leading-[1] tracking-[-0.02em]"
                  style={{
                    fontFamily: 'var(--font-hero)',
                    fontWeight: 900,
                    color: '#F5F5F5',
                  }}
                >
                  leviers
                </span>
                <span
                  className="text-[clamp(2rem,5vw,3rem)] leading-[1]"
                  style={{ color: '#C45C3B' }}
                >
                  .
                </span>
              </motion.div>

              {/* Ligne 3 : "aux entrepreneurs pour" - H4 Light */}
              <motion.div
                className="mb-6"
                variants={wordVariants}
              >
                <span
                  className="text-[clamp(1.5rem,3vw,2rem)] leading-[1.1] tracking-[-0.01em]"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 300,
                    color: '#9A9A9A',
                  }}
                >
                  aux entrepreneurs pour
                </span>
              </motion.div>

              {/* Bloc objectifs - 3 pilliers alignés */}
              <motion.div
                className="flex flex-col gap-4"
                variants={fadeUpVariants}
              >
                {/* Pilier 1 - Gagner du temps */}
                <div className="flex items-center gap-4">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C45C3B"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  >
                    {/* Horloge géométrique - cadran carré */}
                    <rect x="3" y="3" width="18" height="18" />
                    {/* Aiguilles angulaires */}
                    <path d="M12 7V12L16 14" />
                  </svg>
                  <span
                    className="text-lg md:text-xl leading-[1.2] tracking-[-0.01em]"
                    style={{
                      fontFamily: 'var(--font-hero)',
                      fontWeight: 600,
                      color: '#D4D4D4',
                    }}
                  >
                    Gagner du temps
                  </span>
                </div>

                {/* Pilier 2 - Gagner en visibilité */}
                <div className="flex items-center gap-4">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C45C3B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Œil - contour arrondi */}
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    {/* Pupille ronde */}
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span
                    className="text-lg md:text-xl leading-[1.2] tracking-[-0.01em]"
                    style={{
                      fontFamily: 'var(--font-hero)',
                      fontWeight: 600,
                      color: '#D4D4D4',
                    }}
                  >
                    Gagner en visibilité
                  </span>
                </div>

                {/* Pilier 3 - Convertir plus */}
                <div className="flex items-center gap-4">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C45C3B"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  >
                    {/* Flèche de croissance diagonale */}
                    <path d="M7 17L17 7" />
                    {/* Tête de flèche angulaire */}
                    <path d="M10 7H17V14" />
                    {/* Base/sol */}
                    <path d="M4 20H20" />
                  </svg>
                  <span
                    className="text-lg md:text-xl leading-[1.2] tracking-[-0.01em]"
                    style={{
                      fontFamily: 'var(--font-hero)',
                      fontWeight: 600,
                      color: '#F5F5F5',
                    }}
                  >
                    Convertir plus
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Colonne droite : Bloc descriptif en carte */}
            <motion.div
              className="lg:pt-8"
              variants={fadeUpVariants}
            >
              <div
                className="p-6 md:p-8"
                style={{
                  backgroundColor: 'rgba(196, 92, 59, 0.05)',
                  border: '1px solid rgba(196, 92, 59, 0.2)',
                }}
              >
                <p
                  className="text-base md:text-lg leading-[1.8]"
                  style={{ color: '#A3A3A3' }}
                >
                  Neurolia conçoit des sites web{' '}
                  <span style={{ color: '#D4D4D4' }}>SEO-first "augmentés"</span>
                  {' '}et déploie des automatisations fiables, côté acquisition comme côté opérationnel.
                </p>
                <p
                  className="mt-4 text-sm leading-[1.7]"
                  style={{ color: '#737373' }}
                >
                  Objectif : transformer votre présence digitale en un système{' '}
                  <span style={{ color: '#A3A3A3' }}>simple, clair et rentable</span>.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
            SÉPARATEUR - Ligne horizontale terracotta
            ═══════════════════════════════════════════════════════════ */}
        <motion.div
          className="relative h-px my-16 md:my-24"
          variants={horizontalLineVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              background: 'linear-gradient(to right, #C45C3B 0%, #C45C3B 30%, transparent 100%)',
            }}
          />
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
            BLOC VISION - Centré et épuré
            ═══════════════════════════════════════════════════════════ */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Layout Vision - Centré */}
          <div className="max-w-3xl mx-auto text-center">
            {/* Label - sans barres pour éviter redondance avec séparateur */}
            <motion.div
              className="mb-8"
              variants={fadeUpVariants}
            >
              <span
                className="text-[11px] font-medium tracking-[0.35em] uppercase"
                style={{ color: '#C45C3B' }}
              >
                Notre Vision
              </span>
            </motion.div>

            {/* Titre Vision */}
            <motion.h2
              className="mb-8"
              variants={wordVariants}
            >
              <span
                className="block text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.1] tracking-[-0.02em] mb-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  color: '#9A9A9A',
                }}
              >
                Devenir le
              </span>
              <span
                className="block text-[clamp(2rem,5vw,3rem)] leading-[1] tracking-[-0.02em]"
                style={{
                  fontFamily: 'var(--font-hero)',
                  fontWeight: 900,
                  color: '#F5F5F5',
                }}
              >
                partenaire de référence
                <span style={{ color: '#C45C3B' }}>.</span>
              </span>
            </motion.h2>

            {/* Description Vision */}
            <motion.p
              className="text-base md:text-lg leading-[1.8] max-w-xl mx-auto"
              style={{ color: '#A3A3A3' }}
              variants={fadeUpVariants}
            >
              Pour les entrepreneurs et PME qui veulent une{' '}
              <span style={{ color: '#D4D4D4' }}>croissance digitale durable</span>,
              sans complexité inutile.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="mt-12 flex justify-center gap-12 md:gap-16"
              variants={fadeUpVariants}
            >
              <div className="text-center">
                <span
                  className="block text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight"
                  style={{ color: '#C45C3B' }}
                >
                  3-5
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.2em] mt-1 block"
                  style={{ color: '#737373' }}
                >
                  Années horizon
                </span>
              </div>

              {/* Séparateur vertical */}
              <div
                className="w-px h-16 self-center"
                style={{ backgroundColor: 'rgba(196, 92, 59, 0.3)' }}
              />

              <div className="text-center">
                <span
                  className="block text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight"
                  style={{ color: '#F5F5F5' }}
                >
                  3
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.2em] mt-1 block"
                  style={{ color: '#737373' }}
                >
                  Piliers clés
                </span>
              </div>
            </motion.div>

            {/* Piliers de la vision */}
            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-4"
              variants={fadeUpVariants}
            >
              {['Design premium', 'SEO robuste', 'Automatisations'].map((pillar, index) => (
                <div
                  key={pillar}
                  className="flex items-center gap-3 px-5 py-2.5"
                  style={{
                    border: '1px solid rgba(196, 92, 59, 0.3)',
                    backgroundColor: 'rgba(196, 92, 59, 0.05)',
                  }}
                >
                  <span
                    className="w-2 h-2"
                    style={{ backgroundColor: '#C45C3B' }}
                  />
                  <span
                    className="text-sm font-medium tracking-wide"
                    style={{ color: index === 2 ? '#F5F5F5' : '#A3A3A3' }}
                  >
                    {pillar}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Accent corner - bas gauche (inverse du hero) */}
      <div
        className="absolute bottom-0 left-0 w-24 h-[3px]"
        style={{ backgroundColor: '#C45C3B' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[3px] h-24"
        style={{ backgroundColor: '#C45C3B' }}
      />
    </section>
  )
}
