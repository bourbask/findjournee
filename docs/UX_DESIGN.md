# Design & UX — Fin'djournée

> Principes d'expérience utilisateur et design de l'interface.

---

## 1. Philosophie

Fin'djournée est un outil de **productivité personnelle**. Le design doit être :

- **Calme** : pas de distractions, pas de notifications agressives.
- **Rapide** : l'app doit être utilisable en un clic, même en plein travail.
- **Honnête** : pas de motifs obscurs, pas de gamification forcée.

---

## 2. Public cible

- Indépendants et freelances
- Petites équipes (2-10 personnes)
- Profil technique ou non : l'app doit être utilisable par un artisan aussi bien que par un dev

---

## 3. Parcours utilisateur

### 3.1 Première utilisation

```
1. Onboarding minimal (1 écran) → "Crée ton premier projet"
2. Pas de compte, pas d'inscription
3. Tout est stocké localement
```

### 3.2 Usage quotidien

```
Dashboard (aujourd'hui)
├── Timer en cours (avec projet actif)
├── Entrées du jour (liste chronologique)
└── Bouton rapide "Nouvelle entrée"

Navigation :
├── Projets (liste + détail)
├── Entries (historique, filtres)
└── Export
```

---

## 4. Composants clés

### 4.1 Timer

```text
┌─────────────────────────────────────┐
│  [Projet: Design site]  ▼           │
│                                     │
│          ⏱  01:23:45               │
│                                     │
│  [ ⏸ Pause ]   [ ⏹ Stop ]          │
└─────────────────────────────────────┘
```

- Sélecteur de projet en haut
- Grand affichage du temps
- Boutons Pause/Stop bien distincts
- Raccourci clavier (espace = pause/reprise)

### 4.2 Saisie manuelle

```text
┌─────────────────────────────────────┐
│  Projet :  [____________]  ▼        │
│  Description : [____________]       │
│  Date :   [12/06/2026]              │
│  Début :  [09:00]   Fin : [10:30]   │
│  [✓ Ajouter]                        │
└─────────────────────────────────────┘
```

- Durée calculée automatiquement (Début → Fin)
- Snapping à 15 minutes

### 4.3 Dashboard

```text
┌─────────────────────────────────────┐
│  Aujourd'hui — 12 juin 2026         │
│                                     │
│  ⏱ Projet A           01:23:45     │
│  ⏱ Projet B           00:45:00     │
│  ⏱ Projet C           02:10:00     │
│  ──────────────────────────────     │
│  Total :              04:18:45      │
│                                     │
│  [+ Nouvelle entrée]                │
└─────────────────────────────────────┘
```

---

## 5. États

Chaque composant doit gérer :

| État | Comportement |
|---|---|
| **Loading** | Skeleton ou spinner (pas de flash blanc) |
| **Empty** | Message + CTA ("Crée ton premier projet") |
| **Error** | Message clair + suggestion de résolution |
| **Success** | Feedback subtil (checkmark, pas de popup) |
| **Offline** | Badge discret "Hors ligne" mais tout fonctionne |

---

## 6. Responsive

- **Mobile-first** : l'app doit être utilisable sur téléphone.
- Breakpoints : `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`.
- Le timer doit être utilisable à une main sur mobile.

---

## 7. Accessibilité

- Navigation au clavier complète (Tab, Enter, Escape).
- Labels ARIA sur tous les contrôles.
- Contraste minimum WCAG AA (ratio 4.5:1 pour le texte).
- Pas de motion non sollicitée (respecter `prefers-reduced-motion`).

---

## 8. Architecture des pages

```
/
├── /                     → Dashboard (today)
├── /projects             → Liste des projets
├── /projects/:id         → Détail projet + entries
├── /entries              → Historique (filtrable par date/projet)
├── /settings             → Préférences (thème, export)
└── /onboarding           → Premier lancement (1 écran)
```
