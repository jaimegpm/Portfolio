import type { ReactNode } from 'react'

import { ArrowIcon } from './icons'

interface LinkButtonProps {
  href: string
  children: ReactNode
  primary?: boolean
  external?: boolean
}

export function LinkButton({ href, children, primary = false, external = false }: LinkButtonProps) {
  const tone = primary
    ? 'border-accent bg-accent text-accent-ink hover:border-fg hover:bg-fg hover:text-bg'
    : 'border-line-2 bg-bg text-fg hover:border-fg'
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`label inline-flex h-[50px] items-center gap-3 border px-6 text-[13px] transition-colors duration-[var(--dur-fast)] ${tone}`}
    >
      {children}
      <ArrowIcon />
    </a>
  )
}
