# Etape D10 : Deploiement

> **Phase D-B : Code** - Mise en production de l'application.

## Prerequis

- `pipeline/output/validation-report.md` avec status **PASS**
- Comptes de deploiement configures

## Deploiement par Stack

### Option A : PWA (Next.js → Vercel/Netlify)

#### 1. Preparation

```bash
# Build de production
npm run build

# Test local du build
npm start
```

#### 2. Deploiement Vercel

```bash
# Push sur GitHub
git add .
git commit -m "Ready for production"
git push origin main

# Import sur Vercel
# 1. vercel.com > Add New Project
# 2. Importer le repository
# 3. Configurer les variables d'environnement
# 4. Deploy
```

#### 3. Configuration PWA

- Verifier `manifest.json` (nom, icones, theme_color)
- Verifier le service worker
- Tester l'installation ("Add to Home Screen")
- Verifier le mode offline (si applicable)

### Option B : React Native (Expo → App Store + Play Store)

#### 1. Configuration EAS Build

```bash
# Installer EAS CLI
npm install -g eas-cli

# Configurer le projet
eas build:configure

# Build iOS
eas build --platform ios --profile production

# Build Android
eas build --platform android --profile production
```

#### 2. Soumission App Store (iOS)

```bash
# Soumettre a l'App Store
eas submit --platform ios

# Prerequis :
# - Compte Apple Developer ($99/an)
# - App Store Connect configure
# - Screenshots prepares (6.7", 6.5", 5.5")
# - Description, mots-cles, categorie
# - Politique de confidentialite URL
```

#### 3. Soumission Play Store (Android)

```bash
# Soumettre au Play Store
eas submit --platform android

# Prerequis :
# - Compte Google Play Developer ($25 une fois)
# - Console Google Play configuree
# - Screenshots prepares
# - Description, categorie
# - Politique de confidentialite URL
# - Data Safety form rempli
```

### Option C : Flutter (→ App Store + Play Store)

#### 1. Build iOS

```bash
flutter build ios --release
# Ouvrir Xcode, archiver, uploader vers App Store Connect
```

#### 2. Build Android

```bash
flutter build appbundle --release
# Uploader l'AAB vers Google Play Console
```

## Variables d'Environnement Production

```env
# API
API_URL=https://api.[domain].com
N8N_WEBHOOK_URL=https://n8n.[domain].com/webhook

# Auth
AUTH_SECRET=[secret]

# Analytics
ANALYTICS_ID=[id]

# Push Notifications
PUSH_API_KEY=[key]
```

## Checklist Post-Deploiement

### Fonctionnel
- [ ] App accessible / installable
- [ ] HTTPS actif (PWA)
- [ ] Tous les ecrans chargent
- [ ] Authentification fonctionne
- [ ] API connectee et fonctionnelle
- [ ] Webhooks n8n fonctionnels

### Store (si natif)
- [ ] App publiee sur App Store
- [ ] App publiee sur Play Store
- [ ] Screenshots conformes
- [ ] Description complete
- [ ] Categorie correcte
- [ ] Politique de confidentialite liee

### Analytics
- [ ] Analytics configure et collecte des donnees
- [ ] Events tracking configure (si applicable)
- [ ] Crash reporting configure

### Monitoring
- [ ] Alertes erreurs configurees
- [ ] Monitoring uptime (PWA)
- [ ] Crash reports actifs (natif)

## Output

Creer `pipeline/output/deploy-report.md` :

```markdown
# Rapport de Deploiement

**Date** : [DATE]
**App** : [NOM_APP]
**Version** : [VERSION]

## URLs / Liens

- **PWA** : https://[domaine.com] (si applicable)
- **App Store** : https://apps.apple.com/app/[id] (si applicable)
- **Play Store** : https://play.google.com/store/apps/details?id=[id] (si applicable)

## Configuration

- **Hebergeur** : [Vercel / EAS / Firebase]
- **Stack** : [Next.js PWA / Expo / Flutter]
- **Version** : [version]

## Variables d'Environnement

| Variable | Configuree |
|----------|-----------|
| API_URL | Oui |
| AUTH_SECRET | Oui |
| ANALYTICS_ID | Oui |

## Services Connectes

- [ ] API Backend : Connecte
- [ ] n8n Webhooks : Connecte
- [ ] Analytics : Connecte
- [ ] Push Notifications : Connecte (si applicable)
- [ ] Crash Reporting : Connecte

## Validation Post-Deploy

- [x] App accessible
- [x] Auth fonctionne
- [x] Donnees chargent
- [x] Analytics actif
- [x] Performance OK

## Notes

[Notes additionnelles]
```

## Livraison Client

### Documentation a Fournir

1. **Acces**
   - URL de l'app (PWA) ou liens Store
   - Acces au dashboard admin (si applicable)
   - Acces analytics

2. **Guide d'Utilisation**
   - Comment mettre a jour le contenu
   - Contacts support
   - Procedure de signalement de bugs

3. **Technique**
   - Stack utilisee
   - Variables d'environnement
   - Procedure de mise a jour / nouvelle version
   - Procedure de soumission store (si natif)

## Validation Finale

- [ ] App en production accessible
- [ ] Donnees reelles fonctionnelles
- [ ] Analytics actif
- [ ] Documentation livree
- [ ] Client informe

---

## Projet Termine

Le workflow design est complet. L'application est en production.

**Prochaines actions possibles** :
- Monitoring et maintenance
- Iterations design (nouveau cycle D06-D08)
- Ajout de fonctionnalites (nouveau cycle D03-D08)
- Nouvelle version store (si natif)

---

**Version** : 1.0
**Phase** : D-B (Code - Finale)
**Dependances** : D09 (Validate)
**Produit pour** : Client / Production
