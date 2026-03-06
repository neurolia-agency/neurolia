# Livret Accueil Public - Wireframe

**Route** : /livret/[property-id] (page publique, sans authentification)
**Objectif** : Fournir aux voyageurs les informations pratiques du logement via un QR code, sans compte ni application.

---

## Zone 1 : Header Branding

**Contenu** :
- Nom du bien : `visual-vocabulary.md > titre ecran` (clamp 24-32px, weight 700), centre
- Sous-titre : "Livret d'accueil" — 14px `visual-vocabulary.md > texte secondaire`, centre
- Logo "Neurolia-Immo" discret en haut a droite : 24px, opacity 0.5

**Layout** : Padding horizontal 16px, padding-top 32px + safe-area-top, centre horizontal, gap 4px titre-sous-titre
**Interaction** : Aucune

---

## Zone 2 : WiFi

**Contenu** :
- Titre section : "WiFi" — `visual-vocabulary.md > titre section`
- Nom reseau : label 14px `visual-vocabulary.md > texte secondaire` + valeur 16px `visual-vocabulary.md > code monospace`
- Mot de passe : label + valeur `visual-vocabulary.md > code monospace` + bouton "Copier" (icone copy 16px `visual-vocabulary.md > accent primaire`)

**Layout** : Card fond `visual-vocabulary.md > surface card`, padding 16px, `visual-vocabulary.md > coins card` (12px), `visual-vocabulary.md > ombre card`. Padding horizontal 16px. Gap 12px entre lignes.
**Interaction** :
- Tap "Copier" mot de passe → copie dans le presse-papier

---

## Zone 3 : Regles de la Maison

**Contenu** :
- Titre section : "Regles de la maison" — `visual-vocabulary.md > titre section`
- Liste d'items :
  - Icone 16px `visual-vocabulary.md > texte secondaire` + texte 14px `visual-vocabulary.md > texte courant`
  - Exemples : "Ne pas fumer a l'interieur", "Fermer les volets la nuit", "Sortir les poubelles le mardi"

**Layout** : Padding horizontal 16px, gap 24px apres Zone 2, gap 12px entre items
**Interaction** : Aucune

---

## Zone 4 : Numeros Utiles

**Contenu** :
- Titre section : "Numeros utiles" — `visual-vocabulary.md > titre section`
- Liste :
  - "Proprietaire" : nom + telephone (lien tel:), icone phone 16px
  - "Urgences" : "15 / 17 / 18", icone shield 16px
  - Autres contacts ajoutes par le proprietaire

**Layout** : Padding horizontal 16px, gap 24px apres Zone 3, gap 12px entre items
**Interaction** :
- Tap telephone → appel direct
- Touch target : 44px height

---

## Zone 5 : Recommandations Locales

**Contenu** :
- Titre section : "Recommandations" — `visual-vocabulary.md > titre section`
- Liste de recommandations :
  - Nom du lieu : 16px weight 500
  - Description : 14px `visual-vocabulary.md > texte secondaire`
  - Adresse : 14px `visual-vocabulary.md > texte secondaire`, underline si lien Maps

**Layout** : Padding horizontal 16px, gap 24px apres Zone 4, gap 16px entre items. Padding bottom 48px.
**Interaction** :
- Tap adresse → ouvre Maps

---

## Zone 6 : Footer Branding

**Contenu** :
- Texte : "Propulse par Neurolia-Immo" — 12px `visual-vocabulary.md > texte desactive`, centre
- Logo NI petit 16px

**Layout** : Centre horizontal, padding-top 32px, padding-bottom 32px + safe-area
**Interaction** : Aucune

---

## Etats Speciaux

### Loading
- Header reel
- Zones 2-5 : skeleton cards (rectangles pulse)

### Error (propriete non trouvee)
- Ecran centre :
  - Icone home 48px `visual-vocabulary.md > icone empty state`
  - Titre : "Ce livret n'est pas disponible."
  - Description : "Verifiez le QR code ou contactez votre hote." 14px `visual-vocabulary.md > texte secondaire`

---

*Wireframe D03 | Livret Accueil Public | 6 zones*
