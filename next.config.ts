import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
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
  // “Faoliyat → Yoşlar yetakçilari” olib taşlandi: yetakçilar endi “Biz haqimizda → Boşlanğiç taşkilotlar” da
  async redirects() {
    const to = '/:locale/biz-haqimizda/boshlangich-tashkilotlar'
    return [
      { source: '/:locale/faoliyat/yetakchilar', destination: to, permanent: true },
      { source: '/:locale/faoliyat/yetakchilar/otm', destination: `${to}/oliy-talim`, permanent: true },
      { source: '/:locale/faoliyat/yetakchilar/harbiy', destination: `${to}/harbiy`, permanent: true },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
