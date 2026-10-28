# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start Vite dev server with HMR
npm run build      # tsc -b && vite build (outputs to dist/)
npm run preview    # serve dist/ locally after building
npm run lint       # ESLint over src/
npm run deploy     # build then push dist/ to gh-pages branch (deploys to erineland.com)
```

There are no tests. TypeScript strict mode (`noUnusedLocals`, `noUnusedParameters`) catches most mistakes at build time.

## Architecture

Single-page app built with Vite + React 19 + TypeScript. No routing library — navigation uses hash fragment anchors (`#about`, `#experience`, etc.) with smooth scroll and an `IntersectionObserver` in `Navigation.tsx` to track the active section.

### Component structure

Each section lives in `src/components/<Section>/` with a paired CSS Module (`.module.css`). Sections in order: **Hero → About → Experience → Projects → Skills → Contact**. `App.tsx` composes them linearly; `Navigation.tsx` sits outside the scroll flow as a fixed header.

### Key dependencies and how they're used

- **Framer Motion** — all entry/hover/stagger animations. Components use `useInView` (with `margin: '-80px'` threshold) to trigger scroll-in animations. Project cards use 3D perspective transforms on mouse move via local `useState`.
- **Three.js / React Three Fiber / Drei** — powers `HeroScene.tsx` only: an animated icosahedron mesh + rotating particle field rendered in a `<Canvas>`. This is the heaviest chunk (~884 kB minified); it's isolated in `Hero/`.
- **gh-pages** — `npm run deploy` pushes `dist/` to the `gh-pages` branch. The `public/CNAME` file contains `erineland.com` so GitHub Pages serves the custom domain.

### Styling

CSS Modules for component scope; global variables in `src/index.css`:

```
--color-bg: #070b14
--color-surface: #0d1526
--color-card: #111d35
--color-pink: #ff2d78
--color-cyan: #00d4ff
--color-purple: #9333ea
```

Responsive breakpoints at 640 px, 768 px, and 900 px. Fonts: Inter (body) and Space Mono (monospace accents), loaded via Google Fonts in `index.html`.

### State management

Entirely local `useState` / `useEffect` — no context or external store. The most complex state is the typewriter effect in `Hero.tsx`, which cycles through an array of role strings using a timed state machine.

## Deployment

`npm run deploy` is the only deployment path. It runs `predeploy` (build) then `gh-pages -d dist`, pushing to the `gh-pages` branch on `origin`. GitHub Pages is configured to serve from that branch at `erineland.com`.

Always use SSH for the git remote (`git@github.com:erineland/personal-portfolio-github-pages.git`).
