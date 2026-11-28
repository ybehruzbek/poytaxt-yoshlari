import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/boshqaruv/LoginForm'
import { getUser } from '@/lib/boshqaruv/auth'

export const metadata: Metadata = { title: 'Kirish' }

export default async function KirishPage({ searchParams }: { searchParams: Promise<{ xato?: string }> }) {
  if (await getUser()) redirect('/boshqaruv')
  const { xato } = await searchParams
  return (
    <main className="login">
      <div className="login__card">
        <img className="login__logo" src="/img/logo-uz.webp" width={322} height={180} alt="O‘zbekiston yoshlar ittifoqi Toshkent shahar hududiy Kengashi" />
        <h1>Boshqaruv paneliga kirish</h1>
        <p className="login__sub">Faqat Kengash xodimlari uchun</p>
        {xato === 'sessiya' && (
          <p className="err" role="alert">
            Chiqish vaqtida sessiya serverda yopilmadi. Umumiy kompyuterdan foydalangan bo‘lsangiz, qayta kirib, yana chiqish tugmasini bosing yoki administratorga xabar bering.
          </p>
        )}
        <LoginForm />
        <p className="login__foot">Parolni unutgan bo‘lsangiz, administratorga murojaat qiling.</p>
      </div>
    </main>
  )
}
