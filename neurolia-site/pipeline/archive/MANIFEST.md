# Archive - Manifest

Ce dossier contenait des fichiers obsolètes du projet, supprimés après audit.

## Fichiers Supprimés (2026-01-30)

| Fichier | Taille | Raison Suppression |
|---------|--------|-------------------|
| `WORKFLOW_OVERVIEW.md` | 25 KB | Remplacé par `stages/` (workflow v2) |
| `HYBRID_STRATEGY.md` | 14 KB | Stratégie intégrée dans stages/04-07 |
| `audit-workflow-report.md` | 14 KB | Corrections appliquées aux stages/ |
| `prompt-corrections-audit.md` | 7 KB | Corrections appliquées |
| `02-design-system-usage.md` | 12 KB | Remplacé par `app/globals.css` |
| `output/02-design-system.css` | 1.2 KB | Fichier de référence redondant - source unique = `app/globals.css` |

**Total libéré** : 73.2 KB

## Sources de Vérité Actuelles

| Domaine | Fichier |
|---------|---------|
| Workflow | `stages/*.md` |
| Design tokens | `app/globals.css` |
| Contraintes | `output/01.5-art-direction/constraints.md` |
| Statut pipeline | `CLAUDE.md` |
| Dépendances | `pipeline_workflow/DEPENDENCIES.md` |

## Politique d'Archivage

1. Fichiers déplacés ici quand remplacés par nouvelle version
2. Supprimés après validation que les remplaçants sont complets
3. Ce MANIFEST conserve la trace historique

---

*Dernière mise à jour : 2026-01-30 (Audit workflow - suppression 02-design-system.css)*
