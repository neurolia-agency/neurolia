# Agents Strategie Editoriale — Spec Prompts (Multi-Agent v2)

Architecture multi-agent v2 pour la generation du calendrier editorial d'une campagne (duree flexible).
3 agents sequentiels, chacun avec des prompts prompt-engineered (XML tags, chain-of-thought, few-shot, guardrails, quality_checklist).

## Architecture Multi-Agent

| Agent | Code Node | Role | Temp | Max Tokens | Output |
|-------|-----------|------|------|------------|--------|
| Agent 1 — Stratege | cd06 → ag07 | Phases, objectifs, intensite, directives | 0.7 | 3k | `strategy_summary` + `campaign_phases[]` |
| Agent 2 — Planificateur Posts | cd09 → ag10 | Posts feed detailles par phase | 0.85 | 8k | `posts[]` |
| Agent 3 — Planificateur Stories | cd14 → ag15 | Stories par phase (boucle) | 0.8 | 14k | `stories[]` par phase |

### Methodologie Prompt Engineering (appliquee aux 3 agents)

Chaque prompt (system + user) contient :
- **`<role>`** : definition du role et perimetre strict
- **`<rules>`** : regles numerotees, non ambigues
- **`<constraints>`** : enums autorises, formats de date, guardrails anti-hallucination
- **`<output_format>`** : schema JSON exact attendu
- **`<quality_checklist>`** : criteres de verification avant generation
- **`<thinking>`** : instruction chain-of-thought (raisonnement etape par etape avant le JSON)
- **`<example>`** : 1 exemple few-shot input/output
- **Prefill** : termine par "Reponds avec le JSON :"

### Decisions verrouillees

- `hasOutputParser: false` — parsing JSON dans Code nodes de validation (cd08, cd11, cd16)
- Accumulation stories via `$getWorkflowStaticData('global')` avec reset en cd12
- Pas de champ `cta` dans editorial_slots (fix cd19)
- GPT-4o pour les 3 agents

---

> **Note** : Les sections ci-dessous documentent l'ancienne spec single-agent. Les prompts finaux multi-agent sont dans `workflows/wf01-editorial-strategy.json` (Code nodes cd06, cd09, cd14).

---

## 1. System Prompt (ancienne spec — agent unique)

```
Tu es un stratege editorial specialise dans les reseaux sociaux (Instagram + Facebook).
Tu produis des calendriers de contenu pour des campagnes de duree variable, structures en phases, varies et alignes avec la marque et les objectifs de campagne.

REGLES ABSOLUES :
- Tu reponds UNIQUEMENT en JSON valide, sans texte avant ni apres.
- Le JSON doit respecter exactement le schema fourni dans le user prompt.
- Tu structures la campagne en phases coherentes (teasing, lancement, amplification, conversion, fidelisation).
- Tu adaptes l'intensite du contenu selon la courbe demandee (intensity_curve).
- Tu places des contenus strategiques sur les key_dates.
- Tu ne repetes jamais deux themes identiques sur la meme semaine.
- Tu distribues les categories de maniere equilibree.
- Tu alternes les caption_styles pour eviter la monotonie.
- Tu assignes des heures de publication optimales par type de contenu.
- Tu crees des liens logiques entre posts et stories du meme jour (source_slot_ref).
- Tu respectes les objectifs business de la campagne.
- Tu tiens compte des metriques precedentes pour ajuster la strategie.

CONTRAINTES DE VOLUME :
- Posts feed : exactement {posts_count} (repartis sur la duree de la campagne)
- Stories : exactement {stories_count} ({stories_per_day} par jour)
- Total : ~{total_slots} slots
- Duree : {campaign_days} jours (du {start_date} au {end_date})

CONTRAINTES DE VARIETE :
- Chaque content_category doit apparaitre au moins 1 fois par semaine (posts).
- Aucun caption_style ne doit representer plus de 25% des posts.
- Les angles doivent varier : pas 2 posts consecutifs avec le meme angle.
- Alterner les objectifs : pas plus de 3 posts consecutifs meme objectif.
- Les stories d'un meme jour doivent raconter une progression narrative.

COURBES D'INTENSITE :
- flat : volume constant sur toute la duree
- ramp_up : volume croissant (leger au debut, fort a la fin)
- peak_middle : crescendo puis decrescendo avec pic au milieu
- front_loaded : forte intensite au debut, decroissant

PHASES DE CAMPAGNE :
- Adapte le nombre de phases a la duree (2 phases pour 1 semaine, 3-4 pour 2-3 semaines, 4-5 pour 1+ mois).
- Chaque phase a un objectif, un ton et une intensite propres.
- Les transitions entre phases doivent etre fluides.

HEURES DE PUBLICATION :
- Posts feed : entre 11h30 et 13h00 ou entre 18h00 et 20h00 (heures d'engagement peak)
- Stories : reparties entre 08h00 et 22h00, espacees d'au moins 1h30
```

---

## 2. User Prompt Template

Template assemble dans le Code node n8n (node 06 de WF01). Chaque variable `{var}` est remplacee par concatenation.

```
# BRIEF CAMPAGNE — {client_name}

## CAMPAGNE : {campaign_name}

Periode : du {start_date} au {end_date} ({campaign_days} jours, {weeks_count} semaines)
Objectif principal : {primary_goal} — {objective_description}
KPIs cibles : {kpis_formatted}
Courbe d'intensite : {intensity_curve}
Ton budgetaire : {budget_tone}

### Dates cles
{key_dates_formatted}

### Themes imposes
{themes_imposed_csv}

### Brief client
{campaign_brief}

## IDENTITE DE MARQUE

Secteur : {industry}
Mission : {mission}
Vision : {vision}
Valeurs :
{brand_values_formatted}
Personnalite : {personality}
Archetype principal : {archetype_principal}
Archetype secondaire : {archetype_secondaire}
Ton de voix : {tone_of_voice}
Vocabulaire a utiliser : {vocabulary_do_csv}
Vocabulaire interdit : {vocabulary_dont_csv}
Style visuel : {visual_style}
Style photo : {photo_style}
Audience cible : {target_audience}
Differenciateurs : {differentiators_csv}

## POSITIONNEMENT

Insight cle : {key_insight}
Promesse de marque : {brand_promise}
Essence de marque : {brand_essence}
Tagline : {tagline}
Discriminateur : {discriminator}
USPs :
{usps_formatted}
Proof points : {proof_points_csv}
Chiffres cles : {key_figures_csv}

## PERSONAS

{personas_formatted}

## OBJECTIFS MARQUE (permanents)

Objectif principal marque : {brand_objectives_primary}
Objectifs secondaires : {brand_objectives_secondary_csv}
KPIs marque : {brand_kpis_csv}

## METRIQUES RECENTES (30 derniers jours)

{metrics_summary}

## CAPTIONS RECENTES (anti-repetition)

{recent_captions_block}

## VOLUME DEMANDE

- Posts feed : {posts_count} posts ({posts_per_week}/semaine x {weeks_count} semaines)
- Stories : {stories_count} stories ({stories_per_day}/jour x {campaign_days} jours)
- Total : {total_slots} slots

## FORMAT DE SORTIE

Reponds avec un JSON respectant EXACTEMENT ce schema (pas de texte autour) :

{output_schema}
```

---

## 3. Format de Sortie JSON

Schema exact attendu par le Code node de parsing (node 08 de WF01).

```json
{
  "strategy_summary": "string — resume de la strategie de la campagne en 2-3 phrases",
  "campaign_phases": [
    {
      "name": "string — nom de la phase (ex: 'Teasing')",
      "start_date": "YYYY-MM-DD",
      "end_date": "YYYY-MM-DD",
      "objective": "string — objectif de cette phase",
      "tone": "string — ton dominant de la phase",
      "intensity": "low|medium|high — volume relatif de contenu"
    }
  ],
  "posts": [
    {
      "scheduled_date": "YYYY-MM-DD",
      "scheduled_time": "HH:MM",
      "phase": "string — nom de la phase (doit matcher campaign_phases[].name)",
      "category": "produit|coulisses|equipe|engagement|saisonnier|educatif|temoignage|ambiance",
      "theme": "string — sujet du post (ex: 'Burger Le Classique')",
      "angle": "string — angle d'approche (ex: 'ingredients_frais', 'portrait_chef')",
      "tone": "string — override de ton si different du defaut (ex: 'chaleureux', 'expert')",
      "caption_style": "question_directe|storytelling_court|factuel|exclamatif|conseil|citation|liste|teaser",
      "objective": "engagement|conversion|notoriete|fidelisation",
      "visual_direction": "string — description de la direction visuelle pour le DA",
      "sublimation_mode": "creative",
      "cta": "string — call to action souhaite (ex: 'Reservez', 'Commentez')",
      "is_key_date": false
    }
  ],
  "stories": [
    {
      "scheduled_date": "YYYY-MM-DD",
      "scheduled_time": "HH:MM",
      "phase": "string — nom de la phase",
      "category": "produit|coulisses|equipe|engagement|saisonnier|educatif|temoignage|ambiance",
      "theme": "string — sujet de la story",
      "angle": "string — angle court",
      "tone": "string — ton",
      "caption_style": "question_directe|storytelling_court|factuel|exclamatif|conseil|citation|liste|teaser",
      "objective": "engagement|conversion|notoriete|fidelisation",
      "visual_direction": "string — direction visuelle allege pour story",
      "sublimation_mode": "light",
      "story_text": "string — texte court a incruster sur l'image (max 60 caracteres)",
      "source_slot_ref": "null | index du post parent dans posts[] (0-based)",
      "cta": "string — CTA story (ex: 'Swipe up', 'Votez', 'DM nous')"
    }
  ]
}
```

### Dimensions du JSON

| Champ | Volume attendu |
|-------|---------------|
| `campaign_phases[]` | 2-5 objets selon la duree |
| `posts[]` | variable (posts_per_week x semaines) |
| `stories[]` | variable (stories_per_day x jours) |
| Total slots | variable |

---

## 4. Contraintes de Variete (validees par node 08)

### Dates dans la plage de la campagne

```javascript
const startDate = new Date($json.campaignStartDate);
const endDate = new Date($json.campaignEndDate);

posts.forEach((p, idx) => {
  const d = new Date(p.scheduled_date);
  if (d < startDate || d > endDate) {
    throw new Error(`Post ${idx}: date ${p.scheduled_date} hors campagne [${$json.campaignStartDate}, ${$json.campaignEndDate}]`);
  }
});

stories.forEach((s, idx) => {
  const d = new Date(s.scheduled_date);
  if (d < startDate || d > endDate) {
    throw new Error(`Story ${idx}: date ${s.scheduled_date} hors campagne`);
  }
});
```

### Key dates couvertes

```javascript
const keyDates = $json.keyDates || [];
keyDates.forEach(kd => {
  const hasPost = posts.some(p => p.scheduled_date === kd.date);
  if (!hasPost) {
    throw new Error(`Key date ${kd.date} (${kd.label}) n'a aucun post assigne`);
  }
});
```

### Phases valides

```javascript
const phaseNames = campaign_phases.map(p => p.name);

// Verifier que chaque post/story reference une phase existante
posts.forEach((p, idx) => {
  if (!phaseNames.includes(p.phase)) {
    throw new Error(`Post ${idx}: phase '${p.phase}' inexistante`);
  }
});

// Verifier que les phases couvrent toute la campagne sans trou
const sortedPhases = [...campaign_phases].sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
if (new Date(sortedPhases[0].start_date) > startDate) {
  throw new Error(`Trou entre debut campagne et premiere phase`);
}
if (new Date(sortedPhases[sortedPhases.length - 1].end_date) < endDate) {
  throw new Error(`Trou entre derniere phase et fin campagne`);
}
```

### Rotation des categories (posts)

```javascript
// Chaque categorie doit apparaitre au moins 1 fois si la campagne >= 2 semaines
const categories = ['produit', 'coulisses', 'equipe', 'engagement',
                    'saisonnier', 'educatif', 'temoignage', 'ambiance'];
const campaignWeeks = Math.ceil(campaignDays / 7);

if (campaignWeeks >= 2) {
  const postCategories = posts.map(p => p.category);
  const missing = categories.filter(c => !postCategories.includes(c));
  if (missing.length > 0) {
    throw new Error(`Categories manquantes dans les posts: ${missing.join(', ')}`);
  }
}

// Pas plus de 3 posts consecutifs de la meme categorie
for (let i = 0; i < posts.length - 2; i++) {
  if (posts[i].category === posts[i+1].category &&
      posts[i+1].category === posts[i+2].category) {
    throw new Error(`3 posts consecutifs categorie '${posts[i].category}' a partir du ${posts[i].scheduled_date}`);
  }
}
```

### Equilibre des caption_styles (posts)

```javascript
const styles = ['question_directe', 'storytelling_court', 'factuel',
                'exclamatif', 'conseil', 'citation', 'liste', 'teaser'];
const styleCounts = {};
posts.forEach(p => {
  styleCounts[p.caption_style] = (styleCounts[p.caption_style] || 0) + 1;
});
const maxAllowed = Math.ceil(posts.length * 0.25);
for (const [style, count] of Object.entries(styleCounts)) {
  if (count > maxAllowed) {
    throw new Error(`caption_style '${style}' utilise ${count} fois (max ${maxAllowed})`);
  }
}
```

### Distribution des objectifs (posts)

```javascript
// Pas plus de 3 posts consecutifs avec le meme objectif
for (let i = 0; i < posts.length - 2; i++) {
  if (posts[i].objective === posts[i+1].objective &&
      posts[i+1].objective === posts[i+2].objective) {
    throw new Error(`3 posts consecutifs objectif '${posts[i].objective}'`);
  }
}
```

### Coherence stories

```javascript
// Stories : texte <= 60 caracteres
stories.forEach((s, idx) => {
  if (s.story_text && s.story_text.length > 60) {
    throw new Error(`Story ${idx}: story_text depasse 60 caracteres (${s.story_text.length})`);
  }
});

// Stories : source_slot_ref valide
stories.forEach((s, idx) => {
  if (s.source_slot_ref !== null) {
    if (s.source_slot_ref < 0 || s.source_slot_ref >= posts.length) {
      throw new Error(`Story ${idx}: source_slot_ref=${s.source_slot_ref} hors range`);
    }
  }
});

// Stories : heures espacees d'au moins 1h30 par jour
const storiesByDay = {};
stories.forEach(s => {
  if (!storiesByDay[s.scheduled_date]) storiesByDay[s.scheduled_date] = [];
  storiesByDay[s.scheduled_date].push(s.scheduled_time);
});
for (const [date, times] of Object.entries(storiesByDay)) {
  times.sort();
  for (let i = 0; i < times.length - 1; i++) {
    const [h1, m1] = times[i].split(':').map(Number);
    const [h2, m2] = times[i+1].split(':').map(Number);
    const diffMin = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (diffMin < 90) {
      throw new Error(`Stories trop proches le ${date}: ${times[i]} et ${times[i+1]} (${diffMin}min < 90min)`);
    }
  }
}
```

### Intensite par phase

```javascript
// Verifier que l'intensity_curve est respectee
const intensityCurve = $json.intensityCurve; // 'flat', 'ramp_up', 'peak_middle', 'front_loaded'
const phasePostCounts = {};
posts.forEach(p => {
  phasePostCounts[p.phase] = (phasePostCounts[p.phase] || 0) + 1;
});

const orderedPhases = campaign_phases.map(p => ({
  name: p.name,
  intensity: p.intensity,
  posts: phasePostCounts[p.name] || 0
}));

if (intensityCurve === 'ramp_up') {
  for (let i = 0; i < orderedPhases.length - 1; i++) {
    const phaseDaysI = daysBetween(campaign_phases[i].start_date, campaign_phases[i].end_date);
    const phaseDaysJ = daysBetween(campaign_phases[i+1].start_date, campaign_phases[i+1].end_date);
    const rateI = orderedPhases[i].posts / phaseDaysI;
    const rateJ = orderedPhases[i+1].posts / phaseDaysJ;
    if (rateJ < rateI * 0.8) { // tolerance 20%
      // Warning, pas erreur bloquante
      console.log(`Warning: ramp_up non respecte entre ${orderedPhases[i].name} et ${orderedPhases[i+1].name}`);
    }
  }
}
```

### Volume exact

```javascript
if (posts.length !== expectedPostsCount) {
  throw new Error(`Attendu ${expectedPostsCount} posts, recu ${posts.length}`);
}
if (stories.length !== expectedStoriesCount) {
  throw new Error(`Attendu ${expectedStoriesCount} stories, recu ${stories.length}`);
}
```

---

## 5. Regles de Volume

| Parametre | Source | Calcul |
|-----------|--------|--------|
| Duree campagne | `campaign.start_date` / `campaign.end_date` | `end - start + 1` jours |
| Posts/semaine | `campaign.objectives.posts_per_week` (defaut: 4) | Configurable |
| Stories/jour | `campaign.objectives.stories_per_day` (defaut: 6) | Configurable |
| Semaines | Calcule | `Math.ceil(campaignDays / 7)` |
| Total posts | Calcule | `posts_per_week * weeks` |
| Total stories | Calcule | `stories_per_day * campaignDays` |
| Nombre phases | Auto | 2-5 selon duree |

### Calcul dans le Code node (node 06)

```javascript
const campaign = $('Webhook').first().json.body.campaign;
const startDate = new Date(campaign.start_date);
const endDate = new Date(campaign.end_date);
const campaignDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
const weeksCount = Math.ceil(campaignDays / 7);

const objectives = campaign.objectives || {};
const postsPerWeek = objectives.posts_per_week || 4;
const storiesPerDay = objectives.stories_per_day || 6;

const postsCount = postsPerWeek * weeksCount;
const storiesCount = storiesPerDay * campaignDays;
const totalSlots = postsCount + storiesCount;

// Nombre de phases selon la duree
let phasesCount;
if (campaignDays <= 10) phasesCount = 2;
else if (campaignDays <= 21) phasesCount = 3;
else if (campaignDays <= 45) phasesCount = 4;
else phasesCount = 5;
```

---

## 6. Courbes d'Intensite

### flat
Distribution uniforme du volume sur toutes les phases.

### ramp_up
Volume croissant. Phase 1 = ~15% des posts, derniere phase = ~35%.
Ideal pour : teasing progressif, build-up evenement.

### peak_middle
Crescendo puis decrescendo. Phases centrales = pic de volume.
Ideal pour : lancement produit (teasing → lancement → soutien).

### front_loaded
Forte intensite au debut, decroissant ensuite.
Ideal pour : annonce urgente, promo flash, evenement passe.

### Implementation dans le prompt

```javascript
// Ajout dans le system prompt selon la courbe
const curveInstructions = {
  flat: 'Distribue les posts de maniere uniforme entre les phases.',
  ramp_up: 'Commence doucement (1-2 posts en phase 1) et augmente progressivement. La derniere phase doit avoir le plus de posts.',
  peak_middle: 'Faible volume en debut, pic au milieu de la campagne, puis retour a un volume modere en fin.',
  front_loaded: 'Volume maximal des la premiere phase, puis decroissant. Ideal pour creer un impact fort immediatement.'
};
```

---

## 7. Exemples Input/Output

### Exemple Input (campagne 3 semaines)

```json
{
  "client_id": "uuid-chez-marco",
  "campaign": {
    "name": "Lancement Menu Ete",
    "start_date": "2026-04-01",
    "end_date": "2026-04-21",
    "objectives": {
      "primary_goal": "lancement_produit",
      "description": "Lancer le nouveau menu d'ete avec focus terrasse et produits de saison",
      "kpis": [
        { "metric": "reach", "target": 50000 },
        { "metric": "engagement_rate", "target": 4.5 }
      ],
      "posts_per_week": 5,
      "stories_per_day": 7,
      "key_dates": [
        { "date": "2026-04-10", "label": "Jour de lancement menu" },
        { "date": "2026-04-15", "label": "Soiree inauguration terrasse" }
      ],
      "themes_imposed": ["menu ete", "terrasse", "produits de saison"],
      "intensity_curve": "peak_middle",
      "budget_tone": "premium"
    },
    "brief": "On veut creer de l'anticipation autour du nouveau menu d'ete. La terrasse rouvre le 15 avril. Le menu est pret des le 10. On veut que les gens reservent pour la soiree du 15."
  }
}
```

### Exemple Output (extrait)

```json
{
  "strategy_summary": "Campagne en 3 phases : teasing avec focus produits de saison (S1), lancement fort du menu + amplification (S2), consolidation autour de la soiree terrasse et fidelisation (S3). Courbe peak_middle avec pic semaine 2.",
  "campaign_phases": [
    {
      "name": "Teasing Saison",
      "start_date": "2026-04-01",
      "end_date": "2026-04-09",
      "objective": "Creer l'anticipation autour des produits de saison et du changement de carte",
      "tone": "mysterieux, passione",
      "intensity": "low"
    },
    {
      "name": "Lancement Menu",
      "start_date": "2026-04-10",
      "end_date": "2026-04-16",
      "objective": "Maximiser la visibilite du nouveau menu et de la soiree terrasse",
      "tone": "enthousiaste, genereux",
      "intensity": "high"
    },
    {
      "name": "Fidelisation Terrasse",
      "start_date": "2026-04-17",
      "end_date": "2026-04-21",
      "objective": "Convertir l'interet en reservations recurrentes",
      "tone": "convivial, chaleureux",
      "intensity": "medium"
    }
  ],
  "posts": [
    {
      "scheduled_date": "2026-04-01",
      "scheduled_time": "12:00",
      "phase": "Teasing Saison",
      "category": "produit",
      "theme": "Les asperges sont arrivees",
      "angle": "ingredient_saison",
      "tone": "passione",
      "caption_style": "teaser",
      "objective": "engagement",
      "visual_direction": "Gros plan asperges vertes sur plan de travail bois, lumiere naturelle, flou arriere-plan cuisine",
      "sublimation_mode": "creative",
      "cta": "Devinez quel plat on prepare...",
      "is_key_date": false
    },
    {
      "scheduled_date": "2026-04-10",
      "scheduled_time": "12:00",
      "phase": "Lancement Menu",
      "category": "produit",
      "theme": "Le nouveau menu d'ete est la !",
      "angle": "reveal_complet",
      "tone": "enthousiaste",
      "caption_style": "exclamatif",
      "objective": "notoriete",
      "visual_direction": "Flat lay complet du menu, nappe blanche, fleurs, lumiere ete",
      "sublimation_mode": "creative",
      "cta": "Reservez votre table ce soir !",
      "is_key_date": true
    }
  ],
  "stories": [
    {
      "scheduled_date": "2026-04-01",
      "scheduled_time": "08:30",
      "phase": "Teasing Saison",
      "category": "coulisses",
      "theme": "Livraison du marche",
      "angle": "morning_routine",
      "tone": "decontracte",
      "caption_style": "exclamatif",
      "objective": "fidelisation",
      "visual_direction": "Cagettes de legumes, mains du chef, lumiere matinale",
      "sublimation_mode": "light",
      "story_text": "Arrivage du jour !",
      "source_slot_ref": null,
      "cta": "Restez connectes"
    }
  ]
}
```

---

## 8. Metriques de Qualite

Le Code node de parsing (node 08) calcule un score de qualite avant d'inserer en DB :

| Metrique | Seuil | Calcul |
|----------|-------|--------|
| Dates dans la campagne | 100% | Tous les slots dans [start_date, end_date] |
| Key dates couvertes | 100% | Chaque key_date a au moins 1 post |
| Phases valides | 100% | Chaque post/story reference une phase existante |
| Phases sans trou | 100% | Les phases couvrent toute la duree |
| Couverture categories | 100% (si >= 2 semaines) | Toutes les 8 categories presentes dans les posts |
| Distribution styles | < 25% chacun | max(count) / total_posts < 0.25 |
| Espacement stories | >= 90 min | Ecart min entre stories du meme jour |
| Variete angles | >= 8 uniques | count(distinct angle) dans posts |
| Coherence source_slot_ref | 100% valides | Tous les refs pointent vers un post existant |
| Volume exact | 100% | posts.length + stories.length == expected |
| Story text length | <= 60 chars | Tous les story_text <= 60 caracteres |
| Intensite coherente | >= 70% | Volume par phase suit la courbe demandee |

Si le score global est < 80% ou qu'une contrainte absolue echoue, le workflow regenere (1 retry max) avec un prompt additionnel :

```
Le calendrier precedent a echoue la validation. Erreurs :
{validation_errors}

Corrige ces erreurs et regenere le JSON complet.
```

---

## 9. Implementation n8n (node 06 — Construire Prompt Strategie)

```javascript
// Code node v2 — Assemblage du prompt strategiste (campagne)
const client = $('Charger Donnees Client').first().json;
const brand = $('Charger Plateforme Marque').first().json;
const metricsItems = $('Charger Metriques Precedentes').all();
const captionsItems = $('Charger Captions Recentes').all();

// Campagne
const campaign = $('Webhook').first().json.body.campaign;
const startDate = new Date(campaign.start_date);
const endDate = new Date(campaign.end_date);
const campaignDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
const weeksCount = Math.ceil(campaignDays / 7);

const objectives = campaign.objectives || {};
const postsPerWeek = objectives.posts_per_week || 4;
const storiesPerDay = objectives.stories_per_day || 6;
const postsCount = postsPerWeek * weeksCount;
const storiesCount = storiesPerDay * campaignDays;
const totalSlots = postsCount + storiesCount;

// Nombre de phases
let phasesCount;
if (campaignDays <= 10) phasesCount = 2;
else if (campaignDays <= 21) phasesCount = 3;
else if (campaignDays <= 45) phasesCount = 4;
else phasesCount = 5;

// Courbe d'intensite
const intensityCurve = objectives.intensity_curve || 'flat';
const curveInstructions = {
  flat: 'Distribue les posts de maniere uniforme entre les phases.',
  ramp_up: 'Commence doucement (peu de posts en phase 1) et augmente progressivement. La derniere phase doit avoir le plus de posts.',
  peak_middle: 'Faible volume en debut, pic au milieu de la campagne, puis retour a un volume modere.',
  front_loaded: 'Volume maximal des la premiere phase, puis decroissant progressivement.'
};

// Key dates
const keyDatesFormatted = (objectives.key_dates || [])
  .map(kd => `- ${kd.date} : ${kd.label}`)
  .join('\n') || 'Aucune date cle.';

// KPIs
const kpisFormatted = (objectives.kpis || [])
  .map(k => `${k.metric}: ${k.target}`)
  .join(', ') || 'Non definis';

// Metriques precedentes
let metricsSummary = 'Pas de metriques disponibles (premiere campagne).';
if (metricsItems.length > 0 && !metricsItems[0].json._noData) {
  const rates = metricsItems.map(m => m.json.engagement_rate).filter(Boolean);
  const avgRate = rates.length > 0
    ? (rates.reduce((a, b) => a + b, 0) / rates.length * 100).toFixed(1)
    : 'N/A';
  metricsSummary = `Publications recentes : ${metricsItems.length}\nEngagement moyen : ${avgRate}%`;
}

// Captions recentes (anti-repetition)
const recentCaptions = captionsItems
  .filter(c => !c.json._noData)
  .map((c, i) => `${i + 1}. [${c.json.caption_style || '?'}] ${(c.json.caption || '').substring(0, 120)}`)
  .join('\n');

// Assemblage user prompt
const userPrompt = `# BRIEF CAMPAGNE — ${client.name}

## CAMPAGNE : ${campaign.name}

Periode : du ${campaign.start_date} au ${campaign.end_date} (${campaignDays} jours, ${weeksCount} semaines)
Objectif principal : ${objectives.primary_goal || 'engagement'} — ${objectives.description || ''}
KPIs cibles : ${kpisFormatted}
Courbe d'intensite : ${intensityCurve}
Ton budgetaire : ${objectives.budget_tone || 'standard'}

### Dates cles
${keyDatesFormatted}

### Themes imposes
${(objectives.themes_imposed || []).join(', ') || 'Aucun'}

### Brief client
${campaign.brief || 'Pas de brief specifique.'}

## IDENTITE DE MARQUE

Secteur : ${client.industry || 'Non precise'}
Mission : ${brand.mission || ''}
Vision : ${brand.vision || ''}
Valeurs :
${(brand.brand_values || []).map(v => typeof v === 'object' ? '- ' + v.name + ' (implique: ' + (v.implique || 'N/A') + ' / exclut: ' + (v.exclut || 'N/A') + ')' : '- ' + v).join('\n')}
Personnalite : ${brand.personality || ''}
Archetype principal : ${(brand.archetype && typeof brand.archetype === 'object' ? brand.archetype.principal : brand.archetype) || ''}
Archetype secondaire : ${(brand.archetype && typeof brand.archetype === 'object' ? brand.archetype.secondaire : '') || ''}
Ton de voix : ${brand.tone_of_voice || ''}
Vocabulaire a utiliser : ${(brand.vocabulary_do || []).join(', ')}
Vocabulaire interdit : ${(brand.vocabulary_dont || []).join(', ')}
Style visuel : ${brand.visual_style || ''}
Style photo : ${brand.photo_style || ''}
Audience cible : ${brand.target_audience || ''}
Differenciateurs : ${(brand.differentiators || []).join(', ')}

## POSITIONNEMENT

Insight cle : ${brand.key_insight || ''}
Promesse de marque : ${brand.brand_promise || ''}
Essence de marque : ${brand.brand_essence || ''}
Tagline : ${brand.tagline || ''}
Discriminateur : ${brand.discriminator || ''}
USPs :
${(brand.usps || []).map((u, i) => (i+1) + '. ' + (typeof u === 'object' ? u.title || u.name || JSON.stringify(u) : u)).join('\n')}
Proof points : ${(brand.proof_points || []).join(', ')}
Chiffres cles : ${(brand.key_figures || []).join(', ')}

## PERSONAS

${((brand.brand_extended || {}).personas || []).map(p => '- ' + (p.name || '?') + ' (' + (p.type || '?') + ') — Probleme: ' + (p.probleme || '?') + ' — Message cle: ' + (p.message_cle || '?')).join('\n') || 'Pas de personas definis.'}

## OBJECTIFS MARQUE (permanents)

Objectif principal marque : ${brand.objectives_primary || ''}
Objectifs secondaires : ${(brand.objectives_secondary || []).join(', ')}
KPIs marque : ${(brand.kpis || []).join(', ')}

## METRIQUES RECENTES (30 derniers jours)

${metricsSummary}

## CAPTIONS RECENTES (anti-repetition — ne pas reprendre ces structures)

${recentCaptions || 'Aucune caption publiee encore.'}

## VOLUME DEMANDE

- Phases : ${phasesCount} phases (adapte a ${campaignDays} jours)
- Posts feed : ${postsCount} posts (${postsPerWeek}/semaine x ${weeksCount} semaines)
- Stories : ${storiesCount} stories (${storiesPerDay}/jour x ${campaignDays} jours)
- Total : ${totalSlots} slots

## INSTRUCTIONS INTENSITE

${curveInstructions[intensityCurve] || curveInstructions.flat}

## FORMAT DE SORTIE

Reponds avec un JSON respectant EXACTEMENT ce schema (pas de texte autour) :

{
  "strategy_summary": "string",
  "campaign_phases": [{ "name": "string", "start_date": "YYYY-MM-DD", "end_date": "YYYY-MM-DD", "objective": "string", "tone": "string", "intensity": "low|medium|high" }],
  "posts": [{ "scheduled_date": "YYYY-MM-DD", "scheduled_time": "HH:MM", "phase": "string", "category": "enum", "theme": "string", "angle": "string", "tone": "string", "caption_style": "enum", "objective": "enum", "visual_direction": "string", "sublimation_mode": "creative", "cta": "string", "is_key_date": false }],
  "stories": [{ "scheduled_date": "YYYY-MM-DD", "scheduled_time": "HH:MM", "phase": "string", "category": "enum", "theme": "string", "angle": "string", "tone": "string", "caption_style": "enum", "objective": "enum", "visual_direction": "string", "sublimation_mode": "light", "story_text": "string (max 60 chars)", "source_slot_ref": "null | index post", "cta": "string" }]
}

Enums valides :
- category : produit, coulisses, equipe, engagement, saisonnier, educatif, temoignage, ambiance
- caption_style : question_directe, storytelling_court, factuel, exclamatif, conseil, citation, liste, teaser
- objective : engagement, conversion, notoriete, fidelisation
- intensity : low, medium, high`;

// System prompt
const systemPrompt = `Tu es un stratege editorial specialise dans les reseaux sociaux (Instagram + Facebook).
Tu produis des calendriers de contenu pour des campagnes de duree variable, structures en phases, varies et alignes avec la marque et les objectifs.

REGLES ABSOLUES :
- Tu reponds UNIQUEMENT en JSON valide, sans texte avant ni apres.
- Le JSON doit respecter exactement le schema fourni.
- Tu structures la campagne en exactement ${phasesCount} phases coherentes.
- Tu adaptes l'intensite selon la courbe "${intensityCurve}".
- Tu places des contenus strategiques sur les dates cles.
- Tu ne repetes jamais deux themes identiques sur la meme semaine.
- Tu distribues les categories de maniere equilibree.
- Tu alternes les caption_styles pour eviter la monotonie.
- Tu assignes des heures de publication optimales.
- Tu crees des liens logiques entre posts et stories du meme jour (source_slot_ref).
- Tu respectes les objectifs de la campagne.
- Tu tiens compte des metriques recentes.

CONTRAINTES DE VOLUME :
- Posts feed : exactement ${postsCount}
- Stories : exactement ${storiesCount}
- Total : ${totalSlots} slots
- Duree : ${campaignDays} jours (du ${campaign.start_date} au ${campaign.end_date})

CONTRAINTES DE VARIETE :
- Chaque content_category au moins 1 fois${campaignDays >= 14 ? ' par semaine' : ' dans la campagne'} (posts).
- Aucun caption_style > 25% des posts.
- Pas 2 posts consecutifs meme angle.
- Pas plus de 3 posts consecutifs meme objectif.
- Stories d'un meme jour = progression narrative.

DATES CLES :
- Chaque date cle DOIT avoir au moins 1 post dedie.
- Les posts des dates cles doivent avoir is_key_date: true.

HEURES DE PUBLICATION :
- Posts : 11:30-13:00 ou 18:00-20:00
- Stories : 08:00-22:00, espacees d'au moins 1h30`;

return [{
  json: {
    systemPrompt,
    userPrompt,
    postsCount,
    storiesCount,
    totalSlots,
    campaignDays,
    campaignStartDate: campaign.start_date,
    campaignEndDate: campaign.end_date,
    campaignName: campaign.name,
    keyDates: objectives.key_dates || [],
    intensityCurve,
    phasesCount,
    model: 'gpt-4o'
  }
}];
```

---

## 10. Integration n8n (node 07 — Agent Strategiste)

Le node 06 (Code) produit `systemPrompt` et `userPrompt`. Ces valeurs alimentent un AI Agent natif n8n.

### Architecture des nodes

```
AI Agent (@n8n/n8n-nodes-langchain.agent@3.1)
  promptType: define
  text: ={{ $json.userPrompt }}
  hasOutputParser: true
  options.systemMessage: ={{ $json.systemPrompt }}
  options.maxIterations: 3
  |
  +-- ai_languageModel <-- OpenAI Chat Model (@n8n/n8n-nodes-langchain.lmChatOpenAi@1.3)
  |     model: gpt-4o
  |     options.temperature: 0.8
  |     options.maxTokens: 16000
  |
  +-- ai_outputParser  <-- Structured Output Parser (@n8n/n8n-nodes-langchain.outputParserStructured@1.3)
        schemaType: fromJson
        jsonSchemaExample: (voir ci-dessous)
        autoFix: true
```

### JSON Schema Example (Structured Output Parser)

```json
{
  "strategy_summary": "Resume strategie de la campagne",
  "campaign_phases": [
    {
      "name": "Teasing",
      "start_date": "2026-04-01",
      "end_date": "2026-04-09",
      "objective": "Creer anticipation",
      "tone": "mysterieux",
      "intensity": "low"
    }
  ],
  "posts": [
    {
      "scheduled_date": "2026-04-01",
      "scheduled_time": "12:00",
      "phase": "Teasing",
      "category": "produit",
      "theme": "Sujet du post",
      "angle": "angle_approche",
      "tone": "chaleureux",
      "caption_style": "storytelling_court",
      "objective": "engagement",
      "visual_direction": "Description direction visuelle pour le DA",
      "sublimation_mode": "creative",
      "cta": "Call to action souhaite",
      "is_key_date": false
    }
  ],
  "stories": [
    {
      "scheduled_date": "2026-04-01",
      "scheduled_time": "08:30",
      "phase": "Teasing",
      "category": "coulisses",
      "theme": "Sujet story",
      "angle": "angle_court",
      "tone": "decontracte",
      "caption_style": "exclamatif",
      "objective": "fidelisation",
      "visual_direction": "Direction visuelle legere",
      "sublimation_mode": "light",
      "story_text": "Texte court max 60 chars",
      "source_slot_ref": null,
      "cta": "CTA story"
    }
  ]
}
```

### Sortie du node

L'AI Agent avec Structured Output Parser renvoie directement un objet JSON parse dans `$json.output`. Pas besoin de `JSON.parse()` dans le Code node suivant (node 08).

```javascript
// Node 08 — Valider Calendrier
const result = $json.output; // deja un objet JS (pas de parsing)
const { posts, stories, strategy_summary, campaign_phases } = result;
// ... validation comme decrit en section 4
```

### Parametres

| Parametre | Valeur | Justification |
|-----------|--------|---------------|
| model | gpt-4o | Meilleur rapport qualite/prix pour la planification structuree |
| temperature | 0.8 | Assez creatif pour varier, assez structure pour le JSON |
| maxTokens | 16000 | Volume variable — 16k couvre les campagnes longues |
| hasOutputParser | true | Structured Output Parser garantit le format JSON |
| autoFix | true | Re-appel LLM si le parsing echoue |

### TypeVersions

| Node | workflowNodeType | Version |
|------|------------------|---------|
| AI Agent | `@n8n/n8n-nodes-langchain.agent` | 3.1 |
| OpenAI Chat Model | `@n8n/n8n-nodes-langchain.lmChatOpenAi` | 1.3 |
| Structured Output Parser | `@n8n/n8n-nodes-langchain.outputParserStructured` | 1.3 |

### Budget

| Metrique | Estimation |
|----------|-----------|
| Input tokens | ~2 500 (prompt campagne plus riche) |
| Output tokens | ~5 000-15 000 (selon duree campagne) |
| Cout/execution | ~0.05-0.10$ |
| Executions/mois | 1-5 par client (plusieurs campagnes possibles) |
| Cout/mois/client | ~0.10-0.50$ |

---

*Reecrit le 2026-03-06 — Refonte campagne (duree flexible, objectifs, phases, intensity_curve) + enrichissement brand (POSITIONNEMENT, PERSONAS, brand_values JSONB, archetype dual)*
*MAJ 2026-03-07 — Architecture multi-agent v2 (3 agents sequentiels), prompts prompt-engineered (XML, CoT, few-shot, guardrails), deploye MCP*
