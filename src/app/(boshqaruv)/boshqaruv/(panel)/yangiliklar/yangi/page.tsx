import { redirect } from 'next/navigation'

import { NewsForm } from '@/components/boshqaruv/news/NewsForm'
import { Top } from '@/components/boshqaruv/Shell'
import { requireUser } from '@/lib/boshqaruv/auth'
import { CATEGORIES, formInit, KINDS, listAuthors } from '@/lib/boshqaruv/news'

export const metadata = { title: 'Yangi yangilik' }

export default async function YangiYangilik() {
  const user = await requireUser()
  if (user.role === 'operator') redirect('/boshqaruv')
  const authors = await listAuthors()
  return (
    <>
      <Top title="Yangi yangilik" crumbs={[{ t: 'Yangiliklar', href: '/boshqaruv/yangiliklar' }, { t: 'Yangi' }]} />
      <div className="content">
        <NewsForm init={formInit(null)} categories={CATEGORIES} kinds={[...KINDS]} authors={authors} versions={0} isAdmin={user.role === 'admin'} oldAdminHref={null} />
      </div>
    </>
  )
}
