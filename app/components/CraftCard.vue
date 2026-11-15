<script setup lang="ts">
import type { CraftCard } from '~/data/types'

interface Props {
  card: CraftCard
}

defineProps<Props>()
</script>

<template>
  <article data-test="craft-card" class="rounded-2xl border border-line bg-card p-6">
    <h3 class="font-display text-lg font-bold">{{ card.title }}</h3>
    <p class="mt-2 text-sm leading-relaxed text-ink-muted">{{ card.description }}</p>
    <pre
      data-test="craft-snippet"
      class="mt-4 overflow-x-auto rounded-lg bg-petrol p-4 font-mono text-[11px] leading-relaxed text-frost-body"
    >{{ card.snippet }}</pre>
  </article>
</template>
