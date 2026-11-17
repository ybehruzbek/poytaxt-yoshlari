import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

import { locales } from './src/i18n/config'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  // Docker image uçun: server.js va faqat kerakli node_modules (.next/standalone) — Dockerfile'ga qarang
  output: 'standalone',
  experimental: {
    // murojaat shaklidagi fayl (10 MB gacha) uchun
    serverActions: { bodySizeLimit: '11mb' },
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/img/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  // Xavfsizlik sarlavhalari: sayt boşqa saytlar içiga (iframe) joylanmaydi, fayl turi taxmin qilinmaydi,
  // taşqi saytlarga faqat domen uzatiladi, kamera/mikrofon/joylaşuvdan foydalanilmaydi
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
        ],
      },
      {
        // public/ dagi rasmlar: bir kun keşdan olinadi, keyin fonda tekşiriladi (deploy'da yangilangan rasm bir kun içida körinadi)
        source: '/img/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ]
  },
  // “Faoliyat”dagi yetakçilar va boşlanğiç taşkilotlar bandlari olib taşlandi: ular endi “Biz haqimizda → Boşlanğiç taşkilotlar” da
  async redirects() {
    // til qismi faqat saytdagi tillar bilan cheklangan — tekşirilmagan qiymat Location ga tuşmaydi
    const loc = `:locale(${locales.join('|')})`
    const to = `/${loc}/biz-haqimizda/boshlangich-tashkilotlar`
    return [
      { source: `/${loc}/faoliyat/yetakchilar`, destination: to, permanent: true },
      {
        source: `/${loc}/faoliyat/yetakchilar/otm`,
        destination: `${to}/oliy-talim`,
        permanent: true,
      },
      {
        source: `/${loc}/faoliyat/yetakchilar/harbiy`,
        destination: `${to}/harbiy`,
        permanent: true,
      },
      {
        source: `/${loc}/faoliyat/otm-tashkilotlar`,
        destination: `${to}/oliy-talim`,
        permanent: true,
      },
      {
        source: `/${loc}/faoliyat/harbiy-tashkilotlar`,
        destination: `${to}/harbiy`,
        permanent: true,
      },
      // “Köngillilik va iştirok” sahifasi olib taşlandi
      {
        source: `/${loc}/faoliyat/ishtirok`,
        destination: `/${loc}/faoliyat/elonlar`,
        permanent: true,
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
