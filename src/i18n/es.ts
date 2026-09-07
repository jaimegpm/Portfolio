import type { Dictionary } from './types'

export const es: Dictionary = {
  meta: {
    title: 'Jaime García-Page',
    description:
      'Desarrollador backend y middleware en Java. C++, ensamblador, reverse engineering y herramientas para agentes de código.',
  },
  nav: {
    home: 'inicio',
    experience: 'experiencia',
    projects: 'proyectos',
    stack: 'stack',
    contact: 'contacto',
    menu: 'Menú',
    switchLanguage: 'Cambiar a inglés',
    switchTheme: 'Cambiar tema',
  },
  hero: {
    eyebrow: 'backend · middleware · bajo nivel',
    session: 'sesión · 80 × 24',
    prompt: 'jaime@portfolio $',
    intro: [
      { cmd: 'quién soy', out: 'Jaime García-Page. Backend y middleware en Java, en Hiberus.' },
      {
        cmd: 'qué más hago',
        out: 'C++, ensamblador y reverse engineering. Herramientas para agentes de código.',
      },
      {
        cmd: 'proyecto principal',
        out: 'EclipseCode v0.1.102. Sala de control local para agentes de código.',
      },
    ],
    commands: [
      { cmd: 'ver proyectos', out: 'abriendo 0x30 · proyectos', target: 'projects' },
      { cmd: 'experiencia', out: 'abriendo 0x10 · experiencia', target: 'experience' },
      { cmd: 'contacto', out: 'abriendo 0x50 · contacto', target: 'contact' },
    ],
    skip: 'saltar',
    summary:
      'Consola de presentación. Jaime García-Page, backend y middleware en Java en Hiberus. C++, ensamblador y reverse engineering. Proyecto principal: EclipseCode.',
    readout: [
      { key: 'rol', value: 'backend / middleware · Java' },
      { key: 'empresa', value: 'Hiberus', note: 'actual' },
      { key: 'bajo nivel', value: 'C++ · ensamblador · reverse engineering' },
      { key: 'proyecto', value: 'EclipseCode v0.1.102' },
      { key: 'base', value: 'España' },
    ],
    cta: 'Ver proyectos',
    index: '0x00 · inicio',
    hint: 'pulsa un comando o saltar',
    rev: 'rev',
  },
  experience: {
    index: '0x10',
    label: 'experiencia',
    title: 'Experiencia',
    items: [
      {
        tag: '0x10 · hiberus',
        when: '2025 · actual',
        role: 'Backend / Middleware Developer',
        org: 'Hiberus',
        text: 'Desarrollo backend y middleware en Java.',
      },
      {
        tag: '0x11 · formación',
        when: 'formación',
        role: 'Desarrollo de Aplicaciones Web',
        org: 'Ciclo formativo de grado superior',
      },
    ],
  },
  featured: {
    index: '0x20',
    label: 'proyecto principal',
    title: 'EclipseCode',
    tag: '0x20 · eclipsecode',
    lede: 'Sala de control local para varios agentes de código en Windows.',
    text: 'Un panel permanente recibe una orden en lenguaje natural y lanza agentes de Claude Code, Codex y Grok en una rejilla de terminales. Cada agente es un proceso real en un PTY y cualquier panel se puede tomar y escribir en él.',
    spec: [
      ['plataforma', 'Windows · Tauri 2'],
      ['núcleo', 'Rust: procesos, PTYs, SQLite, git'],
      ['interfaz', 'React 19'],
      ['orquestador', 'herramientas y panel propio'],
      ['modos', 'Code · Agent · Fleet'],
      ['medidores', 'Claude · Codex · Grok'],
      ['voz', 'Eclipse Voice, con tu propia clave'],
      ['red', 'sin telemetría, sin cuentas, sin nube'],
    ],
    meta: ['v0.1.102', 'Windows', 'repositorio privado'],
    frame: {
      summary:
        'Maqueta interactiva de EclipseCode. El Orchestrator recibe un encargo, abre seis terminales en tres proyectos con su prompt y los agentes responden. Los botones Agent, Code y Fleet cambian de vista.',
      hint: 'La maqueta es interactiva: cambia de modo con Agent, Code y Fleet, cierra o maximiza terminales y repite el encargo desde el Orchestrator.',
    },
  },
  projects: {
    index: '0x30',
    label: 'proyectos',
    title: 'Proyectos',
    lede: 'El ecosistema Eclipse: plataforma, cliente, firmware y herramientas para Windows.',
    access: {
      private: 'privado',
      public: 'público',
      demo: 'demo',
    },
    code: 'código',
    site: 'web',
    tos: 'No puedo dar más detalles: va contra los términos de servicio del juego.',
    othersTitle: 'Otros proyectos',
    othersLede: 'Trabajos anteriores y más pequeños.',
  },
  stack: {
    index: '0x40',
    label: 'stack',
    title: 'Stack',
    layers: {
      backend: 'backend',
      low: 'bajo nivel',
      frontend: 'frontend',
      tools: 'herramientas',
    },
  },
  contact: {
    index: '0x50',
    label: 'contacto',
    title: 'Contacto',
    text: 'Si quieres hablar de trabajo o de un proyecto, escríbeme.',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    cv: 'CV (pdf)',
  },
  footer: {
    base: 'España',
  },
}
