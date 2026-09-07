const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export function ArrowIcon() {
  return (
    <svg className="size-3.5 shrink-0" viewBox="0 0 16 16" aria-hidden="true" {...stroke}>
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  )
}

export function MoonIcon() {
  return (
    <svg className="size-[18px]" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9Z" />
    </svg>
  )
}

export function SunIcon() {
  return (
    <svg className="size-[18px]" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export function MenuIcon() {
  return (
    <svg className="size-[18px]" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg className="size-[18px]" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}
