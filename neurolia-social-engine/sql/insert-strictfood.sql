-- ============================================================
-- INSERT STRICTFOOD — Donnees completes pour Social Engine
-- Executer dans Supabase SQL Editor
-- ============================================================

-- 1. CLIENT
-- ---------------------------------------------------------
INSERT INTO clients (
  id, name, slug, industry, website_url, instagram_handle,
  facebook_page_url, meta_page_id, meta_ig_user_id, meta_access_token,
  drive_folder_id, is_active
) VALUES (
  gen_random_uuid(),
  'StrictFood',
  'strictfood',
  'Restauration rapide saine (Fast-Good)',
  NULL, -- website_url : a remplir apres deploiement site
  NULL, -- instagram_handle : a remplir (@strictfood ou similaire)
  NULL, -- facebook_page_url : a remplir
  NULL, -- meta_page_id : a remplir (Facebook Page ID)
  NULL, -- meta_ig_user_id : a remplir (IG Business Account ID)
  NULL, -- meta_access_token : a remplir (long-lived token)
  NULL, -- drive_folder_id : a remplir (Google Drive folder)
  true
)
ON CONFLICT (slug) DO UPDATE SET
  industry = EXCLUDED.industry,
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- 2. BRAND PLATFORM
-- ---------------------------------------------------------
INSERT INTO brand_platforms (
  client_id,
  -- Identite
  mission, vision, brand_values, personality, archetype,
  -- Positionnement
  key_insight, purpose, brand_promise, brand_essence,
  tagline, baseline, slogan,
  usps, proof_points, key_figures, discriminator,
  -- Voix
  tone_of_voice, vocabulary_do, vocabulary_dont, writing_rules,
  formality_level, tu_vous,
  -- Visuel
  primary_color, secondary_colors, font_primary, font_secondary,
  visual_style, photo_style,
  -- Social
  hashtags_branded, hashtags_niche, emoji_usage, cta_preferred,
  -- Contexte
  target_audience, competitors, differentiators,
  -- Objectifs
  objectives_primary, objectives_secondary, kpis,
  -- Etendu
  brand_extended
) VALUES (
  (SELECT id FROM clients WHERE slug = 'strictfood'),

  -- === IDENTITE (00-platform.md + about.md) ===

  -- mission
  'Proposer chaque jour des burgers et repas gourmands assembles a partir d''ingredients d''artisans locaux de Perpignan, cuits par chaleur pulsee (zero huile), servis vite — pour que bien manger ne soit plus jamais un sacrifice.',

  -- vision
  'Devenir la reference fast-good du sud de la France avec 4 a 5 points de vente en 5 ans, chacun ancre dans le reseau d''artisans de son territoire.',

  -- brand_values (JSONB enrichi)
  '[
    {
      "name": "Transparence Totale",
      "definition": "Tout est visible — la cuisine est ouverte, les fournisseurs sont nommes, les methodes de cuisson sont expliquees.",
      "implique": "Nommer chaque artisan partenaire. Montrer la preparation en direct. Ne rien cacher sur les ingredients.",
      "exclut": "Les mentions vagues (ingredients de qualite), les cuisines fermees, les fournisseurs anonymes."
    },
    {
      "name": "Plaisir Deculpabilise",
      "definition": "Le plaisir gustatif n''est pas l''ennemi de la sante. On ne fait pas de compromis sur le gout pour etre sain, et on ne sacrifie pas la qualite pour etre fast.",
      "implique": "Des recettes qui donnent envie (food porn 7/10), des produits qui tiennent leurs promesses nutritionnelles, un discours positif (jamais moralisant).",
      "exclut": "Le discours regime, le guilt-tripping, le ton elitiste fitness bro, les produits fades etiquetes healthy."
    },
    {
      "name": "Ancrage Local",
      "definition": "Chaque ingredient principal vient d''un artisan reconnu du territoire. Le circuit court n''est pas un argument marketing, c''est le modele operationnel.",
      "implique": "Citer les partenaires par leur nom. S''approvisionner localement meme si c''est plus cher. Valoriser le territoire de Perpignan.",
      "exclut": "Les ingredients industriels, les fournisseurs nationaux generiques, le greenwashing."
    },
    {
      "name": "Convivialite Brute",
      "definition": "L''experience StrictFood est directe, chaleureuse, sans chichi. On tutoie, on explique, on accueille tout le monde pareil.",
      "implique": "Tutoiement systematique. Vocabulaire simple. Ambiance decontractee. Explication des produits sans jargon.",
      "exclut": "Le ton distant/corporate, le jargon nutritionnel non explique, l''elitisme."
    }
  ]'::jsonb,

  -- personality
  'Direct, complice, provocateur (a dose), chaleureux. Le pote qui cuisine mieux que toi et qui t''invite.',

  -- archetype (JSONB enrichi)
  '{
    "principal": "Magician",
    "secondaire": "Hero",
    "manifestation": {
      "ton": "Assertif mais accessible. On te montre que c''est possible plutot que tu devrais manger mieux. Le Magician revele, il ne sermonne pas.",
      "comportement": "Demonstration (cuisine ouverte), preuve (artisans nommes), transformation visible (avant/apres de la perception du fast-food).",
      "visuel": "Contraste fort (noir/lumiere dramatique), mise en scene des produits comme des objets precieux, eclairage qui sublime les textures des ingredients. Mineral, anguleux, eclairage dramatique, noir mat, textures brutes (bois, metal)."
    }
  }'::jsonb,

  -- === POSITIONNEMENT (00-platform.md + positioning.md) ===

  -- key_insight
  'Manger vite et se faire plaisir avec un burger, c''est forcement detruire sa diete — vs — Et si le fast-food le plus gourmand de ta ville etait aussi celui qui respecte ton corps ?',

  -- purpose
  'Prouver qu''on peut manger vite, copieusement et avec plaisir sans sacrifier ni la qualite des ingredients ni sa sante — en s''appuyant sur le savoir-faire d''artisans locaux qui partagent cette exigence.',

  -- brand_promise
  'A chaque visite, tu repars avec le plaisir d''un vrai burger — la culpabilite en moins. Des ingredients d''artisans locaux, zero huile, zero compromis sur le gout.',

  -- brand_essence
  'Transformation — le fast-food transforme en acte de soin',

  -- tagline
  'Le cheat meal qui n''en est pas un.',

  -- baseline
  'Des burgers d''artisans locaux, cuits a chaleur pulsee — zero huile. Le gout en plus, la culpabilite en moins.',

  -- slogan
  'Strict sur la qualite. Genereux sur le plaisir.',

  -- usps (JSONB)
  '[
    {
      "title": "100% Artisans Locaux",
      "description": "Viande de la Boucherie Labourde, pain des Pains du Soleil, fromage Myfitcheese — chaque ingredient a un nom et un visage a Perpignan."
    },
    {
      "title": "Zero Huile, Zero Compromis",
      "description": "Toutes les cuissons a chaleur pulsee, materiel professionnel. Le croustillant sans le gras, le plaisir sans la culpabilite."
    },
    {
      "title": "Cuisine Ouverte",
      "description": "Tu vois tout, de la decoupe a l''assemblage. Rien a cacher quand on n''a rien a cacher."
    }
  ]'::jsonb,

  -- proof_points
  ARRAY[
    'Sourcing 100% artisans locaux nommes : Boucherie Labourde (viande), Pains du Soleil (pain artisanal), Myfitcheese (fromage hyperproteine)',
    'Cuisson a chaleur pulsee (zero huile) — materiel professionnel, aucune cuisson a l''huile en cuisine',
    'Cuisine ouverte — le client voit tout, de la preparation a l''assemblage',
    'CA de 500EUR/jour atteint durant les 3 premiers mois (oct-dec 2025)',
    '74 avis Google en 4 mois d''activite'
  ],

  -- key_figures
  ARRAY[
    '74 avis Google en 4 mois',
    '3 artisans partenaires locaux',
    '0% huile de cuisson — 100% chaleur pulsee',
    'Perpignan — ancrage local exclusif'
  ],

  -- discriminator
  'Le seul fast-food de Perpignan qui allie format burger gourmand + sourcing 100% artisans locaux + zero cuisson a l''huile.',

  -- === VOIX (tone.md) ===

  -- tone_of_voice
  'Familier-accessible (2/5). On parle comme on parlerait a un pote au comptoir. Pas de jargon, pas de phrases alambiquees. Mais precis et credible quand on parle des produits et des artisans.',

  -- vocabulary_do
  ARRAY['artisan', 'artisanal', 'fait maison', 'frais', 'sans huile', 'zero huile', 'chaleur pulsee', 'local', 'du coin', 'saveurs', 'plaisir', 'gourmand', 'vrai', 'simple', 'malin'],

  -- vocabulary_dont
  ARRAY['healthy', 'diet', 'dietetique', 'premium', 'bio', 'fitness', 'macro', 'macros', 'cheat meal', 'sans culpabilite', 'revolution', 'revolutionner', 'unique'],

  -- writing_rules
  'Tutoiement systematique. Phrases courtes et directes. Nommer les artisans par leur nom. Montrer plutot que dire. Jamais moralisant. Emojis : 1-2 max par post, 2-3 par story. Hashtags : mix branded + niche, pas de hashtags generiques (#food #instafood).',

  -- formality_level
  2,

  -- tu_vous
  'tutoiement',

  -- === VISUEL (colors.md + typography.md) ===

  -- primary_color
  '#BF8522',

  -- secondary_colors
  ARRAY['#7C3530', '#5C7858'],

  -- font_primary
  'Space Grotesk',

  -- font_secondary
  'DM Sans',

  -- visual_style
  'Dark Food Premium. Contraste fort noir/lumiere dramatique. Mise en scene des produits comme des objets precieux. Eclairage qui sublime les textures. Mineral, anguleux, noir mat, textures brutes (bois, metal). Food porn 7/10.',

  -- photo_style
  'Fond sombre, eclairage directionnel dramatique, focus ingredients et textures, vapeur/fume quand pertinent. Format 1080x1080 pour posts, 1080x1920 pour stories.',

  -- === SOCIAL ===

  -- hashtags_branded
  ARRAY['#StrictFood', '#StrictFoodPerpignan', '#LeCheatMealQuiNenEstPasUn'],

  -- hashtags_niche
  ARRAY['#BurgerArtisanal', '#FastGood', '#ZeroHuile', '#ChaleurPulsee', '#ArtisansLocaux', '#Perpignan', '#BurgerPerpignan', '#MangeMieux', '#PlaisirSain'],

  -- emoji_usage
  'moderate',

  -- cta_preferred
  ARRAY['Appelle pour commander', 'Passe nous voir', 'Decouvre la carte', 'Tu goutes quand ?', 'On t''attend'],

  -- === CONTEXTE ===

  -- target_audience
  'Actifs presses (cadres/employes, 28-45 ans, pause dejeuner 30-40min), sportifs (22-35 ans, post-entrainement, tracent leurs macros), locavores (45-55 ans, sensibles au bouche-a-oreille et artisans locaux). Zone : Perpignan et peripherie.',

  -- competitors
  ARRAY['Fast-foods classiques (McDonald''s, Burger King, kebabs)', 'Salad bars / poke bowls (meilleure image sante mais pas format burger)'],

  -- differentiators
  ARRAY['Sourcing 100% artisans locaux nommes', 'Zero cuisson a l''huile (chaleur pulsee)', 'Cuisine ouverte', 'Macros maitrisees sans sacrifier le gout', 'Format burger gourmand + sain — pas de compromis'],

  -- === OBJECTIFS ===

  -- objectives_primary
  'Augmenter le CA de 200-300EUR/jour a 500EUR/jour de maniere constante.',

  -- objectives_secondary
  ARRAY['Atteindre 200 avis Google', 'Construire une communaute Instagram engagee', 'Positionner StrictFood comme la reference fast-good de Perpignan', 'Preparer le terrain pour un 2e point de vente'],

  -- kpis
  ARRAY['CA quotidien', 'Nombre avis Google', 'Engagement rate Instagram', 'Reach posts', 'Commandes telephone'],

  -- === BRAND EXTENDED (JSONB complet) ===

  '{
    "brand_key_unilever": {
      "root_strengths": "Savoir-faire culinaire de Romain, reseau d''artisans locaux de confiance, emplacement physique premium a Perpignan",
      "competitive_environment": "Fast-foods classiques (McDo, BK, kebabs) = peu de qualite, gras. Salad bars/pokebowls = meilleure image sante mais pas format burger comfort food",
      "target": "Actifs presses (midi), sportifs (midi/soir), locavores (bouche-a-oreille)",
      "insight": "Manger vite un burger = plaisir coupable — StrictFood resout cette equation",
      "benefits_fonctionnels": "Rapidite, macros respectes, zero huile (chaleur pulsee), ingredients tracables",
      "benefits_emotionnels": "Plaisir sans culpabilite, fierte de bien manger, sentiment d''appartenance locale",
      "values_personality": "Transparence, Plaisir deculpabilise, Ancrage local, Convivialite brute",
      "reason_to_believe": "Artisans nommes, chaleur pulsee pro, cuisine ouverte, 74 avis, CA valide",
      "discriminator": "Le seul fast-food de Perpignan qui allie format burger gourmand + sourcing 100% artisans locaux + zero cuisson a l''huile",
      "brand_essence": "Transformation — le fast-food transforme en acte de soin"
    },

    "kapferer": {
      "physique": "Burgers artisanaux, cuisine ouverte, cuisson a chaleur pulsee, packaging sobre noir/blanc",
      "personnalite": "Direct, chaleureux, confiant, un brin provocateur (le cheat meal qui n''en est pas un)",
      "culture": "Artisanat local, discipline sportive, transparence radicale",
      "relation": "Le pote qui cuisine mieux que toi et qui t''invite — proximite, tutoiement, explication sans condescendance",
      "reflet": "Quelqu''un qui fait attention a lui sans en faire une obsession — equilibre, pas extreme",
      "mentalisation": "Je me fais plaisir ET je suis coherent avec mes valeurs — zero dissonance cognitive"
    },

    "personas": [
      {
        "name": "Karim",
        "type": "principal",
        "profil": "Cadre/employe 28-35 ans, Perpignan, sport 2-3x/semaine",
        "probleme": "Trouver un dejeuner rapide gourmand, rassasiant et compatible avec son mode de vie actif",
        "objectif": "Dejeuner en moins de 30 minutes avec un repas qu''il ne regrettera pas",
        "freins": ["Fast-foods healthy souvent fades et chers", "Burger artisanal = forcement long", "Pas le temps de tester un truc inconnu"],
        "message_cle": "Un vrai burger, des vrais artisans, en 10 minutes. Et tu repars leger."
      },
      {
        "name": "Lea",
        "type": "secondaire",
        "profil": "Coach sportive / etudiante STAPS, 22-30 ans, 5-6 seances/semaine",
        "probleme": "Trouver des repas post-entrainement riches en proteines et gourmands sans cuisiner",
        "objectif": "Se faire plaisir avec un vrai repas sans compromettre ses objectifs physiques",
        "freins": ["Fast-foods trop gras pour ses macros", "Proteine = triste et sec", "Pas confiance aux restos sur les infos nutritionnelles"],
        "message_cle": "Fromage hyperproteine, viande de boucher, zero huile. Le burger que ton coach ne t''interdira pas."
      },
      {
        "name": "Michel",
        "type": "tertiaire",
        "profil": "Commercant/artisan 45-55 ans, ancre dans le quartier, sensible au bouche-a-oreille",
        "probleme": "Trouver un endroit ou manger au quotidien qui ne soit pas de la malbouffe industrielle",
        "objectif": "Manger chez des gens de confiance qui travaillent avec les memes artisans que lui",
        "freins": ["Fast-food = forcement industriel", "Pas sportif, pas la cible", "Nouveau = pas encore prouve"],
        "message_cle": "Boucherie Labourde, Pains du Soleil, Myfitcheese. Tu les connais deja — ici, on les cuisine pour toi."
      }
    ],

    "example_phrases": {
      "do": [
        "Un burger de la Boucherie Labourde, du pain des Pains du Soleil, du fromage Myfitcheese. Et toi, tu fais juste je prends.",
        "Zero huile chez nous. La chaleur pulsee fait le job — croustillant, sans le gras.",
        "Tu vois ta cuisine ? La notre est pareille. Sauf qu''elle est ouverte et que tout le monde peut mater.",
        "3 artisans du coin dans chaque burger. On dit ca, on prouve ca."
      ],
      "dont": [
        "Decouvrez notre offre premium de restauration healthy.",
        "Nos burgers revolutionnent le fast-food.",
        "Faites-vous plaisir sans culpabiliser grace a nos produits dietetiques.",
        "StrictFood, le choix fitness pour les sportifs exigeants."
      ]
    },

    "section_messages": {
      "hero": "Le cheat meal qui n''en est pas un.",
      "carte": "Des recettes qui donnent envie. Des ingredients qui donnent confiance.",
      "artisans": "Derriere chaque burger, des artisans que tu connais.",
      "experience": "Cuisine ouverte, chaleur pulsee, zero huile. Ici, tout se voit.",
      "avis": "74 avis. 0% huile. 100% artisanal.",
      "contact": "Passe nous voir ou appelle, on t''attend."
    },

    "product_categories": [
      {
        "name": "Burgers Artisanaux",
        "tagline": "Le burger qui respecte tes macros sans sacrifier tes papilles.",
        "description": "Viande de la Boucherie Labourde, pain artisanal des Pains du Soleil, fromage hyperproteine Myfitcheese. Assembles a la commande, cuits a chaleur pulsee (zero huile)."
      },
      {
        "name": "Wraps",
        "tagline": "La version nomade du burger, memes artisans.",
        "description": "Memes ingredients premium dans un format wrap pour ceux qui preferent la legerete."
      },
      {
        "name": "Snacks",
        "tagline": "Les a-cotes qui completent sans alourdir.",
        "description": "Frites classiques, patates douces, tenders STRICT — meme exigence de cuisson sans huile."
      },
      {
        "name": "Desserts",
        "tagline": "Le dessert qui prolonge le plaisir sans casser la diete.",
        "description": "Cookie proteine, overnight, tiramisu proteine, milkshake proteine — tous enrichis en proteines."
      },
      {
        "name": "Boissons",
        "tagline": "De quoi accompagner, sans deraper.",
        "description": "Boissons zero et energisantes."
      }
    ],

    "product_catalog": [
      {"name": "STRICT Boeuf", "category": "burger", "kcal": 596, "prot": 53, "gluc": 45, "lip": 21.5, "price": 12.99, "hero_ingredients": ["Boucherie Labourde", "Pains du Soleil", "Myfitcheese"]},
      {"name": "STRICT Poulet", "category": "burger", "kcal": 598, "prot": 60.5, "gluc": 45, "lip": 19.4, "price": 11.99, "hero_ingredients": ["Boucherie Labourde", "Pains du Soleil", "Myfitcheese"]},
      {"name": "STRICT Vege Falafel", "category": "burger", "kcal": 850, "prot": 35.5, "gluc": 91.5, "lip": 39.5, "price": 12.99, "hero_ingredients": ["Pains du Soleil"]},
      {"name": "STRICT MAX Boeuf", "category": "burger", "kcal": 942, "prot": 97, "gluc": 45, "lip": 39, "price": 14.99, "hero_ingredients": ["Boucherie Labourde", "Pains du Soleil", "Myfitcheese"]},
      {"name": "STRICT MAX Poulet", "category": "burger", "kcal": 946, "prot": 112, "gluc": 45, "lip": 34.8, "price": 15.99, "hero_ingredients": ["Boucherie Labourde", "Pains du Soleil", "Myfitcheese"]},
      {"name": "STRICT Wrap Boeuf", "category": "wrap", "kcal": 566, "prot": 51, "gluc": 39, "lip": 20.5, "price": 9.99, "hero_ingredients": ["Boucherie Labourde"]},
      {"name": "STRICT Wrap Poulet", "category": "wrap", "kcal": 598, "prot": 60.5, "gluc": 39, "lip": 20.4, "price": 8.99, "hero_ingredients": ["Boucherie Labourde"]},
      {"name": "Frites classiques", "category": "snack", "kcal": 199, "prot": 4, "gluc": 38, "lip": 4, "price": 2.99, "hero_ingredients": []},
      {"name": "Frites Patates Douces", "category": "snack", "kcal": 211, "prot": 3, "gluc": 40, "lip": 5, "price": 3.99, "hero_ingredients": []},
      {"name": "Tenders STRICT", "category": "snack", "kcal": 250, "prot": 25, "gluc": 18, "lip": 9, "price": 6.99, "hero_ingredients": []},
      {"name": "Cookie proteine", "category": "dessert", "kcal": 273, "prot": 26, "gluc": 27, "lip": 9, "price": 3.99, "hero_ingredients": []},
      {"name": "Overnight STRICT", "category": "dessert", "kcal": 470, "prot": 52.9, "gluc": 52.5, "lip": 9.4, "price": 4.99, "hero_ingredients": []},
      {"name": "Tiramisu proteine", "category": "dessert", "kcal": 252, "prot": 24, "gluc": 14, "lip": 8, "price": 3.50, "hero_ingredients": []},
      {"name": "Milkshake proteine", "category": "dessert", "kcal": 215, "prot": 29, "gluc": 12, "lip": 6, "price": 3.00, "hero_ingredients": []},
      {"name": "Boisson Zero", "category": "boisson", "kcal": 0, "prot": 0, "gluc": 0, "lip": 0, "price": 2.00, "hero_ingredients": []},
      {"name": "Boisson energisante", "category": "boisson", "kcal": 0, "prot": 0, "gluc": 0, "lip": 0, "price": 2.99, "hero_ingredients": []}
    ],

    "color_system": {
      "primaire": {"nom": "Cuivre Braise", "hex": "#BF8522", "oklch": "oklch(0.67 0.15 68)", "usage": "CTAs, liens actifs, elements emphase, highlights food"},
      "secondaire": {"nom": "Grenat Fume", "hex": "#7C3530", "oklch": "oklch(0.42 0.10 22)", "usage": "Separateurs decoratifs, hover states, accents craft/artisanal, cards artisans"},
      "tertiaire": {"nom": "Feuille Grillee", "hex": "#5C7858", "oklch": "oklch(0.52 0.06 145)", "usage": "Badges nutritionnels uniquement"},
      "background": {"nom": "Charbon", "hex": "#141210", "oklch": "oklch(0.14 0.008 60)"},
      "surface": {"nom": "Fumee", "hex": "#2A2622", "oklch": "oklch(0.22 0.01 60)"},
      "texte_principal": {"nom": "Creme", "hex": "#F5F0E8", "oklch": "oklch(0.96 0.012 85)"},
      "texte_secondaire": {"nom": "Sable", "hex": "#B5AA98", "oklch": "oklch(0.73 0.025 75)"}
    },

    "differentiation_long": "StrictFood est le seul fast-food de Perpignan a proposer des burgers gourmands assembles exclusivement a partir d''ingredients d''artisans locaux reconnus, sans aucune cuisson a l''huile en cuisine. La ou les fast-foods classiques servent des produits industriels a des prix equivalents, StrictFood offre la qualite d''un artisan-boucher, la fraicheur d''un boulanger de quartier et la rigueur nutritionnelle d''un coach — le tout avec la rapidite et le plaisir d''un vrai fast-food.",

    "operations": {
      "address": "88 Chemin de la Roseraie, Perpignan (Chateau Roussillon)",
      "zone": "Perpignan et peripherie",
      "phone": "+33 6 11 74 59 44",
      "ordering": ["sur place", "a emporter", "telephone"],
      "hours": "A confirmer aupres du client",
      "partners": [
        {"name": "Boucherie Labourde", "role": "viande artisanale", "local": true, "note": "Baptiste, ami du fondateur, influent sur les reseaux"},
        {"name": "Les Pains du Soleil", "role": "pain artisanal", "local": true, "note": "Une des meilleures boulangeries de Perpignan"},
        {"name": "Myfitcheese", "role": "fromage hyperproteine", "local": false, "note": "Fromage hyperproteine pour remplacer le fromage classique"}
      ]
    },

    "photo_inventory": {
      "total": 61,
      "source": "contenu-instagram (export oct 2025)",
      "includes_video": true,
      "note": "A categoriser manuellement — estimation : majorite produit/ambiance, quelques coulisses"
    }
  }'::jsonb
)
ON CONFLICT (client_id) DO UPDATE SET
  mission = EXCLUDED.mission,
  vision = EXCLUDED.vision,
  brand_values = EXCLUDED.brand_values,
  personality = EXCLUDED.personality,
  archetype = EXCLUDED.archetype,
  key_insight = EXCLUDED.key_insight,
  purpose = EXCLUDED.purpose,
  brand_promise = EXCLUDED.brand_promise,
  brand_essence = EXCLUDED.brand_essence,
  tagline = EXCLUDED.tagline,
  baseline = EXCLUDED.baseline,
  slogan = EXCLUDED.slogan,
  usps = EXCLUDED.usps,
  proof_points = EXCLUDED.proof_points,
  key_figures = EXCLUDED.key_figures,
  discriminator = EXCLUDED.discriminator,
  tone_of_voice = EXCLUDED.tone_of_voice,
  vocabulary_do = EXCLUDED.vocabulary_do,
  vocabulary_dont = EXCLUDED.vocabulary_dont,
  writing_rules = EXCLUDED.writing_rules,
  formality_level = EXCLUDED.formality_level,
  tu_vous = EXCLUDED.tu_vous,
  primary_color = EXCLUDED.primary_color,
  secondary_colors = EXCLUDED.secondary_colors,
  font_primary = EXCLUDED.font_primary,
  font_secondary = EXCLUDED.font_secondary,
  visual_style = EXCLUDED.visual_style,
  photo_style = EXCLUDED.photo_style,
  hashtags_branded = EXCLUDED.hashtags_branded,
  hashtags_niche = EXCLUDED.hashtags_niche,
  emoji_usage = EXCLUDED.emoji_usage,
  cta_preferred = EXCLUDED.cta_preferred,
  target_audience = EXCLUDED.target_audience,
  competitors = EXCLUDED.competitors,
  differentiators = EXCLUDED.differentiators,
  objectives_primary = EXCLUDED.objectives_primary,
  objectives_secondary = EXCLUDED.objectives_secondary,
  kpis = EXCLUDED.kpis,
  brand_extended = EXCLUDED.brand_extended,
  updated_at = now();

-- ============================================================
-- VERIFICATION
-- ============================================================
-- Apres execution, verifier :
-- SELECT name, slug FROM clients WHERE slug = 'strictfood';
-- SELECT client_id, tagline, tu_vous, formality_level, brand_essence,
--        jsonb_array_length(usps) as nb_usps,
--        array_length(proof_points, 1) as nb_proofs,
--        jsonb_array_length(brand_extended->'personas') as nb_personas,
--        jsonb_array_length(brand_extended->'product_catalog') as nb_products
-- FROM brand_platforms WHERE client_id = (SELECT id FROM clients WHERE slug = 'strictfood');

-- ============================================================
-- CHAMPS A REMPLIR MANUELLEMENT (quand disponibles)
-- ============================================================
-- UPDATE clients SET
--   instagram_handle = '@strictfood',
--   facebook_page_url = 'https://facebook.com/...',
--   meta_page_id = '...',
--   meta_ig_user_id = '...',
--   meta_access_token = '...',
--   drive_folder_id = '...',
--   website_url = 'https://...'
-- WHERE slug = 'strictfood';
--
-- UPDATE brand_platforms SET
--   brand_extended = jsonb_set(brand_extended, '{operations,hours}', '"lun-sam: 11:30-14:00 / 18:30-21:00, dim: ferme"')
-- WHERE client_id = (SELECT id FROM clients WHERE slug = 'strictfood');
