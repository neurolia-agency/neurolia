# Tone of Voice — Reference

## Spectrum Mapping

Le ton de communication se definit sur 4 axes. Chaque axe est un spectre, pas un binaire.

```
Formel ←————————→ Familier
  1  2  3  4  5

Serieux ←————————→ Ludique
  1  2  3  4  5

Technique ←————————→ Accessible
  1  2  3  4  5

Distant ←————————→ Intime
  1  2  3  4  5
```

### Construction depuis la plateforme

1. **Archetype** → positionne le curseur sur chaque axe
2. **Values** → ajuste (ex: "Authenticite" pousse vers Familier)
3. **Target/Personas** → confirme (le registre doit resonner avec la cible)

### Registre par archetype

| Archetype | Formel | Serieux | Technique | Distant | Notes |
|-----------|--------|---------|-----------|---------|-------|
| Innocent | 2 | 2 | 1 | 2 | Phrases courtes, mots simples |
| Sage | 4 | 4 | 4 | 3 | Precision, pas de jargon inutile |
| Explorer | 2 | 2 | 2 | 2 | Recit, mouvement, espace |
| Outlaw | 1 | 3 | 1 | 1 | Direct, sans fioritures |
| Magician | 3 | 3 | 2 | 2 | Evocateur, pas explicatif |
| Hero | 3 | 4 | 3 | 3 | Affirmatif, structure |
| Lover | 2 | 2 | 1 | 1 | Sensoriel, textures, proximite |
| Jester | 1 | 1 | 1 | 1 | Rythme rapide, rebonds |
| Regular Guy | 2 | 2 | 1 | 1 | Conversationnel, "nous" |
| Caregiver | 3 | 3 | 2 | 1 | Doux, rassurant, enveloppant |
| Ruler | 5 | 5 | 3 | 4 | Affirmatif, structure, autorite |
| Creator | 2 | 2 | 2 | 2 | Surprenant, libre, poetique |

## Construction du Champ Lexical

### Methode 3 colonnes

Pour chaque valeur de la plateforme, construire :

| Valeur | Mots qui INCARNENT | Mots qui CONTREDISENT | Mots NEUTRES a eviter |
|--------|--------------------|-----------------------|-----------------------|
| [Val1] | [mots forts] | [opposes a bannir] | [mots fades/generiques] |
| [Val2] | [mots forts] | [opposes a bannir] | [mots fades/generiques] |

### Mots a utiliser (10-15)

Selection depuis la colonne "INCARNENT". Criteres :
- Specifique au secteur (pas du marketing generique)
- Coherent avec le registre (pas de mot soutenu si ton familier)
- Evocateur (preferer "ancre" a "solide", "souffle" a "dynamique")

### Mots a eviter (8-10)

Selection depuis les colonnes "CONTREDISENT" et "NEUTRES". Pour chaque mot, justifier en 1 ligne.

## Personnalite — Format output

Chaque trait de personnalite dans tone.md doit avoir :
1. **Un adjectif** (pas un nom abstrait)
2. **Un exemple de phrase en situation reelle** (pas une description)
3. **Une derivation** vers un composant de la plateforme

### Bon exemple
```
- **Franc** : "On ne vous promet pas la lune. On vous promet un serrurier dans l'heure."
  <!-- Derive de : Archetype Hero > Manifestation > Ton -->
```

### Mauvais exemple (a eviter)
```
- **Professionnel** : "Notre ton est professionnel et inspire confiance."
  (Abstrait, auto-referentiel, non ancre)
```

## Exemples de phrases — Methode

La section "Bien" et "A eviter" de tone.md doit couvrir :

| Contexte | Minimum |
|----------|---------|
| Page d'accueil (Hero) | 1 exemple bien + 1 a eviter |
| Description de service | 1 exemple bien + 1 a eviter |
| CTA / bouton | 1 exemple bien + 1 a eviter |
| Contact / formulaire | 1 exemple bien + 1 a eviter |

Chaque "A eviter" explique POURQUOI c'est problematique (pas juste "trop generique").

## Tutoiement vs Vouvoiement — Arbre de decision

```
Le client a-t-il une preference explicite ?
├── Oui → Respecter
└── Non → Examiner :
    ├── Cible < 30 ans + secteur lifestyle/tech → Tutoiement
    ├── Cible B2B / premium / sante / juridique → Vouvoiement
    ├── Archetype Jester/Outlaw/Regular Guy → Tutoiement probable
    ├── Archetype Ruler/Sage/Caregiver → Vouvoiement probable
    └── Doute → Vouvoiement (defaut securitaire)
```

Toujours justifier le choix en le reliant a l'archetype ET au persona principal.
