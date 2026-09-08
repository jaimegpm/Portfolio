import { useSyncExternalStore } from 'react'

const subscribers = new Map<string, (onChange: () => void) => () => void>()

function subscribeTo(query: string) {
  let subscribe = subscribers.get(query)
  if (!subscribe) {
    subscribe = (onChange) => {
      const list = matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    }
    subscribers.set(query, subscribe)
  }
  return subscribe
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(subscribeTo(query), () => matchMedia(query).matches, () => false)
}

export function useFinePointer(): boolean {
  return useMediaQuery('(pointer: fine)')
}
