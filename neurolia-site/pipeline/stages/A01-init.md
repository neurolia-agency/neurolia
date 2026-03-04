# Étape 00 : Initialisation

## Objectif
Transformer le besoin client en brief structuré.

## Input
- Description verbale du projet (conversation avec client)
- URL site existant (si refonte)
- Exemples/inspirations fournis

## Instructions

1. **Collecter les informations essentielles** :
   - Nom de l'entreprise
   - Secteur d'activité
   - Objectif principal du site (leads, ventes, notoriété)
   - Cible principale
   - Budget/délai (si connu)

2. **Identifier le type de site** :
   - Landing page (1 page, conversion)
   - Site vitrine (3-5 pages, présentation)
   - E-commerce (catalogue, paiement)

3. **Lister les pages nécessaires** :
   - Accueil (toujours)
   - Services/Produits
   - À propos
   - Contact
   - Autres (blog, FAQ, etc.)

4. **Rédiger le brief** selon le template

## Output

Créer `output/00-brief.md` avec :

```markdown
# Brief Projet : [Nom]

## Client
- **Entreprise** :
- **Secteur** :
- **Contact** :

## Projet
- **Type** : [Landing / Vitrine / E-commerce]
- **Objectif** :
- **Cible principale** :

## Pages
- [ ] Accueil
- [ ] [Autres pages]

## Références
- [URL inspiration 1]
- [URL inspiration 2]

## Contraintes
- Délai :
- Budget :
- Technique :

## Notes
[Informations complémentaires]
```

## Validation

- [ ] Nom entreprise défini
- [ ] Type de site identifié
- [ ] Objectif clair
- [ ] Liste des pages établie

## Prochaine Étape

Une fois `output/00-brief.md` créé → Passer à `stages/01-brand.md`
