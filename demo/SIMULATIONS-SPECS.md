# Spécifications — Simulations par possibilité

## Objectif

Générer 25 nouvelles simulations (5 par service × 5 services). Chaque service a déjà 1 simulation existante. Il faut créer les 5 restantes correspondant aux `useCases` non encore simulés.

---

## Architecture technique

### Stack
- Next.js 15 / React 19 / TypeScript
- Tailwind CSS 4
- Framer Motion (`motion`, `AnimatePresence`)

### Hook principal : `useSimulationTimeline`
```tsx
const delays = useMemo(() => [0.5, 1.5, 2.0, ...], []);
const count = useSimulationTimeline(delays, true);
// count s'incrémente automatiquement : 0 → 1 → 2 → 3...
// Chaque delay (en secondes) = temps avant le step suivant
```

### Wrapper : `SimulationSlide`
```tsx
<SimulationSlide
  title="Titre accrocheur de la simulation"
  device="desktop" // ou "phone"
  deviceTitle="Titre dans la barre Chrome"
>
  {/* Contenu animé ici */}
</SimulationSlide>
```

### Composants UI disponibles

**ChatBubble** — Bulle de conversation
```tsx
<ChatBubble role="user">Message utilisateur</ChatBubble>
<ChatBubble role="bot">Réponse du bot</ChatBubble>
<ChatBubble role="bot" typing /> // Animation "..."
```

**TypingText** — Texte qui s'écrit caractère par caractère
```tsx
<TypingText text="Le texte qui apparaît..." speed={25} />
```

**StatusBadge** — Badge de statut coloré
```tsx
<StatusBadge variant="success">Terminé ✓</StatusBadge>
// Variants : success (vert), pending (ambre), active (bleu), new (primary), danger (rouge)
```

**NotificationToast** — Toast qui slide depuis la droite
```tsx
<NotificationToast>🔔 Notification reçue</NotificationToast>
```

**DocumentPreview** — Aperçu de document/facture
```tsx
<DocumentPreview
  title="Devis #D-2025-087"
  lines={[
    { label: "Ligne 1", value: "100€" },
    { label: "Ligne 2", value: "200€" },
  ]}
  total="300€ TTC"
/>
```

**TimelineStep** — Étape dans une timeline verticale
```tsx
<TimelineStep status="done">Étape terminée</TimelineStep>
<TimelineStep status="active">Étape en cours</TimelineStep>
<TimelineStep status="pending">Étape à venir</TimelineStep>
```

**DeviceFrame** — déjà intégré dans SimulationSlide (desktop 400px / phone 480px)

### CSS Variables disponibles
- `var(--border)`, `var(--surface)`, `var(--surface-card)`
- Classes : `text-text-primary`, `text-text-muted`, `text-primary`, `bg-primary`
- Couleurs Tailwind : emerald, amber, red, blue, purple pour les accents

### Pattern de base d'une simulation
```tsx
"use client";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SimulationSlide } from "@/components/slides/SimulationSlide";
import { useSimulationTimeline } from "@/lib/useSimulationTimeline";
// + imports des composants UI nécessaires

export function SimNomDeLaSimulation() {
  const delays = useMemo(() => [0.5, 1.5, 2.0, ...], []);
  const count = useSimulationTimeline(delays, true);

  return (
    <SimulationSlide title="..." device="desktop" deviceTitle="...">
      <div className="space-y-2.5">
        <AnimatePresence>
          {count >= 1 && ( <motion.div key="step1" initial={{...}} animate={{...}}> ... </motion.div> )}
          {count >= 2 && ( ... )}
        </AnimatePresence>
      </div>
    </SimulationSlide>
  );
}
```

### Règles de design
- Delays entre 0.5s et 5.0s selon la quantité de texte à lire
- Toujours `key` unique sur chaque step pour AnimatePresence
- Textes en français avec accents corrects (é, è, ê, ô, ç, œ, î, à)
- Tailles de texte : titres `text-xs font-medium`, contenu `text-[11px]`, micro `text-[10px]`
- Utiliser les composants existants au maximum, créer du custom inline si besoin

---

## Fichiers à créer

Chaque simulation = 1 fichier dans `components/slides/simulations/`.
Nommage : `Sim{Service}{NomCourt}.tsx` (PascalCase).

---

## SERVICE 1 : MAILING

### ✅ Existant : Tri & brouillons → `SimMailing.tsx`

### 1.1 — Cold mailing → `SimMailingCold.tsx`
**Titre** : "Une campagne ciblée en 2 minutes"
**Device** : desktop — "Neurolia — Cold Mailing IA"
**Scénario** : L'utilisateur définit une cible, l'IA génère la campagne.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Formulaire de ciblage : secteur "Restaurants Aveyron", taille "10-50 salariés", rôle "Dirigeant" (3 champs avec valeurs pré-remplies, badges colorés) |
| 2 | 2.0s | IA extraction : "127 contacts trouvés" + barre de progression + badges "LinkedIn" "Societe.com" "Pages Jaunes" |
| 3 | 2.0s | Liste de 4 contacts extraits (nom, entreprise, email) avec StatusBadge "Vérifié ✓" |
| 4 | 2.0s | Email template généré : objet "Automatisez votre restaurant..." + corps avec TypingText + badge "Personnalisé par IA" |
| 5 | 2.5s | Séquence de relance : Timeline 3 steps (J+0 Email initial → J+3 Relance → J+7 Dernier rappel) |
| 6 | 2.0s | Métriques : 127 envoyés, 43% ouverture, 12% réponse, 8 RDV décrochés |

### 1.2 — Mails transactionnels → `SimMailingTransac.tsx`
**Titre** : "Commande passée, emails envoyés"
**Device** : desktop — "Automatisation — Emails transactionnels"
**Scénario** : Une commande arrive, les emails de suivi partent automatiquement.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Notification : "🛒 Nouvelle commande #4721 — Marie Dupont — 89,00€" |
| 2 | 1.5s | Email "Confirmation de commande" généré avec récap (articles, total, livraison estimée) — StatusBadge "Envoyé ✓" |
| 3 | 2.0s | Timeline : J+0 Confirmation ✓ → J+1 Préparation en cours (actif, pulsing) → J+3 Expédié → J+5 Livré |
| 4 | 2.0s | Email "Votre colis a été expédié" avec numéro de suivi — StatusBadge "Envoyé ✓" |
| 5 | 2.0s | Email "Livraison confirmée" + demande d'avis "Notez votre expérience ⭐⭐⭐⭐⭐" |
| 6 | 1.5s | Métriques : 100% délivrés, 78% ouverts, 34% avis collectés, 0 intervention manuelle |

### 1.3 — Newsletters HTML → `SimMailingNewsletter.tsx`
**Titre** : "Votre newsletter rédigée en 30 secondes"
**Device** : desktop — "Neurolia — Newsletter IA"
**Scénario** : Brief rapide → l'IA génère la newsletter complète.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Brief utilisateur (bulle style chat) : "Newsletter de février, thème : soldes d'hiver + nouveau produit bio" |
| 2 | 2.0s | Spinner "Rédaction en cours..." + extraction des thèmes en badges (Soldes, Nouveau produit, Bio) |
| 3 | 2.5s | Preview de la newsletter : header avec logo placeholder, titre "Les soldes continuent !", 2 sections avec texte (TypingText), CTA "Découvrir" |
| 4 | 2.0s | Barre de stats preview : "Template appliqué ✓" + "Responsive mobile ✓" + "Anti-spam score : 9.2/10" |
| 5 | 1.5s | Envoi : "2 340 destinataires" → barre de progression → "Campagne envoyée ✓" |
| 6 | 2.0s | Métriques live : 2 340 envoyés, 52% ouverture, 18% clics, 3.2% conversion |

### 1.4 — Séquences nurturing → `SimMailingNurturing.tsx`
**Titre** : "Du prospect au client, automatiquement"
**Device** : desktop — "Neurolia — Séquence Nurturing"
**Scénario** : Un lead s'inscrit, la séquence automatique se déroule.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Trigger : "Nouveau lead — Thomas Renard — via formulaire site web" avec NotificationToast |
| 2 | 2.0s | Timeline séquence : J+0 "Email de bienvenue" (done) — contenu : "Bienvenue Thomas, voici ce que nous pouvons faire pour vous..." |
| 3 | 2.0s | J+3 "Email de valeur" (done) — contenu : "3 conseils pour automatiser votre activité" |
| 4 | 2.0s | J+7 "Étude de cas" (done) — contenu : "Comment la Brasserie du Marché a gagné 2h/jour" |
| 5 | 2.0s | J+14 "Offre personnalisée" (active) — contenu : "Audit gratuit de vos process — Réservez un créneau" |
| 6 | 2.0s | Résultat : NotificationToast "Thomas Renard a réservé un créneau" + StatusBadge "Converti ⭐" + taux conversion séquence "23%" |

### 1.5 — Analyse performance → `SimMailingAnalyse.tsx`
**Titre** : "Vos campagnes, analysées en temps réel"
**Device** : desktop — "Neurolia — Analytics Email"
**Scénario** : Dashboard de performance avec insights IA.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Header dashboard : "Rapport — Semaine du 3 février" + sélecteur de période |
| 2 | 1.5s | 4 métriques principales : 12 450 envoyés, 47% ouverture, 12% clics, 3.8% conversion (CountUp animé) |
| 3 | 2.0s | Barres comparatives : "vs semaine précédente" — Ouverture +5% ↑ (vert), Clics -2% ↓ (rouge), Conversion +1.2% ↑ (vert) |
| 4 | 2.0s | Top 3 campagnes : liste avec nom, taux ouverture, taux clic (triées par performance) |
| 5 | 2.0s | Encart IA "💡 Recommandations" : "Les emails envoyés le mardi à 9h ont +18% d'ouverture" + "Le sujet avec émoji 📦 surperforme de 12%" |
| 6 | 1.5s | Export : "Rapport PDF généré ✓" + "Envoyé à direction@entreprise.fr" |

---

## SERVICE 2 : RÉSEAUX SOCIAUX

### ✅ Existant : Posts multi-plateformes → `SimReseauxSociaux.tsx`

### 2.1 — Calendrier éditorial → `SimSocialCalendrier.tsx`
**Titre** : "Votre mois de contenu, planifié en 1 minute"
**Device** : desktop — "Neurolia — Calendrier Éditorial"
**Scénario** : L'IA génère un planning mensuel à partir de la charte de marque.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Input : Brief marque "La Brasserie du Marché — restaurant traditionnel, terroir, convivialité" |
| 2 | 2.0s | Spinner "Analyse de votre charte..." + badges thèmes détectés : "Terroir" "Plats du jour" "Équipe" "Événements" |
| 3 | 2.5s | Vue calendrier semaine 1 : Lundi "🍽️ Plat du jour" / Mercredi "👨‍🍳 Coulisses cuisine" / Vendredi "🎉 Soirée weekend" (3 cartes empilées) |
| 4 | 2.0s | Vue calendrier semaine 2 : Lundi "🥗 Nouveau menu" / Jeudi "⭐ Avis client" / Samedi "📸 Ambiance salle" |
| 5 | 1.5s | Récap : "20 posts planifiés sur 4 semaines" + répartition par plateforme (Instagram 8, LinkedIn 6, Facebook 6) |
| 6 | 1.5s | StatusBadge "Calendrier validé ✓" + "Premiers posts programmés pour lundi 9h" |

### 2.2 — Repurposing de contenu → `SimSocialRepurposing.tsx`
**Titre** : "1 article de blog → 5 contenus différents"
**Device** : desktop — "Neurolia — Repurposing IA"
**Scénario** : Un article de blog est transformé en contenus multi-formats.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Input : carte article "Comment choisir son architecte ?" — 1 200 mots — blog.cabinet-renaud.fr |
| 2 | 2.0s | Spinner "Extraction des points clés..." + 4 bullets extraits |
| 3 | 1.5s | Post Instagram carrousel : "📸 Carrousel — 5 slides — Les 5 critères pour choisir son architecte" |
| 4 | 1.5s | Post LinkedIn : "💼 Article LinkedIn — Version pro avec chiffres du secteur" |
| 5 | 1.5s | Post Facebook : "📘 Post Facebook — Version courte + lien vers l'article" + Story "📱 Story — Citation clé + swipe up" |
| 6 | 2.0s | Récap : 5 contenus générés, 3 plateformes, "~45 min gagnées" + tous StatusBadge "Prêt à publier" |

### 2.3 — Réponse automatique → `SimSocialReponse.tsx`
**Titre** : "Vos commentaires traités en temps réel"
**Device** : phone — "Instagram — Notifications"
**Scénario** : Des commentaires arrivent, l'IA les classe et y répond.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Notification : "💬 3 nouveaux commentaires sur votre dernier post" |
| 2 | 1.5s | Commentaire 1 : "@julie_rdz : C'est ouvert le dimanche ?" → IA classifie "Question" (badge bleu) → Réponse auto : "Bonjour Julie ! Nous sommes ouverts le dimanche midi 🍽️ Réservation au 05 65..." |
| 3 | 2.0s | Commentaire 2 : "@foodlover12 : Magnifique assiette ! 😍" → IA classifie "Compliment" (badge vert) → Réponse auto : "Merci beaucoup ! Notre chef sera ravi 👨‍🍳" |
| 4 | 2.0s | Commentaire 3 : "@promo_spam : Gagnez 1000€..." → IA classifie "Spam" (badge rouge) → Action : "Masqué automatiquement" |
| 5 | 1.5s | DM : "@marie.arch : Bonjour, je voudrais réserver pour 6 personnes samedi" → IA classifie "Lead" (badge or) → Réponse + notification pro |
| 6 | 1.5s | Récap : 4 interactions, 2 réponses auto, 1 spam filtré, 1 lead qualifié — "0 intervention manuelle" |

### 2.4 — Veille concurrentielle → `SimSocialVeille.tsx`
**Titre** : "Vos concurrents publient, vous êtes alerté"
**Device** : desktop — "Neurolia — Veille Concurrentielle"
**Scénario** : Monitoring des concurrents avec alertes et insights.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Header : "Veille — 3 concurrents suivis" + liste (Restaurant A, Restaurant B, Restaurant C) |
| 2 | 2.0s | Alerte : "🔔 Restaurant A a publié une offre promo -20% sur Instagram" — avec preview du post |
| 3 | 2.0s | Analyse IA : "Tendance détectée : 2/3 concurrents communiquent sur les menus du terroir cette semaine" + hashtags trending "#terroir #aveyron #platdujour" |
| 4 | 2.0s | Suggestion IA : "💡 Opportunité : aucun concurrent ne communique sur les soirées à thème. Créneau à exploiter !" |
| 5 | 1.5s | Comparatif engagement : Vous 4.2% / Concurrent A 3.8% / Concurrent B 2.1% — StatusBadge "Leader ⭐" |
| 6 | 1.5s | Rapport : "Rapport hebdo envoyé ✓" + NotificationToast |

### 2.5 — Modération → `SimSocialModeration.tsx`
**Titre** : "Vos commentaires filtrés 24/7"
**Device** : desktop — "Neurolia — Modération IA"
**Scénario** : Flux de commentaires analysés et filtrés en temps réel.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Header : "Modération en direct — 12 nouveaux commentaires" |
| 2 | 1.5s | Commentaire OK : "Super restaurant, on reviendra !" — Badge "✓ Approuvé" (vert) |
| 3 | 1.5s | Commentaire OK : "Le magret était délicieux 😋" — Badge "✓ Approuvé" (vert) |
| 4 | 1.5s | Commentaire toxique : "C'est nul, arnaque totale !!" — Badge "⚠️ Signalé" (ambre) — Action proposée : "Masquer / Répondre" |
| 5 | 1.5s | Spam : "Gagnez un iPhone gratuit ici →" — Badge "🚫 Spam" (rouge) — "Supprimé automatiquement" |
| 6 | 2.0s | Récap : 12 commentaires analysés, 9 approuvés, 2 signalés, 1 spam supprimé — "Temps moyen : <1 seconde" |

---

## SERVICE 3 : CHATBOT

### ✅ Existant : Qualification de leads → `SimChatbot.tsx`

### 3.1 — FAQ intelligente → `SimChatbotFaq.tsx`
**Titre** : "Vos clients trouvent la réponse en 10 secondes"
**Device** : desktop — "www.cabinet-renaud-architectes.fr"
**Scénario** : Un visiteur pose des questions, le bot répond avec sources.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.3s | Site web en fond (header cabinet) + widget chat ouvert |
| 2 | 0.7s | Bot : "Bonjour ! Je connais tous nos projets et tarifs. Posez-moi votre question 😊" |
| 3 | 1.5s | User : "Quels sont vos délais pour une extension ?" |
| 4 | 1.0s | Bot typing... |
| 5 | 2.0s | Bot : "Pour une extension standard, comptez 4 à 6 mois du permis à la livraison. Les étapes : ① Étude 2-3 sem. ② Permis 2-3 mois ③ Travaux 3-4 mois" + source : "Documentation projets 2025" (italique) |
| 6 | 1.5s | User : "Et pour une surélévation ?" |
| 7 | 0.8s | Bot typing... |
| 8 | 2.0s | Bot : "La surélévation demande 6 à 9 mois car elle nécessite une étude structurelle approfondie." + source + bouton "📅 Prendre RDV pour en discuter" |
| 9 | 1.5s | StatusBadge "FAQ enrichie — 847 questions répondues ce mois" |

### 3.2 — Support technique N1 → `SimChatbotSupport.tsx`
**Titre** : "23h, un client a un problème. Le bot résout."
**Device** : phone — "Support — MonSite.fr"
**Scénario** : Un client a un problème technique, le bot diagnostique et résout.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Bot : "Bonjour ! Décrivez votre problème et je vais vous aider." |
| 2 | 1.2s | User : "Je n'arrive plus à me connecter à mon compte" |
| 3 | 1.0s | Bot typing... |
| 4 | 2.0s | Bot : "Je vais vous guider. Quel message d'erreur voyez-vous ?" + 3 boutons choix : "Mot de passe incorrect" / "Page blanche" / "Autre" |
| 5 | 1.5s | User : "Mot de passe incorrect" |
| 6 | 1.0s | Bot typing... |
| 7 | 2.0s | Bot : "✓ Lien de réinitialisation envoyé à m***@email.fr. Vérifiez vos spams si besoin. Le lien expire dans 24h." |
| 8 | 1.5s | User : "Ça marche, merci !" |
| 9 | 1.0s | Bot : "Parfait ! 😊 Problème résolu en 45 secondes." + StatusBadge "Résolu ✓" — sans intervention humaine |

### 3.3 — Recommandation produit → `SimChatbotProduit.tsx`
**Titre** : "Un conseiller virtuel qui connaît votre catalogue"
**Device** : desktop — "www.boutique-terroir.fr"
**Scénario** : Un visiteur cherche un produit, le bot guide l'achat.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.3s | Site e-commerce en fond (header boutique) + widget chat |
| 2 | 0.7s | Bot : "Bienvenue ! Je peux vous aider à trouver le cadeau parfait 🎁" |
| 3 | 1.5s | User : "Je cherche un coffret cadeau autour de 50€" |
| 4 | 1.0s | Bot typing... |
| 5 | 2.5s | Bot : "Voici 3 coffrets dans votre budget :" + 3 cartes produit inline (nom, prix, note ⭐) : "Coffret Terroir 45€" / "Coffret Gourmand 52€" / "Coffret Prestige 58€" |
| 6 | 1.5s | User : "Le Gourmand, c'est quoi dedans ?" |
| 7 | 1.0s | Bot typing... |
| 8 | 2.0s | Bot : détail du coffret (liste d'ingrédients) + "⭐ 4.8/5 — 127 avis" + bouton "Ajouter au panier — 52€" |
| 9 | 1.5s | NotificationToast "🛒 Ajouté au panier" + StatusBadge "Vente assistée IA" |

### 3.4 — Multi-canal → `SimChatbotMulticanal.tsx`
**Titre** : "Le même assistant, partout"
**Device** : desktop — "Neurolia — Chatbot Multi-canal"
**Scénario** : Montrer le même bot répondant sur différents canaux.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Vue en 2 colonnes : à gauche "Canaux actifs", à droite "Conversations en cours" |
| 2 | 1.5s | Canal 1 : 💬 Site web — "Combien coûte une extension ?" — StatusBadge "En cours" |
| 3 | 1.5s | Canal 2 : 📱 WhatsApp — "Je voudrais un RDV cette semaine" — StatusBadge "Répondu ✓" |
| 4 | 1.5s | Canal 3 : 💬 Messenger — "Vos horaires d'ouverture ?" — StatusBadge "Répondu ✓" |
| 5 | 1.5s | Canal 4 : 📸 Instagram DM — "Magnifique projet ! Vous faites aussi des rénovations ?" — StatusBadge "En cours" |
| 6 | 2.0s | Panneau CRM : "4 conversations unifiées" + "2 leads qualifiés" + "Tous synchronisés dans votre CRM" + NotificationToast |

### 3.5 — Onboarding client → `SimChatbotOnboarding.tsx`
**Titre** : "Nouveau client ? Le bot l'accompagne."
**Device** : phone — "WhatsApp — Onboarding"
**Scénario** : Parcours d'accueil automatisé pour un nouveau client.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Bot : "Bienvenue chez Cabinet Renaud ! 🎉 Je vais vous guider dans les premières étapes de votre projet." |
| 2 | 1.5s | Bot : "Étape 1/4 — Pouvez-vous m'envoyer les plans de votre terrain ou maison actuelle ?" |
| 3 | 1.5s | User : envoie un document (📎 plan_maison.pdf) |
| 4 | 1.5s | Bot : "✓ Document reçu ! Étape 2/4 — Quel est votre budget approximatif ?" + 3 boutons : "< 50k" / "50-80k" / "> 80k" |
| 5 | 1.5s | User : "50-80k" |
| 6 | 1.5s | Bot : "Étape 3/4 — Date souhaitée pour les travaux ?" + choix "Printemps 2026" / "Été 2026" / "Pas pressé" |
| 7 | 1.5s | Bot : "✓ Profil complété ! Étape 4/4 — Votre architecte référent est M. Renaud. Premier RDV proposé : Jeudi 14h." |
| 8 | 1.5s | Barre de progression "Onboarding 100% ✓" + StatusBadge "Dossier créé" + NotificationToast "📋 Fiche client envoyée à M. Renaud" |

---

## SERVICE 4 : DEVIS & FACTURATION

### ✅ Existant : Devis vocal → `SimDevisFacturation.tsx`

### 4.1 — Formulaire web → devis → `SimDevisFormulaire.tsx`
**Titre** : "Le client remplit, le devis se génère"
**Device** : desktop — "Formulaire en ligne — Devis automatique"
**Scénario** : Un client remplit un formulaire, le devis est auto-généré.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Formulaire avec champs pré-remplis : Nom "Sophie Martin", Service "Site vitrine", Pages "5", Options "Blog + SEO" |
| 2 | 1.5s | Bouton "Générer le devis" cliqué → spinner "Calcul en cours..." |
| 3 | 2.5s | DocumentPreview : "Devis #D-2025-112 — Sophie Martin" avec lignes (Site vitrine 5 pages: 2 500€, Blog: 800€, SEO: 600€, TVA 20%: 780€) total "4 680€ TTC" |
| 4 | 2.0s | StatusBadge "Envoyé ✓" + "→ sophie.martin@email.fr" + "Signature en ligne disponible" |
| 5 | 2.0s | NotificationToast "✍️ Sophie Martin a signé le devis" + StatusBadge "Signé ✓" |
| 6 | 1.5s | Auto-transformation : "Facture #F-2025-112 créée ✓" + "Lien de paiement envoyé" |

### 4.2 — Catalogue intelligent → `SimDevisCatalogue.tsx`
**Titre** : "Vos tarifs appliqués automatiquement"
**Device** : desktop — "Neurolia — Catalogue & Tarification"
**Scénario** : Création d'un devis depuis le catalogue avec calculs automatiques.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Barre de recherche : "Rechercher un produit/service..." + "tableau électrique" tapé |
| 2 | 1.5s | 3 résultats du catalogue : "Disjoncteur 20A — 15€/u" / "Différentiel 30mA — 85€/u" / "Main d'œuvre élec. — 55€/h" |
| 3 | 2.0s | Panier devis : items ajoutés avec quantités (12x Disjoncteur, 1x Différentiel, 3h MO) + calcul auto |
| 4 | 1.5s | IA suggestion : "💡 Remise volume détectée : -10% sur disjoncteurs (>10 unités)" + prix barré → nouveau prix |
| 5 | 2.0s | DocumentPreview avec total mis à jour + marge affichée "Marge brute : 42%" (visible uniquement pro) |
| 6 | 1.5s | "Devis généré en 30 secondes" + comparaison "vs 25 min manuellement" |

### 4.3 — Signature électronique → `SimDevisSignature.tsx`
**Titre** : "Signé en 3 clics, sans imprimer"
**Device** : phone — "Signature — Devis #D-2025-087"
**Scénario** : Le client reçoit le devis et signe sur son téléphone.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Email reçu : "Vous avez reçu un devis de Lucas Électricité" + bouton "Consulter le devis" |
| 2 | 2.0s | DocumentPreview compact du devis (titre, lignes principales, total 516€) |
| 3 | 2.0s | Zone de signature : cadre pointillé "Signez ici" + mention "Lu et approuvé" avec checkbox |
| 4 | 1.5s | Animation signature (trait qui apparaît) + checkbox cochée |
| 5 | 1.5s | StatusBadge "Signé ✓" + horodatage "8 février 2026 à 14:32" + "Valeur juridique — conforme eIDAS" |
| 6 | 1.5s | Double notification : côté client "PDF signé envoyé ✓" / côté pro NotificationToast "Lucas — Devis #087 signé !" |

### 4.4 — Relances automatiques → `SimDevisRelances.tsx`
**Titre** : "Plus jamais d'impayé oublié"
**Device** : desktop — "Neurolia — Suivi & Relances"
**Scénario** : Cycle complet de relance automatique jusqu'au paiement.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Facture : "#F-2025-071 — Restaurant Bichette — 1 850€" + StatusBadge "En attente" (ambre) |
| 2 | 2.0s | Timeline J+3 : "Email de rappel cordial envoyé ✓" — aperçu : "Bonjour, sauf erreur de notre part, la facture #071 reste en attente..." |
| 3 | 2.0s | Timeline J+7 : "2e relance envoyée ✓" — ton plus direct + mention "échéance dépassée" |
| 4 | 2.0s | Timeline J+14 : "Relance finale ✓" — mention mise en demeure possible + lien de paiement |
| 5 | 2.0s | NotificationToast "💰 Paiement reçu — 1 850€" + StatusBadge "Payé ✓" (vert) |
| 6 | 1.5s | Récap : "3 relances, 0 intervention, 18 jours" + "Email de remerciement envoyé automatiquement" |

### 4.5 — Suivi de trésorerie → `SimDevisTresorerie.tsx`
**Titre** : "Votre trésorerie en un coup d'œil"
**Device** : desktop — "Neurolia — Tableau de Bord"
**Scénario** : Dashboard trésorerie avec alertes et prévisions.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Header : "Février 2026" + solde "12 450€" (gros, primary) |
| 2 | 1.5s | 3 métriques : "8 factures en cours — 6 200€" / "3 impayées — 2 100€" (danger) / "CA du mois — 18 650€" |
| 3 | 2.0s | Liste factures en attente : 3 lignes (client, montant, jours de retard) triées par urgence avec codes couleur |
| 4 | 2.0s | Prévision : "Encaissements prévus cette semaine : 4 300€" + "Charges à venir : 2 800€" + "Solde estimé fin de mois : 13 950€" |
| 5 | 1.5s | Alerte IA : "⚠️ Facture #071 — Restaurant Bichette — 15 jours de retard. Relance automatique programmée." |
| 6 | 1.5s | "Export comptable généré ✓" + "Synchronisé avec votre logiciel" + NotificationToast |

---

## SERVICE 5 : ASSISTANTS QUOTIDIENS

### ✅ Existant : Briefing matinal → `SimAssistants.tsx`

### 5.1 — Rédaction & envoi → `SimAssistantRedaction.tsx`
**Titre** : "Dictez, l'IA rédige et envoie"
**Device** : phone — "WhatsApp — Assistant IA"
**Scénario** : L'utilisateur dicte un email, l'assistant le rédige et l'envoie.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | User : "Envoie un email à Dupont pour confirmer le chantier de lundi, 8h sur site, prévoir les plans modifiés" |
| 2 | 1.0s | Bot typing... |
| 3 | 2.5s | Bot : "Voici le brouillon :" + encart email avec Objet "Confirmation chantier — Lundi 8h" + corps rédigé en français professionnel (TypingText) |
| 4 | 1.5s | Bot : "Destinataire : m.dupont@entreprise.fr — Envoyer ?" + 2 boutons "Envoyer ✓" / "Modifier" |
| 5 | 1.5s | User : "Envoyer" |
| 6 | 1.0s | Bot : "✓ Email envoyé à M. Dupont" + "Rappel ajouté : Lundi 8h — Chantier Dupont" + StatusBadge "Envoyé ✓" |

### 5.2 — Comptes-rendus → `SimAssistantCR.tsx`
**Titre** : "Réunion terminée, CR envoyé"
**Device** : desktop — "Neurolia — Comptes-Rendus IA"
**Scénario** : L'assistant transcrit une réunion et génère le compte-rendu.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Header : "Réunion — Projet Martin — 14h-15h" + icône micro pulsing "Transcription en cours..." |
| 2 | 2.0s | Transcription live : lignes qui apparaissent "P. Renaud : On valide le plan modifié..." / "Client : Le budget reste à 75k ?" / "P. Renaud : Oui, confirmé." (TypingText) |
| 3 | 2.5s | Résumé IA généré : "📋 Points clés :" + 3 bullets (Plan validé, Budget confirmé 75k€, Début travaux mars) |
| 4 | 2.0s | Actions à suivre : checklist "☐ Envoyer plans modifiés à M. Martin" / "☐ Relancer fournisseur béton" / "☐ Bloquer semaine 12 pour début chantier" |
| 5 | 1.5s | "CR envoyé à : p.renaud@cabinet.fr, martin@email.fr" + StatusBadge "Distribué ✓" |
| 6 | 1.5s | "Tâches créées dans votre agenda ✓" + NotificationToast |

### 5.3 — Recherche documentaire → `SimAssistantRecherche.tsx`
**Titre** : "Trouvez n'importe quelle info en 5 secondes"
**Device** : phone — "WhatsApp — Assistant IA"
**Scénario** : L'utilisateur interroge ses documents internes.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | User : "Quel est le tarif qu'on a appliqué pour le projet Dupont l'an dernier ?" |
| 2 | 1.0s | Bot typing... + "🔍 Recherche dans vos documents..." |
| 3 | 2.5s | Bot : "J'ai trouvé le devis #D-2024-089 du 15 mars 2024 :" + DocumentPreview compact (Extension 40m² — 62 000€ HT) + source "Devis 2024 / Dossier Dupont" |
| 4 | 1.5s | User : "Et la marge sur ce projet ?" |
| 5 | 1.0s | Bot typing... |
| 6 | 2.0s | Bot : "Marge brute : 38% (23 560€)" + "Source : Bilan projet Dupont — clôturé sept. 2024" + suggestion "📄 Voir le dossier complet" |

### 5.4 — Reporting à la demande → `SimAssistantReporting.tsx`
**Titre** : "« CA du mois ? » — Réponse en 3 secondes"
**Device** : phone — "WhatsApp — Assistant IA"
**Scénario** : L'utilisateur demande des stats, l'assistant requête et répond.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | User : "CA du mois ?" |
| 2 | 1.0s | Bot typing... + "📊 Interrogation des données..." |
| 3 | 2.5s | Bot : "CA Février 2026 : **18 650€**" + comparaison "vs janvier : +12% ↑" + mini barres comparatives |
| 4 | 1.5s | User : "Détail par client ?" |
| 5 | 1.0s | Bot typing... |
| 6 | 2.0s | Bot : Top 5 clients (tableau : Client / Montant / % du CA) : "Dupont 5 200€ (28%)" / "Martin 3 800€ (20%)" / etc. |
| 7 | 1.5s | User : "Envoie ce rapport à la compta" |
| 8 | 1.5s | Bot : "✓ Rapport PDF envoyé à compta@entreprise.fr" + StatusBadge "Envoyé ✓" |

### 5.5 — Veille sectorielle → `SimAssistantVeille.tsx`
**Titre** : "Les actus de votre secteur, résumées chaque matin"
**Device** : phone — "WhatsApp — Assistant IA"
**Scénario** : L'assistant envoie un résumé des actualités du secteur.

| Step | Delay | Ce qui apparaît |
|------|-------|-----------------|
| 1 | 0.5s | Bot : "☀️ Bonjour ! Voici votre veille du 8 février :" |
| 2 | 2.0s | Actu 1 : "🏗️ **Nouvelle norme RE2025** — Entrée en vigueur avril. Impact sur vos devis isolation." + badge "Important" (rouge) |
| 3 | 2.0s | Actu 2 : "💰 **Aide MaPrimeRénov élargie** — Budget augmenté de 20%. Opportunité pour vos clients." + badge "Opportunité" (vert) |
| 4 | 2.0s | Actu 3 : "📊 **Étude INSEE construction** — Hausse de 8% des demandes de rénovation en Occitanie." + badge "Tendance" (bleu) |
| 5 | 1.5s | Bot : "💡 Mon analyse : la combinaison RE2025 + aides élargies va booster la demande. Je suggère de communiquer sur vos certifications." |
| 6 | 1.5s | User : "Partage ça à l'équipe" |
| 7 | 1.0s | Bot : "✓ Veille partagée avec 4 collaborateurs" + StatusBadge "Distribué ✓" |

---

## Intégration

Pour chaque nouvelle simulation :

1. **Créer le fichier** `components/slides/simulations/Sim{Nom}.tsx`
2. **L'ajouter dans la page du service** correspondante dans `app/{service}/page.tsx`
3. La page doit afficher toutes les simulations du service dans le Deck (après la simulation principale existante)

### Modification des pages (exemple mailing) :
```tsx
// app/mailing/page.tsx
import { SimMailing } from "@/components/slides/simulations/SimMailing";
import { SimMailingCold } from "@/components/slides/simulations/SimMailingCold";
import { SimMailingTransac } from "@/components/slides/simulations/SimMailingTransac";
import { SimMailingNewsletter } from "@/components/slides/simulations/SimMailingNewsletter";
import { SimMailingNurturing } from "@/components/slides/simulations/SimMailingNurturing";
import { SimMailingAnalyse } from "@/components/slides/simulations/SimMailingAnalyse";

// Dans le Deck, après les slides existantes :
<SimMailing />
<SimMailingCold />
<SimMailingTransac />
<SimMailingNewsletter />
<SimMailingNurturing />
<SimMailingAnalyse />
```

Même pattern pour les 4 autres services.

---

## Navigation : useCases cliquables → simulation

Sur le slide "La solution", chaque carte de possibilité (useCase) doit être **cliquable** et naviguer vers la simulation correspondante dans le Deck.

### Implémentation
Chaque useCase dans les data files doit avoir un champ `slideIndex` qui correspond à l'index du slide de sa simulation dans le Deck. Le `SolutionSlide` reçoit un callback `onNavigate(slideIndex)` qui déclenche la navigation dans le Deck.

### Modification du SolutionSlide
```tsx
interface UseCase {
  icon: string;
  label: string;
  description: string;
  slideIndex?: number; // index du slide simulation dans le Deck
}

interface SolutionSlideProps {
  title: string;
  steps: Step[];
  useCases?: UseCase[];
  onNavigate?: (slideIndex: number) => void; // callback navigation
}
```

Chaque carte useCase affiche un indicateur visuel cliquable (curseur pointer, hover effect, petite flèche →) et appelle `onNavigate(uc.slideIndex)` au clic.

### Modification du Deck
Le composant `Deck` doit exposer une méthode ou un état permettant de naviguer vers un slide par index. Le `SolutionSlide` doit pouvoir déclencher cette navigation.

Approche recommandée : passer `goToSlide` via props ou context depuis le Deck vers les slides enfants.
