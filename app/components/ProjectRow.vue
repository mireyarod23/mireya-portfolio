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
        target="_blank"
        rel="noopener noreferrer"
        class="ml-2 font-bold text-teal hover:underline"
      >{{ project.link.label }} →</a>
    </p>
    <span class="font-mono text-[10px] uppercase tracking-wide text-ink-faint">{{ project.tags.join(' · ') }}</span>
  </li>
</template>
