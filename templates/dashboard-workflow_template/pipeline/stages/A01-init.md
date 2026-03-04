# A01 — Init : Brief + PRD

## Objectif

Transformer le brief client en PRD structure (Product Requirements Document) avec features, personas, KPIs, et inventaire des entites.

## Agent

**`architecture-planner`** (sonnet)

## Skill

`dashboard-brief-analyzer`

## Inputs

- `pipeline/input/brief-client.md` — questionnaire client rempli
- `pipeline/input/references/` — apps/dashboards de reference

## Processus

### 1. Diagnostic

Lire `pipeline/input/brief-client.md` et evaluer :
- Le brief est-il complet ? Lister les zones floues.
- Les objectifs sont-ils mesurables ?
- Les personas sont-ils clairement definis ?
- Y a-t-il des contraintes techniques mentionnees ?

### 2. Production du PRD

Creer `pipeline/output/01-brief/prd.md` avec les sections suivantes :

#### 2.1 Contexte Projet
- Client (entreprise, secteur, taille)
- Probleme a resoudre
- Solution proposee (1 phrase)
- KPI principal

#### 2.2 Personas
Pour chaque persona (minimum 2) :
- Nom, role, contexte d'utilisation
- Device principal (desktop/mobile/tablet)
- Objectif principal
- Frustrations actuelles
- Scenario d'usage typique (journee type)

#### 2.3 Features
Tableau avec classification MoSCoW :

| ID | Feature | Priorite | Persona | Description |
|----|---------|----------|---------|-------------|
| F01 | [Nom] | Must Have | [Persona] | [Description] |

**Regles** :
- Must Have = MVP (6-10 features max)
- Should Have = MVP+ (3-5 features)
- Could Have = Phase 2 (lister sans detailler)
- Won't Have = Explicitement exclus (important pour cadrer)

#### 2.4 Entites Principales
Lister les entites du domaine metier :

| Entite | Description | Relations |
|--------|-------------|-----------|
| [Nom] | [Description] | [Entites liees] |

#### 2.5 Roles et Permissions
| Role | Peut voir | Peut creer | Peut modifier | Peut supprimer |
|------|-----------|-----------|---------------|----------------|

#### 2.6 Integrations Externes
| Systeme | Type | Direction | Frequence |
|---------|------|-----------|-----------|
| [Nom] | [API/Webhook/iCal/IMAP/SMTP] | [Entrant/Sortant/Bidirectionnel] | [Temps reel/Polling] |

#### 2.7 Contraintes
- Performance (temps de chargement cible)
- Securite (multi-tenant, RGPD)
- Responsive (desktop-first ou mobile-first)
- Ton (vouvoiement/tutoiement)
- Budget/delai

#### 2.8 Elements Manquants
| Element | Impact | Bloquant ? | Proposition par defaut |
|---------|--------|------------|----------------------|

### 3. Features Mapping

Creer `pipeline/output/01-brief/features.md` avec le detail de chaque feature Must Have :

```markdown
## F01 — [Nom Feature]

**Persona** : [Nom]
**Priorite** : Must Have
**Complexite** : [Simple / Moyenne / Complexe]

### Description
[Description detaillee]

### Criteres d'acceptation
- [ ] [Critere 1]
- [ ] [Critere 2]

### Pages impactees
- [Page 1] : [ce qui change]

### Dependances
- [Feature X] doit etre fait avant
- [Integration Y] necessaire
```

## Output

```
pipeline/output/01-brief/
├── prd.md          # PRD complet
└── features.md     # Detail des features Must Have
```

## Verification Placeholders

Apres l'init (skill `init-dashboard`) et la production du PRD, verifier que `CLAUDE.md` et `PLAN.md` ne contiennent plus les placeholders globaux :

- [ ] `[NOM_PROJET]` remplace partout
- [ ] `[CLIENT]` et `[NOM_CLIENT]` remplaces
- [ ] `[DESCRIPTION_COURTE]` et `[DESCRIPTION]` remplaces
- [ ] `[KPI]` remplace
- [ ] `[ROLE_1]`, `[ROLE_2]` (et `[ROLE_3]` si applicable) remplaces
- [ ] `[DATE]` remplace
- [ ] `[Raison]` rempli dans le tableau des decisions (PLAN.md)

**Tolerance** : `[A definir]` dans la section ADN Visuel de CLAUDE.md (sera rempli en A02).

## Validation

- [ ] Toutes les sections du PRD sont remplies
- [ ] Au moins 2 personas definis avec scenarios
- [ ] Features classees MoSCoW (Must/Should/Could/Won't)
- [ ] Entites principales identifiees avec relations
- [ ] Roles et permissions documentes
- [ ] Integrations externes listees
- [ ] KPI principal defini et mesurable
- [ ] Elements manquants listes avec impact
- [ ] Pas de Lorem Ipsum — contenu reel ou `[A COMPLETER]`
