import { Metadata } from 'next'
import ServicesHero from '@/components/pages/services/hero'
import ServiceDeepDive from '@/components/pages/services/service-deep-dive'
import ServiceDeepDiveAuto from '@/components/pages/services/service-deep-dive-auto'
import ServicesGrid from '@/components/pages/services/services-grid'
import Pricing from '@/components/pages/services/pricing'
import CtaFinal from '@/components/sections/cta-final'

export const metadata: Metadata = {
  title: 'Services - Neurolia',
  description: 'Sites web premium, chatbot IA, automatisation de process : des solutions concrètes pour donner de l\'air à votre activité.',
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceDeepDive />
      <ServiceDeepDiveAuto />
      <ServicesGrid />
      <Pricing />
      <CtaFinal />
    </>
  )
}
