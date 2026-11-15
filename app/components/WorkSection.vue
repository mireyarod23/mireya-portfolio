<script setup lang="ts">
import { projects } from '~/data/projects'

const featuredProjects = projects.filter(project => !project.compact)
const compactProjects = projects.filter(project => project.compact)
</script>

<template>
  <section id="work" class="py-16">
    <div class="mx-auto max-w-5xl px-6">
      <h2 class="font-display text-3xl font-bold">Selected work<span class="text-amber">.</span></h2>
      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <ProjectCard v-for="project in featuredProjects" :key="project.projectId" :project="project" />
      </div>
      <ul class="mt-6 divide-y divide-line border-t border-line">
        <ProjectRow v-for="project in compactProjects" :key="project.projectId" :project="project" />
      </ul>
    </div>
  </section>
</template>
