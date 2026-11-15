<script setup lang="ts">
import { site } from '~/data/site'

useSeoMeta({
  title: site.metaTitle,
  description: site.metaDescription,
  ogTitle: site.metaTitle,
  ogDescription: site.metaDescription,
  ogType: 'website',
  ogUrl: site.url,
})

useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'canonical', href: site.url },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.name,
        jobTitle: 'Front-End Developer',
        email: `mailto:${site.email}`,
        url: site.url,
        sameAs: [site.links.github, site.links.linkedin],
      }),
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-paper font-body text-ink antialiased">
    <AppNav />
    <main>
      <HeroSection />
      <WorkSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </main>
  </div>
</template>
