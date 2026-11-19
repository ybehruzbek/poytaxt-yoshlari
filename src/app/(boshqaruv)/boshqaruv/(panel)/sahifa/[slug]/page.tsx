import { notFound, redirect } from 'next/navigation'

import { DocForm } from '@/components/boshqaruv/form/DocForm'
import { Top } from '@/components/boshqaruv/Shell'
import { requireUser } from '@/lib/boshqaruv/auth'
import { getGlobalDoc, relationOptions } from '@/lib/boshqaruv/docs'
import { groupOf } from '@/lib/boshqaruv/menu'
import { globalSchema, previewFor } from '@/lib/boshqaruv/schema'

type P = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: P) {
  return { title: (await globalSchema((await params).slug))?.singular ?? 'Sahifa' }
}

/** Yagona sahifa matnlari (Payload global): boş sahifa, Ittifoq haqida, aloqa maʼlumotlari va boşqalar */
export default async function Sahifa({ params }: P) {
  const user = await requireUser()
  if (user.role === 'operator') redirect('/boshqaruv')
  const { slug } = await params
  const schema = await globalSchema(slug)
  if (!schema) notFound()
  const [doc, rel] = await Promise.all([getGlobalDoc(schema), relationOptions(schema)])
  const site = await previewFor('global', slug, doc)
  const grp = groupOf(`/boshqaruv/sahifa/${slug}`)
  return (
    <>
      <Top title={schema.singular} crumbs={[...(grp ? [{ t: grp }] : []), { t: schema.singular }]} />
      <div className="content">
        <DocForm
          schema={schema}
          id={null}
          init={doc}
          status={schema.drafts ? ((doc._status as 'draft' | 'published' | undefined) ?? 'draft') : null}
          updatedAt={(doc.updatedAt as string | undefined) ?? null}
          rel={rel}
          isAdmin={user.role === 'admin'}
          oldHref={`/admin/globals/${slug}`}
          siteHref={site}
          backHref="/boshqaruv"
        />
      </div>
    </>
  )
}
