import { useCallback, useEffect, useRef, useState } from 'react'

import type { TerminalCommand, TerminalStep } from '@/i18n/types'
import { scrollToSection } from '@/lib/scroll'

interface Line {
  kind: 'cmd' | 'out'
  text: string
}

interface TerminalProps {
  user: string
  prompt: string
  session: string
  intro: TerminalStep[]
  commands: TerminalCommand[]
  skipLabel: string
  summary: string
}

export function Terminal({ user, prompt, session, intro, commands, skipLabel, summary }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([])
  const [busy, setBusy] = useState(true)
  const output = useRef<HTMLPreElement>(null)
  const timers = useRef<number[]>([])

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }, [])

  const cancel = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }, [])
  const play = useCallback(
    (step: TerminalStep, done: () => void) => {
      setLines((current) => [...current, { kind: 'cmd', text: '' }])
      let index = 0
      const tick = () => {
        index += 1
        setLines((current) => [...current.slice(0, -1), { kind: 'cmd', text: step.cmd.slice(0, index) }])
        if (index < step.cmd.length) {
          later(tick, 34 + Math.random() * 40)
          return
        }
        later(() => {
          setLines((current) => [...current, { kind: 'out', text: step.out }])
          later(done, 260)
        }, 160)
      }
      later(tick, 60)
    },
    [later],
  )
  useEffect(() => {
    let at = 0
    const next = () => {
      const step = intro[at]
      at += 1
      if (!step) {
        setBusy(false)
        return
      }
      play(step, next)
    }
    later(next, 500)
    return cancel
  }, [intro, play, later, cancel])

  useEffect(() => {
    const element = output.current
    if (element) element.scrollTop = element.scrollHeight
  }, [lines])

  const skip = () => {
    cancel()
    setLines(intro.flatMap((step) => [{ kind: 'cmd', text: step.cmd } as Line, { kind: 'out', text: step.out } as Line]))
    setBusy(false)
  }

  const run = (command: TerminalCommand) => {
    if (busy) skip()
    setBusy(true)
    play(command, () => {
      setBusy(false)
      scrollToSection(command.target)
    })
  }

  const last = lines[lines.length - 1]
  const typing = busy && last?.kind === 'cmd'

  return (
    <div className="flex min-h-[262px] flex-col border border-line-2 bg-bg-2 text-[14px] leading-[1.7]">
      <div className="label flex h-9 items-center justify-between border-b border-line px-3.5 text-[11px] text-muted">
        <span>{user}</span>
        <span>{session}</span>
      </div>

      <p className="sr-only">{summary}</p>
      <pre
        ref={output}
        aria-hidden="true"
        data-scramble="off"
        className="m-0 max-h-[210px] min-h-[150px] flex-1 overflow-y-auto px-4.5 pt-4 pb-1.5 font-mono whitespace-pre-wrap"
      >
        {lines.map((line, at) => {
          const isLast = at === lines.length - 1
          if (line.kind === 'out') return <span key={at}>{line.text + '\n'}</span>
          return (
            <span key={at}>
              <span className="text-accent">{prompt} </span>
              {line.text}
              {isLast && typing ? <i className="caret" /> : '\n'}
            </span>
          )
        })}
        {!typing && (
          <span>
            <span className="text-accent">{prompt} </span>
            <i className="caret" />
          </span>
        )}
      </pre>

      <div className="flex flex-wrap gap-2.5 border-t border-line px-3.5 pt-2.5 pb-3.5">
        {commands.map((command) => (
          <button
            key={command.target}
            type="button"
            onClick={() => run(command)}
            className="label inline-flex h-10 items-center gap-2.5 border border-line-2 px-3.5 text-[12px] text-fg transition-colors duration-[var(--dur-fast)] hover:border-accent hover:text-accent"
          >
            <b className="font-semibold text-accent">&gt;</b> {command.cmd}
          </button>
        ))}
        {busy && (
          <button
            type="button"
            onClick={skip}
            className="label ml-auto h-10 px-1.5 text-[12px] text-muted transition-colors duration-[var(--dur-fast)] hover:text-fg"
          >
            {skipLabel}
          </button>
        )}
      </div>
    </div>
  )
}
