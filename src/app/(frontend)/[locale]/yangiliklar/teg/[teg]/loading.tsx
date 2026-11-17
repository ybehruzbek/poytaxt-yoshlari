import { SkRegion, SkText, Skeleton } from '@/components/site/Skeleton'

/** Teg böyiça yangiliklar birinçi marta tayyorlanayotganda: sahifa boşi va kartalar örni */
export default function Loading() {
  return (
    <SkRegion className="yn">
      <header className="pg-head">
        <div className="wrap">
          <Skeleton shape="pill" w="300px" h="38px" style={{ marginBottom: 14 }} />
          <Skeleton w="min(420px, 80%)" h="clamp(32px, 4vw, 52px)" />
        </div>
      </header>
      <section className="sec">
        <div className="wrap sk-grid">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="sk-card-item">
              <Skeleton shape="thumb" ratio="16 / 10" w="100%" />
              <Skeleton shape="pill" w="120px" h="24px" />
              <SkText lines={2} size="20px" />
            </div>
          ))}
        </div>
      </section>
    </SkRegion>
  )
}
