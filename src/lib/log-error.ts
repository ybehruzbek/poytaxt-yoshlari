/**
 * Server xatosini jurnalga şaxsiy maʼlumotsiz yozadi. Drizzle xatosi xabarida söröv parametrlari
 * (fuqaroning ismi, telefoni, matni) böladi — ular jurnalga tuşmasligi kerak.
 */
export function logError(scope: string, err: unknown): void {
  const e = err as { name?: string; message?: string; cause?: { code?: string; message?: string } }
  const msg = String(e?.message ?? err).split(/\n?\s*params:/)[0].slice(0, 300)
  const code = e?.cause?.code ? ` [${e.cause.code}]` : ''
  console.error(`[${scope}] ${e?.name ?? 'Error'}${code}: ${msg}`)
}
