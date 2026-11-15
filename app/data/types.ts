export interface Project {
  projectId: string
  title: string
  eyebrow?: string
  badge?: string
  description: string
  tags: Array<string>
  link?: { label: string; url: string }
  image?: { src: string; alt: string }
  flagship?: boolean
  compact?: boolean
}

export interface ExperienceItem {
  organization: string
  role: string
  period: string
  summary: string
  current: boolean
}

export interface SkillGroup {
  label: string
  items: Array<string>
}

export interface CraftCard {
  craftId: string
  title: string
  description: string
  snippet: string
}
