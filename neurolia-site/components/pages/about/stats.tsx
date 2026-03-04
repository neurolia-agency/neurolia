'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useEffect } from 'react'

/**
 * NEUROLIA EN CHIFFRES - Data Editorial
 *
 * Concept : Composition magazine asymétrique avec chiffres monumentaux.
 * - Numéros géants avec gradient terracotta (number-accent)
 * - Layout déstructuré : alternance grands blocs / blocs compacts
 * - Lignes connectrices terracotta horizontales et verticales
 * - Counter animation au scroll (les chiffres s'incrémentent)
 * - Même langage cinématique que hero/mission/values
 */

const stats = [
  {
    value: 5,
    suffix: '+',
    label: "Années d'expertise",
    detail: 'Web, SEO, automatisations',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Clients satisfaits',
    detail: 'Suivi personnalisé garanti',
  },
  {
    value: 48,
    suffix: 'h',
    label: 'Temps de réponse',
    detail: 'Réactivité maximale',
  },
  {
    value: 3,
    suffix: '',
    label: 'Piliers',
    detail: 'Design · SEO · Automatisations',
  },
]

// Animation variants - matching cinematic style
const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOutExpo,
    },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOutExpo,
    },
  },
}

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1,
      ease: easeOutExpo,
    },
  },
}

const verticalLineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1.2,
      ease: easeOutExpo,
    },
  },
}

/** Animated counter hook — counts from 0 to target on view */
function AnimatedCounter({
  target,
  suffix,
  isInView,
  delay = 0,
}: {
  target: number
  suffix: string
  isInView: boolean
  delay?: number
}) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (!isInView) return
    const timeout = setTimeout(() => {
      animate(count, target, {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
      })
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [isInView, target, count, delay])

  return (
    <span className="inline-flex items-baseline">
      <motion.span>{rounded}</motion.span>
      {suffix && (
        <span
          className="ml-0.5"
          style={{ color: '#C45C3B', opacity: 0.9 }}
        >
          {suffix}
        </span>
      )}
    </span>
  )
}

export default function Stats() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ backgroundColor: '#0A0F1A' }}
    >
      {/* Ligne terracotta verticale gauche - connecteur depuis Values */}
      <motion.div
        className="absolute left-6 md:left-12 top-0 w-[3px] origin-top"
        style={{ backgroundColor: '#C45C3B' }}
        variants={verticalLineVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="h-[30vh]" />
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
              L'essentiel
            </span>
          </motion.div>

          {/* Titre */}
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
              Neurolia en
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
              chiffres<span style={{ color: '#C45C3B' }}>.</span>
            </motion.span>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
            GRILLE STATS - Layout éditorial asymétrique
            2 blocs grands en haut, 2 blocs compacts en bas
            avec décalage vertical pour casser la grille
            ═══════════════════════════════════════════════════════════ */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-12 md:gap-y-0"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`relative group ${
                index % 2 === 1 ? 'md:mt-16 lg:mt-24' : ''
              } ${index >= 2 ? 'md:mt-8' : ''}`}
              variants={fadeUpVariants}
            >
              {/* Card stat */}
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
                {/* Numéro index terracotta + barre horizontale */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs tracking-[0.2em] uppercase"
                    style={{
                      fontFamily: 'var(--font-hero)',
                      fontWeight: 700,
                      color: '#C45C3B',
                      opacity: 0.5,
                    }}
                  >
                    0{index + 1}
                  </span>
                  <motion.div
                    className="flex-1 h-[1px] origin-left"
                    style={{
                      background:
                        'linear-gradient(to right, rgba(196, 92, 59, 0.3), transparent)',
                    }}
                    variants={lineVariants}
                  />
                </div>

                {/* Valeur monumentale */}
                <div
                  className="text-[clamp(2.5rem,6vw,3.5rem)] leading-[0.9] tracking-[-0.03em] mb-3"
                  style={{
                    fontFamily: 'var(--font-hero)',
                    fontWeight: 900,
                    background:
                      'linear-gradient(180deg, #C45C3B 0%, #F0A088 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    isInView={isInView}
                    delay={0.3 + index * 0.15}
                  />
                </div>

                {/* Label */}
                <h3
                  className="text-sm md:text-base leading-[1.1] tracking-[-0.01em] mb-1"
                  style={{
                    fontFamily: 'var(--font-hero)',
                    fontWeight: 700,
                    color: '#F5F5F5',
                  }}
                >
                  {stat.label}
                </h3>

                {/* Détail */}
                <p
                  className="text-xs md:text-sm leading-[1.7]"
                  style={{ color: '#737373' }}
                >
                  {stat.detail}
                </p>

                {/* Corner accent au hover — bas droite */}
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

      {/* Accent corner - bas droite (alternance avec values) */}
      <div
        className="absolute bottom-0 right-0 w-16 h-[2px]"
        style={{ backgroundColor: '#C45C3B' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[2px] h-16"
        style={{ backgroundColor: '#C45C3B' }}
      />
    </section>
  )
}
