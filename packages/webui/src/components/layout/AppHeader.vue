<script setup lang="ts">
import Button from 'primevue/button'

defineProps<{
  isDarkMode: boolean
}>()

const emit = defineEmits<{
  toggleSidebar: []
  toggleTheme: []
}>()
</script>

<template>
  <header class="flex items-center justify-between h-12 px-4 bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 shrink-0">
    <div class="flex items-center gap-3">
      <Button 
        icon="pi pi-bars" 
        text 
        @click="emit('toggleSidebar')"
        class="!text-surface-700 dark:!text-surface-300"
        aria-label="Toggle Sidebar"
      />
      <h1 class="text-lg font-semibold m-0 text-surface-900 dark:text-surface-0">App Designer</h1>
    </div>
    <div class="flex items-center gap-1">
      <Button 
        icon="pi pi-globe" 
        text 
        aria-label="Language"
        class="!text-surface-500 dark:!text-surface-400 hover:!text-surface-700 dark:hover:!text-surface-200"
      />
      <Button 
        :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'" 
        text 
        @click="emit('toggleTheme')"
        aria-label="Toggle Theme"
        class="!text-surface-500 dark:!text-surface-400 hover:!text-surface-700 dark:hover:!text-surface-200"
      />
    </div>
  </header>
</template>
