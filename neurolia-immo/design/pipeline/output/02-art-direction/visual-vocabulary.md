# Vocabulaire Visuel - Neurolia-Immo

> D02-Art Direction | Phase D-A : Lexique visuel propre au projet
> Sources : 01-brand/colors.md, 01-brand/typography.md, references/, moodboard.md

---

## Principe

Ce document traduit chaque terme vague en valeurs concretes (px, ms, OKLCH). Tout designer ou developpeur doit pouvoir implementer n'importe quel element sans interpretation. Si un terme n'est pas defini ici, il ne doit pas etre utilise.

---

## 1. Espacements

Base : grille de 4px. Toutes les dimensions sont des multiples de 4.

| Terme | Valeur | Usage | Justification |
|-------|--------|-------|---------------|
| "padding ecran" | 16px | Marges laterales du contenu sur mobile (375-428px) | Consensus moodboard (Breezeway, Linear, Properly). Equilibre entre densite et respiration sur petit ecran. |
| "padding ecran tablette" | 20px | Marges laterales contenu sur tablette (640-1024px) | Espace supplementaire proportionnel a la largeur. |
| "padding ecran desktop" | 24px | Marges laterales contenu sur desktop (> 1024px) | Reference layout v1, coherent avec sidebar 256px. |
| "padding card" | 16px (mobile), 20px (desktop) | Marges internes de toute card | Mobile = compact ; desktop = aere. |
| "gap entre cards" | 12px (mobile), 16px (desktop) | Espace vertical entre 2 cards empilees | Suffisant pour distinguer les cards sans gaspiller l'espace vertical precieux sur mobile. |
| "gap sections" | 24px (mobile), 32px (desktop) | Espace entre 2 sections d'un meme ecran (ex: bloc Alertes et bloc Aujourd'hui) | Marque une rupture visuelle nette. |
| "gap interne compact" | 8px | Gap entre elements proches (icone et label, badge et texte) | Assure la lisibilite sans exces d'espace. |
| "gap form fields" | 16px | Espace vertical entre 2 champs de formulaire | Reference layout v1 (20px desktop, adapte 16px mobile). |
| "gap label-input" | 6px | Espace entre un label et son champ de saisie | Proximitie visuelle pour le rattachement Gestalt. |
| "gap input-help" | 4px | Espace entre un input et son message d'aide/erreur | Rattachement clair au champ. |
| "espace touch minimum" | 8px | Espace minimum entre 2 zones tactiles adjacentes | Apple HIG + Material Design : eviter les taps accidentels. |
| "margin section title" | 8px (bas) | Espace entre un titre de section et le premier element en dessous | Rattachement visuel titre/contenu. |
| "content padding bottom" | calc(56px + 16px + safe-area) | Padding bottom de la zone de contenu scrollable (mobile) | Evite que le contenu soit masque par la bottom tab. 56px (tab) + 16px (respiration) + safe area (~34px). |

---

## 2. Typographie

Police principale : Inter (variable font, Google Fonts).
Police monospace : JetBrains Mono (codes d'acces, references, WiFi).

| Terme | Valeur | Usage | Justification |
|-------|--------|-------|---------------|
| "titre ecran display" | Satoshi Bold, clamp(24px, 6vw, 32px), line-height 1.15, neutral-900 | Titre principal d'un ecran (H1 uniquement) — police display Neurolia DNA | Lien visuel avec l'ecosysteme Neurolia. Satoshi exclusivement reserve aux H1. |
| "titre ecran" | clamp(24px, 6vw, 32px), weight 700, line-height 1.15, neutral-900 | Titre principal d'un ecran (Dashboard, Calendrier, Planning) | Taille responsive, poids fort pour hierarchie claire sur mobile. |
| "titre section" | clamp(20px, 5vw, 26px), weight 600, line-height 1.2, neutral-800 | Sous-titres de blocs (Alertes, Aujourd'hui, Cette semaine, Mes biens) | Distinction nette avec le titre ecran (-4px et weight -100). |
| "titre card" | clamp(18px, 4.5vw, 22px), weight 600, line-height 1.3, neutral-800 | Nom de bien dans une card, nom de tache | Lisible en scan rapide, semibold pour ancrer l'oeil. |
| "texte courant" | 16px, weight 400, line-height 1.5, neutral-700 | Descriptions, contenu de carte, paragraphes | Taille de reference, jamais en dessous pour du contenu informatif principal. |
| "texte secondaire" | 14px, weight 400, line-height 1.4, neutral-500 | Descriptions courtes, adresses, texte d'aide, labels secondaires | Minimum absolu pour du texte informatif lisible sur mobile (persona Staff sur le terrain). |
| "metadata" | 12px, weight 400, line-height 1.3, neutral-400 | Timestamps, references, source plateforme, labels de section uppercase | Uniquement pour info non-critique. Minimum absolu de l'application. |
| "valeur KPI" | clamp(24px, 6vw, 30px), weight 700, line-height 1.2, neutral-900, tabular-nums | Chiffres KPI sur le Dashboard (taux d'occupation, revenus, reservations) | Impact visuel, chiffres tabulaires pour alignement. |
| "label KPI" | 14px, weight 500, line-height 1.0, neutral-500 | Label sous la valeur KPI | Discret, guide l'interpretation du chiffre. |
| "variation KPI positive" | 14px, weight 600, line-height 1.0, success-600 | "+12% vs mois dernier" | Vert + semibold = feedback positif immediat. |
| "variation KPI negative" | 14px, weight 600, line-height 1.0, error-600 | "-5% vs mois dernier" | Rouge + semibold = alerte visuelle. |
| "label bouton" | 16px (lg) / 14px (md), weight 600, line-height 1.0 | Texte des boutons sur mobile | 16px lg = boutons principaux (zone 44px). 14px md = boutons secondaires. |
| "label tab" | 12px, weight 500, line-height 1.0 | Labels des items bottom tab bar | Compact, lisible, standard mobile. |
| "input texte" | 16px, weight 400, line-height 1.5, neutral-900 | Texte saisi dans les champs de formulaire | 16px obligatoire : evite le zoom automatique iOS Safari. |
| "placeholder" | 16px, weight 400, line-height 1.5, neutral-400 | Texte indicatif dans un champ vide | Meme taille que l'input, couleur attenuee. |
| "label formulaire" | 14px, weight 500, line-height 1.0, neutral-700 | Labels au-dessus des champs | Medium pour distinction visuelle avec le texte courant. |
| "code monospace" | 14px, weight 400, line-height 1.3, JetBrains Mono, neutral-800, fond neutral-100 | Codes d'acces, references reservation, WiFi password | Monospace pour lisibilite sans ambiguite (0/O, 1/l). |
| "code acces gros" | 20px, weight 600, line-height 1.2, JetBrains Mono, neutral-900, fond neutral-100, padding 12px 16px, border-radius 8px | Code d'acces sur l'ecran Infos Bien (Staff, devant la porte) | Gros, visible, copiable en 1 tap. Persona Staff avec telephone a 1 main. |
| "badge texte" | 12px, weight 600, line-height 1.0, uppercase, tracking 0.04em | Texte dans les badges de statut et plateforme | Compact, distinct du texte courant, convention dashboard. |
| "en-tete section" | 12px, weight 500, line-height 1.0, neutral-500, uppercase, tracking 0.04em | En-tetes de groupes dans les listes (ex: "AUJOURD'HUI", "DEMAIN") | Convention iOS native, separation visuelle par groupe. |

### Regles typographiques strictes

- **Minimum absolu texte informatif** : 14px (Body Small). Jamais de contenu lisible en dessous.
- **Minimum absolu metadata** : 12px (Caption). Uniquement timestamps, references, labels non-critiques.
- **Aucun texte** en dessous de 12px dans toute l'application.
- **Input toujours 16px** : previent le zoom automatique iOS Safari.
- **Italic interdit** : peu lisible en petite taille sur mobile. Utiliser couleur ou poids pour differencier.
- **Gras (700) reserve** : titres d'ecrans, valeurs KPI uniquement. Pas de gras dans le texte courant.
- **Majuscules reservees** : badges, en-tetes de section, labels de colonne. Jamais sur du texte courant (reduit la lisibilite de 13-18% selon les etudes).
- **Troncature** : titres max 2 lignes (line-clamp: 2), descriptions max 3 lignes (line-clamp: 3), adresses 1 ligne (text-overflow: ellipsis).

---

## 3. Transitions & Animations

Principe : toutes les animations sont fonctionnelles, jamais decoratives. L'utilisateur ne doit jamais attendre une animation.

| Terme | Valeur | Usage | Justification |
|-------|--------|-------|---------------|
| "transition standard" | 200ms ease-out | Changements d'etat visuels (fond hover card, couleur bouton, bordure input focus) | Duree percue comme instantanee mais visible. ease-out = deceleration naturelle. |
| "transition rapide" | 150ms ease-out | Micro-interactions (hover bouton, apparition tooltip, changement de couleur) | Feedback immediat sans delai perceptible. |
| "navigation push" | 250ms ease-out, translateX(100%) vers translateX(0) | Transition entre ecrans dans un stack (ex: Planning → Fiche Intervention) | Standard mobile natif, suffisamment rapide pour navigation frequente Staff. |
| "navigation pop" | 250ms ease-out, translateX(0) vers translateX(-30%) pour l'ecran sortant | Retour arriere dans un stack (Fiche → Planning) | Symetrique du push, feedback de direction. |
| "bottom sheet entree" | 350ms cubic-bezier(0.32, 0.72, 0, 1), translateY(100%) vers translateY(0) | Ouverture bottom sheet (filtres, actions contextuelles) | Reference Airbnb Host. Courbe naturelle avec elan initial + deceleration. |
| "bottom sheet sortie" | 250ms cubic-bezier(0.32, 0.72, 0, 1), translateY(0) vers translateY(100%) | Fermeture bottom sheet (swipe down ou tap overlay) | Plus rapide que l'entree (l'utilisateur a decide de fermer). |
| "modal entree" | 200ms ease-out, scale(0.95) + opacity(0) vers scale(1) + opacity(1) | Ouverture de modale de confirmation | Subtil, rapide, convention Material Design. |
| "modal sortie" | 150ms ease-in, scale(1) + opacity(1) vers scale(0.97) + opacity(0) | Fermeture de modale | Plus rapide que l'entree, disparition nette. |
| "toast entree" | 300ms ease-out, translateY(-16px) + opacity(0) vers translateY(0) + opacity(1) | Apparition toast en haut de l'ecran (mobile) | Glissement leger depuis le haut, attire l'attention sans brusquer. |
| "toast sortie" | 200ms ease-in, opacity(1) vers opacity(0) | Disparition du toast apres 4000ms | Fade simple, pas de mouvement. |
| "toast auto-dismiss" | 4000ms | Duree d'affichage par defaut d'un toast | Assez long pour lire 2 lignes. Les erreurs restent affichees (dismiss manuel). |
| "skeleton pulse" | 1500ms ease-in-out infinite, opacite oscillante 0.4 vers 1.0 | Animation des zones skeleton pendant le chargement | Reference Airbnb Host. Rythme calme, pas stressant. |
| "spinner rotation" | 600ms linear infinite | Rotation du spinner dans les boutons loading | Convention universelle, duree courte = sensation de rapidite. |
| "press feedback" | scale(0.97), 100ms ease-out | Retour tactile au tap sur un bouton ou une card cliquable | Feedback haptique visuel, confirme le tap sans delay. |
| "flash realtime" | fond primary-50 pendant 500ms, puis fade-out 300ms vers transparent | Signal qu'une donnee a ete mise a jour en temps reel (Supabase Realtime) | Attire l'attention sur l'element modifie sans distraire du reste. |
| "pull-to-refresh" | apparition spinner apres 60px de pull, release = fetch | Rechargement des donnees par geste natif sur les listes | Convention mobile, controle utilisateur. Seuil 60px = assez pour etre intentionnel. |
| "swipe dismiss" | vitesse > 500px/s ou distance > 40% de la largeur = dismiss | Fermeture d'un bottom sheet ou d'une notification par swipe | Convention iOS/Android pour les gestes de rejet. |

### Animations interdites

| Animation | Raison |
|-----------|--------|
| Bounce / Spring | Trop ludique, viole l'archetype Souverain (maitrise, previsibilite) |
| Parallax | Non pertinent pour un dashboard operationnel |
| Confettis / Particules | Viole le ton neutre de la marque (pas de "Super !") |
| Scroll-triggered animations | Contenu = donnees, pas un site marketing |
| Animations > 400ms | Sensation de lenteur, bloque l'utilisateur |
| transition: all | Transite des proprietes inattendues, cause des layout shifts |

### Reduce Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Exceptions maintenues : spinner de chargement (essentiel a la comprehension), skeleton passe en fond statique neutral-150.

---

## 4. Couleurs

Palette complete definie dans `01-brand/colors.md`. Ce vocabulaire traduit les usages visuels.

| Terme | Valeur OKLCH | Usage | Justification |
|-------|-------------|-------|---------------|
| "fond page" | oklch(0.985 0.002 260) | Fond global de toute l'application | Gris tres clair neutre-froid. Distingue la page des cards blanches. |
| "surface card" | oklch(0.998 0.000 0) | Fond de toute card, panneau, modale | Blanc pur. Contraste subtil avec le fond page. |
| "surface enfonced" | oklch(0.955 0.004 260) | Fond des inputs, zones en retrait | Plus sombre que le fond page, cree une concavite visuelle. |
| "texte principal" | oklch(0.210 0.015 260) | Titres forts, valeurs KPI, noms importants | Quasi-noir avec legere teinte froide. Contraste ~12:1 sur fond page. |
| "texte courant" | oklch(0.390 0.015 260) | Texte de paragraphe, contenu de carte | Suffisamment sombre pour etre lisible (ratio ~7.5:1), pas aussi lourd que les titres. |
| "texte secondaire" | oklch(0.590 0.013 260) | Labels, texte d'aide, metadata non-critique | Gris moyen, s'efface devant le texte courant. Ratio ~4.6:1 = conforme AA. |
| "texte desactive" | oklch(0.710 0.010 260) | Placeholders, texte d'elements desactives | Clairement inactif, non confondu avec du texte lisible. |
| "bordure legere" | oklch(0.900 0.005 260) | Bordures de cards, separateurs, inputs au repos | Visible sans etre prononcee. 1px solid. |
| "bordure visible" | oklch(0.830 0.007 260) | Bordures hover (input, card), icones inactives | Un cran plus fonce, feedback hover perceptible. |
| "accent primaire" | oklch(0.580 0.115 250) | Boutons CTA, liens, onglet actif, icone tab active | Bleu-ardoise discret. Ne conflit pas avec rose Airbnb ni bleu Booking. Ratio ~5.2:1 sur fond clair. |
| "accent agence" | oklch(0.58 0.14 35) | Barre signature 4px, tab indicator actif, accents ponctuels Neurolia DNA | Terracotta Neurolia. Surface < 5%. Ne remplace PAS la couleur primaire. |
| "barre signature" | border-left: 4px solid accent-agency | Appliquee sur titres de section cles pour marquer l'ADN Neurolia | Accent decoratif vertical terracotta, marqueur d'identite agence. |
| "accent pressed" | oklch(0.420 0.110 250) | Etat pressed/active d'un element primaire | Plus fonce de -0.16 L. Feedback tactile visible. |
| "accent hover" | oklch(0.500 0.115 250) | Etat hover bouton primaire (desktop) | Plus fonce de -0.08 L. |
| "surface selection" | oklch(0.970 0.010 250) | Fond de l'onglet actif, fond de ligne selectionnee dans table | Bleu tres leger, pas de saturation forte. |
| "couleur succes" | oklch(0.650 0.170 155) | Badges "Confirme", "Termine", icones check, menage valide | Vert vif, associe universellement au succes. |
| "fond succes" | oklch(0.930 0.055 155) | Fond de badge "Confirme", fond notification succes | Vert tres clair, lisible avec texte success-700. |
| "couleur erreur" | oklch(0.580 0.200 25) | Badges "Annule", erreurs formulaire, suppression | Rouge vif, alerte immediate. |
| "fond erreur" | oklch(0.930 0.045 25) | Fond de badge "Annule", fond notification erreur | Rouge tres clair. |
| "couleur alerte" | oklch(0.770 0.170 75) | Badges "En attente", anomalies, avertissements | Jaune-ambre, attention requise mais pas urgente. |
| "fond alerte" | oklch(0.940 0.070 85) | Fond de badge "En attente", fond notification alerte | Jaune tres clair. |
| "couleur info" | oklch(0.580 0.140 240) | Badges "En cours", infos contextuelles | Bleu info, neutre et informatif. |
| "fond info" | oklch(0.930 0.040 240) | Fond de badge "En cours", fond notification info | Bleu tres clair. |
| "couleur Airbnb" | oklch(0.640 0.190 20) | Dots, barres calendrier, badges source Airbnb | Rose/rouge derive de #FF5A5F. Identite Airbnb reconnaissable. |
| "couleur Booking" | oklch(0.430 0.150 245) | Dots, barres calendrier, badges source Booking | Bleu fonce derive de #003580. Identite Booking reconnaissable. |
| "couleur Manuel" | oklch(0.590 0.013 260) | Dots, barres calendrier, badges source Manuel | Gris neutre, discret, non-plateforme. |
| "overlay modale" | oklch(0 0 0 / 0.5) | Fond semi-transparent derriere modale et bottom sheet | Standard material, obscurcit le contenu sans le masquer totalement. |
| "accent couleur < 10%" | Maximum 10% de la surface visible | Surface couverte par la couleur primaire sur un ecran donne | Le bleu-ardoise reste un accent, pas une dominante. Coherent avec l'archetype Souverain (sobriete). |

---

## 5. Formes

| Terme | Valeur | Usage | Justification |
|-------|--------|-------|---------------|
| "coins card" | border-radius: 10px | Toutes les cards (reservation, propriete, tache, KPI) | Radius ajuste Neurolia DNA (10px vs 12px standard). Legerement plus tendu, professionnel. |
| "coins bouton" | border-radius: 6px | Tous les boutons rectangulaires | Radius ajuste Neurolia DNA (6px vs 8px standard). Discret, professionnel. |
| "coins input" | border-radius: 6px | Champs de saisie, textareas, selects | Coherent avec les boutons. |
| "coins badge" | border-radius: 6px | Badges de statut, badges plateforme | Plus petit que les cards, distinction hierarchique. |
| "coins chip" | border-radius: 999px | Tags filtres, pills de selection | Forme pilule, convention Material Design pour les filtres. |
| "coins avatar" | border-radius: 50% | Avatars profil, initiales | Cercle standard pour les identites visuelles. |
| "coins bottom sheet" | border-radius: 16px 16px 0 0 | Coins superieurs du bottom sheet | Plus arrondi que les cards pour marquer le pattern "feuille glissante". |
| "coins modale" | border-radius: 10px | Modales de confirmation (desktop) | Identique aux cards (10px), coherence visuelle Neurolia DNA. |
| "dot plateforme" | 8px cercle plein | Indicateur source reservation (Airbnb, Booking, Manuel) | Compact, reconnaissable, colore selon la plateforme. |
| "dot statut" | 8px cercle plein | Indicateur de statut dans les listes | Vert/orange/rouge/bleu selon le statut semantique. |
| "barre calendrier" | height 28px, border-radius 6px, border-left 3px solid [couleur plateforme] | Barre de reservation sur le calendrier mois | Reference Guesty. Compacte, coloree par plateforme. |
| "handle bottom sheet" | 36px x 4px, border-radius 2px, couleur neutral-300, centre horizontal | Poignee de glissement en haut du bottom sheet | Convention iOS/Android, affordance de drag. |
| "separateur liste" | 1px solid neutral-200 (border-bottom) | Separation entre items dans une liste (pas de gap) | Reference Linear/Notion. Dense, professionnel. |
| "divider section" | 1px solid neutral-200, margin vertical 16px | Separation entre sections dans un ecran | Plus espace que le separateur liste, marque un changement de contexte. |
| "icone taille standard" | 20px, stroke-width 2, Lucide Icons outline | Icones dans la navigation, les boutons, les labels | Standard Lucide, coherent avec la taille du texte. |
| "icone empty state" | 48px, stroke-width 1.5, couleur neutral-300 | Illustration des ecrans vides | Grande pour capter l'attention, couleur attenuee. |
| "icone toast" | 20px, couleur semantique correspondante | Icone a gauche du titre dans un toast | Check/X/Triangle/Info selon le type. |

---

## 6. Ombres

| Terme | Valeur | Usage | Justification |
|-------|--------|-------|---------------|
| "ombre card" | 0 1px 3px oklch(0 0 0 / 0.04), 0 1px 2px oklch(0 0 0 / 0.06) | Cards au repos (reservation, propriete, tache, KPI) | Legere, a peine perceptible. Donne de la profondeur sans lourdeur. Reference Linear. |
| "ombre elevee" | 0 4px 12px oklch(0 0 0 / 0.08), 0 2px 4px oklch(0 0 0 / 0.04) | Bottom sheets, modales, dropdowns | Marque clairement l'elevation au-dessus du contenu. |
| "ombre navigation bottom" | 0 -1px 3px oklch(0 0 0 / 0.05) | Bord superieur de la bottom tab bar | Subtile, separe la tab bar du contenu scrollable. Direction vers le haut (Y negatif). |
| "ombre bouton sticky" | 0 -2px 8px oklch(0 0 0 / 0.08) | Bouton CTA sticky bottom (Fiche Intervention Staff) | Signal que le bouton flotte au-dessus du contenu scrollable. Reference Properly. |
| "ombre header" | 0 1px 3px oklch(0 0 0 / 0.04) | Header fixe en haut de l'ecran (visible au scroll) | Apparait uniquement quand le contenu scrolle sous le header. Feedback de profondeur. |
| "pas d'ombre" | none | Cards avec bordure visible (bordure seule suffit), elements inline | Si une card a deja une bordure 1px solid neutral-200, l'ombre est optionnelle. Eviter le double signal visuel. |

### Regles d'ombres

- **Jamais d'ombres colorees** : toujours oklch(0 0 0 / opacite). Pas de bleu, pas de couleur primaire dans les ombres.
- **Jamais d'ombres internes (inset)** : sauf pour l'anneau de focus (qui est un box-shadow, pas une ombre au sens visuel).
- **Ombre OU bordure, rarement les deux** : si une card a une bordure visible, l'ombre est redondante.
- **Ombres adaptees au contexte** : les cards utilisent ombre card (legere), les elements superposes utilisent ombre elevee (prononcee).

---

*Document genere le 2026-02-20 -- D02-Art Direction / Visual Vocabulary*
