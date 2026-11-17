import { SkRegion, SkText, Skeleton } from '@/components/site/Skeleton'

/**
 * Yangilik birinçi marta tayyorlanayotganda (keşda hali yöq) körinadigan skelet: maqola sahifasi tuzilişini
 * aynan takrorlaydi (yöl, sarlavha, rasm, matn, yon ustun) — mazmun kelganda sahifa sakramaydi.
 */
export default function Loading() {
  return (
    <SkRegion className="ar ar-b">
      <section className="sec ar-sec ar-b-sec">
        <div className="wrap">
          <Skeleton shape="pill" w="280px" h="38px" style={{ marginBottom: 24 }} />
          <div className="ar-b-grid">
            <div className="ar-b-main">
              <Skeleton shape="pill" w="180px" h="28px" style={{ marginBottom: 20 }} />
              <SkText lines={2} size="clamp(28px, 3.4vw, 44px)" />
              <div style={{ margin: '24px 0 32px' }}>
                <SkText lines={2} size="20px" />
              </div>
              <Skeleton shape="card" ratio="16 / 9" w="100%" />
              <div style={{ marginTop: 40 }}>
                <SkText lines={5} />
              </div>
            </div>
            <div className="ar-b-side sk-side">
              <Skeleton w="60%" h="24px" style={{ marginBottom: 20 }} />
              <SkText lines={6} />
            </div>
          </div>
        </div>
      </section>
    </SkRegion>
  )
}
