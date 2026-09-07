import { useRef, useState } from 'react'

import { PROVIDER_NAMES, scenario, type Provider } from '@/data/eclipsecode'
import { useMediaQuery } from '@/effects/useMediaQuery'
import { useLanguage } from '@/i18n'
import { AgentView, type AgentTab } from './AgentView'
import { CodeView, type ExtraPane } from './CodeView'
import { FleetView } from './FleetView'
import { GearGlyph, GlobeGlyph, MicGlyph, PlusGlyph, ProviderMark } from './glyphs'
import { useScenario } from './useScenario'

type Mode = 'agent' | 'code' | 'fleet'

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: 'agent', label: 'Agent', hint: 'Your agents answering in chats' },
  { id: 'code', label: 'Code', hint: 'The grid of real terminals' },
  { id: 'fleet', label: 'Fleet', hint: 'Every agent on one board' },
]

const TRANSCRIPT_CHAT = 'installer-pr'
export function AppFrame({ label }: { label: string }) {
  const { lang } = useLanguage()
  const wide = useMediaQuery('(min-width: 48rem)')
  const frame = useRef<HTMLDivElement>(null)
  const { state, replay } = useScenario(scenario.terminals, scenario.ask[lang].length, scenario.tokens, frame)

  const [mode, setMode] = useState<Mode>('code')
  const [selected, setSelected] = useState<string>(scenario.selected)
  const [focused, setFocused] = useState<string | null>(null)
  const [closed, setClosed] = useState<ReadonlySet<string>>(() => new Set())
  const [maximized, setMaximized] = useState<string | null>(null)
  const [extras, setExtras] = useState<ExtraPane[]>([])
  const [agentId, setAgentId] = useState(scenario.agents[0]?.id ?? '')
  const [chatId, setChatId] = useState<string | null>(TRANSCRIPT_CHAT)
  const [agentTab, setAgentTab] = useState<AgentTab>('chats')

  const restart = () => {
    replay()
    setClosed(new Set())
    setMaximized(null)
    setExtras([])
    setFocused(null)
    setMode('code')
  }

  const launch = (provider: Provider | null) => {
    const id = `extra-${Date.now()}`
    setExtras((held) => [...held, { id, provider }])
    setFocused(id)
  }

  const close = (id: string) => {
    setClosed((held) => new Set([...held, id]))
    if (maximized === id) setMaximized(null)
    if (focused === id) setFocused(null)
  }

  const openPane = (id: string) => {
    setFocused(id)
    setMaximized(null)
    setMode('code')
  }

  const openChat = (agent: string, chat: string) => {
    setAgentId(agent)
    setChatId(chat)
    setAgentTab('chats')
    setMode('agent')
  }

  return (
    <div
      ref={frame}
      role="group"
      aria-label={label}
      className="flex h-[460px] min-w-0 flex-col border border-line-2 bg-bg-2 text-[11px] leading-tight text-muted select-none md:h-[600px]"
    >
      <header className="relative flex h-9 shrink-0 items-center justify-between gap-2 px-3">
        <span className="hidden min-w-0 truncate md:inline">
          <b className="font-medium text-fg">EclipseCode</b>
          <span className="text-muted"> · {selected}</span>
        </span>

        <div role="group" aria-label="Mode" className="absolute inset-x-0 mx-auto flex w-max items-center gap-0.5 rounded-[6px] border border-line bg-bg p-0.5">
          {MODES.map((option) => (
            <button
              key={option.id}
              type="button"
              title={option.hint}
              aria-pressed={mode === option.id}
              onClick={() => setMode(option.id)}
              className={`rounded-[4px] px-2.5 py-0.5 font-medium transition-colors duration-[var(--dur-fast)] ${
                mode === option.id ? 'bg-bg-2 text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <span className="relative z-10 flex items-center gap-2.5">
          {mode === 'code' && (
            <button
              type="button"
              onClick={() => launch(null)}
              title="New terminal"
              className="hidden h-6 items-center gap-1 rounded-[6px] border border-line px-1.5 text-[10px] text-muted transition-colors duration-[var(--dur-fast)] hover:border-line-2 hover:text-fg md:flex"
            >
              <PlusGlyph size={10} />
              Terminal
            </button>
          )}
          <span title="Eclipse Voice" className="hidden size-6 items-center justify-center rounded-full border border-line text-muted md:flex">
            <MicGlyph size={11} />
          </span>
          <span className="hidden items-center gap-1.5 md:flex" aria-hidden="true">
            <i className="size-[11px] rounded-full border border-line-2 bg-bg" />
            <i className="size-[11px] rounded-full border border-line-2 bg-bg" />
            <i className="size-[11px] rounded-full border border-accent bg-bg" />
          </span>
        </span>
      </header>

      <div className="relative flex min-h-0 flex-1 gap-2 px-2 pb-2">
        {mode !== 'agent' && (
          <nav aria-label="Workspaces" className="hidden w-9 shrink-0 flex-col items-center gap-1 rounded-[10px] border border-line bg-bg py-2 md:flex">
            {scenario.workspaces.map((workspace) => (
              <button
                key={workspace}
                type="button"
                onClick={() => setSelected(workspace)}
                title={workspace}
                aria-label={workspace}
                aria-current={workspace === selected}
                className={`flex size-6 items-center justify-center rounded-[6px] border text-[10px] font-semibold transition-colors duration-[var(--dur-fast)] ${
                  workspace === selected ? 'border-accent text-accent' : 'border-transparent text-muted hover:bg-bg-2 hover:text-fg'
                }`}
              >
                {workspace.charAt(0)}
              </button>
            ))}
            <span title="Open folder" className="flex size-6 items-center justify-center text-muted">
              <PlusGlyph size={11} />
            </span>
            <span title="Settings" className="mt-auto flex size-6 items-center justify-center text-muted">
              <GearGlyph size={11} />
            </span>
          </nav>
        )}

        {mode === 'code' && (
          <CodeView
            lang={lang}
            wide={wide}
            terminals={scenario.terminals}
            extras={extras}
            playback={state}
            ask={scenario.ask[lang]}
            reply={scenario.reply[lang]}
            selected={selected}
            focused={focused}
            closed={closed}
            maximized={maximized}
            onFocus={setFocused}
            onClose={close}
            onMaximize={(id) => setMaximized((held) => (held === id ? null : id))}
            onLaunch={launch}
            onReplay={restart}
          />
        )}
        {mode === 'fleet' && (
          <FleetView
            lang={lang}
            agents={scenario.agents}
            terminals={scenario.terminals}
            playback={state}
            closed={closed}
            idle={scenario.idleChats}
            onOpenChat={openChat}
            onOpenPane={openPane}
          />
        )}
        {mode === 'agent' && (
          <AgentView
            lang={lang}
            agents={scenario.agents}
            agentId={agentId}
            chatId={chatId}
            tab={agentTab}
            transcript={scenario.transcript}
            transcriptChat={TRANSCRIPT_CHAT}
            onSelectAgent={(id) => {
              setAgentId(id)
              setChatId(scenario.agents.find((agent) => agent.id === id)?.chats[0]?.id ?? null)
            }}
            onSelectChat={setChatId}
            onTab={setAgentTab}
          />
        )}
      </div>

      <footer className="flex h-7 shrink-0 items-center gap-3 px-3 text-[10px]">
        {scenario.meters.map((meter, at) => {
          const used = Math.round(meter.before + (meter.after - meter.before) * state.meters)
          return (
            <span key={meter.provider} className="flex min-w-0 items-center gap-2">
              {at > 0 && <i className="h-3 w-px shrink-0 bg-line-2" aria-hidden="true" />}
              <span className="shrink-0 text-muted" title={PROVIDER_NAMES[meter.provider]}>
                <ProviderMark provider={meter.provider} size={11} />
              </span>
              <span className="block h-1 w-10 shrink-0 overflow-hidden rounded-[2px] bg-line-2 md:w-14">
                <span className="block h-full bg-accent transition-[width] duration-[var(--dur)]" style={{ width: `${used}%` }} />
              </span>
              <span className="shrink-0 tabular-nums">
                {used}% <span className="hidden md:inline">· {meter.resets}</span>
              </span>
            </span>
          )
        })}
        <span className="ml-auto hidden shrink-0 items-center gap-1.5 md:flex" title="Development servers listening on this machine">
          <GlobeGlyph size={11} />1 server
        </span>
      </footer>
    </div>
  )
}
