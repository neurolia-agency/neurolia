Quand tu crees ou modifies un workflow n8n :

## Langue

1. **Tous les noms de noeuds DOIVENT etre en francais** — pas d'anglais
2. **Le nom du workflow** peut rester en format technique (ex: `SE-WF02 — Creation Contenu`)
3. Les noms de noeuds suivent ce pattern : `Verbe/Action + Objet`

### Dictionnaire de traduction des noeuds

| Anglais (interdit) | Francais (obligatoire) |
|---------------------|------------------------|
| Schedule Trigger | Declencheur Planifie |
| Fetch / Get | Charger |
| Filter | Filtrer |
| Split In Batches | Boucle [Objet] |
| Download | Telecharger |
| Upload | Upload [complement] |
| Insert | Inserer |
| Update | MAJ [Objet] |
| Delete | Supprimer |
| Move | Deplacer |
| Build / Create | Construire |
| Match / Assign | Associer / Assigner |
| IF — [condition] | SI — [condition] |
| Log Execution | Journal Execution |
| Set | Configurer [Objet] |
| Switch | Aiguillage [Objet] |
| Merge | Fusionner [Objet] |
| Code (custom) | [Description de l'action] |

### Sous-noeuds AI

| Anglais | Francais |
|---------|----------|
| OpenAI Chat Model — X | Modele OpenAI — X |
| Structured Output Parser — X | Parseur Sortie — X |
| Agent [Role] | Agent [Role] |

## Sticky Notes — OBLIGATOIRES

Chaque workflow DOIT avoir des sticky notes qui decoupent le workflow en sections logiques.

### Regles

1. **Une sticky note par section fonctionnelle** (3-8 sections par workflow)
2. **Format du contenu** :
   ```
   ## N. TITRE SECTION
   Description courte de ce que fait cette section (1-2 lignes).
   ```
3. **Position** : au-dessus ou a gauche du groupe de noeuds concerne
4. **Taille recommandee** : width 600-1500, height 120
5. **ID** : `sn01`, `sn02`, etc.

### Sections typiques

| Section | Quand l'utiliser |
|---------|------------------|
| CHARGEMENT DONNEES | Trigger + requetes initiales |
| FILTRAGE / VALIDATION | Noeuds IF, Code de filtrage |
| TRAITEMENT | Logique metier principale |
| APPEL API EXTERNE | HTTP Request vers services tiers |
| AGENT IA | Bloc Agent + LLM + Parser |
| ENREGISTREMENT | Insert/Update en base |
| NOTIFICATION / ENVOI | Emails, webhooks sortants |
| FINALISATION | Log, cleanup, retour boucle |

## Exemples de noms complets

```
Declencheur Planifie
Charger Clients Actifs
Filtrer Clients avec Drive
Boucle Clients
Lister Fichiers Drive
SI — Nouveaux Fichiers
Telecharger Fichier
Upload vers Storage
Associer Creneau Editorial
Construire Prompt Sublimation
Agent DA — Sublimation
Agent Redacteur
Modele OpenAI — Redacteur
Parseur Sortie — Caption
Inserer File Contenu
MAJ Statut Upload
Deplacer Fichier Drive
Journal Execution
```
