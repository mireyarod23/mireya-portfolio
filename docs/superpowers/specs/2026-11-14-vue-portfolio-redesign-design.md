# mireyaroddev.com — Portfolio Redesign (Vue/Nuxt) & Deployment

**Date:** 2026-11-14
**Status:** Approved by Mireya (brainstorming session)
**Replaces:** 2019 Create React App site (React 16 + Bootstrap 4, formerly deployed to S3)

## Goals

1. Rebuild the portfolio as a modern one-page site that presents Mireya as what she is today: a front-end developer with 11+ years of experience, 6 of them in Vue 3 / Nuxt / TypeScript at OpenEye.
2. The site itself is a work sample: built with the exact stack on her resume headline (Nuxt, TypeScript, Tailwind CSS, Vitest).
3. Deploy to Vercel with auto-deploy from GitHub, and repoint the existing domain **mireyaroddev.com** (registered at Network Solutions until May 2027, currently pointing at a dead AWS Route 53 zone).

## Decisions Log

| Decision | Choice |
|---|---|
| Scope | Full redesign (not a port), with refreshed content from the 2026 resume |
| Structure | One-page scroll, anchor nav (no vue-router pages) |
| Style | Bold & Playful, Cream + Berry palette |
| Contact | Email + LinkedIn + GitHub links only — no form, no backend |
| Hosting | Vercel (free hobby tier), replacing AWS entirely |
| Domain | mireyaroddev.com — keep at Network Solutions, switch nameservers to Vercel |
| Stack | Latest stable Nuxt + TypeScript + Tailwind CSS, statically generated |
| Avanza | Teaser card only — described in general terms, no links/screenshots (private until launch) |
| Excluded | Phone number (privacy), contact form, blog/CMS, analytics |

## Site Structure & Content

Single page, sections in order, sticky top nav with anchor links (Work · Experience · Skills · Contact):

1. **Hero** — Headline "I build interfaces people actually like using." Eyebrow: "Front-End Developer · Albuquerque, NM". Intro sentence drawn from resume summary (11+ years, Vue 3/Nuxt at OpenEye for drug-discovery scientists). Buttons: "See my work ↓" (scrolls to Work), GitHub, LinkedIn. Stack badges: Vue 3, Nuxt, TypeScript, Tailwind CSS, Vitest, Cypress. Text-led — no photo.
2. **Selected Work** — card grid:
   - **Orion (OpenEye, Cadence Molecular Sciences)** — flagship full-width card: migrated legacy AngularJS workflows to Vue 3/Nuxt/TypeScript; design-system components with Storybook + PrimeVue; interactive charts for scientific data; Vitest + Cypress testing. No public repo (commercial product); the card links to the Orion product page on openeye.com.
   - **Climate Perspective** — AI-driven installation, Bradbury Science Museum (MEAN stack). Links to the LANL museum page. Reuses `Climate_P.png`.
   - **Bandelier AR Tour** — Unity + Vuforia AR tour app for Bandelier National Monument.
   - **Ranger Glove** — open-source VR glove, master's thesis. Links to github.com/mireyarod23/RangerGlove. Reuses `Ranger_Glove.jpg`.
   - **Museum touch-screen exhibits** — Radiation Knowledge game & Owls/Bats interactive (.NET, Unity, HTML5). Text-only card (no image).
   - **Avanza** — teaser card with an "In development" badge: building a reusable Vue 3 component library with Storybook, Tailwind CSS, and Vitest. General terms only — no link, no screenshots, no product details.

   Image rule: Climate Perspective and Ranger Glove cards show their images; Orion, Bandelier, Museum exhibits, and Avanza cards are text-only.
3. **Experience** — compact timeline: OpenEye (Software Engineer, Front-End, May 2020–present, remote) and LANL (Software Developer, 2015–2020). One line for education: M.S. (2019) & B.S. (2014) Software Systems Design, New Mexico Highlands University.
4. **Skills** — dark band, four groups from the resume: Front-End (Vue 3, Nuxt 3, TypeScript, Tailwind CSS, PrimeVue, Vite, Storybook); Testing (Vitest, Cypress, code review); AI-Assisted Development (Claude Code, Codex, GitHub Copilot); Data & More (interactive charts, SQL/PL-SQL, MongoDB, Python, C#, Docker, Figma).
5. **Contact** — "Let's talk." Email button (mireya.rod23@gmail.com), LinkedIn (linkedin.com/in/mireyarodev), GitHub (github.com/mireyarod23). Footer: "Built with Nuxt + TypeScript + Tailwind · deployed on Vercel · view source on GitHub."

All copy is finalized from the resume during implementation; no placeholder text ships. The unfinished Contact page problem from the old site goes away entirely.

## Visual Design

- **Palette:** cream background `#fdf6ec`, ink text `#2b2b2b`, berry accent `#c2185b`, berry-light `#ff8fb3` (accents on dark band), tan borders `#e5d9c5`. Skills band uses ink background with cream text.
- **Type:** bold display grotesque for headlines (Space Grotesk, weight 700–800), Inter for body. Self-hosted via Fontsource (no external font requests). Big, tight-leading headlines; berry-colored period/accent marks as a recurring motif.
- **Components look:** chunky 2px ink borders, rounded corners, offset berry box-shadow on the flagship card, slightly rotated (-1.5°) primary buttons, pill-shaped badges.
- **Motion:** subtle only — smooth anchor scrolling, gentle hover states. Respect `prefers-reduced-motion`.
- **Responsive:** single column on mobile; card grid collapses 2→1; nav collapses to a minimal menu.
- **Accessibility:** semantic landmarks (header/main/section/footer), one h1, alt text on all project images, visible focus states, AA contrast (ink-on-cream body text; berry used for accents and large text).

## Tech Architecture

- **Framework:** latest stable Nuxt, TypeScript strict, statically generated (`nuxt generate`); Vercel auto-detects the Nuxt preset.
- **Styling:** Tailwind CSS with the palette/fonts as design tokens in the Tailwind theme.
- **Component layout:** one component per section, kept small:
  - `app.vue` → `AppNav`, `HeroSection`, `WorkSection` (renders `ProjectCard`s), `ExperienceSection`, `SkillsSection`, `ContactSection` (includes footer)
- **Content model:** all copy, projects, skills, and links live in typed data files (`app/data/site.ts`, `projects.ts`, `skills.ts`, `experience.ts`) with TypeScript interfaces. Components render data; future content edits never touch components.
- **Assets:** project images copied from the old `src/assets/` into the new app, web-optimized (resized/compressed; modern formats where easy). Favicon replaced with a simple "m." mark in the palette.
- **SEO:** title, meta description, Open Graph tags, canonical URL, and JSON-LD Person schema (name, job title, links) via Nuxt's head management.
- **Testing:** Vitest + @nuxt/test-utils component tests — each section renders its data (e.g., all projects from `projects.ts` appear; nav contains the four anchor links). Small suite, run in CI-equivalent (`npm test`) before deploys.
- **Repo hygiene:** this branch (`codex/vue-portfolio-redesign`) replaces the CRA app in-place: old `src/`, `public/`, `build/`, and CRA dependencies removed; proper `.gitignore` added (node_modules, .nuxt, .output, dist, .superpowers). Recommended post-launch: rename the GitHub repo `webpage_react_aws` → `mireyaroddev` (GitHub redirects old URLs).

## Deployment & DNS

- **Vercel:** sign up / log in with GitHub, import `mireyarod23/webpage_react_aws`. Production branch: `master` (merge this branch when the site is approved). Every push gets a preview URL; merges to master deploy to production. HTTPS automatic.
- **Domain:** add `mireyaroddev.com` + `www.mireyaroddev.com` to the Vercel project. At Network Solutions, replace the current (dead AWS) nameservers with Vercel's (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`). Apex domain is primary; www redirects to apex. DNS propagation may take up to ~24–48h; the `.vercel.app` URL works immediately in the meantime.
- **No AWS involvement.** The old S3 bucket and any remaining AWS resources are abandoned (account access was lost; nothing depends on it).
- **Verification:** after DNS flips — site loads at https://mireyaroddev.com and https://www.mireyaroddev.com, HTTPS valid, all links work, Lighthouse pass (performance/a11y/SEO) on the production URL.

## Error Handling & Edge Cases

- Static site: no runtime data fetching, so failure modes are build-time only. CI/Vercel build fails loudly if content data doesn't typecheck.
- Broken external links are the main rot risk — outbound links (LANL museum page, GitHub repos) checked during implementation.
- 404s: Nuxt's default 404 page styled minimally in the palette (single-page site, so only hit by bad deep links).

## Out of Scope

- Contact form or any backend; blog/CMS; analytics; Avanza links/screenshots (teaser card only — a public "UI lab" Storybook of generic components is a possible future follow-up project); multi-page routes or project detail pages (can be added later behind the same design); AWS account recovery.
