import { useEffect } from 'react'

import { startByteScramble } from './startByteScramble'
import { useFinePointer } from './useMediaQuery'
export function ByteScramble() {
  const active = useFinePointer()

  useEffect(() => {
    if (!active) return
    return startByteScramble()
  }, [active])

  return null
}
