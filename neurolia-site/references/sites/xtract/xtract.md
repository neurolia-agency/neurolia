# Xtract

**URL** : https://xtract.framer.ai/
**Type** : Template Framer — agence d'automatisation IA
**Pertinence** : Concurrent direct. Meme produit que Neurolia (automatisation + web). Reference structure + positionnement.
**Statut** : Analyse terminee, brief d'implementation valide (`references/briefs/process-section-landing.md`)

## Pourquoi cette reference

Premier site trouve qui vend exactement le meme type de service que Neurolia : automatisation + web pour des entreprises. Comment ils structurent leurs offres, expliquent les benefices, guident vers le devis — tout est directement comparable.

## Analyse

### Positionnement
- Services en cards grille (pas une liste plate), chaque card = icone + titre + benefice court
- Pas de pricing visible sur la landing → conversion par contact (comme nous)
- ~4-6 services max visibles, details sur pages dediees
- Notre page services a 7 services + 3 packs — trop dense compare a ca

### Structure des sections (complete)
1. Nav sticky (logo | menu center | CTAs right)
2. Hero (headline large + sous-titre + CTAs + background anime orbe violette)
3. Services/Features — 3 blocs split (image mock UI gauche + texte droite) :
   - "Automatiser les taches repetitives" (tags: Robots de taches internes, Plus de 100 automatisations)
   - "Deleguer les taches quotidiennes" (tags: Resumes, Planification, Beaucoup d'autres) + mock assistant IA
   - "Accelerer la croissance des ventes" (tags: Conduit, Contenu, Publication reseaux sociaux)
   - "Concevoir des systemes plus intelligents" (tags: Strategie, IA personnalisee, Consultant)
4. Process (4 etapes en grille 2x2, chacune avec mock UI anime)
5. Social proof (titre + 4 temoignages en grille 2x2 avec etoiles)
6. Avantages IA (grille 2x3 : Productivite, Experience client, 24/7, Couts, Data, Scalabilite)
7. Case Study (image produit + citation + metriques d'impact en liste)
8. Pricing (3 tiers : Demarreur 37$/mois, Pro 75$/mois, Entreprise custom)
9. CTA final + Footer

### Ce qu'on reprend (adapte a nos contraintes)
- Cards process avec **visuels animes** a l'interieur (adapte a notre palette/ADN)
- L'idee de rendre chaque etape **visuelle et concrete**
- Section process sur la landing page (la notre est enterree sur /services)
- Tags de sous-fonctionnalites sur les cards services (scannable)
- CTAs repetes a chaque section (pas juste hero)

### Ce qu'on ne reprend pas
- Gradient text purple → pink (pas notre palette)
- Orbes blur background (interdit X18/X20)
- Border-radius cards (interdit C24)
- Hero tout centre (interdit X2)
- 2 CTAs cote a cote identiques (interdit X11)
- Mocks generiques deconnectes du vrai service (nous on montre le parcours reel client)

### Decisions prises

| Decision | Statut | Brief |
|----------|--------|-------|
| Section Process sur landing avec visuels animes | Valide | `references/briefs/process-section-landing.md` |
| Section Avantages/Benefices | A discuter | — |
| Tags sous-services sur les cards | A discuter | — |
| Pricing indicatif | A discuter | — |

## Contenu du dossier

```
xtract/
├── xtract.md                        # Ce fichier
├── styles.css                       # Tokens CSS extraits du site
├── components/
│   ├── hero.html                    # HTML Framer exporte (hero complet)
│   ├── card-process.html            # HTML Framer exporte (4 cards process, ~52k tokens)
│   ├── card-service.html            # HTML Framer exporte (cards services)
│   └── card-price.html              # HTML Framer exporte (cards pricing)
└── screenshots/
    ├── hero.png                     # Hero avec orbe violette
    ├── services-1.png               # Section services (intro + premier bloc)
    ├── services-2.png               # Services (assistant IA + ventes)
    ├── services-3.png               # Services (projets personnalises)
    ├── process.png                  # 4 etapes process avec mocks UI
    ├── social-proof.png             # 4 temoignages en grille
    ├── ai-advantages.png            # Grille 2x3 avantages IA
    ├── case-study.png               # Etude de cas avec metriques
    └── prices.png                   # 3 tiers de pricing
```

---

*Ajoute : 2026-02-09 — Analyse completee et brief process valide le meme jour*
