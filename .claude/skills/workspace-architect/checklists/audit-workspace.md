# Checklist Audit Workspace

Utiliser pour évaluer et améliorer l'organisation d'un projet existant.

---

## 1. Structure fichiers Claude

### CLAUDE.md
- [ ] Existe à la racine du projet?
- [ ] Moins de 100 lignes?
- [ ] Chaque ligne est nécessaire (pas inférable du code)?
- [ ] Structuré avec sections markdown?
- [ ] Commandes bash documentées?
- [ ] Stack technique claire?

### .claude/ directory
- [ ] Structure organisée?
- [ ] rules/ utilisé si > 50 lignes de règles?
- [ ] skills/ pour connaissances à la demande?
- [ ] agents/ pour assistants spécialisés?

### Fichiers locaux
- [ ] CLAUDE.local.md dans .gitignore?
- [ ] Pas de secrets dans CLAUDE.md?

## 2. Qualité du contenu

### Ce qui DOIT être présent
- [ ] Commandes de développement
- [ ] Commandes de test
- [ ] Commandes de build/lint
- [ ] Stack technique principale
- [ ] Règles de style NON-standard

### Ce qui NE DOIT PAS être présent
- [ ] ❌ Conventions standard du langage
- [ ] ❌ Info que Claude peut lire dans le code
- [ ] ❌ Documentation API détaillée
- [ ] ❌ Info qui change fréquemment
- [ ] ❌ Fichier-by-fichier descriptions
- [ ] ❌ Évidences ("write clean code")

## 3. Rules modulaires (si applicable)

- [ ] Chaque rule < 100 lignes?
- [ ] Noms de fichiers descriptifs?
- [ ] Rules avec `paths:` frontmatter quand approprié?
- [ ] Pas de duplication entre rules?
- [ ] Organisation en sous-dossiers si nombreuses?

## 4. Skills (si applicable)

- [ ] SKILL.md < 500 lignes?
- [ ] Descriptions avec mots-clés de déclenchement?
- [ ] Un skill = un focus?
- [ ] Références vers fichiers externes si détails longs?
- [ ] `disable-model-invocation` pour workflows manuels?

## 5. Subagents (si applicable)

- [ ] Description claire (quand déléguer)?
- [ ] Tools minimum nécessaires?
- [ ] Model approprié au use case?
- [ ] Hooks de validation si actions sensibles?

## 6. Problèmes courants

### Anti-patterns à corriger
- [ ] ❌ CLAUDE.md à plusieurs niveaux (dupli)
- [ ] ❌ Skills dans src/ (mélange)
- [ ] ❌ Config éparpillée hors .claude/
- [ ] ❌ Rules sans paths (tout chargé toujours)
- [ ] ❌ Fichiers trop longs (Claude ignore)

### Signaux d'alarme
- [ ] ❌ Claude ignore des instructions → fichier trop long
- [ ] ❌ Claude pose questions répondues dans CLAUDE.md → phrasing ambigu
- [ ] ❌ Claude fait des erreurs répétées → règle manquante ou mal formulée

## 7. Recommandations d'amélioration

### Si CLAUDE.md trop long
1. Identifier les règles par domaine
2. Créer `.claude/rules/` avec fichiers séparés
3. Ajouter `paths:` frontmatter où applicable
4. Garder uniquement l'essentiel dans CLAUDE.md

### Si Claude ne suit pas les instructions
1. Vérifier longueur totale des fichiers chargés
2. Ajouter emphase ("IMPORTANT", "YOU MUST")
3. Reformuler de façon plus spécifique
4. Supprimer les règles redondantes

### Si workflows répétitifs
1. Identifier les patterns
2. Créer skills dédiés
3. Tester avec `/skill-name`

---

## Score rapide

| Critère | Points |
|---------|--------|
| CLAUDE.md existe et < 100 lignes | /2 |
| Commandes bash documentées | /1 |
| Pas d'info redondante | /2 |
| .claude/ bien organisé | /2 |
| Rules avec paths si applicable | /1 |
| Skills/agents appropriés | /2 |

**Score total: /10**

- 8-10: Excellent
- 6-7: Bon, améliorations mineures
- 4-5: Acceptable, revoir organisation
- 0-3: Restructuration recommandée
