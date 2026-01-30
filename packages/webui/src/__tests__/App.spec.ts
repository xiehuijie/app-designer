import { describe, it, expect, afterEach } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

// Clean up dark mode class after each test
afterEach(() => {
  document.documentElement.classList.remove('dark')
})

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('App Designer')
  })

  it('has header with title', () => {
    const wrapper = mount(App)
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('App Designer')
  })

  it('has collapsible sidebar with menu items', () => {
    const wrapper = mount(App)
    expect(wrapper.find('aside').exists()).toBe(true)
    expect(wrapper.findAll('[role="button"]').length).toBe(5)
  })

  it('has footer with copyright', () => {
    const wrapper = mount(App)
    expect(wrapper.find('footer').exists()).toBe(true)
    const currentYear = new Date().getFullYear()
    expect(wrapper.text()).toContain(`© ${currentYear} App Designer`)
  })

  it('can toggle sidebar collapsed state', async () => {
    const wrapper = mount(App)
    const sidebar = wrapper.find('aside')
    const toggleBtn = wrapper.find('[aria-label="Toggle Sidebar"]')
    
    expect(sidebar.classes()).toContain('w-[220px]')
    await toggleBtn.trigger('click')
    expect(sidebar.classes()).toContain('w-[60px]')
  })

  it('can toggle dark/light theme', async () => {
    const wrapper = mount(App)
    
    // Initially should be light theme
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    
    // Find and click the theme toggle button
    const themeBtn = wrapper.find('[aria-label="Toggle Theme"]')
    expect(themeBtn.exists()).toBe(true)
    await themeBtn.trigger('click')
    
    // Should now be dark theme
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('can select menu items', async () => {
    const wrapper = mount(App)
    const menuItems = wrapper.findAll('[role="button"]')
    
    // Initially no menu item should have active class
    expect(menuItems.length).toBeGreaterThanOrEqual(2)
    
    // Click on first menu item
    await menuItems[0]!.trigger('click')
    expect(menuItems[0]!.classes()).toContain('bg-primary')
    
    // Click on second menu item
    await menuItems[1]!.trigger('click')
    expect(menuItems[1]!.classes()).toContain('bg-primary')
    expect(menuItems[0]!.classes()).not.toContain('bg-primary')
  })

  it('supports keyboard navigation for menu items', async () => {
    const wrapper = mount(App)
    const menuItems = wrapper.findAll('[role="button"]')
    
    expect(menuItems.length).toBeGreaterThanOrEqual(2)
    
    // Menu items should have correct accessibility attributes
    expect(menuItems[0]!.attributes('tabindex')).toBe('0')
    expect(menuItems[0]!.attributes('role')).toBe('button')
    
    // Press Enter on first menu item
    await menuItems[0]!.trigger('keydown', { key: 'Enter' })
    expect(menuItems[0]!.classes()).toContain('bg-primary')
    
    // Press Space on second menu item
    await menuItems[1]!.trigger('keydown', { key: ' ' })
    expect(menuItems[1]!.classes()).toContain('bg-primary')
    expect(menuItems[0]!.classes()).not.toContain('bg-primary')
  })
})
