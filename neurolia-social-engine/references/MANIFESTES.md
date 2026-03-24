# Manifestes — Entree des Inputs

Les Google Sheets manifestes sont les seuls points d'entree pour alimenter le Social Engine.
Les rapports de sortie sont en HTML (design system `reports/`).

---

## Sheet 1 — Manifeste Clients (input WF00)

**1 ligne par client. Rempli avant de lancer WF00 Onboarding.**
**Range Google Sheets : A:K**

| Col | En-tete | Requis | Description | Exemple |
|-----|---------|--------|-------------|---------|
| A | `client_name` | oui | Nom commercial | `StrictFood` |
| B | `client_slug` | oui | Identifiant URL-safe (unique) | `strictfood` |
| C | `industry` | oui | Secteur d'activite | `Food & Fitness` |
| D | `website_url` | non | Site web | `https://strictfood.fr` |
| E | `instagram_handle` | oui | Compte Instagram avec @ | `@strictfood` |
| F | `facebook_page_url` | non | Page Facebook | |
| G | `brand_folder` | oui | Lien Drive → dossier `brand/` (fichiers .md) | lien Drive dossier |
| H | `strategie_md` | oui | Lien Drive → fichier strategie Instagram | lien Drive fichier |
| I | `logo` | oui | Lien Drive → fichier logo (PNG/SVG) | lien Drive fichier |
| J | `photos_contexte` | non | Lien Drive → dossier photos contexte/fonds | lien Drive dossier |
| K | `photos_brutes_folder` | oui | Lien Drive → dossier racine photos brutes | lien Drive dossier |

### Ce que WF00 fait avec ces inputs

1. UPSERT `clients` (cols A-F + K → `drive_folder_id`)
2. Telecharge tous les fichiers du dossier `brand/` (G), les concatene, les parse via GPT-4o → UPSERT `brand_platforms`
3. Telecharge le fichier strategie (H), le parse via GPT-4o → UPSERT `content_strategy` (inclut piliers, calendrier hebdo, guidelines, periodes, **et objectifs**)
4. Telecharge le logo (I) → upload Supabase Storage → INSERT `brand_assets`
5. Genere un rapport HTML de tracabilite ("Voici ce que j'ai compris")

### Objectifs extraits du fichier strategie

Le parseur strategie (GPT-4o) extrait automatiquement une section `objectives` depuis le fichier strategie :

| Champ | Type | Description |
|-------|------|-------------|
| `primary_goal` | string | Objectif principal (notoriete, engagement, conversion...) |
| `description` | string | Description de l'objectif en 1-2 phrases |
| `posts_per_week` | int | Posts/semaine recommandes |
| `stories_per_day` | int | Stories/jour recommandees |
| `kpis` | array | Objectifs chiffres `[{ metric, target }]` |
| `themes_imposed` | array | Themes obligatoires/recurrents |
| `intensity_curve` | string | flat, ramp_up, peak_middle, front_loaded |
| `budget_tone` | string | standard, premium, economique |

Ces objectifs sont stockes dans `content_strategy.objectives` et servent de fallback pour WF01.

---

## Sheet 2 — Manifeste Campagnes (input WF01)

**1 ligne par campagne. Rempli avant de lancer WF01 Strategie Editoriale.**
**Range Google Sheets : A:D**

| Col | En-tete | Requis | Description | Exemple |
|-----|---------|--------|-------------|---------|
| A | `client_slug` | oui | Quel client | `strictfood` |
| B | `campaign_name` | oui | Nom de la campagne | `Reboot Premium` |
| C | `start_date` | oui | Debut (JJ/MM/AAAA) | `01/03/2026` |
| D | `end_date` | oui | Fin (JJ/MM/AAAA) | `31/03/2026` |

### Ce que WF01 fait avec ces 4 colonnes

1. Resout `client_slug` → `client_id` (UUID) via `SELECT id FROM clients WHERE slug`
2. Charge `content_strategy` (parse par WF00) → en tire : primary_goal, description, posts_per_week, stories_per_day, kpis, themes, intensity_curve
3. Matche la periode active via start_date/end_date vs `content_strategy.periods[]`
4. Lance les 3 agents (Stratege → Posts → Stories)
5. Genere le rapport HTML de tracabilite ("Voici ce que j'ai planifie")

Tout le reste vient de `content_strategy` — aucune saisie manuelle supplementaire.

---

## Flux complet

```
Sheet 1 (slug + secteur + Instagram + liens Drive)
    → WF00 parse les fichiers (brand + strategie + objectifs + logo)
        → Rapport HTML "Voici ce que j'ai compris"
        → VALIDATION HUMAINE

Sheet 2 (slug + nom campagne + dates)
    → WF01 genere strategie + calendrier editorial
        → Rapport HTML "Voici ce que j'ai planifie"
        → VALIDATION HUMAINE

    → WF1.5/WF02/WF03 executent la production
        → Dashboard validation contenu
        → VALIDATION HUMAINE
```

---

*Derniere mise a jour : 2026-03-09*
