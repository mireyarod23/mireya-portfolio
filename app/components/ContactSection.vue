<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <section id="contact" class="mx-auto max-w-5xl px-6 py-20 text-center">
    <h2 class="font-display text-4xl font-bold">Let's talk<span class="text-amber">.</span></h2>
    <p class="mt-3 text-ink-muted">Open to interesting front-end work and collaborations.</p>
    <a
      :href="`mailto:${site.email}`"
      data-test="email-link"
      class="mt-7 inline-block rounded-full bg-petrol px-7 py-3 font-display font-bold text-frost transition hover:bg-teal"
    >{{ site.email }}</a>
    <p class="mt-6 space-x-4 text-sm font-semibold text-teal">
      <a
        :href="site.links.linkedin"
        data-test="linkedin-link"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline"
      >LinkedIn</a>
      <span aria-hidden="true" class="text-ink-faint">·</span>
      <a
        :href="site.links.github"
        data-test="github-link"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline"
      >GitHub</a>
    </p>
    <footer class="mt-14 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
      Built with Nuxt + TypeScript + Tailwind · deployed on Vercel ·
      <a
        :href="site.links.repo"
        data-test="repo-link"
        target="_blank"
        rel="noopener noreferrer"
        class="underline hover:text-teal"
      >view source on GitHub</a>
    </footer>
  </section>
</template>
