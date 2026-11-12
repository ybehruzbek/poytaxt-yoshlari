/* eslint-disable @next/next/no-img-element -- tarmoqlar sahifalarining skrinşotlari */
import type { ReactNode } from 'react'

import { NET_LABEL, NETS, type Net } from '@/lib/socials'
import { getSocials } from '@/lib/socials-server'

/*
 * "Bizni kuzatib boring" bölimi: ijtimoiy tarmoqlar iPhone körinişida.
 * Havolalar admin paneldan (Sayt sozlamalari → Ijtimoiy tarmoqlar).
 * Telefon ičida — har bir sahifaning ASL skrinşoti (yasalgan illyustratsiya emas).
 */

export const Icon: Record<Net, ReactNode> = {
  telegram: (
    <path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.2 13 1.4 11.5c-1-.3-1-1 .2-1.5L20.6 2.7c.9-.3 1.6.2 1.3 1.6z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" />
    </>
  ),
  facebook: <path d="M14 8V6c0-.9.6-1 1-1h3V1h-4c-3.3 0-4 2.4-4 4v3H7v4h3v11h4V12h3.5l.5-4H14z" />,
  youtube: (
    <path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 3.6 12 3.6 12 3.6s-4.6 0-7.8.3c-.4.1-1.4.1-2.3 1C1.2 5.6 1 7.2 1 7.2S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.6 0 7.8-.3c.4-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 14.9V8.4l6.1 3.3-6.1 3.2z" />
  ),
}

export const Svg = ({ net }: { net: Net }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    {Icon[net]}
  </svg>
)

export const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/**
 * Har bir tarmoqning ASL sahifasidan olingan skrinşot (public/img/socials/{tarmoq}.webp, telefon eni 390 px).
 * Yangilaş: sahifani telefon enida oçib skrinşot oling va şu faylni almaştiring.
 * dark — ekran töq (holat satri oq yoziladi).
 */
const PHONES: Record<Net, { aria: string; dark: boolean }> = {
  telegram: { aria: 'Telegram kanalimiz', dark: true },
  instagram: { aria: 'Instagram sahifamiz', dark: true },
  facebook: { aria: 'Facebook sahifamiz', dark: false },
  youtube: { aria: 'YouTube kanalimiz', dark: true },
}

export async function SocialPhones() {
  const socials = await getSocials()
  const nets = NETS.filter((n) => socials[n])
  if (!nets.length) return null
  return (
    <section className="sec sp" id="ijtimoiy-tarmoqlar">
      <div className="wrap">
        <div className="sec-head sp-head">
          <h2 className="h2">
            Ijtimoiy <span>tarmoqlar</span>
          </h2>
          <p className="body4">Kengaşning rasmiy sahifalari: yangiliklar, eʼlonlar va tadbirlar haqida xabarlar.</p>
        </div>
        <div className="sp-phones">
          {nets.map((net) => {
            const { aria, dark } = PHONES[net]
            return (
              <a
                key={net}
                href={socials[net]}
                target="_blank"
                rel="noopener noreferrer"
                className={`sp-phone sp-phone-${net}`}
                aria-label={`${aria} (yangi oynada oçiladi)`}
              >
                <span className={`ph ph-${dark ? 'dark' : 'light'}`} aria-hidden="true">
                  <span className="ph-island" />
                  <span className="ph-status">
                    <b>9:41</b>
                    <i />
                  </span>
                  <span className="ph-scr ph-shot">
                    <img src={`/img/socials/${net}.webp`} alt="" loading="lazy" width={390} height={844} />
                  </span>
                </span>
                <span className="sp-phone-label">
                  <Svg net={net} />
                  {NET_LABEL[net]}
                  <span className="sp-phone-go">
                    <Arrow />
                  </span>
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
