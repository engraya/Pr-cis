# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Vite dev server with HMR
npm run build         # TypeScript check + Vite production bundle
npm run preview       # Preview production build locally
npm run lint          # ESLint (strict — fails on warnings)
npm run lint:fix      # ESLint auto-fix
npm run format        # Prettier format src/**/*.{ts,tsx,css}
npm run test          # Vitest in CI mode
npm run test:watch    # Vitest watch mode
npm run test:coverage # v8 coverage report
npm run test:ui       # Vitest UI dashboard
```

## Environment

Requires a `.env` file with:
```
VITE_GEMINI_API_KEY=your_key_here
```

## Architecture

**Stack:** React 18 + TypeScript 5, Vite 5, Tailwind CSS 3, React Router 6, Redux Toolkit + RTK Query, Zod 4, Vitest.

**Feature-based structure** under `src/`:
- `features/home/` — landing page (LandingText, Features, Testimonials)
- `features/summarize/` — core feature: URL form, summary display, article history
- `store/api/articleApi.ts` — RTK Query slice; calls Google Gemini API (`gemini-2.0-flash` model with `url_context` tool so Gemini browses the URL directly)
- `hooks/` — `useTheme`, `useLocalStorage` (persists up to 20 articles under `quicksum_articles`)
- `lib/` — constants and Zod validators (`articleUrlSchema`)
- `layout/` — `Header`, `Footer`, `Layout` (React Router outlet wrapper)
- `types/article.ts` — shared TypeScript interfaces

**Data flow:**
1. User submits a URL → validated with Zod
2. `useArticleSummarizer` hook checks localStorage cache
3. On cache miss → `useLazyGetSummaryQuery` fires RTK Query → Gemini API
4. Result stored in localStorage cache + displayed

**Routing** (`App.tsx`): both pages are lazy-loaded.
```
/ → HomePage
/summarize → SummarizePage
```

**Dark mode:** class-based (`dark` on `<html>`), persisted in localStorage; initialized by an inline script in `index.html` before React mounts to avoid flash.

**Path aliases** (configured in `vite.config.ts` and `tsconfig.app.json`): `@/` maps to `src/`, plus `@components/`, `@features/`, `@hooks/`, `@store/`, `@lib/`, `@types/`.

**Code splitting:** Vite splits React, React Router, and Redux into separate chunks.

## Linting & Type Safety

ESLint is configured with `no-explicit-any` enforced. The `build` script runs `tsc` before bundling — TypeScript errors will block builds. Run `npm run lint` and `npm run build` before committing.
