# Dashboard Accueil (Owner) - Wireframe

**Route** : Tab: Accueil
**Objectif** : Repondre a "Est-ce que tout va bien ?" en 5 secondes — alertes, aujourd'hui, KPIs.

---

## Zone 1 : Header

**Contenu** :
- Salutation : `positioning.md > Messages par Ecran > Dashboard Accueil` ("Bonjour [prenom].")
  - `visual-vocabulary.md > titre ecran` (clamp 24-32px, weight 700)
- Icone notifications (bell 20px, `visual-vocabulary.md > texte courant`) a droite
  - Badge dot 8px `visual-vocabulary.md > accent primaire` si notifications non lues

**Layout** : Sticky header, height 56px + safe-area-top, padding horizontal 16px, titre a gauche, icone bell a droite
**Interaction** :
- Tap bell → `→ /notifications` (push)
- Touch target bell : 44x44px

---

## Zone 2 : Bloc Alertes (conditionnel)

**Contenu** :
- Visible UNIQUEMENT si des anomalies/alertes existent
- Card alerte : fond `visual-vocabulary.md > fond alerte` ou `visual-vocabulary.md > fond erreur`, bordure gauche 3px `visual-vocabulary.md > couleur alerte` ou `visual-vocabulary.md > couleur erreur`
  - Icone shield-alert 24px (couleur correspondante) a gauche
  - Titre alerte : 16px weight 600 `visual-vocabulary.md > texte principal`
  - Description courte : 14px weight 400 `visual-vocabulary.md > texte courant` (1 ligne, troncature)
  - Chevron right 16px a droite
- Si plusieurs alertes : cards empilees verticalement, gap 8px

**Layout** : Padding horizontal 16px, padding-top 12px. `visual-vocabulary.md > coins card` (12px). `visual-vocabulary.md > ombre card`.
**Interaction** :
- Tap alerte → `→ /detail-anomalie` (push)
- Touch target : card entiere >= 44px height
- `constraints.md > Hierarchie visuelle par urgence` : alertes toujours en haut du dashboard

---

## Zone 3 : Bloc Aujourd'hui

**Contenu** :
- Titre section : "Aujourd'hui" — `visual-vocabulary.md > titre section` (clamp 20-26px, weight 600)
- Sous-section "Arrivees" :
  - En-tete : `visual-vocabulary.md > en-tete section` ("ARRIVEES", 12px uppercase)
  - Liste : nom voyageur (16px weight 500) + nom du bien (14px `visual-vocabulary.md > texte secondaire`) + badge plateforme (`visual-vocabulary.md > couleur Airbnb` ou `visual-vocabulary.md > couleur Booking`)
  - Si aucune arrivee : texte "Aucune arrivee aujourd'hui." 14px `visual-vocabulary.md > texte secondaire`
- Sous-section "Departs" :
  - Meme structure que Arrivees, en-tete "DEPARTS"
- Bouton "Suivi menages →" : `positioning.md > CTAs par Ecran > Dashboard` ("Suivi menages")
  - Style : texte 14px weight 600, `visual-vocabulary.md > accent primaire`, pas de fond, chevron right 16px

**Layout** : Padding horizontal 16px. Gap 24px apres Zone 2 (ou apres Zone 1 si pas d'alerte). Titre section margin-bottom 8px. Gap 16px entre sous-sections. Gap 12px entre items dans chaque sous-section.
**Interaction** :
- Tap arrivee/depart → `→ /detail-reservation` (push)
- Tap "Suivi menages →" → `→ /suivi-menages` (push)
- Touch target items : 44px height minimum

---

## Zone 4 : Bloc Cette Semaine

**Contenu** :
- Titre section : "Cette semaine" — `visual-vocabulary.md > titre section`
- Grille 2x2 KPIs :
  - KPI 1 : Reservations actives (valeur `visual-vocabulary.md > valeur KPI` + label `visual-vocabulary.md > label KPI`)
  - KPI 2 : Taux d'occupation (valeur + label + variation `visual-vocabulary.md > variation KPI positive` ou `visual-vocabulary.md > variation KPI negative`)
  - KPI 3 : Menages planifies (valeur + label)
  - KPI 4 : Revenus semaine (valeur + label, format `tone.md > Formatage des Donnees > Montant`)
- Chaque KPI : card fond `visual-vocabulary.md > surface card`, bordure 1px `visual-vocabulary.md > bordure legere`, `visual-vocabulary.md > coins card` (12px), padding 16px

**Layout** : Padding horizontal 16px. Gap 24px apres Zone 3. Grille 2 colonnes, gap 12px entre cards. Chaque card 50% largeur - gap.
**Interaction** : Aucune interaction sur les KPIs (lecture seule)

---

## Zone 5 : Bottom Tab Bar (Owner)

**Contenu** :
- 3 tabs : `constraints.md > Bottom tab navigation`
  - Tab 1 : icone home 24px + label "Accueil" 12px — **ACTIF** (`visual-vocabulary.md > accent primaire`)
  - Tab 2 : icone calendar 24px + label "Calendrier" 12px — inactif (`visual-vocabulary.md > texte desactive`)
  - Tab 3 : icone settings 24px + label "Gestion" 12px — inactif

**Layout** : Fixed bottom, height 56px + env(safe-area-inset-bottom), `visual-vocabulary.md > ombre navigation bottom`. Fond `visual-vocabulary.md > surface card`.
**Interaction** :
- Tap Tab 2 → `→ Tab: Calendrier`
- Tap Tab 3 → `→ Tab: Gestion`
- Touch target par tab : minimum 44x44px

---

## Etats Speciaux

### Empty (nouveau compte, aucun bien)
- Zone 2 : masquee
- Zone 3 : remplacee par empty state centre
  - Icone home 48px `visual-vocabulary.md > icone empty state`
  - Titre : `positioning.md > Empty States > Aucun bien` ("Ajoutez votre premier bien pour commencer.")
  - CTA : `positioning.md > CTAs par Ecran > Mes Biens` ("Ajouter un bien")
    - Fond `visual-vocabulary.md > accent primaire`, texte blanc, height 48px, pleine largeur (padding 16px)
- Zone 4 : masquee

### Loading
- Zone 1 : affiche header reel (pas de skeleton pour le header)
- Zone 2 : 1 card skeleton (rectangle arrondi 80px height, pulse)
- Zone 3 : 3 lignes skeleton (rectangles texte, pulse)
- Zone 4 : 4 rectangles skeleton en grille 2x2 (76px height chacun, pulse)
- `constraints.md > Skeleton screens` : skeleton pulse 1500ms ease-in-out

### Error
- Erreur reseau : banniere sous le header, fond `visual-vocabulary.md > fond erreur`, texte 14px `visual-vocabulary.md > couleur erreur`
  - `positioning.md > Messages de feedback > Error (reseau)`
  - Bouton "Reessayer" 14px weight 600 `visual-vocabulary.md > couleur erreur`
- Donnees cachees affichees avec mention horodatee

### Pull-to-Refresh
- `constraints.md > Pull-to-refresh` : seuil 60px, spinner 24px pendant le fetch
- Rafraichit toutes les zones de donnees (alertes, aujourd'hui, KPIs)

---

*Wireframe D03 | Dashboard Accueil | 5 zones*
