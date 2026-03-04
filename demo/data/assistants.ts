export const assistants = {
  name: "Assistants quotidiens",
  problem: {
    title: "Vos micro-tâches vous volent vos journées",
    painPoints: [
      {
        icon: "📋",
        quote: "Je passe mes journées sur de l'admin répétitive",
        source: "Dirigeant PME",
      },
      {
        icon: "🔄",
        quote: "Copier-coller entre 5 outils, c'est mon quotidien",
        source: "Office manager",
      },
      {
        icon: "🤷",
        quote: "Je n'ai pas d'assistant, mais j'en aurais besoin",
        source: "Indépendant",
      },
    ],
  },
  solution: {
    title: "Un assistant IA qui agit pour vous",
    steps: [
      {
        label: "Comprend",
        description: "Langage naturel",
        icon: "🧠",
      },
      {
        label: "Accède",
        description: "Vos outils connectés",
        icon: "🔗",
      },
      {
        label: "Agit",
        description: "Emails, agenda, CRM, factures, réseaux sociaux, reporting",
        icon: "⚡",
      },
      {
        label: "Apprend",
        description: "Votre contexte",
        icon: "📚",
      },
    ],
    useCases: [
      { icon: "☀️", label: "Briefing matinal", description: "Résumé agenda, emails urgents, alertes du jour", slideIndex: 4 },
      { icon: "✉️", label: "Rédaction & envoi", description: "Emails dictés en langage naturel, envoyés pour vous", slideIndex: 5 },
      { icon: "📝", label: "Comptes-rendus", description: "Transcription + résumé + actions à suivre", slideIndex: 6 },
      { icon: "🔎", label: "Recherche documentaire", description: "Interrogez vos documents internes en langage naturel", slideIndex: 7 },
      { icon: "📈", label: "Reporting à la demande", description: "CA, KPIs, stats générés en une phrase", slideIndex: 8 },
      { icon: "📰", label: "Veille sectorielle", description: "Résumé quotidien des actualités de votre secteur", slideIndex: 9 },
    ],
  },
  flow: {
    title: "Le flux assistant",
    nodes: [
      { label: "Commande vocale/texte", icon: "🎤" },
      { label: "IA interprétation", icon: "🧠" },
      { label: "Email / CRM", icon: "✉️" },
      { label: "Agenda / Rapport", icon: "📅" },
    ],
    stack: "n8n + Claude/GPT — canaux : Slack, WhatsApp, téléphone",
  },
  result: {
    title: "Exemples concrets",
    metrics: [
      { value: "📅", label: "\"Quels sont mes RDV ?\" → résumé agenda" },
      { value: "✉️", label: "\"Envoie un rappel à Martin\" → email auto" },
      { value: "💰", label: "\"CA du mois ?\" → requête + réponse" },
      { value: "∞", label: "Disponible 24/7" },
    ],
  },
};
