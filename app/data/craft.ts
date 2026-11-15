import type { CraftCard } from './types'

export const craftIntro =
  "Standards I've distilled from a decade of frontend work — written down, automated, and enforced by the AI coding agents I build with."

export const craftOutro =
  'These live as a private toolkit of agent skills and always-on rules that Claude Code and other AI coding agents follow in my projects. Happy to walk through it — just ask.'

export const craftCards: Array<CraftCard> = [
  {
    craftId: 'typescript-discipline',
    title: 'TypeScript discipline',
    description:
      'No any, Array<T> over shorthand, annotated return types on every exported function, and const objects with a ValueOf helper instead of enums. Explicit over clever, full words over abbreviations.',
    snippet: [
      '// Domain values: const object + ValueOf — never enum',
      'export const RecipeStatus = {',
      "  Draft: 'draft',",
      "  Testing: 'testing',",
      "  Published: 'published',",
      '} as const',
      'export type RecipeStatus = ValueOf<typeof RecipeStatus>',
    ].join('\n'),
  },
  {
    craftId: 'vue-organization',
    title: 'Vue component organization',
    description:
      'Every SFC in the same strict order, with a fixed internal sequence for the script block. Props are typed generics, directories are feature-based with barrel exports, and list keys are always stable IDs.',
    snippet: [
      '// SFC: script setup → template → scoped style',
      '// script order: imports · props · state · computed',
      '//               watchers · lifecycle · functions',
      'interface Props {',
      '  recipeId: string',
      '}',
      'defineProps<Props>()',
    ].join('\n'),
  },
  {
    craftId: 'review-gates',
    title: 'Code review gates',
    description:
      'Nothing merges on one look. Every change gets a spec-compliance review, then a quality review — and UI work gets a rendered-browser pass that catches what unit tests structurally cannot see.',
    snippet: [
      'browser-pass · rendered review before merge',
      '✓ clipping & overflow at 360px and 1440px',
      '✓ focus rings on every interactive element',
      '✓ AA contrast on light and dark surfaces',
      '✓ stacking contexts & sticky behavior',
    ].join('\n'),
  },
]
