'use client'

import { useEffect } from 'react'

/**
 * Hero kollajini (600×700 kanvas) konteyner kengligiga moslab masshtablaydi.
 * Konteyner içida bir neçta kollaj (dizayn variantlari) bölişi mumkin — hammasi bir xil masshtablanadi.
 */
export function CollageScaler() {
  useEffect(() => {
    const fits = [...document.querySelectorAll<HTMLElement>('.collage-fit')]
    if (!fits.length) return
    const ro = new ResizeObserver((entries) => {
      for (const en of entries) {
        const fit = en.target as HTMLElement
        const k = fit.clientWidth / 600
        fit.querySelectorAll<HTMLElement>('.collage').forEach((c) => (c.style.transform = `scale(${k})`))
      }
    })
    fits.forEach((f) => ro.observe(f))
    return () => ro.disconnect()
  }, [])
  return null
}
