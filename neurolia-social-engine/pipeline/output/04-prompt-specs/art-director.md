# Agent Directeur Artistique — Spec Prompt

Specification complete de l'agent IA qui sublime les images (posts en mode creatif, stories en mode leger + texte).

---

## 1. Deux Modes de Sublimation

| Mode | Usage | Node n8n | Dimensions | Style |
|------|-------|----------|-----------|-------|
| `creative` | Posts feed | OpenAI node (image/edit, gpt-image-1, quality: high) | 1080x1080 (carre) ou 1080x1350 (portrait) | Transformation complete : fond, compositing, lumiere, atmosphere |
| `light` | Stories | OpenAI node (image/edit, gpt-image-1, quality: medium) | 1080x1920 (9:16) | Retouche legere + texte incruste |

---

## 2. System Prompt — Mode Creative (Posts)

```
Tu es un directeur artistique specialise dans le contenu Instagram.
Tu sublimes des photos brutes en images de qualite professionnelle pour des posts feed.

REGLES DE SUBLIMATION :
- Tu respectes IMPERATIVEMENT la charte graphique fournie (couleurs, style, ambiance).
- L'image sublimee doit etre coherente avec la direction visuelle du slot editorial.
- Le sujet principal de la photo originale doit rester identifiable et central.
- Ameliore la lumiere, les couleurs, le contraste et l'atmosphere.
- Si la direction indique un changement de fond, remplace le fond en gardant le sujet net.
- Integre subtilement les codes visuels de la marque (palette de couleurs, ambiance).
- L'image doit etre "scroll-stopping" : attirer l'attention dans un feed charge.

INTERDICTIONS :
- Ne jamais ajouter de texte sur les posts feed (le texte est dans la caption).
- Ne jamais deformer le sujet principal.
- Ne jamais utiliser de filtres generiques type Instagram.
- Ne jamais creer une image qui semble artificielle ou "trop IA".
- Ne pas ajouter de logo sauf si explicitement demande dans la direction visuelle.

STYLE :
- Preferer des compositions equilibrees (regle des tiers).
- Utiliser la profondeur de champ pour guider le regard.
- Les couleurs doivent etre fideles a la palette de la marque.
```

---

## 3. System Prompt — Mode Light + Texte (Stories)

```
Tu es un directeur artistique specialise dans les stories Instagram.
Tu retouches legerement des photos et tu incrustes du texte dessus pour creer des stories engageantes.

REGLES DE SUBLIMATION :
- Retouche legere uniquement : luminosite, contraste, saturation, temperature.
- Le sujet principal doit rester parfaitement lisible.
- Le style doit etre coherent avec la charte graphique de la marque.

REGLES D'INCRUSTATION TEXTE :
- Le texte fourni doit etre lisible a 100% sur l'image.
- Utiliser la police de marque si fournie, sinon une sans-serif moderne et lisible.
- Le texte doit etre place dans une zone qui ne masque pas le sujet principal.
- Taille du texte : assez grand pour etre lu sur mobile sans zoomer.
- Ajouter un fond semi-transparent, une ombre portee ou un contour si necessaire pour la lisibilite.
- Couleur du texte : contraste fort avec le fond (utiliser les couleurs de la marque).
- Position privilegiee : centre-bas ou centre (zone "safe" des stories).

INTERDICTIONS :
- Ne pas deformer la photo.
- Ne pas ajouter de texte non fourni.
- Ne pas utiliser de polices fantaisistes illisibles.
- Ne pas placer de texte dans les zones masquees par l'UI Instagram (haut 14%, bas 10%).

FORMAT STORY :
- Dimensions : 1080 x 1920 pixels (ratio 9:16).
- Le texte ne doit pas depasser les marges de securite (50px de chaque cote).
```

---

## 4. User Prompt Templates

### 4a. Prompt Sublimation Post (mode creative)

Assemble dans le Code node n8n (node 14 de WF02).

```
Sublime cette photo pour un post Instagram feed.

CHARTE GRAPHIQUE :
- Couleur principale : {primary_color}
- Couleurs secondaires : {secondary_colors}
- Style visuel : {visual_style}
- Style photo : {photo_style}

DIRECTION VISUELLE DU SLOT :
{visual_direction}

MODE : Sublimation creative — transformation complete autorisee (fond, lumiere, atmosphere, compositing).

SUJET : {theme}
ANGLE : {angle}
AMBIANCE : {tone}

{context_images_instruction}

Dimensions : 1080x1080 ou 1080x1350 (selon la composition originale).
```

Variable `context_images_instruction` :
- Si des images de contexte sont fournies : `IMAGES DE CONTEXTE : {N} images de reference jointes (fonds, ambiance, style). Inspire-toi de ces references pour l'ambiance et le style.`
- Sinon : *(vide)*

### 4b. Prompt Sublimation Story (mode light)

Assemble dans le Code node n8n (node 11 de WF03).

```
Retouche legerement cette photo et incruste le texte suivant pour une story Instagram.

CHARTE GRAPHIQUE :
- Couleur principale : {primary_color}
- Couleurs secondaires : {secondary_colors}
- Police principale : {font_primary}
- Police secondaire : {font_secondary}

DIRECTION VISUELLE :
{visual_direction}

TEXTE A INCRUSTER :
"{story_text}"

REGLES TEXTE :
- Police : {font_primary} (ou sans-serif moderne si non disponible)
- Couleur : contraste fort avec le fond (preferer {primary_color} ou blanc)
- Position : centre-bas (zone safe stories)
- Fond semi-transparent si necessaire pour la lisibilite
- Taille : lisible sur mobile sans zoom

MODE : Retouche legere uniquement (luminosite, contraste, couleurs).
Dimensions : 1080x1920 (ratio 9:16).
```

---

## 5. Integration n8n — Sublimation

### 5a. OpenAI node — Sublimation Posts (mode creative)

```
OpenAI (@n8n/n8n-nodes-langchain.openAi@2.1)
  resource: image
  operation: edit
  model: gpt-image-1
  binaryPropertyName: data           # image binaire depuis Download/Upload node
  prompt: ={{ $json.prompt }}         # prompt assemble par Code node precedent
  options:
    quality: high
    n: 1
```

Le node recoit l'image en binaire via le flux principal. Le prompt est une expression qui reference la sortie du Code node "Build Sublimation Prompt".

Sortie : image sublimee en binaire (propriete `data`), prete a uploader vers Supabase Storage.

### 5b. OpenAI node — Sublimation Stories (mode light + texte)

```
OpenAI (@n8n/n8n-nodes-langchain.openAi@2.1)
  resource: image
  operation: edit
  model: gpt-image-1
  binaryPropertyName: data
  prompt: ={{ $json.prompt }}         # inclut le texte a incruster
  options:
    quality: medium                   # medium pour stories (plus rapide, moins cher)
    n: 1
```

Meme pattern que les posts. Le prompt inclut les instructions d'incrustation de texte (story_text, police, position, couleur).

### 5c. Fallback Gemini — Imagen 3 (si gpt-image-1 echoue)

Le fallback reste en HTTP Request car Gemini n'a pas de node natif n8n.

```
HTTP Request (n8n-nodes-base.httpRequest@4.2)
  method: POST
  url: https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateImages
  headers:
    x-goog-api-key: {gemini_api_key}
  body (JSON):
    {
      "prompt": "={{$json.fallbackPrompt}}",
      "config": {
        "numberOfImages": 1,
        "aspectRatio": "={{$json.aspectRatio}}"
      }
    }
```

> Note : Gemini Imagen ne supporte pas l'image editing (pas de photo source). Le prompt doit decrire l'image complete a generer. Utilise uniquement comme fallback.

### TypeVersions

| Node | workflowNodeType | Version |
|------|------------------|---------|
| OpenAI (image) | `@n8n/n8n-nodes-langchain.openAi` | 2.1 |
| HTTP Request (fallback) | `n8n-nodes-base.httpRequest` | 4.2 |

---

## 6. Regles de Sublimation par Categorie

Le Code node adapte le prompt en fonction de la categorie du slot editorial :

| Categorie | Direction creative (posts) | Direction light (stories) |
|-----------|--------------------------|--------------------------|
| `produit` | Focus produit, fond epure ou contextuel, lumiere studio | Retouche couleurs, accentuer le produit |
| `coulisses` | Style reportage, grain leger, authentique | Leger filtre documentaire, texte spontane |
| `equipe` | Portrait pro, fond flou, lumiere flatteuse | Retouche portrait legere, texte nom/role |
| `engagement` | Coloree, dynamique, interactive | Contraste fort, texte question grande taille |
| `saisonnier` | Ambiance saisonniere (couleurs, elements decoratifs) | Filtre saisonnier subtil, texte festif |
| `educatif` | Clean, structure, espace pour le regard | Fond unifie, texte lisible format "tip" |
| `temoignage` | Chaleureux, fond doux, guillemets visuels | Retouche portrait, texte citation |
| `ambiance` | Atmospherique, profondeur, mood | Leger filtre ambiance, texte minimal |

### Implementation Code node

```javascript
// Code node v2 — Build Sublimation Prompt (node 14 WF02 / node 11 WF03)
const slot = $('Fetch Slot Direction').first().json;
const brand = $('Fetch Brand Platform').first().json;
const upload = $('Download File').first().json; // contient binary

const isStory = slot.content_type === 'story';
const mode = isStory ? 'light' : 'creative';

// Contexte images (posts uniquement)
const contextAssets = $('Fetch Context Images').all();
let contextInstruction = '';
if (!isStory && contextAssets.length > 0) {
  contextInstruction = `IMAGES DE CONTEXTE : ${contextAssets.length} images de reference jointes (fonds, ambiance, style). Inspire-toi de ces references.`;
}

let prompt;
if (isStory) {
  prompt = `Retouche legerement cette photo et incruste le texte suivant pour une story Instagram.

CHARTE GRAPHIQUE :
- Couleur principale : ${brand.primary_color || '#000000'}
- Couleurs secondaires : ${(brand.secondary_colors || []).join(', ')}
- Police principale : ${brand.font_primary || 'sans-serif moderne'}
- Police secondaire : ${brand.font_secondary || ''}

DIRECTION VISUELLE :
${slot.visual_direction || 'Retouche legere, ambiance coherente avec la marque.'}

TEXTE A INCRUSTER :
"${slot.story_text || ''}"

REGLES TEXTE :
- Police : ${brand.font_primary || 'sans-serif moderne'}
- Couleur : contraste fort avec le fond (preferer ${brand.primary_color || 'blanc'} ou blanc)
- Position : centre-bas (zone safe stories)
- Fond semi-transparent si necessaire pour la lisibilite
- Taille : lisible sur mobile sans zoom

MODE : Retouche legere uniquement.
Dimensions : 1080x1920 (9:16).`;
} else {
  prompt = `Sublime cette photo pour un post Instagram feed.

CHARTE GRAPHIQUE :
- Couleur principale : ${brand.primary_color || '#000000'}
- Couleurs secondaires : ${(brand.secondary_colors || []).join(', ')}
- Style visuel : ${brand.visual_style || ''}
- Style photo : ${brand.photo_style || ''}

DIRECTION VISUELLE DU SLOT :
${slot.visual_direction || 'Sublimation creative, ambiance premium coherente avec la marque.'}

MODE : Sublimation creative — transformation complete autorisee.

SUJET : ${slot.theme || ''}
ANGLE : ${slot.angle || ''}
AMBIANCE : ${slot.tone || brand.tone_of_voice || ''}

${contextInstruction}

Dimensions : 1080x1080 ou 1080x1350.`;
}

return [{
  json: {
    prompt,
    mode,
    model: 'gpt-image-1'
  }
}];
```

---

## 7. Contraintes Techniques

| Contrainte | Valeur | Notes |
|------------|--------|-------|
| Format image input | JPEG, PNG, WebP | Supporte par GPT-4o Image |
| Taille max input | 20 MB | Limite API OpenAI |
| Format image output | PNG | GPT-4o Image retourne du PNG |
| Tailles output GPT-4o | 1024x1024, 1024x1792, 1792x1024 | Tailles fixes |
| Post final | 1080x1080 ou 1080x1350 | Redimensionne apres generation |
| Story finale | 1080x1920 | Redimensionne apres generation |
| Poids max Instagram | 8 MB (photo) | Compresser si necessaire |
| Zone safe stories (haut) | 14% (269px) | UI Instagram (nom + close) |
| Zone safe stories (bas) | 10% (192px) | UI Instagram (reply bar) |
| Marges texte laterales | 50px de chaque cote | Securite mobile |

### Redimensionnement post-generation

```javascript
// A integrer dans un Code node apres la sublimation
// Note : n8n ne peut pas resize en natif.
// Option 1 : Sharp via Code node (si disponible)
// Option 2 : Accepter les tailles GPT-4o (1024x1024 / 1024x1792) — Instagram redimensionne automatiquement
// Option 3 : Service externe (imgproxy, Cloudinary)

// Recommandation : Option 2 (les tailles GPT-4o sont suffisamment proches)
```

---

## 8. Fallback Gemini

Declenche quand la sublimation GPT-4o echoue (erreur API, content policy, timeout).

### Logique de fallback (Code node)

```javascript
// Code node v2 — apres le node OpenAI (image/edit)
// Le node OpenAI retourne l'image en binaire dans $binary.data
// Si le node echoue, le flux passe par la branche erreur (IF node)

const slot = $('Fetch Slot Direction').first().json;
const brand = $('Fetch Brand Platform').first().json;

// Construire un prompt descriptif (Imagen ne supporte pas l'editing)
const fallbackPrompt = `Photo professionnelle pour Instagram.
Style : ${brand.visual_style || 'moderne et professionnel'}.
Sujet : ${slot.theme || 'produit'}.
Direction : ${slot.visual_direction || ''}.
Couleurs dominantes : ${brand.primary_color || ''}, ${(brand.secondary_colors || []).join(', ')}.
Ambiance : ${slot.tone || brand.tone_of_voice || 'premium'}.
Format : ${slot.content_type === 'story' ? 'vertical 9:16' : 'carre 1:1'}.`;

return [{
  json: {
    fallbackPrompt,
    aspectRatio: slot.content_type === 'story' ? '9:16' : '1:1',
    model: 'imagen-3.0'
  }
}];
```

### Limites du fallback

- Imagen ne fait pas d'editing (pas de photo source) — generation pure
- Qualite potentiellement differente de GPT-4o
- Pas d'incrustation de texte native — necessite un post-traitement si story
- A utiliser uniquement pour les posts, pas recommande pour les stories avec texte

---

## 9. Exemples de Prompts par Categorie

### Produit — Post Creative

```
Sublime cette photo pour un post Instagram feed.

CHARTE GRAPHIQUE :
- Couleur principale : #8B4513
- Couleurs secondaires : #F5E6D0, #2C1810
- Style visuel : Chaleureux, artisanal, rustique elegant
- Style photo : Lumiere naturelle, tons chauds, textures visibles

DIRECTION VISUELLE DU SLOT :
Fond bois rustique, lumiere laterale douce, mise en valeur des ingredients frais avec vapeur subtile. Profondeur de champ faible.

MODE : Sublimation creative — transformation complete autorisee.

SUJET : Risotto aux asperges vertes
ANGLE : ingredient_saison
AMBIANCE : passione

Dimensions : 1080x1080 ou 1080x1350.
```

### Coulisses — Story Light + Texte

```
Retouche legerement cette photo et incruste le texte suivant pour une story Instagram.

CHARTE GRAPHIQUE :
- Couleur principale : #8B4513
- Couleurs secondaires : #F5E6D0, #2C1810
- Police principale : Playfair Display
- Police secondaire : Open Sans

DIRECTION VISUELLE :
Ambiance reportage matinal, lumiere naturelle, tons chauds.

TEXTE A INCRUSTER :
"Marco au marche ce matin !"

REGLES TEXTE :
- Police : Playfair Display
- Couleur : contraste fort avec le fond (preferer #F5E6D0 ou blanc)
- Position : centre-bas (zone safe stories)
- Fond semi-transparent si necessaire pour la lisibilite
- Taille : lisible sur mobile sans zoom

MODE : Retouche legere uniquement.
Dimensions : 1080x1920 (9:16).
```

### Engagement — Post Creative

```
Sublime cette photo pour un post Instagram feed.

CHARTE GRAPHIQUE :
- Couleur principale : #E63946
- Couleurs secondaires : #F1FAEE, #457B9D
- Style visuel : Dynamique, colore, accessible
- Style photo : Couleurs vives, cadrage serre, energie

DIRECTION VISUELLE DU SLOT :
Fond colore energique, dynamisme, couleurs pop. L'image doit donner envie de commenter.

MODE : Sublimation creative — transformation complete autorisee.

SUJET : Quel est votre plat prefere ?
ANGLE : sondage_communaute
AMBIANCE : fun

Dimensions : 1080x1080 ou 1080x1350.
```

---

## 10. Budget API

| Operation | API | Cout unitaire | Volume/mois/client | Cout/mois/client |
|-----------|-----|--------------|-------------------|-----------------|
| Sublimation post | GPT-4o Image edits | ~0.04$ | ~16 | ~0.64$ |
| Sublimation story | GPT-4o Image edits | ~0.04$ | ~180 | ~7.20$ |
| Fallback Gemini | Imagen 3.0 | ~0.04$ | ~5% = ~10 | ~0.40$ |
| **Total images** | | | **~196** | **~7.84-8.24$** |

> Note : Le budget initial de < 0.05$/image est respecte.

---

*Reecrit le 2026-03-05 — R3 Remediation nodes natifs*
