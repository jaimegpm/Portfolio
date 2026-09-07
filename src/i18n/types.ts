export type Lang = 'es' | 'en'

export type Text = Record<Lang, string>

export type SectionId = 'experience' | 'projects' | 'stack' | 'contact'

export interface TerminalStep {
  cmd: string
  out: string
}

export interface TerminalCommand extends TerminalStep {
  target: SectionId
}

export interface ReadoutRow {
  key: string
  value: string
  note?: string
}

export interface ExperienceItem {
  tag: string
  when: string
  role: string
  org: string
  text?: string
}

export interface Dictionary {
  meta: {
    title: string
    description: string
  }
  nav: {
    home: string
    experience: string
    projects: string
    stack: string
    contact: string
    menu: string
    switchLanguage: string
    switchTheme: string
  }
  hero: {
    eyebrow: string
    session: string
    prompt: string
    intro: TerminalStep[]
    commands: TerminalCommand[]
    skip: string
    summary: string
    readout: ReadoutRow[]
    cta: string
    index: string
    hint: string
    rev: string
  }
  experience: {
    index: string
    label: string
    title: string
    items: ExperienceItem[]
  }
  featured: {
    index: string
    label: string
    title: string
    tag: string
    lede: string
    text: string
    spec: [string, string][]
    meta: string[]
    frame: {
      summary: string
      hint: string
    }
  }
  projects: {
    index: string
    label: string
    title: string
    lede: string
    access: {
      private: string
      public: string
      demo: string
    }
    code: string
    site: string
    tos: string
    othersTitle: string
    othersLede: string
  }
  stack: {
    index: string
    label: string
    title: string
    layers: {
      backend: string
      low: string
      frontend: string
      tools: string
    }
  }
  contact: {
    index: string
    label: string
    title: string
    text: string
    github: string
    linkedin: string
    cv: string
  }
  footer: {
    base: string
  }
}
