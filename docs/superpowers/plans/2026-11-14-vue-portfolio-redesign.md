# mireyaroddev.com Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the legacy 2019 Create React App portfolio with a statically generated Nuxt + TypeScript + Tailwind one-page site and deploy it to Vercel at mireyaroddev.com.

**Architecture:** Single-page Nuxt app (latest stable, `app/` source directory), statically generated. One Vue SFC per page section; all copy/projects/skills live in typed data files under `app/data/` so components never hard-code content. Vitest + @nuxt/test-utils component tests assert each section renders its data. Deployment is Vercel auto-deploy from GitHub `master`; DNS fixed by switching Network Solutions nameservers to Vercel.

**Tech Stack:** Nuxt (latest stable), TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Fontsource variable fonts (Space Grotesk, Inter), Vitest, @nuxt/test-utils, happy-dom, Vercel.

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
│   │   ├── ExperienceSection.vue
│   │   ├── SkillsSection.vue
│   │   └── ContactSection.vue
│   └── data/
│       ├── types.ts
│       ├── site.ts
│       ├── projects.ts
│       ├── experience.ts
│       └── skills.ts
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── climate-perspective.jpg
│       └── ranger-glove.jpg
├── tests/components/*.spec.ts      (6 spec files)
└── docs/superpowers/...            (spec + this plan)
```

Removed: `src/`, `public/` (CRA version), `build/`, CRA `package.json`/`package-lock.json`, `node_modules/` (tracked), CRA `README.md`.

---

### Task 1: Remove the legacy CRA app

**Files:**
- Delete (tracked): `src/`, `public/`, `build/`, `package.json`, `package-lock.json`, `README.md`, `node_modules/` (if tracked)
- Preserve to `/tmp`: `src/assets/Climate_P.png`, `src/assets/Ranger_Glove.jpg`

- [ ] **Step 1: Stage the two images we keep**

```bash
cp /Users/m/Development/webpage_react_aws/src/assets/Climate_P.png /tmp/Climate_P.png
cp /Users/m/Development/webpage_react_aws/src/assets/Ranger_Glove.jpg /tmp/Ranger_Glove.jpg
ls -la /tmp/Climate_P.png /tmp/Ranger_Glove.jpg
```

Expected: both files listed.

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

### Task 2: Nuxt + Tailwind scaffold

**Files:**
- Create: `package.json`, `nuxt.config.ts`, `tsconfig.json`, `app/app.vue`, `app/assets/css/main.css`, `public/favicon.svg`, `public/images/*.jpg`
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

- [ ] **Step 4: Write `app/assets/css/main.css` (design tokens from the spec)**

```css
@import "tailwindcss";
@import "@fontsource-variable/space-grotesk";
@import "@fontsource-variable/inter";

@theme {
  --color-cream: #fdf6ec;
  --color-ink: #2b2b2b;
  --color-berry: #c2185b;
  --color-berry-light: #ff8fb3;
  --color-tan: #e5d9c5;
  --font-display: "Space Grotesk Variable", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
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
  <div class="min-h-screen bg-cream font-body text-ink antialiased">
    <h1 class="p-10 font-display text-4xl font-bold">
      mireyaroddev<span class="text-berry">.</span>com — under construction
    </h1>
  </div>
</template>
```

- [ ] **Step 6: Write `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#fdf6ec"/><text x="32" y="45" font-family="system-ui, sans-serif" font-size="38" font-weight="800" text-anchor="middle" fill="#2b2b2b">m<tspan fill="#c2185b">.</tspan></text></svg>
```

- [ ] **Step 7: Optimize and place the preserved images**

```bash
cd /Users/m/Development/webpage_react_aws
mkdir -p public/images
sips -Z 1200 -s format jpeg -s formatOptions 80 /tmp/Climate_P.png --out public/images/climate-perspective.jpg
sips -Z 1200 -s format jpeg -s formatOptions 80 /tmp/Ranger_Glove.jpg --out public/images/ranger-glove.jpg
ls -la public/images/
```

Expected: two `.jpg` files, each well under 300 KB.

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
git commit -m "feat: scaffold Nuxt + Tailwind app with design tokens

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
  id: string
  title: string
  eyebrow?: string
  badge?: string
  description: string
  tags: string[]
  link?: { label: string; url: string }
  image?: { src: string; alt: string }
  flagship?: boolean
}

export interface ExperienceItem {
  org: string
  role: string
  period: string
  summary: string
  current: boolean
}

export interface SkillGroup {
  label: string
  items: string[]
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

```ts
import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'orion',
    title: 'Orion — drug-discovery SaaS front end',
    eyebrow: 'Flagship · OpenEye, Cadence Molecular Sciences',
    description:
      'Migrated legacy AngularJS workflows to Vue 3, Nuxt, and TypeScript. Design-system components built in Storybook with PrimeVue, interactive charts for scientific data, and Vitest + Cypress test coverage.',
    tags: ['Vue 3', 'Nuxt', 'TypeScript', 'Tailwind', 'Storybook', 'PrimeVue'],
    link: { label: 'Orion at OpenEye', url: 'https://www.eyesopen.com/orion' },
    flagship: true,
  },
  {
    id: 'avanza',
    title: 'Avanza',
    badge: 'In development',
    description:
      'Building a reusable Vue 3 component library with Storybook, Tailwind CSS, and Vitest. Private while in development.',
    tags: ['Vue 3', 'Storybook', 'Tailwind CSS', 'Vitest'],
  },
  {
    id: 'climate-perspective',
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
    id: 'bandelier',
    title: 'Bandelier AR Tour',
    description:
      'Augmented-reality tour app for Bandelier National Monument, built with Unity and the Vuforia SDK.',
    tags: ['Unity', 'Vuforia', 'C#', 'AR'],
  },
  {
    id: 'ranger-glove',
    title: 'Ranger Glove',
    description:
      'Open-source virtual-reality glove built from off-the-shelf parts — my master’s thesis. MIT licensed so anyone can build one.',
    tags: ['C#', 'Unity', 'Arduino', 'Hardware'],
    link: { label: 'GitHub', url: 'https://github.com/mireyarod23/RangerGlove' },
    image: {
      src: '/images/ranger-glove.jpg',
      alt: 'The Ranger Glove virtual-reality glove prototype',
    },
  },
  {
    id: 'museum-exhibits',
    title: 'Museum touch-screen exhibits',
    description:
      'Radiation Knowledge game and Owls & Bats interactive for the Bradbury Science Museum — .NET, Unity, and HTML5.',
    tags: ['.NET', 'Unity', 'HTML5'],
  },
]
```

- [ ] **Step 4: Write `app/data/experience.ts`**

```ts
import type { ExperienceItem } from './types'

export const experience: ExperienceItem[] = [
  {
    org: 'OpenEye, Cadence Molecular Sciences',
    role: 'Software Engineer, Front-End',
    period: '2020 — present',
    summary:
      'Front end for Orion, a cloud-native molecular-design platform used by pharma and biotech scientists.',
    current: true,
  },
  {
    org: 'Los Alamos National Laboratory',
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

export const skillGroups: SkillGroup[] = [
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
- Create: `vitest.config.ts`, `tests/components/AppNav.spec.ts`, `app/components/AppNav.vue`

- [ ] **Step 1: Write `vitest.config.ts`**

```ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
  },
})
```

- [ ] **Step 2: Write the failing test `tests/components/AppNav.spec.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppNav from '~/components/AppNav.vue'

describe('AppNav', () => {
  it('links to all four page sections', async () => {
    const wrapper = await mountSuspended(AppNav)
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))
    for (const anchor of ['#work', '#experience', '#skills', '#contact']) {
      expect(hrefs).toContain(anchor)
    }
  })

  it('shows the logo mark', async () => {
    const wrapper = await mountSuspended(AppNav)
    expect(wrapper.text()).toContain('mireya')
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

```bash
cd /Users/m/Development/webpage_react_aws && npx vitest run tests/components/AppNav.spec.ts
```

Expected: FAIL (cannot resolve `~/components/AppNav.vue`).

- [ ] **Step 4: Write `app/components/AppNav.vue`**

```vue
<script setup lang="ts">
const open = ref(false)

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b-2 border-ink bg-cream/95 backdrop-blur">
    <nav class="mx-auto flex max-w-5xl items-center justify-between px-6 py-3" aria-label="Main">
      <a href="#top" class="font-display text-lg font-bold">
        mireya<span class="text-berry">.</span>
      </a>

      <div class="hidden items-center gap-6 text-sm font-semibold sm:flex">
        <a v-for="link in links" :key="link.href" :href="link.href" class="hover:text-berry">
          {{ link.label }}
        </a>
        <a href="#contact" class="rounded-md bg-berry px-3 py-1.5 text-cream transition hover:bg-ink">
          Contact
        </a>
      </div>

      <button
        class="rounded-md border-2 border-ink px-2 py-1 text-sm font-bold sm:hidden"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        @click="open = !open"
      >
        Menu
      </button>
    </nav>

    <div v-if="open" id="mobile-menu" class="border-t-2 border-ink px-6 py-2 sm:hidden">
      <a
        v-for="link in [...links, { label: 'Contact', href: '#contact' }]"
        :key="link.href"
        :href="link.href"
        class="block py-2 text-sm font-semibold hover:text-berry"
        @click="open = false"
      >
        {{ link.label }}
      </a>
    </div>
  </header>
</template>
```

Note on the test: the mobile menu links only exist when `open` is true, but the desktop links (hidden via CSS, still in the DOM) cover all four anchors, so the test passes as written.

- [ ] **Step 5: Run test to verify it passes**

```bash
npx vitest run tests/components/AppNav.spec.ts
```

Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts tests app/components/AppNav.vue
git commit -m "feat: add sticky anchor nav with mobile menu (TDD)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: HeroSection (TDD)

**Files:**
- Create: `tests/components/HeroSection.spec.ts`, `app/components/HeroSection.vue`

- [ ] **Step 1: Write the failing test `tests/components/HeroSection.spec.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HeroSection from '~/components/HeroSection.vue'
import { site } from '~/data/site'

describe('HeroSection', () => {
  it('renders the headline with its highlight', async () => {
    const wrapper = await mountSuspended(HeroSection)
    expect(wrapper.text()).toContain(site.headline.pre)
    expect(wrapper.text()).toContain(site.headline.highlight)
  })

  it('renders every stack badge', async () => {
    const wrapper = await mountSuspended(HeroSection)
    for (const badge of site.badges) {
      expect(wrapper.text()).toContain(badge)
    }
  })

  it('links to GitHub and LinkedIn', async () => {
    const wrapper = await mountSuspended(HeroSection)
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))
    expect(hrefs).toContain(site.links.github)
    expect(hrefs).toContain(site.links.linkedin)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/components/HeroSection.spec.ts
```

Expected: FAIL (cannot resolve component).

- [ ] **Step 3: Write `app/components/HeroSection.vue`**

```vue
<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <section id="top" class="mx-auto max-w-5xl px-6 pb-16 pt-20">
    <p class="text-xs font-bold uppercase tracking-[0.2em] text-berry">{{ site.eyebrow }}</p>
    <h1 class="mt-4 font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
      {{ site.headline.pre }}<br>
      <span class="text-berry">{{ site.headline.highlight }}</span><br>
      {{ site.headline.post }}
    </h1>
    <p class="mt-6 max-w-xl text-ink/70">{{ site.intro }}</p>

    <div class="mt-8 flex flex-wrap gap-3">
      <a
        href="#work"
        class="-rotate-1 rounded-lg bg-ink px-5 py-2.5 text-sm font-bold text-cream transition hover:rotate-0 hover:bg-berry"
      >See my work ↓</a>
      <a
        :href="site.links.github"
        class="rounded-lg border-2 border-ink px-4 py-2 text-sm font-bold transition hover:bg-ink hover:text-cream"
      >GitHub</a>
      <a
        :href="site.links.linkedin"
        class="rounded-lg border-2 border-ink px-4 py-2 text-sm font-bold transition hover:bg-ink hover:text-cream"
      >LinkedIn</a>
    </div>

    <ul class="mt-7 flex flex-wrap gap-2">
      <li
        v-for="badge in site.badges"
        :key="badge"
        class="rounded-full border border-tan bg-white px-3 py-1 text-xs font-semibold"
      >{{ badge }}</li>
    </ul>
  </section>
</template>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/components/HeroSection.spec.ts
```

Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add tests/components/HeroSection.spec.ts app/components/HeroSection.vue
git commit -m "feat: add hero section (TDD)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: ProjectCard + WorkSection (TDD)

**Files:**
- Create: `tests/components/WorkSection.spec.ts`, `app/components/ProjectCard.vue`, `app/components/WorkSection.vue`

- [ ] **Step 1: Write the failing test `tests/components/WorkSection.spec.ts`**

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

  it('marks Avanza as in development with no outbound link', async () => {
    const wrapper = await mountSuspended(WorkSection)
    expect(wrapper.text()).toContain('In development')
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href') ?? '')
    expect(hrefs.some(h => h.toLowerCase().includes('avanza'))).toBe(false)
  })

  it('shows images only for projects that define them', async () => {
    const wrapper = await mountSuspended(WorkSection)
    const expected = projects.filter(p => p.image).length
    expect(wrapper.findAll('img').length).toBe(expected)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/components/WorkSection.spec.ts
```

Expected: FAIL (cannot resolve component).

- [ ] **Step 3: Write `app/components/ProjectCard.vue`**

```vue
<script setup lang="ts">
import type { Project } from '~/data/types'

defineProps<{ project: Project }>()
</script>

<template>
  <article
    class="rounded-xl border-2 border-ink bg-white p-5"
    :class="project.flagship ? 'shadow-[6px_6px_0_var(--color-berry)] sm:col-span-2' : ''"
  >
    <p v-if="project.eyebrow" class="text-[11px] font-bold uppercase tracking-[0.15em] text-berry">
      {{ project.eyebrow }}
    </p>
    <h3 class="mt-1 font-display text-xl font-bold">
      {{ project.title }}
      <span
        v-if="project.badge"
        class="ml-2 inline-block -translate-y-0.5 rounded-full bg-berry px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide text-cream"
      >{{ project.badge }}</span>
    </h3>
    <img
      v-if="project.image"
      :src="project.image.src"
      :alt="project.image.alt"
      class="mt-3 w-full rounded-lg border border-tan"
      loading="lazy"
    >
    <p class="mt-2 text-sm text-ink/70">{{ project.description }}</p>
    <p class="mt-3 text-xs text-ink/50">{{ project.tags.join(' · ') }}</p>
    <a
      v-if="project.link"
      :href="project.link.url"
      class="mt-3 inline-block text-sm font-bold text-berry hover:underline"
    >{{ project.link.label }} →</a>
  </article>
</template>
```

- [ ] **Step 4: Write `app/components/WorkSection.vue`**

```vue
<script setup lang="ts">
import { projects } from '~/data/projects'
</script>

<template>
  <section id="work" class="bg-white py-16">
    <div class="mx-auto max-w-5xl px-6">
      <h2 class="font-display text-3xl font-bold">Selected work<span class="text-berry">.</span></h2>
      <div class="mt-8 grid gap-5 sm:grid-cols-2">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx vitest run tests/components/WorkSection.spec.ts
```

Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add tests/components/WorkSection.spec.ts app/components/ProjectCard.vue app/components/WorkSection.vue
git commit -m "feat: add selected-work section with project cards (TDD)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: ExperienceSection (TDD)

**Files:**
- Create: `tests/components/ExperienceSection.spec.ts`, `app/components/ExperienceSection.vue`

- [ ] **Step 1: Write the failing test `tests/components/ExperienceSection.spec.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ExperienceSection from '~/components/ExperienceSection.vue'
import { education, experience } from '~/data/experience'

describe('ExperienceSection', () => {
  it('renders every employer with role and period', async () => {
    const wrapper = await mountSuspended(ExperienceSection)
    for (const item of experience) {
      expect(wrapper.text()).toContain(item.org)
      expect(wrapper.text()).toContain(item.role)
      expect(wrapper.text()).toContain(item.period)
    }
  })

  it('renders the education line', async () => {
    const wrapper = await mountSuspended(ExperienceSection)
    expect(wrapper.text()).toContain(education)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/components/ExperienceSection.spec.ts
```

Expected: FAIL (cannot resolve component).

- [ ] **Step 3: Write `app/components/ExperienceSection.vue`**

```vue
<script setup lang="ts">
import { education, experience } from '~/data/experience'
</script>

<template>
  <section id="experience" class="mx-auto max-w-5xl px-6 py-16">
    <h2 class="font-display text-3xl font-bold">Experience<span class="text-berry">.</span></h2>
    <ol class="mt-8 space-y-6">
      <li
        v-for="item in experience"
        :key="item.org"
        class="border-l-4 pl-5"
        :class="item.current ? 'border-berry' : 'border-tan'"
      >
        <h3 class="font-display text-lg font-bold">
          {{ item.org }}
          <span class="ml-1 text-sm font-semibold text-ink/50">
            · {{ item.role }} · {{ item.period }}
          </span>
        </h3>
        <p class="mt-1 text-sm text-ink/70">{{ item.summary }}</p>
      </li>
    </ol>
    <p class="mt-8 text-sm text-ink/60">{{ education }}</p>
  </section>
</template>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/components/ExperienceSection.spec.ts
```

Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add tests/components/ExperienceSection.spec.ts app/components/ExperienceSection.vue
git commit -m "feat: add experience timeline section (TDD)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: SkillsSection (TDD)

**Files:**
- Create: `tests/components/SkillsSection.spec.ts`, `app/components/SkillsSection.vue`

- [ ] **Step 1: Write the failing test `tests/components/SkillsSection.spec.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SkillsSection from '~/components/SkillsSection.vue'
import { skillGroups } from '~/data/skills'

describe('SkillsSection', () => {
  it('renders every skill group and its items', async () => {
    const wrapper = await mountSuspended(SkillsSection)
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
npx vitest run tests/components/SkillsSection.spec.ts
```

Expected: FAIL (cannot resolve component).

- [ ] **Step 3: Write `app/components/SkillsSection.vue`**

```vue
<script setup lang="ts">
import { skillGroups } from '~/data/skills'
</script>

<template>
  <section id="skills" class="bg-ink py-16 text-cream">
    <div class="mx-auto max-w-5xl px-6">
      <h2 class="font-display text-3xl font-bold">Skills<span class="text-berry-light">.</span></h2>
      <dl class="mt-8 grid gap-6 sm:grid-cols-2">
        <div v-for="group in skillGroups" :key="group.label">
          <dt class="text-[11px] font-bold uppercase tracking-[0.15em] text-berry-light">
            {{ group.label }}
          </dt>
          <dd class="mt-2 text-sm text-cream/80">{{ group.items.join(' · ') }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/components/SkillsSection.spec.ts
```

Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add tests/components/SkillsSection.spec.ts app/components/SkillsSection.vue
git commit -m "feat: add skills section on dark band (TDD)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 9: ContactSection with footer (TDD)

**Files:**
- Create: `tests/components/ContactSection.spec.ts`, `app/components/ContactSection.vue`

- [ ] **Step 1: Write the failing test `tests/components/ContactSection.spec.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ContactSection from '~/components/ContactSection.vue'
import { site } from '~/data/site'

describe('ContactSection', () => {
  it('renders a mailto link with the email', async () => {
    const wrapper = await mountSuspended(ContactSection)
    const mailto = wrapper.findAll('a').find(a => a.attributes('href') === `mailto:${site.email}`)
    expect(mailto).toBeDefined()
    expect(mailto!.text()).toContain(site.email)
  })

  it('links to LinkedIn, GitHub, and the source repo', async () => {
    const wrapper = await mountSuspended(ContactSection)
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))
    expect(hrefs).toContain(site.links.linkedin)
    expect(hrefs).toContain(site.links.github)
    expect(hrefs).toContain(site.links.repo)
  })

  it('does not contain a phone number', async () => {
    const wrapper = await mountSuspended(ContactSection)
    expect(wrapper.text()).not.toMatch(/\d{3}[-.)\s]\d{3}[-.\s]\d{4}/)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/components/ContactSection.spec.ts
```

Expected: FAIL (cannot resolve component).

- [ ] **Step 3: Write `app/components/ContactSection.vue`**

```vue
<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <section id="contact" class="mx-auto max-w-5xl px-6 py-20 text-center">
    <h2 class="font-display text-4xl font-bold">Let's talk<span class="text-berry">.</span></h2>
    <p class="mt-3 text-ink/70">Open to interesting front-end work and collaborations.</p>
    <a
      :href="`mailto:${site.email}`"
      class="mt-7 inline-block -rotate-1 rounded-lg bg-berry px-6 py-3 font-bold text-cream transition hover:rotate-0 hover:bg-ink"
    >{{ site.email }}</a>
    <p class="mt-6 space-x-4 text-sm font-bold">
      <a :href="site.links.linkedin" class="hover:text-berry">LinkedIn</a>
      <span aria-hidden="true">·</span>
      <a :href="site.links.github" class="hover:text-berry">GitHub</a>
    </p>
    <footer class="mt-14 text-xs text-ink/40">
      Built with Nuxt + TypeScript + Tailwind · deployed on Vercel ·
      <a :href="site.links.repo" class="underline hover:text-berry">view source on GitHub</a>
    </footer>
  </section>
</template>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/components/ContactSection.spec.ts
```

Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add tests/components/ContactSection.spec.ts app/components/ContactSection.vue
git commit -m "feat: add contact section with footer (TDD)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 10: Assemble the page, SEO head, README; full verification

**Files:**
- Modify: `app/app.vue` (replace placeholder)
- Create: `README.md`

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
  <div class="min-h-screen bg-cream font-body text-ink antialiased">
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

defineProps<{ error: NuxtError }>()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center font-body text-ink">
    <h1 class="font-display text-6xl font-bold">{{ error.statusCode }}<span class="text-berry">.</span></h1>
    <p class="mt-4 text-ink/70">This page doesn't exist — the whole site lives on one page anyway.</p>
    <a
      href="/"
      class="mt-8 -rotate-1 rounded-lg bg-ink px-5 py-2.5 text-sm font-bold text-cream transition hover:rotate-0 hover:bg-berry"
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
for url in https://www.eyesopen.com/orion "https://www.lanl.gov/museum/exhibitions/research-gallery/climate-perspectives-about.php" https://github.com/mireyarod23/RangerGlove https://www.linkedin.com/in/mireyarodev https://github.com/mireyarod23; do
  printf "%s -> " "$url"; curl -s -o /dev/null -w "%{http_code}\n" -L --max-time 15 -A "Mozilla/5.0" "$url"
done
```

Expected: 200 (or 999 from LinkedIn, which blocks bots — acceptable). If the LANL museum URL 404s, replace that project's `link.url` in `app/data/projects.ts` with `https://www.lanl.gov/museum` and update the test expectation if needed.

- [ ] **Step 7: Visual review with the user**

Run `npm run dev` and ask Mireya to open http://localhost:3000 — check desktop and narrow (mobile) widths, anchor scrolling, hover states, and the mobile menu. Also visit a bad path like http://localhost:3000/nope to see the 404 page. Fix anything she flags before continuing.

- [ ] **Step 8: Commit**

```bash
git add app/app.vue app/error.vue README.md
git commit -m "feat: assemble one-page portfolio with SEO head, 404 page, and README

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 11: Merge to master and push

Requires Mireya's approval of the local site (Task 10 Step 6) first.

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
