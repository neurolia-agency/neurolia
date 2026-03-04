export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  image: string;
  description: string;
  features: string[];
  tags: string[];
  metrics?: { value: string; label: string }[];
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "fog-ecommerce",
    title: "E-commerce B2B/B2C",
    client: "Future of Grow",
    category: "E-commerce + Automatisation",
    year: "2025",
    image: "/portfolio/futureofgrow/screenshots/project-1.webp",
    description:
      "Replatforming complet d'un site e-commerce agritech (éclairage LED horticole). Site multilingue FR/EN/DE avec pricing multi-segments B2B/B2C, dashboard client et automatisations backend.",
    features: [
      "Catalogue Shopify avec pricing B2B dégressif",
      "Dashboard client B2B/B2C complet",
      "Automatisations n8n + Brevo + Odoo",
      "Internationalisation trilingue (FR/EN/DE)",
    ],
    tags: ["Next.js", "Shopify", "Automatisation", "E-commerce"],
    metrics: [
      { value: "-80%", label: "travail manuel (automations)" },
      { value: "+35%", label: "ventes e-commerce en 3 mois" },
    ],
    liveUrl: "https://futureofgrow.com",
  },
  {
    slug: "pixl-landing",
    title: "Landing Page Premium",
    client: "Pixel Academy",
    category: "site-vitrine",
    year: "2025",
    image: "/portfolio/pixel-academy/screenshots/project-2.webp",
    description:
      "Landing page de qualification pour une formation vidéo intensive. Esthétique cinéma/studio avec conversion unique vers prise de rendez-vous Calendly.",
    features: [
      "Direction artistique cinéma (dark mode, accent rouge)",
      "Animations au scroll et timecode animé",
      "Intégration Calendly pour réservation",
      "Copy orientée conversion (levée d'objections, badges preuve)",
    ],
    tags: ["HTML/CSS", "UX Copy", "Conversion", "Calendly"],
  },
  {
    slug: "opendoor-vitrine",
    title: "Opendoor Serrurerie",
    client: "Opendoor",
    category: "Site vitrine + Automatisation",
    year: "2026",
    image: "/portfolio/opendoor/screenshots/project-3.png",
    description:
      "Site vitrine haute conversion pour un serrurier à Narbonne. Optimisé pour le référencement local et la génération d'appels. Automatisations backend pour la gestion des devis et factures.",
    features: [
      "SEO local (JSON-LD LocalBusiness, mots-clés géo)",
      "Click-to-call intégré sur mobile",
      "Automatisation devis et factures (n8n)",
      "5 pages (accueil, services, approche, zone, contact)",
    ],
    tags: ["Next.js", "SEO Local", "Automatisation", "Conversion"],
    metrics: [
      { value: "x3", label: "appels reçus/mois" },
      { value: "-10h", label: "par semaine sur l'administratif" },
    ],
  },
];
