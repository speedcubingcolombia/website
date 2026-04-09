# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

- `npm run dev` — Start development server with hot reload
- `npm run build` — Production build
- `npm run preview` — Build and preview production site
- No lint or test scripts are configured

## Architecture

**Framework:** Astro 5 static site with TypeScript (strict), Tailwind CSS v4, and Alpine.js for interactivity.

**Purpose:** Multilingual website for Speedcubing Colombia (WCA organization).

### Internationalization (3 languages)

- **Spanish (es):** Default language, no URL prefix (`/blog/post`)
- **English (en):** Prefix `/en` (`/en/blog/post`)
- **Portuguese (pt):** Prefix `/pt` (`/pt/blog/post`)

Configured in `astro.config.mjs` with `prefixDefaultLocale: false`. All i18n utilities (translation function `t()`, locale detection, date formatting, path helpers) live in `src/i18n/index.ts`. UI string translations are hardcoded in the `ui` object there.

Translated pages live in `src/pages/en/` and `src/pages/pt/`; the root `src/pages/` serves Spanish.

### Blog System

Two post types coexist in `src/content/blog/`:

1. **Simple posts:** Single `.md` file (e.g., `mi-articulo.md`)
2. **Multi-section posts:** Folder with `index.md` + section files (e.g., `sac-2026/index.md`, `sac-2026/registro.md`). Controlled by `multiSection: true` in frontmatter.

Language variants for blog content use subfolders: `src/content/blog/en/`, `src/content/blog/pt/`.

URL slugs are translated per-language via `SLUG_TRANSLATIONS` in `src/utils/blog.ts`. Blog utilities (filtering, sorting, pagination, tab generation) are also in that file. `POSTS_PER_PAGE = 6`.

Content schema is defined with Zod in `src/content/config.ts`.

### Key Files

- `src/config/site.ts` — Site metadata, navigation items, footer links, social links, contact info
- `src/i18n/index.ts` — All i18n: language config, `t()` translations, locale/path utilities
- `src/utils/blog.ts` — Blog helpers: slug translation, language filtering, multi-section tab generation
- `src/layouts/Layout.astro` — Main HTML wrapper with SEO meta, fonts, page transitions
- `src/styles/global.css` — Tailwind theme: primary (blue), accent (amber), custom animations

### Patterns

- Alpine.js handles client-side interactivity (mobile menu, language switcher dropdown, article tabs)
- Dynamic routes use Astro's `getStaticPaths()` for pre-rendering multilingual content
- `LanguageSwitcher` only renders when translations exist for the current page
- Site uses Astro ClientRouter for page transitions
