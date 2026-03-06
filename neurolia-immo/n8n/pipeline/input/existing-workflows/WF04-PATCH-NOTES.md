# WF04 — Patch Notes

> Corrections appliquees au workflow WF04 (Creation taches menage)
> Derniere mise a jour : 2026-02-16

---

## Patch 1 : Nouvelle checklist checkin_prep (verification)

### Contexte

Le type de tache `checkin_prep` n'est pas un menage mais une **verification/accueil** avant l'arrivee du voyageur. La checklist actuelle melange preparation et verification. Elle doit refleter le fait qu'il s'agit uniquement de verifier que tout est en ordre.

### Noeud modifie

| Parametre | Valeur |
|-----------|--------|
| **Nom du noeud** | `Creer tache checkin_prep` |
| **Type** | Supabase (Insert) |
| **Champ modifie** | `checklist` (fieldId: `checklist`) |

> C'est un noeud Supabase, pas un noeud Code. La checklist est definie dans le champ `fieldValue` de la ligne `checklist` des parametres du noeud.

---

### 1.1 Comment modifier dans n8n

1. Ouvrir le noeud **"Creer tache checkin_prep"**
2. Dans les champs (Fields to Send), trouver la ligne **checklist**
3. Remplacer la valeur (fieldValue) par la nouvelle checklist ci-dessous

---

### 1.2 Checklist checkin_prep

**AVANT :** (valeur actuelle du fieldValue)
```
=[{"label":"Verifier la proprete generale","done":false},{"label":"Installer les draps propres","done":false},{"label":"Disposer les serviettes","done":false},{"label":"Verifier les produits d'accueil","done":false},{"label":"Verifier le fonctionnement du chauffage/climatisation","done":false},{"label":"Laisser les cles / verifier le digicode","done":false}]
```

**APRES :** (nouvelle valeur a coller dans fieldValue)
```
=[{"label":"Verifier que le menage check-out a bien ete effectue","done":false},{"label":"Verifier l'etat general du logement","done":false},{"label":"Verifier les produits d'accueil","done":false},{"label":"Verifier chauffage/climatisation","done":false},{"label":"Verifier cles/digicode","done":false},{"label":"Verifier le wifi","done":false}]
```

> **Important** : le `=` au debut est obligatoire — c'est un prefixe d'expression n8n.

---

### 1.3 Changements cles

| # | Avant | Apres |
|---|-------|-------|
| 1 | Verifier la proprete generale | Verifier que le menage check-out a bien ete effectue |
| 2 | Installer les draps propres | Verifier l'etat general du logement |
| 3 | Disposer les serviettes | Verifier les produits d'accueil |
| 4 | Verifier les produits d'accueil | Verifier chauffage/climatisation |
| 5 | Verifier le fonctionnement du chauffage/climatisation | Verifier cles/digicode |
| 6 | Laisser les cles / verifier le digicode | Verifier le wifi |

> - Toutes les taches sont maintenant des **verifications** (pas d'actions de preparation)
> - La premiere tache fait reference au menage check-out precedent
> - Le noeud "Creer tache checkout_clean" n'est **pas modifie**

---

### 1.4 Resultat

| Noeud | Modifie ? |
|-------|-----------|
| Creer tache checkout_clean | Non |
| **Creer tache checkin_prep** | **Oui — checklist remplacee** |

---

## Patch 2 : Creer les deux taches en un seul passage

### Contexte

Avant ce patch, le noeud "If" (checkout existant ?) avait cette logique :
- **Checkout existe** → verifie si checkin_prep necessaire
- **Pas de checkout** → cree le checkout_clean → **FIN**

Cela signifiait que le `checkin_prep` n'etait jamais cree au premier appel. Il fallait un deuxieme appel (quand le checkout existait deja) pour creer le checkin_prep. Les deux taches n'etaient donc pas creees ensemble.

### Solution

Connecter la sortie de "Creer tache checkout_clean" vers "Checkin prep necessaire ?" pour que les deux taches soient creees en un seul passage.

---

### 2.1 Cablage modifie

**AVANT :**
```
Get tache checkout existante → If (checkout existe ?)
                                  │
                    OUI ──→ Checkin prep necessaire ? → Creer checkin_prep → Get staff actif → ...
                    NON ──→ Creer tache checkout_clean (FIN — pas de checkin_prep)
```

**APRES :**
```
Get tache checkout existante → If (checkout existe ?)
                                  │
                    OUI ──→ Checkin prep necessaire ? → Creer checkin_prep → Get staff actif → ...
                    NON ──→ Creer tache checkout_clean → Checkin prep necessaire ? → ...
```

---

### 2.2 Connexion modifiee dans n8n

| Noeud source | Sortie | Ancien destination | Nouvelle destination |
|-------------|--------|-------------------|---------------------|
| `Creer tache checkout_clean` | main (sortie 0) | *(aucune — fin du flow)* | `Checkin prep necessaire ?` |

**Comment faire dans n8n :**
1. Tirer un cable depuis la sortie du noeud **"Creer tache checkout_clean"**
2. Connecter vers l'entree du noeud **"Checkin prep necessaire ?"**

> Les deux branches (OUI et NON du noeud "If") convergent maintenant vers "Checkin prep necessaire ?".

---

### 2.3 Resultat

| Scenario | Avant | Apres |
|----------|-------|-------|
| 1er appel (pas de checkout) | Cree checkout_clean uniquement | Cree checkout_clean **+ checkin_prep** |
| 2e appel (checkout existe) | Cree checkin_prep | Inchange (ne recree pas de doublon) |
| check_in < 24h | Pas de checkin_prep | Pas de checkin_prep (inchange) |

---

*Document mis a jour le 2026-02-16 (Patch 1 + Patch 2)*
