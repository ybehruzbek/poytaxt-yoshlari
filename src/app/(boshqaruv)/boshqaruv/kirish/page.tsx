import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/boshqaruv/LoginForm'
import { getUser } from '@/lib/boshqaruv/auth'

export const metadata: Metadata = { title: 'Kiriş' }

export default async function KirishPage({ searchParams }: { searchParams: Promise<{ xato?: string }> }) {
  if (await getUser()) redirect('/boshqaruv')
  const { xato } = await searchParams
  return (
    <main className="login">
      <div className="login__card">
        <img className="login__logo" src="/img/logo-uz.webp" width={322} height={180} alt="Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi" />
        <h1>Boşqaruv paneliga kiriş</h1>
        <p className="login__sub">Faqat Kengaş xodimlari uçun</p>
        {xato === 'sessiya' && (
          <p className="err" role="alert">
            Çiqiş vaqtida sessiya serverda yopilmadi. Umumiy kompyuterdan foydalangan bölsangiz, qayta kirib, yana çiqiş tugmasini bosing yoki administratorga xabar bering.
          </p>
        )}
        <LoginForm />
        <p className="login__foot">Parolni unutgan bölsangiz, administratorga murojaat qiling.</p>
      </div>
    </main>
  )
}
