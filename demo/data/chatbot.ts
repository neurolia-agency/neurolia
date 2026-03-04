export const chatbot = {
  name: "Chatbot",
  problem: {
    title: "Vos visiteurs repartent sans réponse",
    painPoints: [
      {
        icon: "🔁",
        quote: "On répond aux mêmes questions FAQ 20 fois par jour",
        source: "Support client",
      },
      {
        icon: "🌙",
        quote: "Les leads arrivent la nuit, personne ne répond",
        source: "E-commerce",
      },
      {
        icon: "🤖",
        quote: "Notre chatbot actuel est idiot, les clients s'énervent",
        source: "SaaS",
      },
    ],
  },
  solution: {
    title: "Un chatbot qui comprend vraiment",
    steps: [
      {
        label: "Répond",
        description: "FAQ intelligente",
        icon: "💬",
      },
      {
        label: "Qualifié",
        description: "Scoring leads",
        icon: "⭐",
      },
      {
        label: "Guide",
        description: "Vers le bon produit",
        icon: "🧭",
      },
      {
        label: "Escalade",
        description: "Vers un humain",
        icon: "👤",
      },
    ],
    useCases: [
      { icon: "⭐", label: "Qualification de leads", description: "Scoring automatique et prise de RDV intégrée", slideIndex: 4 },
      { icon: "📚", label: "FAQ intelligente", description: "Base de connaissances interrogeable en langage naturel", slideIndex: 5 },
      { icon: "🛠️", label: "Support technique N1", description: "Diagnostic et résolution des demandes courantes", slideIndex: 6 },
      { icon: "🛒", label: "Recommandation produit", description: "Guide d'achat personnalisé selon les besoins", slideIndex: 7 },
      { icon: "📲", label: "Multi-canal", description: "Site web, WhatsApp, Messenger, Instagram DM", slideIndex: 8 },
      { icon: "🚀", label: "Onboarding client", description: "Parcours d'accueil automatisé pour les nouveaux clients", slideIndex: 9 },
    ],
  },
  flow: {
    title: "Le flux chatbot",
    nodes: [
      { label: "Visiteur site", icon: "👤" },
      { label: "Chatbot IA + RAG", icon: "🤖" },
      { label: "Qualification", icon: "⭐" },
      { label: "CRM + Notification", icon: "🔔" },
    ],
    stack: "n8n + Claude/GPT + RAG sur documents / catalogue produit",
  },
  result: {
    title: "Ce que ça change",
    metrics: [
      { value: "24/7", label: "Disponible en permanence" },
      { value: "Auto", label: "Qualification des leads" },
      { value: "-60%", label: "Charge support" },
      { value: "Direct", label: "Intégration CRM" },
    ],
  },
};
