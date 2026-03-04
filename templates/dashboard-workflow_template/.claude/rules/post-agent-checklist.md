# Regle : Checklist de verification humaine post-agent (IMMUABLE)

## Declencheur

Cette regle s'applique quand tu crees ou modifies un fichier dans :
- `src/*`
- `components/*`
- `app/*`

## Action OBLIGATOIRE

Apres CHAQUE completion de travail sur du code, tu DOIS fournir une checklist de verifications humaines. **Cette regle est NON-NEGOTIABLE** — l'agent ne peut pas terminer sans produire cette checklist.

## Ce que tu verifies (deterministe)

- `npm run build` passe ✓
- Pas d'erreurs TypeScript ✓
- Imports corrects ✓
- Fichiers crees aux bons emplacements ✓

## Ce que l'humain DOIT verifier (non-deterministe)

### Format de la checklist

```markdown
## Verifications humaines — [Nom de la tache/page]

### Visuel
- [ ] Ouvrir `http://localhost:3000/[route-exacte]`
- [ ] Verifier a 1920px : [details specifiques — alignements, espacements, couleurs]
- [ ] Verifier a 768px : [details tablette]
- [ ] Verifier a 375px : [details mobile — pas de debordement, lisibilite]

### Fonctionnel
- [ ] [Action precise] → doit [resultat attendu]
- [ ] [Action precise] → doit [resultat attendu]

### Donnees
- [ ] Les donnees Supabase s'affichent correctement
- [ ] Les listes ne sont pas vides (seed data presente)
- [ ] Les placeholders [A COMPLETER] sont visibles la ou attendus

### Navigation
- [ ] Lien "[nom]" mene a [route]
- [ ] Retour arriere fonctionne
- [ ] Breadcrumb affiche le bon chemin
- [ ] Sidebar/nav active sur la bonne page

### Securite
- [ ] En tant que [role restreint], je ne vois PAS [donnees interdites]
- [ ] Les routes protegees redirigent vers login quand non connecte
- [ ] Pas de service_role key expose cote client
```

## Regles

1. **Chaque URL doit etre exacte** — pas de `http://localhost:3000/...` generique
2. **Chaque action doit etre precise** — pas de "tester les interactions" generique
3. **Adapter la checklist au contexte** — pages CRUD, dashboard, auth, etc.
4. **Inclure la section Securite** si la page implique des donnees protegees ou du RBAC
5. **Omettre les sections non-applicables** plutot que de mettre du contenu generique
