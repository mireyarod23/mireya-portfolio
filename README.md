# mireyaroddev.com

Personal portfolio of Mireya Rodriguez — front-end developer (Vue 3 · Nuxt · TypeScript · Tailwind CSS).

One-page static site built with Nuxt and Tailwind CSS, tested with Vitest, deployed on Vercel.

## Development

- `npm install` — install dependencies
- `npm run dev` — dev server at http://localhost:3000
- `npm test` — run component tests (Vitest)
- `npm run typecheck` — TypeScript check
- `npm run generate` — static production build in `.output/public` (`dist` symlink)

## Content

All copy lives in `app/data/` (typed TypeScript objects). Edit those files to update
projects, skills, experience, or links — components render whatever is there.

## Deployment

Pushes to `master` deploy to production via Vercel; other branches get preview URLs.
Build command `npm run generate`, output directory `dist`.
