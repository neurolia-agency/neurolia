# Signaler Probleme (Staff) - Wireframe

**Route** : /intervention/[id]/signaler (push depuis Fiche Intervention)
**Objectif** : Permettre a l'agent de signaler un probleme constate sur place (fuite, casse, manque) avec photo et description.

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : "Signaler un probleme" — 16px weight 600, `visual-vocabulary.md > texte principal`, centre

**Layout** : Header sticky 56px + safe-area-top, back a gauche, titre centre
**Interaction** :
- Tap back → pop (retour Fiche Intervention)
- Touch target back : 44x44px

---

## Zone 2 : Selection Type

**Contenu** :
- Titre section : "Type de probleme" — `visual-vocabulary.md > label formulaire` (14px weight 500)
- 4 options en chips selectionnables :
  - "Fuite" / "Casse" / "Manque" / "Autre"
  - Chip actif : fond `visual-vocabulary.md > surface selection`, bordure `visual-vocabulary.md > accent primaire`, texte `visual-vocabulary.md > accent primaire`
  - Chip inactif : fond transparent, bordure 1px `visual-vocabulary.md > bordure legere`, texte `visual-vocabulary.md > texte courant`
  - `visual-vocabulary.md > coins chip` (999px), height 36px, padding horizontal 16px

**Layout** : Padding horizontal 16px, padding-top 16px, gap 8px entre chips, flex-wrap
**Interaction** :
- Tap chip → selectionne le type (1 seul actif a la fois)
- Touch target : 44px height (padding vertical etendu)

---

## Zone 3 : Photo (optionnelle)

**Contenu** :
- Titre section : "Photo" — `visual-vocabulary.md > label formulaire` + badge "Optionnel" 12px `visual-vocabulary.md > texte secondaire`
- Zone d'ajout photo : rectangle en pointilles, 120px height, fond `visual-vocabulary.md > surface enfonced`, `visual-vocabulary.md > coins card` (12px)
  - Icone camera 24px `visual-vocabulary.md > texte desactive` centre
  - Texte "Ajouter une photo" 14px `visual-vocabulary.md > texte secondaire`
- Apres photo : miniature 120px x 90px avec bouton X pour supprimer (icone x 16px sur fond noir/50%)

**Layout** : Padding horizontal 16px, gap 24px apres Zone 2
**Interaction** :
- Tap zone → ouvre camera native (modal Camera)
- Tap X sur miniature → supprime la photo
- Touch target zone : 120px height

---

## Zone 4 : Description

**Contenu** :
- Titre section : "Description" — `visual-vocabulary.md > label formulaire`
- Textarea : 16px (prevent iOS zoom), placeholder "Decrivez le probleme...", fond `visual-vocabulary.md > surface enfonced`, bordure 1px `visual-vocabulary.md > bordure legere`, `visual-vocabulary.md > coins input` (8px)
- Min-height 100px, max-height 200px, auto-expand

**Layout** : Padding horizontal 16px, gap 24px apres Zone 3, gap 6px label-textarea
**Interaction** :
- Focus → bordure `visual-vocabulary.md > accent primaire`, fond blanc
- `constraints.md > Inputs a 16px`

---

## Zone 5 : CTA Envoyer

**Contenu** :
- Bouton : `positioning.md > CTAs par Ecran > Fiche Intervention (Staff)` ("Signaler un probleme")
  - Fond `visual-vocabulary.md > accent primaire`, texte blanc, pleine largeur, height 48px
  - `visual-vocabulary.md > coins bouton` (8px)
  - Desactive si aucun type selectionne ET aucune description
  - Touch target : 48px >= 44px minimum

**Layout** : Fixed bottom, padding 16px, safe-area-bottom, fond `visual-vocabulary.md > surface card`, `visual-vocabulary.md > ombre bouton sticky`
**Interaction** :
- Tap → envoie le signalement → toast "Signalement envoye a [prenom proprietaire]." → pop retour Fiche Intervention
- n8n trigger : `navigation-map.md > Points de Contact n8n > Signalement probleme`

---

## Etats Speciaux

### Loading (soumission)
- Bouton CTA : spinner 20px blanc, bouton desactive
- Upload photo : progress bar sous la miniature

### Error
- Erreur upload photo : toast "Impossible d'envoyer la photo. Reessayez."
- Erreur serveur : toast `positioning.md > Messages de feedback > Error (generique)`

---

*Wireframe D03 | Signaler Probleme | 5 zones*
