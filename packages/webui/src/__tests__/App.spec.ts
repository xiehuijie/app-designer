import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('App Designer')
  })

  it('has header with title', () => {
    const wrapper = mount(App)
    expect(wrapper.find('.app-header').exists()).toBe(true)
    expect(wrapper.find('.app-title').text()).toBe('App Designer')
  })

  it('has collapsible sidebar with menu items', () => {
    const wrapper = mount(App)
    expect(wrapper.find('.app-sidebar').exists()).toBe(true)
    expect(wrapper.findAll('.menu-item').length).toBe(5)
  })

  it('has footer with copyright', () => {
    const wrapper = mount(App)
    expect(wrapper.find('.app-footer').exists()).toBe(true)
    const currentYear = new Date().getFullYear()
    expect(wrapper.text()).toContain(`© ${currentYear} App Designer`)
  })

  it('can toggle sidebar collapsed state', async () => {
    const wrapper = mount(App)
    const sidebar = wrapper.find('.app-sidebar')
    const toggleBtn = wrapper.find('.sidebar-toggle')
    
    expect(sidebar.classes()).not.toContain('collapsed')
    await toggleBtn.trigger('click')
    expect(sidebar.classes()).toContain('collapsed')
  })

  it('can toggle dark/light theme', async () => {
    const wrapper = mount(App)
    const layout = wrapper.find('.app-layout')
    
    expect(layout.classes()).toContain('light-theme')
    
    // Find the theme toggle button (the one with moon/sun icon)
    const buttons = wrapper.findAll('button')
    const themeBtn = buttons.find(btn => btn.attributes('aria-label') === 'Toggle Theme')
    
    expect(themeBtn).toBeDefined()
    await themeBtn!.trigger('click')
    
    expect(layout.classes()).toContain('dark-theme')
  })

  it('can select menu items', async () => {
    const wrapper = mount(App)
    const menuItems = wrapper.findAll('.menu-item')
    
    // Initially no menu item should be active
    expect(wrapper.findAll('.menu-item.active').length).toBe(0)
    expect(menuItems.length).toBeGreaterThanOrEqual(2)
    
    // Click on first menu item
    await menuItems[0]!.trigger('click')
    expect(menuItems[0]!.classes()).toContain('active')
    
    // Click on second menu item
    await menuItems[1]!.trigger('click')
    expect(menuItems[1]!.classes()).toContain('active')
    expect(menuItems[0]!.classes()).not.toContain('active')
  })

  it('supports keyboard navigation for menu items', async () => {
    const wrapper = mount(App)
    const menuItems = wrapper.findAll('.menu-item')
    
    expect(menuItems.length).toBeGreaterThanOrEqual(2)
    
    // Menu items should have correct accessibility attributes
    expect(menuItems[0]!.attributes('tabindex')).toBe('0')
    expect(menuItems[0]!.attributes('role')).toBe('button')
    
    // Press Enter on first menu item
    await menuItems[0]!.trigger('keydown', { key: 'Enter' })
    expect(menuItems[0]!.classes()).toContain('active')
    
    // Press Space on second menu item
    await menuItems[1]!.trigger('keydown', { key: ' ' })
    expect(menuItems[1]!.classes()).toContain('active')
    expect(menuItems[0]!.classes()).not.toContain('active')
  })
})
