# Thème — Fin'djournée

> Systeme de tokens de theme pour l'interface Fin'djournée.

---

## 1. Palette de couleurs

### 1.1 Couleurs primaires

| Role | Light | Dark | Usage |
|---|---|---|---|
| Primary | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | Actions principales, liens |
| Secondary | `#7C3AED` (violet-600) | `#A78BFA` (violet-400) | Accents secondaires |
| Accent | `#059669` (emerald-600) | `#34D399` (emerald-400) | Succès, timer actif |

### 1.2 Neutres

| Role | Light | Dark |
|---|---|---|
| Background | `#F8FAFC` (slate-50) | `#0F172A` (slate-900) |
| Surface | `#FFFFFF` | `#1E293B` (slate-800) |
| Border | `#E2E8F0` (slate-200) | `#334155` (slate-700) |
| Text primary | `#0F172A` (slate-900) | `#F1F5F9` (slate-100) |
| Text secondary | `#64748B` (slate-500) | `#94A3B8` (slate-400) |

### 1.3 Semantic

| Role | Light | Dark |
|---|---|---|
| Success | `#059669` | `#34D399` |
| Warning | `#D97706` | `#FBBF24` |
| Error | `#DC2626` | `#F87171` |
| Info | `#0284C7` | `#38BDF8` |

### 1.4 Timer states

| State | Light | Dark |
|---|---|---|
| Running | `#059669` (emerald) | `#34D399` |
| Paused | `#D97706` (amber) | `#FBBF24` |
| Stopped | `#64748B` (slate) | `#94A3B8` |

---

## 2. Typographie

### 2.1 Font family

```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

- **Interface** : Inter (Google Fonts)
- **Code/durées** : JetBrains Mono

### 2.2 Tailles

| Token | Size | Usage |
|---|---|---|
| `text-xs` | 0.75rem | Labels, métadonnées |
| `text-sm` | 0.875rem | Descriptions, secondaire |
| `text-base` | 1rem | Corps de texte |
| `text-lg` | 1.125rem | Sous-titres |
| `text-xl` | 1.25rem | Titres section |
| `text-2xl` | 1.5rem | Titres page |
| `text-4xl` | 2.25rem | Timer |

### 2.3 Font weights

| Weight | Usage |
|---|---|
| 400 (Regular) | Corps de texte |
| 500 (Medium) | Labels, boutons |
| 600 (Semibold) | Titres, timer |
| 700 (Bold) | Highlights |

---

## 3. Spacing

Utiliser le systeme Tailwind par défaut (échelle 4px).

| Token | px | rem |
|---|---|---|
| `space-1` | 4px | 0.25rem |
| `space-2` | 8px | 0.5rem |
| `space-3` | 12px | 0.75rem |
| `space-4` | 16px | 1rem |
| `space-6` | 24px | 1.5rem |
| `space-8` | 32px | 2rem |
| `space-12` | 48px | 3rem |

---

## 4. Border radius

| Token | Value | Usage |
|---|---|---|
| `rounded-sm` | 4px | Inputs, small elements |
| `rounded-md` | 8px | Cards, modals |
| `rounded-lg` | 12px | Large cards |
| `rounded-full` | 9999px | Avatars, badges |

---

## 5. Shadows

| Token | Light | Dark |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | `0 1px 2px rgba(0,0,0,0.3)` |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | `0 4px 6px rgba(0,0,0,0.4)` |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | `0 10px 15px rgba(0,0,0,0.5)` |

---

## 6. Implémentation Tailwind

Les tokens sont définis dans `tailwind.config.ts` via `theme.extend` :

```ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        timer: {
          running: '#059669',
          paused: '#d97706',
          stopped: '#64748b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
};
```

---

## 7. Dark mode

Utiliser le `class` strategy de Tailwind :

```html
<html class="dark">
```

Le toggle de theme est stocké dans `localStorage` et respecte `prefers-color-scheme`.

```ts
const isDark = localStorage.getItem('theme') === 'dark'
  || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
```
