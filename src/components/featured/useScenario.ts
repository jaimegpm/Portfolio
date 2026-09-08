import { useEffect, useMemo, useState, type RefObject } from 'react'

import type { FrameTerminal } from '@/data/eclipsecode'

const START_MS = 500
const ASK_MS = 14
const SEND_PAUSE_MS = 350
const READ_MS = 700
const THINK_MS = 1300
const CHIP_MS = 110
const OPEN_DELAY_MS = 450
const OPEN_STAGGER_MS = 260
const PROMPT_MS = 11
const OUTPUT_DELAY_MS = 550
const METER_DELAY_MS = 800
const METER_MS = 1600
const TAIL_MS = 600
const TICK_MS = 40

export type Progress = 'idle' | 'reading' | 'thinking' | 'done'

export interface PaneState {
  open: boolean
  promptChars: number
  lines: number
  done: boolean
}

export interface Playback {
  askChars: number
  sent: boolean
  progress: Progress
  tokens: number
  replied: boolean
  chips: number
  panes: PaneState[]
  meters: number
  finished: boolean
}

interface PaneTimes {
  openAt: number
  promptAt: number
  promptLength: number
  outputAt: number
  doneAt: number
  pace: number
  lines: number
}

interface Timeline {
  askLength: number
  sendAt: number
  readAt: number
  thinkAt: number
  replyAt: number
  panes: PaneTimes[]
  metersAt: number
  total: number
}

function clamp(value: number, low: number, high: number) {
  return Math.min(high, Math.max(low, value))
}
function timeline(terminals: readonly FrameTerminal[], askLength: number): Timeline {
  const sendAt = START_MS + askLength * ASK_MS + SEND_PAUSE_MS
  const readAt = sendAt + 150
  const thinkAt = readAt + READ_MS
  const replyAt = thinkAt + THINK_MS
  const panes = terminals.map((terminal, at) => {
    const openAt = replyAt + OPEN_DELAY_MS + at * OPEN_STAGGER_MS
    const promptAt = openAt + 250
    const promptLength = terminal.prompt.join('\n').length
    const outputAt = promptAt + promptLength * PROMPT_MS + OUTPUT_DELAY_MS
    const doneAt = outputAt + (terminal.output.length - 1) * terminal.pace + 400
    return { openAt, promptAt, promptLength, outputAt, doneAt, pace: terminal.pace, lines: terminal.output.length }
  })
  const metersAt = replyAt + METER_DELAY_MS
  const total = Math.max(metersAt + METER_MS, ...panes.map((pane) => pane.doneAt)) + TAIL_MS
  return { askLength, sendAt, readAt, thinkAt, replyAt, panes, metersAt, total }
}

function stateAt(line: Timeline, t: number, tokens: number): Playback {
  const progress: Progress = t < line.readAt ? 'idle' : t < line.thinkAt ? 'reading' : t < line.replyAt ? 'thinking' : 'done'
  const replied = t >= line.replyAt
  return {
    askChars: clamp(Math.floor((t - START_MS) / ASK_MS), 0, line.askLength),
    sent: t >= line.sendAt,
    progress,
    tokens: progress === 'thinking' ? Math.round((tokens * (t - line.thinkAt)) / THINK_MS) : progress === 'done' ? tokens : 0,
    replied,
    chips: replied ? clamp(Math.floor((t - line.replyAt) / CHIP_MS) + 1, 0, line.panes.length) : 0,
    panes: line.panes.map((pane) => ({
      open: t >= pane.openAt,
      promptChars: clamp(Math.floor((t - pane.promptAt) / PROMPT_MS), 0, pane.promptLength),
      lines: t < pane.outputAt ? 0 : clamp(Math.floor((t - pane.outputAt) / pane.pace) + 1, 0, pane.lines),
      done: t >= pane.doneAt,
    })),
    meters: clamp((t - line.metersAt) / METER_MS, 0, 1),
    finished: t >= line.total,
  }
}
export function useScenario(terminals: readonly FrameTerminal[], askLength: number, tokens: number, frame: RefObject<HTMLElement | null>) {
  const line = useMemo(() => timeline(terminals, askLength), [terminals, askLength])
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const element = frame.current
    if (!element || startedAt !== null) return
    if (typeof IntersectionObserver === 'undefined') {
      const timer = setTimeout(() => setStartedAt(performance.now()), 0)
      return () => clearTimeout(timer)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        setStartedAt(performance.now())
      },
      { threshold: 0.35 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [frame, startedAt])

  const playing = startedAt !== null && elapsed < line.total
  useEffect(() => {
    if (!playing || startedAt === null) return
    const timer = window.setInterval(() => setElapsed(performance.now() - startedAt), TICK_MS)
    return () => window.clearInterval(timer)
  }, [playing, startedAt])

  const shown = startedAt === null ? 0 : elapsed
  const state = useMemo(() => stateAt(line, shown, tokens), [line, shown, tokens])

  const replay = () => {
    setStartedAt(performance.now())
    setElapsed(0)
  }

  return { state, replay, started: startedAt !== null }
}
