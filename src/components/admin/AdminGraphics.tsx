/* eslint-disable @next/next/no-img-element -- admin panel grafikasi: statik logotip fayllari */

/** Kiriş sahifasidagi logotip — saytdagi bilan bir xil */
export function AdminLogo() {
  return (
    <img
      src="/img/logo-uz.png"
      alt="O‘zbekiston yoshlar ittifoqi Toshkent shahar hududiy Kengashi"
      style={{ display: 'block', width: 220, height: 'auto' }}
    />
  )
}

/** Yuqori paneldagi kiçik belgi — ittifoq emblemasi */
export function AdminIcon() {
  return <img src="/icon-192.png" alt="" style={{ display: 'block', width: 30, height: 30 }} />
}
