import { notFound, redirect } from 'next/navigation'

import { NewsForm } from '@/components/boshqaruv/news/NewsForm'
import { Top } from '@/components/boshqaruv/Shell'
import { requireUser } from '@/lib/boshqaruv/auth'
import { CATEGORIES, formInit, getNews, KINDS, listAuthors, versionCount } from '@/lib/boshqaruv/news'

type P = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: P) {
  const id = Number((await params).id)
  const doc = Number.isInteger(id) ? await getNews(id) : null
  return { title: doc?.title ?? 'Yangilik' }
}

export default async function YangilikTahrir({ params }: P) {
  const user = await requireUser()
  if (user.role === 'operator') redirect('/boshqaruv')
  const id = Number((await params).id)
  if (!Number.isInteger(id) || id <= 0) notFound()
  const [doc, authors, versions] = await Promise.all([getNews(id), listAuthors(), versionCount(id)])
  if (!doc) notFound()
  const short = doc.title.length > 60 ? `${doc.title.slice(0, 60)}…` : doc.title
  return (
    <>
      <Top title={short} crumbs={[{ t: 'Yangiliklar', href: '/boshqaruv/yangiliklar' }, { t: 'Tahrirlaş' }]} />
      <div className="content">
        <NewsForm
          key={doc.id}
          init={formInit(doc)}
          categories={CATEGORIES}
          kinds={[...KINDS]}
          authors={authors}
          versions={versions}
          isAdmin={user.role === 'admin'}
          oldAdminHref={user.role === 'admin' ? `/admin/collections/news/${doc.id}` : null}
        />
      </div>
    </>
  )
}
