import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Featured } from '@/components/sections/Featured'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Stack } from '@/components/sections/Stack'
import { ByteScramble } from '@/effects/ByteScramble'
import { ByteTrail } from '@/effects/ByteTrail'
import { useReveal } from '@/effects/useReveal'
import { LanguageProvider } from '@/i18n'

function Page() {
  useReveal()
  return (
    <div className="relative z-10 flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Experience />
        <Featured />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export function App() {
  return (
    <LanguageProvider>
      <ByteTrail />
      <ByteScramble />
      <Page />
    </LanguageProvider>
  )
}
