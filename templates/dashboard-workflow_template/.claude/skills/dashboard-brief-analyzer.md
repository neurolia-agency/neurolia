# Skill : dashboard-brief-analyzer

Analyse un brief client et produit un PRD structuré pour un dashboard Next.js avec auth, RLS Supabase et intégrations n8n.

---

## 1. Procédure d'analyse

### Étape 1 — Lire le brief existant

```
pipeline/input/brief-client.md
```

Identifier ce qui est présent et ce qui manque avant de poser des questions.

### Étape 2 — Questions client (AskUserQuestion)

Poser les questions manquantes dans cet ordre de priorité. Ne pas poser une question dont la réponse est déjà dans le brief.

#### Bloc A — Rôles et accès

- Quels sont les rôles utilisateurs (ex: admin, manager, opérateur, client) ?
- Chaque rôle a-t-il un tableau de bord différent, ou une vue unique avec permissions ?
- Y a-t-il des clients finaux (B2C) qui se connectent, ou seulement des équipes internes ?
- Un utilisateur peut-il appartenir à plusieurs organisations (multi-tenant) ?

#### Bloc B — Infrastructure n8n existante

- n8n est-il déjà installé ? Si oui, sur Hostinger ou autre hébergeur ?
- Quel est le domaine n8n (ex: `n8n.mondomaine.com`) ?
- Y a-t-il des workflows n8n existants à conserver / connecter ?
- Quels workflows n8n sont prévus (ex: notifications, synchronisation, alertes) ?

#### Bloc C — Données et sources

- Quelle est la source principale de données (Supabase existant, nouvelle base, API externe) ?
- Y a-t-il des données temps réel (polling suffisant, ou websockets nécessaires) ?
- Quels sont les volumes approximatifs (lignes en base, utilisateurs simultanés) ?
- Y a-t-il des imports/exports de données (CSV, Excel, PDF) ?

#### Bloc D — Appareils et contexte d'usage

- Sur quels appareils les utilisateurs accèdent-ils au dashboard ?
  - Desktop uniquement
  - Desktop + tablette
  - Mobile inclus (terrain, techniciens, livreurs)
- Le dashboard est-il utilisé en déplacement (connexion faible, usage hors-ligne partiel) ?
- Quel rôle utilise principalement le mobile ?

#### Bloc E — KPIs et visualisations

- Quels sont les 3 à 5 chiffres clés à afficher en priorité (ex: réservations du jour, CA, stock) ?
- Des graphiques sont-ils nécessaires (courbes, barres, camembert) ? Sur quelle période ?
- Y a-t-il des alertes ou notifications prioritaires (ex: commande bloquée, seuil dépassé) ?

#### Bloc F — Intégrations existantes

- Quelles APIs externes sont utilisées (Stripe, Brevo, Airtable, Google Sheets, Booking.com, Airbnb, etc.) ?
- Y a-t-il un CRM ou ERP existant à connecter ?
- Des emails transactionnels sont-ils déjà gérés (Brevo, Mailjet, SendGrid) ?

---

## 2. Template PRD Dashboard

Après collecte des informations, produire ce PRD dans `pipeline/output/01-brief/PRD.md` :

```markdown
# PRD — [Nom du Projet] Dashboard

**Date** : [DATE]
**Version** : 1.0
**Statut** : Brouillon

---

## 1. Contexte et objectif

[Description du projet, problème résolu, bénéfice principal]

**KPI principal** : [Ex: Zéro réservation manquée / Commandes traitées en < 2h]

---

## 2. Rôles et permissions

| Rôle | Description | Vues accessibles | Niveau RLS |
|------|-------------|-----------------|------------|
| `admin` | [description] | Tout | Owner |
| `manager` | [description] | [vues] | Read/Write propre org |
| `operator` | [description] | [vues] | Read own |
| `client` | [description] | [vues] | Read own data |

### Multi-tenant

- [ ] Pas de multi-tenant (organisation unique)
- [ ] Multi-tenant par `organization_id`
- [ ] Multi-tenant par `user_id` direct

---

## 3. Pages et vues

### Pages authentifiées

| Route | Rôles autorisés | Description | Priorité |
|-------|----------------|-------------|----------|
| `/dashboard` | admin, manager | Vue principale | P0 |
| `/[section]` | [rôles] | [desc] | P1 |

### Pages publiques

| Route | Description |
|-------|-------------|
| `/login` | Connexion |
| `/signup` | Inscription (si applicable) |

---

## 4. KPIs et widgets prioritaires

| Widget | Données sources | Rôle | Priorité |
|--------|----------------|------|----------|
| [Nom KPI] | [table.colonne] | admin | P0 |

### Comparaisons temporelles requises

- [ ] N vs N-1 (semaine)
- [ ] N vs N-1 (mois)
- [ ] N vs N-1 (année)
- [ ] Pas de comparaison requise

---

## 5. Intégrations n8n

| Workflow | Déclencheur | Action | Direction |
|----------|-------------|--------|-----------|
| [Nom WF] | [event] | [action] | n8n → Next.js / Next.js → n8n |

### Infrastructure n8n

- **URL n8n** : `https://[n8n.domaine.com]`
- **Hébergeur** : Hostinger / Autre : [préciser]
- **Workflows existants** : [liste ou "aucun"]

---

## 6. Intégrations tierces

| Service | Usage | Sens | Credential requis |
|---------|-------|------|------------------|
| Supabase | Base de données + Auth | bidirectionnel | `SUPABASE_URL`, `SUPABASE_ANON_KEY` |
| Stripe | [si applicable] | Next.js → Stripe | `STRIPE_SECRET_KEY` |
| Brevo | Emails transactionnels | n8n → Brevo | `BREVO_API_KEY` |
| [autre] | [usage] | [sens] | [var] |

---

## 7. Contraintes techniques

### Appareils cibles

| Rôle | Appareil principal | Breakpoint critique |
|------|-------------------|---------------------|
| [rôle] | Desktop / Mobile / Tablette | [px] |

### Performance

- Refresh des données : [polling toutes les X secondes / manuel / temps réel]
- Volume données : [estimation lignes en base]
- Utilisateurs simultanés : [estimation]

---

## 8. Schéma de données (draft)

```sql
-- Tables principales identifiées
-- [liste des tables pressenties avec colonnes clés]
```

---

## 9. Hors périmètre (v1)

- [Feature exclue 1]
- [Feature exclue 2]

---

## 10. Questions ouvertes

| Question | Responsable | Deadline |
|----------|-------------|----------|
| [question] | [qui] | [date] |
```

---

## 3. Mapping features → workflows n8n

Utiliser ce tableau pour identifier quels workflows n8n sont nécessaires selon les features du PRD :

| Feature dashboard | Workflow n8n recommandé | Déclencheur |
|------------------|------------------------|-------------|
| Notification nouvelle commande | WF-notify-order | Supabase webhook → n8n → email/SMS |
| Alerte stock bas | WF-stock-alert | Cron toutes les heures → check stock → alerte |
| Synchronisation données externes | WF-sync-[source] | Cron quotidien |
| Onboarding utilisateur | WF-user-onboarding | Supabase Auth hook → n8n → email bienvenue |
| Rapport hebdomadaire | WF-weekly-report | Cron lundi 8h → agrégation → email PDF |
| Relance paiement | WF-payment-retry | Stripe webhook → n8n → email client |
| Export données | WF-export-csv | Webhook Next.js → n8n → génération CSV → upload S3 |

---

## 4. Intégrations existantes à prendre en compte

Documenter ici les contraintes héritées de l'infrastructure existante :

```markdown
## Intégrations existantes

### n8n
- URL : [url]
- Workflows actifs : [liste]
- Credentials configurés : [liste]
- Contraintes : [ex: pas de modification des workflows actifs en prod]

### Supabase
- Projet existant : Oui / Non
- Tables existantes à conserver : [liste]
- RLS déjà configurée : Oui / Non
- Auth provider : Email / Google / Magic Link

### APIs tierces actives
- [Service] : [usage actuel] — [contrainte migration]
```

---

## 5. Checklist de validation PRD

Avant de passer à l'étape A02 (design extraction), vérifier :

- [ ] Tous les rôles sont définis avec leurs permissions
- [ ] La stratégie multi-tenant est clarifiée
- [ ] Les KPIs P0 sont listés avec leur source de données
- [ ] Les intégrations n8n sont mappées à des features
- [ ] Les appareils cibles par rôle sont confirmés
- [ ] Les intégrations existantes sont documentées
- [ ] Les questions ouvertes ont un responsable
- [ ] Le PRD est validé par le client avant de continuer
