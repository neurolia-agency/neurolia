# FOG Maquettage - Skill

Crée des maquettes HTML à partir des extractions Webflow pour le projet FOG.

---

<objective>
Créer des maquettes HTML standalone à partir de pages Webflow extraites, en appliquant les design tokens FOG et en produisant un code HTML sémantique prêt pour conversion React.
</objective>

<triggers>
- `/fog-maquette --page [slug]` - Maquetter une page spécifique
- `/fog-maquette --all` - Maquetter toutes les pages non traitées
</triggers>

<workflow>
## Phase 1: Vérification des Inputs

Vérifier que les fichiers requis existent dans `design/_maquettes-html/_reference/` :

```
_reference/
├── exports/{{PAGE_SLUG}}.html              ← HTML source (OBLIGATOIRE)
└── screenshots/
    └── desktop/{{PAGE_SLUG}}/full-page.png ← Screenshot (OBLIGATOIRE)
```

Si les inputs manquent, informer l'utilisateur qu'il doit :
1. Copier le HTML source depuis https://futureofgrow.com/{{PAGE_SLUG}}
2. Faire un screenshot full-page desktop

## Phase 2: Lecture et Analyse

1. **Lire le HTML source** - Comprendre la structure de la page
2. **Visualiser le screenshot** - Référence visuelle pour le rendu attendu
3. **Vérifier les composants existants** - Navbar, footer dans `system-components/`

## Phase 3: Création de la Maquette

1. Créer la structure HTML sémantique (header, main, section, footer)
2. Appliquer les styles avec tokens FOG (pas de couleurs hardcodées)
3. Implémenter le responsive (mobile-first)
4. Créer le README.md de documentation

## Phase 4: Output

Créer les fichiers dans `design/_maquettes-html/pages/{{PAGE_SLUG}}/` :

```
pages/{{PAGE_SLUG}}/
├── README.md                  ← Documentation + checklist
└── iterations/
    └── page-v1.html           ← Maquette HTML standalone
```
</workflow>

<inputs>
| Input | Emplacement | Obligatoire |
|-------|-------------|-------------|
| HTML source | `_reference/exports/[slug].html` | Oui |
| Screenshot desktop | `_reference/screenshots/desktop/[slug]/full-page.png` | Oui |
| Screenshot mobile | `_reference/screenshots/mobile/[slug]/full-page.png` | Non |
</inputs>

<outputs>
| Output | Destination | Format |
|--------|-------------|--------|
| Maquette HTML | `pages/[slug]/iterations/page-v1.html` | HTML standalone |
| Documentation | `pages/[slug]/README.md` | Markdown |
</outputs>

<design_tokens>
Tokens FOG à utiliser dans toutes les maquettes :

```css
:root {
  /* Couleurs */
  --accent: #00d52b;
  --accent-dark: #00a822;
  --bg: #000000;
  --surface: #111111;
  --text: #ffffff;
  --text-muted: #888888;
  --border: #333333;

  /* Fonts */
  --font-display: 'Oswald', sans-serif;
  --font-body: 'Montserrat', sans-serif;
}
```
</design_tokens>

<constraints>
- Ne jamais utiliser de couleurs hardcodées (toujours var(--token))
- Ne pas ajouter de JavaScript (sauf animation critique documentée)
- Garder les contenus texte/image originaux
- Toujours créer un README.md avec checklist
- HTML sémantique obligatoire
</constraints>

<checklist>
Chaque maquette doit respecter :

- [ ] Tokens FOG utilisés (pas de couleurs hardcodées)
- [ ] HTML sémantique (header, main, section, footer)
- [ ] Polices Oswald/Montserrat via Google Fonts CDN
- [ ] Responsive (390px, 768px, 1024px, 1440px)
- [ ] Comparaison visuelle OK avec screenshot référence
- [ ] README.md créé
</checklist>

<example>
Utilisateur: `/fog-maquette --page black-series`

Agent:
1. Vérifie que `_reference/exports/black-series.html` existe
2. Lit le HTML source et visualise le screenshot
3. Crée `pages/black-series/iterations/page-v1.html`
4. Crée `pages/black-series/README.md`
5. Affiche la checklist de validation
</example>

<related_skills>
- `/frontend-design` - Convertir en React/Next.js (après validation)
- `/load-fog-context` - Charger le contexte projet FOG
</related_skills>
