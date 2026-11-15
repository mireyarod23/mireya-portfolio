<script setup lang="ts">
import type { NuxtError } from '#app'

interface Props {
  error: NuxtError
}

defineProps<Props>()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center font-body text-ink">
    <h1 class="font-display text-6xl font-bold">{{ error.statusCode }}<span class="text-amber">.</span></h1>
    <p class="mt-4 text-ink-muted">This page doesn't exist — the whole site lives on one page anyway.</p>
    <a
      href="/"
      class="mt-8 rounded-full bg-petrol px-6 py-2.5 font-display text-sm font-bold text-frost transition hover:bg-teal"
    >Back home</a>
  </div>
</template>
