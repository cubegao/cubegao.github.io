<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import siteConfig from '../config/projects'

const { title, description, github } = siteConfig
</script>

<template>
  <header class="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
    <div class="container mx-auto px-4 md:px-6 max-w-[1080px] h-16 flex items-center justify-between">
      <!-- Left: Title + Description -->
      <div class="flex items-center gap-3 min-w-0">
        <img src="/avatar.png" alt="avatar" class="w-7 h-7 rounded-full ring-2 ring-border" />
        <div class="min-w-0">
          <h1 class="text-base font-semibold text-text-primary truncate tracking-tight">{{ title }}</h1>
          <p class="text-xs text-text-tertiary truncate hidden sm:block">{{ description }}</p>
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-2 shrink-0">
        <a
          :href="`https://github.com/${github}`"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-text-primary text-white rounded-lg text-xs font-medium transition-all duration-200 hover:bg-gray-800 hover:shadow-md hover:shadow-gray-900/10 active:scale-95"
        >
          <font-awesome-icon icon="fa-brands fa-github" class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">GitHub</span>
          <ArrowUpRight class="w-3 h-3" />
        </a>
      </div>
    </div>
  </header>
</template>
