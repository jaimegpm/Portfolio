export function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}
