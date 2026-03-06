# Inviter Agent (Owner) - Wireframe

**Route** : Modal (depuis Liste Staff, bouton "+")
**Objectif** : Generer un lien d'invitation ou envoyer un email pour qu'un agent rejoigne l'equipe.

---

## Zone 1 : Handle + Titre

**Contenu** :
- Handle : `visual-vocabulary.md > handle bottom sheet` (36x4px, neutral-300, centre)
- Titre : "Inviter un collaborateur" — `visual-vocabulary.md > titre card` (18px weight 600)
- Bouton close (icone x 20px `visual-vocabulary.md > texte secondaire`) a droite

**Layout** : Bottom sheet, `visual-vocabulary.md > coins bottom sheet` (16px 16px 0 0), animation `visual-vocabulary.md > bottom sheet entree` (350ms). Overlay `visual-vocabulary.md > overlay modale`. Handle centre, margin-top 8px. Titre padding 16px.
**Interaction** :
- Tap close ou swipe down → ferme le bottom sheet (`visual-vocabulary.md > bottom sheet sortie`, 250ms)
- `visual-vocabulary.md > swipe dismiss` : vitesse > 500px/s ou distance > 40%
- Touch target close : 44x44px

---

## Zone 2 : Formulaire Invitation

**Contenu** :
- Champ "Email de l'agent" : label `visual-vocabulary.md > label formulaire` + input 16px, type="email"
  - Fond `visual-vocabulary.md > surface enfonced`, bordure 1px `visual-vocabulary.md > bordure legere`, `visual-vocabulary.md > coins input` (8px)
- Texte d'aide : "Un email d'invitation sera envoye a cette adresse." 14px `visual-vocabulary.md > texte secondaire`

**Layout** : Padding horizontal 16px, gap 6px label-input, gap 4px input-aide
**Interaction** :
- Focus → bordure `visual-vocabulary.md > accent primaire`
- Validation email au blur

---

## Zone 3 : CTA Envoyer

**Contenu** :
- Bouton : `positioning.md > CTAs par Ecran > Mon Equipe` ("Inviter un collaborateur")
  - Fond `visual-vocabulary.md > accent primaire`, texte blanc, pleine largeur, height 48px
  - `visual-vocabulary.md > coins bouton` (8px)
  - Touch target : 48px >= 44px minimum

**Layout** : Padding 16px, safe-area-bottom
**Interaction** :
- Tap → envoie l'invitation → toast success "Invitation envoyee." → ferme le bottom sheet
- n8n trigger : `navigation-map.md > Points de Contact n8n > Post-inscription staff`

---

## Etats Speciaux

### Loading
- Bouton CTA : spinner 20px blanc, bouton desactive

### Error
- Email invalide : message inline 14px `visual-vocabulary.md > couleur erreur`
- Erreur serveur : toast `positioning.md > Messages de feedback > Error (generique)`

---

*Wireframe D03 | Inviter Agent | 3 zones*
