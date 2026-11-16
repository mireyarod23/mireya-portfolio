import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HeroSection from '~/components/HeroSection.vue'
import { site } from '~/data/site'

describe('HeroSection', () => {
  it('renders the full headline', async () => {
    const wrapper = await mountSuspended(HeroSection)
    expect(wrapper.text()).toContain(site.headline.pre)
    expect(wrapper.text()).toContain(site.headline.highlight)
    expect(wrapper.text()).toContain(site.headline.post)
  })

  it('renders every stack badge', async () => {
    const wrapper = await mountSuspended(HeroSection)
    const badges = wrapper.findAll('[data-test="hero-badge"]')
    expect(badges.length).toBe(site.badges.length)
    for (const badge of site.badges) {
      expect(wrapper.text()).toContain(badge)
    }
  })

  it('shows the portrait with an accessible alt', async () => {
    const wrapper = await mountSuspended(HeroSection)
    const portrait = wrapper.find('[data-test="hero-portrait"]')
    expect(portrait.attributes('src')).toBe(site.portrait.src)
    expect(portrait.attributes('alt')).toBe(site.portrait.alt)
  })

  it('links to GitHub and LinkedIn', async () => {
    const wrapper = await mountSuspended(HeroSection)
    expect(wrapper.find('[data-test="hero-github-link"]').attributes('href')).toBe(site.links.github)
    expect(wrapper.find('[data-test="hero-linkedin-link"]').attributes('href')).toBe(site.links.linkedin)
  })
})
