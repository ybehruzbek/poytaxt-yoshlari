import Script from 'next/script'

import { CF_BEACON_TOKEN } from '@/config/statistika'

/**
 * Cloudflare Web Analytics hisoblagiçi: cookie va brauzer xotirasini işlatmaydi, IP saqlanmaydi.
 * Faqat production'da va token berilganda qöşiladi (lokal sinovlar statistikaga tuşmasin).
 * Sahifadan sahifaga ötiş (Next.js navigatsiyasi) ham alohida köriş sifatida sanaladi.
 */
export function CfBeacon() {
  if (!CF_BEACON_TOKEN || process.env.NODE_ENV !== 'production') return null
  return (
    <Script
      id="cf-beacon"
      strategy="afterInteractive"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN, spa: true })}
    />
  )
}
