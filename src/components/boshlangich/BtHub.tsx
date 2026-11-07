/* eslint-disable @next/next/no-img-element -- yetakçilar suratlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { OTMS } from './data'

const LED = OTMS.filter((o) => o.leader)
const FACES = LED.slice(0, 6)

/**
 * “Boşlanğiç taşkilotlar” umumiy sahifasi: ikki yönaliş — oliy taʼlim taşkilotlari
 * hamda harbiy qismlar va muassasalar. Har karta öz sahifasiga olib boradi.
 */
export function BtHub({ L, crumbs }: { L: (h: string) => string; crumbs: ReactNode }) {
  return (
    <div className="bt">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Boşlanğiç taşkilotlar</h1>
          <p className="pg-lead">
            Özbekiston yoşlar ittifoqining Toşkent şahridagi boşlanğiç taşkilotlari — oliy taʼlim
            taşkilotlarida hamda harbiy qismlar va muassasalarda.
          </p>
        </div>
      </header>
      <section className="sec bt-sec">
        <div className="wrap bt-hub">
          <Link
            href={L('/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim')}
            className="bt-hub-card"
          >
            <span className="bt-hub-n">01</span>
            <h2>Oliy taʼlim taşkilotlaridagi boşlanğiç taşkilotlar</h2>
            <p>
              Davlat, nodavlat va xorijiy oliy taʼlim taşkilotlarining filiallaridagi boşlanğiç
              taşkilotlar va ularning yoşlar yetakçilari.
            </p>
            <dl className="bt-stats">
              <div>
                <dt>Oliy taʼlim taşkiloti</dt>
                <dd>{OTMS.length}</dd>
              </div>
              <div>
                <dt>Yoşlar yetakçisi</dt>
                <dd>{LED.length}</dd>
              </div>
              <div>
                <dt>Vakant</dt>
                <dd>{OTMS.length - LED.length}</dd>
              </div>
            </dl>
            <span className="bt-hub-foot">
              <span className="bt-faces" aria-hidden="true">
                {FACES.map((o) => (
                  <img key={o.otm} src={o.leader!.img} alt="" />
                ))}
              </span>
              <span className="bt-hub-go">
                Yetakçilarni köriş <span aria-hidden="true">→</span>
              </span>
            </span>
          </Link>
          <Link href={L('/biz-haqimizda/boshlangich-tashkilotlar/harbiy')} className="bt-hub-card">
            <span className="bt-hub-n">02</span>
            <h2>Harbiy qismlar va muassasalardagi boşlanğiç taşkilotlar</h2>
            <p>
              Harbiy qismlar va muassasalarda faoliyat yuritayotgan boşlanğiç taşkilotlar va
              ularning yoşlar yetakçilari.
            </p>
            <dl className="bt-stats">
              <div>
                <dt>Röyxat tayyorlanmoqda</dt>
                <dd>—</dd>
              </div>
            </dl>
            <span className="bt-hub-foot">
              <span />
              <span className="bt-hub-go">
                Sahifaga ötiş <span aria-hidden="true">→</span>
              </span>
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}
