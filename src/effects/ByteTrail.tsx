import { useEffect, useRef } from 'react'

import { startByteTrail } from './startByteTrail'
import { useFinePointer } from './useMediaQuery'

export function ByteTrail() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const active = useFinePointer()

  useEffect(() => {
    if (!active || !canvas.current) return
    return startByteTrail(canvas.current)
  }, [active])

  if (!active) return null
  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}
