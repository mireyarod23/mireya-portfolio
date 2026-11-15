import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import WorkSection from '~/components/WorkSection.vue'
import { projects } from '~/data/projects'

describe('WorkSection', () => {
  it('renders every project title', async () => {
    const wrapper = await mountSuspended(WorkSection)
    for (const project of projects) {
      expect(wrapper.text()).toContain(project.title)
    }
  })

  it('renders compact projects as rows and the rest as cards', async () => {
    const wrapper = await mountSuspended(WorkSection)
    const expectedRows = projects.filter(project => project.compact).length
    const expectedCards = projects.length - expectedRows
    expect(wrapper.findAll('[data-test="project-row"]').length).toBe(expectedRows)
    expect(wrapper.findAll('[data-test="project-card"]').length).toBe(expectedCards)
  })

  it('marks Avanza as in development with no outbound link', async () => {
    const wrapper = await mountSuspended(WorkSection)
    expect(wrapper.text()).toContain('In development')
    const hrefs = wrapper.findAll('[data-test="project-link"]').map(link => link.attributes('href') ?? '')
    expect(hrefs.some(href => href.toLowerCase().includes('avanza'))).toBe(false)
  })

  it('shows images only for projects that define them', async () => {
    const wrapper = await mountSuspended(WorkSection)
    const expectedCount = projects.filter(project => project.image).length
    expect(wrapper.findAll('[data-test="project-image"]').length).toBe(expectedCount)
  })
})
