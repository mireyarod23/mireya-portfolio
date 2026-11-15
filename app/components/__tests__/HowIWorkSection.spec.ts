import { describe, expect, it } from 'vitest'
import { craftCards } from '~/data/craft'

describe('craft content', () => {
  it('contains no Avanza vocabulary', () => {
    const serialized = JSON.stringify(craftCards).toLowerCase()
    expect(serialized).not.toMatch(/avanza|phase|nudge|twilio|av-button|orion/)
    expect(serialized).not.toMatch(/\bsms\b/)
  })
})
