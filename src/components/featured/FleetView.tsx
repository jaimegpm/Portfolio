import { PROVIDER_NAMES, type ChatState, type FrameAgent, type FrameTerminal } from '@/data/eclipsecode'
import type { Lang } from '@/i18n/types'
import { ProviderMark } from './glyphs'
import type { Playback } from './useScenario'

interface FleetViewProps {
  lang: Lang
  agents: readonly FrameAgent[]
  terminals: readonly FrameTerminal[]
  playback: Playback
  closed: ReadonlySet<string>
  idle: number
  onOpenChat: (agentId: string, chatId: string) => void
  onOpenPane: (id: string) => void
}

const ROOMS: { state: ChatState; label: string; empty: string }[] = [
  { state: 'waiting', label: 'Needs you', empty: 'No question is waiting on you' },
  { state: 'working', label: 'Working', empty: 'Nothing is running' },
  { state: 'done', label: 'Done', empty: 'Nothing has finished yet' },
]

function initial(name: string) {
  return name.slice(0, 1).toUpperCase()
}
export function FleetView({ lang, agents, terminals, playback, closed, idle, onOpenChat, onOpenPane }: FleetViewProps) {
  const cards = agents.flatMap((agent) => agent.chats.map((chat) => ({ agent, chat })))
  const panes = terminals
    .map((terminal, at) => ({ terminal, state: playback.panes[at] }))
    .filter(({ terminal, state }) => state?.open && !closed.has(terminal.id))
  const alive = cards.filter(({ chat }) => chat.state !== 'done').length + panes.length

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-line bg-bg">
      <header className="flex h-8 shrink-0 items-center gap-3 border-b border-line px-2.5">
        <span className="font-semibold text-fg">Fleet</span>
        <span className="text-[10px] text-muted">{alive === 0 ? 'All quiet' : `${alive} ${alive === 1 ? 'agent' : 'agents'} on the move`}</span>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-3 [scrollbar-width:none]">
        <div className="grid items-start gap-2.5 md:grid-cols-3">
          {ROOMS.map((room) => {
            const held = cards.filter(({ chat }) => chat.state === room.state)
            return (
              <section key={room.state} className="min-w-0">
                <header className="flex items-center gap-1.5 px-1 pb-1.5">
                  <span
                    aria-hidden="true"
                    className={`size-1.5 rounded-full ${held.length ? 'bg-accent' : 'bg-muted'} ${room.state === 'working' && held.length ? 'animate-pulse' : ''}`}
                  />
                  <h3 className="label text-[10px] text-muted">{room.label}</h3>
                  <span className="ml-auto text-[10px] text-muted tabular-nums">{held.length}</span>
                </header>
                <div className="flex flex-col gap-1.5">
                  {held.length === 0 && <p className="px-1 py-1 text-[10px] text-muted">{room.empty}</p>}
                  {held.map(({ agent, chat }) => (
                    <button
                      key={chat.id}
                      type="button"
                      onClick={() => onOpenChat(agent.id, chat.id)}
                      title={`Open this chat with ${agent.name}`}
                      className="flex w-full items-start gap-2 rounded-[6px] border border-line bg-bg-2 px-2 py-1.5 text-left transition-colors duration-[var(--dur-fast)] hover:border-line-2"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-accent text-[9px] font-semibold text-accent">
                        {initial(agent.name)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-fg">{chat.title[lang]}</span>
                        <span className="block truncate text-[10px] text-muted">
                          {agent.name} · {chat.project}
                        </span>
                        <span className="block text-[10px] text-muted">
                          {chat.state === 'done' ? `finished ${chat.since} ago` : chat.state === 'waiting' ? 'waiting for your answer' : `for ${chat.since}`}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {panes.length > 0 && (
          <section className="mt-4">
            <h3 className="label px-1 pb-1.5 text-[10px] text-muted">In the terminals</h3>
            <div className="flex flex-wrap gap-1.5">
              {panes.map(({ terminal, state }) => (
                <button
                  key={terminal.id}
                  type="button"
                  onClick={() => onOpenPane(terminal.id)}
                  title={`Open ${PROVIDER_NAMES[terminal.provider]} in the grid`}
                  className="flex items-center gap-2 rounded-[6px] border border-line bg-bg-2 px-2 py-1.5 text-left transition-colors duration-[var(--dur-fast)] hover:border-line-2"
                >
                  <span className="shrink-0 text-muted">
                    <ProviderMark provider={terminal.provider} size={12} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-fg">{terminal.prompt[0]}</span>
                    <span className="block truncate text-[10px] text-muted">{terminal.workspace}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    title={state?.done ? 'Waiting in the terminal' : 'Working'}
                    className={`ml-1 size-1.5 shrink-0 rounded-full ${state?.done ? 'bg-muted' : 'bg-accent animate-pulse'}`}
                  />
                </button>
              ))}
            </div>
          </section>
        )}

        {idle > 0 && (
          <p className="mt-3 px-1 text-[10px] text-muted">
            {idle} {idle === 1 ? 'chat is' : 'chats are'} idle, waiting to be asked.
          </p>
        )}
      </div>
    </section>
  )
}
