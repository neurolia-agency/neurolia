# Etape A01 : Init & Brief

> **Phase A : Architecture** - Premiere etape du pipeline. Transforme le brief client en PRD et liste de features priorisee.

## Objectif

Transformer le brief client en un PRD (Product Requirements Document) structure et une liste de features priorisee selon la methode MoSCoW, exploitables par les etapes suivantes.

## Skill

`app-brief-analyzer`

## Input

- `pipeline/input/brief-client.md` (questionnaire rempli)
- Conversation avec le client (si informations complementaires)

## Output

Creer 2 fichiers dans `pipeline/output/01-brief/` :

### 1. prd.md (Product Requirements Document)

```markdown
# PRD : [Nom du Projet]

## Resume Executif

**Client** : [Nom]
**Type d'application** : [Utilitaire / Commerce / Social / Dashboard]
**Objectif mesurable** : [Objectif quantifie]
**Audience cible** : [Description en 1-2 phrases]

## Probleme

[Quel probleme cette application resout-elle ? 2-3 phrases]

## Solution

[Comment l'application resout ce probleme ? 2-3 phrases]

## Personas

### Persona Principal : [Prenom]
- **Age** : [Tranche]
- **Profession** : [Metier]
- **Contexte** : [Bureau / Terrain / Deplacement]
- **Probleme** : [Pain point principal]
- **Objectif** : [Ce qu'il veut accomplir]
- **Frequence d'utilisation** : [Quotidien / Hebdomadaire / Ponctuel]

### Persona Secondaire : [Prenom]
[Meme structure si pertinent]

## Objectifs & KPIs

| Objectif | KPI | Cible |
|----------|-----|-------|
| [Objectif 1] | [Metrique] | [Valeur cible] |
| [Objectif 2] | [Metrique] | [Valeur cible] |
| [Objectif 3] | [Metrique] | [Valeur cible] |

## Contraintes Techniques

- **Plateformes** : [iOS / Android / PWA]
- **Offline** : [Oui / Non - details]
- **Notifications push** : [Oui / Non]
- **Geolocalisation** : [Oui / Non]
- **Camera** : [Oui / Non]
- **Biometrie** : [Oui / Non]
- **Integrations** : [Liste des services externes]

## Contraintes Business

- **Budget** : [Fourchette]
- **Delai** : [Timeline]
- **Equipe** : [Ressources disponibles]

## Inspirations

| Application | Ce qu'on retient |
|-------------|-----------------|
| [App 1] | [Element a retenir] |
| [App 2] | [Element a retenir] |

## Hors-Scope (MVP)

- [Feature exclue du MVP 1]
- [Feature exclue du MVP 2]
- [Feature exclue du MVP 3]
```

### 2. features.md (Features Priorisees)

```markdown
# Features - [Nom du Projet]

## Methode de Priorisation : MoSCoW

### Must Have (MVP)
> Fonctionnalites sans lesquelles l'app ne peut pas etre lancee.

| # | Feature | Description | Contrainte Mobile |
|---|---------|-------------|-------------------|
| F01 | [Nom] | [Description courte] | [Offline / Push / GPS / etc.] |
| F02 | [Nom] | [Description courte] | [Contrainte ou "Aucune"] |
| F03 | [Nom] | [Description courte] | [Contrainte ou "Aucune"] |

### Should Have (MVP+)
> Fonctionnalites importantes mais dont l'absence ne bloque pas le lancement.

| # | Feature | Description | Contrainte Mobile |
|---|---------|-------------|-------------------|
| F10 | [Nom] | [Description courte] | [Contrainte ou "Aucune"] |
| F11 | [Nom] | [Description courte] | [Contrainte ou "Aucune"] |

### Could Have (Phase 2)
> Fonctionnalites souhaitees si le budget et le temps le permettent.

| # | Feature | Description | Contrainte Mobile |
|---|---------|-------------|-------------------|
| F20 | [Nom] | [Description courte] | [Contrainte ou "Aucune"] |
| F21 | [Nom] | [Description courte] | [Contrainte ou "Aucune"] |

### Won't Have (Hors-Scope)
> Fonctionnalites explicitement exclues du projet.

- [Feature exclue] : [Raison]
- [Feature exclue] : [Raison]

## Dependances entre Features

| Feature | Depend de |
|---------|-----------|
| F02 | F01 |
| F10 | F01, F03 |

## Points de Contact n8n

| Feature | Automation n8n Potentielle |
|---------|---------------------------|
| [Feature] | [Description du workflow] |
| [Feature] | [Description du workflow] |
```

## Instructions

1. **Lire** le brief client complet (`pipeline/input/brief-client.md`)
2. **Extraire** les informations essentielles :
   - Objectif mesurable (quantifie si possible)
   - Audience cible (avec contexte d'utilisation mobile)
   - Contraintes techniques mobiles (offline, push, geoloc, camera, etc.)
   - Features MVP vs Phase 2
   - Integrations necessaires
   - KPIs de succes
3. **Structurer** le PRD selon le template ci-dessus
4. **Prioriser** les features selon MoSCoW :
   - Must Have : indispensable au lancement
   - Should Have : important mais non bloquant
   - Could Have : Phase 2
   - Won't Have : explicitement exclu
5. **Identifier** les points de contact n8n potentiels (notifications, synchros, rapports)

## Validation

- [ ] PRD contient un objectif mesurable et quantifie
- [ ] Au moins 1 persona decrit avec contexte mobile
- [ ] KPIs definis avec valeurs cibles
- [ ] Contraintes techniques mobiles listees (offline, push, geoloc, etc.)
- [ ] Features priorisees selon MoSCoW
- [ ] Au moins 3 features Must Have identifiees
- [ ] Dependances entre features documentees
- [ ] Points de contact n8n identifies
- [ ] Hors-scope MVP clairement defini
- [ ] Contraintes business (budget, delai) documentees
- [ ] Aucun placeholder `[texte]` restant dans les outputs

## Prochaine Etape

Une fois `pipeline/output/01-brief/` complet → Passer a `stages/A02-user-flows.md`

---

**Version** : 1.0
**Phase** : A01 (Architecture)
**Dependances** : Aucune
**Produit pour** : A02 (User Flows), A03 (Data Architecture), A04 (API Contracts), A05 (Tech Stack)
