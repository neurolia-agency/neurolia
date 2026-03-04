import { Metadata } from 'next'
import AboutHero from '@/components/pages/about/hero'
import Mission from '@/components/pages/about/mission'
import Values from '@/components/pages/about/values'
import Stats from '@/components/pages/about/stats'
import CtaFinal from '@/components/sections/cta-final'

export const metadata: Metadata = {
  title: 'À propos - Neurolia',
  description: 'Découvrez notre mission : créer des business qui respirent. Votre croissance digitale, notre métier.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Mission />
      <Values />
      <Stats />
      <CtaFinal />
    </>
  )
}
