# Infos Bien (Staff - Lecture Seule) - Wireframe

**Route** : /intervention/[id]/infos-bien (push depuis Fiche Intervention)
**Objectif** : Afficher les informations pratiques du bien — adresse, code d'acces, WiFi, consignes — pour consultation rapide devant la porte.

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : `positioning.md > Messages par Ecran > Infos Bien` ("Informations du bien")
  - 16px weight 600, `visual-vocabulary.md > texte principal`, centre

**Layout** : Header sticky 56px + safe-area-top, back a gauche, titre centre
**Interaction** :
- Tap back → pop (retour Fiche Intervention)
- Touch target back : 44x44px

---

## Zone 2 : Adresse

**Contenu** :
- Icone map-pin 20px `visual-vocabulary.md > accent primaire`
- Adresse complete : 16px weight 400 `visual-vocabulary.md > texte courant`, underline
- Texte d'aide : "Appuyez pour ouvrir dans Maps" 12px `visual-vocabulary.md > texte desactive`

**Layout** : Padding horizontal 16px, padding-top 16px, gap 4px entre adresse et aide
**Interaction** :
- Tap adresse → ouvre Google Maps / Apple Maps avec l'adresse (intent natif)
- Touch target : 44px height minimum

---

## Zone 3 : Code d'Acces

**Contenu** :
- `emotion-map.md > Infos Bien > element signature` (code d'acces ultra-visible)
- Titre section : "Code d'acces" — `visual-vocabulary.md > en-tete section` (12px uppercase)
- Code : `visual-vocabulary.md > code acces gros` (20px JetBrains Mono semibold, fond neutral-100, padding 12px 16px, border-radius 8px)
- Bouton "Copier" adjacent : icone copy 20px `visual-vocabulary.md > accent primaire`, texte "Copier" 14px weight 500, `visual-vocabulary.md > accent primaire`
  - Apres copie : icone check 20px `visual-vocabulary.md > couleur succes` + texte "Copie !" pendant 2 secondes

**Layout** : Padding horizontal 16px, gap 24px apres Zone 2, gap 8px titre-code. Code et bouton copier en ligne (flexbox, code a gauche flex-1, bouton a droite).
**Interaction** :
- Tap code ou bouton "Copier" → copie dans le presse-papier, feedback visuel "Copie !"
- Touch target bouton copier : 44x44px

---

## Zone 4 : WiFi

**Contenu** :
- Titre section : "WiFi" — `visual-vocabulary.md > en-tete section` (12px uppercase)
- Nom reseau : label 14px `visual-vocabulary.md > texte secondaire` + valeur `visual-vocabulary.md > code monospace` (14px JetBrains Mono)
- Mot de passe : label + valeur `visual-vocabulary.md > code monospace` + bouton "Copier" (icone copy 16px)

**Layout** : Padding horizontal 16px, gap 24px apres Zone 3, gap 12px entre nom et mot de passe
**Interaction** :
- Tap mot de passe ou bouton → copie dans le presse-papier
- Touch target : 44px height

---

## Zone 5 : Consignes Specifiques

**Contenu** :
- Titre section : "Consignes" — `visual-vocabulary.md > en-tete section` (12px uppercase)
- Texte des consignes : 14px weight 400 `visual-vocabulary.md > texte courant`, align gauche
- Si consigne urgente : fond `visual-vocabulary.md > fond alerte`, padding 12px, `visual-vocabulary.md > coins badge` (6px)
  - `emotion-map.md > Infos Bien > element signature` (consignes urgentes fond warning-50)

**Layout** : Padding horizontal 16px, gap 24px apres Zone 4
**Interaction** : Aucune (lecture seule)

---

## Zone 6 : Bouton Appeler

**Contenu** :
- Bouton : "Appeler [prenom proprietaire]"
  - Icone phone 20px + texte 16px weight 600
  - Style secondary : fond blanc, bordure 1px `visual-vocabulary.md > bordure legere`, texte `visual-vocabulary.md > texte principal`
  - Pleine largeur, height 48px, `visual-vocabulary.md > coins bouton` (8px)
  - Touch target : 48px >= 44px minimum

**Layout** : Padding horizontal 16px, margin-top 32px, padding-bottom 32px + safe-area. Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** :
- Tap → appel telephonique direct (tel: link)

---

## Etats Speciaux

### Loading
- Header reel
- Zones 2-5 : skeletons texte (rectangles, pulse)
- Zone 6 : bouton skeleton

### Error
- Toast : `positioning.md > Messages de feedback > Error (generique)`

### Offline
- Donnees affichees depuis le cache local (code d'acces et WiFi sont critiques en offline)
- Banniere warning discrete sous header : "Mode hors-ligne."

---

*Wireframe D03 | Infos Bien (Staff) | 6 zones*
