# Etape D05 : App Setup

> **Phase D-B : Code** - Scaffold du projet et configuration de base.

## Objectif

Creer le projet applicatif avec la stack technique definie, configurer l'authentification de base, et mettre en place le layout principal (navigation shell).

## Input

| Fichier | Usage |
|---------|-------|
| `pipeline/input/imports/tech-stack.md` | Stack technique choisie |
| `pipeline/output/04-design-tokens/` | Fichier de tokens (globals.css / theme.ts / theme.dart) |
| `pipeline/input/imports/navigation-map.md` | Structure de navigation |

## Instructions par Stack

### Option A : Next.js PWA

```bash
# Creer le projet
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false

# Dependances
npm install motion lenis react-hook-form @hookform/resolvers zod sonner lucide-react

# PWA support
npm install next-pwa
```

**Configuration** :
1. Copier `pipeline/output/04-design-tokens/globals.css` vers `app/globals.css`
2. Configurer `next.config.js` avec PWA
3. Creer `public/manifest.json`
4. Configurer le layout racine avec les meta viewport mobile

### Option B : Expo / React Native

```bash
# Creer le projet
npx create-expo-app . --template tabs

# Dependances
npx expo install expo-router expo-auth-session expo-secure-store
npx expo install react-native-reanimated react-native-gesture-handler
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install nativewind tailwindcss
```

**Configuration** :
1. Copier `pipeline/output/04-design-tokens/theme.ts` dans `constants/`
2. Configurer `app.json` (nom, icone, splash)
3. Setup NativeWind (tailwind pour RN)
4. Configurer le router avec les tabs

### Option C : Flutter

```bash
# Creer le projet
flutter create --org com.[org] --project-name [nom] .

# Dependances (pubspec.yaml)
flutter pub add flutter_riverpod go_router
flutter pub add flutter_secure_storage
```

**Configuration** :
1. Copier `pipeline/output/04-design-tokens/theme.dart` dans `lib/theme/`
2. Configurer le router avec GoRouter
3. Setup le state management (Riverpod)

## Layout Principal (Navigation Shell)

Creer la structure de navigation selon `navigation-map.md` :

### Bottom Tab Bar (3-5 tabs)

```
┌─────────────────────────────────┐
│         Status Bar (safe)        │
├─────────────────────────────────┤
│         Header (56px)            │
│  [Back] [Titre] [Action]        │
├─────────────────────────────────┤
│                                  │
│         Contenu ecran            │
│         (scrollable)             │
│                                  │
├─────────────────────────────────┤
│  [Tab1] [Tab2] [Tab3] [Tab4]   │
│         Bottom Tab (56px)        │
├─────────────────────────────────┤
│         Home Bar (safe)          │
└─────────────────────────────────┘
```

### Composants a Creer

| Composant | Type | Responsabilite |
|-----------|------|---------------|
| Navigation Shell | Layout | Bottom tabs + stack navigation |
| Header | Shared | Titre + actions contextuelles |
| Screen Wrapper | Layout | Safe areas + scroll + padding |

## Authentification de Base

Configurer le flow d'authentification minimal :

1. **Ecran Login** : Email/password + social login (placeholder)
2. **Ecran Register** : Formulaire creation compte (placeholder)
3. **Auth Context/Provider** : Etat d'authentification global
4. **Route Guard** : Redirection si non authentifie
5. **Stockage token** : SecureStore (RN) / httpOnly cookie (PWA)

**Note** : L'implementation reelle de l'auth sera connectee en D07. Ici on prepare la structure.

## Output

```
[projet]/
├── app/ ou src/          # Code source
│   ├── layout (racine)   # Navigation shell
│   ├── (tabs)/           # Ecrans principaux
│   │   ├── home/
│   │   ├── [tab2]/
│   │   ├── [tab3]/
│   │   └── profile/
│   └── (auth)/           # Ecrans auth
│       ├── login/
│       └── register/
├── components/           # Composants partages
│   ├── layout/           # Header, ScreenWrapper
│   └── ui/               # Boutons, inputs de base
├── constants/            # Theme, config
├── hooks/                # useAuth, etc.
└── [config files]
```

## Validation

- [ ] Projet scaffolde et demarre sans erreur
- [ ] Design tokens integres
- [ ] Navigation bottom tabs fonctionnelle
- [ ] Stack navigation fonctionnelle (push/pop)
- [ ] Safe areas respectees (encoche + barre home)
- [ ] Auth flow structure (login → app, pas de connexion reelle)
- [ ] Header avec titre dynamique
- [ ] Ecran wrapper avec padding et scroll

## Prochaine Etape

→ `stages/D06-core-screens.md`

---

**Version** : 1.0
**Phase** : D-B (Code)
**Dependances** : D04 (Design Tokens), imports (tech-stack.md, navigation-map.md)
**Produit pour** : D06 (Core Screens)
