<script setup lang="ts">
import type { Project } from '../types/project'
import ProjectCard from './ProjectCard.vue'

defineProps<{
  projects: Project[]
}>()
</script>

<template>
  <section id="projects" class="container mx-auto px-4 pt-12 md:pt-16 pb-20 md:pb-32 max-w-[1080px]">
    <!-- Section header -->
    <div class="mb-10 md:mb-14">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary mb-3">
        Projects
      </p>
      <h2 class="text-2xl md:text-3xl font-bold text-text-primary">
        What I've built
      </h2>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>

    <!-- Empty state -->
    <div
      v-if="projects.length === 0"
      class="flex flex-col items-center justify-center py-20 text-center"
    >
      <span class="text-5xl mb-4">🚀</span>
      <p class="text-text-secondary text-lg">Projects coming soon!</p>
      <p class="text-text-tertiary text-sm mt-1">Add projects to <code class="bg-background-light px-1.5 py-0.5 rounded text-xs">src/config/projects.ts</code></p>
    </div>
  </section>
</template>
