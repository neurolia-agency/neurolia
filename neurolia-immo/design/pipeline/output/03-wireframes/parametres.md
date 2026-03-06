# Parametres (Owner) - Wireframe

**Route** : /parametres (push depuis Hub Gestion)
**Objectif** : Acceder aux reglages du compte : profil, synchronisation, notifications, compte.

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : "Parametres" — 16px weight 600, `visual-vocabulary.md > texte principal`, centre

**Layout** : Header sticky 56px + safe-area-top, back a gauche, titre centre
**Interaction** :
- Tap back → pop (retour Hub Gestion)
- Touch target back : 44x44px

---

## Zone 2 : Sections Parametres

**Contenu** :
- `emotion-map.md > Parametres > element signature` : sections separees par en-tetes uppercase
- **Section "Profil"** — `visual-vocabulary.md > en-tete section` (12px uppercase neutral-500)
  - "Prenom et nom" : icone user 20px + texte 16px weight 500 + valeur a droite 14px `visual-vocabulary.md > texte secondaire` + chevron
  - "Email" : icone mail 20px + texte + valeur + chevron
  - "Telephone" : icone phone 20px + texte + valeur + chevron
- **Section "Synchronisation"** — en-tete uppercase
  - "Configuration IMAP" : icone mail-search 20px + texte + badge statut (Configure / Non configure) + chevron
  - "URLs iCal" : icone link 20px + texte + chevron
- **Section "Notifications"** — en-tete uppercase
  - "Notifications push" : icone bell 20px + texte + toggle switch a droite
  - "Emails quotidiens" : icone mail 20px + texte + toggle switch
- **Section "Compte"** — en-tete uppercase
  - "Se deconnecter" : icone log-out 20px + texte 16px weight 500, `visual-vocabulary.md > couleur erreur`
  - "Supprimer le compte" : icone trash 20px + texte, `visual-vocabulary.md > couleur erreur`

- Chaque item : padding 16px, `visual-vocabulary.md > separateur liste` entre items dans une section
- Fond section : `visual-vocabulary.md > surface card`, `visual-vocabulary.md > coins card` (12px), bordure 1px `visual-vocabulary.md > bordure legere`

**Layout** : Padding horizontal 16px, padding-top 16px, gap 24px entre sections, gap 8px entre en-tete section et premier item. Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** :
- Tap "Prenom et nom" / "Email" / "Telephone" → bottom sheet d'edition avec 1 champ + bouton Enregistrer
- Tap "Configuration IMAP" → ecran dedie (formulaire IMAP, hors scope detail wireframe)
- Tap toggle → change l'etat (animation `visual-vocabulary.md > transition standard` 200ms)
- Tap "Se deconnecter" → `constraints.md > Actions destructives sans confirmation` : dialog "Vous deconnecter ?" → confirmation → retour Login
- Tap "Supprimer le compte" → dialog confirmation avec message "Cette action est irreversible. Toutes vos donnees seront supprimees." + bouton "Annuler" + bouton "Supprimer" (danger)
- Touch target chaque item : 56px height >= 44px minimum

---

## Etats Speciaux

Pas d'etat empty ni loading (ecran statique avec preferences locales). Les toggles refletent l'etat serveur.

### Error
- Echec sauvegarde toggle : toast `positioning.md > Messages de feedback > Error (generique)`, toggle revient a l'etat precedent

---

*Wireframe D03 | Parametres | 2 zones*
