<script setup lang="ts">
import type { Project } from '../types/project'

const props = defineProps<{
  project: Project
}>()

const { name, description, icon, tags, path, featured, isNew } = props.project
</script>

<template>
  <a
    :href="path"
    class="group block h-full"
  >
    <article
      class="relative h-full bg-background-white rounded-2xl border border-border p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gray-900/5 hover:border-gray-300/80"
    >
      <!-- Badges -->
      <div class="absolute top-4 right-4 flex items-center gap-1.5">
        <span
          v-if="featured"
          class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 border border-amber-200"
        >
          Featured
        </span>
        <span
          v-if="isNew"
          class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700 border border-green-200"
        >
          New
        </span>
      </div>

      <!-- Icon -->
      <div class="w-12 h-12 rounded-xl bg-background-light flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
        <span class="text-2xl">{{ icon }}</span>
      </div>

      <!-- Name -->
      <h3 class="text-lg font-semibold text-text-primary mb-2 transition-colors duration-300 group-hover:text-primary-blue">
        {{ name }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-text-secondary leading-relaxed mb-5 line-clamp-3">
        {{ description }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in tags"
          :key="tag"
          class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-background-light text-text-tertiary border border-border-light transition-colors duration-300 group-hover:border-gray-200 group-hover:text-text-secondary"
        >
          {{ tag }}
        </span>
      </div>
    </article>
  </a>
</template>
