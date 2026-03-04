export const reseauxSociaux = {
  name: "Réseaux sociaux",
  problem: {
    title: "Publier régulièrement est un travail à plein temps",
    painPoints: [
      {
        icon: "⏰",
        quote: "Je n'ai pas le temps de poster",
        source: "Indépendant",
      },
      {
        icon: "📉",
        quote: "C'est irrégulier et peu efficace",
        source: "PME",
      },
      {
        icon: "🤯",
        quote: "Je gère 3+ comptes, c'est ingérable",
        source: "Multi-marques",
      },
    ],
  },
  solution: {
    title: "Un système qui publie pour vous",
    steps: [
      {
        label: "Génère",
        description: "Contenu créé par IA",
        icon: "🤖",
      },
      {
        label: "Planifié",
        description: "Horaires optimaux",
        icon: "📅",
      },
      {
        label: "Publié",
        description: "Toutes plateformes",
        icon: "🚀",
      },
      {
        label: "Analyse",
        description: "Performances",
        icon: "📊",
      },
    ],
    useCases: [
      { icon: "📱", label: "Posts multi-plateformes", description: "1 photo ou brief → posts Instagram, LinkedIn, Facebook", slideIndex: 4 },
      { icon: "📅", label: "Calendrier éditorial", description: "Planification mensuelle générée par IA", slideIndex: 5 },
      { icon: "♻️", label: "Repurposing de contenu", description: "Un article → posts, stories, carrousels", slideIndex: 6 },
      { icon: "💬", label: "Réponse automatique", description: "Commentaires et DM traités par IA", slideIndex: 7 },
      { icon: "🔍", label: "Veille concurrentielle", description: "Suivi des tendances et hashtags du secteur", slideIndex: 8 },
      { icon: "🛡️", label: "Modération", description: "Filtrage automatique des commentaires indésirables", slideIndex: 9 },
    ],
  },
  flow: {
    title: "Le flux automatisé",
    nodes: [
      { label: "Brief / Charte", icon: "📋" },
      { label: "IA Génération", icon: "🤖" },
      { label: "Planning auto", icon: "📅" },
      { label: "Publication", icon: "📱" },
      { label: "Analytics", icon: "📊" },
    ],
    stack: "n8n + Claude/GPT + Buffer/Publer",
  },
  result: {
    title: "Ce que ça change",
    metrics: [
      { value: "5/sem", label: "Publications sans y toucher" },
      { value: "3+", label: "Plateformes synchronisées" },
      { value: "Auto", label: "Reporting mensuel" },
      { value: "1-2 sem", label: "Mise en place" },
    ],
  },
};
