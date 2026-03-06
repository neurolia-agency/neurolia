# Livret Accueil Preview (Owner) - Wireframe

**Route** : /propriete/[id]/livret (push depuis Fiche Bien)
**Objectif** : Previsualiser le livret d'accueil digital du bien et acceder au QR code partageable.

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : `positioning.md > Messages par Ecran > Livret Accueil Preview` ("Livret d'accueil — [Nom du bien]")
  - 16px weight 600, `visual-vocabulary.md > texte principal`, centre

**Layout** : Header sticky 56px + safe-area-top, back a gauche, titre centre
**Interaction** :
- Tap back → pop (retour Fiche Bien)
- Touch target back : 44x44px

---

## Zone 2 : QR Code

**Contenu** :
- QR code genere dynamiquement, 200x200px, centre
- URL publique sous le QR : 14px `visual-vocabulary.md > code monospace`, `visual-vocabulary.md > texte secondaire`
- Bouton : `positioning.md > CTAs par Ecran > Fiche Bien (livret)` ("Partager le QR code")
  - Style secondary : fond blanc, bordure 1px `visual-vocabulary.md > bordure legere`, texte `visual-vocabulary.md > accent primaire`, icone share 16px
  - Height 44px, `visual-vocabulary.md > coins bouton` (8px)

**Layout** : Padding horizontal 16px, padding-top 24px, centre horizontal, gap 8px entre QR et URL, gap 16px entre URL et bouton
**Interaction** :
- Tap "Partager" → ouverture du share sheet natif (iOS/Android) avec le lien du livret
- Touch target : 44px height

---

## Zone 3 : Preview du Livret

**Contenu** :
- Titre section : "Apercu" — `visual-vocabulary.md > en-tete section` (12px uppercase)
- Card preview simulant la page publique :
  - Titre du bien : `visual-vocabulary.md > titre card`
  - Section WiFi : nom + mot de passe en `visual-vocabulary.md > code monospace`
  - Section "Regles de la maison" : texte courant 14px
  - Section "Numeros utiles" : liste de contacts
  - Section "Recommandations" : texte courant 14px
- Card : fond `visual-vocabulary.md > surface card`, bordure 1px `visual-vocabulary.md > bordure legere`, `visual-vocabulary.md > coins card` (12px), padding 16px

**Layout** : Padding horizontal 16px, gap 24px apres Zone 2, gap 16px entre sections internes. Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** :
- Tap "Modifier le livret" (lien texte en bas) → bottom sheet d'edition (futur, hors scope wireframe detail)

---

## Etats Speciaux

### Loading
- Zone 2 : skeleton rectangle 200x200px (QR) + skeleton texte
- Zone 3 : skeleton card (rectangle pleine largeur x 200px)

### Error
- Toast : `positioning.md > Messages de feedback > Error (generique)`

---

*Wireframe D03 | Livret Accueil Preview | 3 zones*
