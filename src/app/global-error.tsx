'use client'

/**
 * Sayt karkasining özida xato (masalan, baza bilan aloqa yöq): menyu ham çizilmaydi,
 * şuning uçun sahifa mustaqil — öz <html> va uslublari bilan.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="uz">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: 24,
          background: '#fff',
          color: '#532822',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        }}
      >
        <main style={{ maxWidth: 560, textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, margin: '0 0 12px' }}>Sahifani yuklab bo‘lmadi</h1>
          <p style={{ fontSize: 18, lineHeight: 1.5, margin: '0 0 28px' }}>
            Texnik nosozlik yuz berdi. Iltimos, birozdan so‘ng qayta urinib ko‘ring.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              font: 'inherit',
              fontWeight: 700,
              padding: '14px 28px',
              border: 0,
              borderRadius: 99,
              background: '#ffd25a',
              color: '#532822',
              cursor: 'pointer',
              marginRight: 12,
            }}
          >
            Qayta urinib ko‘rish
          </button>
          {/* oddiy havola ataylab: sayt karkasi buzilgan, sahifa töliq qayta yuklanişi kerak */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/uz" style={{ color: '#532822', fontWeight: 700 }}>
            Bosh sahifaga qaytish
          </a>
        </main>
      </body>
    </html>
  )
}
