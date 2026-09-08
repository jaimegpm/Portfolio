import type { FrameAgent, FrameTurn } from '@/data/eclipsecode'
import type { Lang } from '@/i18n/types'
import { ArrowUpGlyph, GearGlyph, MicGlyph, PenGlyph, PlusGlyph } from './glyphs'

export type AgentTab = 'chats' | 'memory' | 'skills' | 'settings'

interface AgentViewProps {
  lang: Lang
  agents: readonly FrameAgent[]
  agentId: string
  chatId: string | null
  tab: AgentTab
  transcript: readonly FrameTurn[]
  transcriptChat: string
  onSelectAgent: (id: string) => void
  onSelectChat: (id: string) => void
  onTab: (tab: AgentTab) => void
}

const TABS: { id: AgentTab; label: string }[] = [
  { id: 'chats', label: 'Chats' },
  { id: 'memory', label: 'Memory' },
  { id: 'skills', label: 'Skills' },
  { id: 'settings', label: 'Settings' },
]

const TAB_NOTES: Record<Exclude<AgentTab, 'chats'>, string> = {
  memory: 'What this agent remembers between chats. Nothing saved yet.',
  skills: 'The skills this agent can call. Three installed: review, docs, tests.',
  settings: 'Provider, model and sandbox for every new chat.',
}

function Face({ name, size }: { name: string; size: number }) {
  return (
    <span
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center rounded-full border border-accent text-accent"
      style={{ width: size, height: size, fontSize: Math.max(9, Math.round(size * 0.42)) }}
    >
      {name.slice(0, 1).toUpperCase()}
    </span>
  )
}
export function AgentView({ lang, agents, agentId, chatId, tab, transcript, transcriptChat, onSelectAgent, onSelectChat, onTab }: AgentViewProps) {
  const agent = agents.find((held) => held.id === agentId) ?? agents[0]
  if (!agent) return null
  const chat = agent.chats.find((held) => held.id === chatId) ?? agent.chats[0] ?? null
  const working = agent.chats.filter((held) => held.state === 'working').length

  return (
    <div className="flex min-h-0 min-w-0 flex-1 gap-2">
      <nav className="hidden w-[108px] shrink-0 flex-col overflow-hidden rounded-[10px] border border-line bg-bg md:flex">
        <header className="flex h-8 shrink-0 items-center gap-1 px-2.5">
          <span className="label flex-1 truncate text-[10px] text-muted">Agents</span>
          <span title="New agent" className="flex size-5 items-center justify-center text-muted">
            <PlusGlyph size={11} />
          </span>
        </header>
        <ul className="min-h-0 flex-1 px-1.5">
          {agents.map((held) => (
            <li key={held.id}>
              <button
                type="button"
                onClick={() => onSelectAgent(held.id)}
                aria-current={held.id === agent.id}
                title={`${held.name}: ${held.purpose[lang]}`}
                className={`flex w-full items-center gap-2 rounded-[6px] px-1.5 py-1 text-left transition-colors duration-[var(--dur-fast)] ${
                  held.id === agent.id ? 'bg-bg-2 text-fg' : 'text-muted hover:bg-bg-2 hover:text-fg'
                }`}
              >
                <Face name={held.name} size={16} />
                <span className="min-w-0 flex-1 truncate">{held.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex h-8 shrink-0 items-center gap-2 border-t border-line px-2.5 text-muted">
          <GearGlyph size={11} />
          Settings
        </div>
      </nav>

      <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-line bg-bg">
        <header className="flex h-11 shrink-0 items-center gap-2.5 border-b border-line px-2.5">
          <Face name={agent.name} size={24} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-fg">{agent.name}</p>
            <p className="truncate text-[10px] text-muted">{agent.purpose[lang]}</p>
          </div>
          <span className="hidden shrink-0 items-center gap-1.5 text-[10px] text-muted md:flex">
            <span className={`size-1.5 rounded-full ${working ? 'bg-accent animate-pulse' : 'bg-muted'}`} />
            {working} working
          </span>
          <div role="tablist" aria-label="Agent" className="hidden shrink-0 items-center gap-0.5 rounded-[6px] bg-bg-2 p-0.5 md:flex">
            {TABS.map((one) => (
              <button
                key={one.id}
                type="button"
                role="tab"
                aria-selected={tab === one.id}
                onClick={() => onTab(one.id)}
                className={`rounded-[4px] px-2 py-0.5 text-[10px] font-medium transition-colors duration-[var(--dur-fast)] ${
                  tab === one.id ? 'bg-bg text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {one.label}
              </button>
            ))}
          </div>
          <span className="flex h-6 shrink-0 items-center gap-1 rounded-[6px] bg-accent px-2 text-[10px] font-medium text-accent-ink">
            <PlusGlyph size={10} />
            New chat
          </span>
        </header>

        {tab !== 'chats' ? (
          <p className="m-auto max-w-[36ch] p-4 text-center leading-normal text-muted">{TAB_NOTES[tab]}</p>
        ) : (
          <div className="flex min-h-0 flex-1">
            <div className="hidden w-[132px] shrink-0 flex-col border-r border-line md:flex">
              <header className="flex h-8 shrink-0 items-center gap-1 px-2.5">
                <span className="label truncate text-[10px] text-muted">Chats</span>
                <span className="ml-auto flex items-center gap-0.5 rounded-[4px] bg-bg-2 p-0.5 text-[9px]">
                  <span className="rounded-[3px] bg-bg px-1 text-fg">Recent</span>
                  <span className="px-1 text-muted">Project</span>
                </span>
                <span title="New chat" className="flex size-5 items-center justify-center text-muted">
                  <PenGlyph size={11} />
                </span>
              </header>
              <ul className="min-h-0 flex-1 px-1.5">
                {agent.chats.length === 0 && <li className="px-2 py-2 text-[10px] text-muted">No chats with this agent yet.</li>}
                {agent.chats.map((held) => (
                  <li key={held.id}>
                    <button
                      type="button"
                      onClick={() => onSelectChat(held.id)}
                      aria-current={chat?.id === held.id}
                      className={`flex w-full flex-col rounded-[6px] px-2 py-1 text-left transition-colors duration-[var(--dur-fast)] ${
                        chat?.id === held.id ? 'bg-bg-2 text-fg' : 'text-muted hover:bg-bg-2 hover:text-fg'
                      }`}
                    >
                      <span className="truncate">{held.title[lang]}</span>
                      <span className="flex items-center gap-1.5 text-[10px] text-muted">
                        <span className="truncate">{held.project}</span>
                        {held.state !== 'done' && (
                          <span className={`ml-auto rounded-[3px] px-1 ${held.state === 'waiting' ? 'bg-accent/15 text-accent' : 'bg-bg text-muted'}`}>
                            {held.state === 'waiting' ? 'asks' : 'working'}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              <div tabIndex={0} role="region" aria-label={chat?.title[lang] ?? agent.name} data-scramble="off" className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-2.5 [scrollbar-width:none]">
                {chat && chat.id === transcriptChat ? (
                  transcript.map((turn, at) =>
                    turn.role === 'user' ? (
                      <p key={at} className="ml-auto max-w-[88%] rounded-[6px] bg-bg-2 px-2 py-1.5 leading-normal text-fg">
                        {turn.text[lang]}
                      </p>
                    ) : turn.role === 'tool' ? (
                      <p key={at} className="flex items-center gap-1.5 text-[10px] text-muted">
                        <span className="size-1.5 rounded-full bg-accent" />
                        {turn.text[lang]}
                      </p>
                    ) : (
                      <p key={at} className="max-w-[92%] leading-normal text-fg">
                        {turn.text[lang]}
                      </p>
                    ),
                  )
                ) : (
                  <p className="m-auto max-w-[30ch] text-center leading-normal text-muted">
                    {chat ? (chat.state === 'working' ? `Working on it for ${chat.since}.` : `Finished ${chat.since} ago.`) : 'Start a chat to put this agent to work.'}
                  </p>
                )}
              </div>
              <div className="shrink-0 p-2.5">
                <div className="flex items-end gap-1.5 rounded-[10px] border border-line bg-bg-2 px-2.5 py-1.5">
                  <span className="min-h-4 flex-1 text-muted">Message {agent.name}</span>
                  <span className="flex size-5 shrink-0 items-center justify-center text-muted">
                    <MicGlyph size={11} />
                  </span>
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-[6px] bg-bg text-muted">
                    <ArrowUpGlyph size={11} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
