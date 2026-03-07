# Etape S01 : Initialisation

> **Premiere etape du pipeline social brand.**

## Objectif

Transformer le brief client et toutes les sources disponibles en un **document strategique structure** exploitable par l'etape S02-Brand. Ce document doit couvrir l'identite, le positionnement, l'offre, la concurrence et la presence social media existante.

## Input

- `input/brief-client.md` (questionnaire rempli)
- `input/` (tous les assets fournis : logos, images)
- `input/forms/` (reponses de formulaires externes — si disponibles)
- `input/existing-posts/` (posts existants — si disponibles)
- Conversation avec le client (si informations complementaires)
- Sources internes (analyses, audits, donnees existantes)

## Instructions

1. **Lire** le brief client complet et tous les documents dans `input/`
2. **Detecter** les formulaires dans `input/forms/` — si presents :
   a. Lire le manifest pour comprendre le mapping
   b. Extraire uniquement les donnees mappees vers S01
   c. Croiser avec brief-client.md (le brief prevaut en cas de contradiction)
   d. Signaler si CSV sans manifest (dans "Elements Manquants")
3. **Analyser** les posts existants dans `input/existing-posts/` — si presents :
   a. Detecter les patterns (hashtags recurrents, ton, CTAs, types de contenu)
   b. Identifier ce qui fonctionne vs. ce qui ne fonctionne pas
   c. Extraire le style de caption dominant
4. **Analyser** les assets fournis (logos, contenus existants) — en extraire les informations exploitables
5. **Identifier** le positionnement et les differenciateurs
6. **Rechercher** le contexte concurrentiel social media (comptes concurrents, benchmarks secteur)
7. **Rediger** le brief structure selon le template ci-dessous
8. **Lister** explicitement les elements manquants avec leur impact sur le pipeline

> **Principe** : Mieux vaut documenter une information comme "A confirmer" que de l'omettre. Le brief doit cartographier tout ce qu'on sait ET tout ce qu'on ne sait pas encore.

## Output

Creer `output/00-brief.md` :

```markdown
# Brief Projet Social : [Nom]

> Produit par l'etape S01-Init — [Date] (v1)

## Client

- **Entreprise** : [Nom commercial]
- **Secteur** : [Secteur d'activite]
- **Contact** : [Telephone / Email]
- **Adresse** : [Adresse complete]
- **Site web** : [URL ou "Aucun"]
- **Identite existante** : [Logo existant ? Charte graphique ?]

## Projet

- **Type** : Identite de marque social media
- **Objectif principal social** : [Ex: notoriete, engagement, trafic, ventes]
- **KPI** : [Metrique mesurable — ex: taux d'engagement, abonnes/mois]

### Objectifs Detailles

1. [Objectif 1 — avec contexte]
2. [Objectif 2]
3. [Objectif 3]

## Cibles

### Persona A — [Nom descriptif]
- [Contexte / situation]
- [Besoin principal]
- [Comportement social media — quelles plateformes, quand, quel contenu consomme]

### Persona B — [Nom descriptif]
- [Contexte / situation]
- [Besoin principal]
- [Comportement social media]

> Maximum 3 personas.

## Positionnement & Messages Cles

- **ADN / Positionnement** : [Phrase qui capture l'essence de la marque]
- **Valeurs** : [3-4 valeurs cles]
- **Differenciateur** : [Ce qui distingue le client de ses concurrents]
- **Tagline / Signature** : [Phrase d'accroche]
- **Proposition de valeur** : [Promesse principale au client final]

## Offre

| Categorie | Produits / Services | Prix / Gamme |
|-----------|---------------------|--------------|
| [Categorie 1] | [Detail] | [Prix ou "A detailler"] |
| [Categorie 2] | [Detail] | [Prix ou "A detailler"] |

> Adapter les colonnes au secteur.

## Concurrence

### Concurrence Business

| Type | Exemples | Faiblesse exploitable |
|------|----------|-----------------------|
| [Concurrent direct] | [Noms] | [Ce qu'on fait mieux] |
| [Concurrent indirect] | [Noms] | [Ce qu'on fait mieux] |

### Concurrence Social Media

| Compte | Plateforme | Abonnes | Forces | Faiblesses |
|--------|-----------|---------|--------|------------|
| @[compte1] | [IG/FB/TT] | [nombre] | [Ce qu'ils font bien] | [Ce qu'on peut faire mieux] |
| @[compte2] | [IG/FB/TT] | [nombre] | [Forces] | [Faiblesses] |
| @[compte3] | [IG/FB/TT] | [nombre] | [Forces] | [Faiblesses] |

> Si pas de donnees concurrentielles : noter "A analyser" et ne pas bloquer.

## Identite Visuelle Existante

### Couleurs
| Token | Hex | Usage |
|-------|-----|-------|
| [Nom] | #[hex] | [Role — ex: accent, fond] |

### Typographies
- **[Role]** : [Nom de la police] ([style])

### Logo
- [Description : variantes, format, statut]

### Ton
- [Tutoiement / Vouvoiement]
- [Registre — ex: chaleureux, professionnel, technique]

> Si pas d'identite visuelle existante : noter "A creer en S02-Brand".

## Presence Social Media

### Plateformes actives

| Plateforme | Actif | Abonnes | Frequence | Type de contenu |
|-----------|-------|---------|-----------|-----------------|
| Instagram | [Oui/Non] | [nombre] | [freq] | [photos/reels/stories/mix] |
| Facebook | [Oui/Non] | [nombre] | [freq] | [type] |
| TikTok | [Oui/Non] | [nombre] | [freq] | [type] |
| LinkedIn | [Oui/Non] | [nombre] | [freq] | [type] |

### Analyse Posts Existants (si existing-posts/ fourni)

- **Nombre de posts analyses** : [X]
- **Periode couverte** : [Date debut — Date fin]
- **Hashtags recurrents** : [liste]
- **Ton detecte** : [description]
- **CTAs utilises** : [liste]
- **Style de caption dominant** : [description]
- **Ce qui fonctionne** : [patterns identifies]
- **Ce qui ne fonctionne pas** : [patterns identifies]

> Si aucun post existant : noter "Aucun historique — creation ex nihilo".

## Ambition Creatif Social

- **Style photo** : [Lifestyle / Studio / UGC / Mix]
- **Style video** : [Cinematique / Raw / Talking head / Mix]
- **3 mots pour le feed** : [Mot 1, Mot 2, Mot 3]
- **Anti-modeles** : [Ce que les reseaux ne doivent surtout PAS etre]
- **Contenu prefere** : [Types de contenu que le client aime creer]

## Sources Externes

| Source | Type | Exploite en S01 | Donnees restantes pour |
|--------|------|-----------------|----------------------|
| [fichier ou "Aucun"] | [brand-platform / — ] | [Oui/Partiel/Non] | [S02-Brand / — ] |

## Elements Manquants

| Element | Impact | Bloque |
|---------|--------|--------|
| [Element 1] | [Ce que ca empeche de faire] | [S02 / Non bloquant] |
| [Element 2] | [Impact] | [Etape bloquee] |

> Cette section est critique pour anticiper les blocages.

## Notes Strategiques

- [Insight 1 — observation actionnable]
- [Insight 2]
- [Insight 3]

---

## Validation S01-Init

- [ ] Nom entreprise defini
- [ ] Objectif social media clair et mesurable (avec KPI)
- [ ] Cibles decrites (au moins 1 persona avec comportement social)
- [ ] Positionnement et differenciateurs definis
- [ ] Offre documentee
- [ ] Concurrence analysee (business + social media)
- [ ] Identite visuelle documentee (existante ou "A creer")
- [ ] Plateformes actives listees avec metriques
- [ ] Ambition creatif social definie (style photo/video, 3 mots, anti-modeles)
- [ ] Posts existants analyses (ou "Aucun historique")
- [ ] Elements manquants listes avec impact
- [ ] Sources externes listees (formulaires dans input/forms/)
```

---

**Version** : 1.0
**Phase** : S01
**Dependances** : Aucune
**Produit pour** : S02 (Brand)
