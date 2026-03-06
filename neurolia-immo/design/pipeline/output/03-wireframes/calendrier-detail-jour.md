# Calendrier Detail Jour (Owner) - Wireframe

**Route** : /calendrier/[date] (push depuis Calendrier Vue Mois)
**Objectif** : Voir les reservations et les taches menage d'un jour specifique.

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : date du jour (format long `tone.md > Formatage des Donnees > Date`, ex: "Jeudi 20 fevrier")
  - 16px weight 600, `visual-vocabulary.md > texte principal`, centre
- Fleches gauche/droite pour naviguer jour precedent/suivant
  - Chevron 20px, `visual-vocabulary.md > texte secondaire`

**Layout** : Header sticky 56px + safe-area-top, back a gauche, titre centre, fleches a droite
**Interaction** :
- Tap back → pop (retour calendrier mois)
- Tap chevron gauche → jour precedent (transition `visual-vocabulary.md > navigation push` inversee)
- Tap chevron droit → jour suivant
- Touch targets : 44x44px chacun

---

## Zone 2 : Reservations du Jour

**Contenu** :
- Titre section : "Reservations" — `visual-vocabulary.md > titre section`
- Sous-sections :
  - "ARRIVEES" — `visual-vocabulary.md > en-tete section` (12px uppercase)
  - Liste cards arrivees :
    - Badge plateforme (Airbnb/Booking/Manuel) + nom voyageur 16px weight 500 + nom du bien 14px `visual-vocabulary.md > texte secondaire`
    - Badge statut ("Confirmee" / "En attente")
    - `visual-vocabulary.md > coins card` (12px), fond `visual-vocabulary.md > surface card`, `visual-vocabulary.md > ombre card`
  - "DEPARTS" — meme structure
  - "EN COURS" — reservations avec sejour couvrant ce jour (ni arrivee ni depart)

**Layout** : Padding horizontal 16px, gap 8px titre-section → en-tete, gap 12px entre cards, gap 24px entre sous-sections
**Interaction** :
- Tap card reservation → `→ /detail-reservation/[id]` (push)
- Touch target : card entiere >= 44px height

---

## Zone 3 : Taches Menage du Jour

**Contenu** :
- Titre section : "Menages" — `visual-vocabulary.md > titre section`
- Liste cards taches (meme structure que `suivi-menages.md > Zone 3` mais sans regroupement par bien) :
  - Heure : 14px tabular-nums
  - Nom du bien : 16px weight 500
  - Agent : 14px `visual-vocabulary.md > texte secondaire`
  - Badge statut (A faire / En cours / Termine)
  - Type de tache + badge "Ponctuel" si ad_hoc
- Lien "Voir tout le suivi menages →" : `positioning.md > CTAs par Ecran > Dashboard` ("Suivi menages"), 14px weight 600 `visual-vocabulary.md > accent primaire`

**Layout** : Padding horizontal 16px, gap 24px apres Zone 2, gap 12px entre cards. Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** :
- Tap "Voir tout le suivi →" → `→ /suivi-menages` (push)
- `visual-vocabulary.md > flash realtime` sur changement de statut temps reel

---

## Etats Speciaux

### Empty
- Zone 2 : "Aucune reservation ce jour." — 14px `visual-vocabulary.md > texte secondaire`, centre dans la zone
- Zone 3 : "Aucun menage prevu." — 14px `visual-vocabulary.md > texte secondaire`

### Loading
- Header reel
- Zone 2 : 2-3 card skeletons
- Zone 3 : 2 card skeletons
- Skeleton pulse 1500ms

### Error
- Toast : `positioning.md > Messages de feedback > Error (generique)`

---

*Wireframe D03 | Calendrier Detail Jour | 3 zones*
