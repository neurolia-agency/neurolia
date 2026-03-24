# Neurolia Social Engine — Automatisation Reseaux Sociaux

Plateforme d'automatisation de contenu social media multi-clients. Creation, sublimation, redaction et publication automatisees via agents IA + n8n.

## Statut Pipeline

### Phase A : Architecture

| Etape | Stage | Status | Output |
|-------|-------|--------|--------|
| A01 | Brief | Done | `pipeline/input/brief.md` |
| A02 | Data Model | Done | `pipeline/output/01-data-model.md` |
| A03 | Workflow Map | Done (R2) | `pipeline/output/02-workflow-map.md` |
| A04 | Prompt Specs | Done (R3) | `pipeline/output/04-prompt-specs/` |

### Remediation biais neurolia-immo — RESOLUE

R1-R4 complete. A03/A04 reecrites avec nodes natifs n8n. Voir `_preflight/R1-node-research.md`.

**Reference** : `n8n-consultant/` est la SEULE source de verite pour les patterns n8n.

### Phase B : Construction

| Etape | Stage | Status | Output |
|-------|-------|--------|--------|
| B00 | WF Onboarding Client | Done (deploye MCP, Session 7, bugs fixes Session 8, rapport Session 9) | `workflows/wf00-onboarding.json` |
| B01 | WF Editorial Strategy | Done (multi-agent v2 + integration strategie Session 7, ref fix Session 8, rapport Session 9, deploye MCP) | `workflows/wf01-editorial-strategy.json` |
| B1.5 | WF Demande Photos | Done (directives IA 1.5A Session 4, 5 bugs critiques fixes Session 8, deploye MCP) | `workflows/wf1.5-demande-photos.json` |
| B02 | WF Content Creation | Done (compositing + vision + caption, sb25 fix Session 8, deploye MCP) | `workflows/wf02-content-creation.json` |
| B03 | WF Story Batch | Done (accumulateur intra-batch + planificateur stories hebdo 3B, deploye MCP) | `workflows/wf03-story-batch.json` |
| B04 | WF Publication | -- | `workflows/wf04-publication.json` |
| B05 | WF Metrics + Errors | -- | `workflows/wf05-metrics-errors.json` |
| B06 | Dashboard Module | -- | Extension dashboard Neurolia |

## Decisions Verrouillees

| Sujet | Decision |
|-------|----------|
| Sublimation images | GPT-4o Image (posts : creatif / stories : leger + texte) — compositing multi-image si compositing_context rempli |
| Captions | GPT-4o : vision (analyse image sublimee) + contexte slot editorial (theme, angle, ton, style, CTA) |
| Texte stories | Genere par l'agent IA depuis le calendrier editorial |
| Validation | Dashboard Neurolia — posts individuels + stories batch hebdo |
| Publication | Meta Graph API (Instagram + Facebook) |
| Upload client | Phase 1 : Google Drive (polling) / Phase 2 : interface web dashboard |
| Multi-client | Des le depart, tenant isolation en DB |
| Metriques | Recuperation auto via Meta Graph API -> feedback strategie |
| n8n | Instance Hostinger existante |
| Budget API | < 0.05$/image, < 0.02$/caption |
| Backup image API | Gemini (Imagen) si GPT-4o insuffisant |

## Contexte Projet

| Cle | Valeur |
|-----|--------|
| Client | Neurolia (produit interne, service pour clients) |
| Type | Plateforme d'automatisation |
| Description | Automatiser la creation et publication de contenu social media pour les clients Neurolia |
| KPI | Zero post manque, qualite constante, variete des captions |
| Stack | n8n (Hostinger) + Supabase + GPT-4o API + Meta Graph API |

## Volume par client (configurable par campagne)

| Type | Frequence par defaut | Configurable |
|------|---------------------|--------------|
| Posts (feed) | 3-5/semaine | `objectives.posts_per_week` |
| Stories | 6-7/jour | `objectives.stories_per_day` |
| Strategie editoriale | par campagne (duree flexible) | `campaign.start_date` / `campaign.end_date` |

## Les 3 Agents IA

| Agent | Role | LLM | Inputs | Output |
|-------|------|-----|--------|--------|
| Parseur Brand | Extraire les donnees structurees des fichiers brand | GPT-4o (temp 0.1) | 8 fichiers .md brand concatenes | brand_platforms (JSON) |
| Parseur Strategie | Extraire la strategie Instagram structuree | GPT-4o (temp 0.1) | Fichier strategie .md | content_strategy (JSON) |
| Agent 1 — Stratege | Vision macro, phases, pillar_distribution | GPT-4o (temp 0.7) | Brand + campagne + metriques + content_strategy | strategy_summary + campaign_phases[] (JSON) |
| Agent 2 — Planificateur Posts | Creer les posts feed detailles | GPT-4o (temp 0.85) | Phases Agent 1 + brand full + captions recentes | posts[] (JSON) |
| Agent 3 — Planificateur Stories | Creer les stories par phase (boucle) | GPT-4o (temp 0.8) | Phase + posts Agent 2 + brand resume | stories[] par phase (JSON) |
| Directeur Artistique | Sublimer les images | GPT-4o Image | Photo brute + charte + direction visuelle du slot | Image sublimee |
| Redacteur | Ecrire les captions | GPT-4o | Image sublimee (vision) + slot editorial + brand platform + 15 dernieres captions | Caption + hashtags + CTA |

## Systeme de Prompt a 4 Couches (Redacteur)

| Couche | Contenu | Source |
|--------|---------|--------|
| 1 — Identite | Ton, valeurs enrichies, vocabulaire, personnalite, tu/vous, essence, promesse, USPs, personas | `brand_platforms` (DB) |
| 2 — Directive editoriale | Theme, angle, ton, style, CTA | `editorial_slots` (DB) |
| 3 — Vision | Analyse de l'image sublimee | Image jointe (GPT-4o vision) |
| 4 — Anti-repetition | 15-20 dernieres captions publiees | `content_queue` WHERE published (DB) |

## Architecture des Workflows

```
WF00 Onboarding Client (par client, une seule fois)
  Manual Trigger -> Google Sheet manifeste -> Drive (brand/ + strategie.md + logo)
  -> GPT-4o parseur brand -> UPSERT brand_platforms
  -> GPT-4o parseur strategie -> UPSERT content_strategy
  -> Upload logo -> Insert brand_assets
  -> Generer rapport onboarding HTML (tracabilite)

WF01 Strategie Editoriale (par campagne, duree flexible) — MULTI-AGENT v2
  Manual Trigger -> Google Sheets campagne -> Chargement DB (client + brand + catalogue + strategie + periode active)
  -> Agent 1 Stratege (phases + pillar_distribution) -> Agent 2 Posts (pillar par post) -> Boucle phases Agent 3 Stories -> Assemblage -> Insert editorial_slots (avec pillar)
  -> Generer rapport editorial HTML (tracabilite)

WF1.5 Demande Photos (quotidien 07h00)
  Schedule -> Slots 48h sans photo -> Creer sous-dossiers Drive -> Email recap avec liens -> Neurolia depose la photo

WF02 Creation Contenu (par upload)
  Trigger polling -> Scan sous-dossiers Drive -> Association slot via subfolder -> Compositing conditionnel (selection photo contexte + telechargement) -> Agent DA (sublimation 1 ou 2 images) -> Agent Redacteur (caption) -> content_queue -> Validation Neurolia

WF03 Story Batch (hebdo)
  Schedule dimanche -> Photos de la semaine -> Agent DA (stories) -> Agent Redacteur (stories) -> content_queue batch -> Validation Neurolia

WF04 Publication (continu)
  Schedule 15 min -> content_queue approved -> Meta Graph API -> Instagram + Facebook -> status: published

WF05 Metriques + Erreurs
  Schedule quotidien -> Meta Insights API -> DB metriques
  Error trigger -> Notification equipe Neurolia
```

## Conventions n8n

### Nommage des noeuds — FRANCAIS obligatoire

Tous les workflows de ce projet suivent la convention francaise. Voir `../../.claude/rules/n8n-naming-conventions.md`.

**Regles cles** :
- Noms de noeuds en francais (`Charger Clients Actifs`, pas `Fetch Active Clients`)
- References `$('NomNoeud')` dans les Code nodes doivent correspondre aux noms francais
- Sous-noeuds AI : `Modele OpenAI — [Role]`, `Parseur Sortie — [Format]`

### Sticky Notes — obligatoires

Chaque workflow contient des sticky notes (type `stickyNote@1`) qui documentent les sections :
- Format : `## N. TITRE SECTION` + description 1-2 lignes
- Position : au-dessus du groupe de noeuds
- ID : `sn01`, `sn02`, etc.

### Workflows actuels (conventions appliquees)

| Workflow | Stickies | Noeuds FR |
|----------|----------|-----------|
| SE-WF00 | 7 sections | 29 noeuds (22 fn + 7 stickies, 2 parseurs GPT-4o + boucle brand + rapport) |
| SE-WF01 | 8 sections | 40 noeuds (32 fn + 8 stickies, 3 agents + boucle stories + strategie + rapport) |
| SE-WF1.5 | 6 sections | 15 noeuds (directives IA + email enrichi) |
| SE-WF02 | 7 sections | 44 noeuds (37 fn + 7 stickies, compositing + garde-fou vision + categories + validation caption + branchement post/story) |
| SE-WF03 | 6 sections | 29 noeuds (23 fn + 6 stickies, accumulateur intra-batch + planificateur stories hebdo) |

---

## Sources de Verite

| Domaine | Source |
|---------|--------|
| Statut pipeline | Ce fichier (CLAUDE.md) |
| Brief projet | `pipeline/input/brief.md` |
| Data model | `pipeline/output/01-data-model.md` (inclut migration SQL brand_platforms) |
| Spec strategie | `pipeline/output/06-strategie-integration-spec.md` |
| Migration strategie | `migrations/007-content-strategy.sql` |
| Workflow map | `pipeline/output/02-workflow-map.md` |
| Prompt specs | `pipeline/output/04-prompt-specs/` |
| Prompts finaux | `prompts/` |
| Workflows n8n | `workflows/` |
| Skills n8n | `../../.claude/skills/n8n-consultant/` (boite a outils) |

## Structure

```
neurolia-social-engine/
+-- CLAUDE.md                     # CE FICHIER
+-- migrations/                   # Migrations SQL Supabase
+-- pipeline/
|   +-- input/
|   |   +-- brief.md              # Decisions verrouillees
|   |   +-- references/           # Docs API, notes techniques
|   +-- output/
|   |   +-- 01-data-model.md
|   |   +-- 02-workflow-map.md
|   |   +-- 03-api-contracts.md
|   |   +-- 04-prompt-specs/
|   +-- stages/                   # Instructions par etape
+-- prompts/                      # Prompts finaux des agents
|   +-- strategist/
|   +-- art-director/
|   +-- copywriter/
+-- .claude/skills/               # Skills prompt engineering
+-- workflows/                    # Export JSON des workflows n8n
```

## Commandes

```bash
# Phase A — architecture
# Executer les stages A01-A04 manuellement ou via APEX

# Phase B — construction workflows
# Ouvrir n8n-consultant/ pour les skills MCP n8n
# Les workflows sont ecrits ici dans workflows/

# Dashboard
# Extension du dashboard Neurolia existant
```

---

*Derniere mise a jour : 2026-03-08 — Session 9 : rapports de tracabilite HTML deployes (WF00 cd22b "Generer Rapport Onboarding" + sn07 sticky, WF01 cd22b "Generer Rapport Editorial" + sn08 sticky). Design system rapports (dark theme, 5 couleurs accent, Satoshi/Inter). Code source dans reports/. JSON locaux synchronises.*
