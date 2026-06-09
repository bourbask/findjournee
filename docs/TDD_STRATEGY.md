# Stratégie TDD — Fin'djournée

> Approche de développement par les tests pour éviter les régressions et assurer la qualité.

---

## 1. Pourquoi TDD ?

- **Zéro régression** : un bug fixé = un test qui ne passe plus si quelqu'un le réintroduit.
- **Confiance en les refactors** : le code peut être réorganisé sans peur.
- **Documentation vivante** : les tests décrivent le comportement attendu.
- **Moins de debug** : un test qui échoue dit exactement ce qui ne va pas.

---

## 2. Cycle TDD

```
  [RED]   →  Écrire un test qui échoue
  [GREEN] →  Écrire le minimum de code pour que le test passe
  [REFACTOR] → Améliorer le code sans casser les tests
```

**Règle** : pas de code de production sans test qui échoue d'abord.

---

## 3. Pyramide des tests

```
        ╱╲
       ╱ E2E ╲            Playwright — parcours critiques
      ╱────────╲
     ╱ Integration ╲      Tests d'intégration (store, db)
    ╱────────────────╲
   ╱   Unitaires       ╲   Vitest — hooks, utilitaires, composants purs
  ╱──────────────────────╲
```

### 3.1 Tests unitaires (80%+ des tests)

- **Hooks purs** : `useTimer`, `useFormatDuration` — tester la logique, pas le rendu.
- **Utilitaires** : `formatDuration`, `groupByDate`, `calculateTotal`.
- **Composants purs** : composants sans side-effects.

### 3.2 Tests d'intégration (15%)

- **Store Zustand** : actions + dérivations, avec IndexedDB mockée.
- **Routes React Router** : navigation, query params.

### 3.3 Tests E2E (5%)

- **Playwright** : parcours critiques (créer projet → ajouter temps → exporter).
- Un par feature majeure, pas de tests E2E sur les détails d'UI.

---

## 4. Conventions de test par couche

### 4.1 Tests d'utilitaires

```ts
// formatDuration.test.ts
import { describe, it, expect } from 'vitest';
import { formatDuration } from './formatDuration';

describe('formatDuration', () => {
  it('formate les secondes en HH:MM:SS', () => {
    expect(formatDuration(3661)).toBe('01:01:01');
  });

  it('retourne 00:00:00 pour 0', () => {
    expect(formatDuration(0)).toBe('00:00:00');
  });

  it('gère les valeurs négatives en retournant 00:00:00', () => {
    expect(formatDuration(-5)).toBe('00:00:00');
  });
});
```

### 4.2 Tests de store

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { useProjectStore } from './projectStore';

describe('projectStore', () => {
  beforeEach(() => {
    useProjectStore.setState({ projects: [] });
  });

  it('ajoute un projet', () => {
    useProjectStore.getState().addProject({ name: 'Test' });
    expect(useProjectStore.getState().projects).toHaveLength(1);
  });
});
```

### 4.3 Tests de composants

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timer } from './Timer';

describe('Timer', () => {
  it('affiche le temps écoulé', () => {
    render(<Timer projectId="1" />);
    expect(screen.getByText('00:00:00')).toBeDefined();
  });
});
```

---

## 5. Mocking

- **IndexedDB** : utiliser `fake-indexeddb` pour les tests du store.
- **Service Worker** : ne pas tester le SW dans les tests unitaires.
- **API (V2)** : mocker `fetch`/`axios` pour les tests de sync.

---

## 6. Commande de test

```bash
# Tests unitaires rapides (sans coverage)
yarn test:web

# Tests avec coverage
yarn workspace @findjournee/web run test --coverage

# Mode watch (TDD)
yarn workspace @findjournee/web run test --watch
```

---

## 7. CI

La CI (GitHub Actions) exécute :

1. `yarn typecheck` — Vérification TypeScript
2. `yarn lint` — ESLint
3. `yarn test` — Tests avec coverage
4. `yarn build` — Build de production

Le pipeline **doit être vert** avant toute merge sur `main`.
