# Ekara Financials — React Portfolio

A React version of the Ekara Financials static site with the same light green & white theme, improved structure, and **Framer Motion** animations (scroll reveals, staggered cards, count-up stats, hover effects, hero journey animation).

## Stack

- **React 18** + **Vite**
- **Framer Motion** for animations
- Same fonts: DM Sans, Playfair Display
- Same palette: greens, white, gray (see `src/index.css`)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # optional: preview production build
```

## Assets

Put these in the **`public/`** folder so they are served from the root:

- **`company-logo.png`** — used in header and footer
- **`photo.jpg`** — founder photo in the Leadership section

If `company-logo.png` is missing, a fallback “E” logo is shown.

## Project structure

- `src/App.jsx` — main app with all sections
- `src/components/` — Header, Hero, About, StartupSuite, PersonalFinanceSuite, CorporateFinanceSuite, Services, Impact, WhyEkara, Founder, Contact, Footer
- `src/components/Reveal.jsx` — shared `Reveal`, `StaggerReveal`, `CardReveal` animation wrappers
- `src/index.css` — global theme and layout (same as original theme)

## Animations

- **Hero:** Staggered fade-up for heading and CTA; animated “journey” rail and moving dot (Start → Grow → Scale)
- **Sections:** Fade-up on scroll for section headers
- **Cards:** Staggered reveal when in view; slight lift on hover
- **Impact:** Count-up when stats enter view
- **Header:** Shadow on scroll; mobile menu toggle

Original static files (`index.html` overwritten by Vite; backup your copy if needed), `styles.css`, and `script.js` are no longer used by the React app. You can keep them for reference or remove them.
