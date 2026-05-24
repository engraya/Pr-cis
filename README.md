<div align="center">

<img src="public/favicon.svg" alt="Précis Logo" width="72" height="72" />

# Précis — QuickSum AI

**Read Less. Know More.**

Précis is a fast, focused AI-powered article summarizer. Paste any article URL and receive a clean, three-paragraph summary in seconds — powered by Google Gemini, with no account required.

<br />

[![CI](https://github.com/Engraya/QuickSum-AI/actions/workflows/ci.yml/badge.svg)](https://github.com/Engraya/QuickSum-AI/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-6366F1)](CONTRIBUTING.md)

<br />

[Live Demo](#deployment) · [Report a Bug](https://github.com/Engraya/QuickSum-AI/issues) · [Request a Feature](https://github.com/Engraya/QuickSum-AI/issues)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [How It Works](#how-it-works)
- [AI Integration](#ai-integration)
- [State Management](#state-management)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Performance](#performance)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The modern web produces more information than any person can consume. Précis solves that directly — it acts as an intelligent reading layer between you and any article on the internet. Paste a URL, hit summarize, and within seconds you have the core ideas distilled into three focused paragraphs.

**Who it's for:**

- **Researchers & students** who need to scan dozens of sources quickly
- **Developers & engineers** who want to stay current without reading every blog post in full
- **Content curators & journalists** evaluating articles for relevance before committing reading time
- **Busy professionals** who want signal without noise

There are no accounts, no subscriptions, and no friction. Summaries are cached locally, so repeat lookups are instant, and your last 20 articles are always one click away in the history sidebar.

---

## Features

### Core Summarizer

| Feature | Description |
|---|---|
| **Instant AI Summaries** | Submits any HTTP/HTTPS URL to Google Gemini and returns a structured three-paragraph summary |
| **Smart Local Cache** | Stores summaries in `localStorage` keyed by URL — identical requests never hit the API twice |
| **Article History** | Sidebar persists up to 20 recent summaries across sessions; entries can be selected, copied, or deleted |
| **One-Click Copy** | Copies the summary or source URL to clipboard with a visual tick feedback that auto-resets |
| **Skeleton Loading** | Animated placeholder cards replace content while the API request is in flight |
| **Graceful Error Handling** | API failures surface a descriptive, recoverable error state — never a silent crash |

### Developer Experience

| Feature | Description |
|---|---|
| **Strict TypeScript** | No implicit `any`, strict mode enabled across the entire codebase |
| **Zod Validation** | Runtime schema validation on all URL inputs before any network call is made |
| **Feature-Based Architecture** | Code organized by product feature, not by file type, for clear boundaries and scalability |
| **Path Aliases** | `@features`, `@hooks`, `@lib`, `@store` aliases eliminate relative import hell |
| **Code Splitting** | React, Router, and Redux loaded as separate chunks for a fast initial paint |
| **Full Test Coverage** | Hook, validator, and component tests via Vitest + Testing Library |

### Design & Accessibility

| Feature | Description |
|---|---|
| **Dark Mode** | Class-based Tailwind dark theme toggled manually and persisted to `localStorage` |
| **Responsive Layout** | Mobile-first design tested across `sm`, `md`, and `lg` breakpoints |
| **ARIA-Compliant** | `aria-label`, `aria-live`, `aria-invalid`, `aria-describedby`, `role="alert"` throughout |
| **Semantic HTML** | Proper landmark elements (`nav`, `main`, `footer`) and heading hierarchy |
| **Custom Typography** | Satoshi and Inter typefaces via Fontshare and Google Fonts |

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | React 18.3 | UI rendering with concurrent features |
| **Language** | TypeScript 5.2 | End-to-end type safety, strict mode |
| **Bundler** | Vite 5.3 | Sub-second HMR in dev, optimized production builds |
| **Routing** | React Router 6.24 | Client-side routing with lazy-loaded pages |
| **State** | Redux Toolkit 2.2 | Global state with structured slice architecture |
| **Data Fetching** | RTK Query (via Redux Toolkit) | API state, caching, and normalized request lifecycle |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS with `class`-based dark mode |
| **Validation** | Zod 4.4 | Runtime schema validation at form boundaries |
| **AI Provider** | Google Gemini API | Article summarization via `url_context` tool |
| **Testing** | Vitest 4.1 + Testing Library | Unit and component tests, v8 coverage |
| **Linting** | ESLint 8 + TypeScript ESLint | Static analysis and a11y enforcement |
| **Formatting** | Prettier 3.8 | Consistent code style (100-char width, single quotes) |
| **CI/CD** | GitHub Actions | Automated type-check, lint, test, and build on every push |
| **Icons** | react-icons 5.2 | Bootstrap icon set (sun, moon, GitHub, LinkedIn, etc.) |

---

## Architecture

### Folder Structure

```
précis/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
│
├── public/
│   ├── avatar.png
│   ├── favicon.ico
│   └── favicon.svg
│
├── src/
│   ├── assets/                 # SVG icons and logo exports
│   │
│   ├── components/             # Globally shared UI components
│   │   ├── ErrorBoundary.tsx   # Top-level crash recovery
│   │   └── Spinner.tsx         # Configurable loading spinner (sm/md/lg)
│   │
│   ├── features/               # Self-contained product feature modules
│   │   ├── home/               # Landing page
│   │   │   ├── HomePage.tsx
│   │   │   └── components/
│   │   │       ├── LandingText.tsx   # Hero section and CTA
│   │   │       ├── Features.tsx      # Feature grid (6 cards)
│   │   │       └── Testimonials.tsx  # Social proof section
│   │   │
│   │   └── summarize/          # Core summarizer feature
│   │       ├── SummarizePage.tsx
│   │       ├── components/
│   │       │   ├── UrlForm.tsx         # URL input and submission
│   │       │   ├── SummaryResult.tsx   # Summary display + tests
│   │       │   └── ArticleHistory.tsx  # History sidebar
│   │       └── hooks/
│   │           └── useArticleSummarizer.ts  # All summarizer logic
│   │
│   ├── hooks/                  # Reusable custom hooks
│   │   ├── useTheme.ts         # Dark mode toggle + persistence
│   │   └── useLocalStorage.ts  # Generic typed localStorage hook + tests
│   │
│   ├── layout/                 # App shell components
│   │   ├── Layout.tsx          # Root layout wrapper
│   │   ├── Header.tsx          # Fixed nav with theme toggle
│   │   └── Footer.tsx          # Footer with social links
│   │
│   ├── lib/                    # Utilities and application constants
│   │   ├── constants.ts        # API config, storage keys, UI config
│   │   └── validators.ts       # Zod URL schema + tests
│   │
│   ├── store/                  # Redux store and RTK Query API
│   │   ├── store.ts
│   │   └── api/
│   │       └── articleApi.ts   # RTK Query endpoint definitions
│   │
│   ├── types/
│   │   └── article.ts          # Article, SummaryApiResponse, error types
│   │
│   ├── test/
│   │   └── setup.ts            # Vitest global setup (jest-dom)
│   │
│   ├── App.tsx                 # Router setup with lazy-loaded pages
│   ├── App.css                 # Global Tailwind layers + component classes
│   └── main.tsx                # React DOM entry point
│
├── .env.example                # Environment variable template
├── vite.config.ts              # Bundler config (chunks, sourcemaps, aliases)
├── vitest.config.ts            # Test runner config
├── tailwind.config.js          # Tailwind config (dark mode, custom fonts, keyframes)
├── tsconfig.app.json           # TypeScript strict config (ES2020 target)
└── .github/workflows/ci.yml   # CI pipeline
```

### Key Design Decisions

**Feature-based modules** — Code lives with the feature it belongs to. `useArticleSummarizer`, `UrlForm`, `SummaryResult`, and `ArticleHistory` all live inside `src/features/summarize/`. This avoids the "components soup" anti-pattern and keeps boundaries explicit.

**Hook-first logic** — `useArticleSummarizer` absorbs all summarizer orchestration (validation, cache lookup, API trigger, history management, copy feedback). Components stay thin and declarative.

**RTK Query lazy queries** — The `useLazyGetSummaryQuery` hook is used intentionally so the API call fires only on explicit user submission, not on mount or URL change.

**`localStorage` as the database** — For a client-only app at this scope, localStorage is the right tradeoff. The `useLocalStorage<T>` hook provides a typed, error-safe abstraction over it.

---

## Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher
- A **Google Gemini API key** — get one free at [aistudio.google.com](https://aistudio.google.com/app/apikey)

### 1. Clone & Install

```bash
git clone https://github.com/Engraya/QuickSum-AI.git
cd QuickSum-AI
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Open `.env` and set your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start the Dev Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Production Build

```bash
npm run build      # Type-check + bundle → dist/
npm run preview    # Serve dist/ locally to verify
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Yes | Google Gemini API key used to call the summarization endpoint |

All variables are prefixed with `VITE_` to be exposed to the browser by Vite. Never commit your `.env` file — it is listed in `.gitignore`.

**`.env.example`**

```env
# Google Gemini API — https://aistudio.google.com/app/apikey
VITE_GEMINI_API_KEY=
```

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Start dev server with Hot Module Replacement |
| `build` | `tsc -b && vite build` | Type-check then bundle for production |
| `preview` | `vite preview` | Locally preview the production build |
| `lint` | `eslint . --ext ts,tsx --max-warnings 0` | Static analysis (fails on any warning) |
| `lint:fix` | `eslint . --ext ts,tsx --fix` | Auto-fix linting issues |
| `format` | `prettier --write "src/**/*.{ts,tsx,css}"` | Format all source files |
| `test` | `vitest run` | Run full test suite once (CI mode) |
| `test:watch` | `vitest` | Run tests in watch mode |
| `test:coverage` | `vitest run --coverage` | Generate v8 coverage report in `coverage/` |
| `test:ui` | `vitest --ui` | Launch Vitest's interactive browser dashboard |

---

## How It Works

```
User Input → Zod Validation → Cache Lookup → Gemini API → Display + Cache + History
```

**Step-by-step flow:**

1. **Input** — The user pastes an article URL into the `UrlForm` component.
2. **Validate** — `useArticleSummarizer` runs the URL through the Zod schema. Invalid URLs surface a human-readable error immediately, before any network call.
3. **Cache check** — The hook checks `localStorage` for an existing summary at that URL key. If found, the result is surfaced instantly with zero latency.
4. **API call** — On a cache miss, RTK Query fires a `POST` to the Gemini API using the `useLazyGetSummaryQuery` hook. A skeleton loading state is shown while the request is in flight.
5. **Gemini processing** — Gemini's `url_context` tool fetches the article from the URL and extracts its content. The model then generates a three-paragraph summary.
6. **Persist & display** — The response is displayed in `SummaryResult`, stored in `localStorage` for future lookups, and prepended to the article history sidebar (capped at 20 items).

---

## AI Integration

**Provider:** Google Gemini API  
**Model:** `gemini-3-flash-preview`  
**Base URL:** `https://generativelanguage.googleapis.com/v1beta/`  
**Auth:** API key passed as a query parameter (`?key=<VITE_GEMINI_API_KEY>`)

### Summarization Endpoint

```
POST /models/gemini-3-flash-preview:generateContent?key={API_KEY}
```

**Request body:**

```json
{
  "contents": [
    {
      "parts": [
        {
          "text": "Provide a concise summary of the article at this URL in 3 paragraphs: <url>"
        }
      ]
    }
  ],
  "tools": [{ "url_context": {} }]
}
```

**Response shape:**

```json
{
  "candidates": [
    {
      "content": {
        "parts": [{ "text": "Paragraph one...\n\nParagraph two...\n\nParagraph three..." }]
      }
    }
  ]
}
```

### Key capability: `url_context`

The `url_context` tool instructs Gemini to **browse the article URL directly** rather than relying solely on the prompt text. This means the model fetches, reads, and understands the full article content before generating the summary — making it effective across paywalled previews, long-form journalism, and technical documentation alike.

---

## State Management

Précis uses a two-layer state model:

**RTK Query (server/async state)**
- `articleApi` slice handles all Gemini API interaction
- `useLazyGetSummaryQuery()` gives manual control over when requests fire
- RTK Query's built-in deduplication prevents duplicate in-flight requests
- Normalized cache keyed by URL

**Hook-local state (UI/ephemeral state)**
- `useArticleSummarizer` manages URL input, validation errors, the active article, copy feedback timers, and history
- `useLocalStorage<T>` provides a typed, error-safe abstraction for `localStorage` reads and writes
- `useTheme` handles dark mode toggle and persistence

This separation keeps Redux lean — it owns only what crosses component boundaries — while complex feature logic stays co-located in custom hooks.

---

## Testing

Tests live next to the code they cover (`validators.test.ts`, `useLocalStorage.test.ts`, `SummaryResult.test.tsx`).

**Run tests:**

```bash
npm run test              # Single run (CI mode)
npm run test:watch        # Watch mode for development
npm run test:coverage     # Coverage report → coverage/index.html
npm run test:ui           # Interactive Vitest UI in browser
```

### Test Coverage

| Module | Tests | What's Covered |
|---|---|---|
| `lib/validators.ts` | 6 | Valid http/https URLs, empty strings, bare domains, FTP URLs, error messages |
| `hooks/useLocalStorage.ts` | 5 | Read, write, persist across re-renders, functional updater, error recovery |
| `features/summarize/SummaryResult.tsx` | 5 | Loading skeleton, error state, success render, empty state, generic error fallback |

**Test setup:** `jsdom` for DOM simulation, `@testing-library/jest-dom` matchers, `@testing-library/user-event` for realistic interaction simulation.

---

## CI/CD

Every push and pull request to `main`, `master`, or `develop` triggers the GitHub Actions pipeline.

**Pipeline:** `.github/workflows/ci.yml`

```
Push / PR
   │
   ├── 1. Type Check    tsc -b --noEmit
   ├── 2. Lint          eslint (zero warnings enforced)
   ├── 3. Test          vitest run --coverage
   └── 4. Build         vite build → dist/
```

- **Runtime:** Node.js 20 on `ubuntu-latest`
- **Caching:** npm dependencies cached between runs
- **API key** is injected as a GitHub Actions secret for the build step

---

## Performance

| Optimization | Implementation |
|---|---|
| **Code splitting** | React, React Router, and Redux Toolkit loaded as separate Vite manual chunks — reduces initial bundle size |
| **Route-level lazy loading** | `HomePage` and `SummarizePage` loaded with `React.lazy` + `Suspense` — pages only download when first visited |
| **API response caching** | Summaries stored in `localStorage` — zero-latency repeat lookups, zero redundant API calls |
| **RTK Query deduplication** | Concurrent identical requests collapse into a single in-flight call |
| **Sourcemaps** | Enabled for production to support error tracing without exposing raw source |
| **Tailwind CSS purging** | Vite + Tailwind removes unused utility classes at build time, keeping CSS minimal |

---

## Deployment

Précis builds to a fully static `dist/` directory and can be deployed to any static host.

### Vercel (Recommended)

```bash
npm i -g vercel
vercel --prod
```

Set `VITE_GEMINI_API_KEY` in your Vercel project's Environment Variables dashboard.

### Netlify

```bash
npm run build
# Deploy the dist/ folder via Netlify CLI or drag-and-drop
netlify deploy --prod --dir dist
```

### GitHub Pages

```bash
npm run build
# Push dist/ to the gh-pages branch using gh-pages or your preferred method
```

### Manual / VPS

```bash
npm run build
# Serve dist/ with any static file server (nginx, serve, etc.)
npx serve dist
```

**Build output:** `dist/` — a static bundle of HTML, CSS, and JS with no server-side requirements.

---

## Screenshots

> Screenshots coming soon. To contribute, open a PR with images placed in `public/screenshots/`.

| View | Preview |
|---|---|
| **Landing Page** | ![Landing Page](public/screenshots/landing.png) |
| **Summarizer — Input** | ![Summarizer Input](public/screenshots/summarize-input.png) |
| **Summarizer — Result** | ![Summary Result](public/screenshots/summarize-result.png) |
| **History Sidebar** | ![History Sidebar](public/screenshots/history.png) |
| **Dark Mode** | ![Dark Mode](public/screenshots/dark-mode.png) |
| **Mobile View** | ![Mobile View](public/screenshots/mobile.png) |

---

## Future Improvements

Based on the current architecture, natural next steps include:

- **User accounts & cloud sync** — Supabase or Clerk auth to persist history across devices
- **Bulk summarization** — Accept multiple URLs and return a digest
- **Export options** — Download summaries as PDF or Markdown
- **Browser extension** — Summarize the current tab with one click
- **Reading time estimates** — Display estimated time saved per summary
- **Custom prompt control** — Let users adjust summary length, tone, or focus
- **RSS / newsletter integration** — Summarize feeds automatically on a schedule
- **i18n / localization** — Multi-language support for non-English articles and UI

---

## Contributing

Contributions are welcome. Please follow these steps:

1. **Fork** the repository
2. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. **Write your changes** — ensure all tests pass and no new lint warnings are introduced:
   ```bash
   npm run lint
   npm run test
   npm run build
   ```
4. **Commit** with a clear, descriptive message:
   ```bash
   git commit -m "feat: add export to Markdown"
   ```
5. **Push** and open a Pull Request against `main`

**Guidelines:**
- Keep PRs focused — one feature or fix per PR
- Add or update tests for any changed logic
- Maintain the existing code style (Prettier + ESLint configs are already set up)
- Update this README if your change affects setup, usage, or architecture

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Built with focus by **Ahmad Ayaz**

[![GitHub](https://img.shields.io/badge/GitHub-Engraya-181717?logo=github)](https://github.com/Engraya)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ahmad_Ayaz-0A66C2?logo=linkedin)](https://linkedin.com/in/ahmad-ayaz)

</div>
