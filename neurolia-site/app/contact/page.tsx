import { Metadata } from "next";
import ContactHero from "@/components/pages/contact/hero";
import ContactForm from "@/components/pages/contact/contact-form";
import Coordinates from "@/components/pages/contact/coordinates";
import ContactFaq from "@/components/pages/contact/faq";

export const metadata: Metadata = {
  title: "Contact - Neurolia",
  description:
    "Parlons de votre projet. Demandez votre audit gratuit et identifions ensemble vos leviers de croissance.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero — cinematic opening with nebula orb */}
      <ContactHero />

      {/* Form section — split layout: copy left, form right */}
      <section
        className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
        style={{ backgroundColor: "#0A0F1A" }}
      >
        {/* Background accent — left side warm glow */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full pointer-events-none hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, rgba(196,92,59,0.04) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div
          className="absolute bottom-[25%] right-0 w-[20%] h-px hidden lg:block"
          style={{
            background:
              "linear-gradient(to left, rgba(245,245,245,0.1), transparent)",
          }}
          aria-hidden="true"
        />

        <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left — Trust copy + coordinates */}
            <div className="order-2 lg:order-1">
              <Coordinates />
            </div>

            {/* Right — Form */}
            <div className="order-1 lg:order-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <ContactFaq />
    </>
  );
}
