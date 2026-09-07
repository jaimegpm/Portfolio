import type { Dictionary } from './types'

export const en: Dictionary = {
  meta: {
    title: 'Jaime García-Page',
    description:
      'Backend and middleware developer in Java. C++, assembly, reverse engineering and tooling for coding agents.',
  },
  nav: {
    home: 'home',
    experience: 'experience',
    projects: 'projects',
    stack: 'stack',
    contact: 'contact',
    menu: 'Menu',
    switchLanguage: 'Cambiar a español',
    switchTheme: 'Switch theme',
  },
  hero: {
    eyebrow: 'backend · middleware · low level',
    session: 'session · 80 × 24',
    prompt: 'jaime@portfolio $',
    intro: [
      { cmd: 'who I am', out: 'Jaime García-Page. Backend and middleware in Java, at Hiberus.' },
      {
        cmd: 'what else I do',
        out: 'C++, assembly and reverse engineering. Tooling for coding agents.',
      },
      {
        cmd: 'main project',
        out: 'EclipseCode v0.1.102. A local control room for coding agents.',
      },
    ],
    commands: [
      { cmd: 'view projects', out: 'opening 0x30 · projects', target: 'projects' },
      { cmd: 'experience', out: 'opening 0x10 · experience', target: 'experience' },
      { cmd: 'contact', out: 'opening 0x50 · contact', target: 'contact' },
    ],
    skip: 'skip',
    summary:
      'Introduction console. Jaime García-Page, backend and middleware in Java at Hiberus. C++, assembly and reverse engineering. Main project: EclipseCode.',
    readout: [
      { key: 'role', value: 'backend / middleware · Java' },
      { key: 'company', value: 'Hiberus', note: 'current' },
      { key: 'low level', value: 'C++ · assembly · reverse engineering' },
      { key: 'project', value: 'EclipseCode v0.1.102' },
      { key: 'based in', value: 'Spain' },
    ],
    cta: 'View projects',
    index: '0x00 · home',
    hint: 'press a command or skip',
    rev: 'rev',
  },
  experience: {
    index: '0x10',
    label: 'experience',
    title: 'Experience',
    items: [
      {
        tag: '0x10 · hiberus',
        when: '2025 · current',
        role: 'Backend / Middleware Developer',
        org: 'Hiberus',
        text: 'Backend and middleware development in Java.',
      },
      {
        tag: '0x11 · education',
        when: 'education',
        role: 'Web Application Development',
        org: 'Higher vocational degree',
      },
    ],
  },
  featured: {
    index: '0x20',
    label: 'main project',
    title: 'EclipseCode',
    tag: '0x20 · eclipsecode',
    lede: 'A local control room for several coding agents on Windows.',
    text: 'A permanent panel takes an instruction in natural language and launches Claude Code, Codex and Grok agents in a grid of terminals. Every agent is a real process in a real PTY, and any pane can be taken over and typed into.',
    spec: [
      ['platform', 'Windows · Tauri 2'],
      ['core', 'Rust: processes, PTYs, SQLite, git'],
      ['interface', 'React 19'],
      ['orchestrator', 'tools and a panel of its own'],
      ['modes', 'Code · Agent · Fleet'],
      ['meters', 'Claude · Codex · Grok'],
      ['voice', 'Eclipse Voice, with your own key'],
      ['network', 'no telemetry, no accounts, no cloud'],
    ],
    meta: ['v0.1.102', 'Windows', 'private repository'],
    frame: {
      summary:
        'Interactive mockup of EclipseCode. The Orchestrator takes a request, opens six terminals across three projects with their prompts and the agents answer. The Agent, Code and Fleet buttons switch the view.',
      hint: 'The mockup is interactive: switch modes with Agent, Code and Fleet, close or maximize terminals and replay the request from the Orchestrator.',
    },
  },
  projects: {
    index: '0x30',
    label: 'projects',
    title: 'Projects',
    lede: 'The Eclipse ecosystem: platform, client, firmware and tooling for Windows.',
    access: {
      private: 'private',
      public: 'public',
      demo: 'demo',
    },
    code: 'code',
    site: 'site',
    tos: 'No further details: it goes against the terms of service of the game.',
    othersTitle: 'Other projects',
    othersLede: 'Earlier and smaller work.',
  },
  stack: {
    index: '0x40',
    label: 'stack',
    title: 'Stack',
    layers: {
      backend: 'backend',
      low: 'low level',
      frontend: 'frontend',
      tools: 'tools',
    },
  },
  contact: {
    index: '0x50',
    label: 'contact',
    title: 'Contact',
    text: 'If you want to talk about work or a project, write to me.',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    cv: 'CV (pdf)',
  },
  footer: {
    base: 'Spain',
  },
}
