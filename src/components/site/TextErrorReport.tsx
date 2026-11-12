'use client'

import { useEffect, useRef, useState } from 'react'

import { reportTextError } from '@/app/(frontend)/actions/text-error'

type Sel = { text: string; context: string }

/**
 * Matndagi xato haqida xabar beriş: tashrif buyuruvçi xatoni belgilab Ctrl/Command+Enter bosadi —
 * oyna oçiladi, belgilangan matn va (ixtiyoriy) izoh admin paneldagi “Matndagi xatolar”ga yuboriladi.
 */
export function TextErrorReport() {
  const [sel, setSel] = useState<Sel | null>(null)
  const [comment, setComment] = useState('')
  const [state, setState] = useState<{ ok: boolean; message: string } | null>(null)
  const [pending, setPending] = useState(false)
  const trap = useRef<HTMLInputElement>(null)
  const dlg = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || !(e.ctrlKey || e.metaKey)) return
      const s = window.getSelection()
      const text = s?.toString().trim() ?? ''
      if (!text) return
      // atrofidagi matn: belgilangan qismni töliq öz ičiga olgan eng yaqin element
      const anc = s?.rangeCount ? s.getRangeAt(0).commonAncestorContainer : null
      const base = anc instanceof Element ? anc : anc?.parentElement
      const node = base?.closest('p, li, h1, h2, h3, h4, td, dd, blockquote, article, section') ?? base
      e.preventDefault()
      setSel({
        text: text.slice(0, 300),
        context: (node?.textContent ?? '').trim().slice(0, 2000),
      })
      setComment('')
      setState(null)
      dlg.current?.showModal()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const send = async () => {
    if (!sel) return
    setPending(true)
    const res = await reportTextError({
      ...sel,
      comment,
      page: location.pathname,
      website: trap.current?.value,
    })
    setPending(false)
    setState(res)
  }

  return (
    <dialog ref={dlg} className="te" aria-labelledby="te-h" onClose={() => setSel(null)}>
      <form
        method="dialog"
        className="te-in"
        onSubmit={(e) => (e.preventDefault(), state?.ok ? dlg.current?.close() : send())}
      >
        <h2 id="te-h">Matndagi xato</h2>
        <input
          ref={trap}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="te-trap"
        />
        {state?.ok ? (
          <p className="te-ok" role="status">
            {state.message}
          </p>
        ) : (
          <>
            <p className="te-l">Siz belgilagan matn:</p>
            <blockquote className="te-q">{sel?.text}</blockquote>
            <label className="te-l" htmlFor="te-c">
              Töğri variant yoki izoh (ixtiyoriy)
            </label>
            <textarea
              id="te-c"
              rows={3}
              maxLength={1000}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {state && !state.ok && (
              <p className="te-err" role="alert">
                {state.message}
              </p>
            )}
          </>
        )}
        <div className="te-act">
          <button type="button" className="te-x" onClick={() => dlg.current?.close()}>
            {state?.ok ? 'Yopiş' : 'Bekor qiliş'}
          </button>
          {!state?.ok && (
            <button
              type="submit"
              className="btn btn-primary"
              disabled={pending}
              aria-busy={pending}
            >
              Yuboriş
            </button>
          )}
        </div>
      </form>
    </dialog>
  )
}
