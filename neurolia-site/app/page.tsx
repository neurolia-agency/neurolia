import Hero from '@/components/sections/hero';
import ServicesPreview from '@/components/sections/services-preview';
import Process from '@/components/sections/process';
import PortfolioPreview from '@/components/sections/portfolio-preview';
import Testimonials from '@/components/sections/testimonials';
import ContactMini from '@/components/sections/contact-mini';
import Faq from '@/components/sections/faq';
import ScrollBenefits from '@/components/sections/scroll-benefits';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <Process />
      <PortfolioPreview />
      <Testimonials />
      <ContactMini />
      <Faq />
      <ScrollBenefits />
    </>
  );
}
