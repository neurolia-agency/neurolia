# Étape 03 : Structure (Sitemap)

## Objectif
Définir l'architecture des pages et la hiérarchie du contenu.

## Input
- `output/00-brief.md` (liste des pages)
- `output/01-brand/services.md` (pour structurer les pages services)

## Instructions

1. **Lire** le brief pour identifier les pages demandées
2. **Définir** la hiérarchie des pages
3. **Détailler** les sections de chaque page
4. **Spécifier** les liens entre pages

## Output

Créer `output/03-sitemap.md` :

```markdown
# Sitemap - [Nom du Projet]

## Vue d'ensemble

```
[Nom du Site]
├── Accueil (/)
├── Services (/services)
│   ├── Service 1 (/services/service-1)
│   └── Service 2 (/services/service-2)
├── À Propos (/a-propos)
├── Contact (/contact)
└── Mentions Légales (/mentions-legales)
```

## Pages Détaillées

### 1. Accueil (/)
**Objectif** : Présenter l'entreprise et convertir

**Sections** :
1. **Hero**
   - Titre principal (depuis positioning.md)
   - Sous-titre
   - CTA principal
   - Image/illustration

2. **Services** (aperçu)
   - 3 cards services
   - Lien "Voir tous les services"

3. **Avantages/Pourquoi nous**
   - 3 arguments de vente
   - Icônes ou illustrations

4. **Témoignages** (optionnel)
   - 2-3 témoignages clients

5. **CTA Final**
   - Titre accrocheur
   - Bouton contact

6. **Footer**
   - Navigation
   - Contact rapide
   - Réseaux sociaux
   - Mentions légales

### 2. Services (/services)
**Objectif** : Détailler l'offre

**Sections** :
1. Header page
2. Liste services (cards détaillées)
3. Process/Comment ça marche
4. CTA contact

### 3. À Propos (/a-propos)
**Objectif** : Créer la confiance

**Sections** :
1. Header page
2. Histoire/Mission
3. Valeurs
4. Équipe (optionnel)
5. Chiffres clés

### 4. Contact (/contact)
**Objectif** : Faciliter la prise de contact

**Sections** :
1. Header page
2. Formulaire de contact
3. Coordonnées
4. Carte (optionnel)
5. Horaires

### 5. Mentions Légales (/mentions-legales)
**Objectif** : Conformité RGPD

**Sections** :
1. Éditeur du site
2. Hébergeur
3. Données personnelles
4. Cookies

## Navigation

### Header
- Logo (lien accueil)
- Menu : Accueil | Services | À Propos | Contact
- CTA : [Bouton principal]

### Footer
- Colonnes : Navigation | Services | Contact | Légal
- Copyright
- Réseaux sociaux

## Responsive

| Breakpoint | Navigation |
|------------|------------|
| Desktop (>1024px) | Menu horizontal |
| Tablet (768-1024px) | Menu hamburger |
| Mobile (<768px) | Menu hamburger |
```

## Validation

- [ ] Toutes les pages du brief sont couvertes
- [ ] Chaque page a un objectif défini
- [ ] Sections listées pour chaque page
- [ ] Navigation header/footer définie
- [ ] URLs définies

## Prochaine Étape

Une fois `output/03-sitemap.md` créé → Passer à `stages/03.5-wireframes.md`

**Note** : L'étape 03.5-Wireframes définit le contenu détaillé de chaque page avant de créer les tokens CSS (02-Design).

---

**Version** : 1.1
**Phase** : A4 (Architecture)
**Dépendances** : A1 (00-Init), A2 (01-Brand)
**Produit pour** : A5 (03.5-Wireframes)
