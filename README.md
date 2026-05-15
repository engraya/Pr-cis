# Précis — QuickSum AI

> **Read Less. Know More.**
> An AI-powered article summarizer that distills any article into a clean, concise summary in seconds — no sign-up required.

---

## Overview

**Précis** (QuickSum AI) is a fast, minimal web app that takes any article URL and returns a three-paragraph AI-generated summary powered by Google's Gemini API. Summaries are cached locally so repeat lookups are instant, and a history sidebar keeps your last 20 articles a click away.

---

## Features

| Feature | Details |
|---|---|
| **Instant AI Summaries** | Powered by Google Gemini — three focused paragraphs per article |
| **Smart Caching** | Summaries stored in `localStorage`; no repeat API calls for the same URL |
| **URL Validation** | Zod schema catches malformed URLs before any request is made |
| **History Browser** | Sidebar with up to 20 recent summaries — select, copy, or delete entries |
| **Dark Mode** | Class-based Tailwind dark theme, persisted across sessions |
| **Zero Sign-Up** | No account, no paywall — open the app and go |
| **Code Splitting** | React, Router, and Redux loaded as separate chunks for fast initial paint |

---

## Tech Stack

**Core**
- [React 18](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- [Vite 5](https://vitejs.dev/) — dev server and production bundler
- [React Router 6](https://reactrouter.com/) — client-side routing

**State & Data Fetching**
- [Redux Toolkit](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) — API state and caching

**Styling**
- [Tailwind CSS 3](https://tailwindcss.com/) — utility-first, dark mode via `class` strategy
- [react-icons](https://react-icons.github.io/react-icons/) — Bootstrap icon set

**Validation**
- [Zod 4](https://zod.dev/) — runtime URL schema validation

**Testing**
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) — unit and component tests
- [jsdom](https://github.com/jsdom/jsdom) — DOM simulation

**Code Quality**
- ESLint + Prettier — lint on save, format on commit
- Strict TypeScript — no implicit `any`

---

## Project Structure

```
src/
├── assets/              # SVG icons and logo
├── components/          # Shared components (ErrorBoundary, Spinner)
├── features/
│   ├── home/            # Landing page (hero, feature grid, testimonials)
│   └── summarize/       # Core feature (URL form, summary display, history)
│       ├── components/
│       ├── hooks/       # useArticleSummarizer — all summarizer logic
│       └── index.ts
├── hooks/               # useTheme, useLocalStorage
├── layout/              # Header, Footer, Layout wrapper
├── lib/                 # constants, Zod validators
├── store/               # Redux store + RTK Query articleApi
├── types/               # Article and API response types
└── test/                # Vitest setup
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Google Gemini API key — get one free at [aistudio.google.com](https://aistudio.google.com/app/apikey)

### Installation

```bash
# Clone the repo
git clone https://github.com/Engraya/QuickSum-AI.git
cd QuickSum-AI

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your Gemini API key:
# VITE_GEMINI_API_KEY=your_api_key_here
```

### Development

```bash
npm run dev        # Start dev server at http://localhost:5173
```

### Production Build

```bash
npm run build      # Type-check + Vite bundle → dist/
npm run preview    # Preview the production build locally
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key (required) |

Copy `.env.example` to `.env` and fill in your key. Never commit your `.env` file — it is already listed in `.gitignore`.

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint check (fails on warnings) |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run format` | Prettier format all `src/**/*.{ts,tsx,css}` |
| `npm run test` | Run test suite once (CI mode) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:coverage` | Generate v8 coverage report |
| `npm run test:ui` | Launch Vitest UI dashboard |

---

## How It Works

1. User pastes an article URL into the input field.
2. The URL is validated with a Zod schema — invalid URLs are rejected immediately.
3. The app checks `localStorage` for a cached summary of that URL.
4. On a cache miss, RTK Query sends a POST to the Gemini API with the URL and a summarization prompt.
5. Gemini uses its `url_context` tool to fetch and read the article, then returns a three-paragraph summary.
6. The summary is displayed, stored in cache, and prepended to the history sidebar.

---

## API Integration

- **Provider:** Google Gemini API
- **Base URL:** `https://generativelanguage.googleapis.com/v1beta/`
- **Model:** `gemini-3-flash-preview`
- **Auth:** API key passed as a query parameter (`?key=...`)
- **Tool used:** `url_context` — enables Gemini to browse the provided URL directly

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Author

Built by **Ahmad Ayaz** — [GitHub](https://github.com/Engraya)
