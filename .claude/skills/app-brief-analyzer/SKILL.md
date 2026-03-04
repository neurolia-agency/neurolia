---
name: app-brief-analyzer
description: Transforme un brief client en PRD + features structurees pour application mobile
argument-hint: "<chemin-vers-brief-client.md>"
---

<objective>
Analyser un brief client pour application mobile et produire deux documents structures : un PRD (Product Requirements Document) complet et une liste de features priorisee selon la methode MoSCoW. Les outputs doivent etre exploitables par les etapes suivantes du pipeline (user flows, data architecture, API contracts, tech stack).
</objective>

<quick_start>
**Usage via APEX :**

```bash
/apex -a -s executer A01-init depuis pipeline/stages/A01-init.md
```

**Usage direct :**

Lire `pipeline/input/brief-client.md` et produire :
- `pipeline/output/01-brief/prd.md`
- `pipeline/output/01-brief/features.md`
</quick_start>

<inputs>
| Fichier | Requis | Description |
|---------|--------|-------------|
| `pipeline/input/brief-client.md` | Oui | Questionnaire client rempli |
| Conversation client | Non | Informations complementaires orales |
</inputs>

<outputs>

### prd.md (Product Requirements Document)

Structure requise :
- **Resume Executif** : client, type app, objectif mesurable, audience
- **Probleme** : quel probleme l'app resout (2-3 phrases)
- **Solution** : comment l'app resout ce probleme (2-3 phrases)
- **Personas** : profil complet avec contexte mobile (bureau/terrain/deplacement)
- **Objectifs & KPIs** : tableau objectif/metrique/cible
- **Contraintes Techniques** : plateformes, offline, push, geoloc, camera, biometrie, integrations
- **Contraintes Business** : budget, delai, equipe
- **Inspirations** : tableau app/element a retenir
- **Hors-Scope MVP** : features explicitement exclues

### features.md (Features Priorisees)

Structure requise avec priorisation MoSCoW :
- **Must Have** : indispensable au lancement (tableau #/feature/description/contrainte mobile)
- **Should Have** : important mais non bloquant
- **Could Have** : Phase 2
- **Won't Have** : explicitement exclu avec raison
- **Dependances entre Features** : tableau feature/depend de
- **Points de Contact n8n** : tableau feature/automation potentielle

</outputs>

<workflow>

### Etape 1 : Lire le brief
Lire integralement `pipeline/input/brief-client.md`. Identifier les sections remplies et les lacunes.

### Etape 2 : Extraire les informations
Extraire de maniere structuree :
- Objectif mesurable (quantifier si le client n'a pas precise)
- Audience cible avec contexte d'utilisation mobile
- Contraintes techniques mobiles (offline, push, geoloc, camera, biometrie)
- Features demandees (MVP vs Phase 2)
- Integrations necessaires (APIs, n8n, services existants)
- KPIs de succes

### Etape 3 : Structurer le PRD
Remplir le template PRD en s'assurant que :
- L'objectif est mesurable et quantifie
- Les personas ont un contexte mobile (bureau/terrain/deplacement)
- Les contraintes techniques sont exhaustives
- Le hors-scope est clairement defini

### Etape 4 : Prioriser les features
Classer chaque feature selon MoSCoW :
- **Must Have** : sans cette feature, l'app ne peut pas etre lancee
- **Should Have** : important pour l'experience, mais le lancement est possible sans
- **Could Have** : si budget et temps le permettent
- **Won't Have** : explicitement exclu (documenter pourquoi)

Pour chaque feature, identifier la contrainte mobile associee (offline, push, GPS, camera, etc.).

### Etape 5 : Valider
Verifier contre la checklist de qualite (11 items).

</workflow>

<constraints>
- **Mobile-first** : toujours considerer le contexte mobile (offline, batterie, reseau)
- **Objectif mesurable** : si le client donne un objectif vague, le transformer en metrique quantifiable
- **Exhaustivite contraintes** : verifier systematiquement offline, push, geoloc, camera, biometrie, stockage local, bluetooth/NFC
- **n8n-aware** : identifier les points d'automatisation potentiels (notifications, synchro, rapports)
- **Pas de code** : output = documentation uniquement
- **Pas de choix technique** : rester tech-agnostique (le choix se fait en A05)
</constraints>

<quality_gates>
- [ ] PRD contient un objectif mesurable et quantifie
- [ ] Au moins 1 persona decrit avec contexte mobile
- [ ] KPIs definis avec valeurs cibles
- [ ] Contraintes techniques mobiles listees (offline, push, geoloc, camera, biometrie)
- [ ] Features priorisees selon MoSCoW
- [ ] Au moins 3 features Must Have identifiees
- [ ] Dependances entre features documentees
- [ ] Points de contact n8n identifies
- [ ] Hors-scope MVP clairement defini
- [ ] Contraintes business (budget, delai) documentees
- [ ] Aucun placeholder `[texte]` restant dans les outputs
</quality_gates>
