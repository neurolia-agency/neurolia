# Input — Données Client

Ce dossier contient toutes les données fournies par le client ou collectées lors du brief. Ces fichiers sont la **source de vérité** du projet — ils ne sont jamais modifiés pendant le pipeline.

## Structure

```
input/
├── brief-client.md          # Questionnaire client rempli (OBLIGATOIRE)
├── references/
│   ├── sites.md             # Sites d'inspiration annotés (RECOMMANDÉ)
│   └── screenshots/         # Captures d'écran des références (RECOMMANDÉ)
├── assets/                  # Logo, images, vidéos fournies par le client
├── content/                 # Textes rédigés par le client
├── typographies/            # Polices si identité existante
└── forms/                   # Formulaires externes (CSV + manifests) — OPTIONNEL
    ├── README.md
    ├── [type]-responses.csv
    └── [type]-manifest.md
```

## Fichiers Détaillés

### brief-client.md (OBLIGATOIRE)

Le questionnaire client rempli. C'est le point d'entrée de l'étape A01-Init. Le pipeline ne peut pas démarrer sans ce fichier.

**Sections clés** :
- Informations générales (entreprise, contact)
- Type de site et objectif principal
- Cible et concurrents
- Contenu (pages, services, arguments, témoignages)
- Ambition visuelle (niveau de design, 3 adjectifs, anti-modèles, complexité technique)
- Inspirations (sites aimés + sites à éviter)
- Technique (domaine, fonctionnalités)
- Contraintes (budget, délai)

### references/sites.md (RECOMMANDÉ)

Liste annotée de 2-5 sites d'inspiration identifiés avec le client. Si ce fichier est vide ou absent, l'étape A03 lancera une recherche automatique pour trouver des références pertinentes.

### references/screenshots/ (RECOMMANDÉ)

Captures d'écran des sections de sites qui plaisent au client. Plus utiles que les URLs seules car Claude les analyse visuellement (proportions, couleurs, espacements, densité).

**Nommage** : `[ref]-[section].png`
- `ref1-hero.png` — le hero d'un site de référence
- `ref2-cards-services.png` — un pattern de cards intéressant
- `hors-ref-typo-inspi.png` — une inspiration typographique trouvée ailleurs

> **Conseil** : des screenshots de sections précises sont plus exploitables que des pages entières.

### assets/

Images, logos et fichiers visuels fournis par le client.

**Formats acceptés** : PNG, JPG, SVG, PDF, WEBP
**Nommage** : `[type]-[description].[ext]`
- `logo-principal.svg`
- `logo-monochrome.svg`
- `photo-equipe.jpg`
- `photo-atelier-01.jpg`
- `illustration-service-plomberie.png`

### content/

Textes fournis par le client (si disponibles). Chaque fichier = un sujet.

**Exemples** :
- `textes-services.md` — descriptions de chaque service
- `biographie.md` — histoire de l'entreprise
- `temoignages.md` — avis clients
- `faq.md` — questions fréquentes

> Si le client ne fournit pas de textes, le pipeline les génèrera à partir du brief.

### typographies/

Polices fournies par le client si identité existante.

**Formats** : .ttf, .otf, .woff, .woff2

> Si le client n'a pas de polices, l'étape A02-Brand en sélectionnera.

### forms/ (OPTIONNEL)

Formulaires clients remplis en amont du pipeline (Google Forms, Typeform, etc.). Chaque formulaire = 1 CSV (données brutes) + 1 manifest (mapping colonnes → concepts pipeline).

**Types supportés** : `brand-platform`, `strategy-audit`, `customer-survey` (extensible)

**Convention** :
- `[type]-responses.csv` — données brutes exportées du formulaire
- `[type]-manifest.md` — mapping des colonnes vers les concepts du pipeline

**Règle de priorité** : `brief-client.md` prévaut toujours en cas de contradiction avec un CSV.

> Voir `forms/README.md` pour la documentation complète.

## Règles

1. **Ne jamais modifier** les fichiers input/ pendant le pipeline
2. **Source de vérité client** : En cas de doute, les données ici prévalent
3. **Versioning** : Si le client change d'avis, créer `brief-client-v2.md` (ne pas écraser)
4. **Pas de données sensibles** : Ne pas stocker mots de passe ou clés API ici

## Checklist Pré-Projet

Avant de démarrer A01-Init, vérifier :

- [ ] `brief-client.md` rempli et validé par le client
- [ ] Logo fourni dans `assets/` (si existant)
- [ ] Références visuelles renseignées dans `references/sites.md` (même partiellement)
- [ ] Textes principaux déposés dans `content/` (si disponibles)
- [ ] Polices déposées dans `typographies/` (si identité existante)
- [ ] Formulaires externes déposés dans `forms/` avec manifest (si disponibles)

> **Minimum absolu** : Seul `brief-client.md` est strictement obligatoire. Tout le reste est un bonus qui améliore la qualité du résultat.

---

*Template Workflow v2.0*
