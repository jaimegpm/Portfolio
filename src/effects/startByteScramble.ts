const HEX = '0123456789ABCDEF'
const MIN_RADIUS = 56
const RADIUS_PER_EM = 2.2
const BOX_MARGIN = 3
const MAX_CHARS = 900
const HIGHLIGHT_NAME = 'byte-scramble'
const UNIT_SELECTOR = 'a, button, summary, label'
const BLOCK_SELECTOR = 'h1, h2, h3, h4, h5, h6, p, li, dt, dd, td, th, figcaption, blockquote'
const INLINE_SELECTOR = 'span, em, strong, b, i, small, time'
const SKIP_SELECTOR = '[data-scramble="off"], input, textarea, select, [contenteditable="true"], pre, script, style, svg'

interface HighlightLike {
  add(range: Range): void
  clear(): void
}

interface Slot {
  node: Text
  original: string
  shown: string
  radius: number
  box: Float32Array
  stamp: Float64Array
  centers: Float32Array
}

interface Session {
  host: Element
  slots: Slot[]
}
function findHost(target: EventTarget | null): Element | null {
  if (!(target instanceof Element)) return null
  if (target.closest(SKIP_SELECTOR)) return null
  const host = target.closest(UNIT_SELECTOR) ?? target.closest(BLOCK_SELECTOR)
  if (host) return host
  let element = target
  while (element.parentElement?.matches(INLINE_SELECTOR)) element = element.parentElement
  for (const child of element.childNodes) {
    if (child.nodeType === Node.TEXT_NODE && (child.nodeValue ?? '').trim()) return element
  }
  return null
}
function measure(node: Text): Slot | null {
  const original = node.data
  const parent = node.parentElement
  if (!parent || !original.trim()) return null
  const range = document.createRange()
  const centers = new Float32Array(original.length * 2)
  const box = new Float32Array([Infinity, Infinity, -Infinity, -Infinity])
  const line = parent.getBoundingClientRect()
  for (let i = 0; i < original.length; i++) {
    if (/\s/.test(original.charAt(i))) {
      centers[i * 2] = Number.NaN
      continue
    }
    range.setStart(node, i)
    range.setEnd(node, i + 1)
    const rect = range.getBoundingClientRect()
    const top = Math.max(rect.top, line.top)
    const bottom = Math.min(rect.bottom, line.bottom)
    if (!rect.width || bottom <= top) {
      centers[i * 2] = Number.NaN
      continue
    }
    centers[i * 2] = rect.left + rect.width / 2 + scrollX
    centers[i * 2 + 1] = (top + bottom) / 2 + scrollY
    box[0] = Math.min(box[0] ?? Infinity, rect.left + scrollX - BOX_MARGIN)
    box[1] = Math.min(box[1] ?? Infinity, top + scrollY - BOX_MARGIN)
    box[2] = Math.max(box[2] ?? -Infinity, rect.right + scrollX + BOX_MARGIN)
    box[3] = Math.max(box[3] ?? -Infinity, bottom + scrollY + BOX_MARGIN)
  }
  if (!Number.isFinite(box[0] ?? Infinity)) return null
  const radius = Math.max(MIN_RADIUS, parseFloat(getComputedStyle(parent).fontSize) * RADIUS_PER_EM)
  return { node, original, shown: original, radius, box, stamp: new Float64Array(original.length), centers }
}

function collect(host: Element): Slot[] {
  const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT)
  const slots: Slot[] = []
  let budget = MAX_CHARS
  for (let node = walker.nextNode(); node && budget > 0; node = walker.nextNode()) {
    const parent = node.parentElement
    if (!parent || (parent !== host && parent.closest(SKIP_SELECTOR))) continue
    const slot = measure(node as Text)
    if (!slot) continue
    slots.push(slot)
    budget -= slot.original.length
  }
  return slots
}

function overText(slots: Slot[], px: number, py: number): boolean {
  for (const slot of slots) {
    const box = slot.box
    if (px >= (box[0] ?? 0) && px <= (box[2] ?? 0) && py >= (box[1] ?? 0) && py <= (box[3] ?? 0)) return true
  }
  return false
}
export function startByteScramble() {
  const registry = (CSS as unknown as { highlights?: Map<string, HighlightLike> }).highlights
  const HighlightCtor = (window as unknown as { Highlight?: new () => HighlightLike }).Highlight
  const highlight = registry && HighlightCtor ? new HighlightCtor() : null
  if (registry && highlight) registry.set(HIGHLIGHT_NAME, highlight)

  let session: Session | null = null
  let frame = 0
  let clientX = -9999
  let clientY = -9999

  function quiet() {
    if (session) {
      for (const slot of session.slots) {
        if (slot.node.isConnected && slot.node.data === slot.shown && slot.shown !== slot.original) {
          slot.node.data = slot.original
          slot.shown = slot.original
        }
      }
    }
    highlight?.clear()
  }

  function restore() {
    quiet()
    session = null
  }

  function schedule() {
    if (!frame && session) frame = requestAnimationFrame(draw)
  }

  function drawSlot(slot: Slot, px: number, py: number, now: number) {
    let out = ''
    for (let i = 0; i < slot.original.length; i++) {
      const letter = slot.original.charAt(i)
      const cx = slot.centers[i * 2] ?? Number.NaN
      if (Number.isNaN(cx)) {
        out += letter
        continue
      }
      const distance = Math.hypot(px - cx, py - (slot.centers[i * 2 + 1] ?? 0))
      let next = letter
      if (distance < slot.radius) {
        const closeness = 1 - distance / slot.radius
        if (now - (slot.stamp[i] ?? 0) > 30 + 60 * (1 - closeness)) {
          next = Math.random() < 0.9 * Math.sqrt(closeness) ? HEX.charAt((Math.random() * 16) | 0) : letter
          slot.stamp[i] = now
        } else {
          next = slot.shown.charAt(i)
        }
      }
      out += next
    }
    if (out !== slot.shown) {
      slot.node.data = out
      slot.shown = out
    }
    if (highlight) {
      for (let i = 0; i < out.length; i++) {
        if (out.charAt(i) === slot.original.charAt(i)) continue
        const range = document.createRange()
        range.setStart(slot.node, i)
        range.setEnd(slot.node, i + 1)
        highlight.add(range)
      }
    }
  }

  function draw(now: number) {
    frame = 0
    if (!session) return
    if (!session.host.isConnected) {
      restore()
      return
    }
    const px = clientX + scrollX
    const py = clientY + scrollY
    if (!overText(session.slots, px, py)) {
      quiet()
      return
    }
    highlight?.clear()
    for (const slot of session.slots) {
      if (!slot.node.isConnected) continue
      if (slot.node.data !== slot.shown) {
        slot.original = slot.node.data
        slot.shown = slot.original
        slot.centers.fill(Number.NaN)
        continue
      }
      drawSlot(slot, px, py, now)
    }
    frame = requestAnimationFrame(draw)
  }

  function onOver(event: PointerEvent) {
    if (event.pointerType === 'touch') return
    clientX = event.clientX
    clientY = event.clientY
    const host = findHost(event.target)
    if (host === session?.host) return
    restore()
    if (!host) return
    const slots = collect(host)
    if (!slots.length) return
    session = { host, slots }
    schedule()
  }

  function onMove(event: PointerEvent) {
    if (event.pointerType === 'touch') return
    clientX = event.clientX
    clientY = event.clientY
    schedule()
  }

  function onLeave() {
    clientX = -9999
    clientY = -9999
    restore()
  }

  document.addEventListener('pointerover', onOver, { passive: true })
  document.addEventListener('pointermove', onMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
  addEventListener('scroll', schedule, { passive: true })
  addEventListener('resize', restore)

  return () => {
    if (frame) cancelAnimationFrame(frame)
    frame = 0
    restore()
    registry?.delete(HIGHLIGHT_NAME)
    document.removeEventListener('pointerover', onOver)
    document.removeEventListener('pointermove', onMove)
    document.documentElement.removeEventListener('pointerleave', onLeave)
    removeEventListener('scroll', schedule)
    removeEventListener('resize', restore)
  }
}
