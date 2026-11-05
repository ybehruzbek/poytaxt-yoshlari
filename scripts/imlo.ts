/**
 * Imlo tekshiruvi: saytdagi o'zbekcha matnlar yangi alifboda va to'g'ri tutuq belgisi (ʼ) bilan yozilganmi.
 *
 *   pnpm imlo          — tekshiradi, xato bo'lsa ro'yxat chiqaradi va 1 kodi bilan tugaydi
 *   pnpm imlo:fix      — topilganlarini o'zi to'g'rilaydi
 *
 * Faqat foydalanuvchi ko'radigan matnlar tekshiriladi (JSX matni, alt/title/aria-label/placeholder,
 * yozuvli satrlar). Kod qiymatlari — havolalar, slug, enum qiymatlari, className, import yo'llari —
 * ataylab tegilmaydi: ular ASCII bo'lib qolishi kerak. Qoidaning o'zi: src/lib/alifbo.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

import { toYangiAlifbo } from '../src/lib/alifbo'

const ROOT = path.resolve(import.meta.dirname, '..')
const FIX = process.argv.includes('--fix')

const SKIP_FILES = [
  'src/payload-types.ts',
  'src/lib/alifbo.ts',
  'src/lib/slugify.ts',
  'src/app/(payload)',
  'src/migrations',
]
/** shu atributlar matni foydalanuvchiga ko'rinadi */
const DISPLAY_ATTR = new Set(['alt', 'title', 'placeholder', 'aria-label', 'aria-description', 'label', 'titles'])
/** shu kalitlardagi qiymatlar — kod (havola, slug, enum, maydon nomi) */
const CODE_KEYS = new Set([
  'href', 'h', 'src', 'img', 'slug', 'value', 'key', 'url', 'path', 'className', 'collection', 'relationTo',
  'name', 'id', 'net', 'mimeType', 'staticDir', 'locale', 'code', 'tone', 'format', 'icon',
  'fallbackLanguage', 'defaultLocale', 'useAsTitle', 'defaultSort', 'status', 'category', 'role',
])

function files(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    const rel = path.relative(ROOT, p)
    if (SKIP_FILES.some((s) => rel === s || rel.startsWith(s + path.sep))) return []
    if (e.isDirectory()) return files(p)
    return /\.(tsx?|mts)$/.test(e.name) ? [p] : []
  })
}

const propName = (n: ts.PropertyName) =>
  ts.isIdentifier(n) || ts.isStringLiteral(n) || ts.isNumericLiteral(n) ? n.text : ''

function attrName(n: ts.Node): string | null {
  for (let p: ts.Node | undefined = n.parent; p; p = p.parent) {
    if (ts.isJsxAttribute(p)) return p.name.getText()
    if (ts.isJsxElement(p) || ts.isJsxSelfClosingElement(p) || ts.isJsxFragment(p) || ts.isBlock(p)) return null
  }
  return null
}

/** Bu satr foydalanuvchi ko'radigan matnmi */
function isDisplay(n: ts.Node, inner: string): boolean {
  if (ts.isJsxText(n)) return true
  for (let p: ts.Node | undefined = n.parent; p; p = p.parent) {
    if (ts.isImportDeclaration(p) || ts.isExportDeclaration(p) || ts.isLiteralTypeNode(p)) return false
    if (ts.isElementAccessExpression(p) && p.argumentExpression === n) return false
    if (ts.isPropertyAssignment(p)) {
      if (p.name === n) return false
      if (CODE_KEYS.has(propName(p.name))) return false
      break
    }
    if (ts.isCallExpression(p) || ts.isVariableDeclaration(p) || ts.isReturnStatement(p) || ts.isJsxAttribute(p)) break
  }
  const attr = attrName(n)
  if (attr !== null) return DISPLAY_ATTR.has(attr)
  // bitta "kodga o'xshash" so'z (kichik harf, probelsiz) — kod qiymati deb hisoblaymiz
  const s = inner.trim()
  if (!/\s/.test(s) && /^[a-z0-9_\-./:@#[\]=,()*|]+$/.test(s)) return false
  if (/^-?[a-z]+[A-Z][A-Za-z0-9]*$/.test(s)) return false // camelCase maydon nomi (publishedAt)
  if (/^(\/|https?:|mailto:|tel:|#|\.)/.test(s)) return false
  return true
}

type Hit = { file: string; line: number; from: string; to: string }
const hits: Hit[] = []

for (const file of [...files(path.join(ROOT, 'src')), ...files(path.join(ROOT, 'scripts'))]) {
  const src = fs.readFileSync(file, 'utf8')
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  const edits: Array<{ start: number; end: number; text: string }> = []

  const visit = (n: ts.Node) => {
    let start = -1
    let end = -1
    if (ts.isJsxText(n)) {
      start = n.getStart(sf)
      end = n.getEnd()
    } else if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
      start = n.getStart(sf) + 1
      end = n.getEnd() - 1
    } else if (ts.isTemplateHead(n) || ts.isTemplateMiddle(n)) {
      start = n.getStart(sf) + 1
      end = n.getEnd() - 2
    } else if (ts.isTemplateTail(n)) {
      start = n.getStart(sf) + 1
      end = n.getEnd() - 1
    }
    if (start >= 0 && end > start) {
      const inner = src.slice(start, end)
      const fixed = toYangiAlifbo(inner)
      if (fixed !== inner && isDisplay(n, inner)) {
        edits.push({ start, end, text: fixed })
        hits.push({ file: path.relative(ROOT, file), line: sf.getLineAndCharacterOfPosition(start).line + 1, from: inner.trim(), to: fixed.trim() })
      }
    }
    ts.forEachChild(n, visit)
  }
  visit(sf)

  if (FIX && edits.length) {
    let out = src
    for (const e of edits.sort((a, b) => b.start - a.start)) out = out.slice(0, e.start) + e.text + out.slice(e.end)
    fs.writeFileSync(file, out)
  }
}

for (const h of hits) console.log(`${h.file}:${h.line}\n  - ${h.from.slice(0, 160)}\n  + ${h.to.slice(0, 160)}`)
if (FIX) {
  console.log(`\n${hits.length} ta matn yangi alifboga ögirildi.`)
} else if (hits.length) {
  console.log(`\n${hits.length} ta matn eski yozuvda yoki tutuq belgisi notöğri. Töğrilaş: pnpm imlo:fix`)
  process.exit(1)
} else {
  console.log('Imlo: hammasi yangi alifboda ✓')
}
