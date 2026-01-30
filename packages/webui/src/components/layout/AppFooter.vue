<script setup lang="ts">
import Button from 'primevue/button'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="flex items-center justify-between h-9 px-4 bg-surface-0 dark:bg-surface-900 border-t border-surface-200 dark:border-surface-700 shrink-0">
    <div class="flex items-center">
      <span class="text-xs text-surface-500 dark:text-surface-400">© {{ currentYear }} App Designer</span>
    </div>
    <div class="flex items-center gap-1">
      <Button label="MIT License" text size="small" class="!text-xs !text-surface-500 dark:!text-surface-400 hover:!text-surface-700 dark:hover:!text-surface-200" />
      <Button label="GitHub" text size="small" class="!text-xs !text-surface-500 dark:!text-surface-400 hover:!text-surface-700 dark:hover:!text-surface-200" />
      <Button label="文档" text size="small" class="!text-xs !text-surface-500 dark:!text-surface-400 hover:!text-surface-700 dark:hover:!text-surface-200" />
    </div>
  </footer>
</template>
