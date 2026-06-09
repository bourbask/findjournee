# Fin'djournée

> **Gestion de projet et suivi de temps** — offline-first, open-source (MIT).

Fin'djournée est un outil de gestion de projet pensé pour les indépendants et les petites équipes. Le nom vient du rituel quotidien : à la fin de la journée, je note ce que j'ai fait.

---

## Philosophy

- **Offline-first** : l'app fonctionne sans réseau, la sync est optionnelle.
- **Open-core** : le noyau est MIT, des modules premium (compta, recouvrement) sont payants.
- **Projet vitrine** : chaque choix technique est fait pour démontrer des compétences solides.

---

## Milestones

### V1 — PWA offline (MVP)
> **Objectif** : application monopage React fonctionnant 100% en local.

| Fonctionnalité | Statut |
|---|---|
| Création/modification de projets | ❌ |
| Suivi de temps (timer + saisie manuelle) | ❌ |
| Catégorisation (tags, clients) | ❌ |
| Persistance IndexedDB (Dexie.js) | ❌ |
| PWA (service worker, installable) | ❌ |
| Thème clair/sombre (Tailwind) | ❌ |
| Export CSV | ❌ |

**Stack** : Vite + React 19 + TypeScript + Tailwind CSS 4 + Zustand + Dexie.js

### V2 — Backend API & Collaboration
> **Objectif** : API Symfony/API Platform avec sync et authentification.

| Fonctionnalité | Statut |
|---|---|
| API REST (Symfony 7.2 + API Platform 4.x) | ❌ |
| Auth JWT (Lexik JWT) | ❌ |
| Moteur de sync (offline → serveur) | ❌ |
| Collaboration (partage de projet) | ❌ |
| Notifications | ❌ |
| Déploiement (Docker / CI/CD) | ❌ |

**Stack** : Symfony 7.2 + API Platform 4.x + PostgreSQL + Lexik JWT

### V3 — Modules premium
- Compteur d'heures facturable avec génération PDF
- Tableau de bord chiffré d'affaires
- Intégration Stripe

---

## Structure du projet

```
findjournee/
├── apps/
│   └── web/                  # App React PWA (Vite)
├── packages/
│   └── ui/                   # Composants UI partagés (Tailwind)
├── docs/
│   ├── STYLE_GUIDE.md        # Conventions de code
│   ├── TDD_STRATEGY.md       # Stratégie de tests
│   ├── UX_DESIGN.md          # Design & expérience utilisateur
│   └── THEME.md              # Tokens de thème (couleurs, typos)
├── .editorconfig
├── .gitignore
├── package.json
└── README.md
```

---

## Développement

```bash
# Prérequis
node >= 20
yarn >= 4

# Installer les dépendances
yarn install

# Lancer l'app web
yarn web

# Linter
yarn lint

# Tests
yarn test
```

---

## Licence

MIT — voir [LICENSE](./LICENSE).
