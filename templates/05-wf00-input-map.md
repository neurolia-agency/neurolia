# WF00 — Carte des inputs a remplir

Recapitulatif de tous les champs que WF00 (Onboarding Client) doit remplir dans la base de donnees pour alimenter les workflows WF01, WF02 et WF03.

**Champs auto-generes (communs aux 4 tables)** : `id` (uuid), `created_at`, `updated_at` — ne pas remplir.
**`client_id`** : reference au client — rempli automatiquement apres creation de `clients`.

---

| # | Categorie | Champ | Table | Type | Explication |
|---|-----------|-------|-------|------|-------------|
| | **CLIENT** | | | | |
| 1 | Identite client | `name` | clients | text | Nom commercial (ex: StrictFood) |
| 2 | | `slug` | clients | text | Identifiant URL-safe unique (ex: strictfood) |
| 3 | | `industry` | clients | text | Secteur d'activite |
| 4 | | `is_active` | clients | bool | Client actif (defaut: true) |
| 5 | Presence web | `website_url` | clients | text | URL du site web |
| 6 | | `instagram_handle` | clients | text | Compte Instagram |
| 7 | | `facebook_page_url` | clients | text | URL page Facebook |
| 8 | Connexions API | `meta_page_id` | clients | text | Facebook Page ID (manuel) |
| 9 | | `meta_ig_user_id` | clients | text | Instagram Business ID (manuel) |
| 10 | | `meta_access_token` | clients | text | Token Meta longue duree (manuel, chiffre) |
| 11 | | `drive_folder_id` | clients | text | ID dossier Google Drive racine (manuel) |
| | **MARQUE — IDENTITE** | | | | |
| 12 | Fondation | `mission` | brand_platforms | text | Ce que la marque fait concretement |
| 13 | | `vision` | brand_platforms | text | Ambition long terme |
| 14 | | `purpose` | brand_platforms | text | Raison d'etre profonde |
| 15 | | `brand_values` | brand_platforms | jsonb [] | Valeurs avec {name, definition, implique, exclut} |
| 16 | | `personality` | brand_platforms | text | Traits de caractere (Direct, Complice, Provocateur) |
| 17 | | `archetype` | brand_platforms | jsonb | {principal, secondaire, manifestation: {ton, comportement, visuel}} |
| | **MARQUE — POSITIONNEMENT** | | | | |
| 18 | Promesse | `key_insight` | brand_platforms | text | Tension consommateur resolue par la marque |
| 19 | | `brand_promise` | brand_platforms | text | Promesse centrale |
| 20 | | `brand_essence` | brand_platforms | text | Essence / nord star en quelques mots |
| 21 | | `discriminator` | brand_platforms | text | Differenciateur unique principal |
| 22 | Slogans | `tagline` | brand_platforms | text | Slogan principal |
| 23 | | `baseline` | brand_platforms | text | Phrase d'accroche secondaire |
| 24 | | `slogan` | brand_platforms | text | Slogan court (peut differer de tagline) |
| 25 | Preuves | `usps` | brand_platforms | jsonb [] | Arguments de vente uniques structures |
| 26 | | `proof_points` | brand_platforms | text[] | Preuves tangibles (0% huile, artisans locaux) |
| 27 | | `key_figures` | brand_platforms | text[] | Chiffres cles (53g proteines, 596 kcal) |
| | **MARQUE — VOIX** | | | | |
| 28 | Ton | `tone_of_voice` | brand_platforms | text | Comment la marque parle |
| 29 | | `tu_vous` | brand_platforms | text | "tutoiement" ou "vouvoiement" |
| 30 | | `formality_level` | brand_platforms | smallint | 1 (familier) a 5 (formel) |
| 31 | Vocabulaire | `vocabulary_do` | brand_platforms | text[] | Mots et expressions a utiliser |
| 32 | | `vocabulary_dont` | brand_platforms | text[] | Mots et expressions interdits |
| 33 | | `writing_rules` | brand_platforms | text | Regles redactionnelles specifiques |
| | **MARQUE — VISUEL** | | | | |
| 34 | Couleurs | `primary_color` | brand_platforms | text | Couleur principale — nom + HEX |
| 35 | | `secondary_colors` | brand_platforms | text[] | Couleurs secondaires — noms + HEX |
| 36 | Polices | `font_primary` | brand_platforms | text | Police titre/display (ex: Space Grotesk) |
| 37 | | `font_secondary` | brand_platforms | text | Police body (ex: DM Sans) |
| 38 | Style | `visual_style` | brand_platforms | text | Mots-cles visuels (mineral, theatrical, anguleux) |
| 39 | | `photo_style` | brand_platforms | text | Style photo (eclairage dramatique, fond sombre) |
| | **MARQUE — SOCIAL** | | | | |
| 40 | Hashtags | `hashtags_branded` | brand_platforms | text[] | Hashtags proprietaires (#StrictFood) |
| 41 | | `hashtags_niche` | brand_platforms | text[] | Hashtags de decouvrabilite (#HealthyFood) |
| 42 | Ton social | `emoji_usage` | brand_platforms | text | none, moderate, frequent |
| 43 | | `cta_preferred` | brand_platforms | text[] | Appels a l'action favoris |
| | **MARQUE — CONTEXTE** | | | | |
| 44 | Audience | `target_audience` | brand_platforms | text | Description de l'audience cible |
| 45 | | `competitors` | brand_platforms | text[] | Concurrents identifies |
| 46 | | `differentiators` | brand_platforms | text[] | Ce qui distingue la marque |
| | **MARQUE — OBJECTIFS** | | | | |
| 47 | Permanents | `objectives_primary` | brand_platforms | text | Objectif principal reseaux sociaux |
| 48 | | `objectives_secondary` | brand_platforms | text[] | Objectifs secondaires |
| 49 | | `kpis` | brand_platforms | text[] | Indicateurs de performance suivis |
| | **MARQUE — ETENDU** | | | | |
| 50 | Bloc extensible | `brand_extended` | brand_platforms | jsonb | personas[], example_phrases[], section_messages, product_categories, brand_key, kapferer, color_system |
| | **ASSETS VISUELS** *(n assets par client)* | | | | |
| 51 | Par asset | `type` | brand_assets | asset_type | logo, background, photo_style, moodboard, other |
| 52 | | `name` | brand_assets | text | Nom descriptif (ex: "Logo principal SVG") |
| 53 | | `file_url` | brand_assets | text | URL dans Supabase Storage |
| 54 | | `file_path` | brand_assets | text | Chemin dans le bucket |
| 55 | | `metadata` | brand_assets | jsonb | Dimensions, format, usage |
| 56 | | `is_active` | brand_assets | bool | Asset actif ou archive |
| | **CONTENU EXISTANT** *(bootstrap anti-repetition, n publications)* | | | | |
| 57 | Par publication | `content_type` | content_queue | enum | post ou story |
| 58 | | `caption` | content_queue | text | Texte de la publication existante |
| 59 | | `hashtags` | content_queue | text[] | Hashtags utilises |
| 60 | | `cta` | content_queue | text | CTA utilise (si identifiable) |
| 61 | | `caption_style` | content_queue | enum | Style detecte (NULL si non identifiable) |
| 62 | | `status` | content_queue | enum | Toujours "published" |
| 63 | | `scheduled_at` | content_queue | timestamptz | Date originale de publication |

---

**64 champs uniques** repartis sur 4 tables, dont ~50 remplis par WF00 et ~14 auto-generes ou manuels (Meta/Drive).

## Tables cibles

| Table | Operation | Nb champs WF00 | Workflows lecteurs |
|-------|-----------|:--------------:|-------------------|
| `clients` | UPSERT | 7 | WF01, WF02, WF03, WF04, WF05 |
| `brand_platforms` | UPSERT | 39 | WF01, WF02, WF03 |
| `brand_assets` | INSERT (n) | 6 par asset | WF02 |
| `content_queue` | INSERT (n) | 7 par publication | WF01, WF02, WF03 (anti-repetition) |

## Sources fichiers (depots client)

| # | Depot | Champs alimentes |
|---|-------|-----------------|
| 1 | `01-brand/` (dossier) | #12-27, #28-33, #44-46, #50 |
| 2 | `02-art-direction/` (visual-vocabulary, moodboard, project-dials) | #38, #39 |
| 3 | `globals.css` | #34-37 (couleurs + 3 polices dont Oswald) |
| 4 | `objectifs.md` | #47-49 |
| 5 | `social-config.md` | #40-43 |
| 6 | `carte.md` | #50 (product_categories dans brand_extended) |
| 7 | `public/logo/` | #51-56 (asset type: logo) |
| 8 | `contenu-instagram/` | #57-63 (bootstrap anti-repetition) |
| 9 | Photos de contexte | #51-56 (asset type: photo_style, background) |
| 10 | Photos brutes (Google Drive) | Pas en DB — directement consommees par WF02/WF03 |

*Redige le 2026-03-07 — WF00 Input Map*
