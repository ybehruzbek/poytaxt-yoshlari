import type { IttifoqData } from '@/lib/cms/sahifalar'

const pad = (i: number) => String(i + 1).padStart(2, '0')

/** “Ustuvor yönalişlar”: ikki ustunli akkordeon — rasmiy nom bosilganda band matni oçiladi */
export function Priorities({ D }: { D: IttifoqData }) {
  const { PRIORITIES } = D
  const LIST = PRIORITIES.items.map((t, i) => ({ n: pad(i), title: PRIORITIES.titles[i], t }))
  return (
    <div className="ipr-b">
      {[LIST.slice(0, 6), LIST.slice(6)].map((col, c) => (
        <div key={c}>
          {col.map((x, i) => (
            <details key={x.n} open={c === 0 && i === 0}>
              <summary>
                <span>{x.n}</span>
                <b>{x.title}</b>
                <i aria-hidden="true" />
              </summary>
              <p>{x.t}</p>
            </details>
          ))}
        </div>
      ))}
    </div>
  )
}
