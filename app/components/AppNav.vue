<script setup lang="ts">
const isMenuOpen = ref(false)

const sectionLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-petrol-line bg-petrol/95 text-frost backdrop-blur">
    <nav class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4" aria-label="Main">
      <a href="#top" data-test="nav-logo" class="font-display text-lg font-bold">
        mireya<span class="text-amber">.</span>
      </a>

      <div class="hidden items-center gap-6 text-sm font-semibold sm:flex">
        <a
          v-for="sectionLink in sectionLinks"
          :key="sectionLink.href"
          :href="sectionLink.href"
          data-test="nav-link"
          class="text-frost-muted transition hover:text-frost"
        >
          {{ sectionLink.label }}
        </a>
        <a
          href="#contact"
          data-test="nav-link"
          class="rounded-full bg-amber px-4 py-1.5 font-display font-bold text-petrol transition hover:bg-frost"
        >
          Contact
        </a>
      </div>

      <button
        data-test="menu-button"
        class="rounded-full border border-petrol-line px-3 py-1 text-sm font-semibold sm:hidden"
        :aria-expanded="isMenuOpen"
        @keydown.esc="isMenuOpen = false"
        @click="isMenuOpen = !isMenuOpen"
      >
        Menu
      </button>
    </nav>

    <div
      v-if="isMenuOpen"
      data-test="mobile-menu"
      class="border-t border-petrol-line px-6 py-2 sm:hidden"
    >
      <a
        v-for="sectionLink in [...sectionLinks, { label: 'Contact', href: '#contact' }]"
        :key="sectionLink.href"
        :href="sectionLink.href"
        data-test="mobile-nav-link"
        class="block py-2 text-sm font-semibold text-frost-muted hover:text-frost"
        @click="isMenuOpen = false"
      >
        {{ sectionLink.label }}
      </a>
    </div>
  </header>
</template>
