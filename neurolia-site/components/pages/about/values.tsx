'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * NOS VALEURS - Composition éditoriale décalée
 *
 * Concept : Grille 2x2 avec décalage vertical entre colonnes,
 * numérotation terracotta, barre signature gauche,
 * même langage cinématique que hero + mission.
 */

const values = [
  {
    number: '01',
    title: 'Proximité',
    keyword: 'partenaire',
    description:
      "Accessible, à l'écoute, impliqué. Relation directe, interlocuteur dédié — pas un ticket dans une file d'attente.",
  },
  {
    number: '02',
    title: 'Clarté',
    keyword: 'essentiel',
    description:
      "Réduire le bruit, aller à l'essentiel, rendre compréhensible. Pas de jargon inutile, que des décisions éclairées.",
  },
  {
    number: '03',
    title: 'Exigence',
    keyword: 'premium',
    description:
      'Rendu premium et cohérent, formes qui servent la conversion. Le beau au service du rentable.',
  },
  {
    number: '04',
    title: 'Levier',
    keyword: 'ROI',
    description:
      'Chaque action crée un gain mesurable — temps, leads, conversion, chiffre d\'affaires. Focus résultats.',
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const horizontalLineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export default function Values() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ backgroundColor: '#050810' }}
    >
      {/* Ligne terracotta verticale droite - connecteur visuel (inverse de mission) */}
      <motion.div
        className="absolute right-6 md:right-12 top-0 w-[3px] origin-top"
        style={{ backgroundColor: '#C45C3B' }}
        variants={lineVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="h-[35vh]" />
      </motion.div>

      {/* Container principal */}
      <div className="container max-w-7xl mx-auto px-6 lg:px-8">
        {/* ═══════════════════════════════════════════════════════════
            TITRE - Traitement monumental asymétrique
            ═══════════════════════════════════════════════════════════ */}
        <motion.div
          className="relative mb-20 md:mb-28"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Label supérieur */}
          <motion.div className="mb-4 md:mb-5" variants={fadeUpVariants}>
            <span
              className="inline-flex items-center gap-4 text-[11px] font-medium tracking-[0.35em] uppercase"
              style={{ color: '#737373' }}
            >
              <span className="w-12 h-px" style={{ backgroundColor: '#C45C3B' }} />
              Ce qui nous guide
            </span>
          </motion.div>

          {/* Titre "Nos valeurs." */}
          <div>
            <motion.span
              className="block text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.1] tracking-[-0.02em] mb-0"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                color: '#9A9A9A',
              }}
              variants={wordVariants}
            >
              Nos
            </motion.span>
            <motion.span
              className="block text-[clamp(2rem,5vw,3rem)] leading-[1] tracking-[-0.02em]"
              style={{
                fontFamily: 'var(--font-hero)',
                fontWeight: 900,
                color: '#F5F5F5',
              }}
              variants={wordVariants}
            >
              valeurs<span style={{ color: '#C45C3B' }}>.</span>
            </motion.span>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
            GRILLE VALEURS - 2x2 décalée avec numérotation terracotta
            ═══════════════════════════════════════════════════════════ */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-12 md:gap-y-0"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {values.map((value, index) => (
            <motion.div
              key={value.number}
              className={`relative group ${
                index % 2 === 1 ? 'md:mt-20 lg:mt-28' : ''
              } ${index >= 2 ? 'md:mt-8' : ''}`}
              variants={fadeUpVariants}
            >
              {/* Card */}
              <div
                className="relative p-4 md:p-5 transition-colors duration-500"
                style={{
                  backgroundColor: 'rgba(196, 92, 59, 0.03)',
                  border: '1px solid rgba(196, 92, 59, 0.12)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(196, 92, 59, 0.35)'
                  e.currentTarget.style.backgroundColor = 'rgba(196, 92, 59, 0.06)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(196, 92, 59, 0.12)'
                  e.currentTarget.style.backgroundColor = 'rgba(196, 92, 59, 0.03)'
                }}
              >
                {/* Numéro terracotta + barre */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-[clamp(1.5rem,2.5vw,2rem)] leading-none tracking-tight"
                    style={{
                      fontFamily: 'var(--font-hero)',
                      fontWeight: 900,
                      color: '#C45C3B',
                      opacity: 0.7,
                    }}
                  >
                    {value.number}
                  </span>
                  <motion.div
                    className="flex-1 h-[2px] origin-left"
                    style={{
                      background:
                        'linear-gradient(to right, rgba(196, 92, 59, 0.4), transparent)',
                    }}
                    variants={horizontalLineVariants}
                  />
                </div>

                {/* Titre */}
                <h3
                  className="text-[clamp(1.25rem,3vw,1.75rem)] leading-[1.1] tracking-[-0.02em] mb-2"
                  style={{
                    fontFamily: 'var(--font-hero)',
                    fontWeight: 700,
                    color: '#F5F5F5',
                  }}
                >
                  {value.title}
                </h3>

                {/* Description avec mot-clé en vedette */}
                <p
                  className="text-xs md:text-sm leading-[1.7]"
                  style={{ color: '#A3A3A3' }}
                >
                  {value.description.split(value.keyword).length > 1 ? (
                    <>
                      {value.description.split(value.keyword)[0]}
                      <span style={{ color: '#D4D4D4' }}>{value.keyword}</span>
                      {value.description.split(value.keyword)[1]}
                    </>
                  ) : (
                    value.description
                  )}
                </p>

                {/* Accent corner bas-droite au hover */}
                <div
                  className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-500 group-hover:w-8 group-hover:h-[2px]"
                  style={{ backgroundColor: '#C45C3B' }}
                />
                <div
                  className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-500 group-hover:w-[2px] group-hover:h-8"
                  style={{ backgroundColor: '#C45C3B' }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Accent corner - bas gauche */}
      <div
        className="absolute bottom-0 left-0 w-16 h-[2px]"
        style={{ backgroundColor: '#C45C3B' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[2px] h-16"
        style={{ backgroundColor: '#C45C3B' }}
      />
    </section>
  )
}
