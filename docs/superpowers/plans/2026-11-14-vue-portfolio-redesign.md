# mireyaroddev.com Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the legacy 2019 Create React App portfolio with a statically generated Nuxt + TypeScript + Tailwind one-page site in the approved "Committed Petrol" design, and deploy it to Vercel at mireyaroddev.com.

**Architecture:** Single-page Nuxt app (latest stable, `app/` source directory), statically generated. One Vue SFC per page section; all copy/projects/skills live in typed data files under `app/data/` so components never hard-code content. Vitest + @nuxt/test-utils component tests assert each section renders its data. Deployment is Vercel auto-deploy from GitHub `master`; DNS fixed by switching Network Solutions nameservers to Vercel.

**Tech Stack:** Nuxt (latest stable), TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Fontsource variable fonts (Space Grotesk, Inter, JetBrains Mono), Vitest, @nuxt/test-utils, happy-dom, Vercel.

**Design ("Committed Petrol" — see spec Visual Design for full tokens):** deep petrol band carries nav + hero and the skills section; petrol-tinted paper between; pill buttons (amber primary on dark, petrol on light); cards with 1px hairline borders; compact list rows for older work; amber period after headings; Space Grotesk display / Inter body / JetBrains Mono microtext. No pure #000/#fff.

**Code conventions (from Mireya's Avanza rules — `~/Development/avanza/docs/agent/rules/{vue,typescript,testing}.md`):**
- SFC block order `script setup lang="ts"` → `template` → `style scoped` (omit style block if unused); script internal order: imports → props/emits → reactive state → computed → watchers → lifecycle → functions
- Props via TypeScript generics with a `Props` interface — never runtime object declarations
- Template shorthand (`:prop`, `@event`), self-close slotless components, `:key` with a stable unique ID (never array index), never `v-if` + `v-for` on the same element
- No abbreviations (`isMenuOpen`, not `open`); no bare `id` fields (`projectId`); constants SCREAMING_SNAKE_CASE
- `Array<T>` — never `T[]`; no `any`; `import type` for type-only imports; no TypeScript `enum`
- No semicolons; trailing commas on multiline expressions; max line length 120; no `console.log`
- Tests co-located in `__tests__/` next to the file under test; files named `<Component>.spec.ts`; `data-test` attributes for element selection (never class/element selectors); DOM + content assertions, no snapshot-only tests
- Deliberate deviation: Nuxt auto-imports (`ref`, `useSeoMeta`, components) are used instead of explicit Vue core imports — idiomatic Nuxt, and this site doubles as a Nuxt work sample

**Spec:** `docs/superpowers/specs/2026-11-14-vue-portfolio-redesign-design.md` — read it first for palette, copy, and content rules.

**Working branch:** `codex/vue-portfolio-redesign` (already checked out). Repo root: `/Users/m/Development/webpage_react_aws`.

---

## File Structure (end state)

```
├── .gitignore                      (expanded)
├── package.json                    (new — Nuxt app)
├── nuxt.config.ts
├── tsconfig.json
├── vitest.config.ts
├── README.md                       (rewritten)
├── app/
│   ├── app.vue                     (assembles sections, SEO head)
│   ├── error.vue                   (minimal 404 in the palette)
│   ├── assets/css/main.css         (Tailwind import + design tokens)
│   ├── components/
│   │   ├── AppNav.vue
│   │   ├── HeroSection.vue
│   │   ├── WorkSection.vue
│   │   ├── ProjectCard.vue
│   │   ├── ProjectRow.vue
│   │   ├── ExperienceSection.vue
│   │   ├── SkillsSection.vue
│   │   ├── ContactSection.vue
│   │   └── __tests__/              (co-located specs)
│   └── data/
│       ├── types.ts
│       ├── site.ts
│       ├── projects.ts
│       ├── experience.ts
│       └── skills.ts
├── public/
│   ├── favicon.svg
│   └── images/
│       └── climate-perspective.jpg
└── docs/superpowers/...            (spec + this plan)
```

Removed: `src/`, `public/` (CRA version), `build/`, CRA `package.json`/`package-lock.json`, `node_modules/` (tracked), CRA `README.md`.

---

### Task 1: Remove the legacy CRA app

**Files:**
- Delete (tracked): `src/`, `public/`, `build/`, `package.json`, `package-lock.json`, `README.md`, `node_modules/` (if tracked)
- Preserve to `/tmp`: `src/assets/Climate_P.png`

- [ ] **Step 1: Stage the image we keep**

```bash
cp /Users/m/Development/webpage_react_aws/src/assets/Climate_P.png /tmp/Climate_P.png
ls -la /tmp/Climate_P.png
```

Expected: file listed.

- [ ] **Step 2: Remove tracked CRA files**

```bash
cd /Users/m/Development/webpage_react_aws
git rm -r -q src public build package.json package-lock.json README.md
# node_modules may be tracked (repo predates .gitignore). Check and remove from the index if so:
git ls-files node_modules | head -1
# If the line above printed anything:
git rm -r -q --cached node_modules
rm -rf node_modules
```

Expected: `git status` shows only deletions.

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove legacy Create React App

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Nuxt + Tailwind scaffold with the petrol design tokens

**Files:**
- Create: `package.json`, `nuxt.config.ts`, `tsconfig.json`, `app/app.vue`, `app/assets/css/main.css`, `public/favicon.svg`, `public/images/climate-perspective.jpg`
- Modify: `.gitignore`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "mireyaroddev",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "test": "vitest run",
    "typecheck": "nuxi typecheck"
  },
  "dependencies": {
    "nuxt": "^4.0.0",
    "vue": "^3.5.0"
  },
  "devDependencies": {
    "@fontsource-variable/inter": "^5.0.0",
    "@fontsource-variable/jetbrains-mono": "^5.0.0",
    "@fontsource-variable/space-grotesk": "^5.0.0",
    "@nuxt/test-utils": "^3.14.0",
    "@tailwindcss/vite": "^4.0.0",
    "@vue/test-utils": "^2.4.0",
    "happy-dom": "^15.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0",
    "vitest": "^3.0.0",
    "vue-tsc": "^2.1.0"
  }
}
```

Note: carets resolve to current minors. If `npm install` reports a peer-dependency conflict, change the conflicting devDependency to the version npm's error message suggests and re-run — do not use `--force`.

- [ ] **Step 2: Write `nuxt.config.ts`**

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-14',
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
    },
  },
})
```

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "extends": "./.nuxt/tsconfig.json"
}
```

- [ ] **Step 4: Write `app/assets/css/main.css` (Committed Petrol tokens from the spec)**

```css
@import "tailwindcss";
@import "@fontsource-variable/space-grotesk";
@import "@fontsource-variable/inter";
@import "@fontsource-variable/jetbrains-mono";

@theme {
  --color-petrol: #0d3b3e;
  --color-petrol-line: #2e5a5c;
  --color-mint: #6fc2b4;
  --color-teal: #1d7a6e;
  --color-amber: #ffb35c;
  --color-paper: #f6f9f7;
  --color-card: #fbfdfc;
  --color-line: #dbe6e0;
  --color-ink: #22302d;
  --color-ink-muted: #5c6b65;
  --color-ink-faint: #8fa39b;
  --color-frost: #eef6f4;
  --color-frost-muted: #9dc4bd;
  --color-frost-body: #c7ded8;
  --font-display: "Space Grotesk Variable", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 5: Write placeholder `app/app.vue`** (replaced in Task 10)

```vue
<template>
  <div class="min-h-screen bg-paper font-body text-ink antialiased">
    <h1 class="p-10 font-display text-4xl font-bold">
      mireyaroddev<span class="text-amber">.</span>com — under construction
    </h1>
  </div>
</template>
```

- [ ] **Step 6: Write `public/favicon.svg`** (frost "m" + amber "." on petrol)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#0d3b3e"/><text x="32" y="45" font-family="system-ui, sans-serif" font-size="38" font-weight="800" text-anchor="middle" fill="#eef6f4">m<tspan fill="#ffb35c">.</tspan></text></svg>
```

- [ ] **Step 7: Optimize and place the preserved image**

```bash
cd /Users/m/Development/webpage_react_aws
mkdir -p public/images
sips -Z 1200 -s format jpeg -s formatOptions 80 /tmp/Climate_P.png --out public/images/climate-perspective.jpg
ls -la public/images/
```

Expected: one `.jpg` file, well under 300 KB.

- [ ] **Step 8: Replace `.gitignore` content**

```
node_modules/
.nuxt/
.output/
dist/
.vercel/
.superpowers/
.DS_Store
*.log
```

- [ ] **Step 9: Install and verify the static build**

```bash
cd /Users/m/Development/webpage_react_aws
npm install
npm run generate
```

Expected: install succeeds; generate ends with `✔ You can now deploy .output/public` (or similar "prerendered" success line). If `@tailwindcss/vite` fails to resolve inside `nuxt.config.ts`, run `npx nuxi prepare` once and retry.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Nuxt + Tailwind app with Committed Petrol design tokens

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Typed content data

All copy comes from the spec's "Site Structure & Content" section. Components added later must render **only** this data.

**Files:**
- Create: `app/data/types.ts`, `app/data/site.ts`, `app/data/projects.ts`, `app/data/experience.ts`, `app/data/skills.ts`

- [ ] **Step 1: Write `app/data/types.ts`**

```ts
export interface Project {
  projectId: string
  title: string
  eyebrow?: string
  badge?: string
  description: string
  tags: Array<string>
  link?: { label: string; url: string }
  image?: { src: string; alt: string }
  flagship?: boolean
  compact?: boolean
}

export interface ExperienceItem {
  organization: string
  role: string
  period: string
  summary: string
  current: boolean
}

export interface SkillGroup {
  label: string
  items: Array<string>
}
```

- [ ] **Step 2: Write `app/data/site.ts`**

```ts
export const site = {
  name: 'Mireya Rodriguez',
  url: 'https://mireyaroddev.com',
  metaTitle: 'Mireya Rodriguez — Front-End Developer (Vue, Nuxt, TypeScript)',
  metaDescription:
    'Front-end developer in Albuquerque, NM with 11+ years of experience building Vue 3 and Nuxt applications in TypeScript. I build interfaces people actually like using.',
  eyebrow: 'Front-End Developer · Albuquerque, NM',
  headline: {
    pre: 'I build interfaces',
    highlight: 'people actually like',
    post: 'using.',
  },
  intro:
    '11+ years in front-end, the last 6 building Vue 3 and Nuxt apps in TypeScript for drug-discovery scientists at OpenEye, Cadence Molecular Sciences. I turn complex workflows into tools people enjoy.',
  email: 'mireya.rod23@gmail.com',
  links: {
    github: 'https://github.com/mireyarod23',
    linkedin: 'https://www.linkedin.com/in/mireyarodev',
    repo: 'https://github.com/mireyarod23/webpage_react_aws',
  },
  badges: ['Vue 3', 'Nuxt', 'TypeScript', 'Tailwind CSS', 'Vitest', 'Cypress'],
}
```

- [ ] **Step 3: Write `app/data/projects.ts`**

Order matters: featured cards render in array order (Orion full-width, then Avanza + Climate Perspective two-up), compact rows after.

```ts
import type { Project } from './types'

export const projects: Array<Project> = [
  {
    projectId: 'orion',
    title: 'Orion — drug-discovery SaaS front end',
    eyebrow: 'Flagship · OpenEye, Cadence Molecular Sciences',
    description:
      'Migrated legacy AngularJS workflows to Vue 3, Nuxt, and TypeScript. Design-system components built in Storybook with PrimeVue, interactive charts for scientific data, and Vitest + Cypress test coverage.',
    tags: ['Vue 3', 'Nuxt', 'TypeScript', 'Tailwind', 'Storybook', 'PrimeVue'],
    flagship: true,
  },
  {
    projectId: 'avanza',
    title: 'Avanza',
    badge: 'In development',
    description:
      'Building a reusable Vue 3 component library with Storybook, Tailwind CSS, and Vitest. Private while in development.',
    tags: ['Vue 3', 'Storybook', 'Tailwind CSS', 'Vitest'],
  },
  {
    projectId: 'climate-perspective',
    title: 'Climate Perspective',
    description:
      'AI-driven interactive installation at the Bradbury Science Museum, built on the MEAN stack (MongoDB, Express, AngularJS, Node.js).',
    tags: ['AngularJS', 'Node.js', 'MongoDB', 'Machine learning'],
    link: {
      label: 'Bradbury Science Museum',
      url: 'https://www.lanl.gov/museum/exhibitions/research-gallery/climate-perspectives-about.php',
    },
    image: {
      src: '/images/climate-perspective.jpg',
      alt: 'Climate Perspective interactive installation at the Bradbury Science Museum',
    },
  },
  {
    projectId: 'ranger-glove',
    title: 'Ranger Glove',
    description: 'Open-source virtual-reality glove built from off-the-shelf parts — my master’s thesis.',
    tags: ['Unity', 'Arduino', 'C#'],
    link: { label: 'GitHub', url: 'https://github.com/mireyarod23/RangerGlove' },
    compact: true,
  },
  {
    projectId: 'bandelier',
    title: 'Bandelier AR Tour',
    description: 'Augmented-reality tour app for Bandelier National Monument.',
    tags: ['Unity', 'Vuforia'],
    compact: true,
  },
  {
    projectId: 'museum-exhibits',
    title: 'Museum touch-screen exhibits',
    description: 'Radiation Knowledge game and Owls & Bats interactive for the Bradbury Science Museum.',
    tags: ['.NET', 'Unity', 'HTML5'],
    compact: true,
  },
]
```

- [ ] **Step 4: Write `app/data/experience.ts`**

```ts
import type { ExperienceItem } from './types'

export const experience: Array<ExperienceItem> = [
  {
    organization: 'OpenEye, Cadence Molecular Sciences',
    role: 'Software Engineer, Front-End',
    period: '2020 — now',
    summary:
      'Front end for Orion, a cloud-native molecular-design platform used by pharma and biotech scientists.',
    current: true,
  },
  {
    organization: 'Los Alamos National Laboratory',
    role: 'Software Developer',
    period: '2015 — 2020',
    summary:
      'Museum installations and AR apps, AngularJS web apps, and Oracle/PL-SQL database modernization.',
    current: false,
  },
]

export const education =
  'M.S. & B.S. Software Systems Design — New Mexico Highlands University'
```

- [ ] **Step 5: Write `app/data/skills.ts`**

```ts
import type { SkillGroup } from './types'

export const skillGroups: Array<SkillGroup> = [
  {
    label: 'Front-End',
    items: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Tailwind CSS', 'PrimeVue', 'Vite', 'Storybook'],
  },
  {
    label: 'Testing',
    items: ['Vitest', 'Cypress', 'Code review'],
  },
  {
    label: 'AI-Assisted Development',
    items: ['Claude Code', 'Codex', 'GitHub Copilot'],
  },
  {
    label: 'Data & More',
    items: ['Interactive charts', 'SQL / PL-SQL', 'MongoDB', 'Python', 'C#', 'Docker', 'Figma'],
  },
]
```

- [ ] **Step 6: Typecheck**

```bash
cd /Users/m/Development/webpage_react_aws && npm run typecheck
```

Expected: exits 0, no errors.

- [ ] **Step 7: Commit**

```bash
git add app/data
git commit -m "feat: add typed site content (copy, projects, experience, skills)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Vitest setup + AppNav (TDD)

**Files:**
- Create: `vitest.config.ts`, `app/components/__tests__/AppNav.spec.ts`, `app/components/AppNav.vue`

- [ ] **Step 1: Write `vitest.config.ts`**

```ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
  },
})
```

- [ ] **Step 2: Write the failing test `app/components/__tests__/AppNav.spec.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppNav from '~/components/AppNav.vue'

describe('AppNav', () => {
  it('links to all four page sections', async () => {
    const wrapper = await mountSuspended(AppNav)
    const hrefs = wrapper.findAll('[data-test="nav-link"]').map(link => link.attributes('href'))
    for (const anchor of ['#work', '#experience', '#skills', '#contact']) {
      expect(hrefs).toContain(anchor)
    }
  })

  it('shows the logo mark', async () => {
    const wrapper = await mountSuspended(AppNav)
    expect(wrapper.find('[data-test="nav-logo"]').text()).toContain('mireya')
  })

  it('opens the mobile menu on click', async () => {
    const wrapper = await mountSuspended(AppNav)
    expect(wrapper.find('[data-test="mobile-menu"]').exists()).toBe(false)
    await wrapper.find('[data-test="menu-button"]').trigger('click')
    expect(wrapper.find('[data-test="mobile-menu"]').exists()).toBe(true)
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

```bash
cd /Users/m/Development/webpage_react_aws && npx vitest run app/components/__tests__/AppNav.spec.ts
```

Expected: FAIL (cannot resolve `~/components/AppNav.vue`).

- [ ] **Step 4: Write `app/components/AppNav.vue`** (sits on the petrol band)

```vue
<script setup lang="ts">
const isMenuOpen = ref(false)

const sectionLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-petrol-line bg-petrol/95 text-frost backdrop-blur">
    <nav class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4" aria-label="Main">
      <a href="#top" data-test="nav-logo" class="font-display text-lg font-bold">
        mireya<span class="text-amber">.</span>
      </a>

      <div class="hidden items-center gap-6 text-sm font-semibold sm:flex">
        <a
          v-for="sectionLink in sectionLinks"
          :key="sectionLink.href"
          :href="sectionLink.href"
          data-test="nav-link"
          class="text-frost-muted transition hover:text-frost"
        >
          {{ sectionLink.label }}
        </a>
        <a
          href="#contact"
          data-test="nav-link"
          class="rounded-full bg-amber px-4 py-1.5 font-display font-bold text-petrol transition hover:bg-frost"
        >
          Contact
        </a>
      </div>

      <button
        data-test="menu-button"
        class="rounded-full border border-petrol-line px-3 py-1 text-sm font-semibold sm:hidden"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        Menu
      </button>
    </nav>

    <div
      v-if="isMenuOpen"
      id="mobile-menu"
      data-test="mobile-menu"
      class="border-t border-petrol-line px-6 py-2 sm:hidden"
    >
      <a
        v-for="sectionLink in [...sectionLinks, { label: 'Contact', href: '#contact' }]"
        :key="sectionLink.href"
        :href="sectionLink.href"
        data-test="mobile-nav-link"
        class="block py-2 text-sm font-semibold text-frost-muted hover:text-frost"
        @click="isMenuOpen = false"
      >
        {{ sectionLink.label }}
      </a>
    </div>
  </header>
</template>
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx vitest run app/components/__tests__/AppNav.spec.ts
```

Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts app/components
git commit -m "feat: add sticky petrol nav with mobile menu (TDD)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: HeroSection (TDD)

**Files:**
- Create: `app/components/__tests__/HeroSection.spec.ts`, `app/components/HeroSection.vue`

- [ ] **Step 1: Write the failing test `app/components/__tests__/HeroSection.spec.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HeroSection from '~/components/HeroSection.vue'
import { site } from '~/data/site'

describe('HeroSection', () => {
  it('renders the full headline', async () => {
    const wrapper = await mountSuspended(HeroSection)
    expect(wrapper.text()).toContain(site.headline.pre)
    expect(wrapper.text()).toContain(site.headline.highlight)
    expect(wrapper.text()).toContain(site.headline.post)
  })

  it('renders every stack badge', async () => {
    const wrapper = await mountSuspended(HeroSection)
    const badges = wrapper.findAll('[data-test="hero-badge"]')
    expect(badges.length).toBe(site.badges.length)
    for (const badge of site.badges) {
      expect(wrapper.text()).toContain(badge)
    }
  })

  it('links to GitHub and LinkedIn', async () => {
    const wrapper = await mountSuspended(HeroSection)
    expect(wrapper.find('[data-test="hero-github-link"]').attributes('href')).toBe(site.links.github)
    expect(wrapper.find('[data-test="hero-linkedin-link"]').attributes('href')).toBe(site.links.linkedin)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run app/components/__tests__/HeroSection.spec.ts
```

Expected: FAIL (cannot resolve component).

- [ ] **Step 3: Write `app/components/HeroSection.vue`** (petrol band, continues from the nav)

```vue
<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <section id="top" class="bg-petrol text-frost">
    <div class="mx-auto max-w-5xl px-6 pb-20 pt-14">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-mint">{{ site.eyebrow }}</p>
      <h1 class="mt-5 max-w-2xl font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
        {{ site.headline.pre }} {{ site.headline.highlight }} {{ site.headline.post }}
      </h1>
      <p class="mt-6 max-w-xl leading-relaxed text-frost-muted">{{ site.intro }}</p>

      <div class="mt-9 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          data-test="hero-work-link"
          class="rounded-full bg-amber px-6 py-2.5 font-display text-sm font-bold text-petrol transition hover:bg-frost"
        >See the work ↓</a>
        <a
          :href="site.links.github"
          data-test="hero-github-link"
          class="rounded-full border border-petrol-line px-5 py-2 text-sm font-semibold transition hover:border-mint hover:text-mint"
        >GitHub</a>
        <a
          :href="site.links.linkedin"
          data-test="hero-linkedin-link"
          class="rounded-full border border-petrol-line px-5 py-2 text-sm font-semibold transition hover:border-mint hover:text-mint"
        >LinkedIn</a>
      </div>

      <ul class="mt-8 flex flex-wrap gap-2">
        <li
          v-for="badge in site.badges"
          :key="badge"
          data-test="hero-badge"
          class="rounded-md border border-petrol-line px-2.5 py-1 font-mono text-[11px] text-mint"
        >{{ badge }}</li>
      </ul>
    </div>
  </section>
</template>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run app/components/__tests__/HeroSection.spec.ts
```

Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add app/components/__tests__/HeroSection.spec.ts app/components/HeroSection.vue
git commit -m "feat: add petrol hero section (TDD)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: ProjectCard + ProjectRow + WorkSection (TDD)

**Files:**
- Create: `app/components/__tests__/WorkSection.spec.ts`, `app/components/ProjectCard.vue`, `app/components/ProjectRow.vue`, `app/components/WorkSection.vue`

- [ ] **Step 1: Write the failing test `app/components/__tests__/WorkSection.spec.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import WorkSection from '~/components/WorkSection.vue'
import { projects } from '~/data/projects'

describe('WorkSection', () => {
  it('renders every project title', async () => {
    const wrapper = await mountSuspended(WorkSection)
    for (const project of projects) {
      expect(wrapper.text()).toContain(project.title)
    }
  })

  it('renders compact projects as rows and the rest as cards', async () => {
    const wrapper = await mountSuspended(WorkSection)
    const expectedRows = projects.filter(project => project.compact).length
    const expectedCards = projects.length - expectedRows
    expect(wrapper.findAll('[data-test="project-row"]').length).toBe(expectedRows)
    expect(wrapper.findAll('[data-test="project-card"]').length).toBe(expectedCards)
  })

  it('marks Avanza as in development with no outbound link', async () => {
    const wrapper = await mountSuspended(WorkSection)
    expect(wrapper.text()).toContain('In development')
    const hrefs = wrapper.findAll('[data-test="project-link"]').map(link => link.attributes('href') ?? '')
    expect(hrefs.some(href => href.toLowerCase().includes('avanza'))).toBe(false)
  })

  it('shows images only for projects that define them', async () => {
    const wrapper = await mountSuspended(WorkSection)
    const expectedCount = projects.filter(project => project.image).length
    expect(wrapper.findAll('[data-test="project-image"]').length).toBe(expectedCount)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run app/components/__tests__/WorkSection.spec.ts
```

Expected: FAIL (cannot resolve component).

- [ ] **Step 3: Write `app/components/ProjectCard.vue`**

```vue
<script setup lang="ts">
import type { Project } from '~/data/types'

interface Props {
  project: Project
}

defineProps<Props>()
</script>

<template>
  <article
    data-test="project-card"
    class="rounded-2xl border border-line bg-card p-6"
    :class="project.flagship ? 'sm:col-span-2' : ''"
  >
    <p v-if="project.eyebrow" class="font-mono text-[10px] uppercase tracking-[0.15em] text-teal">
      {{ project.eyebrow }}
    </p>
    <h3 class="mt-1 font-display text-xl font-bold">
      {{ project.title }}
      <span
        v-if="project.badge"
        data-test="project-badge"
        class="ml-2 inline-block -translate-y-0.5 rounded-full bg-amber px-2.5 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide text-petrol"
      >{{ project.badge }}</span>
    </h3>
    <img
      v-if="project.image"
      :src="project.image.src"
      :alt="project.image.alt"
      data-test="project-image"
      class="mt-3 w-full rounded-lg border border-line"
      loading="lazy"
    >
    <p class="mt-2 text-sm leading-relaxed text-ink-muted">{{ project.description }}</p>
    <p class="mt-3 font-mono text-[10px] uppercase tracking-wide text-ink-faint">{{ project.tags.join(' · ') }}</p>
    <a
      v-if="project.link"
      :href="project.link.url"
      data-test="project-link"
      class="mt-3 inline-block text-sm font-bold text-teal hover:underline"
    >{{ project.link.label }} →</a>
  </article>
</template>
```

- [ ] **Step 4: Write `app/components/ProjectRow.vue`**

```vue
<script setup lang="ts">
import type { Project } from '~/data/types'

interface Props {
  project: Project
}

defineProps<Props>()
</script>

<template>
  <li data-test="project-row" class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
    <p class="text-sm">
      <span class="font-display text-base font-bold">{{ project.title }}</span>
      <span class="ml-2 text-ink-muted">— {{ project.description }}</span>
      <a
        v-if="project.link"
        :href="project.link.url"
        data-test="project-link"
        class="ml-2 font-bold text-teal hover:underline"
      >{{ project.link.label }} →</a>
    </p>
    <span class="font-mono text-[10px] uppercase tracking-wide text-ink-faint">{{ project.tags.join(' · ') }}</span>
  </li>
</template>
```

- [ ] **Step 5: Write `app/components/WorkSection.vue`**

```vue
<script setup lang="ts">
import { projects } from '~/data/projects'

const featuredProjects = projects.filter(project => !project.compact)
const compactProjects = projects.filter(project => project.compact)
</script>

<template>
  <section id="work" class="py-16">
    <div class="mx-auto max-w-5xl px-6">
      <h2 class="font-display text-3xl font-bold">Selected work<span class="text-amber">.</span></h2>
      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <ProjectCard v-for="project in featuredProjects" :key="project.projectId" :project="project" />
      </div>
      <ul class="mt-6 divide-y divide-line border-t border-line">
        <ProjectRow v-for="project in compactProjects" :key="project.projectId" :project="project" />
      </ul>
    </div>
  </section>
</template>
```

- [ ] **Step 6: Run test to verify it passes**

```bash
npx vitest run app/components/__tests__/WorkSection.spec.ts
```

Expected: PASS (4 tests).

- [ ] **Step 7: Commit**

```bash
git add app/components/__tests__/WorkSection.spec.ts app/components/ProjectCard.vue app/components/ProjectRow.vue app/components/WorkSection.vue
git commit -m "feat: add selected-work section with cards and compact rows (TDD)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: ExperienceSection (TDD)

**Files:**
- Create: `app/components/__tests__/ExperienceSection.spec.ts`, `app/components/ExperienceSection.vue`

- [ ] **Step 1: Write the failing test `app/components/__tests__/ExperienceSection.spec.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ExperienceSection from '~/components/ExperienceSection.vue'
import { education, experience } from '~/data/experience'

describe('ExperienceSection', () => {
  it('renders every employer with role and period', async () => {
    const wrapper = await mountSuspended(ExperienceSection)
    const items = wrapper.findAll('[data-test="experience-item"]')
    expect(items.length).toBe(experience.length)
    for (const item of experience) {
      expect(wrapper.text()).toContain(item.organization)
      expect(wrapper.text()).toContain(item.role)
      expect(wrapper.text()).toContain(item.period)
    }
  })

  it('renders the education line', async () => {
    const wrapper = await mountSuspended(ExperienceSection)
    expect(wrapper.find('[data-test="education"]').text()).toContain(education)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run app/components/__tests__/ExperienceSection.spec.ts
```

Expected: FAIL (cannot resolve component).

- [ ] **Step 3: Write `app/components/ExperienceSection.vue`** (list rows, mono periods right-aligned)

```vue
<script setup lang="ts">
import { education, experience } from '~/data/experience'
</script>

<template>
  <section id="experience" class="mx-auto max-w-5xl px-6 pb-16">
    <h2 class="font-display text-3xl font-bold">Experience<span class="text-amber">.</span></h2>
    <ol class="mt-6 divide-y divide-line">
      <li
        v-for="item in experience"
        :key="item.organization"
        data-test="experience-item"
        class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
      >
        <div class="max-w-xl">
          <h3 class="font-display text-base font-bold">
            {{ item.organization }}
            <span class="ml-1 text-sm font-normal text-ink-muted">· {{ item.role }}</span>
          </h3>
          <p class="mt-1 text-sm text-ink-muted">{{ item.summary }}</p>
        </div>
        <span
          class="font-mono text-[11px] uppercase tracking-wide"
          :class="item.current ? 'text-teal' : 'text-ink-faint'"
        >{{ item.period }}</span>
      </li>
    </ol>
    <p data-test="education" class="mt-6 text-sm text-ink-faint">{{ education }}</p>
  </section>
</template>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run app/components/__tests__/ExperienceSection.spec.ts
```

Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add app/components/__tests__/ExperienceSection.spec.ts app/components/ExperienceSection.vue
git commit -m "feat: add experience section (TDD)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: SkillsSection (TDD)

**Files:**
- Create: `app/components/__tests__/SkillsSection.spec.ts`, `app/components/SkillsSection.vue`

- [ ] **Step 1: Write the failing test `app/components/__tests__/SkillsSection.spec.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SkillsSection from '~/components/SkillsSection.vue'
import { skillGroups } from '~/data/skills'

describe('SkillsSection', () => {
  it('renders every skill group and its items', async () => {
    const wrapper = await mountSuspended(SkillsSection)
    const groups = wrapper.findAll('[data-test="skill-group"]')
    expect(groups.length).toBe(skillGroups.length)
    for (const group of skillGroups) {
      expect(wrapper.text()).toContain(group.label)
      for (const item of group.items) {
        expect(wrapper.text()).toContain(item)
      }
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run app/components/__tests__/SkillsSection.spec.ts
```

Expected: FAIL (cannot resolve component).

- [ ] **Step 3: Write `app/components/SkillsSection.vue`** (petrol band)

```vue
<script setup lang="ts">
import { skillGroups } from '~/data/skills'
</script>

<template>
  <section id="skills" class="bg-petrol py-16 text-frost">
    <div class="mx-auto max-w-5xl px-6">
      <h2 class="font-display text-3xl font-bold">Skills<span class="text-amber">.</span></h2>
      <dl class="mt-8 grid gap-6 sm:grid-cols-2">
        <div v-for="group in skillGroups" :key="group.label" data-test="skill-group">
          <dt class="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-mint">
            {{ group.label }}
          </dt>
          <dd class="mt-2 text-sm leading-relaxed text-frost-body">{{ group.items.join(' · ') }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run app/components/__tests__/SkillsSection.spec.ts
```

Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add app/components/__tests__/SkillsSection.spec.ts app/components/SkillsSection.vue
git commit -m "feat: add skills section on petrol band (TDD)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 9: ContactSection with footer (TDD)

**Files:**
- Create: `app/components/__tests__/ContactSection.spec.ts`, `app/components/ContactSection.vue`

- [ ] **Step 1: Write the failing test `app/components/__tests__/ContactSection.spec.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ContactSection from '~/components/ContactSection.vue'
import { site } from '~/data/site'

describe('ContactSection', () => {
  it('renders a mailto link with the email', async () => {
    const wrapper = await mountSuspended(ContactSection)
    const emailLink = wrapper.find('[data-test="email-link"]')
    expect(emailLink.attributes('href')).toBe(`mailto:${site.email}`)
    expect(emailLink.text()).toContain(site.email)
  })

  it('links to LinkedIn, GitHub, and the source repo', async () => {
    const wrapper = await mountSuspended(ContactSection)
    expect(wrapper.find('[data-test="linkedin-link"]').attributes('href')).toBe(site.links.linkedin)
    expect(wrapper.find('[data-test="github-link"]').attributes('href')).toBe(site.links.github)
    expect(wrapper.find('[data-test="repo-link"]').attributes('href')).toBe(site.links.repo)
  })

  it('does not contain a phone number', async () => {
    const wrapper = await mountSuspended(ContactSection)
    expect(wrapper.text()).not.toMatch(/\d{3}[-.)\s]\d{3}[-.\s]\d{4}/)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run app/components/__tests__/ContactSection.spec.ts
```

Expected: FAIL (cannot resolve component).

- [ ] **Step 3: Write `app/components/ContactSection.vue`**

```vue
<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <section id="contact" class="mx-auto max-w-5xl px-6 py-20 text-center">
    <h2 class="font-display text-4xl font-bold">Let's talk<span class="text-amber">.</span></h2>
    <p class="mt-3 text-ink-muted">Open to interesting front-end work and collaborations.</p>
    <a
      :href="`mailto:${site.email}`"
      data-test="email-link"
      class="mt-7 inline-block rounded-full bg-petrol px-7 py-3 font-display font-bold text-frost transition hover:bg-teal"
    >{{ site.email }}</a>
    <p class="mt-6 space-x-4 text-sm font-semibold text-teal">
      <a :href="site.links.linkedin" data-test="linkedin-link" class="hover:underline">LinkedIn</a>
      <span aria-hidden="true" class="text-ink-faint">·</span>
      <a :href="site.links.github" data-test="github-link" class="hover:underline">GitHub</a>
    </p>
    <footer class="mt-14 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
      Built with Nuxt + TypeScript + Tailwind · deployed on Vercel ·
      <a :href="site.links.repo" data-test="repo-link" class="underline hover:text-teal">view source on GitHub</a>
    </footer>
  </section>
</template>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run app/components/__tests__/ContactSection.spec.ts
```

Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add app/components/__tests__/ContactSection.spec.ts app/components/ContactSection.vue
git commit -m "feat: add contact section with footer (TDD)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 10: Assemble the page, 404, SEO head, README; full verification

**Files:**
- Modify: `app/app.vue` (replace placeholder)
- Create: `app/error.vue`, `README.md`

- [ ] **Step 1: Replace `app/app.vue`**

```vue
<script setup lang="ts">
import { site } from '~/data/site'

useSeoMeta({
  title: site.metaTitle,
  description: site.metaDescription,
  ogTitle: site.metaTitle,
  ogDescription: site.metaDescription,
  ogType: 'website',
  ogUrl: site.url,
})

useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'canonical', href: site.url },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.name,
        jobTitle: 'Front-End Developer',
        email: `mailto:${site.email}`,
        url: site.url,
        sameAs: [site.links.github, site.links.linkedin],
      }),
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-paper font-body text-ink antialiased">
    <AppNav />
    <main>
      <HeroSection />
      <WorkSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </main>
  </div>
</template>
```

- [ ] **Step 2: Write `app/error.vue`** (minimal 404 in the palette, per spec)

```vue
<script setup lang="ts">
import type { NuxtError } from '#app'

interface Props {
  error: NuxtError
}

defineProps<Props>()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center font-body text-ink">
    <h1 class="font-display text-6xl font-bold">{{ error.statusCode }}<span class="text-amber">.</span></h1>
    <p class="mt-4 text-ink-muted">This page doesn't exist — the whole site lives on one page anyway.</p>
    <a
      href="/"
      class="mt-8 rounded-full bg-petrol px-6 py-2.5 font-display text-sm font-bold text-frost transition hover:bg-teal"
    >Back home</a>
  </div>
</template>
```

- [ ] **Step 3: Write `README.md`**

```markdown
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
```

- [ ] **Step 4: Run the full verification suite**

```bash
cd /Users/m/Development/webpage_react_aws
npm test && npm run typecheck && npm run generate
```

Expected: all tests pass, typecheck clean, generate succeeds.

- [ ] **Step 5: Verify the generated page content**

```bash
grep -c "Selected work" .output/public/index.html
grep -c "application/ld+json" .output/public/index.html
grep -c "og:title" .output/public/index.html
```

Expected: each `grep -c` prints 1 or more.

- [ ] **Step 6: Check outbound links are alive**

```bash
for url in "https://www.lanl.gov/museum/exhibitions/research-gallery/climate-perspectives-about.php" https://github.com/mireyarod23/RangerGlove https://www.linkedin.com/in/mireyarodev https://github.com/mireyarod23; do
  printf "%s -> " "$url"; curl -s -o /dev/null -w "%{http_code}\n" -L --max-time 15 -A "Mozilla/5.0" "$url"
done
```

Expected: 200 (or 999 from LinkedIn, which blocks bots — acceptable). If the LANL museum URL 404s, replace that project's `link.url` in `app/data/projects.ts` with `https://www.lanl.gov/museum` and update the test expectation if needed.

- [ ] **Step 7: Visual review with the user**

Run `npm run dev` and ask Mireya to open http://localhost:3000 — check desktop and narrow (mobile) widths, anchor scrolling, hover states, and the mobile menu. Also visit a bad path like http://localhost:3000/nope to see the 404 page. Fix anything she flags before continuing. (Borrow the Avanza `browser-pass` checklist spirit: clipping, stacking, focus rings, contrast at both widths.)

- [ ] **Step 8: Commit**

```bash
git add app/app.vue app/error.vue README.md
git commit -m "feat: assemble one-page portfolio with SEO head, 404 page, and README

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 11: Merge to master and push

Requires Mireya's approval of the local site (Task 10 Step 7) first.

- [ ] **Step 1: Push the branch**

```bash
cd /Users/m/Development/webpage_react_aws
git push -u origin codex/vue-portfolio-redesign
```

- [ ] **Step 2: Merge into master**

```bash
git checkout master
git pull origin master
git merge --no-ff codex/vue-portfolio-redesign -m "Redesign portfolio: Nuxt + TypeScript + Tailwind, deployed on Vercel

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git push origin master
```

Expected: push succeeds. (If GitHub auth fails, run `gh auth login` or use a personal access token.)

---

### Task 12: Vercel + domain cutover (user-driven)

These steps happen in the browser with Mireya at the wheel; the CLI steps verify.

- [ ] **Step 1: Create the Vercel project**

Mireya: go to https://vercel.com → **Continue with GitHub** (authorizes with the `mireyarod23` account) → **Add New… → Project** → Import `mireyarod23/webpage_react_aws`.
Settings on the import screen:
- Framework Preset: **Nuxt**
- Build Command: **`npm run generate`**
- Output Directory: **`dist`**
- Leave environment variables empty → **Deploy**

Expected: first deployment succeeds; the site is live at `https://<project-name>.vercel.app`. Open it and confirm it renders.

- [ ] **Step 2: Add the domain in Vercel**

Vercel project → **Settings → Domains** → add `mireyaroddev.com` (set as primary) → also add `www.mireyaroddev.com` and choose **Redirect to mireyaroddev.com**.
Vercel will report the domain as misconfigured and offer DNS instructions — select the **Nameservers** method and note the two nameservers (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`).

- [ ] **Step 3: Switch nameservers at Network Solutions**

Mireya: log in at https://www.networksolutions.com → **Account Manager → My Domain Names** → select `mireyaroddev.com` → **Manage → Change Where Domain Points → Advanced DNS → Edit Nameservers** (wording varies slightly) → replace the four `awsdns-*` nameservers with:
- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

Save. Network Solutions may warn the change takes up to 24–48 h.

- [ ] **Step 4: Verify DNS and HTTPS (repeat until propagated)**

```bash
dig +short NS mireyaroddev.com
# Expected eventually: ns1.vercel-dns.com. / ns2.vercel-dns.com.
curl -sI https://mireyaroddev.com | head -5
# Expected: HTTP/2 200
curl -sI https://www.mireyaroddev.com | head -5
# Expected: 307/308 redirect to https://mireyaroddev.com
```

If NS records still show `awsdns` after 48 h, re-check the Network Solutions save went through.

- [ ] **Step 5 (optional): Rename the GitHub repo**

GitHub → repo **Settings → General → Repository name** → rename `webpage_react_aws` to `mireyaroddev`. GitHub redirects the old URL; Vercel keeps working (reconnect in Vercel Settings → Git if it ever complains). Then update the local remote and the footer link:

```bash
git remote set-url origin https://github.com/mireyarod23/mireyaroddev.git
```

And in `app/data/site.ts` change `repo` to `'https://github.com/mireyarod23/mireyaroddev'`, run `npm test`, commit, and push (auto-deploys).

- [ ] **Step 6: Final production check**

Open https://mireyaroddev.com — click every nav anchor, every project link, the email button, LinkedIn/GitHub. Run a Lighthouse audit in Chrome DevTools (Performance / Accessibility / SEO) and confirm scores are green (90+). Done. 🎉
