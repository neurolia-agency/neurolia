# Prompt — Implémentation Section Process Landing

> Exécuter une étape à la fois, vérifier visuellement, puis passer à la suivante.

## Choix des skills

| Type de stage | Skill | Raison |
|---------------|-------|--------|
| Structure / Intégration (F01, F05) | **Apex** | Tâche mécanique, rigueur > créativité |
| Cards animées (F02, F03, F04) | **Frontend Design** | Tâche créative, rendu visuel > mécanique |

## Étapes

| Étape | Stage | Skill | Commande |
|-------|-------|-------|----------|
| 1 | Structure | Apex | `/apex -a -s exécuter étape F01-process-structure depuis pipeline/stages/F01-process-structure.md` |
| 2 | Card Audit (animée) | Frontend Design | `/frontend-design` puis coller le contenu de `pipeline/stages/F02-process-card-audit.md` |
| 3 | Card Proposition (animée) | Frontend Design | `/frontend-design` puis coller le contenu de `pipeline/stages/F03-process-card-proposal.md` |
| 4 | Card Livraison (animée) | Frontend Design | `/frontend-design` puis coller le contenu de `pipeline/stages/F04-process-card-delivery.md` |
| 5 | Intégration + validation | Apex | `/apex -a -s exécuter étape F05-process-integration depuis pipeline/stages/F05-process-integration.md` |

## Workflow

1. Lancer l'étape 1 (Apex)
2. Vérifier visuellement dans le navigateur
3. Si OK → passer à l'étape suivante
4. Si pas OK → itérer sur l'étape en cours avant de continuer
5. Pour les étapes F02-F04 : vérifier la **validation code** (critères binaires dans le stage) en plus de la validation visuelle
6. Répéter jusqu'à F05

## Protocole de retry (si un stage échoue)

Si l'animation d'une card est statique ou incomplète, relancer avec ce prompt :

```
Le mock de la Card 0X est [statique / incomplet]. Relis la séquence d'animation
dans references/briefs/process-section-landing.md section "Card 0X" et la section
"Validation code" dans pipeline/stages/F0X-*.md. Corrige le composant pour que
chaque critère de validation code soit satisfait.
```
