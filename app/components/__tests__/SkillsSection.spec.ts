import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SkillsSection from '~/components/SkillsSection.vue'
import { skillGroups } from '~/data/skills'

describe('SkillsSection', () => {
  it('renders every skill group and its items', async () => {
    const wrapper = await mountSuspended(SkillsSection)
    const groups = wrapper.findAll('[data-test="skill-group"]')
    expect(groups.length).toBe(skillGroups.length)
    for (const group of skillGroups) {
      expect(wrapper.text()).toContain(group.label)
      for (const item of group.items) {
        expect(wrapper.text()).toContain(item)
      }
    }
  })
})
