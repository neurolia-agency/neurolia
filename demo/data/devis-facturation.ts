export const devisFacturation = {
  name: "Devis & Facturation",
  problem: {
    title: "30 minutes par devis, des erreurs de tarif",
    painPoints: [
      {
        icon: "📄",
        quote: "On fait encore nos devis sur Word/Excel",
        source: "Artisan",
      },
      {
        icon: "💸",
        quote: "Copier-coller les prix, une erreur et c'est la perte",
        source: "PME services",
      },
      {
        icon: "😴",
        quote: "Pas de relance, les devis tombent dans l'oubli",
        source: "Agence",
      },
      {
        icon: "🔗",
        quote: "Devis, facture, paiement : 3 outils différents",
        source: "Indépendant",
      },
    ],
  },
  solution: {
    title: "Du devis au paiement, automatiquement",
    steps: [
      {
        label: "Généré",
        description: "Formulaire ou vocal",
        icon: "🎤",
      },
      {
        label: "Appliqué",
        description: "Tarifs et remises",
        icon: "📐",
      },
      {
        label: "Envoyé",
        description: "Et relance auto",
        icon: "📨",
      },
      {
        label: "Facturé",
        description: "Et encaissé",
        icon: "💰",
      },
    ],
    useCases: [
      { icon: "🎤", label: "Devis vocal", description: "Dictez, l'IA génère le PDF en 30 secondes", slideIndex: 4 },
      { icon: "📋", label: "Formulaire web → devis", description: "Le client remplit un formulaire, le devis se génère", slideIndex: 5 },
      { icon: "🧮", label: "Catalogue intelligent", description: "Tarifs, remises et marges calculés automatiquement", slideIndex: 6 },
      { icon: "✍️", label: "Signature électronique", description: "Signature en ligne intégrée au flux", slideIndex: 7 },
      { icon: "📤", label: "Relances automatiques", description: "Suivi J+3, J+7, J+14 jusqu'au paiement", slideIndex: 8 },
      { icon: "📊", label: "Suivi de trésorerie", description: "Tableau de bord paiements reçus / en attente", slideIndex: 9 },
    ],
  },
  flow: {
    title: "La chaîne complète",
    nodes: [
      { label: "Commande vocale", icon: "🎤" },
      { label: "IA mapping", icon: "🧠" },
      { label: "PDF en 30s", icon: "📄" },
      { label: "Signature", icon: "✍️" },
      { label: "Facture + Paiement", icon: "💰" },
    ],
    stack: "n8n + Claude/GPT — \"Crée un devis pour Martin SARL, 2 sites vitrine, remise 10%\"",
  },
  result: {
    title: "Ce que ça change",
    metrics: [
      { value: "30s", label: "vs 30 minutes par devis" },
      { value: "0", label: "Erreur de tarif" },
      { value: "Auto", label: "Relances J+3, J+7, J+14" },
      { value: "100%", label: "Chaîne devis → facture → paiement" },
    ],
  },
};
