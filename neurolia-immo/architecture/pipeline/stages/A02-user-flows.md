# Etape A02 : User Flows

> **Phase A : Architecture** - Cartographie des parcours utilisateurs et de la navigation.

## Objectif

Mapper les parcours complets de chaque persona (onboarding → utilisation quotidienne → cas limites), produire la carte de navigation (ecrans, transitions, hierarchie), et identifier les points de contact n8n.

## Skill

`app-user-flows`

## Input

- `pipeline/output/01-brief/prd.md`
- `pipeline/output/01-brief/features.md`

## Output

Creer dans `pipeline/output/02-user-flows/` :

### 1. flows/ (1 fichier par persona)

```markdown
# User Flow : [Prenom Persona]

## Profil Rapide
- **Role** : [Role]
- **Contexte** : [Bureau / Terrain / Deplacement]
- **Frequence** : [Quotidien / Hebdomadaire]
- **Objectif principal** : [En 1 phrase]

## Flow 1 : Onboarding

```
[Ecran Splash] → [Ecran Inscription]
                      │
              ┌───────┴───────┐
              ▼               ▼
      [Email/Password]   [OAuth Provider]
              │               │
              └───────┬───────┘
                      ▼
              [Ecran Profil Setup]
                      │
                      ▼
              [Tutorial / Walkthrough]
                      │
                      ▼
              [Ecran Principal]
```

### Etapes Detaillees

| # | Ecran | Action Utilisateur | Reponse Systeme | Feature |
|---|-------|-------------------|-----------------|---------|
| 1 | Splash | Ouvre l'app | Affiche branding, check auth | - |
| 2 | Inscription | Choisit methode | Affiche formulaire | F01 |
| 3 | Profil Setup | Remplit infos | Valide et sauvegarde | F02 |
| 4 | Tutorial | Swipe / Skip | Guide interactif | F03 |
| 5 | Principal | - | Affiche dashboard | F04 |

### Points de Contact n8n
- **Apres inscription** : Webhook → Email de bienvenue
- **Profil complete** : Webhook → Notification admin

## Flow 2 : Utilisation Quotidienne

```
[Ecran Principal]
      │
      ├── [Action 1] → [Ecran Detail] → [Confirmation]
      │
      ├── [Action 2] → [Ecran Formulaire] → [Succes/Erreur]
      │
      └── [Action 3] → [Ecran Liste] → [Filtre/Tri]
```

### Etapes Detaillees

| # | Ecran | Action Utilisateur | Reponse Systeme | Feature |
|---|-------|-------------------|-----------------|---------|
| 1 | ... | ... | ... | ... |

### Points de Contact n8n
- **[Trigger]** : Webhook → [Workflow]

## Flow 3 : Cas Limites

### Erreur Reseau
```
[Action] → [Erreur Reseau] → [Mode Offline / Retry]
```

### Session Expiree
```
[Action] → [Token Expire] → [Refresh Silent / Re-login]
```

### Donnees Invalides
```
[Formulaire] → [Validation Echouee] → [Messages Erreur Inline]
```
```

### 2. navigation-map.md

```markdown
# Navigation Map - [Nom du Projet]

## Hierarchie des Ecrans

```
App
├── Auth (Stack Navigator)
│   ├── Splash
│   ├── Login
│   ├── Register
│   ├── Forgot Password
│   └── Onboarding / Tutorial
│
├── Main (Tab Navigator)
│   ├── Tab 1 : [Nom] (Stack)
│   │   ├── [Ecran Liste]
│   │   ├── [Ecran Detail]
│   │   └── [Ecran Action]
│   │
│   ├── Tab 2 : [Nom] (Stack)
│   │   ├── [Ecran Principal]
│   │   └── [Ecran Secondaire]
│   │
│   ├── Tab 3 : [Nom] (Stack)
│   │   └── [Ecran Principal]
│   │
│   └── Tab 4 : Profil (Stack)
│       ├── [Ecran Profil]
│       ├── [Ecran Parametres]
│       └── [Ecran Edition]
│
└── Modals (Overlays)
    ├── [Modal Action]
    ├── [Modal Confirmation]
    └── [Modal Erreur]
```

## Pattern de Navigation

| Pattern | Usage | Ecrans |
|---------|-------|--------|
| Bottom Tab | Navigation principale | 3-5 tabs |
| Stack | Navigation en profondeur | Liste → Detail → Action |
| Modal | Actions ponctuelles | Confirmation, formulaire rapide |
| Drawer | Navigation secondaire | Parametres, aide, legales |

## Transitions

| De | Vers | Type | Condition |
|----|------|------|-----------|
| Splash | Login | Replace | Non authentifie |
| Splash | Main | Replace | Authentifie |
| Login | Main | Replace | Auth reussie |
| Tab Liste | Detail | Push | Tap item |
| Detail | Action | Modal | Tap CTA |

## Ecrans par Feature

| Feature | Ecrans |
|---------|--------|
| F01 | Login, Register, Forgot Password |
| F02 | Profil, Edition Profil |
| F03 | [Liste], [Detail] |
| ... | ... |

## Points de Contact n8n (Resume)

| Ecran / Action | Webhook | Workflow n8n |
|----------------|---------|-------------|
| Post-inscription | `POST /webhooks/user-registered` | Email bienvenue + Notification admin |
| [Action metier] | `POST /webhooks/[action]` | [Description workflow] |
| [Erreur critique] | `POST /webhooks/error-alert` | Alerte equipe technique |
```

## Instructions

1. **Identifier les personas** depuis le PRD (persona principal + secondaire si existant)
2. **Mapper les parcours** pour chaque persona :
   - Onboarding complet (premiere ouverture → utilisation)
   - Utilisation quotidienne (actions principales recurrentes)
   - Cas limites (erreur reseau, session expiree, donnees invalides)
3. **Creer la navigation map** :
   - Hierarchie des ecrans (tab, stack, modal, drawer)
   - Transitions entre ecrans avec conditions
   - Mapping ecrans ↔ features
4. **Identifier les points de contact n8n** :
   - Chaque evenement declenchant un webhook
   - Le workflow n8n associe (notification, synchro, rapport)

## Validation

- [ ] Au moins 1 flow par persona identifie
- [ ] Flow onboarding complet (splash → ecran principal)
- [ ] Flow utilisation quotidienne avec actions principales
- [ ] Cas limites documentes (offline, erreur, session expiree)
- [ ] Navigation map avec hierarchie complete
- [ ] Pattern de navigation defini (tab, stack, modal)
- [ ] Transitions documentees avec conditions
- [ ] Mapping ecrans ↔ features complet
- [ ] Points de contact n8n identifies avec webhooks
- [ ] Aucun placeholder `[texte]` restant dans les outputs

## Prochaine Etape

Une fois `pipeline/output/02-user-flows/` complet → Passer a `stages/A03-data-architecture.md`

---

**Version** : 1.0
**Phase** : A02 (Architecture)
**Dependances** : A01 (Init & Brief)
**Produit pour** : A03 (Data Architecture), A04 (API Contracts)
