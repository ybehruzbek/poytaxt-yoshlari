import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { postgresAdapter } from '@payloadcms/db-postgres'
import type { Config } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { ru } from '@payloadcms/translations/languages/ru'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { kontentYashirin } from './admin/access'
import { migrations } from './migrations'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { AppealFiles, Appeals } from './collections/Appeals'
import { Memberships } from './collections/Memberships'
import { Volunteers } from './collections/Volunteers'
import { Authors } from './collections/Authors'
import { NewsRatings } from './collections/NewsRatings'
import { NewsReactions } from './collections/NewsReactions'
import { TextErrors } from './collections/TextErrors'
import { Files } from './collections/Files'
import { Departments, Otts, Partners, Staff } from './collections/BizHaqimizda'
import { Directions, Events, Projects } from './collections/Faoliyat'
import { ActGroups, Acts, KengashDocs, Templates } from './collections/Hujjatlar'
import { Albums, Oav, Press, Videos } from './collections/Axborot'
import { Faqs } from './collections/Boglanish'
import { Aloqa } from './globals/Aloqa'
import { Awards, Benefits, Contests, Grants, Stipends, VolDirections } from './collections/Imkoniyatlar'
import { Natijalar } from './globals/Natijalar'
import { AzolikSahifa } from './globals/Azolik'
import { BoshSahifa } from './globals/BoshSahifa'
import { VolontyorlikSahifa } from './globals/Volontyorlik'
import { Miqdorlar } from './globals/Miqdorlar'
import { IttifoqSahifa, MarkaziyKengash } from './globals/Sahifalar'
import { Socials } from './globals/Socials'
import { uz } from './i18n/admin-uz'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Yoshlar ittifoqi admin',
      icons: [{ rel: 'icon', url: '/favicon.ico' }],
    },
    // sanalar özbekça: 14 noyabr 2026, 22:19
    dateFormat: 'd MMMM yyyy, HH:mm',
    // panel saytning öziday körinadi: oç rangli mavzu, Kengaş logotipi (uslublar — app/(payload)/custom.scss)
    theme: 'light',
    components: {
      graphics: {
        Logo: '/components/admin/AdminGraphics#AdminLogo',
        Icon: '/components/admin/AdminGraphics#AdminIcon',
      },
      beforeDashboard: ['/components/admin/AdminWelcome#AdminWelcome'],
    },
  },
  // Admin panel tili: özbekça (sukut, src/i18n/admin-uz.ts), ruscha va inglizça. Foydalanuvçi “Hisob” sahifasida
  // almaştiradi; tanlamaguniça panel özbekça oçiladi (proxy.ts payload-lng cookie'ni qöyadi)
  // Payload turlarida “uz” kodi yöq, lekin işlaş vaqtida istalgan til kaliti qabul qilinadi
  i18n: {
    supportedLanguages: { uz, ru, en } as unknown as NonNullable<Config['i18n']>['supportedLanguages'],
    fallbackLanguage: 'uz' as NonNullable<NonNullable<Config['i18n']>['fallbackLanguage']>,
  },
  // Kontent tillari: har bir yangilik/tadbir/imkoniyat 3 tilda kiritiladi.
  // Yangi alifbo (Ö Ğ Ş Ç) alohida til emas — o'zbekcha matndan avtomatik o'giriladi (src/lib/alifbo.ts).
  localization: {
    locales: [
      { code: 'uz', label: 'O‘zbekcha' },
      { code: 'ru', label: 'Русский' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'uz',
    fallback: true,
  },
  // Tartib = admin menyusidagi tartib: sayt menyusi böyiça (Biz haqimizda → Faoliyat → Yangiliklar → Hujjatlar →
  // Axborot xizmati → Boğlaniş), keyin kiruvçi murojaatlar, sozlamalar va tizim
  collections: [
    Otts,
    Partners,
    Departments,
    Staff,
    Directions,
    Projects,
    Events,
    Grants,
    Stipends,
    Contests,
    Awards,
    Benefits,
    VolDirections,
    News,
    Authors,
    NewsRatings,
    NewsReactions,
    ActGroups,
    Acts,
    KengashDocs,
    Templates,
    Press,
    Albums,
    Videos,
    Oav,
    Faqs,
    Appeals,
    AppealFiles,
    Memberships,
    Volunteers,
    TextErrors,
    Media,
    Files,
    Users,
  ].map((c) => ({ ...c, admin: { ...c.admin, hideAPIURL: true } })),
  globals: [BoshSahifa, IttifoqSahifa, MarkaziyKengash, Natijalar, VolontyorlikSahifa, Aloqa, AzolikSahifa, Miqdorlar, Socials].map((g) => ({ ...g, admin: { hidden: kontentYashirin, ...g.admin, hideAPIURL: true } })),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      // build paytida har bir işçi jarayon öz pool'ini oçadi: 10 tadan bölsa, köp yadroli serverda
      // Postgres'ning 100 ta ulaniş çegarasi tugaydi (“too many clients”) va sahifalar yiğilmaydi
      max: Number(process.env.DB_POOL_MAX) || 5,
    },
    // serverda (NODE_ENV=production) ilova işga tuşganda jadvallar migratsiyalar orqali yaratiladi va yangilanadi;
    // `next build` paytida emas (build bazaga yozmasligi kerak). Schema özgarsa: pnpm payload migrate:create <nom>
    ...(process.env.NEXT_PHASE === 'phase-production-build' ? {} : { prodMigrations: migrations }),
  }),
  // Elektron poçta: SMTP_HOST berilmasa xatlar yuborilmaydi, faqat konsolga yoziladi
  ...(process.env.SMTP_HOST
    ? {
        email: nodemailerAdapter({
          defaultFromAddress: process.env.SMTP_FROM || process.env.SMTP_USER || '',
          defaultFromName: 'Toshkent shahar hududiy Kengashi sayti',
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 465),
            secure: Number(process.env.SMTP_PORT || 465) === 465,
            requireTLS: Number(process.env.SMTP_PORT || 465) !== 465,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
          },
        }),
      }
    : {}),
  sharp,
  plugins: [],
})
