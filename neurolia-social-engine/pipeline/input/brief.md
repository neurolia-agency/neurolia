# A01 — Brief Projet : Neurolia Social Engine

## Origine

Ce brief est le resultat d'une session de cadrage entre Dorian (fondateur Neurolia) et Claude Code. Il fige les decisions prises avant le demarrage de la construction.

---

## 1. Vision

Creer une plateforme d'automatisation de contenu social media pour les clients de Neurolia.

Le client fournit des photos brutes. Le systeme :
1. Planifie une strategie editoriale (mensuelle)
2. Sublime les photos selon la charte graphique du client
3. Redige les captions en respectant la voix de marque
4. Publie ou planifie la publication sur Instagram et Facebook

Tout est orchestre par des agents IA specialises et des workflows n8n.

---

## 2. Perimetre

### Inclus
- Strategie editoriale automatisee (calendrier mensuel)
- Sublimation d'images par IA (retouche legere + transformation creative)
- Redaction de captions par IA (avec anti-repetition)
- Texte incruste sur les stories
- Publication automatisee Instagram + Facebook (posts + stories)
- Validation humaine par l'equipe Neurolia (dashboard)
- Multi-clients des le depart
- Recuperation des metriques de performance

### Exclu (pour l'instant)
- TikTok, LinkedIn, Pinterest (Phase 2)
- Interface web d'upload pour le client (Phase 2 — Google Drive en Phase 1)
- Push notifications
- A/B testing de captions
- Video / Reels

---

## 3. Roles

| Role | Description | Actions |
|------|-------------|---------|
| Client | Proprietaire de la marque | Fournit photos + brand platform + objectifs. Consulte les resultats. |
| Equipe Neurolia | Gestionnaire du service | Valide les contenus, ajuste la strategie, gere les clients |
| Agents IA | Strategiste, DA, Redacteur | Generent le calendrier, subliment les images, redigent les captions |
| n8n | Orchestrateur | Execute les workflows, connecte les APIs, gere le scheduling |

---

## 4. Flux global

```
                     MENSUEL
                        |
        Client fournit objectifs + brand platform
                        |
                        v
              +-------------------+
              | WF01 - Strategie  |
              | Agent Strategiste |
              +-------------------+
                        |
              Calendrier editorial (4 semaines)
                        |
              Validation Neurolia
                        |
                        v
                    QUOTIDIEN
                        |
        Client uploade photos (Google Drive)
                        |
                        v
              +-------------------+
              | WF02 - Creation   |
              | Agent DA + Redac  |
              +-------------------+
                        |
              Image sublimee + caption
                        |
              Validation Neurolia (dashboard)
                        |
                        v
              +-------------------+     +-------------------+
              | WF03 - Stories    |     | WF04 - Publication|
              | Batch hebdo       |     | Schedule 15 min   |
              +-------------------+     +-------------------+
                        |                         |
              Validation batch            Meta Graph API
                        |                         |
                        +----------+--------------+
                                   |
                                   v
                        +-------------------+
                        | WF05 - Metriques  |
                        | + Error Handler   |
                        +-------------------+
                                   |
                        Feedback -> WF01 (cycle suivant)
```

---

## 5. Decisions techniques

### APIs IA

| Fonction | API | Fallback | Budget |
|----------|-----|----------|--------|
| Sublimation posts (creative) | GPT-4o Image | Gemini (Imagen) | < 0.05$/image |
| Sublimation stories (legere + texte) | GPT-4o Image | — | < 0.03$/image |
| Captions | GPT-4o (vision + texte) | — | < 0.02$/caption |
| Strategie editoriale | GPT-4o | — | ~0.10$/mois |

### Publication

| Plateforme | API | Capacites |
|------------|-----|-----------|
| Instagram | Meta Graph API | Posts feed + Stories. Scheduling natif. Pas de stickers/musique via API. |
| Facebook | Meta Graph API | Posts + Stories. Scheduling natif. |

Le texte des stories doit etre incruste dans l'image avant upload (pas de texte natif via API).

### Upload client (Phase 1)

- Google Drive : dossier partage par client
- Structure : `/Neurolia - [Client]/Photos brutes/` et `/Fonds & contexte/`
- Polling n8n toutes les 10 minutes
- Fichiers traites deplaces dans `/Traites/`
- Pas de metadonnees structurees — matching manuel Neurolia ou convention de nommage

### Validation

- Dashboard Neurolia existant, etendu avec un module Social/Marketing
- Posts : validation individuelle (image sublimee + caption cote a cote)
- Stories : validation batch hebdomadaire (lot de ~42 stories)
- Actions : approve / reject avec feedback / edit caption inline
- Webhook du dashboard -> n8n (approve/reject)

### Multi-client

- Tenant isolation en DB (client_id sur toutes les tables)
- Brand platform stocke en DB (pas en dur dans les prompts)
- Assets visuels dans Supabase Storage (bucket par client)
- Credentials Meta par client

### Metriques

- Recuperation quotidienne via Meta Graph API (Insights)
- Stockees en DB par publication
- Utilisees par l'Agent Strategiste pour ajuster le calendrier suivant

---

## 6. Volume et couts

### Par client

| Metrique | Valeur |
|----------|--------|
| Posts/semaine | 3-5 |
| Stories/jour | 6-7 |
| Posts/mois | ~16 |
| Stories/mois | ~180 |
| Cout API/mois | ~6.50$ |

### Scalabilite

| Clients | Cout API/mois | Volume images/mois |
|---------|---------------|-------------------|
| 1 | ~6.50$ | ~196 |
| 5 | ~32.50$ | ~980 |
| 10 | ~65$ | ~1 960 |

---

## 7. Systeme de prompts

### Architecture 4 couches (Agent Redacteur)

| Couche | Role | Source | Dynamique |
|--------|------|--------|-----------|
| 1 — Identite de marque | Ton, valeurs, vocabulaire, personnalite | `brand_platforms` (DB) | Par client |
| 2 — Directive editoriale | Theme, angle, ton du post, style caption, CTA | `editorial_slots` (DB) | Par post |
| 3 — Vision | Ce que l'image montre | Image jointe (GPT-4o) | Par post |
| 4 — Anti-repetition | 15-20 dernieres captions | `content_queue` (DB) | Glissant |

### Agent Strategiste
- Input : brand platform + objectifs + metriques du mois precedent
- Output : JSON structure avec ~196 slots (16 posts + 180 stories)
- Contraintes : variete des categories, equilibre des angles, rotation des styles

### Agent Directeur Artistique
- Input post : photo brute + images contexte + direction visuelle du slot + charte graphique
- Input story : meme photo + direction allege + texte a incruster
- Output : image sublimee (URL stockee)

### Agent Redacteur
- Input : image sublimee + slot editorial + brand platform + memoire
- Output : caption + hashtags + CTA
- Contraintes : variete des structures, pas de formules repetitives, voix authentique

---

## 8. Infrastructure

| Composant | Solution |
|-----------|----------|
| Orchestration | n8n (instance Hostinger existante) |
| Base de donnees | Supabase |
| Stockage fichiers | Supabase Storage |
| Upload client | Google Drive (Phase 1) |
| Validation | Dashboard Neurolia (existant, a etendre) |
| Publication | Meta Graph API |
| IA Images | GPT-4o Image API |
| IA Texte | GPT-4o API |
| Monitoring | Error handler n8n + notifications |

---

## 9. Risques identifies

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Qualite image IA inconsistante | Posts rejetes, perte de temps | Validation humaine + fallback Gemini |
| Repetitivite des captions | Perte d'engagement | Memoire glissante + rotation des styles |
| API Meta instable / changements | Publication echouee | Error handler + retry + logs |
| Volume stories (180/mois) | Goulot validation | Batch hebdo + approve-all |
| Google Drive polling rate limits | Photos manquees | Polling 10 min + fallback horaire |
| Depassement budget API | Cout > prevu | Monitoring tokens + alerts |

---

## 10. Prochaines etapes

1. A02 — Data Model (schema Supabase)
2. A03 — Workflow Map (carte detaillee des 5 workflows)
3. A04 — Prompt Specs (specification de chaque agent IA)
4. Creation des 3 skills prompt engineering
5. Phase B — Construction des workflows

---

*Redige le 2026-03-05 — Session de cadrage initiale*
