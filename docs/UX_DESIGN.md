# Design & UX — Fin'djournée

> Principes d'expérience utilisateur et design de l'interface.

---

## 1. Philosophie

Fin'djournée est un outil de **suivi de temps pour les agents de terrain** (chantiers, BTP, services). Le nom vient du rituel quotidien : à la fin de la journée, je note ce que j'ai fait.

**Cible prioritaire** : l'agent sur le terrain, pas de PC, pas le temps, pas envie de "se faire chier avec ça tous les soirs".

> "Je ne veux pas y passer plus de 10 minutes."

**Cible secondaire** : l'agent de bureau qui compile, exporte, facture.

### Principes directeurs

| Principe | Traduction |
|---|---|
| **Mobile-first** | L'app est pensée pour un usage sur smartphone/tablette sur le terrain. Le desktop vient après. |
| **Gros boutons** | Cibles tactiles ≥ 48px, labels explicites, pas de liens discrets. |
| **Shallow UX** | Pas plus de 2 niveaux de profondeur. Ce qu'on fait le plus souvent est accessible en 1 tap. |
| **Contexte visible** | L'utilisateur sait où il est et ce qu'il va exporter sans réfléchir. |
| **< 10 min** | La saisie quotidienne ne doit pas prendre plus de 10 minutes. |
| **Honnête** | Pas de gamification, pas de notifications agressives, pas de motifs obscurs. |

---

## 2. Public cible

### Persona 1 — L'agent terrain
- **Prénom** : Marc
- **Métier** : Chef de chantier
- **Appareil** : Smartphone Android (milieu de gamme), parfois une tablette
- **Connexion** : Instable (chantier = souvent pas de réseau)
- **Contexte** : Il veut noter vite fait ce qu'il a fait dans la journée, à qui facturer les heures
- **Frustration** : "On me fait déjà chier avec ça tous les soirs, je vais pas y passer 30 minutes"

### Persona 2 — L'agent de bureau
- **Prénom** : Sophie
- **Métier** : Assistante comptabilité
- **Appareil** : PC portable, tablette
- **Contexte** : Elle compile les heures de la semaine, vérifie, exporte pour facturation
- **Besoin** : Export rapide avec le bon niveau de détail

### Parcours utilisateur — Marc (terrain)

```
Fin de journée, 17h30, Marc est dans sa voiture
1. Ouvre l'app
2. Voit son projet en cours "Chantier RATP"
3. Tape "Terminer la journée"
4. L'export se prépare avec le contexte actuel (projet + date)
5. En option : ajuster le niveau de détail
     - "Juste les heures"
     - "Avec les notes"
     - "Export complet"
6. Partager par email/WhatsApp
```

**Temps idéal** : 2-3 minutes.

---

## 3. Architecture des pages

```
/                     → Dashboard (today) — point d'entrée unique
                        ├── Timer / saisie rapide
                        ├── Entrées du jour (liste)
                        └── [Export contextuel] ← gros bouton, visible

/settings             → Préférences (thème, infos perso)
/export               → Export avancé (granularité, filtre date, projet)
```

**Règle** : pas plus de 3 écrans. Tout ce qui est fréquent reste sur le Dashboard.

---

## 4. Navigation

### Mobile (smartphone)

```text
┌─────────────────────┐
│  Fin'djournée       │
│                     │
│  ═══════════════════│
│                     │
│  [Projet: Chantier] ▼
│                     │
│      ⏱ 07:45:00    │
│                     │
│  [ ⏸ Pause] [ ⏹ Stop]
│                     │
│  ─  Entrées du jour  │
│   RATP - fondation  07:45
│   RATP - coffrage   03:20
│   ...               ...
│                     │
│  [📤 Exporter]       │ ← gros bouton contextuel
│                     │
│  [⚙]               │ ← settings (en bas)
└─────────────────────┘
```

### Tablette

```text
┌──────────────────────────────────────┐
│  Fin'djournée                  [⚙]  │
│                                      │
│  ┌──────────────┐ ┌────────────────┐│
│  │  Timer        │ │  Projets       ││
│  │  [Projet]  ▼  │ │                ││
│  │  ⏱ 01:23:45  │ │  ● Chantier A  ││
│  │  [⏸][⏹]     │ │  ● Chantier B  ││
│  └──────────────┘ └────────────────┘│
│                                      │
│  ┌──────────────────────────────────┐│
│  │  Entrées du jour                 ││
│  │  RATP - coffrage   03:20         ││
│  │  RATP - fondation  07:45         ││
│  │                                  ││
│  │  [📤  Exporter la journée]       ││
│  └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

### Desktop (PC)

Même layout que tablette mais avec plus d'espace, navigation latérale optionnelle.

---

## 5. Composants clés

### 5.1 Timer / Saisie rapide

**Usage** : Démarrer un chrono ou ajouter une entrée manuelle.

```text
┌────────────────────────┐
│  Projet : [_______]  ▼ │ ← gros select
│  Description (opt)     │
│                        │
│       ⏱  01:23:45     │ ← très grand
│                        │
│  [▶  Démarrer]         │ ← bouton principal, grande cible
│  [⏹  Stop]            │ ← bouton secondaire
└────────────────────────┘
```

- **Bouton "Démarrer"** : vert et imposant (48px+)
- **Bouton "Stop"** : rouge, pas trop petit
- **Ajout manuel** : tap long sur le temps → mode saisie

### 5.2 Export contextuel

Le bouton d'export est **toujours visible** et utilise le contexte actuel :

| Contexte | Action |
|---|---|
| Dashboard (aucun projet sélectionné) | Export de **tous les temps du jour** |
| Projet sélectionné dans le timer | Export du **projet actif** |
| Filtre date appliqué | Export de la **période filtrée** |

```text
[📤  Exporter]
    ├── Rapide (contexte actuel → PDF/CSV)
    └── Avancé (choisir granularité, filtre date, sections)
```

### 5.3 Dashboard

```text
┌────────────────────────┐
│  Aujourd'hui — 12/06   │
│                        │
│  ⏱ Chantier RATP    01:23:45
│  ⏱ Dossier X        00:45:00
│  ⏱ Réunion          00:30:00
│  ──────────────────   │
│  Total :             02:38:45
│                        │
│  [📤  Exporter]        │
└────────────────────────┘
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

- **Cibles tactiles ≥ 48px** (WCAG 2.5.5)
- **Contraste ≥ 4.5:1** pour tout texte (WCAG AA)
- **Raccourcis clavier** sur desktop : Espace = start/stop timer
- **`prefers-reduced-motion`** respecté
- **Pas de hover-dependant** : tout doit être utilisable au tactile

---

## 8. Responsive

| Breakpoint | Cible | Layout |
|---|---|---|
| < 480px | Smartphone | Stack vertical, 1 colonne |
| 480-768px | Grand smartphone | 1 colonne, plus d'aération |
| 768-1024px | Tablette | 2 colonnes (timer + sidebar) |
| 1024px+ | Desktop/Large | 2 colonnes, espace max |

Mobile-first : le layout 1 colonne est le défaut, les colonnes s'ajoutent avec `md:` et `lg:`.

---

## 9. Export — Comportement contextuel

L'export doit être **intelligent** et **immédiat** :

```
┌─ Contexte ─────────────────────────────┐
│ Projet : Chantier RATP                 │
│ Période : Cette semaine                │
│ Entrées : 12                           │
│ Total : 38h30                          │
│                                        │
│ [📤  Export rapide → CSV]              │
│ [📄  Export avancé...]                 │
└────────────────────────────────────────┘
```

- **Export rapide** : utilise le contexte (projet + période) et produit un CSV ou PDF sans demande supplémentaire
- **Export avancé** : ouvre un écran avec granularité (par équipe, par tâche, avec/sans notes, format)
