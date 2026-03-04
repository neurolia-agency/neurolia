# B03 — Dashboard : Vues Dashboard + KPIs

## Objectif

Construire les vues dashboard principales : KPIs, calendrier/timeline, alertes, et vues synthetiques par role.

## Inputs

- `pipeline/output/04-wireframes/dashboard.md` — wireframe dashboard principal
- `pipeline/output/03-structure/data-model.md` — tables pour calculs KPIs
- `pipeline/output/02-design-system/constraints.md` — contraintes visuelles dashboard
- `app/globals.css` — tokens CSS
- `seed/seed-scenario.sql` — donnees de test

## Agent

**`dashboard-ui-builder`** (sonnet)

## Processus

### 1. KPIs Cards

Pour chaque KPI defini dans le PRD :

```typescript
// src/components/dashboard/kpi-card.tsx
type KPICardProps = {
  label: string
  value: number | string
  trend?: { value: number; direction: 'up' | 'down' }
  icon: LucideIcon
}
```

**Regles** :
- Calculs cote serveur (Server Component ou Server Action)
- Afficher la tendance (vs periode precedente) si applicable
- Couleur semantique pour la tendance (success = up bon, error = up mauvais)
- Skeleton pendant le chargement

### 2. Calendrier / Timeline (si applicable)

Selon le domaine metier :
- **Calendrier mensuel** : vue par mois avec evenements par jour
- **Timeline** : chronologie des evenements recents
- **Gantt simplifie** : vue par semaine avec barres de duree

**Regles** :
- Dates relatives : "Aujourd'hui", "Demain", "Lundi prochain"
- Navigation : mois precedent/suivant ou scroll infinite
- Clic sur un jour/evenement → detail ou modale

### 3. Alertes / Notifications

```typescript
// src/components/dashboard/alerts-panel.tsx
type Alert = {
  id: string
  type: 'warning' | 'error' | 'info'
  title: string
  description: string
  action?: { label: string; href: string }
  created_at: string
}
```

**Regles** :
- Trier par priorite (error > warning > info)
- Limiter a 5 alertes visibles, "Voir tout" pour le reste
- Badge count sur l'icone notification du header
- Realtime si applicable (Supabase Realtime)

### 4. Vue "Aujourd'hui" (si applicable)

Resume des evenements et taches du jour :
- Evenements a venir
- Taches en cours / a faire
- Derniere activite

### 5. Vues par Role

Chaque role voit un dashboard adapte :
- **Role principal** : KPIs + calendrier + alertes + vue globale
- **Role secondaire** : taches du jour + prochaines actions + profil rapide

### 6. Graphiques (si applicable)

Utiliser **Recharts** pour les visualisations :
- Bar chart pour les comparaisons
- Line chart pour les tendances
- Pie/donut pour les repartitions

**Regles** :
- Couleurs du design system (`--color-primary`, `--color-success`, etc.)
- Tooltips avec donnees precises
- Responsive (resize automatique)
- Pas de graphique sans donnees — empty state a la place

## Validation

- [ ] `npm run build` sans erreurs
- [ ] KPIs affichent des valeurs calculees (pas hardcoded)
- [ ] Calendrier/timeline navigable (mois precedent/suivant)
- [ ] Alertes triees par priorite
- [ ] Clic sur alerte → page de detail
- [ ] Badge notifications mis a jour
- [ ] Graphiques responsive et avec tooltips
- [ ] Vues differentes par role
- [ ] Donnees seed affichees correctement
- [ ] Skeletons pour tous les blocs asynchrones
- [ ] Mobile : KPIs en grille 2 colonnes, calendrier adapte
