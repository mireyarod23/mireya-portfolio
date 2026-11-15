<script setup lang="ts">
import { skillGroups } from '~/data/skills'
</script>

<template>
  <section id="skills" class="bg-petrol py-16 text-frost">
    <div class="mx-auto max-w-5xl px-6">
      <h2 class="font-display text-3xl font-bold">Skills<span class="text-amber">.</span></h2>
      <dl class="mt-8 grid gap-6 sm:grid-cols-2">
        <div v-for="group in skillGroups" :key="group.label" data-test="skill-group">
          <dt class="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-mint">
            {{ group.label }}
          </dt>
          <dd class="mt-2 text-sm leading-relaxed text-frost-body">{{ group.items.join(' · ') }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
