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
      'Solo-built full-stack product: a Vue 3 + TypeScript web app and a GraphQL API on Node.js in a monorepo, with background job queues, realtime data on Supabase, SMS integration, and a reusable component library documented in Storybook. Private while in development.',
    tags: ['Vue 3', 'TypeScript', 'GraphQL', 'Node.js', 'Supabase', 'Storybook'],
  },
  {
    projectId: 'climate-perspective',
    title: 'Climate Perspective',
    description:
      'AI-driven interactive installation at the Bradbury Science Museum, built on the MEAN stack (MongoDB, Express, AngularJS, Node.js).',
    tags: ['AngularJS', 'Node.js', 'MongoDB', 'Machine learning'],
    link: {
      label: 'Bradbury Science Museum',
      url: 'https://www.lanl.gov/museum',
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
    title: 'Museum touch-screen installations',
    description:
      'Windows touch-screen installations in C#/.NET and Unity for the Bradbury Science Museum — including the Radiation Knowledge game and the Owls & Bats interactive.',
    tags: ['C#', '.NET', 'Unity', 'Windows', 'HTML5'],
    compact: true,
  },
]
