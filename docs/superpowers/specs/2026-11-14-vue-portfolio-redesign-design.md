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
| Style | "Committed Petrol" — bold hero-band layout (option B) with the petrol/mint/amber palette (option C), chosen in the visual design review |
| Contact | Email + LinkedIn + GitHub links only — no form, no backend |
| Hosting | Vercel (free hobby tier), replacing AWS entirely |
| Domain | mireyaroddev.com — keep at Network Solutions, switch nameservers to Vercel |
| Stack | Latest stable Nuxt + TypeScript + Tailwind CSS, statically generated |
| Avanza | Teaser card only — described in general terms, no links/screenshots (private until launch) |
| Excluded | Phone number (privacy), contact form, blog/CMS, analytics |

## Site Structure & Content

Single page, sections in order, sticky top nav with anchor links (Work · Experience · Skills · Contact):

1. **Hero** — Headline "I build interfaces people actually like using." Eyebrow: "Front-End Developer · Albuquerque, NM". Intro sentence drawn from resume summary (11+ years, Vue 3/Nuxt at OpenEye for drug-discovery scientists). Buttons: "See my work ↓" (scrolls to Work), GitHub, LinkedIn. Stack badges: Vue 3, Nuxt, TypeScript, Tailwind CSS, Vitest, Cypress. Text-led — no photo.
2. **Selected Work** — mixed layout (no uniform card grid): a full-width flagship card, two standard cards, then a compact list for older work:
   - **Orion (OpenEye, Cadence Molecular Sciences)** — flagship full-width card: migrated legacy AngularJS workflows to Vue 3/Nuxt/TypeScript; design-system components with Storybook + PrimeVue; interactive charts for scientific data; Vitest + Cypress testing. Text-only card with no outbound link — Orion is OpenEye's property; the card describes Mireya's role only (same scope as her public resume).
   - **Climate Perspective** — AI-driven installation, Bradbury Science Museum (MEAN stack). Links to the LANL museum page. Reuses `Climate_P.png`.
   - **Avanza** — standard card with an "In development" badge: solo-built full-stack product (Vue 3 + TypeScript web app, Node.js API, background job queues, Supabase realtime, SMS integration, Storybook component library). Tech stack only — no link, no screenshots, nothing about what the product does.
   - **Compact list rows** (title + one-line description + mono tag labels, divided by hairlines): **Ranger Glove** (open-source VR glove, master's thesis, links to github.com/mireyarod23/RangerGlove), **Bandelier AR Tour** (Unity + Vuforia AR tour app), **Museum touch-screen exhibits** (Radiation Knowledge game & Owls/Bats interactive — .NET, Unity, HTML5).

   Image rule: only the Climate Perspective card shows an image (`Climate_P.png`, optimized). Everything else is text-only; the old `Ranger_Glove.jpg` is no longer used.
3. **Experience** — compact timeline: OpenEye (Software Engineer, Front-End, May 2020–present, remote) and LANL (Software Developer, 2015–2020). One line for education: M.S. (2019) & B.S. (2014) Software Systems Design, New Mexico Highlands University.
4. **Skills** — petrol band (same surface as the hero), four groups from the resume: Front-End (Vue 3, Nuxt 3, TypeScript, Tailwind CSS, PrimeVue, Vite, Storybook); Testing (Vitest, Cypress, code review); AI-Assisted Development (Claude Code, Codex, GitHub Copilot); Data & More (interactive charts, SQL/PL-SQL, MongoDB, Python, C#, Docker, Figma).
5. **Contact** — "Let's talk." Email button (mireya.rod23@gmail.com), LinkedIn (linkedin.com/in/mireyarodev), GitHub (github.com/mireyarod23). Footer: "Built with Nuxt + TypeScript + Tailwind · deployed on Vercel · view source on GitHub."

All copy is finalized from the resume during implementation; no placeholder text ships. The unfinished Contact page problem from the old site goes away entirely.

## Visual Design

"Committed Petrol" — a committed color strategy (per impeccable's design laws): the deep petrol surface carries the nav + hero band and the skills band (~40% of the page); everything between sits on petrol-tinted light paper. No pure `#000`/`#fff` anywhere; all neutrals tinted toward the petrol hue.

- **Palette (design tokens):**
  - `petrol` `#0d3b3e` — hero/skills band background; email button; favicon
  - `petrol-line` `#2e5a5c` — borders on dark surfaces
  - `mint` `#6fc2b4` — accents on dark (eyebrow, mono labels, badge chips)
  - `teal` `#1d7a6e` — accent text and links on light surfaces (AA-safe)
  - `amber` `#ffb35c` — primary CTA pill, heading period motif, Avanza badge
  - `paper` `#f6f9f7` — light page background; `card` `#fbfdfc` — card surfaces; `line` `#dbe6e0` — hairlines/borders on light
  - `ink` `#22302d`, `ink-muted` `#5c6b65`, `ink-faint` `#8fa39b` — text on light
  - `frost` `#eef6f4`, `frost-muted` `#9dc4bd`, `frost-body` `#c7ded8` — text on petrol
- **Type:** Space Grotesk (display — headings, names, buttons; 700, tight tracking), Inter (body), JetBrains Mono (microtext — eyebrows, tags, dates, footer). All self-hosted via Fontsource variable packages (no external font requests).
- **Components look:** pill-shaped buttons (amber primary on dark, petrol primary on light); cards with 1px `line` borders and ~16px radius on `card` surfaces; compact list rows divided by hairlines with right-aligned mono tag labels; amber period after section headings ("Selected work**.**") as the recurring motif.
- **Motion:** subtle only — smooth anchor scrolling, gentle hover transitions. Respect `prefers-reduced-motion`.
- **Responsive:** single column on mobile; the two-up card row collapses 2→1; list-row tag labels wrap below the title; nav collapses to a minimal menu.
- **Accessibility:** semantic landmarks (header/main/section/footer), one h1, alt text on the project image, visible focus states, AA contrast (ink-on-paper body; frost-on-petrol body; `teal` not `mint` for small text on light surfaces).

## Tech Architecture

- **Framework:** latest stable Nuxt, TypeScript strict, statically generated (`nuxt generate`); Vercel auto-detects the Nuxt preset.
- **Styling:** Tailwind CSS with the palette/fonts as design tokens in the Tailwind theme.
- **Component layout:** one component per section, kept small:
  - `app.vue` → `AppNav`, `HeroSection`, `WorkSection` (renders `ProjectCard`s), `ExperienceSection`, `SkillsSection`, `ContactSection` (includes footer)
- **Content model:** all copy, projects, skills, and links live in typed data files (`app/data/site.ts`, `projects.ts`, `skills.ts`, `experience.ts`) with TypeScript interfaces. Components render data; future content edits never touch components.
- **Assets:** only `Climate_P.png` is carried over from the old `src/assets/`, web-optimized (resized/compressed). Favicon replaced with a simple "m." mark — frost "m" + amber "." on a petrol rounded square.
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
