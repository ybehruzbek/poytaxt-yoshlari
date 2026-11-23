'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

import { uploadMedia } from '@/lib/boshqaruv/media-actions'
import { siqish } from '@/lib/boshqaruv/siqish'

import { Icon } from '../Icon'

/** Kutubxonaga yuklaş: tugma yoki sudrab taşlaş, bir neçta fayl birdan */
export function LibUpload({ kind }: { kind: 'media' | 'files' }) {
  const router = useRouter()
  const ref = useRef<HTMLInputElement>(null)
  const [drag, setDrag] = useState(false)
  const [busy, setBusy] = useState(0)
  const [msg, setMsg] = useState<{ t: string; bad?: boolean } | null>(null)
  const isFile = kind === 'files'

  const upload = async (files: FileList | File[]) => {
    const list = Array.from(files).slice(0, 30)
    if (!list.length) return
    setMsg(null)
    setBusy(list.length)
    let ok = 0
    const bad: string[] = []
    for (const f of list) {
      const fd = new FormData()
      // rasm brauzerda siqiladi (2000 px, 2 MB gaça) — yuboriş va serverdagi işlov tezlaşadi
      fd.set('file', isFile ? f : await siqish(f))
      fd.set('col', kind)
      const r = await uploadMedia(fd)
      setBusy((b) => b - 1)
      if (r.ok) ok++
      else bad.push(`${f.name}: ${r.message}`)
    }
    setMsg(bad.length ? { t: `${ok} ta yuklandi. ${bad.join(' ')}`, bad: true } : { t: `${ok} ta fayl yuklandi` })
    router.refresh()
  }

  return (
    <div
      className={drag ? 'lib__drop is-drag' : 'lib__drop'}
      onDragOver={(e) => {
        e.preventDefault()
        setDrag(true)
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDrag(false)
        upload(e.dataTransfer.files)
      }}
    >
      <Icon name="upload" size={22} />
      <span>
        {busy > 0 ? (
          `Yuklanmoqda… (${busy} ta qoldi)`
        ) : (
          <>
            {isFile ? 'PDF, Word yoki Excel faylni' : 'Rasmlarni'} şu yerga sudrab taşlang yoki{' '}
            <button type="button" onClick={() => ref.current?.click()}>
              kompyuterdan tanlang
            </button>{' '}
            — har biri 10&nbsp;MB gaça
          </>
        )}
      </span>
      {msg && <em className={msg.bad ? 'is-bad' : undefined}>{msg.t}</em>}
      <input
        ref={ref}
        type="file"
        hidden
        multiple
        accept={isFile ? '.pdf,.doc,.docx,.xls,.xlsx' : 'image/*'}
        onChange={(e) => {
          if (e.target.files) upload(e.target.files)
          e.target.value = ''
        }}
      />
    </div>
  )
}
