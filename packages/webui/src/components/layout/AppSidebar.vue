<script setup lang="ts">
export interface MenuItem {
  id: number
  label: string
  icon: string
}

defineProps<{
  collapsed: boolean
  menuItems: MenuItem[]
  activeMenuItem: number | null
}>()

const emit = defineEmits<{
  selectMenuItem: [id: number]
}>()

const handleMenuKeydown = (event: KeyboardEvent, id: number) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    emit('selectMenuItem', id)
  }
}
</script>

<template>
  <aside 
    class="bg-surface-50 dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 transition-[width] duration-200 shrink-0 overflow-x-hidden"
    :class="collapsed ? 'w-[60px]' : 'w-[220px]'"
  >
    <nav class="p-2">
      <div 
        v-for="item in menuItems" 
        :key="item.id"
        class="flex items-center gap-3 py-2.5 px-3 rounded-md cursor-pointer transition-colors whitespace-nowrap text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700 hover:text-surface-900 dark:hover:text-surface-100"
        :class="{ 'bg-primary text-white hover:bg-primary-emphasis hover:text-white dark:hover:bg-primary-emphasis': activeMenuItem === item.id }"
        @click="emit('selectMenuItem', item.id)"
        @keydown="handleMenuKeydown($event, item.id)"
        tabindex="0"
        role="button"
        :aria-label="item.label"
        :aria-current="activeMenuItem === item.id ? 'true' : undefined"
      >
        <i :class="item.icon" class="text-base w-5 text-center shrink-0"></i>
        <span v-if="!collapsed" class="text-sm font-medium">{{ item.label }}</span>
      </div>
    </nav>
  </aside>
</template>
