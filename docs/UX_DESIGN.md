# Design & UX — Fin'djournée

> Principes d'expérience utilisateur et design de l'interface.

---

## 1. Philosophie

Fin'djournée est un outil de **saisie d'heures rétrospective pour les agents de terrain** (chantiers, BTP, services). Le nom vient du rituel quotidien : à la fin de la journée, je note ce que j'ai fait.

**L'agent n'est pas devant son PC** : il peut passer des jours sans ouvrir l'app. Quand il l'ouvre, c'est pour déclarer des heures déjà passées, pas pour chronométrer du temps réel. Le chrono est un anti-pattern pour ce cas d'usage.

**Cible prioritaire** : l'agent sur le terrain, pas de PC, pas le temps, pas envie de "se faire chier avec ça tous les soirs".

> "Je ne veux pas y passer plus de 10 minutes."

**Cible secondaire** : l'agent de bureau qui compile, exporte, facture.

### Parcours type

| Quand | Contexte | Action |
|---|---|---|
| Pause déj | Dans le camion, connexion instable | Ajouter la matinée (3h) |
| Fin de journée | Dans la voiture, 17h30 | Compléter la journée + exporter |
| Vendredi 16h | Dans le camion, avant de partir | Remplir toute la semaine d'un coup |
| "J'ai les mains pleines de béton" | Sur le chantier | Prendre une photo des notes crayonnées → OCR (V2) |

### Principes directeurs

| Principe | Traduction |
|---|---|
| **Mobile-first** | L'app est pensée pour un usage sur smartphone/tablette sur le terrain. Le desktop vient après. |
| **Gros boutons** | Cibles tactiles ≥ 48px, labels explicites, pas de liens discrets. |
| **Shallow UX** | Pas plus de 2 niveaux de profondeur. Ce qu'on fait le plus souvent est accessible en 1 tap. |
| **Contexte visible** | L'utilisateur sait où il est et ce qu'il va exporter sans réfléchir. |
| **< 10 min** | La saisie hebdomadaire ne doit pas prendre plus de 10 minutes. |
| **Rétrospectif** | On déclare des heures déjà effectuées, on ne chronomètre pas en temps réel. |
| **Honnête** | Pas de gamification, pas de notifications agressives, pas de motifs obscurs. |

---

## 2. Public cible

### Persona 1 — L'agent terrain
- **Prénom** : Marc
- **Métier** : Chef de chantier
- **Appareil** : Smartphone Android (milieu de gamme), parfois une tablette
- **Connexion** : Instable (chantier = souvent pas de réseau)
- **Contexte** : Il note ses heures à la fin de la journée (ou de la semaine), souvent sur un carnet ou une planche en bois avec un crayon de chantier
- **Frustration** : "On me fait déjà chier avec ça, je vais pas y passer 30 minutes"
- **Punchline** : *"Et quand j'ai les mains pleines de béton, je fais comment ?"* → Réponse : une photo des notes manuscrites et l'OCR remplit la fiche (V2)

### Persona 2 — L'agent de bureau
- **Prénom** : Sophie
- **Métier** : Assistante comptabilité
- **Appareil** : PC portable, tablette
- **Contexte** : Elle compile les heures de la semaine, vérifie, exporte pour facturation
- **Besoin** : Export rapide avec le bon niveau de détail

### Parcours utilisateur — Marc (terrain)

**Scénario A — Fin de journée (le plus fréquent)**
```
17h30, Marc est dans sa voiture
1. Ouvre l'app → voit sa semaine avec les barres par jour
2. Tape sur le jour en cours
3. Sélectionne le projet "Chantier RATP"
4. Utilise les boutons rapides : "8h-12h → 4h" + "13h-16h → 3h"
5. Option : ajoute une description "Coffrage fondation"
6. Tape "Ajouter"
7. La barre du jour se met à jour
8. → 1 minute, terminé
```

**Scénario B — Fin de semaine**
```
Vendredi 16h, dans le camion
1. Ouvre l'app
2. Navigation semaine ← pour revenir à la semaine précédente
3. Lundi : 8h-12h + 13h-15h
4. Mardi : 7h-12h + 13h-16h30
5. Mercredi : 8h-12h (pas d'après-midi, intempéries)
6. Etc.
7. Vérifie le total semaine : 35h
8. [📤 Exporter] → partage par email
9. → 5 minutes chrono
```

**Scénario C — "Les mains pleines de béton" (V2)**
```
1. Prend une photo de sa planche avec les notes crayonnées
2. L'OCR détecte : "Lundi 8h-12h coffrage, 13h-16h fondation"
3. Propose de remplir automatiquement
4. Marc valide d'un tap
```

**Temps idéal** : 1-5 minutes par session.

---

## 3. Architecture des pages

```
/                     → Dashboard (semaine + ajout rapide) — point d'entrée unique
                        ├── WeekView (barres par jour, navigation ← aujourd'hui →)
                        ├── TimeEntryForm (projet, date, durée, description)
                        └── [Export contextuel] ← gros bouton, visible

/settings             → Préférences (thème, infos perso)
/export               → Export avancé (granularité, filtre date, projet)
```

**Règle** : pas plus de 3 écrans. Tout ce qui est fréquent reste sur le Dashboard.

---

## 4. Navigation

### Mobile (smartphone) — layout par défaut

```text
┌─────────────────────┐
│  Fin'djournée       │
│                     │
│  ─ Semaine ─        │
│  ← 12/05 – 18/05 →  │
│                     │
│  Lun 12 ▓▓▓▓░░░  4h │
│  Mar 13 ▓▓▓░░░░  3h │
│  Mer 14 ▓▓▓▓▓▓▓  7h │
│  Jeu 15 ▓▓▓░░░░  2h │
│  Ven 16 ▓░░░░░░  1h │
│  Sam 17 ░░░░░░░   0h │
│  Dim 18 ░░░░░░░   0h │
│  ─────────────       │
│  Total:      17h     │
│                     │
│  ─ Nouvelle entrée ─ │
│  [Projet: _____]   ▼ │
│  [Date] [Début] [Fin]│
│  [30min][1h][2h][3h] │
│  Description: ____   │
│  [✓ Ajouter]         │
│                     │
│  [📤 Exporter]       │ ← gros bouton, toujours visible
└─────────────────────┘
```

### Tablette — 2 colonnes

```text
┌──────────────────────────────────────┐
│  Fin'djournée                  [⚙]  │
│                                      │
│  ┌──────────────────┐ ┌────────────┐│
│  │  Semaine          │ │ Entrée     ││
│  │  [←] 12/05–18/05 [→]│ │ Projet ▼   ││
│  │  Lun 12 ▓▓▓ 4h   │ │ Date       ││
│  │  Mar 13 ▓▓▓ 3h   │ │ Début Fin  ││
│  │  Mer 14 ▓▓▓ 7h   │ │ [30m][1h]  ││
│  │  ...              │ │ [2h][3h]   ││
│  │  Total: 17h       │ │ [✓ Ajouter]││
│  └──────────────────┘ └────────────┘│
│                                      │
│  ┌──────────────────────────────────┐│
│  │  [📤  Exporter la semaine]       ││
│  └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

### Desktop (PC)

Même layout que tablette mais avec plus d'espace, navigation latérale optionnelle.

---

## 5. Composants clés

### 5.1 WeekView — Vue semaine

**Usage** : Visualiser sa semaine d'un coup d'œil, naviguer entre les semaines.

```text
┌────────────────────────────┐
│  ← 12/05 – 18/05  [Auj.] → │ ← navigation semaine
│                            │
│  Lun 12 ▓▓▓▓▓▓▓▓▓░░░  4h  │ ← barre proportionnelle
│  Mar 13 ▓▓▓▓▓▓▓░░░░░  3h  │
│  Mer 14 ▓▓▓▓▓▓▓▓▓▓▓▓  7h  │
│  Jeu 15 ▓▓▓▓░░░░░░░░  2h  │
│  Ven 16 ▓▓░░░░░░░░░░  1h  │
│  Sam 17 ░░░░░░░░░░░░  0h  │
│  Dim 18 ░░░░░░░░░░░░  0h  │
│  ────────────────────────  │
│  Total semaine :    17h    │
│                            │
│  ▼ Détail des entrées      │ ← accordéon
│    Lun 12/05               │
│    RATP - coffrage    4h   │
│    Mar 13/05               │
│    RATP - fondation   3h   │
└────────────────────────────┘
```

### 5.2 TimeEntryForm — Saisie rapide

**Usage** : Ajouter une tranche horaire à un projet.

```text
┌────────────────────────────┐
│  Projet : [___________]  ▼ │ ← gros select
│                            │
│  Date : [12/06/2026]      │
│  Début : [08:00]           │
│  Fin   : [10:30]           │
│                            │
│  ou durée rapide :         │
│  [30min] [1h] [2h] [3h]   │ ← quick select
│  [4h]                      │
│                            │
│  Description (opt.)        │
│  [______________________]  │
│                            │
│          → 2h30 ←         │ ← calculé en direct
│                            │
│  [✓  Ajouter]              │ ← gros bouton vert
└────────────────────────────┘
```

- **Sélecteur projet** : min 52px, font-size 16px (évite le zoom iOS)
- **Boutons durée rapide** : mettent à jour l'heure de fin automatiquement
- **Durée calculée** : mise à jour en direct (début → fin)
- **Bouton "Ajouter"** : désactivé si pas de projet ou durée nulle
- **Après ajout** : la semaine se rafraîchit, le formulaire se réinitialise partiellement

### 5.3 Export contextuel

Le bouton d'export est **toujours visible** et utilise le contexte actuel :

| Contexte | Action |
|---|---|
| Dashboard (semaine courante) | Export de **la semaine visible** |
| Navigation ← semaine précédente | Export de **la semaine naviguée** |

```text
[📤  Exporter]
    ├── Rapide (contexte actuel → CSV/PDF)
    └── Avancé (choisir granularité, filtre date, sections)
```

### 5.4 Dashboard

```text
┌─────────────────────┐
│  Semaine            │ Ajout rapide    │  ← 2 colonnes (tablette+)
│  ─────────────      │ ─────────────   │     1 colonne (mobile)
│  Barres + total     │ Projet + date   │
│  Détail entrées     │ Durée + desc    │
│                     │ [Ajouter]       │
│                     │                 │
│  [📤  Exporter]     │                 │
└─────────────────────┘
```

---

## 6. États

Chaque composant doit gérer :

| État | Comportement |
|---|---|
| **Loading** | Skeleton ou spinner (pas de flash blanc) |
| **Empty** | Message clair + CTA ("Crée ton premier projet") |
| **Error** | Message simple + suggestion |
| **Success** | Feedback subtil (checkmark) |
| **Offline** | Badge discret "Hors ligne" mais tout fonctionne |

---

## 7. Accessibilité & Mobile

- **Cibles tactiles ≥ 48px** (WCAG 2.5.5), idéalement 52px pour les actions primaires
- **Contraste ≥ 4.5:1** pour tout texte (WCAG AA)
- **`prefers-reduced-motion`** respecté
- **Pas de hover-dependant** : tout doit être utilisable au tactile
- **Pas de zoom iOS** : tout `<select>` et `<input>` en font-size ≥ 16px

---

## 8. Responsive

| Breakpoint | Cible | Layout |
|---|---|---|
| < 480px | Smartphone | Stack vertical, 1 colonne |
| 480-768px | Grand smartphone | 1 colonne, plus d'aération |
| 768-1024px | Tablette | 2 colonnes (WeekView + TimeEntryForm) |
| 1024px+ | Desktop/Large | 2 colonnes, espace max |

Mobile-first : le layout 1 colonne est le défaut, les colonnes s'ajoutent avec `md:` et `lg:`.

---

## 9. Export — Comportement contextuel

L'export doit être **intelligent** et **immédiat** :

```
┌─ Contexte ─────────────────────────────┐
│ Période : Semaine du 12/05 au 18/05    │
│ Projets : Chantier RATP, Dossier X     │
│ Entrées : 12                           │
│ Total : 38h30                          │
│                                        │
│ [📤  Export rapide → CSV]              │
│ [📄  Export avancé...]                 │
└────────────────────────────────────────┘
```

- **Export rapide** : utilise le contexte (projet + période) et produit un CSV ou PDF sans demande supplémentaire
- **Export avancé** : ouvre un écran avec granularité (par équipe, par tâche, avec/sans notes, format)

---

## 10. Roadmap — modules futurs

### V1 (actuel)
- Saisie rétrospective (projet, date, durée, description)
- Vue semaine avec barres et total
- Export contextuel (CSV)
- PWA offline-first

### V2
- OCR : photo des notes manuscrites → remplissage automatique
- Sync serveur (Symfony + API Platform)
- Export PDF
- Multi-utilisateurs / équipes
- Dashboard bureau

### V3 (premium)
- Facturation
- Devis
- Module RH (pointage équipe)
