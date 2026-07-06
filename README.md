# Ekara Financials — EKARA V1 Demo Platform

A production-quality, interactive investor-demo website for **Ekara Financials** built with React, Tailwind CSS, Framer Motion, and Recharts. Showcases the complete EKARA V1 product experience with no backend required.

## Stack

- **React 18** + **Vite**
- **Tailwind CSS v4** — Ekara brand theme
- **React Router** — multi-page routing
- **Framer Motion** — animations & transitions
- **Recharts** — interactive financial charts
- **Lucide Icons**

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Demo Logins

| Role | Email | Password |
|------|-------|----------|
| Startup | `startup@ekara.org.in` | `Startup@123` |
| Investor | `investor@ekara.org.in` | `Investor@123` |

Login persists via `localStorage`. Invalid credentials show **"Invalid credentials"**.

## Assets

Place in the **`public/`** folder:

- **`company-logo.png`** — Ekara logo (header, sidebar, footer)
- **`photo.jpg`** — founder photo (landing page)

## Project structure

```
src/
 ├── pages/           Landing, Login, Startup & Investor pages
 ├── layouts/         Dashboard sidebars (Startup & Investor)
 ├── components/ui/   Shared UI (KPICard, Badge, Tables, etc.)
 ├── charts/          Recharts components
 ├── data/            Demo data (12 companies, 24 months history)
 ├── hooks/           Auth hook
 ├── context/         Auth provider
 ├── routes/          Protected routes
 └── utils/           Formatting & constants
```

## Features

### Landing Page
- Hero with Startup Demo / Investor Demo CTAs
- Platform features, Why Ekara workflow, About, Impact, Founder, Contact

### Startup Dashboard
- KPI overview with animated cards & Recharts analytics
- Financial uploads, statements (P&L, BS, CF, Trial Balance)
- Burn & runway center, receivables/payables aging
- Expert insights and grant eligibility
- Investor management, reports center, settings

### Investor Dashboard
- Portfolio overview with 12 companies
- Company deep dive, risk center, expert commentary
- Expert commentary and portfolio reports
- Reports with PDF-style preview

## Build

```bash
npm run build
npm run preview
```
