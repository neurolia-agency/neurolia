# Input — Donnees Client

Ce dossier contient toutes les donnees fournies par le client ou collectees lors du brief. Ces fichiers sont la **source de verite** du projet — ils ne sont jamais modifies pendant le pipeline.

## Structure

```
input/
├── brief-client.md          # Questionnaire client rempli (OBLIGATOIRE)
├── assets/                  # Logo, images fournies
├── content/                 # Textes rediges par le client
└── forms/                   # Formulaires externes (CSV + manifests) — OPTIONNEL
    ├── brand-platform-manifest.md
    └── [type]-responses.csv
```

## Fichiers Detailles

### brief-client.md (OBLIGATOIRE)

Le questionnaire client rempli. C'est le point d'entree de l'etape S01-Init.

**Sections cles** :
- Informations generales (entreprise, contact, presence web)
- Presence Social Media (plateformes, abonnes, frequence, comptes concurrents)
- Offre / Services (produits, arguments, cible, concurrents)
- Identite visuelle (existante ou a creer)
- Ambition Creatif Social (style photo/video, 3 mots feed, anti-modeles)
- Objectifs Social Media (objectif principal, secondaires, KPIs)
- Contraintes (budget, frequence)

### assets/

Logo, images et fichiers visuels fournis par le client.

**Formats acceptes** : PNG, JPG, SVG, PDF, WEBP
**Nommage** : `[type]-[description].[ext]`
- `logo-principal.svg`
- `photo-produit-01.jpg`
- `photo-equipe.jpg`

### content/

Textes fournis par le client (si disponibles).

**Exemples** :
- `textes-services.md`
- `biographie.md`
- `temoignages.md`

### forms/ (OPTIONNEL)

Formulaires clients remplis en amont (Google Forms, Typeform, etc.). Chaque formulaire = 1 CSV + 1 manifest.

**Convention** :
- `[type]-responses.csv` — donnees brutes
- `[type]-manifest.md` — mapping des colonnes

**Regle de priorite** : `brief-client.md` prevaut en cas de contradiction avec un CSV.

## Regles

1. **Ne jamais modifier** les fichiers input/ pendant le pipeline
2. **Source de verite client** : En cas de doute, les donnees ici prevalent
3. **Versioning** : Si le client change d'avis, creer `brief-client-v2.md` (ne pas ecraser)
4. **Pas de donnees sensibles** : Ne pas stocker mots de passe ou cles API ici

## Checklist Pre-Projet

- [ ] `brief-client.md` rempli et valide par le client
- [ ] Logo fourni dans `assets/` (si existant)
- [ ] Formulaires externes deposes dans `forms/` avec manifest (si disponibles)

> **Minimum absolu** : Seul `brief-client.md` est strictement obligatoire.

---

*Social Brand Template v1.0*
