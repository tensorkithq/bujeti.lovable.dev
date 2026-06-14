# Beamline — landing page exploration

An exploratory landing-page design for **Beamline** — the financial command center for fast-moving teams: corporate cards, payments, payroll, and invoicing on one platform. This repo is one branch of that conversation: a self-contained design direction to react to, not a finished product site.

Built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui. The hero uses a WebGL laser-flow shader (Three.js).

## Development

```sh
npm install
npm run dev      # http://localhost:8080
```

## Build

```sh
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Deploy (Vercel)

The repo is Vercel-ready: Vercel auto-detects Vite (`npm run build` → `dist/`), and `vercel.json` rewrites all routes to `index.html` so React Router deep links (`/pricing`, `/experimental`, …) resolve.

```sh
vercel           # preview deploy
vercel --prod    # production
```

Or import the repo at vercel.com/new with default settings.

## Pages

- `/` — landing (laser-flow hero, products grid)
- `/pricing`, `/pricing-experimental` — pricing with manifesto
- `/experimental`, `/fire` — effect playgrounds

## Notes

- The hero's WebGL fog intensity renders poorly on Safari; see the comment in `src/blocks/Hero.tsx` for the compatibility value.
- Feature-card imagery and the hero reveal image are hotlinked from external CDNs (Framer, Dribbble) — replace with local assets before serious production use.
