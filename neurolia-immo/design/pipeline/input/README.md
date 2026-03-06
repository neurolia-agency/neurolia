# Pipeline Input

Donnees entrantes pour le pipeline design mobile.

## Structure

```
input/
├── imports/             # Artefacts du template architecture
│   ├── prd.md           # Product Requirements Document
│   ├── features.md      # Liste des fonctionnalites
│   ├── user-flows/      # Flux utilisateurs
│   ├── navigation-map.md # Carte de navigation
│   └── tech-stack.md    # Stack technique choisie
│
├── assets/              # Fichiers fournis par le client
│   ├── logo.svg         # Logo (SVG prefere)
│   ├── logo.png         # Logo PNG (fallback)
│   └── [images]/        # Autres images fournies
│
└── references/          # Inspirations visuelles
    └── apps.md          # Apps de reference annotees
```

## Imports depuis le Template Architecture

Ces fichiers proviennent de `app-architecture-template/pipeline/output/` et sont la base de toutes les decisions design.

| Fichier | Source dans archi | Utilise par | Description |
|---------|-------------------|-------------|-------------|
| `prd.md` | `01-brief/prd.md` | D01 | Contexte business, objectifs, contraintes |
| `features.md` | `01-brief/features.md` | D01, D03 | Liste des fonctionnalites avec priorites |
| `user-flows/` | `02-user-flows/` | D03 | Parcours utilisateurs detailles |
| `navigation-map.md` | `02-user-flows/navigation-map.md` | D03 | Structure de navigation de l'app |
| `tech-stack.md` | `05-tech/tech-stack.md` | D04, D05 | Stack technique (React Native, Flutter, PWA) |

### Commande d'import

```bash
# Depuis la racine du projet architecture
SRC=../mon-projet-archi/pipeline/output
DEST=pipeline/input/imports

cp $SRC/01-brief/prd.md $DEST/
cp $SRC/01-brief/features.md $DEST/
cp -r $SRC/02-user-flows/ $DEST/user-flows/
cp $SRC/02-user-flows/navigation-map.md $DEST/
cp $SRC/05-tech/tech-stack.md $DEST/
```

## Assets

Deposer ici les fichiers fournis par le client :

- **Logo** : format SVG prefere, PNG en fallback
- **Images** : photos produits, equipe, locaux
- **Icones** : icones custom si existants
- **Polices** : fichiers de polices si non-Google Fonts

## References

Creer un fichier `apps.md` avec les applications d'inspiration :

```markdown
# Applications de Reference

## [Nom App 1]
- **Plateforme** : iOS / Android / PWA
- **Ce qu'on retient** :
  - [Element UI 1]
  - [Element UI 2]
- **A adapter** : [Comment transposer au projet]

## [Nom App 2]
[Meme structure...]
```

---

*Template App Design v1.0*
