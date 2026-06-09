# Guide de Style — Fin'djournée

> Conventions de code pour le projet Fin'djournée.

---

## 1. Principes généraux

- **Lisibilité > brièveté** : pas de sur-optimisation, pas de one-liners obscurs.
- **Pas de commentaires triviaux** : le code doit s'expliquer tout seul. Les commentaires sont pour les *pourquoi*, pas les *comment*.
- **Tests avant code** : suivre la stratégie TDD (voir [TDD_STRATEGY.md](./TDD_STRATEGY.md)).
- **Conventions suivies** : tout nouveau fichier doit respecter le style du projet.

---

## 2. Frontend (TypeScript / React)

### 2.1 Tooling

| Outil | Usage |
|---|---|
| TypeScript 5.9+ | Typage strict |
| ESLint + Prettier | Lint + format |
| Vitest + Testing Library | Tests unitaires |

### 2.2 Nommage

| Élément | Convention | Exemple |
|---|---|---|
| Fichiers | `kebab-case` | `time-tracker.tsx` |
| Composants React | `PascalCase` | `TimeTracker` |
| Props type | `PascalCase + Props` | `TimeTrackerProps` |
| Hooks | `camelCase + use` | `useProjects` |
| Fonctions | `camelCase` | `formatDuration` |
| Variables | `camelCase` | `activeProjectId` |
| Constantes | `UPPER_SNAKE_CASE` | `DEFAULT_BREAK_DURATION` |
| Types/Interfaces | `PascalCase` | `Project`, `TimeEntry` |

### 2.3 Structure d'un composant

```tsx
// 1. Imports (groupés : externes → internes)
import { useState } from 'react';
import { useStore } from '@/store';

// 2. Types
export interface TimerProps {
  projectId: string;
}

// 3. Composant
export const Timer = ({ projectId }: TimerProps) => {
  const [elapsed, setElapsed] = useState(0);

  return <div>{elapsed}</div>;
};
```

### 2.4 Imports

- Utiliser des alias `@/` pour les imports internes (configurés dans `tsconfig.json` et `vite.config.ts`).
- Pas d'imports relatifs profonds (`../../../store`).
- Exporter depuis `index.ts` les symboles publics de chaque module.

### 2.5 Tests

Voir [TDD_STRATEGY.md](./TDD_STRATEGY.md#4-conventions-de-test-par-couche).

---

## 3. Backend (PHP / Symfony)

*Documenté lors de la mise en place de la V2.*

---

## 4. Git

### 4.1 Branches

| Branche | Usage |
|---|---|
| `main` | Production, protégée |
| `develop` | Intégration |
| `feat/*` | Nouvelles fonctionnalités |
| `fix/*` | Corrections de bugs |
| `docs/*` | Documentation |

### 4.2 Messages de commit

```
<type>(<scope>): <description>

<corps optionnel>

<footer optionnel>
```

Types : `feat`, `fix`, `test`, `docs`, `refactor`, `style`, `chore`

Exemples :
```
feat(web): add project creation form

test(web): add timer edge cases for midnight rollover

docs: add TDD strategy guide
```

---

## 5. Architecture

### 5.1 Feature-based organization

```
src/
├── features/
│   ├── projects/         # Everything related to projects
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store.ts      # Zustand store slice
│   │   └── index.ts
│   ├── time-tracking/
│   └── settings/
├── lib/                  # Shared utilities
├── hooks/                # Shared hooks (useOnlineStatus, etc.)
├── components/           # Shared UI components
└── db/                   # Dexie.js database definitions
```

### 5.2 Layers

```
Feature
  ├── View (page/route component)
  ├── Components (presentation)
  ├── Hooks (state + side effects)
  └── Store (Zustand) ←→ db/ (Dexie.js)
```
