# Existing Posts — Bootstrap Anti-Repetition

Ce dossier contient les posts social media existants du client. Ils servent a :
1. **Eviter la repetition** — ne pas reproduire des messages/angles deja publies
2. **Identifier les patterns** — comprendre ce qui a fonctionne ou non
3. **Bootstrap le style** — detecter le ton, les hashtags, les CTAs deja utilises

## Format attendu

### Option 1 : Export CSV (prefere)

Un fichier CSV avec les colonnes suivantes :

| Colonne | Description | Obligatoire |
|---------|-------------|-------------|
| `date` | Date de publication (YYYY-MM-DD) | Oui |
| `platform` | Plateforme (instagram, facebook, tiktok, linkedin) | Oui |
| `content_type` | Type (post, story, reel, carousel) | Oui |
| `caption` | Texte complet de la publication | Oui |
| `hashtags` | Hashtags utilises (separes par espaces) | Non |
| `cta` | Appel a l'action identifie | Non |
| `engagement` | Likes, commentaires, partages (format libre) | Non |
| `url` | Lien vers le post | Non |

**Nommage** : `[plateforme]-posts.csv` (ex: `instagram-posts.csv`)

### Option 2 : Fichier Markdown

Un fichier par plateforme avec les posts listes chronologiquement :

```markdown
# Posts Instagram — [Nom Client]

## 2026-03-01
**Type** : Post (carousel)
**Caption** : "[Texte complet]"
**Hashtags** : #tag1 #tag2 #tag3
**CTA** : Lien en bio
**Engagement** : 45 likes, 3 commentaires

---

## 2026-02-25
[...]
```

**Nommage** : `[plateforme]-posts.md` (ex: `instagram-posts.md`)

### Option 3 : Screenshots

Si export impossible, deposer des screenshots des posts dans ce dossier.

**Nommage** : `[plateforme]-[date]-[type].png`
- `instagram-2026-03-01-post.png`
- `instagram-2026-02-25-reel.png`

## Combien de posts ?

- **Minimum** : 10 derniers posts par plateforme active
- **Ideal** : 30 derniers posts (1-3 mois d'historique)
- **Maximum utile** : 50 posts (au-dela, l'analyse perd en pertinence)

## Utilisation dans le pipeline

Ces donnees sont consommees en **S01-Init** pour :
- Detecter les hashtags recurrents → `tone.md` (#40-41)
- Analyser le ton existant → `tone.md` (#28-32)
- Identifier les CTAs utilises → `positioning.md` (#43)
- Detecter le style de caption → `tone.md` (#33 writing_rules)
- Eviter la repetition dans les futurs plannings editoriaux

## Champs WF00 couverts

| # | Champ | Source |
|---|-------|--------|
| 57 | `content_type` | Colonne content_type |
| 58 | `caption` | Colonne caption |
| 59 | `hashtags` | Colonne hashtags |
| 60 | `cta` | Colonne cta |
| 61 | `caption_style` | Detecte a l'analyse |
| 62 | `status` | Toujours "published" |
| 63 | `scheduled_at` | Colonne date |

---

*Social Brand Template v1.0*
