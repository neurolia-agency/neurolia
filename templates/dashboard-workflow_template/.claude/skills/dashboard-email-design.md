---
name: dashboard-email-design
description: Methodologie design-first pour le contenu des emails transactionnels. Use when planning email content, writing email briefs, designing content hierarchy, or validating email content before HTML assembly.
---

# Skill : dashboard-email-design

Methodologie de conception de contenu email. A utiliser AVANT d'assembler le HTML (skill `dashboard-email-templates`).

> **Principe fondamental** : Chaque email a UN objectif et UNE action. Tout contenu qui ne sert ni a comprendre ni a agir doit etre supprime.

> **Skills associes** :
> - `dashboard-email-templates` — templates HTML, composants, mapping tokens
> - `dashboard-email-n8n` — configuration emailSend n8n, emails auth Supabase

---

## 1. Email Design Brief (OBLIGATOIRE avant tout HTML)

Avant d'ecrire la moindre ligne de HTML, remplir ce brief pour chaque email du projet. Les reponses proviennent de `pipeline/output/03-structure/webhook-map.md` et du PRD.

```markdown
## Brief email — [NOM_EMAIL]

**Objectif unique** : [1 phrase — qu'est-ce que le destinataire doit FAIRE ou COMPRENDRE ?]
**Trigger** : [Evenement declencheur precis — ex: insertion table X, schedule, action utilisateur]
**Destinataire** : [Role + contexte — ex: "Owner, sur son telephone, probablement occupe"]
**Moment de reception** : [Quand l'email arrive — en temps reel, le matin, hebdo]
**Device probable** : [Mobile / Desktop / Les deux]

### Donnees disponibles (depuis n8n $json)
| Champ | Type | Exemple | Inclure ? | Justification |
|-------|------|---------|-----------|---------------|
| [champ] | [type] | [valeur exemple] | Oui/Non | [Pourquoi ce champ est utile ou inutile] |

### Hierarchie de contenu (ordre de lecture)
1. [Information la plus importante — ce que l'oeil doit voir en premier]
2. [Information secondaire — contexte necessaire]
3. [Action — CTA ou lien]

### Ce qu'on EXCLUT (et pourquoi)
- [Info X] — deja visible dans le dashboard, inutile de la repeter
- [Info Y] — trop detaille pour un email, renvoyer vers le dashboard
```

**Regle** : Si un champ disponible dans `$json` n'a pas de justification claire pour etre dans l'email, il n'y est pas. Le dashboard existe pour les details — l'email sert a alerter et diriger.

---

## 2. Regles de hierarchie de contenu

**Structure universelle d'un email transactionnel** :

```
[TITRE — 5-8 mots max, contient l'info cle]
[CONTEXTE — 1-2 phrases max, ce que le destinataire doit savoir]
[DONNEES ESSENTIELLES — bloc compact, uniquement les champs critiques]
[CTA — 1 seul bouton, 2-4 mots, verbe d'action]
[MENTION LEGALE — 1 ligne, footer]
```

**Regles de concision** :

| Regle | Mauvais | Bon |
|-------|---------|-----|
| Titre = info cle, pas salutation | "Bonjour, vous avez une notification" | "Reservation #R-412 confirmee" |
| Pas de paragraphes d'introduction | "Nous vous informons que votre reservation a bien ete prise en compte..." | (supprimer — le titre suffit) |
| Donnees en bloc, pas en phrases | "Le check-in est prevu le 15 mars a 14h et le check-out le 18 mars a 11h." | Check-in : 15 mars 14h / Check-out : 18 mars 11h (bloc key-value) |
| 1 CTA, pas 3 | "Voir / Modifier / Contacter" | "Voir la reservation" (le reste est dans le dashboard) |
| Pas de repetition titre-corps | Titre "Reservation confirmee" + corps "Votre reservation est confirmee" | Titre suffit, le corps donne le contexte unique |

---

## 3. Patterns de presentation de donnees

### Planning / dates (ex: reservations, rendez-vous, taches)

**Anti-pattern** : lister toutes les dates en paragraphes de texte.

**Pattern correct** : bloc compact avec structure visuelle claire.

```html
<!-- Planning compact — 1 ligne par evenement, dates alignees -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;">
  <tr>
    <td style="padding:8px 12px; font-size:13px; color:[TEXT_MUTED]; width:100px; vertical-align:top;">
      Lun 15 mars
    </td>
    <td style="padding:8px 12px; font-size:13px; color:[TEXT_PRIMARY]; border-left:2px solid [COLOR_PRIMARY];">
      <strong>14:00</strong> — Check-in Villa Mer
    </td>
  </tr>
  <tr>
    <td style="padding:8px 12px; font-size:13px; color:[TEXT_MUTED]; width:100px; vertical-align:top;">
      Jeu 18 mars
    </td>
    <td style="padding:8px 12px; font-size:13px; color:[TEXT_PRIMARY]; border-left:2px solid [BORDER_SUBTLE];">
      <strong>11:00</strong> — Check-out Villa Mer
    </td>
  </tr>
</table>
```

**Regles plannings** :
- Maximum 5-7 lignes. Au-dela, afficher les 3 prochains + "Voir tout dans le dashboard"
- Format date court : `Lun 15 mars` (pas "Lundi 15 Mars 2026")
- Heure en gras, description apres tiret
- Ligne de couleur primaire pour l'evenement le plus important/imminent

### Statuts / etats

```html
<!-- Pastille statut inline -->
<span style="display:inline-block; padding:2px 8px; border-radius:4px; font-size:11px; font-weight:600;
  background-color:[COLOR_SUCCESS_LIGHT]; color:[COLOR_SUCCESS];">
  Confirme
</span>
```

Palette de statuts (utiliser les couleurs semantiques du design system) :
- Confirme/Actif/OK → `success` (vert)
- En attente/Pending → `warning` (orange)
- Annule/Erreur → `danger` (rouge)
- Info/Nouveau → `info` (bleu)

### Montants / chiffres cles

```html
<!-- Chiffre cle — gros, centre, avec label -->
<div style="text-align:center; margin:16px 0;">
  <p style="margin:0; font-size:28px; font-weight:700; color:[COLOR_PRIMARY];">{{ $json.amount }} &euro;</p>
  <p style="margin:4px 0 0; font-size:12px; color:[TEXT_MUTED];">Revenu net cette semaine</p>
</div>
```

**Regle** : Un seul chiffre "hero" par email. Les autres chiffres en key-value compact (skill `dashboard-email-templates`, composant Bloc information).

### Listes d'items (taches, actions)

```html
<!-- Liste a puces compacte avec statut -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;">
  <tr>
    <td style="padding:6px 0; font-size:13px; color:[TEXT_PRIMARY];">
      <span style="color:[COLOR_SUCCESS];">&#10003;</span>&nbsp; Menage chambre 1
    </td>
  </tr>
  <tr>
    <td style="padding:6px 0; font-size:13px; color:[TEXT_PRIMARY];">
      <span style="color:[COLOR_WARNING];">&#9679;</span>&nbsp; Verifier stock serviettes
    </td>
  </tr>
  <tr>
    <td style="padding:6px 0; font-size:13px; color:[TEXT_MUTED]; text-decoration:line-through;">
      <span style="color:[TEXT_MUTED];">&#10003;</span>&nbsp; Accueil client 14h
    </td>
  </tr>
</table>
```

**Regle** : Maximum 5 items. Au-dela, montrer les plus urgents + lien "Voir les X taches restantes".

---

## 4. Anti-patterns de contenu (INTERDIT)

| Anti-pattern | Pourquoi c'est mauvais | Correction |
|-------------|----------------------|------------|
| Repeter le titre dans le corps | L'oeil lit deux fois la meme info | Le titre contient l'info cle, le corps donne le contexte complementaire |
| Paragraphes de texte pour des donnees | Illisible, non scannable | Blocs key-value ou tableaux compacts |
| Plusieurs CTA de meme importance | Le destinataire ne sait pas quoi cliquer | 1 CTA primaire (bouton), liens secondaires en texte discret |
| Formules de politesse longues | "Nous vous informons que...", "N'hesitez pas a..." | Aller droit au but. Le ton est donne par le design, pas par des formules |
| Toutes les donnees disponibles | L'email devient un ecran du dashboard | Seules les donnees necessaires a l'objectif. Le reste → CTA vers dashboard |
| Planning complet sur 30 jours | Personne ne lit 30 lignes dans un email | Les 3-5 prochains evenements + lien "Voir le planning complet" |
| Montants sans contexte | "150 €" ne dit rien | "150 € — Revenu net cette semaine (+12%)" |
| Statut sans couleur | "Statut: En attente" en texte noir | Pastille coloree (couleurs semantiques du design system) |

---

## 5. Processus design-first (7 etapes)

### Responsabilite agents

| Tache | Agent | Modele |
|-------|-------|--------|
| Brief email + design contenu + HTML | `dashboard-ui-builder` | sonnet |
| Wiring n8n (trigger, noeud emailSend, variables) | `integration-builder` | sonnet |
| Config Supabase auth emails | `integration-builder` | sonnet |

### Sources de verite

Les emails ne sont PAS inventes — ils derivent des artefacts pipeline :

| Source | Ce qu'elle fournit pour les emails |
|--------|-----------------------------------|
| `pipeline/output/01-brief/prd.md` | Personas (qui recoit, dans quel contexte, sur quel device) |
| `pipeline/output/01-brief/features.md` | Features qui declenchent des emails (F01, F02...) |
| `pipeline/output/03-structure/webhook-map.md` | Triggers concrets (evenements → emails) |
| `pipeline/output/03-structure/integrations.md` | Donnees disponibles dans chaque flux ($json fields) |
| `app/globals.css` | Tokens visuels a convertir en HEX inline |

### Etapes (design-first, pas HTML-first)

```
1. INVENTAIRE — Lister les emails necessaires
   Source : webhook-map.md + features.md
   Produit : tableau email/trigger/destinataire/objectif

2. BRIEF — Remplir le brief (section 1) pour CHAQUE email
   Source : PRD (personas, device, contexte) + integrations.md ($json fields)
   Produit : objectif unique, hierarchie contenu, exclusions

3. CONTENU — Rediger le contenu textuel AVANT le HTML
   Appliquer : regles de hierarchie (section 2), patterns donnees (section 3), anti-patterns (section 4)
   Produit : titre, contexte, donnees, CTA — en texte brut, valide par l'humain

4. TOKENS — Extraire les valeurs de globals.css → HEX
   Source : app/globals.css + table mapping (skill `dashboard-email-templates`, section 1)
   Produit : palette HEX inline prete pour le HTML

5. HTML — Assembler avec template de base + composants
   Utiliser : skill `dashboard-email-templates` (sections 2-3)
   Le contenu est DEJA valide — on ne fait que l'habiller

6. WIRING — Integrer dans n8n emailSend
   Utiliser : skill `dashboard-email-n8n`
   Champ html + champ text (version plain text) + variables {{ $json.field }}

7. TEST — Envoyer via Mailtrap/Ethereal
   Verifier : Gmail + Outlook + mobile (320px + 600px)
```

**Regle critique** : L'etape 3 (contenu) doit etre validee par l'humain AVANT de passer au HTML. Un email bien redige dans un mauvais template est mieux qu'un beau HTML avec du contenu inutile.

---

## 6. Checklists validation

### Contenu (AVANT le HTML)
- [ ] Brief rempli avec objectif unique et hierarchie
- [ ] Chaque donnee incluse a une justification ("pourquoi dans l'email et pas dans le dashboard ?")
- [ ] Pas de repetition entre titre et corps
- [ ] Maximum 1 CTA principal
- [ ] Plannings limites a 5 lignes max
- [ ] Formules de politesse absentes (le ton est dans le design, pas dans les mots)

### Technique (APRES le HTML)
- [ ] HTML valide (pas de balises non fermees)
- [ ] Responsive (tester a 600px et 320px)
- [ ] Couleurs coherentes avec le dashboard (tokens convertis)
- [ ] Variables n8n `{{ }}` correctement inserees
- [ ] Version texte presente (champ `text` du noeud emailSend)
- [ ] Nom du projet dans le header
- [ ] Lien dashboard dans le footer
- [ ] Teste sur Gmail, Outlook, Apple Mail
