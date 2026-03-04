export const mailing = {
  name: "Mailing",
  problem: {
    title: "Votre boîte mail est un chaos quotidien",
    painPoints: [
      {
        icon: "📬",
        quote: "Je passe 1h chaque matin à trier mes emails",
        source: "Dirigeant PME",
      },
      {
        icon: "🔴",
        quote: "Les urgences se noient dans les spams et newsletters",
        source: "Indépendant",
      },
      {
        icon: "⏳",
        quote: "Répondre à chaque email me prend un temps fou",
        source: "Office Manager",
      },
      {
        icon: "🤯",
        quote: "Clients, fournisseurs, candidatures : tout est mélangé",
        source: "Agence",
      },
    ],
  },
  solution: {
    title: "L'IA trie, classe et répond pour vous",
    steps: [
      {
        label: "Classifié",
        description: "8 catégories automatiques",
        icon: "🏷️",
      },
      {
        label: "Labellisé",
        description: "Organisation Gmail",
        icon: "📂",
      },
      {
        label: "Rédigé",
        description: "Brouillons par agent IA",
        icon: "✍️",
      },
      {
        label: "Contrôlé",
        description: "Vous validez avant envoi",
        icon: "✅",
      },
    ],
    useCases: [
      { icon: "📬", label: "Tri & brouillons", description: "Classement automatique + réponses pré-rédigées", slideIndex: 4 },
      { icon: "🎯", label: "Cold mailing", description: "Campagnes ciblées par mots-clés, segments et filtres", slideIndex: 5 },
      { icon: "🔔", label: "Mails transactionnels", description: "Confirmations, suivi commande, rappels RDV", slideIndex: 6 },
      { icon: "📰", label: "Newsletters HTML", description: "Rédaction + template à l'image de l'entreprise", slideIndex: 7 },
      { icon: "🔄", label: "Séquences nurturing", description: "Drip campaigns post-inscription ou post-devis", slideIndex: 8 },
      { icon: "📊", label: "Analyse performance", description: "Reporting ouverture, clics, conversions", slideIndex: 9 },
    ],
  },
  flow: {
    title: "Le flux de tri automatisé",
    nodes: [
      { label: "Email reçu (Gmail)", icon: "📨" },
      { label: "Classifier IA (GPT-4)", icon: "🧠" },
      { label: "Label + Agent spécialisé", icon: "🏷️" },
      { label: "Brouillon prêt", icon: "✉️" },
    ],
    stack: "n8n + GPT-4 + Gmail API — 8 catégories, 7 agents spécialisés, mémoire par thread",
  },
  result: {
    title: "Ce que ça change",
    metrics: [
      { value: "8", label: "Catégories de tri automatique" },
      { value: "~12s", label: "Temps de traitement / email" },
      { value: "0", label: "Email oublié ou perdu" },
      { value: "25 min", label: "Gagnées chaque matin" },
    ],
  },
};
