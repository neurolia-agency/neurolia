---
name: app-user-flows
description: Genere les user flows, navigation map et points de contact n8n pour une application mobile
argument-hint: "<chemin-vers-01-brief/>"
---

<objective>
A partir du PRD et de la liste de features, generer les parcours utilisateurs complets pour chaque persona (onboarding, utilisation quotidienne, cas limites), produire la carte de navigation (hierarchie d'ecrans, transitions, patterns), et identifier tous les points de contact n8n (webhooks, workflows automatises).
</objective>

<quick_start>
**Usage via APEX :**

```bash
/apex -a -s executer A02-user-flows depuis pipeline/stages/A02-user-flows.md
```

**Usage direct :**

Lire `pipeline/output/01-brief/` et produire :
- `pipeline/output/02-user-flows/flows/[persona].md` (1 par persona)
- `pipeline/output/02-user-flows/navigation-map.md`
</quick_start>

<inputs>
| Fichier | Requis | Description |
|---------|--------|-------------|
| `pipeline/output/01-brief/prd.md` | Oui | PRD avec personas et contraintes |
| `pipeline/output/01-brief/features.md` | Oui | Features priorisees avec IDs (F01, F02, ...) |
</inputs>

<outputs>

### flows/[persona].md (1 fichier par persona)

Structure requise pour chaque flow :
- **Profil Rapide** : role, contexte, frequence, objectif
- **Flow Onboarding** : diagramme ASCII + tableau etapes (ecran, action, reponse, feature)
- **Flow Utilisation Quotidienne** : diagramme ASCII + tableau etapes
- **Flow Cas Limites** : erreur reseau, session expiree, donnees invalides
- **Points de Contact n8n** : pour chaque flow, les webhooks declenches

### navigation-map.md

Structure requise :
- **Hierarchie des Ecrans** : arbre avec navigateurs (Tab, Stack, Modal, Drawer)
- **Pattern de Navigation** : tableau pattern/usage/ecrans
- **Transitions** : tableau de/vers/type/condition
- **Ecrans par Feature** : mapping feature → ecrans
- **Points de Contact n8n (Resume)** : tableau ecran/webhook/workflow

</outputs>

<workflow>

### Etape 1 : Identifier les personas
Lire le PRD et extraire les personas. Pour chaque persona, noter :
- Son role et contexte d'utilisation (bureau, terrain, deplacement)
- Sa frequence d'utilisation prevue
- Ses features principales (depuis features.md)

### Etape 2 : Mapper les parcours
Pour chaque persona, creer 3 flows :
- **Onboarding** : de la premiere ouverture jusqu'a l'ecran principal
- **Utilisation quotidienne** : les 2-3 actions principales recurrentes
- **Cas limites** : erreur reseau, session expiree, donnees invalides

Chaque flow doit :
- Avoir un diagramme ASCII montrant les ecrans et transitions
- Avoir un tableau detaille (ecran, action utilisateur, reponse systeme, feature ID)
- Identifier les webhooks n8n declenches

### Etape 3 : Creer la navigation map
- Definir la hierarchie des ecrans avec les navigateurs :
  - **Tab Navigator** : navigation principale (3-5 tabs max)
  - **Stack Navigator** : navigation en profondeur (liste → detail → action)
  - **Modal** : actions ponctuelles (confirmation, formulaire rapide)
  - **Drawer** : navigation secondaire (parametres, aide, legales)
- Documenter les transitions avec conditions
- Mapper chaque ecran a sa feature

### Etape 4 : Identifier les points de contact n8n
Pour chaque evenement metier important :
- Definir le webhook (URL, methode, payload)
- Decrire le workflow n8n associe (notification, synchro, rapport)

</workflow>

<constraints>
- **Patterns de navigation mobile** : respecter les conventions mobile (bottom tab pour navigation principale, stack pour la profondeur, modal pour les actions)
- **Maximum 5 tabs** : la navigation principale ne doit pas avoir plus de 5 onglets
- **Offline-aware** : si le PRD mentionne le mode offline, chaque flow doit gerer le cas deconnecte
- **Feature IDs** : chaque ecran/action doit etre lie a un ID de feature (F01, F02, ...)
- **n8n-first** : identifier proactivement les points d'automatisation, meme non demandes explicitement
- **Pas de code** : output = documentation uniquement
</constraints>

<quality_gates>
- [ ] Au moins 1 flow par persona identifie dans le PRD
- [ ] Flow onboarding complet (splash → ecran principal)
- [ ] Flow utilisation quotidienne avec actions principales
- [ ] Cas limites documentes (offline, erreur reseau, session expiree)
- [ ] Navigation map avec hierarchie complete des ecrans
- [ ] Pattern de navigation defini (tab, stack, modal, drawer)
- [ ] Transitions documentees avec conditions
- [ ] Mapping ecrans ↔ features complet
- [ ] Points de contact n8n identifies avec webhooks
- [ ] Aucun placeholder `[texte]` restant dans les outputs
</quality_gates>
