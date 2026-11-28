'use client'

/* eslint-disable @next/next/no-img-element -- video muqovalari statik webp */
import { useState } from 'react'

import { InlinePlayer } from './AxClient'
import { dur, fullDate, thumb, type Video, VIDEO_TYPES } from './data'

/** C varianti: çapda pleyer va tavsif, öngda navbatdagi videolar (tanlangani belgilanadi) */
export function VideoWatch({ videos }: { videos: Video[] }) {
  const [id, setId] = useState(videos[0]?.id)
  const v = videos.find((x) => x.id === id) ?? videos[0]
  if (!v) return null
  return (
    <div className="ax-watch">
      <div className="ax-watch-main">
        <InlinePlayer id={v.id} title={v.title} />
        {v.type && <span className="ax-chip">{VIDEO_TYPES[v.type]}</span>}
        <h2>{v.title}</h2>
        <p className="ax-watch-meta">
          {fullDate(v.date)}
          {v.sec ? ` · ${dur(v.sec)}` : ''}
        </p>
      </div>
      <ol className="ax-watch-list" aria-label="Videolar ro‘yxati">
        {videos.map((x) => (
          <li key={x.id}>
            <button type="button" aria-current={x.id === id ? true : undefined} onClick={() => setId(x.id)}>
              <span className="ax-watch-th">
                <img src={thumb(x.id)} alt="" loading="lazy" />
                {x.sec ? <span className="ax-dur">{dur(x.sec)}</span> : null}
              </span>
              <span>
                <b>{x.title}</b>
                <small>{fullDate(x.date)}</small>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
