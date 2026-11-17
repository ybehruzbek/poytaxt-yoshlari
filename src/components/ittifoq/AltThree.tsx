/* eslint-disable @next/next/no-img-element -- Ittifoq logotipi */
import type { IttifoqData } from '@/lib/cms/sahifalar'

const ICONS: Record<string, string> = {
  'Töliq nomi': 'M4 6h16M4 12h16M4 18h10',
  Ruşça: 'M3 5h12M9 3v2m-3 0c0 5 3 9 7 11M5 16c3-1 6-4 7-8m3 13 4-9 4 9m-7-3h6',
  Inglizça: 'M3 5h12M9 3v2m-3 0c0 5 3 9 7 11M5 16c3-1 6-4 7-8m3 13 4-9 4 9m-7-3h6',
  'Taşkiliy-huquqiy şakli': 'M12 3 3 8v2h18V8l-9-5zM5 10v8m4-8v8m6-8v8m4-8v8M3 21h18',
  'Taşkil etilgan sana':
    'M7 3v3m10-3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z',
  'Markaziy Kengaş manzili':
    'M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
}
const MAP =
  'https://yandex.uz/maps/?text=' + encodeURIComponent('Toşkent, Alişer Navoiy köçasi, 11')

/** “Rasmiy maʼlumotlar”: sarlavha va logotip, ostida har bir maʼlumot belgili alohida kartada; manzil — xarita havolasi bilan */
export function OfficialB({ locale = 'uz', D }: { locale?: string; D: IttifoqData }) {
  const { OFFICIAL } = D
  return (
    <section className="sec of-sec">
      <div className="wrap">
        <div className="of-c">
          <div className="of-c-head">
            <h2 className="h2">Rasmiy maʼlumotlar</h2>
            <div className="of-c-logo">
              <img
                src={`/img/ittifoq-logo-${locale}.webp`}
                alt="Özbekiston yoşlar ittifoqi logotipi"
                width={520}
                height={215}
              />
            </div>
          </div>
          <ul>
            {OFFICIAL.rows.map(([k, v]) => (
              <li key={k}>
                <span className="of-c-ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d={ICONS[k] ?? 'M4 12h16'} />
                  </svg>
                </span>
                <small>{k}</small>
                <b>{v}</b>
                {k === 'Markaziy Kengaş manzili' && (
                  <a href={MAP} target="_blank" rel="noopener noreferrer">
                    Xaritada köriş ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
