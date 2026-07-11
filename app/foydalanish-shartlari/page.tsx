import Link from "next/link";
import LegalPage from "@/components/ui/LegalPage/LegalPage";
import styles from "@/components/ui/LegalPage/LegalPage.module.css";

export const metadata = {
  title: "Foydalanish shartlari | O'zbekiston Yoshlar Ittifoqi",
  description: "Platformadan foydalanish qoidalari.",
};

export default function FoydalanishShartlariPage() {
  return (
    <LegalPage
      label="Huquqiy"
      title="Foydalanish shartlari"
      breadcrumbLabel="Foydalanish shartlari"
      updatedAt="2026-07-11"
    >
      <h2>1. Umumiy qoidalar</h2>
      <p>
        Ushbu shartlar poytaxtyoshlari.uz veb-saytidan (keyingi o&apos;rinlarda —
        &laquo;Platforma&raquo;) foydalanish tartibini belgilaydi. Platforma egasi —
        O&apos;zbekiston Yoshlar Ittifoqi Toshkent shahar hududiy Kengashi (keyingi
        o&apos;rinlarda — &laquo;Ittifoq&raquo;). Platformaga kirish va undan foydalanish
        orqali siz ushbu shartlarga to&apos;liq rozilik bildirasiz.
      </p>

      <h2>2. Platformaning maqsadi</h2>
      <p>
        Platforma Toshkent shahridagi yoshlarga Ittifoq faoliyati, tadbirlari,
        loyihalari va imkoniyatlari haqida ma&apos;lumot berish, murojaatlarni qabul
        qilish va tadbirlarga ro&apos;yxatdan o&apos;tishni ta&apos;minlash maqsadida
        yaratilgan. Platformadagi barcha xizmatlardan foydalanish bepul.
      </p>

      <h2>3. Foydalanuvchi majburiyatlari</h2>
      <p>Platformadan foydalanganda siz quyidagilarga rozilik bildirasiz:</p>
      <ul>
        <li>
          Murojaat va ro&apos;yxatdan o&apos;tish formalarida faqat haqiqiy va
          to&apos;g&apos;ri ma&apos;lumot kiritish;
        </li>
        <li>
          Platformadan qonunga zid, boshqalarning huquqlarini buzadigan yoki
          zararli (spam, virusli fayl, avtomatlashtirilgan so&apos;rov oqimi kabi)
          maqsadlarda foydalanmaslik;
        </li>
        <li>
          Platforma ishlashiga to&apos;sqinlik qiladigan yoki uning xavfsizligini
          buzishga qaratilgan harakatlardan tiyilish.
        </li>
      </ul>
      <p>
        Ushbu qoidalar buzilgan taqdirda Ittifoq tegishli murojaat yoki
        ro&apos;yxatga olish arizasini rad etish huquqini o&apos;zida saqlab qoladi.
      </p>

      <h2>4. Intellektual mulk</h2>
      <p>
        Platformadagi matn, rasm, logotip va boshqa kontentga bo&apos;lgan huquqlar
        Ittifoqqa yoki tegishli mualliflarga tegishli. Kontentni Ittifoqning yozma
        roziligisiz tijorat maqsadida ko&apos;paytirish yoki tarqatish taqiqlanadi.
        Yangiliklar va e&apos;lonlarni manba ko&apos;rsatilgan holda ijtimoiy
        tarmoqlarda ulashish mumkin.
      </p>

      <h2>5. Tashqi havolalar</h2>
      <p>
        Platformada boshqa veb-saytlar va ijtimoiy tarmoq sahifalariga havolalar
        bo&apos;lishi mumkin. Ittifoq bunday tashqi resurslarning kontenti yoki
        maxfiylik siyosati uchun javobgar emas.
      </p>

      <h2>6. Xizmatning uzluksizligi</h2>
      <p>
        Ittifoq Platformaning barqaror ishlashi uchun harakat qiladi, biroq texnik
        ishlar, yangilanishlar yoki kutilmagan uzilishlar tufayli xizmat vaqtincha
        mavjud bo&apos;lmasligi mumkin. Bunday hollarda Ittifoq oldindan ogohlantirish
        majburiyatini o&apos;z zimmasiga olmaydi.
      </p>

      <h2>7. Shaxsiy ma&apos;lumotlar</h2>
      <p>
        Platforma orqali to&apos;planadigan shaxsiy ma&apos;lumotlar bilan ishlash
        tartibi alohida{" "}
        <Link href="/maxfiylik-siyosati">Maxfiylik siyosati</Link> hujjatida
        belgilangan.
      </p>

      <h2>8. Shartlarga o&apos;zgartirish kiritish</h2>
      <p>
        Ittifoq ushbu shartlarni bir tomonlama tartibda yangilashi mumkin.
        Yangilangan shartlar sahifada e&apos;lon qilingan kundan e&apos;tiboran
        kuchga kiradi.
      </p>

      <h2>9. Bog&apos;lanish</h2>
      <div className={styles.contactBox}>
        <p>O&apos;zbekiston Yoshlar Ittifoqi Toshkent shahar hududiy Kengashi</p>
        <p>Manzil: Universitet ko&apos;chasi, Toshkent, O&apos;zbekiston</p>
        <p>Telefon: +998 71 233 55 77</p>
        <p>Email: info@yoshlartoshkent.uz</p>
      </div>
    </LegalPage>
  );
}
