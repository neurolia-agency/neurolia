# Stack Technique Mobile

Ce document decrit les stacks techniques supportees par le template design mobile. La stack est **configuree par projet** en fonction de `tech-stack.md` (importe du template architecture).

## PWA (Progressive Web App)

### Technologies

| Technologie | Version | Usage |
|-------------|---------|-------|
| Next.js | 15+ | Framework React, App Router |
| React | 19+ | UI Library |
| TypeScript | 5+ | Typage statique |
| Tailwind CSS | 4+ | Styling (directive @theme) |

### Animations

| Technologie | Version | Usage |
|-------------|---------|-------|
| Motion | 12+ | Animations (ex Framer Motion) |
| Lenis | Latest | Smooth scroll |

### Formulaires

| Technologie | Version | Usage |
|-------------|---------|-------|
| react-hook-form | 7+ | Gestion formulaires |
| zod | 3+ | Validation schemas |
| sonner | Latest | Toasts notifications |

### UI

| Technologie | Usage |
|-------------|-------|
| Lucide React | Icones |
| next-pwa | Support PWA (manifest, service worker) |

### Installation

```bash
npx create-next-app@latest [nom] --typescript --tailwind --eslint --app --src-dir=false
npm install motion lenis react-hook-form @hookform/resolvers zod sonner lucide-react next-pwa
```

### Structure

```
app/
├── globals.css          # SOURCE UNIQUE design tokens (@theme)
├── layout.tsx           # Root layout + viewport meta
├── manifest.json        # PWA manifest
├── (tabs)/              # Tab navigation (layout groups)
│   ├── layout.tsx       # Bottom tab bar
│   ├── home/
│   ├── [tab2]/
│   └── profile/
├── (auth)/              # Auth screens
│   ├── login/
│   └── register/
└── [screens]/           # Stack screens

components/
├── layout/              # Header, ScreenWrapper, BottomNav
├── screens/             # Composants par ecran
└── ui/                  # Card, ListItem, EmptyState, etc.
```

---

## React Native (Expo)

### Technologies

| Technologie | Version | Usage |
|-------------|---------|-------|
| Expo | SDK 52+ | Framework React Native |
| React Native | 0.76+ | UI mobile native |
| TypeScript | 5+ | Typage statique |
| Expo Router | 4+ | File-based routing |

### Navigation

| Technologie | Usage |
|-------------|-------|
| @react-navigation/bottom-tabs | Bottom tab bar |
| @react-navigation/native-stack | Stack navigation |
| expo-router | File-based routing |

### Styling

| Technologie | Usage |
|-------------|-------|
| NativeWind | Tailwind pour React Native |
| react-native-reanimated | Animations performantes |
| react-native-gesture-handler | Gestures (swipe, pan, etc.) |

### Stockage & Auth

| Technologie | Usage |
|-------------|-------|
| expo-secure-store | Stockage securise (tokens) |
| expo-auth-session | OAuth / Social login |

### Installation

```bash
npx create-expo-app [nom] --template tabs
npx expo install expo-router expo-auth-session expo-secure-store
npx expo install react-native-reanimated react-native-gesture-handler
npm install nativewind tailwindcss @react-navigation/bottom-tabs
```

### Structure

```
app/
├── _layout.tsx          # Root layout
├── (tabs)/              # Tab navigation
│   ├── _layout.tsx      # Tab bar config
│   ├── index.tsx        # Home
│   ├── [tab2].tsx
│   └── profile.tsx
├── (auth)/
│   ├── login.tsx
│   └── register.tsx
└── [screen]/
    └── [id].tsx         # Detail screens

components/
├── layout/
├── screens/
└── ui/

constants/
├── theme.ts             # Design tokens
└── colors.ts            # Couleurs
```

---

## Flutter

### Technologies

| Technologie | Version | Usage |
|-------------|---------|-------|
| Flutter | 3.24+ | Framework UI cross-platform |
| Dart | 3.5+ | Langage |
| Material 3 | Latest | Design system |

### State Management

| Technologie | Usage |
|-------------|-------|
| flutter_riverpod | State management reactif |
| go_router | Navigation declarative |

### Stockage & Auth

| Technologie | Usage |
|-------------|-------|
| flutter_secure_storage | Stockage securise |
| firebase_auth | Authentification (optionnel) |

### Installation

```bash
flutter create --org com.[org] --project-name [nom] .
flutter pub add flutter_riverpod go_router flutter_secure_storage
```

### Structure

```
lib/
├── main.dart
├── theme/
│   └── theme.dart       # Design tokens
├── router/
│   └── router.dart      # GoRouter config
├── screens/
│   ├── home/
│   ├── [tab2]/
│   ├── profile/
│   └── auth/
├── widgets/
│   ├── layout/
│   └── ui/
├── providers/
│   └── auth_provider.dart
└── services/
    └── api_service.dart
```

---

## Patterns Communs (Toutes Stacks)

### Touch Targets

| Element | Taille minimum | Recommande |
|---------|---------------|------------|
| Bouton principal | 44px height | 48-56px |
| Icone d'action | 44x44px zone | 48x48px |
| Item de liste | 44px height | 56-72px |
| Bottom tab | 44px height | 56px |
| Input | 44px height | 48px |

### Spacing

| Usage | Valeur | Variable |
|-------|--------|----------|
| Padding ecran | 16px | --spacing-screen |
| Gap entre cards | 12px | --spacing-card-gap |
| Gap entre sections | 24px | --spacing-section |
| Padding compact | 8px | --spacing-compact |
| Header height | 56px | --header-height |
| Bottom tab height | 56px | --bottom-tab-height |

### Navigation Patterns

| Pattern | Quand | Implementation |
|---------|-------|----------------|
| Bottom Tab Bar | 3-5 destinations principales | Fixe en bas, toujours visible |
| Stack | Ecrans de detail, flux | Push/pop avec back button |
| Drawer | Navigation secondaire | Slide from left (optionnel) |
| Bottom Sheet | Actions contextuelles | Slide from bottom, draggable |
| Modal | Confirmations critiques | Overlay centre |

### Safe Areas

```
┌─────────────────────┐
│   env(safe-area-     │  iOS: 44-59px (selon device)
│   inset-top)         │  Android: status bar height
├─────────────────────┤
│                      │
│   Contenu            │
│                      │
├─────────────────────┤
│   env(safe-area-     │  iOS: 34px (home bar)
│   inset-bottom)      │  Android: navigation bar
└─────────────────────┘
```

---

*Template App Design v1.0 - Configure par projet selon tech-stack.md*
