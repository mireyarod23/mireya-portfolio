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
      width="1200"
      height="715"
    >
    <p class="mt-2 text-sm leading-relaxed text-ink-muted">{{ project.description }}</p>
    <p class="mt-3 font-mono text-[10px] uppercase tracking-wide text-ink-faint">{{ project.tags.join(' · ') }}</p>
    <a
      v-if="project.link"
      :href="project.link.url"
      data-test="project-link"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-3 inline-block text-sm font-bold text-teal hover:underline"
    >{{ project.link.label }} →</a>
  </article>
</template>
