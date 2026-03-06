# Input - Donnees Client

Ce dossier contient toutes les donnees fournies par le client ou collectees lors du brief.

## Structure

```
input/
├── brief-client.md      # Questionnaire client rempli (OBLIGATOIRE)
└── assets/              # Logo, maquettes, documents fournis
```

## Fichiers

### brief-client.md (OBLIGATOIRE)

Le questionnaire client rempli. C'est le point d'entree de l'etape A01-Init.

**Sections a remplir** :
1. Informations generales (entreprise, contact)
2. Projet mobile (type, objectif, audience)
3. Features (MVP + Phase 2 avec priorites)
4. Integrations (APIs, n8n, services existants)
5. Contraintes mobiles (offline, push, geoloc, camera, etc.)
6. Identite visuelle (existante ou a creer)
7. Inspirations (apps aimees / a eviter)
8. Budget et timeline
9. Notes additionnelles

### assets/

Documents fournis par le client : logo, maquettes, specifications existantes.

**Formats acceptes** : PNG, JPG, SVG, PDF, DOCX
**Nommage** : `[type]-[description].[ext]`
- `logo-principal.svg`
- `maquette-ecran-accueil.png`
- `spec-api-existante.pdf`

## Regles

1. **Ne jamais modifier** les fichiers input/ pendant le pipeline
2. **Source de verite client** : En cas de doute, les donnees ici prevalent
3. **Versioning** : Si le client change d'avis, creer `brief-client-v2.md` (ne pas ecraser)

## Checklist Pre-Projet

Avant de demarrer A01-Init, verifier :

- [ ] `brief-client.md` rempli et valide par le client
- [ ] Logo fourni (si existant)
- [ ] Documentation API existante fournie (si applicable)
- [ ] Inspirations identifiees
- [ ] Contraintes mobiles connues

---

*App Architecture Template v1.0*
