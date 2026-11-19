import { redirect } from 'next/navigation'

import { Top } from '@/components/boshqaruv/Shell'
import { UsersPanel } from '@/components/boshqaruv/users/UsersPanel'
import { requireUser } from '@/lib/boshqaruv/auth'
import { listUsers } from '@/lib/boshqaruv/users'

export const metadata = { title: 'Foydalanuvçilar' }

/** Xodimlar hisoblari — faqat administrator uçun */
export default async function Foydalanuvchilar() {
  const user = await requireUser()
  if (user.role !== 'admin') redirect('/boshqaruv')
  const users = await listUsers()
  return (
    <>
      <Top title="Foydalanuvçilar" sub="Panelga kira oladigan xodimlar va ularning rollari" crumbs={[{ t: 'Tizim' }, { t: 'Foydalanuvçilar' }]} />
      <div className="content">
        <UsersPanel users={users} meId={user.id} />
      </div>
    </>
  )
}
