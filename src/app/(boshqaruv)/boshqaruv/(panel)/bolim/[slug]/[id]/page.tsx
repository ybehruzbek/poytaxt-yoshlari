import { notFound, redirect } from 'next/navigation'

import { DocForm } from '@/components/boshqaruv/form/DocForm'
import { Top } from '@/components/boshqaruv/Shell'
import { requireUser } from '@/lib/boshqaruv/auth'
import { getDoc, relationOptions } from '@/lib/boshqaruv/docs'
import { groupOf } from '@/lib/boshqaruv/menu'
import { collectionSchema, previewFor } from '@/lib/boshqaruv/schema'

type P = { params: Promise<{ slug: string; id: string }> }

export async function generateMetadata({ params }: P) {
  const { slug, id } = await params
  const s = await collectionSchema(slug)
  return { title: id === 'yangi' ? `Yangi: ${s?.singular ?? ''}` : (s?.singular ?? 'Tahrirlaş') }
}

export default async function BolimTahrir({ params }: P) {
  const user = await requireUser()
  if (user.role === 'operator') redirect('/boshqaruv')
  const { slug, id: raw } = await params
  const schema = await collectionSchema(slug)
  if (!schema) notFound()
  const isNew = raw === 'yangi'
  const id = Number(raw)
  if (!isNew && (!Number.isInteger(id) || id <= 0)) notFound()
  const [doc, rel] = await Promise.all([isNew ? null : getDoc(schema, id), relationOptions(schema)])
  if (!isNew && !doc) notFound()
  const title = doc ? String(doc[schema.useAsTitle] ?? '').trim() : ''
  const base = `/boshqaruv/bolim/${slug}`
  const grp = groupOf(base)
  const site = doc && (!schema.drafts || doc._status === 'published') ? await previewFor('collection', slug, doc) : null
  const short = title.length > 60 ? `${title.slice(0, 60)}…` : title

  return (
    <>
      <Top title={isNew ? `Yangi: ${schema.singular.toLocaleLowerCase('uz')}` : short || schema.singular} crumbs={[...(grp ? [{ t: grp }] : []), { t: schema.plural, href: base }, { t: isNew ? 'Yangi' : 'Tahrirlaş' }]} />
      <div className="content">
        <DocForm
          key={raw}
          schema={schema}
          id={isNew ? null : id}
          init={doc ?? {}}
          status={schema.drafts ? ((doc?._status as 'draft' | 'published' | undefined) ?? 'draft') : null}
          updatedAt={(doc?.updatedAt as string | undefined) ?? null}
          rel={rel}
          isAdmin={user.role === 'admin'}
          oldHref={isNew || user.role !== 'admin' ? null : `/admin/collections/${slug}/${id}`}
          siteHref={site}
          backHref={base}
        />
      </div>
    </>
  )
}
