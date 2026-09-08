import { useEffect, useRef } from 'react'

import { PROVIDER_NAMES, type FrameTerminal, type Provider } from '@/data/eclipsecode'
import type { Lang } from '@/i18n/types'
import { ArrowUpGlyph, CloseGlyph, MaximizeGlyph, MicGlyph, MinimizeGlyph, NewChatGlyph, PanelRightGlyph, ProviderMark, SpinGlyph, TerminalGlyph } from './glyphs'
import type { Playback } from './useScenario'

export interface ExtraPane {
  id: string
  provider: Provider | null
}

interface Pane {
  id: string
  title: string
  workspace: string
  launch: string
  prompt: string
  lines: string[]
  working: boolean
  waiting: boolean
}

interface CodeViewProps {
  lang: Lang
  wide: boolean
  terminals: readonly FrameTerminal[]
  extras: ExtraPane[]
  playback: Playback
  ask: string
  reply: string
  selected: string
  focused: string | null
  closed: ReadonlySet<string>
  maximized: string | null
  onFocus: (id: string) => void
  onClose: (id: string) => void
  onMaximize: (id: string) => void
  onLaunch: (provider: Provider | null) => void
  onReplay: () => void
}

const SHAPES: readonly [number, number][] = [
  [1, 1],
  [2, 1],
  [2, 2],
  [2, 2],
  [3, 2],
  [3, 2],
  [3, 3],
  [3, 3],
  [3, 3],
  [4, 3],
  [4, 3],
  [4, 3],
]
function gridShape(count: number, wide: boolean): [number, number] {
  const known = SHAPES[count - 1] ?? [Math.ceil(Math.sqrt(count)), Math.ceil(count / Math.ceil(Math.sqrt(count)))]
  if (wide) return known
  const columns = Math.min(2, known[0])
  return [columns, Math.ceil(count / columns)]
}

const SHELL_PROMPT = 'PS C:\\Proyectos\\Portfolio>'

export function CodeView(props: CodeViewProps) {
  const { lang, wide, terminals, extras, playback, selected, focused, closed, maximized } = props

  const panes: Pane[] = []
  terminals.forEach((terminal, at) => {
    const state = playback.panes[at]
    if (!state?.open || closed.has(terminal.id)) return
    const prompt = terminal.prompt.join('\n').slice(0, state.promptChars)
    panes.push({
      id: terminal.id,
      title: PROVIDER_NAMES[terminal.provider],
      workspace: terminal.workspace,
      launch: terminal.launch,
      prompt,
      lines: terminal.output.slice(0, state.lines).map((line) => line[lang]),
      working: state.promptChars === terminal.prompt.join('\n').length && !state.done,
      waiting: state.done,
    })
  })
  for (const extra of extras) {
    if (closed.has(extra.id)) continue
    panes.push({
      id: extra.id,
      title: extra.provider ? PROVIDER_NAMES[extra.provider] : 'PowerShell',
      workspace: selected,
      launch: extra.provider ?? 'pwsh',
      prompt: '',
      lines: [],
      working: false,
      waiting: true,
    })
  }

  const [columns, rows] = gridShape(panes.length, wide)
  const mixed = new Set(panes.map((pane) => pane.workspace)).size > 1

  return (
    <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden rounded-[10px] border border-line bg-bg">
      {panes.length === 0 ? (
        <Home workspace={selected} onLaunch={props.onLaunch} />
      ) : (
        <div className="min-h-0 min-w-0 flex-1 p-2">
          <div
            className="grid h-full min-h-0 gap-2"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
          >
            {panes.map((pane, at) => {
              const isMax = pane.id === maximized
              const cell = isMax
                ? { gridArea: '1 / 1 / -1 / -1', zIndex: 1 }
                : { gridRow: Math.floor(at / columns) + 1, gridColumn: (at % columns) + 1 }
              return (
                <PaneCard
                  key={pane.id}
                  pane={pane}
                  cell={cell}
                  active={pane.id === focused}
                  maximized={isMax}
                  marker={mixed ? pane.workspace : null}
                  selected={pane.workspace === selected}
                  many={panes.length > 1}
                  onFocus={() => props.onFocus(pane.id)}
                  onClose={() => props.onClose(pane.id)}
                  onMaximize={() => props.onMaximize(pane.id)}
                />
              )
            })}
          </div>
        </div>
      )}

      <Dock
        lang={lang}
        terminals={terminals}
        playback={playback}
        ask={props.ask}
        reply={props.reply}
        onReplay={props.onReplay}
      />
    </div>
  )
}

function PaneCard({
  pane,
  cell,
  active,
  maximized,
  marker,
  selected,
  many,
  onFocus,
  onClose,
  onMaximize,
}: {
  pane: Pane
  cell: React.CSSProperties
  active: boolean
  maximized: boolean
  marker: string | null
  selected: boolean
  many: boolean
  onFocus: () => void
  onClose: () => void
  onMaximize: () => void
}) {
  const promptLines = pane.prompt ? pane.prompt.split('\n') : []
  const status = pane.working ? 'Working' : 'Waiting for you'

  return (
    <section
      style={cell}
      onClick={onFocus}
      className={`@container flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[6px] border bg-bg-2 transition-colors duration-[var(--dur-fast)] ${
        active ? 'border-line-2' : 'border-line'
      }`}
    >
      <header className="flex h-7 shrink-0 items-center gap-2 border-b border-line px-2">
        <span
          title={status}
          className={`size-1.5 shrink-0 rounded-full ${pane.working ? 'bg-accent animate-pulse' : pane.waiting ? 'bg-accent/70' : 'bg-muted'}`}
        />
        <span className="min-w-0 flex-1 truncate font-medium text-fg">{pane.title}</span>
        {marker && (
          <span title={marker} className={`hidden max-w-[45%] shrink-0 truncate text-[10px] @min-[230px]:inline ${selected ? 'text-accent' : 'text-muted'}`}>
            {marker}
          </span>
        )}
        <span title="Dictate into this terminal" className="hidden size-5 shrink-0 items-center justify-center rounded-[4px] text-muted @min-[260px]:flex">
          <MicGlyph size={11} />
        </span>
        {many && (
          <button
            type="button"
            title={maximized ? 'Restore terminal' : 'Maximize terminal'}
            aria-label={`${maximized ? 'Restore' : 'Maximize'} ${pane.title}`}
            onClick={(event) => {
              event.stopPropagation()
              onMaximize()
            }}
            className="flex size-5 shrink-0 items-center justify-center rounded-[4px] text-muted transition-colors duration-[var(--dur-fast)] hover:bg-bg hover:text-fg"
          >
            {maximized ? <MinimizeGlyph size={11} /> : <MaximizeGlyph size={11} />}
          </button>
        )}
        <button
          type="button"
          title="Close terminal"
          aria-label={`Close ${pane.title}`}
          onClick={(event) => {
            event.stopPropagation()
            onClose()
          }}
          className="flex size-5 shrink-0 items-center justify-center rounded-[4px] text-muted transition-colors duration-[var(--dur-fast)] hover:bg-bg hover:text-fg"
        >
          <CloseGlyph size={12} />
        </button>
      </header>

      <div data-scramble="off" className="min-h-0 flex-1 overflow-hidden p-2 text-[10.5px] leading-[1.55] whitespace-pre">
        <p className="truncate text-muted">$ {pane.launch}</p>
        {promptLines.map((line, at) => (
          <p key={at} className="truncate text-fg">
            {at === 0 ? '› ' : '  '}
            {line}
          </p>
        ))}
        {pane.lines.map((line, at) => (
          <p key={at} className="truncate text-muted">
            {line}
          </p>
        ))}
        {pane.prompt === '' && pane.launch === 'pwsh' && <p className="truncate text-fg">{SHELL_PROMPT}</p>}
        {(pane.working || pane.waiting) && <i className="caret !h-3 !w-1.5 align-[-2px]" />}
      </div>
    </section>
  )
}

const LAUNCHERS: { provider: Provider | null; label: string }[] = [
  { provider: 'claude', label: 'Claude Code' },
  { provider: 'codex', label: 'Codex' },
  { provider: 'grok', label: 'Grok' },
  { provider: null, label: 'Shell' },
]
function Home({ workspace, onLaunch }: { workspace: string; onLaunch: (provider: Provider | null) => void }) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center p-3 text-center">
      <TerminalGlyph size={20} className="text-muted" />
      <p className="mt-3 text-[13px] font-medium text-fg">Start coding in {workspace}</p>
      <p className="mt-1 max-w-[36ch] leading-normal text-muted">Launch an agent and it runs in a real terminal inside this pane.</p>
      <div className="mt-4 grid w-full max-w-[280px] grid-cols-2 gap-1.5">
        {LAUNCHERS.map((launcher) => (
          <button
            key={launcher.label}
            type="button"
            onClick={() => onLaunch(launcher.provider)}
            className="flex h-8 items-center justify-center gap-2 rounded-[6px] border border-line text-fg transition-colors duration-[var(--dur-fast)] hover:border-line-2 hover:bg-bg-2"
          >
            {launcher.provider ? <ProviderMark provider={launcher.provider} size={12} /> : <TerminalGlyph size={12} />}
            {launcher.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function Dock({
  lang,
  terminals,
  playback,
  ask,
  reply,
  onReplay,
}: {
  lang: Lang
  terminals: readonly FrameTerminal[]
  playback: Playback
  ask: string
  reply: string
  onReplay: () => void
}) {
  const feed = useRef<HTMLDivElement>(null)
  const typed = playback.sent ? '' : ask.slice(0, playback.askChars)

  useEffect(() => {
    const element = feed.current
    if (element) element.scrollTop = element.scrollHeight
  }, [playback.sent, playback.progress, playback.chips, playback.tokens])

  const progressLabel =
    playback.progress === 'reading' ? 'Reading pane list' : `Thinking, ${playback.tokens.toLocaleString(lang === 'es' ? 'es-ES' : 'en-US')} tokens`

  return (
    <aside className="hidden w-[196px] shrink-0 flex-col border-l border-line md:flex">
      <header className="flex h-8 shrink-0 items-center gap-1 border-b border-line px-2.5">
        <span className="font-semibold text-fg">Orchestrator</span>
        <button
          type="button"
          onClick={onReplay}
          title="New conversation"
          aria-label="New conversation"
          className="ml-auto flex size-5 items-center justify-center rounded-[4px] text-muted transition-colors duration-[var(--dur-fast)] hover:bg-bg-2 hover:text-fg"
        >
          <NewChatGlyph size={12} />
        </button>
        <span title="Hide Orchestrator" className="flex size-5 items-center justify-center rounded-[4px] text-muted">
          <PanelRightGlyph size={12} />
        </span>
      </header>

      <div ref={feed} tabIndex={0} role="region" aria-label="Orchestrator" data-scramble="off" className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-2.5 [scrollbar-width:none]">
        {!playback.sent && (
          <p className="m-auto max-w-[28ch] text-center leading-normal text-muted">
            Ask a question about what is open, or describe the agents you want and they will be opened in the grid.
          </p>
        )}
        {playback.sent && <p className="ml-auto max-w-[92%] rounded-[6px] bg-bg px-2 py-1.5 leading-normal text-fg">{ask}</p>}
        {playback.sent && playback.progress !== 'done' && (
          <p className="flex items-center gap-1.5 text-[10px] text-muted">
            <SpinGlyph size={11} />
            {progressLabel}
          </p>
        )}
        {playback.replied && (
          <div className="flex flex-col gap-1.5">
            <p className="leading-normal text-fg">{reply}</p>
            {terminals.slice(0, playback.chips).map((terminal) => (
              <AgentChip key={terminal.id} terminal={terminal} />
            ))}
          </div>
        )}
      </div>

      <div className="shrink-0 p-2.5">
        <div className="flex items-end gap-1.5 rounded-[10px] border border-line bg-bg px-2.5 py-1.5">
          <span data-scramble="off" className="min-h-4 min-w-0 flex-1 leading-normal break-words text-fg">
            {typed || <span className="text-muted">Describe the team you need</span>}
            {typed && !playback.sent && <i className="caret !h-2.5 !w-1 align-[-1px]" />}
          </span>
          <span title="Dictate" className="flex size-5 shrink-0 items-center justify-center text-muted">
            <MicGlyph size={11} />
          </span>
          <button
            type="button"
            onClick={onReplay}
            title="Send"
            aria-label="Send"
            className={`flex size-5 shrink-0 items-center justify-center rounded-[6px] transition-colors duration-[var(--dur-fast)] ${
              typed ? 'bg-accent text-accent-ink' : 'bg-bg-2 text-muted hover:text-fg'
            }`}
          >
            <ArrowUpGlyph size={11} />
          </button>
        </div>
      </div>
    </aside>
  )
}
function AgentChip({ terminal }: { terminal: FrameTerminal }) {
  return (
    <div className="flex items-start gap-1.5 rounded-[6px] border border-line bg-bg px-2 py-1.5">
      <span className="mt-0.5 shrink-0 text-muted">
        <ProviderMark provider={terminal.provider} size={11} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-baseline gap-2">
          <span className="min-w-0 flex-1 truncate font-medium text-fg">{PROVIDER_NAMES[terminal.provider]}</span>
          <span className="max-w-[50%] shrink-0 truncate text-[10px] text-muted">{terminal.workspace}</span>
        </span>
        <span className="line-clamp-2 text-[10px] leading-normal text-muted">{terminal.prompt.join(' · ')}</span>
      </span>
    </div>
  )
}
