import { Top } from '@/components/boshqaruv/Shell'
import { MyAccount } from '@/components/boshqaruv/users/MyAccount'
import { requireUser } from '@/lib/boshqaruv/auth'
import { ROLE_LABEL } from '@/lib/boshqaruv/menu'

export const metadata = { title: 'Hisobim' }

export default async function Hisob() {
  const user = await requireUser()
  return (
    <>
      <Top title="Hisobim" crumbs={[{ t: 'Hisobim' }]} />
      <div className="content">
        <MyAccount name={user.name} email={user.email} role={ROLE_LABEL[user.role] ?? user.role} />
      </div>
    </>
  )
}
