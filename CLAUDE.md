# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js on http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint via next lint
```

No test suite is configured.

## Architecture

**NAVO** is a Next.js 14 App Router news media frontend. All data is static mock data — there is no backend or API.

### Data layer (`lib/`)

- `lib/data.js` — single source of truth: `NAVO_DATA` object containing `articles`, `authors`, `categories`, `mostRead`, and `latest` arrays. Article bodies use a typed array of `{ type: 'p' | 'quote', content, attribution? }` blocks.
- `lib/constants.js` — brand colors (`C`), Unsplash photo ID pools per category (`IMG_POOLS`), and ad creative pools (`AD_POOLS`).
- `lib/utils.js` — `getImgId(seed, pool)` deterministically picks an Unsplash photo ID from a pool using a hash of the seed string; `getAdItem(w, h, label)` resolves an ad format and creative.
- `lib/articleTranslations.js` — RU/TJ translations for article titles and excerpts (English is the canonical source in `data.js`).
- `lib/i18n.js` — `LanguageContext`, `useLanguage()`, `useT()` hook for UI string lookups, full `translations` object (EN/RU/TJ), `CAT_DISPLAY` for category names, and `BREAKING_ITEMS` ticker content.
- `lib/LanguageProvider.jsx` — `'use client'` wrapper that holds `lang` state (defaults to `'ru'`).

### Internationalisation pattern

Language is managed client-side via React context. The root layout wraps everything in `<LanguageProvider>`. Components access language via `useLanguage()` and translated strings via `useT()`. Article content translations live separately in `articleTranslations.js`; UI string translations are in `i18n.js`.

### Routing

All routes are under `app/` using Next.js App Router. Most page components are `'use client'` because they consume language context. Dynamic routes (articles, categories, authors) are not yet created as file-system routes — navigation is done via `router.push()`.

### Images and ads

All images are Unsplash photos loaded by ID. `ImgPlaceholder` is the canonical image component — it takes a `seed` string and `category` to deterministically pick a photo ID. `AdBlock` renders mock ad creatives using the same deterministic approach.

### Styling

Tailwind CSS with a custom theme in `tailwind.config.js`:
- Brand colors: `primary` (`#323F90`), `secondary` (`#1486C8`), `soft` (`#F7F8FA`), `breaking` (`#E53935`)
- Max content width: `max-w-content` = `1280px`
- Font: Montserrat (Google Fonts, loaded via `next/font`)
- Path alias `@/` maps to the repo root (configured in `jsconfig.json`)
