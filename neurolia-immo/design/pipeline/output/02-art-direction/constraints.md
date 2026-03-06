# Contraintes Design - Neurolia-Immo

> D02-Art Direction | Phase D-A : Regles non-negociables mobile
> Sources : 01-brand/, references/constraints.md, moodboard.md, visual-vocabulary.md

---

## Principe

Ces regles sont **non-negociables**. Aucune exception sans validation explicite. Chaque regle est justifiee par une valeur de marque, une convention mobile, ou une reference visuelle analysee.

---

## ON FAIT (obligatoire)

### 1. Touch targets minimum 44x44px sur mobile

Toute zone interactive (bouton, checkbox, item de liste, icone-bouton, lien) a une zone tactile d'au moins 44x44px. La zone visuelle peut etre plus petite (ex: checkbox 20px), mais le padding invisible etend la zone tactile a 44px.

**Justification** : Apple HIG (44pt) + Material Design (48dp recommande, 44dp minimum). Le persona Staff utilise l'app a une main, debout, entre deux logements. Les erreurs de tap sont inacceptables.

### 2. Bottom tab navigation pour les ecrans principaux

- Owner : 3 tabs (Accueil, Calendrier, Gestion). Height 56px + env(safe-area-inset-bottom).
- Staff : 2 tabs (Planning, Profil). Height 56px + env(safe-area-inset-bottom).
- Icones 24px outline (Lucide) + label 12px medium. Tab active : primary-500. Tab inactive : neutral-400.

**Justification** : Convention universelle mobile (7/7 references moodboard). Zone pouce accessible. Nombre de tabs limite (3 max Owner, 2 Staff) pour clarte. Archetype Souverain : navigation previsible.

### 3. Contenu scrollable verticalement, jamais horizontalement

Le scroll principal est toujours vertical. Pas de scroll horizontal sur la page. Les tables desktop se transforment en cards sur mobile. Le calendrier grille se transforme en liste sur mobile.

**Justification** : Geste naturel du pouce. Le scroll horizontal cache du contenu sans affordance (4/7 references moodboard n'utilisent aucun scroll horizontal).

### 4. Safe areas respectees sur tous les devices

- Header : respect env(safe-area-inset-top) pour l'encoche et Dynamic Island.
- Bottom tab : respect env(safe-area-inset-bottom) pour la barre home.
- Bords lateraux : respect env(safe-area-inset-left/right) en mode paysage.

**Justification** : Contenu lisible et interactif sur tous les smartphones modernes (iPhone 12+ avec encoche, iPhone 14+ avec Dynamic Island, Android avec poincon camera).

### 5. Skeleton screens pendant le chargement de donnees

Chaque vue qui fetche des donnees depuis Supabase affiche un skeleton fidele a la forme du composant final. Pas de spinner seul au centre. Pas d'ecran vide.

| Vue | Skeleton |
|-----|----------|
| Dashboard | 1 card alerte skeleton + 3 lignes arrivees/departs + 2x2 KPI rectangles |
| Calendrier mois | Grille avec en-tete reel + cellules avec barres skeleton |
| Planning Staff | 3-4 cards tache skeleton empilees |
| Fiche bien | Skeleton des champs (titre + 4 rectangles texte) |
| Fiche intervention | Skeleton checklist (6 lignes avec checkbox + texte) |

**Justification** : Perception de rapidite (reference Airbnb Host, Linear). Valeur marque Fiabilite : l'app repond toujours, meme pendant le fetch. Skeleton pulse : 1500ms ease-in-out, opacite 0.4-1.0.

### 6. Pull-to-refresh sur les listes et le dashboard

Geste pull-down sur : Dashboard Owner, Calendrier, Planning Staff, Liste Proprietes. Seuil de declenchement : 60px de pull. Spinner 24px visible pendant le fetch.

**Justification** : Convention mobile (5/7 references moodboard). Controle utilisateur : "Je veux les dernieres donnees". Valeur marque Fiabilite.

### 7. Etats vides illustres avec CTA d'action

Chaque liste ou vue pouvant etre vide affiche : icone large 48px (neutral-300) + titre 16px medium neutral-700 + description 14px regular neutral-500 + bouton CTA (si action possible). Centre vertical dans la zone de contenu.

| Vue | Icone | Titre | CTA |
|-----|-------|-------|-----|
| Aucune reservation | Calendar | "Aucune reservation pour cette periode." | — |
| Aucun bien | Home | "Ajoutez votre premier bien pour commencer." | "Ajouter un bien" |
| Aucune tache (Staff) | Sun | "Rien de prevu aujourd'hui. Bonne journee !" | — |
| Aucun staff | Users | "Invitez votre premier collaborateur." | "Inviter" |
| Aucun resultat recherche | Search | "Aucun resultat pour cette recherche." | "Reinitialiser" |

**Justification** : Valeur marque Clarte + Soignant (bienveillance). Pas d'ecran mort. Reference Notion, Airbnb Host. Le persona Staff ne doit jamais etre face a un ecran incomprehensible.

### 8. Typographie minimum 14px pour tout texte informatif

Tout texte que l'utilisateur doit lire et comprendre est au minimum 14px (Body Small). Exception unique : metadata non-critique (timestamps, references) a 12px, sous reserve de contraste suffisant (neutral-400 minimum sur fond clair).

**Justification** : Persona Staff : digital literacy debutante, telephone utilise debout a une main, possiblement en plein soleil. 14px = lisible sans zoom. 12px = metadata uniquement.

### 9. Inputs a 16px pour eviter le zoom iOS Safari

Tous les champs de saisie (input, textarea, select) utilisent font-size 16px. Pas de taille inferieure.

**Justification** : Safari iOS zoom automatiquement quand le font-size d'un input est inferieur a 16px. Ce zoom desoriente l'utilisateur et decale le viewport. Bug verifie sur toutes les versions iOS recentes.

### 10. Indicateurs de scroll pour les listes horizontales

Si un contenu scroll horizontalement (cas rare : barres de filtres, chips de selection), un indicateur visuel signale qu'il y a plus de contenu (gradient de fade-out a droite, ou dots de pagination).

**Justification** : Affordance : l'utilisateur sait qu'il peut scroller. Valeur marque Clarte. Sans indicateur, le contenu a droite est invisible.

### 11. Couleurs semantiques coherentes dans toute l'application

| Semantique | Couleur | Usage exclusif |
|------------|---------|---------------|
| Succes/Confirme/Termine | success-500 oklch(0.650 0.170 155) | Badges "Confirme", "Termine", check, validation |
| Erreur/Annule/Danger | error-500 oklch(0.580 0.200 25) | Badges "Annule", erreurs, suppression |
| Alerte/En attente | warning-500 oklch(0.770 0.170 75) | Badges "En attente", anomalies |
| Info/En cours | info-500 oklch(0.580 0.140 240) | Badges "En cours", informations contextuelles |

Pas de melange : le vert ne signifie jamais "alerte", le rouge ne signifie jamais "succes".

**Justification** : Valeur marque Clarte. Convention universelle. Le proprietaire scan le Dashboard en 5 secondes : les couleurs communiquent le statut avant le texte.

### 12. Navigation adaptee au role

L'interface s'adapte au role de l'utilisateur connecte. Le Staff ne voit jamais les ecrans Owner (KPIs, revenus, gestion des biens). L'Owner ne voit jamais le Planning Staff. Deux applications dans une seule codebase.

**Justification** : Valeur marque Simplicite. Persona Staff (Freins) : "ne veut voir que ce qui la concerne". Prisme de Kapferer (Relation) : "l'application s'adapte au role sans que l'utilisateur ait a le demander".

### 13. Hierarchie visuelle par urgence sur le Dashboard Owner

Ordre strict sur le Dashboard : (1) Alertes (rouge/orange, en haut), (2) Aujourd'hui (arrivees, departs, suivi menages), (3) Cette semaine (KPIs, resume). L'oeil descend du plus urgent au moins urgent.

**Justification** : Archetype Souverain (controle, ordre). Le proprietaire lit le dashboard de haut en bas : si tout est au vert, 5 secondes suffisent. Si une alerte existe, elle est immediatement visible.

### 14. Boutons CTA principaux en bas de l'ecran (zone pouce)

Les actions principales (Commencer, Terminer, Enregistrer, Ajouter un bien) sont placees en bas de l'ecran mobile, dans la zone facilement accessible au pouce. Sur la Fiche Intervention Staff, le bouton est sticky bottom.

**Justification** : Thumb zone : la zone basse de l'ecran est la plus accessible en usage une main. Reference Breezeway + Properly. Persona Staff : telephone a une main, entre deux logements.

### 15. Accessibilite WCAG 2.1 AA sur toute l'interface

- Contraste texte courant : ratio >= 4.5:1 sur fond clair
- Contraste texte large (>= 18px ou >= 14px bold) : ratio >= 3:1
- Focus visible sur tous les elements interactifs (:focus-visible uniquement)
- Anneau de focus : 0 0 0 2px surface-card, 0 0 0 4px primary-500
- aria-label sur tous les icone-boutons sans label texte
- Semantique HTML native (button, a, form, label, table, nav)
- prefers-reduced-motion respecte

**Justification** : Standard legal et ethique. Persona Staff : ecran en plein soleil, utilisation dans des conditions non optimales.

---

## ON NE FAIT PAS (interdit)

### 1. Hover effects comme interaction principale

Pas de contenu accessible uniquement au hover (tooltip obligatoire = interdit, sous-menu au hover = interdit). Les tooltips sont un complement, pas le seul acces a l'information.

**Pourquoi** : Pas de curseur sur mobile. Le persona Staff est 100% tactile. Tout contenu doit etre accessible au tap.

### 2. Texte inferieur a 14px pour du contenu informatif

Aucune description, aide, label ou contenu lisible en dessous de 14px. Exception unique : metadata non-critique (timestamps, references de reservation) a 12px.

**Pourquoi** : Illisible sur petit ecran, en particulier pour le persona Staff (digital literacy debutante, telephone tenu a une main). Reference 01-brand/typography.md.

### 3. Menu hamburger comme navigation principale

La navigation principale est toujours visible via bottom tabs. Pas de hamburger menu cachant les ecrans principaux. Le hamburger est autorise uniquement en complement pour des actions secondaires (parametres avances sur desktop).

**Pourquoi** : Le hamburger masque la navigation et reduit la decouverte de 50% (etude NNGroup). 6/7 references moodboard utilisent une bottom tab bar visible.

### 4. Scroll horizontal sans indicateur

Si un contenu scroll horizontalement, un indicateur visuel (gradient, dots, fleche) est obligatoire. Le scroll horizontal sur le body de la page est interdit dans tous les cas.

**Pourquoi** : Contenu invisible = contenu inexistant pour l'utilisateur. Valeur marque Clarte : tout est visible ou signale comme accessible.

### 5. Modals plein ecran pour des actions simples

Les confirmations, selections de filtres, et actions rapides utilisent des bottom sheets (mobile) ou des modales compactes (desktop, max 480px). Pas de modales plein ecran sauf pour les formulaires complexes multi-etapes.

**Pourquoi** : Desorientant sur mobile, perte du contexte. Le bottom sheet garde la page visible en arriere-plan. Reference Airbnb Host.

### 6. Formulaires longs sur un seul ecran

Tout formulaire de plus de 6 champs est decoupe en etapes (stepper). L'onboarding est en 3 etapes. L'ajout de bien est en 1-2 etapes. Pas de formulaire qui scroll sur plus de 2 ecrans.

**Pourquoi** : Decourageant sur mobile, taux d'abandon qui augmente avec le nombre de champs visibles. Valeur marque Simplicite. Persona Owner (Freins) : "Si l'outil demande plus de 10 minutes, il abandonne."

### 7. Animations de plus de 400ms

Aucune animation fonctionnelle ne depasse 400ms. La plupart sont a 200-250ms. Seules les boucles (skeleton 1500ms, spinner 600ms) depassent cette limite car elles sont continues.

**Pourquoi** : Sensation de lenteur sur mobile. L'utilisateur percoit un delai a partir de 300ms. Reference constraints v1 (300ms max strictement pour les transitions discretes, 400ms tolerance pour les bottom sheets).

### 8. Texte centre sur plus de 3 lignes

Le texte de plus de 3 lignes est aligne a gauche. L'alignement centre est reserve aux : titres courts (1-2 lignes), contenu d'empty states (titre + description courte), boutons.

**Pourquoi** : Le texte centre est plus difficile a lire en longueur car l'oeil perd le point de retour en debut de ligne. Valeur marque Clarte.

### 9. Images sans lazy loading

Toute image sous le fold utilise loading="lazy". Les miniatures de propriete, photos de checklist, avatars en liste sont lazy-loaded.

**Pourquoi** : Performance mobile, economies de data. Le persona Staff est souvent sur le terrain avec une connexion variable (4G/3G).

### 10. Actions destructives sans confirmation

Toute suppression (bien, tache, agent) passe par un dialog de confirmation avec : icone danger (error-500), titre clair ("Supprimer ce bien ?"), description ("Cette action est irreversible."), bouton "Annuler" (secondary) + bouton "Supprimer" (danger).

**Pourquoi** : Erreurs tactiles frequentes sur mobile. Le persona Staff peut taper accidentellement en tenant son telephone a une main. Valeur marque Fiabilite : pas d'action irreversible par accident.

### 11. Couleurs hardcodees (hex, rgb) dans le code

Toutes les couleurs utilisent les tokens OKLCH definis dans 01-brand/colors.md. Pas de #333333, pas de rgb(0,0,0). Les variables CSS (--color-*) sont la seule source.

**Pourquoi** : Coherence visuelle, preparation dark mode, maintenabilite. Contourner les tokens cree une dette design impossible a tracer.

### 12. Gradients decoratifs, ombres colorees, effets visuels

Pas de gradient de fond, pas d'ombre bleutee ou coloree, pas de glow, pas de blur decoratif. Les ombres sont toujours oklch(0 0 0 / opacite).

**Pourquoi** : Viole le ton sobre de la marque. Archetype Souverain : maitrise et retenue. Personnalite de marque : "discrete, l'UI s'efface devant les donnees".

### 13. Carousel, slider, parallax

Pas de carousel d'images, pas de slider de contenu, pas de parallax scrolling. Le contenu est en liste scrollable verticale ou en grille.

**Pourquoi** : Mauvaise UX sur mobile pour des donnees operationnelles. Contenu masque, pas decouvrable. 0/7 references moodboard utilisent ces patterns.

### 14. Plus de 4 niveaux typographiques sur un ecran

Chaque ecran utilise au maximum 4 niveaux de taille : titre ecran + titre section + texte courant + metadata. Pas de 5e niveau intermediaire.

**Pourquoi** : Hierarchie confuse au-dela de 4 niveaux. L'oeil ne peut pas distinguer plus de 4 tailles sur un ecran de 375px. Reference 01-brand/typography.md.

### 15. Italic, soulignes decoratifs, effets de texte

Pas d'italique (peu lisible en petite taille sur mobile). Pas de souligne sauf pour les liens actifs. Pas de text-shadow, text-stroke, ou transformation visuelle du texte.

**Pourquoi** : Lisibilite sur petit ecran. Inter en italique perd en lisibilite sous 16px. Le poids (bold/semibold) et la couleur suffisent pour creer de la distinction.

---

## Patterns de Navigation

| Pattern | Quand utiliser | Implementation |
|---------|---------------|----------------|
| Bottom Tab Bar | Ecrans principaux du role | 56px height + safe area, icones 24px + label 12px, max 3 tabs (Owner) ou 2 tabs (Staff) |
| Stack Navigation | Ecrans de detail et flux sequentiels | Header 56px avec bouton back, transition push 250ms ease-out |
| Bottom Sheet | Actions contextuelles, filtres, selection rapide | Slide from bottom 350ms, handle 36x4px, draggable, overlay oklch(0 0 0 / 0.5) |
| Modal | Confirmations critiques uniquement | Overlay centre, scale(0.95) entree 200ms, max 480px largeur |
| Deep Link | Acces direct depuis notification push | Notification → ecran concerne (fiche intervention, detail reservation, detail anomalie) |

---

## Zones Tactiles

```
+-----------------------------------+
|   Status Bar (safe area top)      |  <- Ne pas utiliser pour du contenu
+-----------------------------------+
|   Header (56px)                   |  <- Titre + actions (back, filtres)
+-----------------------------------+
|                                   |
|   Zone de contenu scrollable      |  <- Scroll vertical uniquement
|   (thumb friendly zone)           |
|                                   |
|   Actions principales en bas      |  <- CTA sticky si necessaire
|                                   |
+-----------------------------------+
|   Bottom Tab (56px)               |  <- Navigation principale
+-----------------------------------+
|   Home Bar (safe area bottom)     |  <- Ne pas utiliser
+-----------------------------------+
```

### Thumb Zone (accessibilite pouce — main droite)

```
+-----------------------------------+
|  DIFFICILE  |    DIFFICILE        |
+-------------+                     |
|             |    OK               |
|     OK      |                     |
|             +---------------------+
+-------------+                     |
|             |    FACILE           |
|    FACILE   |                     |
+-----------------------------------+
```

Les actions principales (CTA, bottom tab, bouton terminer) sont dans la zone FACILE (moitie basse de l'ecran). Les actions secondaires (filtres, parametres) peuvent etre en zone OK (milieu). Les zones DIFFICILE (coins superieurs) sont reservees aux actions rares (back, close).

---

## Test Rapide "Est-ce Neurolia-Immo ?"

Un ecran est conforme a la direction artistique si :

- [ ] **Sobre** : Les couleurs vives representent < 10% de la surface. Le reste est neutre (gris/blanc).
- [ ] **Dense mais clair** : L'information est compacte mais chaque element a sa hierarchie (taille, poids, couleur).
- [ ] **Fiable** : Le statut de chaque element est visible instantanement (badge, dot, couleur semantique).
- [ ] **Tactile** : Tous les elements interactifs ont une zone >= 44px et sont dans la zone pouce.
- [ ] **Role-adapte** : Le Staff ne voit que ce qui le concerne (planning, checklist). L'Owner ne voit pas le planning Staff.
- [ ] **DNA Neurolia** : Les H1 sont en Satoshi Bold ?
- [ ] **DNA Neurolia** : La barre signature terracotta (4px) est visible sur au moins un titre de section ?
- [ ] **DNA Neurolia** : Le tab indicator utilise l'accent agence (terracotta) ?
- [ ] **DNA Neurolia** : Les radius sont 10px (cards) / 6px (buttons, inputs) ?

> 5/5 criteres de base = Conforme | < 4/5 = Revoir la mise en page
> DNA Neurolia : 4/4 = Marque parent integree | < 3/4 = Verifier les marqueurs Neurolia

---

*Document genere le 2026-02-20 -- D02-Art Direction / Constraints*
