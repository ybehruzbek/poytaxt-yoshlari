'use client'

import { createContext, type ReactNode, useContext } from 'react'

import { DEFAULT_MIQDOR, type Miqdorlar } from '@/lib/miqdorlar'

/** Brauzerdagi komponentlar (kalkulyatorlar, röyxatlar) uçun joriy pul miqdorlari — layout serverda bazadan uzatadi */
const Ctx = createContext<Miqdorlar>(DEFAULT_MIQDOR)

export function MiqdorProvider({ value, children }: { value: Miqdorlar; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useMiqdor = () => useContext(Ctx)
