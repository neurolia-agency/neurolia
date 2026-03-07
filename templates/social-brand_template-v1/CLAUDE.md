# [NOM_PROJET] - Identite de Marque Social Media

Identite de marque pour [CLIENT], orientee production de contenu social media.

## Statut Pipeline

| Etape | Stage | Status | Output |
|-------|-------|--------|--------|
| S01 | Init | ⬜ | `pipeline/output/00-brief.md` |
| S02 | Brand | ⬜ | `pipeline/output/01-brand/` (8 fichiers) |

## Commandes

```bash
# /apex -a -s executer [SXX]-[nom] depuis pipeline/stages/[SXX]-[nom].md
```

## Sources de Verite

| Domaine | Source unique |
|---------|---------------|
| Statut pipeline | Ce fichier (CLAUDE.md) |
| Donnees client | `pipeline/input/` (brief + forms + assets) |
| Contenu brand | `pipeline/output/01-brand/` |
| Stack & dependances | `pipeline/workflow/` |

## Output (8 fichiers dans `output/01-brand/`)

| # | Fichier | Role |
|---|---------|------|
| 1 | `00-platform.md` | Plateforme de marque + Calibrage Creatif Social |
| 2 | `about.md` | Nom, mission, vision, valeurs, chiffres cles |
| 3 | `personas.md` | Cibles + scenarios social media + Comportement Social |
| 4 | `positioning.md` | Tagline, USPs + Piliers de Contenu Social + CTA Sociaux |
| 5 | `tone.md` | Registre, lexique + Adaptation Social Media + Regles Redactionnelles |
| 6 | `services.md` | Offre par categorie + Potentiel Social par service |
| 7 | `design-system.md` | Couleurs (HEX) + Typographies + Application Social Media |
| 8 | `objectifs.md` | Objectifs social media + KPIs |

## Contexte Projet

| Cle | Valeur |
|-----|--------|
| Client | [NOM_CLIENT] |
| Secteur | [SECTEUR] |
| Type | Identite de marque social media |
| Couleurs | HEX |
| Plateformes | [Instagram / Facebook / TikTok / LinkedIn / ...] |

## ADN Social

| Aspect | Valeur |
|--------|--------|
| Couleur signature | [A definir] |
| Typographies | [A definir] |
| Style photo | [Lifestyle / Studio / UGC / Mix] |
| Style video | [Cinematique / Raw / Talking head / Mix] |
| Formats privilegies | [A definir] |
| Ton | [A definir] |

## Contraintes

- **Ton** : [Vouvoiement/Tutoiement]
- **Couleurs** : HEX uniquement (compatibilite Canva/Figma/CapCut)
- **Pas de code** : Aucun fichier CSS, React, Next.js ou composant frontend
- **Livrable** : 8 fichiers Markdown d'identite de marque

---

*Derniere mise a jour : [DATE]*
