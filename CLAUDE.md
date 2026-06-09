# CLAUDE.md — Fin'djournée

## Overview

Gestion de projet et suivi de temps offline-first (PWA).

## Tech Stack

| Layer | Technologie |
|---|---|
| Frontend | Vite + React 19 + TypeScript + Tailwind CSS 4 |
| State | Zustand |
| DB locale | Dexie.js (IndexedDB) |
| Tests | Vitest + Testing Library + Playwright |
| Backend (V2) | Symfony 7.2 + API Platform 4.x + PostgreSQL |

## Commands

```bash
yarn          # Install dependencies
yarn web      # Start web app dev server
yarn build    # Production build
yarn test     # Run all tests
yarn test:web # Run web tests
yarn lint     # ESLint
yarn format   # Prettier
```

## Project structure

```
apps/web/      → Main PWA application
packages/ui/   → Shared UI components (Tailwind)
docs/          → Project documentation
```

## Code conventions

See `docs/STYLE_GUIDE.md` for full details.

- **Fichiers** : kebab-case (`time-tracker.tsx`)
- **Composants** : PascalCase (`TimeTracker`)
- **Fonctions/variables** : camelCase (`formatDuration`, `activeProjectId`)
- **Types** : PascalCase (`Project`, `TimeEntry`)
- **Imports** : alias `@/` pour les imports internes

## Layout of feature folders

```
src/features/timer/
├── components/
├── hooks/
├── store.ts
└── index.ts
```

## Architecture pattern

Feature-based, pas de MVC.

```
Feature → Components (presentation)
        → Hooks (state + side effects)
        → Store (Zustand) → db/ (Dexie.js)
```

## Testing

TDD obligatoire : RED → GREEN → REFACTOR.
Voir `docs/TDD_STRATEGY.md` pour le détail.

- Unitaires : hooks, utilitaires, composants purs
- Integration : store + db
- E2E (Playwright) : parcours critiques uniquement

## Design decisions

- **Offline-first** : tout stocké en IndexedDB, la sync serveur est optionnelle (V2).
- **Pas de backend en V1** : l'app entière tourne dans le navigateur.
- **Open-core** : noyau MIT, modules premium séparés.
- **Class strategy** pour dark mode Tailwind.
- **Inter font** pour l'interface, JetBrains Mono pour les durées.
