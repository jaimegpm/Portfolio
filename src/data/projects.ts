import type { Text } from '@/i18n/types'

export type Access = 'private' | 'public' | 'demo'

export interface Project {
  id: string
  index: string
  name: string
  tagline: Text
  text: Text
  stack: string[]
  access: Access
  repo?: string
  site?: string
  tos?: boolean
}

export const eclipseProjects: Project[] = [
  {
    id: 'eclipsescripts',
    index: '0x31',
    name: 'EclipseScripts',
    tagline: { es: 'Plataforma de scripts para Rust', en: 'Scripts platform for Rust' },
    text: {
      es: 'Web en Next.js, backend en Rust con axum y Postgres, bot de Discord y un loader nativo para Windows con la interfaz embebida en el propio binario.',
      en: 'Next.js site, Rust backend on axum with Postgres, a Discord bot and a native Windows loader with the interface embedded in the binary itself.',
    },
    stack: ['Rust', 'axum', 'Postgres', 'Next.js', 'C++', 'Win32', 'WebView2'],
    access: 'private',
  },
  {
    id: 'eclipse',
    index: '0x32',
    name: 'Eclipse',
    tagline: { es: 'Cheat para Rust', en: 'Cheat for Rust' },
    text: {
      es: 'Cliente para Windows firmado, con instalador propio y validación de licencia contra la plataforma.',
      en: 'Signed Windows client with its own installer and licence validation against the platform.',
    },
    stack: ['C#', 'Windows App SDK', 'MSIX'],
    access: 'private',
    tos: true,
  },
  {
    id: 'eclipsedma',
    index: '0x33',
    name: 'EclipseDMA',
    tagline: { es: 'Firmware DMA con emulación de donante', en: 'DMA firmware with donor emulation' },
    text: {
      es: 'Emulación uno a uno de una tarjeta de red donante, compilada como firmware para una tarjeta DMA sobre FPGA. Incluye cliente de escritorio y sondas de diagnóstico del bus PCIe.',
      en: 'One to one emulation of a donor network card, compiled as firmware for an FPGA based DMA card. Ships with a desktop client and PCIe bus diagnostic probes.',
    },
    stack: ['Verilog', 'FPGA', 'PCIe', 'C++'],
    access: 'private',
  },
  {
    id: 'eclipseoptimizer',
    index: '0x34',
    name: 'EclipseOptimizer',
    tagline: { es: 'Optimizador de Windows para juegos', en: 'Windows optimizer for gaming' },
    text: {
      es: 'Catálogos de ajustes reversibles para Windows 10 y 11 y un monitor de afinidad de núcleos. Host en C++20 sobre Win32 con la interfaz en WebView2.',
      en: 'Reversible tweak catalogs for Windows 10 and 11 and a core affinity monitor. C++20 host on Win32 with a WebView2 interface.',
    },
    stack: ['C++20', 'Win32', 'WebView2'],
    access: 'private',
  },
]

export const otherProjects: Project[] = [
  {
    id: 'thelabarber',
    index: '0x40',
    name: 'THELABARBER',
    tagline: { es: 'Web y reservas para una barbería', en: 'Site and bookings for a barbershop' },
    text: {
      es: 'Landing mobile first, solicitud de cita con confirmación manual y panel privado para la agenda.',
      en: 'Mobile first landing, appointment requests with manual confirmation and a private agenda panel.',
    },
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Resend'],
    access: 'private',
  },
  {
    id: 'busbot',
    index: '0x41',
    name: 'Bus Bot LA',
    tagline: { es: 'Bot de Discord para Lost Ark', en: 'Discord bot for Lost Ark' },
    text: {
      es: 'Gestión de buses de raid con sistema de confianza y avisos.',
      en: 'Raid bus management with a trust system and alerts.',
    },
    stack: ['Node.js', 'Discord'],
    access: 'private',
  },
  {
    id: 'bus-tool',
    index: '0x42',
    name: 'bus-tool',
    tagline: { es: 'Reparto de oro para Lost Ark', en: 'Gold split for Lost Ark' },
    text: {
      es: 'Calculadora de reparto entre los conductores de un bus.',
      en: 'Split calculator for the drivers of a bus run.',
    },
    stack: ['JavaScript', 'HTML', 'CSS'],
    access: 'public',
    repo: 'https://github.com/jaimegpm/bus-tool',
    site: 'https://jaimegpm.github.io/bus-tool/',
  },
  {
    id: 'bettingsgpm',
    index: '0x43',
    name: 'BettingsGPM',
    tagline: { es: 'Apuestas deportivas simuladas', en: 'Simulated sports betting' },
    text: {
      es: 'Cuotas, historial de apuestas y clasificación, sin dinero real.',
      en: 'Odds, betting history and a leaderboard, no real money.',
    },
    stack: ['JavaScript', 'HTML', 'CSS'],
    access: 'public',
    repo: 'https://github.com/jaimegpm/BettingsGPM',
    site: 'https://jaimegpm.github.io/BettingsGPM/',
  },
  {
    id: 'biblioteca',
    index: '0x44',
    name: 'Biblioteca',
    tagline: { es: 'Gestión de una biblioteca', en: 'Library management' },
    text: {
      es: 'Aplicación de escritorio con catálogo, socios y préstamos.',
      en: 'Desktop application with catalogue, members and loans.',
    },
    stack: ['Java', 'Swing', 'JDBC'],
    access: 'public',
    repo: 'https://github.com/jaimegpm/Biblioteca',
  },
  {
    id: 'heic-to-jpg',
    index: '0x45',
    name: 'Heic-to-JPG',
    tagline: { es: 'Conversor de imágenes', en: 'Image converter' },
    text: {
      es: 'Convierte fotos HEIC de iPhone a JPG por lotes desde la terminal.',
      en: 'Batch converts iPhone HEIC photos to JPG from the terminal.',
    },
    stack: ['Python'],
    access: 'public',
    repo: 'https://github.com/jaimegpm/Heic-to-JPG',
  },
]
