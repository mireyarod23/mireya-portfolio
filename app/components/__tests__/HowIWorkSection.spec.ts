import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HowIWorkSection from '~/components/HowIWorkSection.vue'
import { craftCards, craftIntro, craftOutro } from '~/data/craft'

describe('HowIWorkSection', () => {
  it('renders every craft card with its snippet', async () => {
    const wrapper = await mountSuspended(HowIWorkSection)
    expect(wrapper.findAll('[data-test="craft-card"]').length).toBe(craftCards.length)
    expect(wrapper.findAll('[data-test="craft-snippet"]').length).toBe(craftCards.length)
    for (const card of craftCards) {
      expect(wrapper.text()).toContain(card.title)
      expect(wrapper.text()).toContain(card.description)
    }
  })

  it('renders the intro and the private-toolkit outro', async () => {
    const wrapper = await mountSuspended(HowIWorkSection)
    expect(wrapper.text()).toContain(craftIntro)
    expect(wrapper.text()).toContain(craftOutro)
  })
})

describe('craft content', () => {
  it('contains no Avanza vocabulary', () => {
    const serialized = JSON.stringify(craftCards).toLowerCase()
    expect(serialized).not.toMatch(/avanza|phase|nudge|twilio|av-button|orion/)
    expect(serialized).not.toMatch(/\bsms\b/)
  })
})
