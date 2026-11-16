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
      '// const object + ValueOf — never enum',
      'export const RecipeStatus = {',
      "  Draft: 'draft',",
      "  Testing: 'testing',",
      "  Published: 'published',",
      '} as const',
      'export type RecipeStatus =',
      '  ValueOf<typeof RecipeStatus>',
    ].join('\n'),
  },
  {
    craftId: 'vue-organization',
    title: 'Vue component organization',
    description:
      'Every SFC in the same strict order, with a fixed internal sequence for the script block. Props are typed generics, directories are feature-based with barrel exports, and list keys are always stable IDs.',
    snippet: [
      '// script setup → template → style',
      '// order: imports · props · state',
      '//   computed · watchers · hooks',
      '//   functions — always',
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
      'browser-pass · review before merge',
      '✓ clipping at 360px and 1440px',
      '✓ focus rings on interactives',
      '✓ AA contrast on both surfaces',
      '✓ stacking & sticky behavior',
    ].join('\n'),
  },
  {
    craftId: 'test-proof',
    title: 'Tests that prove themselves',
    description:
      'Coverage is a signal, not the goal. Every test links to a named gap and has to prove it: execute the gap, fail when the behavior is broken, and detect the change against the base branch.',
    snippet: [
      'test-gap-audit · proof per gap',
      'G1 "error toast on failed save"',
      '✓ runs the gap (attribution)',
      '✓ fails when behavior removed',
      '✓ fails against base branch',
      'status: closed',
    ].join('\n'),
  },
  {
    craftId: 'adversarial-review',
    title: 'Adversarial PR review',
    description:
      'A review is findings, not vibes. Repo conventions become a citable ledger, every type assertion must justify itself, and no finding ships without a concrete failure case behind it.',
    snippet: [
      'critical-pr-review · finding',
      '#3 Cast hides missing fields',
      '   stores/recipes.ts:84',
      '   [Confirmed]',
      '   failure: no steps → NaN total',
      '   fix: typed factory, no cast',
    ].join('\n'),
  },
  {
    craftId: 'one-playbook',
    title: 'One playbook, every agent',
    description:
      'Standards are written once and wired into every AI coding agent the same way: always-on rules, canonical skills with full worked examples, and thin per-CLI wrappers pointing back at them.',
    snippet: [
      'vue-agent-skills/',
      '├── rules/   always-on constraints',
      '├── skills/  canonical procedures',
      '├── .claude/ wrapper → skills/',
      '└── .agents/ wrapper → skills/',
    ].join('\n'),
  },
]
