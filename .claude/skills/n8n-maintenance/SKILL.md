---
name: n8n-maintenance
description: Gere le cycle de maintenance des workflows n8n (patch-notes, mises a jour JSON, re-validation)
argument-hint: "<action> workflow <WFXX> [description du changement]"
---

<objective>
Gerer le cycle de vie des workflows n8n deployes : documenter chaque changement dans un patch-note, mettre a jour le JSON correspondant, et re-valider via N05. Garantir la tracabilite et la qualite de chaque modification.
</objective>

<quick_start>
**Usage dans le pipeline :**

```bash
/apex -a -s executer N06-maintenance depuis pipeline/stages/N06-maintenance.md
```

**Usage direct :**

Decrire le changement necessaire sur un workflow et ce skill gere le cycle complet : patch-note → modification JSON → re-validation.
</quick_start>

<inputs>
| Source | Fichier | Description |
|--------|---------|-------------|
| Production | Workflows deployes | Comportement observe en production |
| Utilisateur | Demande de changement | Bug report, evolution, optimisation |
| N04 | `04-workflows/WFXX-nom.json` | JSON actuel du workflow a modifier |
| N05 | `05-validation/validation-report.md` | Rapport de validation actuel |
</inputs>

<outputs>
| Fichier | Format | Description |
|---------|--------|-------------|
| `06-patches/WFXX-PATCH-NOTES.md` | Markdown | Historique des modifications du workflow |
| `04-workflows/WFXX-nom.json` | JSON | JSON mis a jour avec les modifications |
| `05-validation/validation-report.md` | Markdown | Rapport de validation mis a jour |
</outputs>

<workflow>
1. **Documenter le contexte du changement** : Creer ou mettre a jour le fichier `06-patches/WFXX-PATCH-NOTES.md` avec la date, le titre, le contexte (pourquoi), et la description du changement prevu. Le patch-note DOIT exister avant toute modification du JSON
2. **Identifier les nodes impactes** : Analyser le JSON actuel du workflow pour lister precisement les nodes a modifier, ajouter ou supprimer. Documenter chaque node impacte dans le patch-note
3. **Mettre a jour le JSON** : Appliquer les modifications dans `04-workflows/WFXX-nom.json`. Maintenir la coherence des connexions. Si des nodes sont ajoutes, generer des UUIDs uniques et positionner correctement. Si des nodes sont supprimes, nettoyer les connexions orphelines
4. **Re-valider via N05** : Executer la validation complete sur le JSON modifie (structure, connexions, credentials, expressions). Si des erreurs sont detectees, corriger et re-valider en boucle
5. **Finaliser le patch-note** : Mettre a jour le status dans le patch-note ("Valide N05" ou "En attente validation"). Documenter l'impact reel sur les autres workflows. Mettre a jour le rapport de validation
</workflow>

<patch_note_format>
```markdown
# WFXX — PATCH-NOTES

## [DATE] — [Titre court et descriptif]

**Contexte** : [Pourquoi le changement est necessaire — bug, evolution, optimisation]
**Changement** : [Description precise de la modification]
**Nodes modifies** :
- [Node 1 — Nom] : [Ce qui a change — parametre modifie, expression corrigee, node ajoute/supprime]
- [Node 2 — Nom] : [Ce qui a change]
**Connexions modifiees** :
- [Connexion ajoutee/supprimee/modifiee — source → destination]
**Impact** : [Impact sur les autres workflows — ou "Aucun impact sur les autres workflows"]
**Status** : Valide N05 | En attente validation

---

## [DATE PRECEDENTE] — [Titre court]

**Contexte** : [...]
**Changement** : [...]
**Nodes modifies** :
- [...]
**Impact** : [...]
**Status** : Valide N05
```
</patch_note_format>

<constraints>
- **Toujours documenter avant de modifier** : le patch-note DOIT exister avant toute modification du JSON
- **Toujours re-valider** : chaque modification doit passer N05 avec 0 erreurs
- **Ne jamais modifier sans patch-note** : aucune modification "silencieuse" du JSON
- **Un fichier patch-note par workflow** : les modifications sont regroupees chronologiquement
- **Immutabilite des autres outputs** : ne modifier que `04-workflows/` et `06-patches/` (et `05-validation/` pour le rapport)
- **Coherence des connexions** : apres chaque modification, verifier qu'aucune connexion n'est orpheline
- **Aucun secret** : les modifications ne doivent pas introduire de secrets dans le JSON
</constraints>

<quality_gates>
- [ ] Le patch-note est complet (date, contexte, changement, nodes, impact, status)
- [ ] Le JSON dans `04-workflows/` est mis a jour correctement
- [ ] La validation N05 passe avec 0 erreurs apres modification
- [ ] Aucune regression dans les autres workflows (connexions, sub-workflows)
- [ ] Le patch-note indique "Valide N05" apres validation reussie
- [ ] Aucun secret n'a ete introduit dans le JSON modifie
- [ ] Les connexions sont coherentes (pas d'orphelins)
</quality_gates>
