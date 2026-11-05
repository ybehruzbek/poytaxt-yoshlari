import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { ru } from '@payloadcms/translations/languages/ru'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { AppealFiles, Appeals } from './collections/Appeals'
import { Socials } from './globals/Socials'

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
      titleSuffix: ' — Yoshlar Ittifoqi admin',
    },
  },
  // Admin panel tili. Payload'da o'zbekcha tarjima yo'q — hozircha ruscha (asosiy) va inglizcha.
  i18n: {
    supportedLanguages: { ru, en },
    fallbackLanguage: 'ru',
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
  collections: [News, Media, Appeals, AppealFiles, Users],
  globals: [Socials],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
