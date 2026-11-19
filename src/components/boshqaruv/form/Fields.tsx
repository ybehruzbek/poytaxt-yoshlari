'use client'

import { useState } from 'react'

import type { MediaItem } from '@/lib/boshqaruv/media-actions'
import type { SField } from '@/lib/boshqaruv/schema-types'

import { Icon } from '../Icon'
import { Editor, hasUnsupported, type RichJson } from '../news/Editor'

type Any = Record<string, unknown>
export type RelOpts = Record<string, { id: number; t: string }[]>
export type PickReq = { col: 'media' | 'files'; multiple: boolean; title: string; onPick: (items: MediaItem[]) => void }

export type Ctx = {
  root: Any
  rel: RelOpts
  errors: Record<string, string>
  pick: (r: PickReq) => void
  oldHref: string | null
}

/** Körsatiş şarti: serverda maʼlumotga aylantirilgan solişturuvlar (kod bajarilmaydi) */
function visible(f: SField, root: Any, sib: Any) {
  if (!f.when) return true
  return f.when.or.some((t) => {
    let x: unknown = t.from === 0 ? root : sib
    for (const k of t.path) x = x && typeof x === 'object' ? (x as Any)[k] : undefined
    if (t.len) x = Array.isArray(x) || typeof x === 'string' ? x.length : undefined
    if (t.eq !== undefined) return x === t.eq
    return t.neg ? !x : !!x
  })
}

const toLocal = (iso: unknown, time: boolean) => {
  if (typeof iso !== 'string' || !iso) return ''
  const d = new Date(iso)
  const p = (n: number) => String(n).padStart(2, '0')
  const day = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
  return time ? `${day}T${p(d.getHours())}:${p(d.getMinutes())}` : day
}
const fromLocal = (v: string, time: boolean) => (!v ? null : time ? new Date(v).toISOString() : new Date(`${v}T12:00:00`).toISOString())

const asItem = (m: unknown): MediaItem | null => {
  if (!m || typeof m !== 'object') return null
  const x = m as Any
  const sizes = x.sizes as Any | undefined
  return {
    id: x.id as number,
    url: String((sizes?.card as Any | undefined)?.url ?? x.url ?? ''),
    thumb: String((sizes?.thumb as Any | undefined)?.url ?? x.thumb ?? x.url ?? ''),
    alt: String(x.alt ?? x.title ?? ''),
    name: String(x.filename ?? ''),
  }
}

/** Ro'yxat qatorining sarlavhasi: birinçi matnli maydon qiymati */
function rowTitle(fields: SField[], row: Any): string {
  for (const f of fields) {
    if ((f.type === 'row' || f.type === 'collapsible') && f.fields) {
      const t = rowTitle(f.fields, row)
      if (t) return t
    }
    if ((f.type === 'text' || f.type === 'textarea') && typeof row[f.name] === 'string' && (row[f.name] as string).trim()) return (row[f.name] as string).trim()
    if (f.type === 'select' && row[f.name]) return f.options.find((o) => o.v === row[f.name])?.t ?? String(row[f.name])
  }
  return ''
}

function Label({ f, htmlFor, hint }: { f: SField; htmlFor?: string; hint?: React.ReactNode }) {
  if (!f.label) return null
  return (
    <label className="lbl" htmlFor={htmlFor}>
      {f.label}
      {f.required && <span className="req">*</span>}
      {hint && <span className="hint">{hint}</span>}
    </label>
  )
}

function Tags({ value, onChange, id, placeholder }: { value: string[]; onChange: (v: string[]) => void; id: string; placeholder?: string }) {
  const [t, setT] = useState('')
  const add = () => {
    const x = t.trim().replace(/,$/, '')
    if (x && !value.includes(x)) onChange([...value, x])
    setT('')
  }
  return (
    <div className="tags">
      {value.map((x) => (
        <span key={x}>
          {x}
          <button type="button" aria-label={`${x}: olib taşlaş`} onClick={() => onChange(value.filter((y) => y !== x))}>
            <Icon name="x" size={12} />
          </button>
        </span>
      ))}
      <input
        id={id}
        value={t}
        placeholder={value.length ? '' : (placeholder ?? 'Yozib, Enter bosing')}
        onChange={(e) => (e.target.value.endsWith(',') ? (setT(e.target.value), add()) : setT(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            add()
          }
          if (e.key === 'Backspace' && !t && value.length) onChange(value.slice(0, -1))
        }}
        onBlur={add}
      />
    </div>
  )
}

/** Bitta maydon (qiymat va özgartiriş funksiyasi tepadan keladi) */
function FieldInput({ f, value, set, path, ctx, sib }: { f: SField; value: unknown; set: (v: unknown) => void; path: string; ctx: Ctx; sib: Any }) {
  const id = `f-${path.replace(/\./g, '-')}`
  const err = ctx.errors[path]
  const cls = (c: string) => (err ? `${c} has-err` : c)
  const errEl = err ? <p className="f-err">{err}</p> : f.description ? <p className="help">{f.description}</p> : null

  switch (f.type) {
    case 'text':
    case 'email':
      if (f.hasMany)
        return (
          <div className="f">
            <Label f={f} htmlFor={id} />
            <Tags id={id} value={Array.isArray(value) ? (value as string[]) : []} onChange={set} placeholder={f.placeholder} />
            {errEl}
          </div>
        )
      return (
        <div className="f">
          <Label f={f} htmlFor={id} hint={f.maxLength ? `${String(value ?? '').length} / ${f.maxLength}` : undefined} />
          <input id={id} className={cls('inp')} type={f.type === 'email' ? 'email' : 'text'} value={String(value ?? '')} maxLength={f.maxLength} placeholder={f.placeholder} readOnly={f.readOnly} onChange={(e) => set(e.target.value)} />
          {errEl}
        </div>
      )
    case 'textarea':
      return (
        <div className="f">
          <Label f={f} htmlFor={id} hint={f.maxLength ? `${String(value ?? '').length} / ${f.maxLength}` : undefined} />
          <textarea id={id} className={cls('inp')} rows={f.rows ?? 3} value={String(value ?? '')} maxLength={f.maxLength} placeholder={f.placeholder} readOnly={f.readOnly} onChange={(e) => set(e.target.value)} />
          {errEl}
        </div>
      )
    case 'number':
      return (
        <div className="f">
          <Label f={f} htmlFor={id} />
          <input
            id={id}
            className={cls('inp')}
            type="number"
            inputMode="decimal"
            value={value == null ? '' : String(value)}
            min={f.min}
            max={f.max}
            step={f.step ?? 'any'}
            placeholder={f.placeholder}
            onChange={(e) => set(e.target.value === '' ? null : Number(e.target.value))}
          />
          {errEl}
        </div>
      )
    case 'checkbox':
      return (
        <div className="f f-check">
          <label className="switch-row" htmlFor={id}>
            <input id={id} type="checkbox" className="switch" checked={!!value} onChange={(e) => set(e.target.checked)} />
            <span>{f.label}</span>
          </label>
          {errEl}
        </div>
      )
    case 'date':
      return (
        <div className="f">
          <Label f={f} htmlFor={id} />
          <input id={id} className={cls('inp')} type={f.time ? 'datetime-local' : 'date'} value={toLocal(value, f.time)} onChange={(e) => set(fromLocal(e.target.value, f.time))} />
          {errEl}
        </div>
      )
    case 'select': {
      if (f.hasMany) {
        const arr = Array.isArray(value) ? (value as string[]) : []
        return (
          <div className="f">
            <Label f={f} />
            <div className="chips" role="group" aria-label={f.label}>
              {f.options.map((o) => (
                <button key={o.v} type="button" aria-pressed={arr.includes(o.v)} className={arr.includes(o.v) ? 'is-act' : undefined} onClick={() => set(arr.includes(o.v) ? arr.filter((x) => x !== o.v) : [...arr, o.v])}>
                  {o.t}
                </button>
              ))}
            </div>
            {errEl}
          </div>
        )
      }
      const short = f.options.length <= 5 && f.options.every((o) => o.t.length <= 28)
      return (
        <div className="f">
          <Label f={f} htmlFor={id} />
          {short ? (
            <div className="chips" role="radiogroup" aria-label={f.label}>
              {f.options.map((o) => (
                <button key={o.v} type="button" role="radio" aria-checked={value === o.v} className={value === o.v ? 'is-act' : undefined} onClick={() => set(!f.required && value === o.v ? null : o.v)}>
                  {o.t}
                </button>
              ))}
            </div>
          ) : (
            <select id={id} className={cls('inp select')} value={String(value ?? '')} onChange={(e) => set(e.target.value || null)}>
              <option value="">{f.required ? 'Tanlang…' : 'Körsatilmagan'}</option>
              {f.options.map((o) => (
                <option key={o.v} value={o.v}>
                  {o.t}
                </option>
              ))}
            </select>
          )}
          {errEl}
        </div>
      )
    }
    case 'richText':
      return (
        <div className="f">
          <Label f={f} />
          {hasUnsupported(value as RichJson) ? (
            <div className="note">
              <Icon name="alert" size={18} />
              <p>
                Bu matnda yangi muharrir hali qöllamaydigan blok bor —{' '}
                {ctx.oldHref ? (
                  <a href={ctx.oldHref} target="_blank" rel="noopener noreferrer">
                    eski panelda tahrirlang
                  </a>
                ) : (
                  'özgartiriş uçun administratorga murojaat qiling'
                )}
                .
              </p>
            </div>
          ) : (
            <Editor value={value as RichJson} onChange={(v) => set(v)} />
          )}
          {errEl}
        </div>
      )
    case 'slug': {
      const auto = sib.generateSlug !== false
      return (
        <div className="f">
          <Label f={f} htmlFor={id} />
          <div className={err ? 'slug has-err' : 'slug'}>
            {auto ? <b>{String(value ?? '') || 'sarlavhadan yasaladi'}</b> : <input id={id} value={String(value ?? '')} onChange={(e) => set(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} />}
            <button type="button" title={auto ? 'Qöl bilan özgartiriş' : 'Sarlavhadan avtomatik yasaş'} onClick={() => (sib.__setSib as (k: string, v: unknown) => void)('generateSlug', !auto)}>
              <Icon name={auto ? 'lock' : 'unlock'} size={16} />
            </button>
          </div>
          {err ? <p className="f-err">{err}</p> : <p className="help">{auto ? 'Saqlanganda sarlavhadan avtomatik yasaladi.' : 'Faqat lotin kiçik harflari, raqam va çiziqça.'}</p>}
        </div>
      )
    }
    case 'upload': {
      const isFile = f.relationTo === 'files'
      const col = isFile ? 'files' : 'media'
      if (f.hasMany) {
        const items = (Array.isArray(value) ? value : []).map(asItem).filter((x): x is MediaItem => !!x)
        const max = f.maxRows ?? 50
        return (
          <div className="f">
            <Label f={f} hint={`${items.length} / ${max}`} />
            <div className="gallery">
              {items.map((g, i) => (
                <figure key={g.id}>
                  {isFile ? (
                    <span className="gallery__doc">
                      <Icon name="file" />
                      {g.alt || g.name}
                    </span>
                  ) : (
                    <img src={g.thumb} alt="" />
                  )}
                  <div className="gallery__acts">
                    {i > 0 && (
                      <button
                        type="button"
                        title="Oldinga"
                        onClick={() => {
                          const n = [...items]
                          ;[n[i - 1], n[i]] = [n[i], n[i - 1]]
                          set(n)
                        }}
                      >
                        <Icon name="chev" size={14} className="flip" />
                      </button>
                    )}
                    <button type="button" title="Olib taşlaş" onClick={() => set(items.filter((x) => x.id !== g.id))}>
                      <Icon name="x" size={14} />
                    </button>
                  </div>
                </figure>
              ))}
              {items.length < max && (
                <button
                  type="button"
                  className="gallery__add"
                  onClick={() => ctx.pick({ col, multiple: true, title: f.label ?? '', onPick: (add) => set([...items, ...add.filter((x) => !items.some((y) => y.id === x.id))].slice(0, max)) })}
                >
                  <Icon name="plus" />
                  Qöşiş
                </button>
              )}
            </div>
            {errEl}
          </div>
        )
      }
      const it = asItem(value)
      return (
        <div className="f">
          <Label f={f} />
          {it ? (
            isFile ? (
              <div className="file-pick">
                <Icon name="file" size={22} />
                <a href={it.url} target="_blank" rel="noopener noreferrer">
                  <b>{it.alt || it.name}</b>
                  <small>{it.name}</small>
                </a>
                <button type="button" onClick={() => ctx.pick({ col, multiple: false, title: f.label ?? '', onPick: (x) => set(x[0]) })}>
                  Almaştiriş
                </button>
                <button type="button" onClick={() => set(null)} aria-label="Olib taşlaş">
                  <Icon name="x" size={16} />
                </button>
              </div>
            ) : (
              <div className="cover">
                <img src={it.url || it.thumb} alt="" />
                <div className="cover__acts">
                  <button type="button" onClick={() => ctx.pick({ col, multiple: false, title: f.label ?? '', onPick: (x) => set(x[0]) })}>
                    Almaştiriş
                  </button>
                  <button type="button" onClick={() => set(null)}>
                    Olib taşlaş
                  </button>
                </div>
              </div>
            )
          ) : (
            <button type="button" className={err ? 'cover-empty has-err' : isFile ? 'cover-empty is-file' : 'cover-empty'} onClick={() => ctx.pick({ col, multiple: false, title: f.label ?? '', onPick: (x) => set(x[0]) })}>
              <Icon name={isFile ? 'file' : 'image'} size={26} />
              <b>{isFile ? 'Fayl tanlaş yoki yuklaş' : 'Rasm tanlaş yoki yuklaş'}</b>
              <span>{isFile ? 'PDF, Word yoki Excel, 10 MB gaça' : 'JPG, PNG yoki WebP, 10 MB gaça'}</span>
            </button>
          )}
          {errEl}
        </div>
      )
    }
    case 'relationship': {
      const opts = ctx.rel[f.relationTo] ?? []
      const idOf = (x: unknown) => (x && typeof x === 'object' ? ((x as Any).id as number) : (x as number))
      if (f.hasMany) {
        const ids = (Array.isArray(value) ? value : []).map(idOf)
        return (
          <div className="f">
            <Label f={f} hint={`${ids.length} ta tanlangan`} />
            <div className="chips chips--scroll" role="group" aria-label={f.label}>
              {opts.map((o) => (
                <button key={o.id} type="button" aria-pressed={ids.includes(o.id)} className={ids.includes(o.id) ? 'is-act' : undefined} onClick={() => set(ids.includes(o.id) ? ids.filter((x) => x !== o.id) : [...ids, o.id])}>
                  {o.t}
                </button>
              ))}
            </div>
            {errEl}
          </div>
        )
      }
      return (
        <div className="f">
          <Label f={f} htmlFor={id} />
          <select id={id} className={cls('inp select')} value={value == null ? '' : String(idOf(value))} onChange={(e) => set(e.target.value ? Number(e.target.value) : null)}>
            <option value="">{f.required ? 'Tanlang…' : 'Körsatilmagan'}</option>
            {opts.map((o) => (
              <option key={o.id} value={o.id}>
                {o.t}
              </option>
            ))}
          </select>
          {errEl}
        </div>
      )
    }
    default:
      return null
  }
}

function ArrayField({ f, value, set, path, ctx }: { f: Extract<SField, { type: 'array' }>; value: unknown; set: (v: unknown) => void; path: string; ctx: Ctx }) {
  const rows = Array.isArray(value) ? (value as Any[]) : []
  const [closed, setClosed] = useState<Record<number, boolean>>(() => (rows.length > 4 ? Object.fromEntries(rows.map((_, i) => [i, true])) : {}))
  const max = f.maxRows ?? 200
  const move = (i: number, d: -1 | 1) => {
    const n = [...rows]
    ;[n[i], n[i + d]] = [n[i + d], n[i]]
    set(n)
  }
  const err = ctx.errors[path]
  return (
    <div className="f arr">
      <div className="arr__head">
        <span className="lbl">
          {f.label}
          {f.required && <span className="req">*</span>}
          <span className="hint">{rows.length} ta</span>
        </span>
        {rows.length > 1 && (
          <button type="button" className="arr__toggle" onClick={() => setClosed(Object.values(closed).some(Boolean) ? {} : Object.fromEntries(rows.map((_, i) => [i, true])))}>
            {Object.values(closed).some(Boolean) ? 'Barçasini oçiş' : 'Barçasini yiğiş'}
          </button>
        )}
      </div>
      {f.description && <p className="help">{f.description}</p>}
      {err && <p className="f-err">{err}</p>}
      <ol className="arr__list">
        {rows.map((row, i) => {
          const rp = `${path}.${i}`
          const hasErr = Object.keys(ctx.errors).some((k) => k.startsWith(`${rp}.`))
          const title = rowTitle(f.fields, row) || `${f.singular} ${i + 1}`
          return (
            <li key={(row.id as string) ?? i} className={hasErr ? 'arr__row has-err' : 'arr__row'}>
              <div className="arr__bar">
                <button type="button" className="arr__name" onClick={() => setClosed((c) => ({ ...c, [i]: !c[i] }))} aria-expanded={!closed[i]}>
                  <Icon name="chev" size={14} className={closed[i] ? undefined : 'rot90'} />
                  <span className="arr__n">{i + 1}</span>
                  <span className="arr__t">{title}</span>
                </button>
                <div className="arr__acts">
                  <button type="button" title="Yuqoriga" disabled={i === 0} onClick={() => move(i, -1)}>
                    <Icon name="arrowup" size={15} />
                  </button>
                  <button type="button" title="Pastga" disabled={i === rows.length - 1} onClick={() => move(i, 1)}>
                    <Icon name="arrowdown" size={15} />
                  </button>
                  <button type="button" title="Nusxa" disabled={rows.length >= max} onClick={() => set([...rows.slice(0, i + 1), { ...structuredClone(row), id: undefined }, ...rows.slice(i + 1)])}>
                    <Icon name="copy" size={15} />
                  </button>
                  <button type="button" title="Olib taşlaş" className="is-red" onClick={() => set(rows.filter((_, j) => j !== i))}>
                    <Icon name="trash" size={15} />
                  </button>
                </div>
              </div>
              {!closed[i] && (
                <div className="arr__body">
                  <Fields fields={f.fields} value={row} onChange={(nv) => set(rows.map((r, j) => (j === i ? nv : r)))} path={rp} ctx={ctx} />
                </div>
              )}
            </li>
          )
        })}
      </ol>
      {rows.length < max && (
        <button type="button" className="arr__add" onClick={() => set([...rows, {}])}>
          <Icon name="plus" size={16} />
          {f.singular} qöşiş
        </button>
      )}
    </div>
  )
}

function TabsField({ f, value, onChange, path, ctx }: { f: Extract<SField, { type: 'tabs' }>; value: Any; onChange: (v: Any) => void; path: string; ctx: Ctx }) {
  const [i, setI] = useState(0)
  const errIn = (t: (typeof f.tabs)[number]) =>
    Object.keys(ctx.errors).some((k) => (t.name ? k.startsWith(`${path ? `${path}.` : ''}${t.name}.`) : false))
  const t = f.tabs[i] ?? f.tabs[0]
  return (
    <div className="ftabs">
      <div className="ftabs__bar" role="tablist">
        {f.tabs.map((x, k) => (
          <button key={k} type="button" role="tab" aria-selected={k === i} className={[k === i ? 'is-act' : '', errIn(x) ? 'has-err' : ''].join(' ').trim() || undefined} onClick={() => setI(k)}>
            {x.label}
          </button>
        ))}
      </div>
      {t.description && <p className="help">{t.description}</p>}
      <div className="ftabs__body" role="tabpanel">
        {t.name ? (
          <Fields fields={t.fields} value={(value[t.name] as Any) ?? {}} onChange={(nv) => onChange({ ...value, [t.name!]: nv })} path={path ? `${path}.${t.name}` : t.name} ctx={ctx} />
        ) : (
          <Fields fields={t.fields} value={value} onChange={onChange} path={path} ctx={ctx} />
        )}
      </div>
    </div>
  )
}

/** Maydonlar röyxati (bir daraja): qiymat obyekti va uni almaştiruvçi funksiya */
export function Fields({ fields, value, onChange, path, ctx }: { fields: SField[]; value: Any; onChange: (v: Any) => void; path: string; ctx: Ctx }) {
  const p = (n: string) => (path ? `${path}.${n}` : n)
  const setKey = (k: string, v: unknown) => onChange({ ...value, [k]: v })
  const sib = { ...value, __setSib: setKey }
  return (
    <>
      {fields.map((f, k) => {
        if (!visible(f, ctx.root, value)) return null
        switch (f.type) {
          case 'row':
            return (
              <div key={k} className="f-row-n">
                {f.fields.map((c, j) =>
                  visible(c, ctx.root, value) ? (
                    <div key={j} className="f-cell" style={{ flexBasis: c.width ?? '100%' }}>
                      <Fields fields={[c]} value={value} onChange={onChange} path={path} ctx={ctx} />
                    </div>
                  ) : null,
                )}
              </div>
            )
          case 'collapsible':
            return (
              <details key={k} className="fcol" open={f.open}>
                <summary>
                  <Icon name="chev" size={14} />
                  {f.label}
                </summary>
                <div className="fcol__body">
                  <Fields fields={f.fields} value={value} onChange={onChange} path={path} ctx={ctx} />
                </div>
              </details>
            )
          case 'tabs':
            return <TabsField key={k} f={f} value={value} onChange={onChange} path={path} ctx={ctx} />
          case 'group':
            return (
              <fieldset key={k} className="fgrp">
                {f.label && <legend>{f.label}</legend>}
                {f.description && <p className="help">{f.description}</p>}
                <Fields fields={f.fields} value={(value[f.name] as Any) ?? {}} onChange={(nv) => setKey(f.name, nv)} path={p(f.name)} ctx={ctx} />
              </fieldset>
            )
          case 'array':
            return <ArrayField key={k} f={f} value={value[f.name]} set={(v) => setKey(f.name, v)} path={p(f.name)} ctx={ctx} />
          default:
            return <FieldInput key={k} f={f} value={value[f.name!]} set={(v) => setKey(f.name!, v)} path={p(f.name!)} ctx={ctx} sib={sib} />
        }
      })}
    </>
  )
}
