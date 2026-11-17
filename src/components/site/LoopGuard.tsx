'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Cheksiz CSS animatsiyalar (lentalar, aylanuvçi bezaklar) ekrandan çiqqanda pauza qilinadi va
 * qaytganda davom etadi: körinmayotgan joyda videokarta va batareya bekorga işlamaydi.
 * Sahifa kodiga tegmaydi — işlab turgan animatsiyalarni brauzerdan (getAnimations) özi topadi va
 * elementga `data-away` belgisini qöyadi (pauza CSS orqali: styles.css). CSS dagi öz pauzalari
 * (masalan, sichqonça ustida töxtaş) buzilmaydi.
 */
export function LoopGuard() {
  const pathname = usePathname()
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || !document.getAnimations) return
    const seen = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) en.target.toggleAttribute('data-away', !en.isIntersecting)
    })
    // yangi sahifa çizilib, CSS animatsiyalari boşlanişini kutamiz
    const t = window.setTimeout(() => {
      for (const a of document.getAnimations()) {
        if (a.effect?.getTiming().iterations !== Infinity) continue
        const el = (a.effect as KeyframeEffect | null)?.target
        if (!el || seen.has(el)) continue
        seen.add(el)
        io.observe(el)
      }
    }, 800)
    return () => {
      clearTimeout(t)
      io.disconnect()
      seen.forEach((el) => el.removeAttribute('data-away'))
    }
  }, [pathname])
  return null
}
