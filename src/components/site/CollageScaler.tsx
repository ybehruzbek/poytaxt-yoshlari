'use client'

import { useEffect } from 'react'

/** Hero kollajini (600×700 kanvas) konteyner kengligiga moslab masshtablaydi. */
export function CollageScaler() {
  useEffect(() => {
    const fit = document.getElementById('collageFit')
    const collage = document.getElementById('collage')
    if (!fit || !collage) return
    const ro = new ResizeObserver(() => {
      collage.style.transform = `scale(${fit.clientWidth / 600})`
    })
    ro.observe(fit)
    return () => ro.disconnect()
  }, [])
  return null
}
