'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { deleteDoc, saveDoc, saveGlobalDoc } from '@/lib/boshqaruv/docs-actions'
import type { DocSchema, SField } from '@/lib/boshqaruv/schema-types'

import { Icon } from '../Icon'
import { MediaPicker } from '../news/MediaPicker'
import { Fields, type PickReq, type RelOpts } from './Fields'

type Any = Record<string, unknown>
type Props = {
  schema: DocSchema
  id: number | null
  init: Any
  status: 'draft' | 'published' | null
  updatedAt: string | null
  rel: RelOpts
  isAdmin: boolean
  oldHref: string | null
  siteHref: string | null
  backHref: string
}

const OY = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
const savedLabel = (iso: string) => {
  const d = new Date(iso)
  const t = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  return d.toDateString() === new Date().toDateString() ? `Saqlandi, ${t}` : `Oxirgi tahrir: ${d.getDate()}-${OY[d.getMonth()]}, ${t}`
}

/** Yuqori darajadagi maydonlar: asosiy ustun va öng ustun (Payload'dagi position: 'sidebar') */
const split = (fs: SField[]) => [fs.filter((f) => !f.side), fs.filter((f) => f.side)] as const

/** Barça bölimlar uçun umumiy şakl: maydonlar sxemadan çiziladi, saqlaş Payload orqali */
export function DocForm({ schema, id: id0, init, status: st0, updatedAt, rel, isAdmin, oldHref, siteHref, backHref }: Props) {
  const router = useRouter()
  const [id, setId] = useState(id0)
  const [v, setV] = useState<Any>(init)
  const [status, setStatus] = useState(st0)
  const [savedAt, setSavedAt] = useState(updatedAt)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState<null | 'draft' | 'publish'>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState<{ t: string; bad?: boolean } | null>(null)
  const [pick, setPick] = useState<PickReq | null>(null)
  const [confirmDel, setConfirmDel] = useState(false)
  const vRef = useRef(v)
  useEffect(() => {
    vRef.current = v
  }, [v])
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const [main, side] = split(schema.fields)

  const say = (t: string, bad?: boolean) => {
    setToast({ t, bad })
    window.setTimeout(() => setToast(null), 3500)
  }

  const onChange = useCallback((nv: Any) => {
    setV(nv)
    setDirty(true)
  }, [])

  const save = useCallback(
    async (mode: 'draft' | 'publish') => {
      if (saving) return
      setSaving(mode)
      const r = schema.kind === 'global' ? await saveGlobalDoc(schema.slug, vRef.current, mode) : await saveDoc(schema.slug, id, vRef.current, mode)
      setSaving(null)
      if (!r.ok) {
        setErrors(r.fields ?? {})
        say(r.message, true)
        return
      }
      setErrors({})
      setDirty(false)
      setStatus(r.status)
      setSavedAt(r.updatedAt)
      say(r.status === 'draft' ? 'Qoralama saqlandi' : 'Saqlandi va saytga çiqdi')
      if (schema.kind === 'collection' && !id && r.id) {
        setId(r.id)
        router.replace(`/boshqaruv/bolim/${schema.slug}/${r.id}`)
      } else router.refresh()
    },
    [saving, schema, id, router],
  )

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        save(schema.drafts && status !== 'published' ? 'draft' : 'publish')
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [save, schema.drafts, status])

  useEffect(() => {
    if (!dirty) return
    const h = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', h)
    return () => window.removeEventListener('beforeunload', h)
  }, [dirty])

  const remove = async () => {
    if (!id) return
    const r = await deleteDoc(schema.slug, id)
    if (r.ok) {
      setDirty(false)
      router.replace(backHref)
    } else say(r.message, true)
  }

  const ctx = { root: v, rel, errors, pick: setPick, oldHref }
  const errCount = Object.keys(errors).length

  return (
    <>
      <div className="edit-head">
        {schema.drafts && <span className={status === 'published' ? 'pill t-green' : 'pill t-yellow'}>{status === 'published' ? 'Eʼlon qilingan' : 'Qoralama'}</span>}
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
          ) : id || schema.kind === 'global' ? null : (
            `Yangi: ${schema.singular.toLocaleLowerCase('uz')}`
          )}
        </span>
        <div className="edit-head__acts">
          {siteHref && (
            <a className="btn btn-ghost" href={siteHref} target="_blank" rel="noopener noreferrer">
              <Icon name="eye" size={18} />
              Saytda köriş
            </a>
          )}
          {schema.drafts && status !== 'published' && (
            <button type="button" className="btn btn-ghost" disabled={!!saving} onClick={() => save('draft')}>
              {saving === 'draft' ? 'Saqlanmoqda…' : 'Qoralamani saqlaş'}
            </button>
          )}
          <button type="button" className="btn btn-primary" disabled={!!saving} onClick={() => save('publish')}>
            {saving === 'publish' ? 'Saqlanmoqda…' : schema.drafts ? (status === 'published' ? 'Özgarişlarni eʼlon qiliş' : 'Eʼlon qiliş') : 'Saqlaş'}
          </button>
        </div>
      </div>

      {errCount > 0 && (
        <p className="err form-err" role="alert">
          <Icon name="alert" size={18} />
          Saqlanmadi: {errCount} ta maydonda xato bor — ular qizil bilan belgilangan.
        </p>
      )}
      {schema.description && <p className="note doc-note">{schema.description}</p>}

      <div className={side.length || id ? 'edit' : 'edit edit--one'}>
        <section className="card edit-main">
          <Fields fields={main} value={v} onChange={onChange} path="" ctx={ctx} />
        </section>
        {(side.length > 0 || (id && isAdmin)) && (
          <aside className="aside">
            {side.length > 0 && (
              <section className="card">
                <Fields fields={side} value={v} onChange={onChange} path="" ctx={ctx} />
              </section>
            )}
            {id && (
              <section className="card">
                {oldHref && (
                  <a className="side-link" href={`${oldHref}${schema.drafts ? '/versions' : ''}`} target="_blank" rel="noopener noreferrer">
                    <Icon name="history" size={16} />
                    {schema.drafts ? 'Versiyalar tarixi' : 'Eski panelda oçiş'}
                  </a>
                )}
                {isAdmin &&
                  (confirmDel ? (
                    <span className="pub-confirm">
                      Öçirilsinmi? Qaytariş imkoni yöq.
                      <button type="button" className="btn btn-sm btn-red" onClick={remove}>
                        Ha, öçiriş
                      </button>
                      <button type="button" className="btn btn-sm btn-ghost" onClick={() => setConfirmDel(false)}>
                        Yöq
                      </button>
                    </span>
                  ) : (
                    <button type="button" className="ix__del" onClick={() => setConfirmDel(true)}>
                      <Icon name="trash" size={16} />
                      Öçiriş
                    </button>
                  ))}
              </section>
            )}
          </aside>
        )}
      </div>

      {pick && (
        <MediaPicker
          col={pick.col}
          multiple={pick.multiple}
          title={pick.title}
          onClose={() => setPick(null)}
          onPick={(items) => {
            pick.onPick(items)
            setPick(null)
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
      </p>
    </>
  )
}
