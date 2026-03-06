# Detail Reservation (Owner) - Wireframe

**Route** : /reservation/[id] (push depuis Dashboard, Calendrier, Suivi Menages)
**Objectif** : Afficher toutes les informations d'une reservation en un ecran structure.

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : "Reservation" — 16px weight 600, `visual-vocabulary.md > texte principal`, centre
- Badge plateforme en haut a droite :
  - Airbnb : fond `visual-vocabulary.md > couleur Airbnb` a 15% opacity, texte `visual-vocabulary.md > couleur Airbnb`, "AIRBNB" `visual-vocabulary.md > badge texte`
  - Booking : fond `visual-vocabulary.md > couleur Booking` a 15% opacity, texte `visual-vocabulary.md > couleur Booking`, "BOOKING" `visual-vocabulary.md > badge texte`
  - Manuel : fond neutral-100, texte `visual-vocabulary.md > couleur Manuel`, "MANUEL"

**Layout** : Header sticky 56px + safe-area-top, bouton back a gauche, badge plateforme a droite (padding-right 16px)
**Interaction** :
- Tap back → pop
- Touch target back : 44x44px

---

## Zone 2 : Informations Voyageur

**Contenu** :
- Nom voyageur : `visual-vocabulary.md > titre card` (clamp 18-22px weight 600)
- Badge statut reservation :
  - "Confirmee" : fond `visual-vocabulary.md > fond succes`, texte success-700 — `visual-vocabulary.md > badge texte`
  - "En attente" : fond `visual-vocabulary.md > fond alerte`, texte warning-700
  - "Annulee" : fond `visual-vocabulary.md > fond erreur`, texte error-700
- Nombre de voyageurs : icone users 16px + texte (format `tone.md > Formatage des Donnees > Nombre de voyageurs`)

**Layout** : Padding 16px, gap 8px entre nom et badges, gap 4px entre badge et details
**Interaction** : Aucune

---

## Zone 3 : Dates + Montant

**Contenu** :
- Section : card fond `visual-vocabulary.md > surface card`, `visual-vocabulary.md > coins card` (12px), bordure 1px `visual-vocabulary.md > bordure legere`
- Ligne "Arrivee" : label 14px `visual-vocabulary.md > texte secondaire` + date `visual-vocabulary.md > texte courant` 16px
- Ligne "Depart" : idem
- Ligne "Duree" : format `tone.md > Formatage des Donnees > Duree de sejour`
- Separateur : `visual-vocabulary.md > separateur liste`
- Ligne "Montant" : label 14px `visual-vocabulary.md > texte secondaire` + valeur `visual-vocabulary.md > valeur KPI` (24px weight 700 tabular-nums), format `tone.md > Formatage des Donnees > Montant`

**Layout** : Padding horizontal 16px, card padding interne 16px, gap 12px entre lignes, `visual-vocabulary.md > ombre card`
**Interaction** : Aucune

---

## Zone 4 : Bien Associe

**Contenu** :
- Titre section : "Bien" — `visual-vocabulary.md > en-tete section` (12px uppercase)
- Nom du bien : 16px weight 500, `visual-vocabulary.md > texte principal`
- Adresse : 14px `visual-vocabulary.md > texte secondaire`
- Chevron right 16px a droite

**Layout** : Card fond `visual-vocabulary.md > surface card`, padding 16px, `visual-vocabulary.md > coins card` (12px), bordure 1px `visual-vocabulary.md > bordure legere`, margin horizontal 16px
**Interaction** :
- Tap → `→ /fiche-bien/[id]` (push)
- Touch target : card entiere >= 44px height

---

## Zone 5 : Statut Menage Associe

**Contenu** :
- Titre section : "Menage" — `visual-vocabulary.md > en-tete section` (12px uppercase)
- Card avec :
  - Type de tache : 16px weight 500 (ex: "Menage depart")
  - Agent assigne : prenom, 14px `visual-vocabulary.md > texte secondaire`
  - Badge statut : meme badges que `suivi-menages.md > Zone 3` (A faire / En cours / Termine)
  - Heure prevue : 14px tabular-nums `visual-vocabulary.md > texte secondaire`
- Si pas de menage associe : texte "Aucun menage associe." 14px `visual-vocabulary.md > texte secondaire`

**Layout** : Padding horizontal 16px, card padding 16px, `visual-vocabulary.md > coins card` (12px), bordure 1px `visual-vocabulary.md > bordure legere`. Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** : Aucune interaction (lecture seule, monitoring owner)

---

## Etats Speciaux

### Loading
- Header reel (pas de skeleton)
- Zone 2 : skeleton titre (rectangle 200px x 24px) + badge skeleton
- Zone 3 : skeleton card (rectangle pleine largeur x 140px)
- Zone 4-5 : skeleton cards
- `constraints.md > Skeleton screens > Fiche bien`

### Error
- Toast : `positioning.md > Messages de feedback > Error (generique)`
- Bouton "Reessayer"

---

*Wireframe D03 | Detail Reservation | 5 zones*
