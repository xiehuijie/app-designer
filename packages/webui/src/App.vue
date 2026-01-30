<script setup lang="ts">
import { ref, watch } from 'vue'
import { AppHeader, AppSidebar, AppFooter, type MenuItem } from './components/layout'

// Sidebar state
const sidebarCollapsed = ref(false)

// Theme state (light/dark)
const isDarkMode = ref(false)

// Menu items for demo
const menuItems = ref<MenuItem[]>([
  { id: 1, label: '菜单项 1', icon: 'pi pi-home' },
  { id: 2, label: '菜单项 2', icon: 'pi pi-file' },
  { id: 3, label: '菜单项 3', icon: 'pi pi-cog' },
  { id: 4, label: '菜单项 4', icon: 'pi pi-chart-bar' },
  { id: 5, label: '菜单项 5', icon: 'pi pi-users' },
])

const activeMenuItem = ref<number | null>(null)

// Toggle sidebar
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// Toggle theme and update document class for dark mode
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

// Watch for theme changes and update document class
watch(isDarkMode, (dark) => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, { immediate: true })

// Select menu item
const selectMenuItem = (id: number) => {
  activeMenuItem.value = id
}
</script>

<template>
  <div class="app-layout flex flex-col min-h-screen bg-surface-100 dark:bg-surface-950 text-surface-900 dark:text-surface-0">
    <!-- Header -->
    <AppHeader 
      :is-dark-mode="isDarkMode"
      @toggle-sidebar="toggleSidebar"
      @toggle-theme="toggleTheme"
    />

    <!-- Main Container -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <AppSidebar 
        :collapsed="sidebarCollapsed"
        :menu-items="menuItems"
        :active-menu-item="activeMenuItem"
        @select-menu-item="selectMenuItem"
      />

      <!-- Main Content Area -->
      <main class="flex flex-col flex-1 overflow-hidden">
        <div class="flex-1 p-4 overflow-auto bg-surface-100 dark:bg-surface-950">
          <!-- Content placeholder -->
        </div>

        <!-- Footer -->
        <AppFooter />
      </main>
    </div>
  </div>
</template>
