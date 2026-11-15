<script setup lang="ts">
import { craftCards, craftIntro, craftOutro } from '~/data/craft'
</script>

<template>
  <section id="how-i-work" class="mx-auto max-w-5xl px-6 pb-16">
    <h2 class="font-display text-3xl font-bold">How I work<span class="text-amber">.</span></h2>
    <p class="mt-3 max-w-2xl text-ink-muted">{{ craftIntro }}</p>
    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <CraftCard v-for="card in craftCards" :key="card.craftId" :card="card" />
    </div>
    <p class="mt-8 max-w-2xl text-sm text-ink-muted">{{ craftOutro }}</p>
  </section>
</template>
