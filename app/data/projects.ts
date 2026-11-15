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
