import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppNav from '~/components/AppNav.vue'

describe('AppNav', () => {
  it('links to all four page sections', async () => {
    const wrapper = await mountSuspended(AppNav)
    const hrefs = wrapper.findAll('[data-test="nav-link"]').map(link => link.attributes('href'))
    for (const anchor of ['#work', '#experience', '#skills', '#contact']) {
      expect(hrefs).toContain(anchor)
    }
  })

  it('shows the logo mark', async () => {
    const wrapper = await mountSuspended(AppNav)
    expect(wrapper.find('[data-test="nav-logo"]').text()).toContain('mireya')
  })

  it('opens the mobile menu on click', async () => {
    const wrapper = await mountSuspended(AppNav)
    expect(wrapper.find('[data-test="mobile-menu"]').exists()).toBe(false)
    await wrapper.find('[data-test="menu-button"]').trigger('click')
    expect(wrapper.find('[data-test="mobile-menu"]').exists()).toBe(true)
  })
})
