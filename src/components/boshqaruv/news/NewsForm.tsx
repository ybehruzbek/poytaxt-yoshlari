'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

import type { MediaItem } from '@/lib/boshqaruv/media-actions'
import { deleteNews, type NewsInput, saveNews, unpublishNews } from '@/lib/boshqaruv/news-actions'

import { Icon } from '../Icon'
import { Editor, hasUnsupported, type RichJson } from './Editor'
import { MediaPicker } from './MediaPicker'

export type Opt = { value: string; t: string }
export type FormInit = {
  id: number | null
  status: 'draft' | 'published'
  updatedAt: string | null
  data: NewsInput
  image: MediaItem | null
  gallery: MediaItem[]
}
type Props = {
  init: FormInit
  categories: Opt[]
  kinds: Opt[]
  authors: { id: number; name: string; position: string }[]
  versions: number
  isAdmin: boolean
  oldAdminHref: string | null
}

const EXCERPT_MAX = 320

/** ISO ↔ <input type="datetime-local"> (brauzer vaqti — xodimlar Toşkentda) */
const toLocal = (iso: string | null) => {
  if (!iso) return ''
  const d = new Date(iso)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`
}
const fromLocal = (v: string) => (v ? new Date(v).toISOString() : '')
const OY = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
/** “Saqlandi, 22:23” (bugun) yoki “Oxirgi tahrir: 14-noyabr, 21:01” */
const savedLabel = (iso: string) => {
  const d = new Date(iso)
  const t = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  return d.toDateString() === new Date().toDateString() ? `Saqlandi, ${t}` : `Oxirgi tahrir: ${d.getDate()}-${OY[d.getMonth()]}, ${t}`
}

export function NewsForm({ init, categories, kinds, authors, versions, isAdmin, oldAdminHref }: Props) {
  // vaqtga boğliq yozuvlar faqat brauzerda hisoblanadi: server (UTC) va xodim (UTC+5) vaqti farq qiladi
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const router = useRouter()
  const [id, setId] = useState(init.id)
  const [status, setStatus] = useState(init.status)
  const [d, setD] = useState<NewsInput>(init.data)
  const [image, setImage] = useState<MediaItem | null>(init.image)
  const [gallery, setGallery] = useState<MediaItem[]>(init.gallery)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState<null | 'draft' | 'publish' | 'auto'>(null)
  const [savedAt, setSavedAt] = useState<string | null>(init.updatedAt)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState<{ t: string; bad?: boolean } | null>(null)
  const [picker, setPicker] = useState<null | 'image' | 'gallery'>(null)
  const [tag, setTag] = useState('')
  const [confirmDel, setConfirmDel] = useState(false)
  const editorLocked = hasUnsupported(init.data.content as RichJson)
  // avtomatik saqlaş eng oxirgi qiymatlarni olişi uçun
  const dRef = useRef(d)
  useEffect(() => {
    dRef.current = d
  }, [d])

  const set = useCallback(<K extends keyof NewsInput>(k: K, v: NewsInput[K]) => {
    setD((o) => ({ ...o, [k]: v }))
    setDirty(true)
    setErrors((e) => (e[k] ? { ...e, [k]: '' } : e))
  }, [])

  const say = (t: string, bad?: boolean) => {
    setToast({ t, bad })
    window.setTimeout(() => setToast(null), 3500)
  }

  /** Eʼlon qilişdan oldin majburiy maydonlar (qoralama talab qilmaydi) */
  const check = (): boolean => {
    const d = dRef.current // save() eslab qolingan — qiymatlar ref'dan olinadi
    const e: Record<string, string> = {}
    if (!d.title.trim()) e.title = 'Sarlavhani yozing'
    if (!d.excerpt.trim()) e.excerpt = 'Qisqa matnni yozing'
    if (!d.image) e.image = 'Asosiy rasmni tanlang'
    if (!d.publishedAt) e.publishedAt = 'Sanani belgilang'
    if (d.source && !/^https:\/\/\S+$/.test(d.source.trim())) e.source = 'Havola https:// bilan boşlansin'
    if (!d.generateSlug && !/^[a-z0-9-]+$/.test(d.slug)) e.slug = 'Faqat lotin kiçik harflari, raqam va çiziqça'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const save = useCallback(
    async (mode: 'draft' | 'publish', auto = false) => {
      if (saving) return
      if (mode === 'publish' && !check()) {
        say('Majburiy maydonlarni töldiring', true)
        return
      }
      if (mode === 'draft' && !dRef.current.title.trim()) {
        if (!auto) {
          setErrors({ title: 'Qoralamani saqlaş uçun sarlavha kerak' })
          say('Avval sarlavhani yozing', true)
        }
        return
      }
      setSaving(auto ? 'auto' : mode)
      const r = await saveNews(id, dRef.current, mode)
      setSaving(null)
      if (!r.ok) {
        setErrors(r.fields ?? {})
        say(r.message, true)
        return
      }
      setDirty(false)
      setStatus(r.status)
      setSavedAt(r.updatedAt)
      if (!auto) say(mode === 'publish' ? (status === 'published' ? 'Özgarişlar saytga çiqdi' : 'Yangilik eʼlon qilindi') : 'Qoralama saqlandi')
      if (!id) {
        setId(r.id)
        router.replace(`/boshqaruv/yangiliklar/${r.id}`)
      } else router.refresh()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id, saving, status, router],
  )

  // qoralama 20 soniyada bir avtomatik saqlanadi (eʼlon qilingan yangilik — faqat qöl bilan, saytdagi nusxa tasodifan özgarmasin)
  useEffect(() => {
    if (!dirty || status === 'published') return
    const t = window.setTimeout(() => save('draft', true), 20000)
    return () => window.clearTimeout(t)
  }, [dirty, d, status, save])

  // ⌘S — saqlaş
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        save(status === 'published' ? 'publish' : 'draft')
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [save, status])

  // saqlanmagan özgariş bilan sahifani yopişda ogohlantiriş
  useEffect(() => {
    if (!dirty) return
    const h = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }
    window.addEventListener('beforeunload', h)
    return () => window.removeEventListener('beforeunload', h)
  }, [dirty])

  const onContent = useCallback((v: RichJson) => set('content', v as NewsInput['content']), [set])

  const addTag = () => {
    const t = tag.trim().replace(/,$/, '')
    if (t && !d.tags.includes(t) && d.tags.length < 12) set('tags', [...d.tags, t])
    setTag('')
  }

  const unpublish = async () => {
    if (!id) return
    const r = await unpublishNews([id])
    say(r.message, !r.ok)
    if (r.ok) {
      setStatus('draft')
      router.refresh()
    }
  }
  const remove = async () => {
    if (!id) return
    const r = await deleteNews([id])
    if (r.ok) {
      setDirty(false)
      router.replace('/boshqaruv/yangiliklar')
    } else say(r.message, true)
  }

  const err = (k: string) => (errors[k] ? <p className="f-err">{errors[k]}</p> : null)
  const siteHref = status === 'published' && d.slug ? `/uz/yangiliklar/${d.slug}` : null

  return (
    <>
      <div className="edit-head">
        <span className={status === 'published' ? 'pill t-green' : 'pill t-yellow'}>{status === 'published' ? 'Eʼlon qilingan' : 'Qoralama'}</span>
        <span className="save-state">
          {saving ? (
            'Saqlanmoqda…'
          ) : dirty ? (
            <>
              <i className="is-dirty" />
              Saqlanmagan özgarişlar bor
            </>
          ) : savedAt && mounted ? (
            <>
              <i />
              {savedLabel(savedAt)}
            </>
          ) : (
            'Yangi yangilik'
          )}
        </span>
        <div className="edit-head__acts">
          {siteHref && (
            <a className="btn btn-ghost" href={siteHref} target="_blank" rel="noopener noreferrer">
              <Icon name="eye" size={18} />
              Saytda köriş
            </a>
          )}
          {status === 'draft' && (
            <button type="button" className="btn btn-ghost" disabled={!!saving} onClick={() => save('draft')}>
              {saving === 'draft' ? 'Saqlanmoqda…' : 'Qoralamani saqlaş'}
            </button>
          )}
          <button type="button" className="btn btn-primary" disabled={!!saving} onClick={() => save('publish')}>
            {saving === 'publish' ? 'Saqlanmoqda…' : status === 'published' ? 'Özgarişlarni eʼlon qiliş' : 'Eʼlon qiliş'}
          </button>
        </div>
      </div>

      <div className="edit">
        <div className="stack">
          <section className="card edit-main">
            <label className="sr" htmlFor="f-title">
              Sarlavha
            </label>
            <textarea
              id="f-title"
              className={errors.title ? 'title-in has-err' : 'title-in'}
              rows={2}
              placeholder="Yangilik sarlavhasi"
              value={d.title}
              onChange={(e) => set('title', e.target.value.replace(/\n/g, ' '))}
            />
            {err('title')}
            <div className="hr" />
            <div className="f">
              <label className="lbl" htmlFor="f-excerpt">
                Qisqa matn <span className="req">*</span>
                <span className={d.excerpt.length > EXCERPT_MAX - 20 ? 'hint is-warn' : 'hint'}>
                  {d.excerpt.length} / {EXCERPT_MAX}
                </span>
              </label>
              <textarea
                id="f-excerpt"
                className={errors.excerpt ? 'inp has-err' : 'inp'}
                rows={3}
                maxLength={EXCERPT_MAX}
                value={d.excerpt}
                onChange={(e) => set('excerpt', e.target.value)}
              />
              {err('excerpt') ?? <p className="help">Boş sahifadagi va yangiliklar röyxatidagi kartada körinadi.</p>}
            </div>
            <div className="f">
              <span className="lbl">Töliq matn</span>
              {editorLocked ? (
                <div className="note">
                  <Icon name="alert" size={18} />
                  <p>
                    Bu matnda yangi muharrir hali qöllamaydigan blok bor. Matnni hozirça{' '}
                    {oldAdminHref ? (
                      <a href={oldAdminHref} target="_blank" rel="noopener noreferrer">
                        eski panelda
                      </a>
                    ) : (
                      'eski panelda'
                    )}{' '}
                    tahrirlang — qolgan maydonlarni şu yerda özgartiriş mumkin.
                  </p>
                </div>
              ) : (
                <Editor value={init.data.content as RichJson} onChange={onContent} />
              )}
            </div>
            <div className="f">
              <span className="lbl">
                Fotogalereya
                <span className="hint">Ixtiyoriy · {gallery.length} / 24</span>
              </span>
              <div className="gallery">
                {gallery.map((g, i) => (
                  <figure key={g.id}>
                    <img src={g.thumb} alt="" />
                    <div className="gallery__acts">
                      {i > 0 && (
                        <button
                          type="button"
                          title="Oldinga"
                          onClick={() => {
                            const n = [...gallery]
                            ;[n[i - 1], n[i]] = [n[i], n[i - 1]]
                            setGallery(n)
                            set('gallery', n.map((x) => x.id))
                          }}
                        >
                          <Icon name="chev" size={14} className="flip" />
                        </button>
                      )}
                      <button
                        type="button"
                        title="Olib taşlaş"
                        onClick={() => {
                          const n = gallery.filter((x) => x.id !== g.id)
                          setGallery(n)
                          set('gallery', n.map((x) => x.id))
                        }}
                      >
                        <Icon name="x" size={14} />
                      </button>
                    </div>
                  </figure>
                ))}
                {gallery.length < 24 && (
                  <button type="button" className="gallery__add" onClick={() => setPicker('gallery')}>
                    <Icon name="plus" />
                    Surat qöşiş
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>

        <aside className="aside">
          <section className="card">
            <h3>Eʼlon qiliş</h3>
            <div className="f">
              <label className="lbl" htmlFor="f-date">
                Sana va vaqt <span className="req">*</span>
              </label>
              <input id="f-date" className={errors.publishedAt ? 'inp has-err' : 'inp'} type="datetime-local" value={mounted ? toLocal(d.publishedAt) : ''} onChange={(e) => set('publishedAt', fromLocal(e.target.value))} />
              {err('publishedAt')}
            </div>
            <div className="f">
              <label className="lbl" htmlFor="f-author">
                Muallif
              </label>
              <select id="f-author" className="inp select" value={d.author ?? ''} onChange={(e) => set('author', e.target.value ? Number(e.target.value) : null)}>
                <option value="">Körsatilmagan</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                    {a.position ? ` — ${a.position}` : ''}
                  </option>
                ))}
              </select>
            </div>
            {id && (
              <div className="pub-meta">
                <span>
                  <Icon name="history" size={16} />
                  {versions} ta saqlangan versiya
                </span>
                {oldAdminHref && (
                  <a href={`${oldAdminHref}/versions`} target="_blank" rel="noopener noreferrer">
                    Tarix
                  </a>
                )}
              </div>
            )}
            {id && (status === 'published' || isAdmin) && (
              <div className="pub-danger">
                {status === 'published' && (
                  <button type="button" onClick={unpublish}>
                    Saytdan oliş
                  </button>
                )}
                {isAdmin &&
                  (confirmDel ? (
                    <span className="pub-confirm">
                      Öçirilsinmi?
                      <button type="button" className="is-red" onClick={remove}>
                        Ha, öçiriş
                      </button>
                      <button type="button" onClick={() => setConfirmDel(false)}>
                        Yöq
                      </button>
                    </span>
                  ) : (
                    <button type="button" className="is-red" onClick={() => setConfirmDel(true)}>
                      <Icon name="trash" size={16} />
                      Öçiriş
                    </button>
                  ))}
              </div>
            )}
          </section>

          <section className="card">
            <h3>
              Asosiy rasm <span className="req">*</span>
            </h3>
            {image ? (
              <div className="cover">
                <img src={image.url} alt="" />
                <div className="cover__acts">
                  <button type="button" onClick={() => setPicker('image')}>
                    Almaştiriş
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null)
                      set('image', null)
                    }}
                  >
                    Olib taşlaş
                  </button>
                </div>
              </div>
            ) : (
              <button type="button" className={errors.image ? 'cover-empty has-err' : 'cover-empty'} onClick={() => setPicker('image')}>
                <Icon name="image" size={28} />
                <b>Rasm tanlaş yoki yuklaş</b>
                <span>JPG, PNG yoki WebP, 10&nbsp;MB gaça</span>
              </button>
            )}
            {err('image')}
            <div className="f">
              <input className="inp" placeholder="Rasm izohi (ixtiyoriy)" value={d.imageCaption} onChange={(e) => set('imageCaption', e.target.value)} aria-label="Rasm izohi" />
            </div>
          </section>

          <section className="card">
            <h3>Turkum va turi</h3>
            <div className="chips" role="radiogroup" aria-label="Turkum">
              {categories.map((c) => (
                <button key={c.value} type="button" role="radio" aria-checked={d.category === c.value} className={d.category === c.value ? 'is-act' : undefined} onClick={() => set('category', c.value as NewsInput['category'])}>
                  {c.t}
                </button>
              ))}
            </div>
            <div className="f">
              <span className="lbl">Turi</span>
              <div className="chips" role="radiogroup" aria-label="Turi">
                {kinds.map((k) => (
                  <button key={k.value} type="button" role="radio" aria-checked={d.kind === k.value} className={d.kind === k.value ? 'is-act' : undefined} onClick={() => set('kind', k.value as NewsInput['kind'])}>
                    {k.t}
                  </button>
                ))}
              </div>
              <p className="help">
                {d.kind === 'elon'
                  ? 'Saytdagi “Eʼlonlar” sahifasida körinadi.'
                  : d.kind === 'tadbir'
                    ? 'Boş sahifadagi “Yaqin tadbirlar” blokida körinadi.'
                    : d.kind === 'tabrik'
                      ? '“Yangiliklar” sahifasidagi “Tabriklar” bölimida körinadi.'
                      : 'Oddiy yangilik sifatida körinadi.'}
              </p>
            </div>
            {d.kind === 'tadbir' && (
              <div className="f-row">
                <div className="f">
                  <label className="lbl" htmlFor="f-edate">
                    Tadbir sanasi
                  </label>
                  <input id="f-edate" className="inp" type="datetime-local" value={mounted ? toLocal(d.eventDate) : ''} onChange={(e) => set('eventDate', fromLocal(e.target.value) || null)} />
                </div>
                <div className="f">
                  <label className="lbl" htmlFor="f-eplace">
                    Tadbir joyi
                  </label>
                  <input id="f-eplace" className="inp" value={d.eventPlace} onChange={(e) => set('eventPlace', e.target.value)} />
                </div>
              </div>
            )}
            <div className="f">
              <label className="lbl" htmlFor="f-tag">
                Teglar<span className="hint">{d.tags.length} / 12</span>
              </label>
              <div className="tags">
                {d.tags.map((t) => (
                  <span key={t}>
                    {t}
                    <button type="button" aria-label={`${t} tegini olib taşlaş`} onClick={() => set('tags', d.tags.filter((x) => x !== t))}>
                      <Icon name="x" size={12} />
                    </button>
                  </span>
                ))}
                <input
                  id="f-tag"
                  value={tag}
                  placeholder={d.tags.length ? '' : 'Teg yozib, Enter bosing'}
                  onChange={(e) => (e.target.value.endsWith(',') ? (setTag(e.target.value), addTag()) : setTag(e.target.value))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTag()
                    }
                    if (e.key === 'Backspace' && !tag && d.tags.length) set('tags', d.tags.slice(0, -1))
                  }}
                  onBlur={addTag}
                />
              </div>
            </div>
          </section>

          <section className="card">
            <h3>Havola va manba</h3>
            <label className="lbl" htmlFor="f-slug">
              Sahifa manzili
            </label>
            <div className={errors.slug ? 'slug has-err' : 'slug'}>
              <span>/yangiliklar/</span>
              {d.generateSlug ? (
                <b>{d.slug || 'sarlavhadan yasaladi'}</b>
              ) : (
                <input id="f-slug" value={d.slug} onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} />
              )}
              <button
                type="button"
                title={d.generateSlug ? 'Qöl bilan özgartiriş' : 'Sarlavhadan avtomatik yasaş'}
                onClick={() => set('generateSlug', !d.generateSlug)}
              >
                <Icon name={d.generateSlug ? 'lock' : 'unlock'} size={16} />
              </button>
            </div>
            {err('slug') ?? <p className="help">{d.generateSlug ? 'Saqlanganda sarlavhadan avtomatik yasaladi.' : 'Faqat lotin kiçik harflari, raqam va çiziqça.'}</p>}
            <div className="f">
              <label className="lbl" htmlFor="f-src">
                Manba havolasi
              </label>
              <input id="f-src" className={errors.source ? 'inp has-err' : 'inp'} placeholder="https://t.me/…" value={d.source} onChange={(e) => set('source', e.target.value)} />
              {err('source')}
            </div>
          </section>
        </aside>
      </div>

      {picker && (
        <MediaPicker
          multiple={picker === 'gallery'}
          title={picker === 'image' ? 'Asosiy rasm' : 'Fotogalereyaga surat qöşiş'}
          onClose={() => setPicker(null)}
          onPick={(items) => {
            if (picker === 'image') {
              setImage(items[0])
              set('image', items[0].id)
            } else {
              const n = [...gallery, ...items.filter((x) => !gallery.some((g) => g.id === x.id))].slice(0, 24)
              setGallery(n)
              set('gallery', n.map((x) => x.id))
            }
            setPicker(null)
          }}
        />
      )}

      {toast && (
        <div className={toast.bad ? 'toast is-bad' : 'toast'} role="status">
          <Icon name={toast.bad ? 'alert' : 'check'} size={18} />
          {toast.t}
        </div>
      )}

      <p className="kbd-hint">
        <kbd>⌘S</kbd> — saqlaş
        {!id && (
          <>
            {' · '}
            <Link href="/boshqaruv/yangiliklar">Röyxatga qaytiş</Link>
          </>
        )}
      </p>
    </>
  )
}
