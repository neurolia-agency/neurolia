# Agent Redacteur — Spec Prompt

Specification complete de l'agent IA qui redige les captions Instagram/Facebook avec le systeme de prompt a 4 couches.

---

## 1. Architecture 4 Couches

| Couche | Role | Source DB | Dynamique |
|--------|------|-----------|-----------|
| 1 — Identite | Ton, valeurs, vocabulaire, personnalite | `brand_platforms` | Par client |
| 2 — Directive editoriale | Theme, angle, ton, style, CTA | `editorial_slots` | Par post |
| 3 — Vision | Ce que l'image sublimee montre | Image jointe (GPT-4o vision) | Par post |
| 4 — Anti-repetition | 15 dernieres captions publiees | `content_queue` WHERE published | Glissant |

---

## 2. System Prompt

```
Tu es un redacteur social media expert. Tu ecris des captions Instagram et Facebook qui engagent, convertissent et fidelisent.

REGLES ABSOLUES :
- Tu ecris dans le ton et la voix de la marque fournis (Couche 1).
- Tu suis la directive editoriale du slot (Couche 2) : theme, angle, ton, style de caption, CTA.
- Tu decris ce que l'image montre (Couche 3) — ta caption doit etre coherente avec le visuel.
- Tu ne repetes JAMAIS une structure, une accroche ou une formule deja utilisee dans les 15 dernieres captions (Couche 4).
- Tu reponds UNIQUEMENT en JSON valide.

FORMAT DE SORTIE :
{
  "caption": "string — le texte complet de la caption",
  "hashtags": ["string — hashtags sans #, 10-15 max"],
  "cta": "string — call to action final"
}

REGLES DE REDACTION :
- La premiere ligne est l'accroche : elle doit arreter le scroll.
- Adapte la longueur au content_type :
  - Post : 150-300 mots, structure en paragraphes ou listes.
  - Story : 1-2 phrases max (20-40 mots), percutant et direct.
- Utilise les emojis selon la policy de la marque (none, moderate, frequent).
- Le CTA doit etre naturel, pas force.
- Les hashtags doivent mixer : branded (marque) + niche (secteur) + volume (populaires).

STYLES DE CAPTION :
- question_directe : Commence par une question qui interpelle. Invite a commenter.
- storytelling_court : Raconte une micro-histoire (debut, tension, resolution). Personnel et authentique.
- factuel : Informations cles, chiffres, faits. Ton expert et credible.
- exclamatif : Energie haute, enthousiasme, celebration. Phrases courtes et percutantes.
- conseil : Donne un tip, un how-to, un conseil pratique. Format educatif.
- citation : Commence par une citation (du fondateur, d'un client, inspirationnelle). Guillemets.
- liste : Format liste (3-5 points). Lisible et scannable.
- teaser : Mystere, suspense, annonce a venir. Donne envie d'en savoir plus.

INTERDICTIONS :
- Pas de "N'hesitez pas a..." — formule banale.
- Pas de "Decouvrez notre..." en accroche — trop generique.
- Pas de formule type "Et vous, qu'en pensez-vous ?" sauf si caption_style=question_directe.
- Pas de hashtags dans le corps de la caption.
- Pas de liens (les liens ne sont pas cliquables dans les captions Instagram).
- Pas d'emojis si emoji_usage=none.

REGLES DE MARQUE :
- Tu DOIS utiliser le {tu_vous} systematiquement (tutoiement ou vouvoiement).
- Chaque caption doit servir la promesse de marque.
- En style factuel, cite des proof_points reels — jamais de chiffres inventes.
```

---

## 3. User Prompt Template

Assemble dynamiquement dans le Code node n8n (node 18 de WF02, node 14 de WF03).

```
# COUCHE 1 — IDENTITE DE MARQUE

Marque : {client_name}
Secteur : {industry}
Ton de voix : {tone_of_voice}
Personnalite : {personality}
Archetype : {archetype}
Valeurs : {values_csv}
Vocabulaire a utiliser : {vocabulary_do_csv}
Vocabulaire interdit : {vocabulary_dont_csv}
Regles redactionnelles : {writing_rules}
Emojis : {emoji_usage}
Hashtags de marque : {hashtags_branded_csv}
Hashtags de niche : {hashtags_niche_csv}
CTA favoris : {cta_preferred_csv}
Audience cible : {target_audience}
Tu/Vous : {tu_vous}
Formalite (1-5) : {formality_level}
Essence de marque : {brand_essence}

# ANCRAGE STRATEGIQUE

Insight cle : {key_insight}
Promesse de marque : {brand_promise}
Tagline : {tagline}
USPs :
{usps_formatted}
Proof points : {proof_points_csv}

# COUCHE 2 — DIRECTIVE EDITORIALE

Type : {content_type} (post | story)
Theme : {theme}
Angle : {angle}
Ton specifique : {slot_tone}
Style de caption : {caption_style}
Objectif : {objective}
CTA souhaite : {slot_cta}

# COUCHE 3 — VISION

[Image sublimee jointe — analyse-la et decris ce que tu vois pour ancrer ta caption dans le visuel]

# COUCHE 4 — ANTI-REPETITION

Voici les 15 dernieres captions publiees. NE REPRENDS PAS les memes accroches, structures ou formules :

{anti_repetition_block}

# EXEMPLES DE PHRASES

A faire :
{example_phrases_do}

A eviter :
{example_phrases_dont}

# INSTRUCTIONS

Ecris une caption {content_type} en style "{caption_style}" pour le theme "{theme}".
L'objectif est : {objective}.
Reponds en JSON : { "caption", "hashtags", "cta" }
```

---

## 4. Format de Sortie

```json
{
  "caption": "string — texte complet de la caption",
  "hashtags": [
    "string — hashtag sans le #",
    "..."
  ],
  "cta": "string — call to action"
}
```

### Regles de validation (Code node apres l'AI Agent)

```javascript
const result = $json.output; // deja parse par le Structured Output Parser

// Validation structure
if (!result.caption || !result.hashtags || !result.cta) {
  throw new Error('Reponse incomplete: caption, hashtags et cta requis');
}

// Validation longueur caption
const wordCount = result.caption.split(/\s+/).length;
const contentType = $('Fetch Slot Direction').first().json.content_type;
if (contentType === 'post' && (wordCount < 50 || wordCount > 400)) {
  throw new Error(`Caption post: ${wordCount} mots (attendu 50-400)`);
}
if (contentType === 'story' && wordCount > 50) {
  throw new Error(`Caption story: ${wordCount} mots (attendu < 50)`);
}

// Validation hashtags
if (result.hashtags.length < 5 || result.hashtags.length > 15) {
  throw new Error(`Hashtags: ${result.hashtags.length} (attendu 5-15)`);
}
// Retirer les # si l'IA les a inclus
result.hashtags = result.hashtags.map(h => h.replace(/^#/, ''));

// Validation anti-formules bannies
const banned = ['n\'hesitez pas', 'decouvrez notre', 'decouvrez nos'];
const captionLower = result.caption.toLowerCase();
for (const formula of banned) {
  if (captionLower.includes(formula)) {
    throw new Error(`Formule bannie detectee: "${formula}"`);
  }
}

return [{ json: result }];
```

---

## 5. Contraintes de Variete

### Rotation des structures

Le Code node d'assemblage du prompt (node 18) injecte des instructions supplementaires basees sur l'analyse des captions recentes :

```javascript
// Analyser les patterns des 15 dernieres captions
const recentCaptions = $('Fetch Anti-Repetition Captions').all();

// Detecter les accroches repetees
const firstLines = recentCaptions.map(c => {
  const caption = c.json.caption || '';
  return caption.split('\n')[0].substring(0, 50);
});

// Detecter les styles surrepresentes
const recentStyles = recentCaptions
  .map(c => c.json.caption_style)
  .filter(Boolean);
const styleCounts = {};
recentStyles.forEach(s => { styleCounts[s] = (styleCounts[s] || 0) + 1; });
const overusedStyles = Object.entries(styleCounts)
  .filter(([_, count]) => count >= 3)
  .map(([style]) => style);

let antiRepetitionInstructions = '';
if (overusedStyles.length > 0) {
  antiRepetitionInstructions += `\nATTENTION : Les styles suivants sont surrepresentes recemment : ${overusedStyles.join(', ')}. Varie davantage ta structure.\n`;
}

// Detecter les mots d'accroche repetes
const firstWords = firstLines.map(l => l.split(/\s+/)[0]?.toLowerCase()).filter(Boolean);
const wordCounts = {};
firstWords.forEach(w => { wordCounts[w] = (wordCounts[w] || 0) + 1; });
const overusedWords = Object.entries(wordCounts)
  .filter(([_, count]) => count >= 2)
  .map(([word]) => word);
if (overusedWords.length > 0) {
  antiRepetitionInstructions += `\nNE COMMENCE PAS par : ${overusedWords.join(', ')} (deja utilises recemment).\n`;
}
```

### Regles par caption_style

| Style | Accroche | Structure | Longueur post | Longueur story |
|-------|----------|-----------|---------------|----------------|
| `question_directe` | Question ouverte interpellante | Question → contexte → reponse partielle → CTA | 150-250 mots | 15-25 mots |
| `storytelling_court` | Situation/scene immersive | Debut → tension → resolution → ouverture | 200-300 mots | 20-40 mots |
| `factuel` | Chiffre, fait, stat | Fait → explication → impact → CTA | 100-200 mots | 10-20 mots |
| `exclamatif` | Exclamation energique | Exclamation → details → celebration → CTA | 100-200 mots | 10-20 mots |
| `conseil` | "Le secret pour..." ou imperatif | Intro → conseil → pourquoi → application | 150-250 mots | 15-25 mots |
| `citation` | Citation entre guillemets | Citation → contexte → lien marque → CTA | 150-250 mots | 15-30 mots |
| `liste` | Chiffre ("3 raisons...") | Intro → points numerotes → conclusion | 150-250 mots | 15-25 mots |
| `teaser` | Mystere, intrigue | Indice → suspense → promesse → CTA "bientot" | 100-200 mots | 10-20 mots |

---

## 6. Regles par content_type

### Post feed (Instagram + Facebook)

```
- Longueur : 150-300 mots
- Structure : accroche (1 ligne) + corps (2-4 paragraphes) + CTA final
- Hashtags : 10-15, places apres le CTA (separes par un saut de ligne)
- Emojis : selon emoji_usage (none = 0, moderate = 3-5, frequent = 8-12)
- Sauts de ligne : utiliser pour aerer (Instagram affiche les \n)
- Pas de lien (non cliquable sur Instagram)
- Le CTA doit diriger vers : commentaire, like, save, partage, bio link, ou DM
```

### Story (Instagram + Facebook)

```
- Longueur : 1-2 phrases (20-40 mots max)
- Style : direct, percutant, conversationnel
- Hashtags : 3-5 max (seront dans un sticker ou en petit)
- Emojis : 1-2 max meme si emoji_usage=frequent
- CTA : action rapide (swipe, vote, DM, tap)
- Pas de structure complexe — une seule idee par story
- Coherent avec le story_text incruste sur l'image
```

---

## 7. Integration n8n (Agent Redacteur)

Le Code node (node 18 WF02 / node 14 WF03) produit `systemPrompt`, `userPrompt` et `sublimatedImageUrl`. Ces valeurs alimentent un AI Agent natif n8n.

### Architecture des nodes

```
AI Agent (@n8n/n8n-nodes-langchain.agent@3.1)
  promptType: define
  text: ={{ $json.userPrompt }}
  hasOutputParser: true
  options.systemMessage: ={{ $json.systemPrompt }}
  options.maxIterations: 3
  options.passthroughBinaryImages: true    # image sublimee en vision
  |
  +-- ai_languageModel <-- OpenAI Chat Model (@n8n/n8n-nodes-langchain.lmChatOpenAi@1.3)
  |     model: gpt-4o
  |     options.temperature: 0.9           # posts (0.85 pour stories — configurable via expression)
  |     options.maxTokens: 1000            # posts (300 pour stories)
  |
  +-- ai_outputParser  <-- Structured Output Parser (@n8n/n8n-nodes-langchain.outputParserStructured@1.3)
        schemaType: fromJson
        jsonSchemaExample: (voir ci-dessous)
        autoFix: true
```

### JSON Schema Example (Structured Output Parser)

```json
{
  "caption": "Texte complet de la caption",
  "hashtags": ["ChezMarco", "CuisineItalienne", "FaitMaison", "RestaurantLyon", "ProduitsFrais"],
  "cta": "Call to action final"
}
```

### Image sublimee en vision

L'image sublimee est passee en binaire via le flux principal (propriete `data`). Le parametre `passthroughBinaryImages: true` de l'AI Agent permet a GPT-4o d'analyser l'image (Couche 3 — Vision) sans la passer explicitement dans le prompt texte.

### Sortie du node

L'AI Agent avec Structured Output Parser renvoie directement un objet JSON parse dans `$json.output`.

```javascript
// Le Code node de validation recoit directement l'objet parse
const result = $json.output; // { caption, hashtags, cta } — deja parse
```

### Parametres

| Parametre | Post | Story | Justification |
|-----------|------|-------|---------------|
| model | gpt-4o | gpt-4o | Vision + texte |
| temperature | 0.9 | 0.85 | Creatif pour posts, controle pour stories courtes |
| maxTokens | 1000 | 300 | Post ~500 tokens, Story ~100 tokens |
| hasOutputParser | true | true | Structured Output Parser garantit le format JSON |
| autoFix | true | true | Re-appel LLM si le parsing echoue |
| passthroughBinaryImages | true | true | Image sublimee analysee par GPT-4o vision |

### TypeVersions

| Node | workflowNodeType | Version |
|------|------------------|---------|
| AI Agent | `@n8n/n8n-nodes-langchain.agent` | 3.1 |
| OpenAI Chat Model | `@n8n/n8n-nodes-langchain.lmChatOpenAi` | 1.3 |
| Structured Output Parser | `@n8n/n8n-nodes-langchain.outputParserStructured` | 1.3 |

### Budget

| Operation | Input tokens | Output tokens | Cout unitaire | Volume/mois | Cout/mois |
|-----------|-------------|---------------|--------------|-------------|-----------|
| Caption post | ~1 500 (texte) + ~500 (image) | ~500 | ~0.01$ | ~16 | ~0.16$ |
| Caption story | ~1 200 (texte) + ~500 (image) | ~150 | ~0.006$ | ~180 | ~1.08$ |
| **Total captions** | | | | **~196** | **~1.24$** |

> Budget < 0.02$/caption respecte (moy. ~0.0063$/caption).

---

## 8. Implementation n8n Complette (node 18 — Build Caption Prompt)

```javascript
// Code node v2 — Assemblage du prompt redacteur (4 couches)
const slot = $('Fetch Slot Direction').first().json;
const brand = $('Fetch Brand Platform').first().json;
const sublimatedUrl = $('Upload Sublimated Image').first().json.url
  || $('Agent DA — Sublimation').first().json.data?.[0]?.url;
const recentCaptions = $('Fetch Anti-Repetition Captions').all();

// --- COUCHE 1 : Identite ---
const layer1 = `# COUCHE 1 — IDENTITE DE MARQUE

Marque : ${$('Fetch Client Data').first().json.name}
Secteur : ${$('Fetch Client Data').first().json.industry || 'Non precise'}
Ton de voix : ${brand.tone_of_voice || ''}
Personnalite : ${brand.personality || ''}
Archetype : ${(brand.archetype && typeof brand.archetype === 'object' ? brand.archetype.principal : brand.archetype) || ''}
Valeurs : ${(brand.brand_values || []).map(v => typeof v === 'object' ? v.name : v).join(', ')}
Vocabulaire a utiliser : ${(brand.vocabulary_do || []).join(', ')}
Vocabulaire interdit : ${(brand.vocabulary_dont || []).join(', ')}
Regles redactionnelles : ${brand.writing_rules || 'Aucune regle specifique'}
Emojis : ${brand.emoji_usage || 'moderate'}
Hashtags de marque : ${(brand.hashtags_branded || []).join(', ')}
Hashtags de niche : ${(brand.hashtags_niche || []).join(', ')}
CTA favoris : ${(brand.cta_preferred || []).join(', ')}
Audience cible : ${brand.target_audience || ''}
Tu/Vous : ${brand.tu_vous || 'vouvoiement'}
Formalite (1-5) : ${brand.formality_level || 3}
Essence de marque : ${brand.brand_essence || ''}`;

const ancrage = `# ANCRAGE STRATEGIQUE

Insight cle : ${brand.key_insight || ''}
Promesse de marque : ${brand.brand_promise || ''}
Tagline : ${brand.tagline || ''}
USPs :
${(brand.usps || []).map((u, i) => (i+1) + '. ' + (typeof u === 'object' ? u.title || u.name || JSON.stringify(u) : u)).join('\n')}
Proof points : ${(brand.proof_points || []).join(', ')}`;

// --- COUCHE 2 : Directive editoriale ---
const layer2 = `# COUCHE 2 — DIRECTIVE EDITORIALE

Type : ${slot.content_type}
Theme : ${slot.theme}
Angle : ${slot.angle || 'Libre'}
Ton specifique : ${slot.tone || 'Ton par defaut de la marque'}
Style de caption : ${slot.caption_style}
Objectif : ${slot.objective}
CTA souhaite : ${slot.cta || 'Libre'}`;

// --- COUCHE 3 : Vision (image jointe) ---
const layer3 = `# COUCHE 3 — VISION

[Image sublimee jointe — analyse-la et decris ce que tu vois pour ancrer ta caption dans le visuel]`;

// --- COUCHE 4 : Anti-repetition ---
const captionsBlock = recentCaptions
  .map((c, i) => {
    const cap = c.json.caption || '';
    const style = c.json.caption_style || '?';
    return `${i + 1}. [${style}] ${cap.substring(0, 150)}${cap.length > 150 ? '...' : ''}`;
  })
  .join('\n');

// Analyse des patterns pour instructions supplementaires
let antiRepInstructions = '';
const firstLines = recentCaptions.map(c => (c.json.caption || '').split('\n')[0].substring(0, 50));
const firstWords = firstLines.map(l => l.split(/\s+/)[0]?.toLowerCase()).filter(Boolean);
const wordCounts = {};
firstWords.forEach(w => { wordCounts[w] = (wordCounts[w] || 0) + 1; });
const overusedWords = Object.entries(wordCounts)
  .filter(([_, count]) => count >= 2)
  .map(([word]) => word);
if (overusedWords.length > 0) {
  antiRepInstructions += `\nNE COMMENCE PAS ta caption par : ${overusedWords.join(', ')}`;
}

const recentStyles = recentCaptions.map(c => c.json.caption_style).filter(Boolean);
const styleCounts = {};
recentStyles.forEach(s => { styleCounts[s] = (styleCounts[s] || 0) + 1; });
const overusedStyles = Object.entries(styleCounts)
  .filter(([_, count]) => count >= 3)
  .map(([style]) => style);
if (overusedStyles.length > 0) {
  antiRepInstructions += `\nStyles surrepresentes recemment (varie davantage) : ${overusedStyles.join(', ')}`;
}

const layer4 = `# COUCHE 4 — ANTI-REPETITION

Voici les 15 dernieres captions publiees. NE REPRENDS PAS les memes accroches, structures ou formules :

${captionsBlock || 'Aucune caption publiee encore (premiere publication).'}
${antiRepInstructions}`;

const exPhrases = brand.brand_extended?.example_phrases;
const examplesBlock = exPhrases ? `# EXEMPLES DE PHRASES

A faire :
${(exPhrases.do || []).slice(0, 3).map(p => '- ' + p).join('\n')}

A eviter :
${(exPhrases.dont || []).slice(0, 3).map(p => '- ' + p).join('\n')}` : '';

// Section messages
const sectionMsgs = brand.brand_extended?.section_messages || {};
const slotTheme = (slot.theme || '').toLowerCase();
let sectionRef = '';
for (const [key, msg] of Object.entries(sectionMsgs)) {
  if (slotTheme.includes(key.toLowerCase())) {
    sectionRef = `\nMessage de reference pour ce theme : ${msg}`;
    break;
  }
}

// Product categories
let productRef = '';
if (slot.category === 'produit' && brand.brand_extended?.product_categories) {
  const cats = brand.brand_extended.product_categories;
  const matchCat = cats.find(c => slotTheme.includes((c.name || '').toLowerCase()));
  if (matchCat) {
    productRef = `\nCategorie produit : ${matchCat.name} — ${matchCat.tagline || ''}\n${matchCat.description || ''}`;
  }
}

// --- Assemblage ---
const userPrompt = `${layer1}

${ancrage}

${layer2}${sectionRef}${productRef}

${layer3}

${layer4}

${examplesBlock}

# INSTRUCTIONS

Ecris une caption ${slot.content_type} en style "${slot.caption_style}" pour le theme "${slot.theme}".
L'objectif est : ${slot.objective}.
Reponds en JSON : { "caption": "string", "hashtags": ["string"], "cta": "string" }`;

// --- System prompt ---
const systemPrompt = `Tu es un redacteur social media expert. Tu ecris des captions Instagram et Facebook qui engagent, convertissent et fidelisent.

REGLES ABSOLUES :
- Tu ecris dans le ton et la voix de la marque fournis (Couche 1).
- Tu suis la directive editoriale du slot (Couche 2).
- Tu decris ce que l'image montre (Couche 3) — ta caption est coherente avec le visuel.
- Tu ne repetes JAMAIS une structure ou formule des 15 dernieres captions (Couche 4).
- Tu reponds UNIQUEMENT en JSON valide.

FORMAT DE SORTIE :
{ "caption": "string", "hashtags": ["string sans #, 10-15"], "cta": "string" }

STYLES DE CAPTION :
- question_directe : Question interpellante en accroche. Invite a commenter.
- storytelling_court : Micro-histoire (debut, tension, resolution). Personnel.
- factuel : Infos cles, chiffres, faits. Ton expert.
- exclamatif : Energie haute, celebration. Phrases courtes.
- conseil : Tip, how-to, conseil pratique. Format educatif.
- citation : Commence par une citation. Guillemets.
- liste : Format liste (3-5 points). Lisible.
- teaser : Mystere, suspense, annonce. Donne envie d'en savoir plus.

LONGUEURS :
- Post : 150-300 mots. Accroche + corps + CTA.
- Story : 20-40 mots max. Direct et percutant.

INTERDICTIONS :
- Pas de "N'hesitez pas a..."
- Pas de "Decouvrez notre..." en accroche
- Pas de "Et vous, qu'en pensez-vous ?" (sauf question_directe)
- Pas de hashtags dans le corps
- Pas de liens
- Emojis : ${brand.emoji_usage || 'moderate'} (none=0, moderate=3-5, frequent=8-12)

REGLES DE MARQUE :
- Tu DOIS utiliser le ${brand.tu_vous || 'vouvoiement'} systematiquement.
- Chaque caption doit servir la promesse de marque.
- En style factuel, cite des proof_points reels — jamais de chiffres inventes.`;

return [{
  json: {
    systemPrompt,
    userPrompt,
    sublimatedImageUrl: sublimatedUrl,
    contentType: slot.content_type,
    model: 'gpt-4o'
  }
}];
```

---

## 9. Exemples par caption_style

### question_directe — Post

```json
{
  "caption": "Si tu pouvais gouter un seul plat pour la premiere fois, lequel choisirais-tu ?\n\nAujourd'hui, Marco a sublime les asperges vertes du marche en un risotto cremeux qui fond en bouche.\n\nChaque grain de riz absorbe le beurre noisette et le parmesan affine 24 mois. Les asperges ? Cueillies ce matin a 30 km de Lyon.\n\nC'est ca, la cuisine de Marco : des produits frais, un savoir-faire transmis, et une passion qui se goute.\n\nAlors, tu viens gouter ?",
  "hashtags": ["ChezMarco", "RisottoAsperges", "CuisineItalienne", "FaitMaison", "ProduitsFrais", "RestaurantLyon", "GastronomieItalienne", "AspergesVertes", "SaisonPrintaniere", "LyonFood", "RisottoLover"],
  "cta": "Dis-nous en commentaire : risotto ou pates ?"
}
```

### storytelling_court — Post

```json
{
  "caption": "Il etait 5h42 quand Marco a pose le pied sur les paves de la Croix-Rousse.\n\nLe marche venait d'ouvrir. L'odeur des herbes fraiches melangee a celle du cafe des commercants.\n\nIl s'est arrete devant Lucien, son maraicher depuis 8 ans. \"Les asperges sont magnifiques cette semaine\", lui a glisse Lucien.\n\nMarco les a prises. Toutes.\n\nCe soir, elles seront dans votre assiette, sublimees dans un risotto qui raconte cette histoire.\n\nChaque plat chez Marco commence comme ca : un matin, un marche, une rencontre.",
  "hashtags": ["ChezMarco", "DuMarcheALAssiette", "CuisineAuthentique", "MarcheCroixRousse", "ProduitsFrais", "CircuitCourt", "RestaurantLyon", "SavoirFaire", "HistoireDeGout", "CuisineItalienne", "FaitMaison"],
  "cta": "Reservez votre table ce soir"
}
```

### exclamatif — Story

```json
{
  "caption": "Le risotto du jour est pret et il est INCROYABLE !",
  "hashtags": ["ChezMarco", "RisottoDuJour", "FaitMaison"],
  "cta": "Reservez vite !"
}
```

### teaser — Story

```json
{
  "caption": "Quelque chose de nouveau arrive sur la carte demain...",
  "hashtags": ["ChezMarco", "Nouveaute", "StayTuned"],
  "cta": "Devinez en DM"
}
```

### conseil — Post

```json
{
  "caption": "Le secret d'un vrai risotto ? La patience.\n\nVoici les 3 regles d'or de Marco :\n\n1. Le bouillon doit etre chaud — jamais froid sur le riz. Le choc thermique casse la cuisson.\n\n2. Remuer sans s'arreter — c'est le geste qui libere l'amidon et cree cette texture cremieuse unique.\n\n3. Le \"mantecatura\" final — beurre + parmesan hors du feu. C'est la qu'un bon risotto devient exceptionnel.\n\nChez Marco, chaque risotto prend exactement 18 minutes. Pas une de plus, pas une de moins.\n\nC'est du fait maison, du vrai. Et ca se goute.",
  "hashtags": ["ChezMarco", "ConseilChef", "Risotto101", "TechniquesCuisine", "FaitMaison", "CuisineItalienne", "SavoirFaire", "Mantecatura", "RestaurantLyon", "GastronomieItalienne", "AstucesCuisine"],
  "cta": "Enregistre ce post pour ton prochain risotto maison"
}
```

---

## 10. Gestion des Erreurs

### Retry caption

Si la validation echoue (formule bannie, longueur incorrecte, JSON invalide), le workflow relance l'appel avec un prompt correctif :

```javascript
// Code node — Retry prompt
const previousCaption = $json.caption || '';
const validationError = $json.validationError || '';

const retryInstruction = `

# CORRECTION REQUISE

La caption precedente a ete rejetee pour la raison suivante :
${validationError}

Caption rejetee :
"${previousCaption.substring(0, 200)}"

Reecris une nouvelle caption qui corrige ce probleme.
Conserve le meme theme, angle et style.
Reponds en JSON : { "caption", "hashtags", "cta" }`;

// Ajouter au user prompt existant
return [{
  json: {
    ...($input.first().json),
    userPrompt: $input.first().json.userPrompt + retryInstruction,
    isRetry: true
  }
}];
```

### Nombre max de retries : 1

Si le retry echoue aussi, le contenu est cree avec `status: 'generation_failed'` et un log d'erreur.

---

*Reecrit le 2026-03-06 — Enrichissement brand platform (ancrage strategique, exemples, section messages, product categories)*
