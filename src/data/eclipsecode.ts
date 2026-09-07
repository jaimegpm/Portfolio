import type { Text } from '@/i18n/types'

export type Provider = 'claude' | 'codex' | 'grok'
export type ChatState = 'waiting' | 'working' | 'done'

export interface FrameTerminal {
  id: string
  provider: Provider
  workspace: string
  launch: string
  prompt: string[]
  output: Text[]
  pace: number
}

export interface FrameChat {
  id: string
  title: Text
  project: string
  state: ChatState
  since: string
}

export interface FrameAgent {
  id: string
  name: string
  purpose: Text
  chats: FrameChat[]
}

export interface FrameTurn {
  role: 'user' | 'agent' | 'tool'
  text: Text
}

export interface FrameMeter {
  provider: Provider
  before: number
  after: number
  resets: string
}

export const PROVIDER_NAMES: Record<Provider, string> = { claude: 'Claude', codex: 'Codex', grok: 'Grok' }
export const scenario = {
  workspaces: ['EclipseScripts', 'Eclipse', 'Portfolio', 'EclipseCode'],
  selected: 'Portfolio',
  ask: {
    es: 'Abre dos terminales en EclipseScripts, una para revisar el backend sin tocar nada y otra para pasar los tests; una en Eclipse para revisar el instalador; y tres en Portfolio para SEO, accesibilidad y rendimiento. Que contesten en español.',
    en: 'Open two terminals in EclipseScripts, one to review the backend without changing anything and one to run the tests; one in Eclipse to review the installer; and three in Portfolio for SEO, accessibility and performance.',
  },
  tokens: 1240,
  reply: {
    es: 'Abro seis terminales: dos en EclipseScripts, una en Eclipse y tres en Portfolio, cada una con su encargo.',
    en: 'Opening six terminals: two in EclipseScripts, one in Eclipse and three in Portfolio, each with its brief.',
  },
  terminals: [
    {
      id: 'scripts-backend',
      provider: 'claude',
      workspace: 'EclipseScripts',
      launch: 'claude --model claude-opus-4-7 --effort high',
      prompt: ['Review the backend', '- Do not change anything', '- Answer in Spanish'],
      output: [
        { es: 'Leyendo backend/src…', en: 'Reading backend/src…' },
        { es: 'axum: 14 rutas, 3 middlewares', en: 'axum: 14 routes, 3 middlewares' },
        { es: 'Aviso: timeout sin límite en', en: 'Warning: no timeout limit on' },
        { es: '/license/verify', en: '/license/verify' },
        { es: 'Nada cambiado. ¿Abro un issue?', en: 'Nothing changed. Open an issue?' },
      ],
      pace: 520,
    },
    {
      id: 'scripts-tests',
      provider: 'codex',
      workspace: 'EclipseScripts',
      launch: 'codex -m gpt-5-codex-mini -c model_reasoning_effort=low',
      prompt: ['Run the test suite', '- Report failures only', '- Answer in Spanish'],
      output: [
        { es: 'cargo test --workspace', en: 'cargo test --workspace' },
        { es: '212 passed · 0 failed', en: '212 passed · 0 failed' },
        { es: 'Sin fallos que reportar.', en: 'No failures to report.' },
      ],
      pace: 700,
    },
    {
      id: 'eclipse-installer',
      provider: 'claude',
      workspace: 'Eclipse',
      launch: 'claude --model claude-opus-4-7 --effort high',
      prompt: ['Review the installer', '- Answer in Spanish'],
      output: [
        { es: 'Setup/Program.cs…', en: 'Setup/Program.cs…' },
        { es: 'SCM: QueryServiceStatusEx ok', en: 'SCM: QueryServiceStatusEx ok' },
        { es: 'Aviso: reintento sin espera', en: 'Warning: retry without a wait' },
        { es: 'Resumen listo.', en: 'Summary ready.' },
      ],
      pace: 600,
    },
    {
      id: 'portfolio-seo',
      provider: 'claude',
      workspace: 'Portfolio',
      launch: 'claude --model claude-sonnet-4-6',
      prompt: ['Audit the SEO', '- Answer in Spanish'],
      output: [
        { es: 'index.html: canonical ok', en: 'index.html: canonical ok' },
        { es: 'og:* y twitter:card ok', en: 'og:* and twitter:card ok' },
        { es: 'Falta sitemap.xml', en: 'sitemap.xml missing' },
        { es: 'Propuesta lista.', en: 'Proposal ready.' },
      ],
      pace: 480,
    },
    {
      id: 'portfolio-a11y',
      provider: 'codex',
      workspace: 'Portfolio',
      launch: 'codex -m gpt-5-codex',
      prompt: ['Audit the accessibility', '- Answer in Spanish'],
      output: [
        { es: 'axe-core: 0 críticos', en: 'axe-core: 0 critical' },
        { es: '2 avisos de contraste', en: '2 contrast warnings' },
        { es: 'Nombres de botón ok.', en: 'Button names ok.' },
      ],
      pace: 640,
    },
    {
      id: 'portfolio-perf',
      provider: 'grok',
      workspace: 'Portfolio',
      launch: 'grok --model grok-4 --reasoning-effort high',
      prompt: ['Measure the performance', '- Answer in Spanish'],
      output: [
        { es: 'Lighthouse 99/100/100/100', en: 'Lighthouse 99/100/100/100' },
        { es: 'LCP 0,8 s · CLS 0', en: 'LCP 0.8 s · CLS 0' },
        { es: 'JS 73 KB gzip.', en: 'JS 73 KB gzip.' },
      ],
      pace: 560,
    },
  ] satisfies FrameTerminal[],
  agents: [
    {
      id: 'reviewer',
      name: 'Revisor',
      purpose: { es: 'Revisa cambios antes de subirlos', en: 'Reviews changes before they ship' },
      chats: [
        {
          id: 'installer-pr',
          title: { es: 'PR del instalador', en: 'Installer PR' },
          project: 'Eclipse',
          state: 'waiting',
          since: '4m 12s',
        },
        {
          id: 'axum-backend',
          title: { es: 'Backend axum', en: 'axum backend' },
          project: 'EclipseScripts',
          state: 'working',
          since: '2m 40s',
        },
        {
          id: 'seo-audit',
          title: { es: 'Auditoría SEO', en: 'SEO audit' },
          project: 'Portfolio',
          state: 'done',
          since: '6m',
        },
      ],
    },
    {
      id: 'docs',
      name: 'Docs',
      purpose: { es: 'Escribe y revisa documentación', en: 'Writes and reviews documentation' },
      chats: [
        {
          id: 'release-notes',
          title: { es: 'Notas de la 0.1.102', en: '0.1.102 release notes' },
          project: 'EclipseCode',
          state: 'done',
          since: '18m',
        },
      ],
    },
    {
      id: 'tests',
      name: 'Tests',
      purpose: { es: 'Cubre lo que nadie cubre', en: 'Covers what nobody covers' },
      chats: [],
    },
  ] satisfies FrameAgent[],
  transcript: [
    {
      role: 'user',
      text: {
        es: 'Revisa el PR del instalador y dime si podemos mergear.',
        en: 'Review the installer PR and tell me whether we can merge.',
      },
    },
    { role: 'tool', text: { es: 'repo_status · 4 archivos', en: 'repo_status · 4 files' } },
    {
      role: 'agent',
      text: {
        es: 'Tres cambios sin riesgo y uno que conviene mirar: el reintento del servicio no espera entre intentos. ¿Lo corrijo o solo lo anoto?',
        en: 'Three safe changes and one worth a look: the service retry does not wait between attempts. Fix it, or just note it?',
      },
    },
  ] satisfies FrameTurn[],
  idleChats: 2,
  meters: [
    { provider: 'claude', before: 58, after: 62, resets: '1h 48m' },
    { provider: 'codex', before: 27, after: 31, resets: '4h 05m' },
    { provider: 'grok', before: 12, after: 12, resets: '2d' },
  ] satisfies FrameMeter[],
} as const
