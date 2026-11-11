'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * “Maxsus imkoniyatlar” — köz belgisi (sarlavhada) va yon panel:
 * rang rejimi (odatiy, oq-qora, yuqori kontrast, rasmlarsiz), şrift ölçami, masştab,
 * ekran suhandoni (belgilangan matnni ovoz çiqarib öqiydi) va öqiş rejimi.
 * Sozlamalar brauzerda saqlanadi va <html> atributlari orqali butun saytga qöllanadi.
 */
type Mode = 'normal' | 'gray' | 'contrast' | 'invert'
type S = { mode: Mode; noImg: boolean; font: number; zoom: number; tts: boolean; read: boolean }

const DEF: S = { mode: 'normal', noImg: false, font: 0, zoom: 0, tts: false, read: false }
const KEY = 'a11y'
const FONTS = [1, 1.1, 1.2, 1.3, 1.45, 1.6] // şrift: 0 — odatiy
const ZOOMS = [1, 1.1, 1.25, 1.4, 1.6] // masştab: 0 — odatiy

const load = (): S => {
  try {
    return { ...DEF, ...JSON.parse(localStorage.getItem(KEY) || '{}') }
  } catch {
    return DEF
  }
}

function apply(s: S) {
  const h = document.documentElement
  const set = (k: string, v: string | false) => (v ? h.setAttribute(k, v) : h.removeAttribute(k))
  set('data-a11y-mode', s.mode !== 'normal' && s.mode)
  set('data-a11y-noimg', s.noImg && '1')
  set('data-a11y-read', s.read && '1')
  set('data-a11y-font', s.font > 0 && '1')
  set('data-a11y-zoom', s.zoom > 0 && '1')
  h.style.setProperty('--a11y-f', String(FONTS[s.font] ?? 1))
  h.style.setProperty('--a11y-z', String(ZOOMS[s.zoom] ?? 1))
}

/** Belgilangan matnni öqiş: özbekça ovoz bölsa — u, bölmasa turkça yoki ruscha */
function speak(text: string) {
  const synth = window.speechSynthesis
  if (!synth || !text) return
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text.slice(0, 1200))
  const vs = synth.getVoices()
  const v = ['uz', 'tr', 'ru']
    .map((l) => vs.find((x) => x.lang.toLowerCase().startsWith(l)))
    .find(Boolean)
  if (v) {
    u.voice = v
    u.lang = v.lang
  } else u.lang = 'uz-UZ'
  u.rate = 0.95
  synth.speak(u)
}

const Ic = ({ d }: { d: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
)
const EYE = 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
const MODES: { k: Mode; t: string; d: string }[] = [
  {
    k: 'normal',
    t: 'Odatiy köriniş',
    d: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  },
  { k: 'gray', t: 'Oq-qora', d: 'M12 2a10 10 0 1 0 0 20V2z M12 2a10 10 0 0 1 0 20' },
  {
    k: 'contrast',
    t: 'Yuqori kontrast',
    d: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 2v20M12 6h6M12 10h8M12 14h8M12 18h6',
  },
  { k: 'invert', t: 'Teskari ranglar', d: 'M12 22a10 10 0 1 0 0-20zM12 22a10 10 0 0 1 0-20' },
]

export function A11yPanel() {
  const [open, setOpen] = useState(false)
  const [s, setS] = useState<S>(DEF)
  const [ready, setReady] = useState(false)
  const close = useRef<HTMLButtonElement>(null)

  // saqlangan sozlamalar sahifa çizilişidan oldin qöllanadi
  useLayoutEffect(() => {
    const v = load()
    apply(v)
    // localStorage faqat brauzerda bor — server bilan mos kelişi uçun qiymat şu yerda öqiladi
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setS(v)
    setReady(true)
  }, [])

  const upd = useCallback((p: Partial<S>) => {
    setS((o) => {
      const n = { ...o, ...p }
      apply(n)
      try {
        localStorage.setItem(KEY, JSON.stringify(n))
      } catch {
        /* saqlab bölmasa — faqat şu sahifa uçun */
      }
      if (p.tts === false) window.speechSynthesis?.cancel()
      return n
    })
  }, [])

  // ekran suhandoni: belgilangan matn ovoz çiqarib öqiladi
  useEffect(() => {
    if (!s.tts) return
    const onUp = () => {
      const t = window.getSelection()?.toString().trim()
      if (t) speak(t)
    }
    document.addEventListener('mouseup', onUp)
    document.addEventListener('keyup', onUp)
    return () => {
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('keyup', onUp)
    }
  }, [s.tts])

  useEffect(() => {
    if (!open) return
    close.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const changed = JSON.stringify(s) !== JSON.stringify(DEF)

  return (
    <>
      <button
        type="button"
        className={`a11y-btn${changed ? ' on' : ''}`}
        aria-label="Maxsus imkoniyatlar"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Ic d={EYE} />
      </button>
      {ready &&
        createPortal(
          <div className={`a11y${open ? ' open' : ''}`} aria-hidden={!open}>
            <div className="a11y-shade" onClick={() => setOpen(false)} />
            <aside
              className="a11y-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="a11y-h"
              inert={!open}
            >
              <header className="a11y-head">
                <h2 id="a11y-h">Maxsus imkoniyatlar</h2>
                <button
                  ref={close}
                  type="button"
                  className="a11y-x"
                  aria-label="Yopiş"
                  onClick={() => setOpen(false)}
                >
                  <Ic d="M6 6l12 12M18 6L6 18" />
                </button>
              </header>

              <section className="a11y-sec">
                <h3>Rang rejimi</h3>
                <div className="a11y-modes" role="radiogroup" aria-label="Rang rejimi">
                  {MODES.map((m) => (
                    <button
                      key={m.k}
                      type="button"
                      role="radio"
                      aria-checked={s.mode === m.k}
                      title={m.t}
                      onClick={() => upd({ mode: m.k })}
                    >
                      <Ic d={m.d} />
                      <span>{m.t}</span>
                    </button>
                  ))}
                </div>
                <label className="a11y-check">
                  <input
                    type="checkbox"
                    checked={s.noImg}
                    onChange={(e) => upd({ noImg: e.target.checked })}
                  />
                  Rasmlarni yaşiriş
                </label>
              </section>

              <section className="a11y-sec">
                <h3>
                  Şrift ölçami <output>{Math.round((FONTS[s.font] ?? 1) * 100)}%</output>
                </h3>
                <input
                  type="range"
                  min={0}
                  max={FONTS.length - 1}
                  step={1}
                  value={s.font}
                  aria-label="Şrift ölçami"
                  onChange={(e) => upd({ font: Number(e.target.value) })}
                />
              </section>

              <section className="a11y-sec">
                <h3>
                  Masştab <output>{Math.round((ZOOMS[s.zoom] ?? 1) * 100)}%</output>
                </h3>
                <input
                  type="range"
                  min={0}
                  max={ZOOMS.length - 1}
                  step={1}
                  value={s.zoom}
                  aria-label="Masştab"
                  onChange={(e) => upd({ zoom: Number(e.target.value) })}
                />
              </section>

              <section className="a11y-sec">
                <h3>Ekran suhandoni</h3>
                <label className="a11y-check">
                  <input
                    type="checkbox"
                    checked={s.tts}
                    onChange={(e) => upd({ tts: e.target.checked })}
                  />
                  Yoqiş — belgilangan matn ovoz çiqarib öqiladi
                </label>
              </section>

              <section className="a11y-sec">
                <button
                  type="button"
                  className={`a11y-read${s.read ? ' on' : ''}`}
                  aria-pressed={s.read}
                  onClick={() => upd({ read: !s.read })}
                >
                  Öqiş rejimi
                </button>
                <p className="a11y-hint">
                  Animatsiya va bezaklar öçadi, matn qatorlari kengroq, havolalar tagiga çiziladi.
                </p>
              </section>

              <button
                type="button"
                className="a11y-reset"
                disabled={!changed}
                onClick={() => upd(DEF)}
              >
                Boşlanğiç holatga qaytariş
              </button>
            </aside>
          </div>,
          document.body,
        )}
    </>
  )
}
