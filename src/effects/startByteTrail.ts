const HEX = '0123456789ABCDEF'
const CELL_W = 16
const CELL_H = 12
const RADIUS = 64
const TRAIL_MS = 520
const TICK_MS = 80

interface Point {
  x: number
  y: number
  t: number
}
function noise(x: number, y: number, tick: number) {
  let h = (x * 374761393 + y * 668265263 + tick * 1274126177) | 0
  h = (h ^ (h >>> 13)) * 1274126177
  return (h ^ (h >>> 16)) >>> 0
}
export function startByteTrail(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')
  if (!context) return () => {}
  const ctx = context

  const points: Point[] = []
  let width = 0
  let height = 0
  let frame = 0
  let inside = false
  let accent = '#7dff63'

  function readAccent() {
    accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || accent
  }

  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 2)
    width = innerWidth
    height = innerHeight
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(height * ratio)
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  }

  function drawCloud(x: number, y: number, radius: number, strength: number, tick: number) {
    const columns = Math.ceil(radius / CELL_W)
    const rows = Math.ceil(radius / CELL_H)
    const originX = Math.round(x / CELL_W)
    const originY = Math.round(y / CELL_H)
    for (let row = -rows; row <= rows; row++) {
      for (let column = -columns; column <= columns; column++) {
        const cellX = (originX + column) * CELL_W
        const cellY = (originY + row) * CELL_H
        const distance = Math.hypot(cellX - x, cellY - y)
        if (distance > radius) continue
        const value = noise(originX + column, originY + row, tick)
        if (value % 7 === 0) continue
        const falloff = 1 - distance / radius
        ctx.globalAlpha = falloff * falloff * strength
        ctx.fillText(HEX.charAt((value >>> 4) & 15) + HEX.charAt(value & 15), cellX, cellY)
      }
    }
  }

  function draw(now: number) {
    frame = 0
    ctx.clearRect(0, 0, width, height)
    while (points.length > 1 && now - (points[0]?.t ?? now) > TRAIL_MS) points.shift()
    const head = points[points.length - 1]
    if (!head) return

    ctx.font = '10px "JetBrains Mono", monospace'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillStyle = accent
    const tick = Math.floor(now / TICK_MS)

    for (let i = 0; i < points.length - 1; i++) {
      const point = points[i]
      if (!point) continue
      const age = 1 - (now - point.t) / TRAIL_MS
      drawCloud(point.x, point.y, RADIUS * 0.55 * age, 0.22 * age, tick)
    }
    drawCloud(head.x, head.y, RADIUS, 0.72, tick)
    ctx.globalAlpha = 1

    if (inside && document.visibilityState === 'visible') frame = requestAnimationFrame(draw)
  }

  function schedule() {
    if (!frame && inside && document.visibilityState === 'visible') frame = requestAnimationFrame(draw)
  }

  function onMove(event: PointerEvent) {
    if (event.pointerType !== 'mouse') return
    inside = true
    const last = points[points.length - 1]
    const now = performance.now()
    if (last && Math.hypot(event.clientX - last.x, event.clientY - last.y) < 10) {
      last.t = now
    } else {
      points.push({ x: event.clientX, y: event.clientY, t: now })
      if (points.length > 6) points.shift()
    }
    schedule()
  }

  function onLeave() {
    inside = false
    if (frame) cancelAnimationFrame(frame)
    frame = 0
    points.length = 0
    ctx.clearRect(0, 0, width, height)
  }

  function onVisibility() {
    if (document.visibilityState === 'visible') schedule()
  }

  const themeObserver = new MutationObserver(readAccent)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  readAccent()
  resize()
  addEventListener('resize', resize)
  addEventListener('pointermove', onMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
  document.addEventListener('visibilitychange', onVisibility)

  return () => {
    if (frame) cancelAnimationFrame(frame)
    removeEventListener('resize', resize)
    removeEventListener('pointermove', onMove)
    document.documentElement.removeEventListener('pointerleave', onLeave)
    document.removeEventListener('visibilitychange', onVisibility)
    themeObserver.disconnect()
  }
}
