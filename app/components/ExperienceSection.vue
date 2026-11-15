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
