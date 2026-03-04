import { Metadata } from 'next'
import PortfolioHero from '@/components/pages/portfolio/hero'
import ProjectsShowcase from '@/components/pages/portfolio/projects-grid'
import CtaFinal from '@/components/sections/cta-final'

export const metadata: Metadata = {
  title: 'Portfolio - Neurolia',
  description: 'Découvrez nos réalisations : sites web, automatisations, identités visuelles. Le beau au service du rentable.',
}

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <ProjectsShowcase />
      <CtaFinal />
    </>
  )
}
