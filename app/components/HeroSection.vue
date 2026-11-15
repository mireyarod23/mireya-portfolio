<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <section id="top" class="bg-petrol text-frost">
    <div class="mx-auto max-w-5xl px-6 pb-20 pt-14">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-mint">{{ site.eyebrow }}</p>
      <h1 class="mt-5 max-w-2xl font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
        {{ site.headline.pre }} {{ site.headline.highlight }} {{ site.headline.post }}
      </h1>
      <p class="mt-6 max-w-xl leading-relaxed text-frost-muted">{{ site.intro }}</p>

      <div class="mt-9 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          data-test="hero-work-link"
          class="rounded-full bg-amber px-6 py-2.5 font-display text-sm font-bold text-petrol transition hover:bg-frost"
        >See the work ↓</a>
        <a
          :href="site.links.github"
          data-test="hero-github-link"
          class="rounded-full border border-petrol-line px-5 py-2 text-sm font-semibold transition hover:border-mint hover:text-mint"
        >GitHub</a>
        <a
          :href="site.links.linkedin"
          data-test="hero-linkedin-link"
          class="rounded-full border border-petrol-line px-5 py-2 text-sm font-semibold transition hover:border-mint hover:text-mint"
        >LinkedIn</a>
      </div>

      <ul class="mt-8 flex flex-wrap gap-2">
        <li
          v-for="badge in site.badges"
          :key="badge"
          data-test="hero-badge"
          class="rounded-md border border-petrol-line px-2.5 py-1 font-mono text-[11px] text-mint"
        >{{ badge }}</li>
      </ul>
    </div>
  </section>
</template>
