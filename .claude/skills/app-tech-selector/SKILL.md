---
name: app-tech-selector
description: Matrice de decision tech mobile (PWA vs React Native vs Flutter vs Natif) basee sur les contraintes projet
argument-hint: "<chemin-vers-01-brief/>"
---

<objective>
Evaluer les options techniques pour une application mobile (PWA, React Native/Expo, Flutter, Natif) en se basant sur les contraintes du projet, produire une decision argumentee avec matrice de scoring ponderee, et fournir un guide de setup complet pour la stack retenue.
</objective>

<quick_start>
**Usage via APEX :**

```bash
/apex -a -s executer A05-tech-stack depuis pipeline/stages/A05-tech-stack.md
```

**Usage direct :**

Lire `pipeline/output/01-brief/` et produire :
- `pipeline/output/05-tech/tech-stack.md`
- `pipeline/output/05-tech/project-setup.md`
</quick_start>

<inputs>
| Fichier | Requis | Description |
|---------|--------|-------------|
| `pipeline/output/01-brief/prd.md` | Oui | PRD avec contraintes techniques et business |
| `pipeline/output/01-brief/features.md` | Oui | Features avec contraintes mobiles (offline, push, GPS, etc.) |
</inputs>

<outputs>

### tech-stack.md

Structure requise :
- **Decision** : stack retenue + justification en 2-3 phrases
- **Matrice de Decision** : tableau comparatif 4 options, 8 criteres ponderes, score total
- **Guide de Decision Rapide** : quand choisir chaque option (conditions)
- **Contraintes Specifiques du Projet** : tableau contrainte/impact sur le choix
- **Stack Detaillee** : tableau composant/technologie/version/justification pour frontend et backend
- **Outils** : CI/CD, monitoring, analytics, automations (n8n)

### project-setup.md

Structure requise :
- **Pre-requis** : tableau outil/version/installation
- **Initialisation** : commandes de creation du projet
- **Dependances** : commandes d'installation
- **Configuration** : variables d'environnement completes
- **Structure du projet** : arbre de fichiers
- **Scripts de developpement** : commandes dev, build, test, lint
- **Checklist de Setup** : verification que tout fonctionne

</outputs>

<workflow>

### Etape 1 : Analyser les contraintes
Extraire du PRD et des features :
- Plateformes cibles (iOS, Android, Web)
- Features natives requises (offline, push, geoloc, camera, biometrie, bluetooth/NFC)
- Budget et timeline
- Competences de l'equipe (si mentionnees)
- Exigences de performance

### Etape 2 : Scorer les options
Remplir la matrice avec 8 criteres ponderes :

| Critere | Poids par defaut | Notes |
|---------|-----------------|-------|
| Presence Store | 20% | Augmenter si store requis |
| Mode Offline | 15% | Augmenter si offline critique |
| Features Natives | 15% | Augmenter si camera/GPS/bio essentiels |
| Budget | 15% | Augmenter si budget tres limite |
| Performance | 10% | Augmenter si animations critiques |
| Time-to-Market | 10% | Augmenter si deadline serree |
| Ecosphere / Libs | 10% | Augmenter si integrations complexes |
| Competences Equipe | 5% | Augmenter si equipe imposee |

Ajuster les poids selon le contexte projet. Scorer de 1 a 5 chaque option.

### Etape 3 : Decider
- Retenir l'option avec le score le plus eleve
- Si deux options sont proches (< 0.5 de difference), justifier le choix par les contraintes bloquantes
- Documenter les contraintes qui ont fait pencher la balance

### Etape 4 : Produire le guide de setup
Pour la stack retenue :
- Lister les pre-requis avec versions exactes
- Fournir les commandes d'initialisation copier-coller
- Lister toutes les dependances a installer
- Fournir le `.env` complet
- Decrire la structure du projet
- Fournir les scripts de developpement

</workflow>

<decision_matrix>

### Comparaison detaillee

| Critere | PWA (Next.js) | React Native (Expo) | Flutter | Natif (Swift/Kotlin) |
|---------|---------------|---------------------|---------|---------------------|
| **Distribution** | URL (pas de store) | App Store + Google Play | App Store + Google Play | App Store + Google Play |
| **Offline** | Service Workers (limite) | AsyncStorage + SQLite + WatermelonDB | Hive, Isar, Drift | Core Data (iOS), Room (Android) |
| **Push** | Web Push (limite iOS) | expo-notifications (natif) | firebase_messaging | APNs (iOS), FCM (Android) |
| **Camera** | MediaDevices API (limite) | expo-camera (natif) | camera plugin | AVFoundation (iOS), CameraX (Android) |
| **GPS** | Geolocation API | expo-location (natif) | geolocator plugin | CoreLocation (iOS), LocationManager (Android) |
| **Biometrie** | WebAuthn (limite) | expo-local-authentication | local_auth plugin | Face ID/Touch ID, Fingerprint |
| **Bluetooth/NFC** | Web Bluetooth (experimental) | react-native-ble-plx | flutter_blue | CoreBluetooth, NearbyManager |
| **Performance** | Web (60fps si optimise) | Bridge JS → Natif (Hermes) | Compile natif (Skia) | Natif pur |
| **Hot Reload** | Fast Refresh | Fast Refresh | Hot Reload | Preview (Xcode), Compose Preview |
| **Bundle Size** | Premiere visite (lazy load) | ~15-30MB | ~10-25MB | ~5-15MB |
| **Cout Dev** | 1x (1 codebase web) | 1.3x (1 codebase, bridges natifs) | 1.3x (1 codebase Dart) | 2.5x (2 codebases) |
| **Maintenance** | Simple (web standard) | Moyenne (mises a jour Expo SDK) | Moyenne (mises a jour Flutter SDK) | Elevee (2 codebases + OS updates) |
| **SEO** | Excellent (SSR) | N/A (app native) | N/A (app native) | N/A (app native) |

### Quand choisir quoi

**PWA (Next.js)** :
- Pas de presence Store requise
- Budget limite (< 5k EUR)
- Features web suffisantes
- Equipe web existante
- SEO important

**React Native (Expo)** :
- Store requis
- Features natives moderees (camera, GPS, push)
- Equipe JavaScript/React
- Budget moyen (5-15k EUR)
- Ecosystem NPM valorise

**Flutter** :
- Performance critique (animations fluides, listes lourdes)
- Design custom pousse
- Budget moyen a eleve (10-30k EUR)
- Projet long terme
- Equipe prete pour Dart

**Natif (Swift/Kotlin)** :
- AR/VR, performances critiques
- Hardware specifique (Bluetooth LE, NFC avance)
- Budget eleve (> 30k EUR)
- Exigences Apple/Google specifiques
- Equipe native existante

</decision_matrix>

<constraints>
- **Scores justifies** : chaque score 1-5 doit avoir une justification liee aux contraintes du projet
- **Poids adaptatifs** : ajuster les poids par defaut selon le contexte (un projet offline-first augmente le poids offline)
- **Pas de biais** : ne pas favoriser une technologie par defaut. Laisser les contraintes decider
- **Setup actionnable** : le project-setup.md doit etre directement executable (commandes copier-coller)
- **Versions exactes** : specifier les versions de chaque outil et dependance
- **Variables d'environnement** : lister TOUTES les env vars necessaires, meme si la valeur est a definir
- **Pas de code applicatif** : le setup initialise le projet mais ne code pas de features
</constraints>

<quality_gates>
- [ ] Matrice de decision complete avec scores justifies
- [ ] Poids adaptes aux contraintes specifiques du projet
- [ ] Justification claire du choix de stack (2-3 phrases)
- [ ] Impact des contraintes projet documente
- [ ] Stack frontend detaillee (framework, navigation, state, UI, animations)
- [ ] Stack backend detaillee (runtime, framework, BDD, auth, hosting)
- [ ] Outils documentes (CI/CD, monitoring, analytics, n8n)
- [ ] Guide de setup avec pre-requis et versions exactes
- [ ] Commandes d'initialisation copier-coller
- [ ] Variables d'environnement completes
- [ ] Structure du projet fournie
- [ ] Checklist de setup fournie
- [ ] Aucun placeholder `[texte]` restant dans les outputs
</quality_gates>
