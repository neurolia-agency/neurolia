# Fiche Bien (Owner) - Wireframe

**Route** : /propriete/[id] (push depuis Liste Proprietes ou Detail Reservation)
**Objectif** : Voir l'etat operationnel d'un bien en haut (lecture) et acceder a sa configuration en bas (action).

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : `positioning.md > Messages par Ecran > Fiche Bien` ("[Nom du bien]") — dynamique
  - 16px weight 600, `visual-vocabulary.md > texte principal`, centre

**Layout** : Header sticky 56px + safe-area-top, back a gauche, titre centre
**Interaction** :
- Tap back → pop
- Touch target back : 44x44px

---

## Zone 2 : Etat Operationnel (lecture seule)

**Contenu** :
- `emotion-map.md > Fiche Bien > element signature`
- Badge statut du bien en haut :
  - "Occupe" : fond `visual-vocabulary.md > fond info`, texte info-700
  - "Libre" : fond `visual-vocabulary.md > fond succes`, texte success-700
  - "Menage en cours" : fond `visual-vocabulary.md > fond alerte`, texte warning-700
- Section "Reservation en cours" (si occupe) :
  - Nom voyageur : 16px weight 500
  - Dates : 14px `visual-vocabulary.md > texte secondaire` (format `tone.md > Formatage des Donnees > Date`)
  - Badge plateforme (Airbnb/Booking/Manuel)
- Section "Mode d'accueil" :
  - Icone user-check 16px `visual-vocabulary.md > texte secondaire` + texte 14px weight 400
    - Si `check_in_mode = staff_checkin` : "Accueil voyageur par le personnel"
    - Si `check_in_mode = self_checkin` : "Check-in autonome"
- Section "Derniere intervention" :
  - Agent : 14px weight 500
  - Date + heure : 14px `visual-vocabulary.md > texte secondaire`
  - Badge statut (Termine = `visual-vocabulary.md > fond succes`, En cours = `visual-vocabulary.md > fond info`)

**Layout** : Padding horizontal 16px, padding-top 16px. Card fond `visual-vocabulary.md > surface card`, padding 16px, `visual-vocabulary.md > coins card` (12px), `visual-vocabulary.md > ombre card`. Gap 16px entre sections internes. `visual-vocabulary.md > separateur liste` entre sections.
**Interaction** :
- Tap reservation en cours → `→ /detail-reservation/[id]` (push)

---

## Zone 3 : Configuration (actions)

**Contenu** :
- `emotion-map.md > Fiche Bien > element signature` (zone basse = configuration)
- Titre section : "Configuration" — `visual-vocabulary.md > en-tete section` (12px uppercase)
- 4 liens card empiles :
  1. "Modifier les infos" : icone edit-3 20px + texte 16px weight 500 + chevron
  2. "Gerer la checklist" : icone clipboard-check 20px + texte + chevron
  3. "Livret d'accueil" : icone qr-code 20px + texte + chevron
  4. "Historique interventions" : icone clock 20px + texte + chevron
- Chaque lien : fond `visual-vocabulary.md > surface card`, padding 16px, bordure 1px `visual-vocabulary.md > bordure legere`, `visual-vocabulary.md > separateur liste` entre items

**Layout** : Padding horizontal 16px, gap 24px apres Zone 2. `visual-vocabulary.md > coins card` (12px) pour le groupe. Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** :
- Tap "Modifier" → `→ /edition-bien/[id]` (push)
- Tap "Checklist" → `→ /gestion-checklist/[id]` (push)
- Tap "Livret" → `→ /livret-accueil/[id]` (push)
- Tap "Historique" → (futur ecran, non detaille dans navigation-map v2.1)
- Touch target chaque lien : 56px height >= 44px minimum

---

## Etats Speciaux

### Loading
- Header reel
- Zone 2 : `constraints.md > Skeleton screens > Fiche bien` — skeleton titre + 4 rectangles texte
- Zone 3 : 4 lignes skeleton

### Error
- Toast : `positioning.md > Messages de feedback > Error (generique)`

---

*Wireframe D03 | Fiche Bien | 3 zones*
