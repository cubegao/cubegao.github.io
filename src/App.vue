<script setup lang="ts">
import siteConfig from './config/projects'
import SiteHeader from './components/SiteHeader.vue'
import ProjectGrid from './components/ProjectGrid.vue'

const currentYear = new Date().getFullYear()
const showHero = siteConfig.showHero !== false
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <SiteHeader v-if="showHero" />

    <ProjectGrid :projects="siteConfig.projects" />

    <footer class="mt-auto py-8 border-t border-border/60">
      <p class="text-sm text-text-tertiary text-center">
        &copy; {{ currentYear }} {{ siteConfig.title }}
      </p>
    </footer>
  </div>
</template>
