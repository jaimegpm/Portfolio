import { useEffect } from 'react'
export function useReveal() {
  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLElement>('.reveal')
    if (!('IntersectionObserver' in window)) {
      blocks.forEach((block) => block.classList.add('is-in'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12 },
    )
    blocks.forEach((block) => observer.observe(block))
    return () => observer.disconnect()
  }, [])
}
