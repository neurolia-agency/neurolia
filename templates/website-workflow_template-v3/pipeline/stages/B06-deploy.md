# Étape B6 : Déploiement

> **Phase B : Design / Vibe Coding** - Mise en production.

## Prérequis

- `output/07-validation.md` avec status **PASS** ou **PASS CONDITIONNEL**
- Repository Git propre (pas de fichiers non commités)
- Accès au compte hébergeur (Vercel recommandé)
- Nom de domaine configuré (si applicable)

---

## Objectif

Déployer le site en production, configurer le domaine, et livrer au client avec documentation.

## Déploiement sur Vercel

### 1. Préparation Repository

```bash
# Vérifier que tout est propre
git status

# Commit final si nécessaire
git add .
git commit -m "Production ready — validation B05 passed"
git push origin main
```

### 2. Import sur Vercel

1. [vercel.com](https://vercel.com) → "Add New Project"
2. Importer le repository
3. Framework preset : **Next.js** (auto-détecté)
4. Configurer les variables d'environnement
5. Deploy

### 3. Configuration Domaine

Dans Vercel : Settings > Domains > Ajouter le domaine personnalisé.

DNS chez le registrar :

| Type | Nom | Valeur |
|------|-----|--------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### 4. Variables d'Environnement

```env
# Dans Vercel Dashboard > Settings > Environment Variables

# Email service (Resend recommandé)
RESEND_API_KEY=re_xxxxx

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=xxxxx

# Autres services spécifiques au projet
# ...
```

> **Sécurité** : Ne JAMAIS commiter `.env.local`. Utiliser `.env.example` comme référence.

---

## Checklist Post-Déploiement

### Fonctionnel
- [ ] Site accessible sur le domaine custom
- [ ] HTTPS activé (automatique sur Vercel)
- [ ] Redirect www → apex (ou inverse) configuré
- [ ] Toutes les pages chargent sans erreur
- [ ] Formulaire contact fonctionne en production
- [ ] Emails reçus en production

### SEO
- [ ] `sitemap.xml` accessible (`[domaine]/sitemap.xml`)
- [ ] `robots.txt` correct (`[domaine]/robots.txt`)
- [ ] Google Search Console : soumettre le sitemap
- [ ] Open Graph tags : tester avec [opengraph.xyz](https://opengraph.xyz)

### Analytics
- [ ] Analytics configuré (Vercel Analytics / Plausible / autre)
- [ ] Événements trackés (si applicable) : clics CTA, soumissions formulaire

### Performance Production
- [ ] Lighthouse en production ≥ scores de B05
- [ ] Pas de régression performance post-deploy
- [ ] CDN Vercel actif (vérifier headers Cache-Control)

---

## Output

Créer `output/08-deploy.md` :

```markdown
# Rapport de Déploiement

**Date** : [DATE]
**Projet** : [NOM_PROJET]
**Environnement** : Production

## URLs

- **Production** : https://[domaine.com]
- **Vercel** : https://[projet].vercel.app
- **Admin Vercel** : https://vercel.com/[team]/[projet]

## Configuration

| Paramètre | Valeur |
|-----------|--------|
| Hébergeur | Vercel |
| Region | [ex: cdg1 (Paris)] |
| Framework | Next.js [version] |
| Node.js | [version] |

## DNS

| Type | Nom | Valeur | Status |
|------|-----|--------|--------|
| A | @ | 76.76.21.21 | ✅ Propagé |
| CNAME | www | cname.vercel-dns.com | ✅ Propagé |

## Variables d'Environnement

| Variable | Configurée | Service |
|----------|-----------|---------|
| RESEND_API_KEY | ✅ | Email contact |
| NEXT_PUBLIC_ANALYTICS_ID | ✅ | Analytics |

## Services Connectés

| Service | Status | Notes |
|---------|--------|-------|
| Email (Resend) | ✅ Configuré | [email@domaine.com] |
| Analytics | ✅ Configuré | [Service] |
| Search Console | ✅ Sitemap soumis | |

## Validation Post-Deploy

- [x] Site accessible
- [x] HTTPS actif
- [x] Formulaire fonctionnel
- [x] Analytics tracking
- [x] Lighthouse scores maintenus

## Notes

[Problèmes rencontrés, décisions prises, points d'attention pour maintenance]
```

---

## Livraison Client

### Documentation à fournir

1. **Accès**
   - URL du site en production
   - Accès Vercel dashboard (si client gère)
   - Accès repository GitHub (si applicable)

2. **Guide rapide** (si pas de CMS)
   - Comment demander des modifications de contenu
   - Contacts support / maintenance
   - Délais de réponse convenus

3. **Technique** (pour le mainteneur)
   - Stack utilisée (Next.js, Tailwind, Motion, Lenis)
   - Variables d'environnement nécessaires (`.env.example`)
   - Procédure de mise à jour (`git push` → auto-deploy)
   - Structure du projet (`pipeline/`, `components/`, `app/`)

---

## Validation Finale

- [ ] Site en production accessible et fonctionnel
- [ ] HTTPS actif, domaine configuré
- [ ] Formulaires fonctionnels en production
- [ ] Analytics actif et tracking
- [ ] SEO : sitemap soumis, robots.txt OK
- [ ] Documentation livrée au client
- [ ] Client informé et satisfait
- [ ] `output/08-deploy.md` créé

---

## Projet Terminé

Le workflow pipeline A01 → B06 est complet. Le site est en production.

**Prochaines actions possibles** :
- Monitoring et maintenance continue
- Itérations design (nouveau cycle B02 → B05 ciblé)
- Ajout de fonctionnalités (blog, CMS, i18n)
- Optimisation conversion (A/B testing, heatmaps)

---

**Version** : 2.0
**Phase** : B6 (Design / Vibe Coding - Finale)
**Dépendances** : B5 (Validate)
**Produit pour** : Client / Production
