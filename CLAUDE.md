# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Rivals (CompetitorHUB)** — An AI-powered competitive intelligence platform for tracking and analyzing competitors. Built as a Next.js frontend that consumes two separate backends:
- **Main API**: `https://api.rivalis.ai` — analytics, company data, charts
- **MVC Backend**: `https://mvc.bluesuite.in` — authentication, user management

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm start        # Run production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

### Tech Stack
- **Framework**: Next.js (App Router, Server + Client Components)
- **Language**: TypeScript 5 (strict mode, `@` alias maps to `src/`)
- **Styling**: Tailwind CSS v4 + shadcn/ui (New York style, dark mode default)
- **State**: Zustand stores (one per domain, no global app state)
- **Charts**: Recharts (dashboards), Three.js/React Three Fiber (landing 3D effects)
- **Animations**: Motion, tw-animate-css
- **Notifications**: Sonner toasts

### Route Structure
```
/                          → Landing page (public, forced dark mode)
/login                     → Email/password login + SSO entry (?token=)
/signup                    → Account creation
/dashboard                 → Company list (protected)
/dashboard/company/[slug]  → Company detail tabs (protected)
```

Route protection operates at two levels:
1. **Middleware** (`src/middleware.ts`) — checks `auth-storage` cookie before rendering
2. **AuthProvider** (`src/components/providers/auth-provider.tsx`) — client-side redirect on missing token

### Authentication Flows

**SSO** (from external portal):
- Token arrives via `?token=` query param → base64-decoded → validated against MVC backend → `X-Direct-Login-Secret` header sent to Rivalis API for direct login

**Normal login**:
- MVC backend login → fetch user details → Rivalis direct login

**Storage strategy** — token persisted in two places simultaneously:
- `localStorage` — for client-side Zustand stores
- Cookie (`auth-storage`, 7-day expiry) — for middleware access during SSR/routing

### Zustand Stores (`src/store/`)
Each store manages a single domain. All use localStorage + cookie dual-storage.

| Store | Responsibility |
|---|---|
| `authStore` | Session, token, user info |
| `companiesStore` | Competitor list, CRUD |
| `companyDataStore` | Currently selected company details |
| `socialMediaStore` | IG/Twitter/YT/FB/LinkedIn metrics |
| `websiteStore` | Traffic + sentiment analytics |
| `scrapingStore` | Background scraping task status |
| `revenueStore` | Revenue data |
| `fundraisingStore` | Funding data |
| `pickleballPricingStore` | Pricing metrics |

### API Client (`src/lib/api-client.ts`)
Custom `ApiClient` class — no axios. Features:
- Auto-injects `Authorization: Bearer <token>` headers
- Normalizes errors (401 → logout, 422 → validation messages)
- Fires Sonner toasts on errors

### Component Organization
- `src/components/Landing/` — public landing page (isolated with `ForceDarkMode` provider)
- `src/components/dashboard/` — sidebar, top nav, content area, modals
- `src/components/company/` — tab components (Overview, Website, Social Media, Pricing, Sentiment)
- `src/components/auth/` — AuthGuard, AutoLogin, protected-route HOC
- `src/components/providers/` — ThemeProvider, AuthProvider, ForceDarkMode
- `src/components/ui/` — shadcn/ui wrappers + custom primitives

### Key Conventions
- Mark Client Components explicitly with `"use client"` — Server Components are the default
- Company tabs are individual files in `src/components/company/` (one component per tab)
- Dashboard forces dark mode; landing page also forces dark mode; only `/signup` and some auth pages respect system theme
- shadcn components live in `src/components/ui/`; don't add business logic there
