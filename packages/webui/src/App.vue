<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from 'primevue/button'

// Sidebar state
const sidebarCollapsed = ref(false)

// Theme state (light/dark)
const isDarkMode = ref(false)

// Menu items for demo
const menuItems = ref([
  { id: 1, label: '菜单项 1', icon: 'pi pi-home' },
  { id: 2, label: '菜单项 2', icon: 'pi pi-file' },
  { id: 3, label: '菜单项 3', icon: 'pi pi-cog' },
  { id: 4, label: '菜单项 4', icon: 'pi pi-chart-bar' },
  { id: 5, label: '菜单项 5', icon: 'pi pi-users' },
])

const activeMenuItem = ref<number | null>(null)

// Current year for copyright
const currentYear = new Date().getFullYear()

// Toggle sidebar
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// Toggle theme
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

// Select menu item
const selectMenuItem = (id: number) => {
  activeMenuItem.value = id
}

// Handle keyboard navigation for menu items
const handleMenuKeydown = (event: KeyboardEvent, id: number) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    selectMenuItem(id)
  }
}

// Computed class for theme
const themeClass = computed(() => isDarkMode.value ? 'dark-theme' : 'light-theme')
</script>

<template>
  <div class="app-layout" :class="themeClass">
    <!-- Header / Title Bar -->
    <header class="app-header">
      <div class="header-left">
        <Button 
          icon="pi pi-bars" 
          text 
          @click="toggleSidebar"
          class="sidebar-toggle"
          aria-label="Toggle Sidebar"
        />
        <h1 class="app-title">App Designer</h1>
      </div>
      <div class="header-right">
        <Button 
          icon="pi pi-globe" 
          text 
          aria-label="Language"
          class="header-btn"
        />
        <Button 
          :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'" 
          text 
          @click="toggleTheme"
          aria-label="Toggle Theme"
          class="header-btn"
        />
      </div>
    </header>

    <!-- Main Container -->
    <div class="app-body">
      <!-- Sidebar -->
      <aside class="app-sidebar" :class="{ collapsed: sidebarCollapsed }">
        <nav class="sidebar-menu">
          <div 
            v-for="item in menuItems" 
            :key="item.id"
            class="menu-item"
            :class="{ active: activeMenuItem === item.id }"
            @click="selectMenuItem(item.id)"
            @keydown="handleMenuKeydown($event, item.id)"
            tabindex="0"
            role="button"
            :aria-label="item.label"
          >
            <i :class="item.icon" class="menu-icon"></i>
            <span v-if="!sidebarCollapsed" class="menu-label">{{ item.label }}</span>
          </div>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <main class="app-main">
        <div class="content-area">
          <!-- Content placeholder -->
        </div>

        <!-- Footer -->
        <footer class="app-footer">
          <div class="footer-left">
            <span class="copyright">© {{ currentYear }} App Designer</span>
          </div>
          <div class="footer-right">
            <Button label="MIT License" text size="small" class="footer-btn" />
            <Button label="GitHub" text size="small" class="footer-btn" />
            <Button label="文档" text size="small" class="footer-btn" />
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Layout Variables */
.app-layout {
  --header-height: 48px;
  --sidebar-width: 220px;
  --sidebar-collapsed-width: 60px;
  --footer-height: 36px;
  
  /* Light theme colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-sidebar: #f0f2f5;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
  --accent-color: #3b82f6;
  --hover-bg: #e5e7eb;
}

.app-layout.dark-theme {
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --bg-sidebar: #1a1f2c;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --border-color: #374151;
  --accent-color: #60a5fa;
  --hover-bg: #374151;
}

/* Root Layout */
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

/* Header */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 16px;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar-toggle {
  color: var(--text-primary);
}

.app-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.header-btn {
  color: var(--text-secondary);
}

.header-btn:hover {
  color: var(--text-primary);
}

/* Body Container */
.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Sidebar */
.app-sidebar {
  width: var(--sidebar-width);
  background-color: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  transition: width 0.2s ease;
  flex-shrink: 0;
  overflow-x: hidden;
}

.app-sidebar.collapsed {
  width: var(--sidebar-collapsed-width);
}

.sidebar-menu {
  padding: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.15s ease;
  white-space: nowrap;
  color: var(--text-secondary);
}

.menu-item:hover {
  background-color: var(--hover-bg);
  color: var(--text-primary);
}

.menu-item.active {
  background-color: var(--accent-color);
  color: #ffffff;
}

.menu-icon {
  font-size: 1rem;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.menu-label {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Main Content */
.app-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.content-area {
  flex: 1;
  padding: 16px;
  overflow: auto;
  background-color: var(--bg-secondary);
}

/* Footer */
.app-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--footer-height);
  padding: 0 16px;
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
}

.footer-left {
  display: flex;
  align-items: center;
}

.copyright {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.footer-btn {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.footer-btn:hover {
  color: var(--text-primary);
}
</style>
