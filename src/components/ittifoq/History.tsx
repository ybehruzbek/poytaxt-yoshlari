import type { IttifoqData } from '@/lib/cms/sahifalar'

/** “Qisqa tarix”: çapda yirik yil (kun va oy — sariq yorliqda), öngda matn; “Bugun” töq panelda */
export function History({ D }: { D: IttifoqData }) {
  const { HISTORY } = D
  const last = HISTORY.length - 1
  return (
    <ol className="ihs-b">
      {HISTORY.map((m, i) => (
        <li key={i} className={i === last ? 'now' : undefined}>
          <div className="ihs-b-y">
            <b>{m.y}</b>
            {m.d && <span>{m.d}</span>}
          </div>
          <p>{m.t}</p>
        </li>
      ))}
    </ol>
  )
}
