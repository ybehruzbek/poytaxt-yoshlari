'use client'

import { useEffect, useState } from 'react'

import { MoreToggle } from '@/components/site/MoreToggle'
import { smoothScroll } from '@/lib/scroll'

/**
 * Yaşirin qolgan elementlarni oçadigan tugma (yagona köriniş — MoreToggle): nişon elementga data-open qöyadi (CSS yaşirişni olib taşlaydi).
 * `count` berilmasa, nişon ičidagi yaşirin farzandlar soni ekran eniga qarab özi sanaladi.
 */
export function ShowMore({ target, count, noun }: { target: string; count?: number; noun: string }) {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(count ?? 0)

  useEffect(() => {
    if (count !== undefined) return
    const el = document.getElementById(target)
    if (!el) return
    const calc = () => {
      if (el.hasAttribute('data-open')) return
      setHidden([...el.children].filter((c) => getComputedStyle(c).display === 'none').length)
    }
    calc()
    addEventListener('resize', calc)
    return () => removeEventListener('resize', calc)
  }, [target, count])

  const toggle = () => {
    const el = document.getElementById(target)
    if (!el) return
    const next = !open
    el.toggleAttribute('data-open', next)
    setOpen(next)
    if (!next) smoothScroll(el, { block: 'start' })
  }

  if (!open && hidden === 0) return null
  return (
    <MoreToggle rest={open ? 0 : hidden} noun={noun} controls={target} onMore={toggle} onLess={toggle} />
  )
}
