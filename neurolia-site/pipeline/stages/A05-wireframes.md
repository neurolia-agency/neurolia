# Étape 03.5 : Wireframes

## Objectif

Créer un brief structuré pour chaque page, servant d'**unique source de contenu** pour frontend-design.

**Principe clé** : Les wireframes **référencent** les fichiers brand/ sans dupliquer leur contenu.

## Input

- `output/01-brand/` (tous les fichiers)
- `output/03-sitemap.md` (architecture pages)

## Output

Créer `output/03.5-wireframes/` avec un fichier par page :

```
output/03.5-wireframes/
├── homepage.md
├── services.md
├── portfolio.md
├── contact.md
└── about.md
```

---

## Format Wireframe (STRICT)

Chaque wireframe suit ce format minimal :

```markdown
# [Page] - Wireframe

**Route** : /[route]
**Objectif** : [1 phrase]
**Outil principal** : frontend-design | shadcn/ui (pour forms)

---

## Section 1 : [Nom]

**Contenu** :
- H1 : `positioning.md > hero_title`
- Baseline : `positioning.md > hero_subtitle`
- CTA : `positioning.md > cta_principal` → /contact

**Layout** : [Description courte]
**Interaction** : [hover/scroll/click]
**Ref design** : [eszterbial.com / papertiger.com / spécifique]

---

## Section 2 : [Nom]

[Même structure...]
```

### Règles du format

1. **Pas de texte dupliqué** : Utiliser la notation `fichier.md > clé` pour référencer brand/
2. **Sections numérotées** : Ordre d'apparition sur la page
3. **1 section = 1 bloc** : Sera traité individuellement par frontend-design
4. **Notes design courtes** : Référence visuelle + contrainte principale

---

## Exemple : Homepage

```markdown
# Homepage - Wireframe

**Route** : /
**Objectif** : Captiver, différencier, convertir
**Outil principal** : frontend-design (95%) + shadcn/ui (5% contact form)

---

## Section 1 : Hero

**Contenu** :
- H1 : `positioning.md > tagline` ("Un business qui respire.")
- Baseline : `positioning.md > baseline`
- CTA : `positioning.md > cta_principal` → /contact

**Layout** : Plein écran, centré, typographie seule (pas d'image)
**Interaction** : Fade-in staggered au load
**Ref design** : papertiger.com (hero épuré, typo massive)

---

## Section 2 : Services (aperçu)

**Contenu** :
- Titre : "Nos leviers de croissance"
- Cards : `services.md > services[0-2]` (3 premiers services)
- Lien : "Tous nos services" → /services

**Layout** : Grid 3 colonnes, cards minimalistes
**Interaction** : Hover scale 1.02, reveal au scroll
**Ref design** : eszterbial.com (cards épurées)

---

## Section 3 : Portfolio (aperçu)

**Contenu** :
- Titre : `positioning.md > portfolio_message`
- Projets : 2-3 projets phares (placeholder si pas encore définis)
- Lien : "Voir nos réalisations" → /portfolio

**Layout** : Asymétrique, images grandes
**Interaction** : Parallax subtil au scroll
**Ref design** : papertiger.com (galerie)

---

## Section 4 : Témoignages

**Contenu** :
- Titre : "Ils nous font confiance"
- Témoignages : 2 citations (placeholder)

**Layout** : Slider ou stack vertical
**Interaction** : Auto-scroll ou manuel

---

## Section 5 : Contact (mini)

**Contenu** :
- Titre : `positioning.md > contact_message`
- Form : Nom, Email, Message (3 champs)
- CTA : "Envoyer"

**Layout** : 2 colonnes (texte + form)
**Outil** : shadcn/ui Form + Input + Textarea
**Interaction** : Focus states, validation

---

## Section 6 : CTA Final

**Contenu** :
- Titre : "Prêt à transformer votre présence digitale ?"
- CTA : `positioning.md > cta_principal` → /contact

**Layout** : Pleine largeur, fond accent
**Interaction** : Hover CTA
```

---

## Notation des Références

| Notation | Signification |
|----------|---------------|
| `fichier.md > clé` | Valeur à récupérer dans le fichier brand/ |
| `fichier.md > array[0-2]` | Premiers éléments d'une liste |
| `(placeholder)` | Contenu à définir plus tard |
| `→ /route` | Destination du lien/CTA |

---

## Pages à Créer

| Page | Sections principales | shadcn/ui |
|------|---------------------|-----------|
| homepage.md | Hero, Services, Portfolio, Témoignages, Contact mini, CTA | Form (section 5) |
| services.md | Hero page, Grid 7 services, Process, FAQ, CTA | Non |
| portfolio.md | Hero page, Grid projets, Étude de cas, CTA | Non |
| contact.md | Hero page, Form complet, Coordonnées | Form complet |
| about.md | Hero page, Mission, Valeurs, Chiffres, CTA | Non |

---

## Validation

- [ ] 5 wireframes créés
- [ ] Format strict respecté (pas de texte dupliqué)
- [ ] Références `fichier.md > clé` utilisées
- [ ] Sections numérotées
- [ ] Notes design présentes
- [ ] shadcn/ui indiqué uniquement pour formulaires

## Prochaine Étape

Une fois les wireframes créés → `stages/02-design.md`

> **Note** : Les tokens CSS (02-design) sont créés APRÈS les wireframes pour répondre aux vrais besoins du contenu défini.

---

**Version** : 1.1
**Phase** : A5 (Architecture)
**Dépendances** : A3 (01.5-Art Direction), A4 (03-Structure)
**Produit pour** : A6 (02-Design), B1-B3 (Frontend)
