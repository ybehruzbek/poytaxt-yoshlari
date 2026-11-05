/* eslint-disable @next/next/no-img-element -- logotip PNG va namunaviy rasmlar */
import type { ReactNode } from 'react'

import { NET_LABEL, NETS, type Net, socialHandle } from '@/lib/socials'
import { getSocials } from '@/lib/socials-server'

/*
 * "Bizni kuzatib boring" bo'limi: ijtimoiy tarmoqlar iPhone ko'rinishida.
 * Havolalar admin paneldan (Sayt sozlamalari → Ijtimoiy tarmoqlar).
 * Telefon ichidagi ko'rinishlar sahifaning soddalashtirilgan illyustratsiyasi (haqiqiy skrinshot emas);
 * obunachilar soni kabi raqamlar ataylab ko'rsatilmaydi.
 */
const NAME = 'Poytaxt yoşlari'

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

/** Kichik dumaloq avatar — oq fonda logotip */
const Ava = ({ size = 'm' }: { size?: 's' | 'm' | 'l' }) => (
  <span className={`ph-ava ph-ava-${size}`}>
    <img src="/img/logo-toshkent.png" alt="" />
  </span>
)

function TelegramScreen({ handle }: { handle: string }) {
  return (
    <div className="ph-scr ph-tg">
      <div className="ph-bar">
        <span className="ph-back">‹</span>
        <Ava size="s" />
        <span className="ph-title">
          <b>{NAME}</b>
          <small>{handle ? `${handle} · kanal` : 'kanal'}</small>
        </span>
      </div>
      <div className="ph-tg-feed">
        <div className="ph-tg-post">
          <img src="/img/news-1.jpg" alt="" loading="lazy" />
          <p>Yoşlar uçun yangi grant tanlovi eʼlon qilindi. Batafsil — saytimizda.</p>
          <small>10:24</small>
        </div>
        <div className="ph-tg-post">
          <p>Şanba kuni poytaxt yoşlari forumi bölib ötadi. Röyxatdan öting!</p>
          <small>12:05</small>
        </div>
      </div>
      <div className="ph-tg-join">Kanalga qöşiliş</div>
    </div>
  )
}

function InstagramScreen({ handle }: { handle: string }) {
  const tiles = ['about-1', 'news-2', 'opp-vol', 'news-3', 'about-2', 'opp-grant', 'hero-tk', 'opp-stip', 'about-3']
  return (
    <div className="ph-scr ph-ig">
      <div className="ph-bar ph-bar-plain">
        <b>{handle || NAME}</b>
      </div>
      <div className="ph-ig-head">
        <span className="ph-ig-ring">
          <Ava size="l" />
        </span>
        <span className="ph-ig-name">
          <b>{NAME}</b>
          <small>Yoşlar Ittifoqi · Toşkent şahar</small>
        </span>
      </div>
      <div className="ph-btn">Obuna böliş</div>
      <div className="ph-ig-grid">
        {tiles.map((t) => (
          <img key={t} src={`/img/${t}.jpg`} alt="" loading="lazy" />
        ))}
      </div>
    </div>
  )
}

function FacebookScreen(_: { handle: string }) {
  return (
    <div className="ph-scr ph-fb">
      <div className="ph-fb-cover">
        <img src="/img/hero-tk.jpg" alt="" loading="lazy" />
      </div>
      <div className="ph-fb-id">
        <Ava size="l" />
        <b>{NAME}</b>
        <small>Jamoat taşkiloti</small>
        <div className="ph-btn">Kuzatiş</div>
      </div>
      <div className="ph-fb-post">
        <div className="ph-fb-ph">
          <Ava size="s" />
          <span>
            <b>{NAME}</b>
            <small>2 soat oldin</small>
          </span>
        </div>
        <p>Volontyorlar safiga qöşiling — har bir yaxşi iş poytaxtdan boşlanadi.</p>
        <img src="/img/opp-vol.jpg" alt="" loading="lazy" />
      </div>
    </div>
  )
}

function YoutubeScreen({ handle }: { handle: string }) {
  const videos = [
    { img: 'news-2', t: 'Poytaxt yoşlari forumi — töliq lavha' },
    { img: 'about-1', t: 'Kengaş faoliyati: yil yakunlari' },
  ]
  return (
    <div className="ph-scr ph-yt">
      <div className="ph-yt-banner" />
      <div className="ph-yt-id">
        <Ava size="m" />
        <span>
          <b>{NAME}</b>
          {handle && <small>{handle}</small>}
        </span>
      </div>
      <div className="ph-btn">Obuna böliş</div>
      <div className="ph-yt-list">
        {videos.map((v) => (
          <div key={v.img} className="ph-yt-vid">
            <span className="ph-yt-thumb">
              <img src={`/img/${v.img}.jpg`} alt="" loading="lazy" />
              <i />
            </span>
            <b>{v.t}</b>
          </div>
        ))}
      </div>
    </div>
  )
}

const PHONES: Record<Net, { aria: string; Screen: (p: { handle: string }) => ReactNode }> = {
  telegram: { aria: 'Telegram kanalimiz', Screen: TelegramScreen },
  instagram: { aria: 'Instagram sahifamiz', Screen: InstagramScreen },
  facebook: { aria: 'Facebook sahifamiz', Screen: FacebookScreen },
  youtube: { aria: 'YouTube kanalimiz', Screen: YoutubeScreen },
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
            Bizni <span>kuzatib boring</span>
          </h2>
          <p className="body4">Yangiliklar, eʼlonlar va tadbirlar — birinçi bölib ijtimoiy tarmoqlarimizda.</p>
        </div>
        <div className="sp-phones">
          {nets.map((net) => {
            const { aria, Screen } = PHONES[net]
            return (
              <a
                key={net}
                href={socials[net]}
                target="_blank"
                rel="noopener noreferrer"
                className={`sp-phone sp-phone-${net}`}
                aria-label={`${aria} (yangi oynada oçiladi)`}
              >
                <span className="ph" aria-hidden="true">
                  <span className="ph-island" />
                  <span className="ph-status">
                    <b>9:41</b>
                    <i />
                  </span>
                  <Screen handle={socialHandle(net, socials[net])} />
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
