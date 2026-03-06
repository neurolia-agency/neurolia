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
| B01 | WF Editorial Strategy | Done | `workflows/wf01-editorial-strategy.json` |
| B1.5 | WF Demande Photos | Done | `workflows/wf1.5-demande-photos.json` |
| B02 | WF Content Creation | Done | `workflows/wf02-content-creation.json` |
| B03 | WF Story Batch | Done | `workflows/wf03-story-batch.json` |
| B04 | WF Publication | -- | `workflows/wf04-publication.json` |
| B05 | WF Metrics + Errors | -- | `workflows/wf05-metrics-errors.json` |
| B06 | Dashboard Module | -- | Extension dashboard Neurolia |

## Decisions Verrouillees

| Sujet | Decision |
|-------|----------|
| Sublimation images | GPT-4o Image (posts : creatif / stories : leger + texte) |
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
| Strategiste Editorial | Planifier le calendrier d'une campagne | GPT-4o | Brand platform + objectifs campagne + metriques + key dates + intensity_curve | Phases + slots (JSON) |
| Directeur Artistique | Sublimer les images | GPT-4o Image | Photo brute + charte + direction visuelle du slot | Image sublimee |
| Redacteur | Ecrire les captions | GPT-4o | Image sublimee (vision) + slot editorial + brand platform + 15 dernieres captions | Caption + hashtags + CTA |

## Systeme de Prompt a 4 Couches (Redacteur)

| Couche | Contenu | Source |
|--------|---------|--------|
| 1 — Identite | Ton, valeurs, vocabulaire, personnalite | `brand_platforms` (DB) |
| 2 — Directive editoriale | Theme, angle, ton, style, CTA | `editorial_slots` (DB) |
| 3 — Vision | Analyse de l'image sublimee | Image jointe (GPT-4o vision) |
| 4 — Anti-repetition | 15-20 dernieres captions publiees | `content_queue` WHERE published (DB) |

## Architecture des Workflows

```
WF01 Strategie Editoriale (par campagne, duree flexible)
  Trigger manuel -> Objectifs campagne -> Agent Strategiste -> phases + slots -> Validation Neurolia

WF1.5 Demande Photos (quotidien 07h00)
  Schedule -> Slots 48h sans photo -> Creer sous-dossiers Drive -> Email recap avec liens -> Neurolia depose la photo

WF02 Creation Contenu (par upload)
  Trigger polling -> Scan sous-dossiers Drive -> Association slot via subfolder -> Agent DA (sublimation) -> Agent Redacteur (caption) -> content_queue -> Validation Neurolia

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
| SE-WF01 | 4 sections | 15 noeuds |
| SE-WF1.5 | 5 sections | 13 noeuds |
| SE-WF02 | 7 sections | 38 noeuds |
| SE-WF03 | 6 sections | 21 noeuds |

---

## Sources de Verite

| Domaine | Source |
|---------|--------|
| Statut pipeline | Ce fichier (CLAUDE.md) |
| Brief projet | `pipeline/input/brief.md` |
| Data model | `pipeline/output/01-data-model.md` |
| Workflow map | `pipeline/output/02-workflow-map.md` |
| Prompt specs | `pipeline/output/04-prompt-specs/` |
| Prompts finaux | `prompts/` |
| Workflows n8n | `workflows/` |
| Skills n8n | `../../.claude/skills/n8n-consultant/` (boite a outils) |

## Structure

```
neurolia-social-engine/
+-- CLAUDE.md                     # CE FICHIER
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

*Derniere mise a jour : 2026-03-06 — WF01 refonte campagne (duree flexible, objectifs, phases, intensity_curve)*
