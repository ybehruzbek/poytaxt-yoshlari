'use client'

/* eslint-disable @next/next/no-img-element -- video muqovalari statik webp */
import { useState } from 'react'

import { InlinePlayer } from './AxClient'
import { dur, fullDate, thumb, VIDEO_TYPES, VIDEOS } from './data'

/** C varianti: çapda pleyer va tavsif, öngda navbatdagi videolar (tanlangani belgilanadi) */
export function VideoWatch() {
  const [id, setId] = useState(VIDEOS[0].id)
  const v = VIDEOS.find((x) => x.id === id)!
  return (
    <div className="ax-watch">
      <div className="ax-watch-main">
        <InlinePlayer id={v.id} title={v.title} />
        <span className="ax-chip">{VIDEO_TYPES[v.type]}</span>
        <h2>{v.title}</h2>
        <p className="ax-watch-meta">
          {fullDate(v.date)} · {dur(v.sec)}
        </p>
      </div>
      <ol className="ax-watch-list" aria-label="Videolar röyxati">
        {VIDEOS.map((x) => (
          <li key={x.id}>
            <button type="button" aria-current={x.id === id ? true : undefined} onClick={() => setId(x.id)}>
              <span className="ax-watch-th">
                <img src={thumb(x.id)} alt="" loading="lazy" />
                <span className="ax-dur">{dur(x.sec)}</span>
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
