# Moodboard - Neurolia-Immo

> D02-Art Direction | Phase D-A : References visuelles annotees (apps mobiles)
> Sources : 01-brand/, references/, navigation-map.md, user-flows/

---

## Reference 1 : Guesty (iOS)

- **Plateforme** : iOS / Android
- **Categorie** : Property Management System (PMS) pour locations courte duree
- **Ce qu'on retient** :
  - Dashboard avec KPIs en haut (taux d'occupation, revenus) sous forme de cards compactes 2x2
  - Calendrier multi-proprietes avec barres colorees par plateforme (Airbnb rose, Booking bleu)
  - Bottom tab bar 4 items avec icones outline + labels
- **Mesures concretes** :
  - Hauteur header : ~56px (titre + actions)
  - Hauteur bottom tab : ~56px + safe area (~34px iPhone)
  - Padding horizontal : ~16px
  - Taille KPI cards : ~80px height, 2 colonnes, gap 12px
  - Border radius cards : ~12px
  - Taille police KPI valeur : ~28px bold
  - Taille police KPI label : ~12px medium, gris secondaire
  - Barres calendrier : ~24px height, border-radius 4px
  - Couleur fond page : gris tres clair (#F5F5F7 equivalent)
- **A adapter pour ce projet** :
  - Adopter la grille KPI 2 colonnes sur mobile pour le bloc "Cette semaine" du Dashboard Owner
  - Reprendre le pattern des barres calendrier colorees par plateforme (rose Airbnb, bleu Booking)
  - Simplifier : Guesty a trop de tabs (5) pour notre persona secondaire. Garder 3 tabs Owner, 2 tabs Staff.

---

## Reference 2 : Hospitable (iOS)

- **Plateforme** : iOS / Android
- **Categorie** : PMS multi-plateformes pour hotes professionnels
- **Ce qu'on retient** :
  - Ecran "Aujourd'hui" structure en blocs empiles : alertes en haut, arrivees/departs au milieu, taches en bas
  - Codage couleur strict : rouge = attention requise, vert = ok, orange = en attente
  - Fiche propriete avec zone statut en haut (occupe/libre) et zone configuration en bas (liens vers reglages)
- **Mesures concretes** :
  - Hauteur header : ~52px
  - Hauteur bottom tab : ~56px + safe area
  - Padding horizontal : ~20px
  - Taille cards alerte : ~72px height (icone 24px + texte 2 lignes)
  - Border radius cards : ~16px
  - Gap entre blocs de section : ~24px
  - Badge statut : height ~24px, padding horizontal 10px, border-radius 12px
  - Couleur primaire : bleu moyen (~#4A7CC5)
  - Taille texte arrivees/departs : 14px regular, nom voyageur 16px semibold
- **A adapter pour ce projet** :
  - Reprendre la structure 3 blocs du Dashboard (Alertes > Aujourd'hui > Cette semaine) -- identique a notre flow Owner
  - Adapter les badges statut avec notre palette semantique OKLCH (success/warning/error)
  - Reduire le border-radius : Hospitable utilise 16px, nous utilisons 12px pour les cards (plus professionnel, moins "app grand public")

---

## Reference 3 : Breezeway (iOS)

- **Plateforme** : iOS / Android
- **Categorie** : Operations & task management pour locations courte duree (equipes terrain)
- **Ce qu'on retient** :
  - Planning du jour en liste chronologique verticale avec cards de taches empilees
  - Chaque card de tache contient : heure, nom du bien, type de tache, badge statut
  - Bouton d'action principal en bas de chaque fiche (pleine largeur, 48px height)
  - Checklist avec items cochables gros (zone tactile genereuse)
- **Mesures concretes** :
  - Hauteur header : ~56px
  - Hauteur bottom tab : ~52px + safe area
  - Padding horizontal : ~16px
  - Taille cards tache : ~96px height (3 lignes d'info + badge)
  - Border radius cards : ~12px
  - Gap entre cards : ~12px
  - Checkbox taille visuelle : ~24px, zone tactile ~48px
  - Bouton action CTA : pleine largeur, ~48px height, border-radius 10px
  - Taille texte nom du bien : ~16px semibold
  - Taille texte heure : ~14px regular, couleur gris secondaire
  - Taille texte type de tache : ~14px medium
- **A adapter pour ce projet** :
  - Reprendre le pattern de planning chronologique vertical pour le Staff (Planning Jour)
  - Adopter les cards de tache empilees avec heure + bien + type + badge
  - Appliquer le bouton CTA pleine largeur (44px min, pas 48px) sur la Fiche Intervention
  - Simplifier les checkboxes : zone tactile 44px (notre minimum), pas 48px

---

## Reference 4 : Linear Mobile (iOS)

- **Plateforme** : iOS / Android / PWA
- **Categorie** : Gestion de projet / task management pour equipes tech
- **Ce qu'on retient** :
  - Sobriete extreme : fond neutre gris tres clair, surfaces blanches, bordures 1px legeres
  - Hierarchie typographique nette : titres en semibold 600, texte courant en regular 400, labels en 12px uppercase tracking-wide
  - Navigation bottom tab 3 items (Inbox, My Issues, Projects) -- economie de tabs
  - Cards avec bordure fine, ombre quasi inexistante (1px 2px blur)
  - Transitions rapides : navigation push ~200ms, pas de bounce
- **Mesures concretes** :
  - Hauteur header : ~52px
  - Hauteur bottom tab : ~50px + safe area
  - Padding horizontal : ~16px
  - Border radius cards : ~8px
  - Ombre cards : 0 1px 2px rgba(0,0,0,0.04) -- quasi invisible
  - Bordure cards : 1px solid rgba(0,0,0,0.06)
  - Gap entre items liste : ~1px (separation par bordure, pas par espace)
  - Fond page : ~oklch(0.975 0.002 260)
  - Surface card : blanc pur
  - Texte principal : ~oklch(0.15 0.01 260)
  - Texte secondaire : ~oklch(0.55 0.01 260)
  - Transition navigation : ~180ms ease-out
- **A adapter pour ce projet** :
  - Adopter la philosophie "surfaces blanches sur fond gris tres clair" -- identique a notre palette neutrals
  - Reprendre les ombres legeres (shadow-md) et les bordures fines (neutral-200) de notre ui-kit v1
  - Inspirer la retenue typographique : pas de decoration, l'information parle d'elle-meme
  - Garder des transitions rapides (200-250ms ease-out) coherentes avec notre archetype Souverain

---

## Reference 5 : Airbnb Host (iOS)

- **Plateforme** : iOS / Android
- **Categorie** : Gestion de listing pour hotes Airbnb
- **Ce qu'on retient** :
  - Ecran "Aujourd'hui" avec timeline verticale des arrivees/departs
  - Calendrier mensuel compact avec dots de couleur (reserve, bloque, libre)
  - Bottom sheet draggable pour les filtres et les actions contextuelles (slide from bottom)
  - Pull-to-refresh sur toutes les listes
  - Skeleton loading avec formes fideles aux composants finaux
- **Mesures concretes** :
  - Hauteur header : ~56px
  - Hauteur bottom tab : ~56px + safe area
  - Padding horizontal : ~24px (plus genereux que la moyenne)
  - Border radius cards : ~16px (style iOS natif)
  - Border radius bouton principal : ~12px
  - Bottom sheet border-radius top : ~16px
  - Bottom sheet handle : 36px x 4px, border-radius 2px, couleur gris neutre
  - Pull-to-refresh spinner : 24px, positionne au centre, 300ms delay avant apparition
  - Skeleton pulse : duree 1.5s, opacite oscillante 0.4-1.0
  - Fond page : blanc pur (pas de gris)
  - Transition bottom sheet : ~350ms cubic-bezier(0.32, 0.72, 0, 1)
- **A adapter pour ce projet** :
  - Adopter le bottom sheet draggable pour les filtres calendrier et les actions contextuelles sur mobile
  - Reprendre le pull-to-refresh sur le Dashboard Owner et le Planning Staff
  - Adapter les skeletons avec pulse 1.5s ease-in-out (identique a notre spec)
  - NE PAS adopter le fond blanc pur : notre palette utilise un gris tres clair (oklch 0.985) pour distinguer page/card
  - NE PAS adopter le border-radius 16px : nous restons a 12px pour les cards (plus pro, moins rond)

---

## Reference 6 : Notion Mobile (iOS)

- **Plateforme** : iOS / Android / PWA
- **Categorie** : Outil de productivite / wiki
- **Ce qu'on retient** :
  - Typographie Inter comme police principale (identique a notre choix)
  - Hierarchie claire : titres en gras, corps en regular, metadata en gris clair
  - Cards avec bordure subtile, pas d'ombre (approche flat)
  - Navigation stack fluide avec transitions push rapides (~200ms)
  - Empty states minimalistes : icone + texte + CTA, centres, tons neutres
- **Mesures concretes** :
  - Hauteur header : ~48px
  - Padding horizontal : ~16px (contenu), ~12px (sidebar)
  - Border radius cards : ~6px (tres leger)
  - Pas d'ombre sur les cards en liste
  - Bordure : 1px solid rgba(0,0,0,0.06)
  - Gap entre items liste : 0px (separateur 1px entre chaque item)
  - Taille icone navigation : ~20px
  - Taille icone empty state : ~48px, couleur gris clair
  - Texte empty state titre : ~16px medium, gris moyen
  - Texte empty state description : ~14px regular, gris clair
  - Police : Inter variable, memes graisses que notre echelle (400, 500, 600, 700)
- **A adapter pour ce projet** :
  - Confirmer le choix Inter : Notion prouve que cette police fonctionne en mobile dense
  - Reprendre les border-radius legers (6-8px) plutot que les 16px style iOS
  - Adopter les separateurs 1px entre items de liste (pas de gap, plus dense)
  - Inspirer les empty states minimalistes : icone 48px + titre 16px + description 14px + CTA optionnel

---

## Reference 7 : Properly (iOS)

- **Plateforme** : iOS / Android
- **Categorie** : Application de gestion d'equipes de menage pour locations courte duree
- **Ce qu'on retient** :
  - Checklist d'entretien avec items cochables grands et espaces
  - Prise de photo integree dans la checklist (camera inline)
  - Bouton "Terminer" en position fixe en bas de l'ecran (toujours visible pendant le scroll)
  - Code d'acces en gros caracteres monospace, fond contraste, bouton copier adjacent
  - Navigation minimaliste pour le staff : 2 tabs (Taches, Profil)
- **Mesures concretes** :
  - Hauteur header : ~56px
  - Hauteur bottom tab : ~52px + safe area
  - Padding horizontal : ~16px
  - Taille checkbox : 28px visuel, zone tactile ~48px
  - Gap entre items checklist : ~16px
  - Taille code d'acces : ~24px monospace bold, fond gris clair, padding 12px 16px, border-radius 8px
  - Bouton "Terminer" : pleine largeur, ~52px height, position sticky bottom, ombre 0 -2px 8px rgba(0,0,0,0.08)
  - Miniature photo : ~64x64px, border-radius 8px
  - Bouton camera : ~44x44px, icone 24px, fond gris clair, border-radius 8px
- **A adapter pour ce projet** :
  - Adopter la checklist avec items cochables genereux (zone tactile 44px min) pour la Fiche Intervention Staff
  - Reprendre le code d'acces en gros monospace sur fond contraste dans l'ecran Infos Bien
  - Adopter le bouton sticky bottom pour "Commencer" / "Terminer" sur la Fiche Intervention
  - Integrer la prise de photo dans la checklist (camera ouvre depuis l'item, miniature inline)
  - Ajuster les tailles : code d'acces en 20px monospace (JetBrains Mono) au lieu de 24px, bouton 44px (notre spec) au lieu de 52px

---

## Patterns Communs

| Pattern | Frequence | Decision | Justification |
|---------|-----------|----------|---------------|
| Bottom tab bar (2-5 items) | 7/7 | **Adopter** | Convention universelle mobile, zone pouce, navigation principale |
| Cards avec bordure fine + ombre legere | 6/7 | **Adopter** | Coherent avec notre palette, separation surface/page |
| Fond page gris clair + cards blanches | 5/7 | **Adopter** | Hierarchie surface deja definie (neutral-50 / surface-card) |
| Pull-to-refresh sur listes | 5/7 | **Adopter** | Convention mobile, controle utilisateur |
| Skeleton loading pendant fetch | 5/7 | **Adopter** | Perception de rapidite, feedback immediat |
| Bottom sheet draggable | 4/7 | **Adopter** | Filtres et actions contextuelles, zone pouce |
| Border-radius 12-16px sur cards | 5/7 | **Adapter : 12px** | 12px = equilibre pro/moderne, 16px trop rond pour un dashboard |
| Header ~56px | 6/7 | **Adopter : 56px** | Standard mobile, coherent avec nos specs layout v1 |
| Bouton CTA sticky bottom | 3/7 | **Adopter (Staff)** | Essential pour Fiche Intervention (Commencer/Terminer) |
| Checklist cochable grande zone tactile | 2/7 | **Adopter (Staff)** | Specifique au persona Staff, Breezeway + Properly confirment le pattern |
| Parallax / scroll-triggered animations | 0/7 | **Rejeter** | Non pertinent pour un dashboard, viole le ton sobre |
| Carousel / swipe navigation | 1/7 | **Rejeter** | Contenu masque, pas d'affordance, preferer le scroll vertical |
| Floating action button (FAB) | 1/7 | **Rejeter** | Masque du contenu, pas adapte a notre usage (pas de creation frequente) |
| Fond blanc pur (pas de gris) | 2/7 | **Rejeter** | Notre palette utilise le gris tres clair pour distinguer hierarchie surface |

---

## Synthese des Mesures pour Neurolia-Immo

| Element | Valeur retenue | Source principale |
|---------|---------------|-------------------|
| Header height | 56px | Consensus 6/7 apps |
| Bottom tab height | 56px + safe area | Guesty, Airbnb, Breezeway |
| Padding horizontal ecran | 16px (mobile) | Linear, Breezeway, Properly |
| Border-radius cards | 12px | Adaptation (moyenne 12-16px, choix pro) |
| Border-radius boutons | 8px | Linear, adaptation |
| Ombre cards | 0 1px 3px oklch(0 0 0 / 0.04), 0 1px 2px oklch(0 0 0 / 0.06) | Linear, Notion |
| Gap entre cards | 12px (mobile) | Breezeway, Guesty |
| Transition navigation | 250ms ease-out | Linear, Notion |
| Bottom sheet transition | 350ms cubic-bezier(0.32, 0.72, 0, 1) | Airbnb Host |
| Skeleton pulse | 1.5s ease-in-out, opacite 0.4-1.0 | Airbnb Host |
| Code d'acces taille | 20px JetBrains Mono, fond neutral-100 | Properly (adapte) |
| Bouton CTA Staff | pleine largeur, 44px height, sticky bottom | Breezeway, Properly |

---

*Document genere le 2026-02-20 -- D02-Art Direction / Moodboard*
