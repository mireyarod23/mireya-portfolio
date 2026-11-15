import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ExperienceSection from '~/components/ExperienceSection.vue'
import { education, experience } from '~/data/experience'

describe('ExperienceSection', () => {
  it('renders every employer with role and period', async () => {
    const wrapper = await mountSuspended(ExperienceSection)
    const items = wrapper.findAll('[data-test="experience-item"]')
    expect(items.length).toBe(experience.length)
    for (const item of experience) {
      expect(wrapper.text()).toContain(item.organization)
      expect(wrapper.text()).toContain(item.role)
      expect(wrapper.text()).toContain(item.period)
    }
  })

  it('renders the education line', async () => {
    const wrapper = await mountSuspended(ExperienceSection)
    expect(wrapper.find('[data-test="education"]').text()).toContain(education)
  })
})
