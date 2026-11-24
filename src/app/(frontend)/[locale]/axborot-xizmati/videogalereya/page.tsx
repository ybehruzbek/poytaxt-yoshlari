
import { VideoPage } from '@/components/axborot/AxPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../axborot.css'
import { sahifaMeta } from '@/lib/seo'

/** YouTube kanali har 15 daqiqada qayta tekşiriladi (lib/youtube.ts → REVALIDATE) */
export const revalidate = 900

export const metadata = sahifaMeta('/axborot-xizmati/videogalereya')

/** “Videogalereya” sahifasi (mazmun: components/axborot) */
export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <VideoPage crumbs={<PageCrumbs locale={locale} path="/axborot-xizmati/videogalereya" />} />
}
