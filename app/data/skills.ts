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
