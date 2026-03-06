# Mon Profil (Staff) - Wireframe

**Route** : Tab: Profil (Staff Tab 2)
**Objectif** : Afficher l'identite de l'agent, ses statistiques simples, et l'acces aux parametres.

---

## Zone 1 : Header

**Contenu** :
- Titre : "Profil" — `visual-vocabulary.md > titre ecran` (clamp 24-32px, weight 700)

**Layout** : Sticky header, height 56px + safe-area-top, padding horizontal 16px, titre a gauche
**Interaction** : Aucune

---

## Zone 2 : Identite Agent

**Contenu** :
- `emotion-map.md > Mon Profil (Staff) > element signature`
- Avatar : 48px cercle, initiales sur fond `visual-vocabulary.md > accent primaire` si pas de photo, texte blanc 18px weight 600
  - `visual-vocabulary.md > coins avatar` (50%)
- Prenom : `visual-vocabulary.md > titre section` (clamp 20-26px weight 600), centre sous l'avatar
- Role : "Personnel d'entretien" — 14px `visual-vocabulary.md > texte secondaire`, centre

**Layout** : Centre horizontal, padding-top 24px, gap 12px entre avatar et prenom, gap 4px entre prenom et role
**Interaction** : Aucune

---

## Zone 3 : Mini-KPIs

**Contenu** :
- 2 cards compactes en ligne :
  - "Interventions ce mois" : valeur 20px weight 700 `visual-vocabulary.md > texte principal` tabular-nums + label `visual-vocabulary.md > label KPI` (14px weight 500)
  - "Taux de completion" : valeur en % + label
- Cards : fond `visual-vocabulary.md > surface card`, bordure 1px `visual-vocabulary.md > bordure legere`, `visual-vocabulary.md > coins card` (12px), padding 16px

**Layout** : Padding horizontal 16px, gap 24px apres Zone 2, grille 2 colonnes, gap 12px entre cards
**Interaction** : Aucune (lecture seule)

---

## Zone 4 : Liens Parametres

**Contenu** :
- Card contenant :
  - "Notifications" : icone bell 20px + texte 16px weight 500 + chevron right 16px
  - `visual-vocabulary.md > separateur liste`
  - "Se deconnecter" : icone log-out 20px + texte 16px weight 500, `visual-vocabulary.md > couleur erreur`
- Card : fond `visual-vocabulary.md > surface card`, `visual-vocabulary.md > coins card` (12px), bordure 1px `visual-vocabulary.md > bordure legere`

**Layout** : Padding horizontal 16px, gap 24px apres Zone 3. Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** :
- Tap "Notifications" → `→ /parametres-staff` (push)
- Tap "Se deconnecter" → `constraints.md > Actions destructives sans confirmation` : dialog "Vous deconnecter ?" → confirmation → retour Login
- Touch target chaque item : 56px height >= 44px minimum

---

## Zone 5 : Bottom Tab Bar (Staff)

**Contenu** :
- 2 tabs (meme structure que `planning-jour.md > Zone 3`)
  - Tab 1 : Planning — inactif
  - Tab 2 : Profil — **ACTIF** (`visual-vocabulary.md > accent primaire`)

**Layout** : Fixed bottom, height 56px + env(safe-area-inset-bottom), `visual-vocabulary.md > ombre navigation bottom`
**Interaction** :
- Tap Tab 1 → `→ Tab: Planning`
- Touch target par tab : 44x44px minimum

---

## Etats Speciaux

### Loading
- Zone 2 : skeleton avatar (cercle 48px) + lignes texte
- Zone 3 : 2 rectangles skeleton
- Zone 4 : lignes skeleton

### Error
- Toast : `positioning.md > Messages de feedback > Error (generique)`

---

*Wireframe D03 | Profil Staff | 5 zones*
