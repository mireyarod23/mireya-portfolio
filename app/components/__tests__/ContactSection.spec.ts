import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ContactSection from '~/components/ContactSection.vue'
import { site } from '~/data/site'

describe('ContactSection', () => {
  it('renders a mailto link with the email', async () => {
    const wrapper = await mountSuspended(ContactSection)
    const emailLink = wrapper.find('[data-test="email-link"]')
    expect(emailLink.attributes('href')).toBe(`mailto:${site.email}`)
    expect(emailLink.text()).toContain(site.email)
  })

  it('links to LinkedIn, GitHub, and the source repo', async () => {
    const wrapper = await mountSuspended(ContactSection)
    expect(wrapper.find('[data-test="linkedin-link"]').attributes('href')).toBe(site.links.linkedin)
    expect(wrapper.find('[data-test="github-link"]').attributes('href')).toBe(site.links.github)
    expect(wrapper.find('[data-test="repo-link"]').attributes('href')).toBe(site.links.repo)
  })

  it('does not contain a phone number', async () => {
    const wrapper = await mountSuspended(ContactSection)
    expect(wrapper.text()).not.toMatch(/\d{3}[-.)\s]\d{3}[-.\s]\d{4}/)
  })
})
