'use client'

import { type ReactNode, useState } from 'react'

import { DevVariantSwitch, useDevVariant } from '@/components/site/DevVariantSwitch'

/* VAQTINCHA: yangilik sahifasi variantlari — faqat faol variant çiziladi; production'da doim A */
const TITLES = ['Klassik', 'Yon panelli', 'Keng muqova']

export function ArticleSwitch({ a, b, c }: { a: ReactNode; b?: ReactNode; c?: ReactNode }) {
  const v = useDevVariant('ar', TITLES.length)
  return (
    <>
      {v === 'b' && b ? b : v === 'c' && c ? c : a}
      <DevVariantSwitch name="ar" label="Yangilik" titles={TITLES} />
    </>
  )
}

const TG = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21.5 4.3 2.9 11.5c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.1.9.8.9.5 0 .7-.2 1-.5l2.4-2.3 4.9 3.6c.9.5 1.5.2 1.8-.8l3.3-15.4c.3-1.3-.5-1.9-1.4-1.4ZM8.9 14.2l9.6-6.1c.5-.3.9-.1.5.2l-8.2 7.4-.3 3.4-1.6-4.9Z" />
  </svg>
)
const FB = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14 8V6.3c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.1 15.8 2 14.8 2 12.6 2 11 3.4 11 5.9V8H8.6v3H11v11h3V11h2.6l.4-3H14Z" />
  </svg>
)
const LINK = (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" />
  </svg>
)

/** Ulaşiş tugmalari: Telegram, Facebook, havolani nusxalaş */
export function Share({ url, title, label, vertical = false }: { url: string; title: string; label?: string; vertical?: boolean }) {
  const [copied, setCopied] = useState(false)
  const full = () => (typeof window === 'undefined' ? url : new URL(url, window.location.origin).href)
  const open = (href: string) => window.open(href, '_blank', 'noopener,noreferrer,width=640,height=560')
  return (
    <div className={`ar-share${vertical ? ' v' : ''}`} role="group" aria-label="Ulaşiş">
      {label && <span className="ar-share-l">{label}</span>}
      <button type="button" aria-label="Telegramʼda ulaşiş" onClick={() => open(`https://t.me/share/url?url=${encodeURIComponent(full())}&text=${encodeURIComponent(title)}`)}>
        {TG}
      </button>
      <button type="button" aria-label="Facebookʼda ulaşiş" onClick={() => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(full())}`)}>
        {FB}
      </button>
      <button
        type="button"
        aria-label="Havolani nusxalaş"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(full())
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          } catch {
            /* nusxalab bölmadi — heç narsa qilinmaydi */
          }
        }}
      >
        {LINK}
      </button>
      <span className="ar-share-ok" role="status">
        {copied ? 'Havola nusxalandi' : ''}
      </span>
    </div>
  )
}
