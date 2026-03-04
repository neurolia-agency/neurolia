# GOVERNANCE.md - Doctrine Workspace

## Classification des Priorités

| Niveau | Description | SLA |
|--------|-------------|-----|
| **P0** | Projets clients actifs avec pipeline en cours | Réponse immédiate |
| **P1** | Projets secondaires actifs | Réponse sous 24h |
| **P2** | Projets en attente / templates | Pas de SLA |

### Projets P0 (Prioritaires)
- `neurolia/` - Site agence, Phase B-4, KPI: signature devis
- `opendoor-v2/` - Site serrurier, Phase B-3, KPI: appel téléphone
- `fog-automations/` - Automations e-commerce, KPI: commandes traitées

### Projets P1 (Secondaires)
- `fog-design/` - Design system FOG
- `neurolia-videos/` - Vidéos Remotion
- `agence-web/` - Site Proxima

### Projets P2 (En attente)
- `iwok-muraliste/` - Site muraliste
- `la-pause-restaurant/` - Site restaurant
- `website-workflow-template/` - Template

---

## Format de Logs Standardisé

### Commits
```
[TYPE] Description courte

- Détail 1
- Détail 2

Refs: #issue ou contexte
```

Types: `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`

### Session Logs (CLAUDE.md)
```markdown
## Session [DATE]
- **Objectif**: Description
- **Actions**: Liste des actions
- **Résultat**: Statut final
- **Next**: Prochaines étapes
```

---

## Règles Anti-Hallucination

### Avant toute action
1. **Lire le CLAUDE.md du projet** - Statut pipeline, contexte, contraintes
2. **Vérifier l'existence des fichiers** avant modification
3. **Ne jamais inventer de données client** - Demander si manquant

### Pendant l'exécution
1. **Un changement = un commit** (si demandé)
2. **Documenter les décisions** dans le CLAUDE.md du projet
3. **Signaler les blocages** immédiatement

### Après l'exécution
1. **Mettre à jour le statut pipeline** si changement
2. **Logger la session** si significative
3. **Vérifier les tests/build** avant de conclure

---

## Conventions de Nommage

### Dossiers
- **kebab-case minuscules** : `fog-automations`, `opendoor-v2`
- **Préfixe `_`** pour dossiers système : `_archive`

### Fichiers
- **kebab-case** pour fichiers généraux : `design-tokens.json`
- **PascalCase** pour composants React : `HeroSection.tsx`
- **SCREAMING_SNAKE** pour constantes : `API_ENDPOINTS.ts`

### Branches Git
```
feature/[projet]-[description]
fix/[projet]-[description]
```

---

## Structure Standard Projet

```
projet/
├── CLAUDE.md           # Obligatoire - Statut + contexte
├── input/              # Données client (brief, assets)
├── output/             # Artifacts générés
├── stages/             # Instructions pipeline (si applicable)
├── app/                # Code source (Next.js)
├── components/         # Composants UI
└── public/             # Assets statiques
```

---

## Workflow Inter-Projets

### Dépendances
- `fog-design/` → utilisé par `fog-automations/`
- `website-workflow-template/` → template pour nouveaux projets

### Ressources Partagées
- Design tokens : définis par projet dans `globals.css`
- Composants : non partagés (chaque projet autonome)

---

## Checklist Nouveau Projet

- [ ] Créer dossier en kebab-case
- [ ] Créer CLAUDE.md avec template
- [ ] Définir priorité (P0/P1/P2)
- [ ] Ajouter au tableau dans `/projects/CLAUDE.md`
- [ ] Initialiser structure standard si site web
