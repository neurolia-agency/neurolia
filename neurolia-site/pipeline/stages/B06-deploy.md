# Étape 09 : Déploiement

## Objectif
Mettre le site en production et finaliser la livraison.

## Input
- `output/08-validation.md` avec statut **PASS**
- Site complet et validé

## Prérequis

**CRITICAL**: Ne pas déployer si `output/08-validation.md` indique FAIL.

- [ ] Validation passée (toutes métriques > 90)
- [ ] Aucune issue critique en suspens
- [ ] Domaine configuré
- [ ] Hébergement prêt

## Instructions

### 1. Préparation Build

```bash
# Créer le build de production
npm run build

# Ou si HTML statique
# Minifier CSS
npx csso input.css -o output.min.css

# Minifier JS
npx terser input.js -o output.min.js -c -m
```

### 2. Configuration Production

#### Fichiers à créer

**robots.txt**
```
User-agent: *
Allow: /

Sitemap: https://[domaine]/sitemap.xml
```

**sitemap.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[domaine]/</loc>
    <lastmod>[Date]</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://[domaine]/services</loc>
    <lastmod>[Date]</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://[domaine]/a-propos</loc>
    <lastmod>[Date]</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://[domaine]/contact</loc>
    <lastmod>[Date]</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

**_headers (Netlify) ou .htaccess**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

### 3. Déploiement

#### Option A : Netlify
```bash
# Install CLI
npm i -g netlify-cli

# Deploy preview
netlify deploy

# Deploy production
netlify deploy --prod
```

#### Option B : Vercel
```bash
# Install CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Option C : GitHub Pages
```bash
# Push to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

#### Option D : FTP/SFTP
```bash
# rsync vers serveur
rsync -avz --delete ./dist/ user@server:/var/www/html/
```

### 4. Configuration DNS

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| A | @ | [IP serveur] | 3600 |
| CNAME | www | [domaine] | 3600 |
| TXT | @ | [verification si nécessaire] | 3600 |

### 5. SSL/HTTPS

- [ ] Certificat Let's Encrypt installé
- [ ] Redirection HTTP → HTTPS configurée
- [ ] HSTS activé

### 6. Vérifications Post-Déploiement

```bash
# Vérifier que le site est accessible
curl -I https://[domaine]

# Vérifier le SSL
curl https://www.ssllabs.com/ssltest/analyze.html?d=[domaine]

# Vérifier les redirections
curl -I http://[domaine]
curl -I https://www.[domaine]
```

## Output

Créer `output/09-deploy.md` :

```markdown
# Rapport de Déploiement - [Nom du Projet]

**Date** : [Date]
**Version** : 1.0

## Informations

| Champ | Valeur |
|-------|--------|
| Domaine | [domaine.com] |
| Hébergeur | [Netlify/Vercel/Autre] |
| URL Production | [https://domaine.com] |
| URL Preview | [si applicable] |
| Date mise en ligne | [Date] |

## Checklist Déploiement

### Préparation
- [ ] Build production généré
- [ ] CSS/JS minifiés
- [ ] Images optimisées
- [ ] robots.txt créé
- [ ] sitemap.xml créé

### Configuration
- [ ] DNS configuré
- [ ] SSL/HTTPS actif
- [ ] Redirections configurées
- [ ] Headers sécurité ajoutés
- [ ] Cache configuré

### Vérifications
- [ ] Site accessible sur domaine principal
- [ ] Site accessible sur www
- [ ] HTTP redirige vers HTTPS
- [ ] Toutes les pages chargent
- [ ] Formulaire fonctionne
- [ ] Images chargent
- [ ] Pas d'erreurs console

### Analytics & Monitoring
- [ ] Google Analytics installé
- [ ] Google Search Console configuré
- [ ] Monitoring uptime configuré

## Accès

### Administration
- **Panel hébergeur** : [URL]
- **Login** : [email] (mot de passe dans gestionnaire)

### DNS
- **Registrar** : [Nom]
- **Panel** : [URL]

### Analytics
- **Google Analytics** : [ID]
- **Search Console** : [URL]

## Prochaines Actions

1. [ ] Soumettre sitemap à Google Search Console
2. [ ] Configurer alertes monitoring
3. [ ] Planifier première sauvegarde
4. [ ] Documenter procédure de mise à jour

## Notes

[Notes supplémentaires si applicable]

---

**Déployé par** : [Nom]
**Date** : [Date]
**Statut** : LIVE
```

## Validation Finale

- [ ] Site accessible sur le domaine
- [ ] HTTPS fonctionnel
- [ ] Toutes les pages chargent
- [ ] Formulaire envoie les emails
- [ ] Analytics reçoit les données
- [ ] Lighthouse en production > 85

## Livraison Client

### Documents à fournir
1. Rapport de validation (`output/08-validation.md`)
2. Rapport de déploiement (`output/09-deploy.md`)
3. Guide d'utilisation (si CMS)
4. Accès admin

### Communication
- [ ] Email de livraison envoyé
- [ ] Démonstration réalisée (si applicable)
- [ ] Formation client (si applicable)

---

## Félicitations !

Le site est maintenant en production. N'oubliez pas de :
- Configurer les sauvegardes automatiques
- Planifier les mises à jour de sécurité
- Monitorer les performances régulièrement
