'use client'

import { AutoLinkNode, $isLinkNode, LinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { $isListNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, ListItemNode, ListNode, REMOVE_LIST_COMMAND } from '@lexical/list'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { $createHeadingNode, $createQuoteNode, $isHeadingNode, HeadingNode, QuoteNode } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import { $findMatchingParent, mergeRegister } from '@lexical/utils'
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  type EditorState,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical'
import { useCallback, useEffect, useState } from 'react'

import { Icon } from '../Icon'

type Json = Record<string, unknown>
export type RichJson = { root: Json & { children: Json[] } } | null | undefined

/**
 * Yangilik matni muharriri (Lexical). Doimiy asboblar paneli: matn turi, qalin/kursiv/taglangan, havola, röyxatlar,
 * bekor qiliş. Saqlanadigan JSON saytdagi Payload RichText bilan bir xil formatda: havola tugunlari Payload'ning
 * `fields: { url, newTab }` körinişiga ötkaziladi (saytda ham, eski panelda ham töğri oçiladi).
 */
const SUPPORTED = new Set(['root', 'paragraph', 'text', 'heading', 'quote', 'list', 'listitem', 'link', 'autolink', 'linebreak', 'tab'])

/** Muharrir tanimaydigan tugun bormi (masalan, eski paneldan qöşilgan rasm bloki) */
export function hasUnsupported(v: RichJson): boolean {
  const walk = (n: unknown): boolean => {
    if (!n || typeof n !== 'object') return false
    const o = n as Json
    if (typeof o.type === 'string' && !SUPPORTED.has(o.type)) return true
    return Array.isArray(o.children) && o.children.some(walk)
  }
  return !!v?.root && walk(v.root)
}

/** Payload → Lexical: havola `fields` dan Lexical atributlariga */
function toLexical(n: unknown): unknown {
  if (Array.isArray(n)) return n.map(toLexical)
  if (!n || typeof n !== 'object') return n
  const o = { ...(n as Json) }
  if ((o.type === 'link' || o.type === 'autolink') && o.fields && typeof o.fields === 'object') {
    const f = o.fields as { url?: string; newTab?: boolean }
    o.type = 'link'
    o.url = f.url ?? ''
    o.target = f.newTab ? '_blank' : null
    o.rel = f.newTab ? 'noopener noreferrer' : null
    o.title = null
    delete o.fields
    delete o.id
  }
  if (Array.isArray(o.children)) o.children = o.children.map(toLexical)
  if (o.root) o.root = toLexical(o.root)
  return o
}

/** Lexical → Payload */
function toPayload(n: unknown): unknown {
  if (Array.isArray(n)) return n.map(toPayload)
  if (!n || typeof n !== 'object') return n
  const o = { ...(n as Json) }
  if (o.type === 'link' || o.type === 'autolink') {
    const { url, target } = o as { url?: string; target?: string | null }
    for (const k of ['url', 'target', 'rel', 'title']) delete o[k]
    o.type = 'link'
    o.version = 3
    o.fields = { url: url ?? '', newTab: target === '_blank', linkType: 'custom' }
  }
  if (Array.isArray(o.children)) o.children = o.children.map(toPayload)
  if (o.root) o.root = toPayload(o.root)
  return o
}

/** JSON'dagi matn tugunlaridan sözlar soni (muharrir oçilgunça körsatiladi) */
export function countWords(v: RichJson): number {
  const parts: string[] = []
  const walk = (n: unknown) => {
    if (!n || typeof n !== 'object') return
    const o = n as Json
    if (o.type === 'text' && typeof o.text === 'string') parts.push(o.text)
    if (Array.isArray(o.children)) o.children.forEach(walk)
  }
  walk(v?.root)
  const t = parts.join(' ').trim()
  return t ? t.split(/\s+/).length : 0
}

const theme = {
  paragraph: 'ed-p',
  quote: 'ed-quote',
  heading: { h2: 'ed-h2', h3: 'ed-h3' },
  list: { ul: 'ed-ul', ol: 'ed-ol', listitem: 'ed-li', nested: { listitem: 'ed-li-nested' } },
  link: 'ed-a',
  text: { bold: 'ed-b', italic: 'ed-i', underline: 'ed-u' },
}

type Block = 'paragraph' | 'h2' | 'h3' | 'quote' | 'ul' | 'ol'
const BLOCKS: { v: Block; t: string }[] = [
  { v: 'paragraph', t: 'Oddiy matn' },
  { v: 'h2', t: 'Katta sarlavha' },
  { v: 'h3', t: 'Kichik sarlavha' },
  { v: 'quote', t: 'Iqtibos' },
]

/** Asboblar paneli tugmasi: bosilganda muharrirdagi belgilaş (fokus) yöqolmaydi */
function B({ on, title, icon, onClick, disabled }: { on?: boolean; title: string; icon: Parameters<typeof Icon>[0]['name']; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" className={on ? 'is-act' : undefined} title={title} aria-label={title} aria-pressed={on} disabled={disabled} onMouseDown={(e) => e.preventDefault()} onClick={onClick}>
      <Icon name={icon} size={18} />
    </button>
  )
}

function Toolbar() {
  const [editor] = useLexicalComposerContext()
  const [fmt, setFmt] = useState({ bold: false, italic: false, underline: false, link: false })
  const [block, setBlock] = useState<Block>('paragraph')
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [linkOpen, setLinkOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [blockMenu, setBlockMenu] = useState(false)

  const sync = useCallback(() => {
    const sel = $getSelection()
    if (!$isRangeSelection(sel)) return
    const node = sel.anchor.getNode()
    const link = $findMatchingParent(node, $isLinkNode)
    setFmt({ bold: sel.hasFormat('bold'), italic: sel.hasFormat('italic'), underline: sel.hasFormat('underline'), link: !!link })
    const top = node.getKey() === 'root' ? node : node.getTopLevelElementOrThrow()
    if ($isListNode(top)) setBlock(top.getListType() === 'number' ? 'ol' : 'ul')
    else if ($isHeadingNode(top)) setBlock(top.getTag() === 'h2' ? 'h2' : 'h3')
    else if (top.getType() === 'quote') setBlock('quote')
    else setBlock('paragraph')
  }, [])

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) => editorState.read(sync)),
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            sync()
            return false
          },
          COMMAND_PRIORITY_LOW,
        ),
        editor.registerCommand(
          CAN_UNDO_COMMAND,
          (p) => {
            setCanUndo(p)
            return false
          },
          COMMAND_PRIORITY_LOW,
        ),
        editor.registerCommand(
          CAN_REDO_COMMAND,
          (p) => {
            setCanRedo(p)
            return false
          },
          COMMAND_PRIORITY_LOW,
        ),
      ),
    [editor, sync],
  )

  const setBlockType = (b: Block) => {
    setBlockMenu(false)
    if (b === 'ul' || b === 'ol') {
      editor.dispatchCommand(block === b ? REMOVE_LIST_COMMAND : b === 'ul' ? INSERT_UNORDERED_LIST_COMMAND : INSERT_ORDERED_LIST_COMMAND, undefined)
      return
    }
    if (block === 'ul' || block === 'ol') editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    editor.update(() => {
      const sel = $getSelection()
      if (!$isRangeSelection(sel)) return
      $setBlocksType(sel, () => (b === 'h2' || b === 'h3' ? $createHeadingNode(b) : b === 'quote' ? $createQuoteNode() : $createParagraphNode()))
    })
  }

  const openLink = () => {
    if (fmt.link) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
      return
    }
    setUrl('https://')
    setLinkOpen(true)
  }
  const applyLink = () => {
    const u = url.trim()
    if (/^https?:\/\/\S+\.\S+/.test(u)) editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url: u, target: '_blank', rel: 'noopener noreferrer' })
    setLinkOpen(false)
    editor.focus()
  }

  return (
    <div className="ed-bar">
      <div className="ed-blk">
        <button type="button" className="ed-blk__btn" onMouseDown={(e) => e.preventDefault()} onClick={() => setBlockMenu((o) => !o)} aria-expanded={blockMenu}>
          {BLOCKS.find((x) => x.v === block)?.t ?? (block === 'ul' ? 'Belgili ro‘yxat' : 'Raqamli ro‘yxat')}
          <Icon name="down" size={14} />
        </button>
        {blockMenu && (
          <div className="ed-blk__menu" role="menu">
            {BLOCKS.map((x) => (
              <button key={x.v} type="button" role="menuitem" className={`ed-blk__${x.v}${block === x.v ? ' is-act' : ''}`} onMouseDown={(e) => e.preventDefault()} onClick={() => setBlockType(x.v)}>
                {x.t}
              </button>
            ))}
          </div>
        )}
      </div>
      <span className="ed-sep" />
      <B on={fmt.bold} title="Qalin (⌘B)" icon="bold" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')} />
      <B on={fmt.italic} title="Kursiv (⌘I)" icon="italic" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')} />
      <B on={fmt.underline} title="Tagiga chizish (⌘U)" icon="underline" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')} />
      <B on={fmt.link} title={fmt.link ? 'Havolani olib tashlash' : 'Havola qo‘shish'} icon="link" onClick={openLink} />
      <span className="ed-sep" />
      <B on={block === 'ul'} title="Belgili ro‘yxat" icon="list" onClick={() => setBlockType('ul')} />
      <B on={block === 'ol'} title="Raqamli ro‘yxat" icon="olist" onClick={() => setBlockType('ol')} />
      <B on={block === 'quote'} title="Iqtibos" icon="quote" onClick={() => setBlockType(block === 'quote' ? 'paragraph' : 'quote')} />
      <span className="ed-sep" />
      <B title="Bekor qilish (⌘Z)" icon="undo" disabled={!canUndo} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} />
      <B title="Qaytarish (⇧⌘Z)" icon="redo" disabled={!canRedo} onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)} />

      {linkOpen && (
        <div className="ed-link">
          <input
            autoFocus
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                applyLink()
              }
              if (e.key === 'Escape') setLinkOpen(false)
            }}
            placeholder="https://…"
            aria-label="Havola manzili"
          />
          <button type="button" className="btn btn-primary btn-sm" onClick={applyLink}>
            Qo‘shish
          </button>
          <button type="button" className="ed-link__x" onClick={() => setLinkOpen(false)} aria-label="Yopish">
            <Icon name="x" size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export function Editor({ value, onChange }: { value: RichJson; onChange: (v: RichJson, words: number) => void }) {
  const [words, setWords] = useState(() => countWords(value))
  // boşlanğiç holat faqat bir marta hisoblanadi (muharrir öz holatini özi saqlaydi)
  const [initial] = useState(() => (value?.root?.children?.length ? JSON.stringify(toLexical(value)) : undefined))

  const handle = useCallback(
    (state: EditorState) => {
      state.read(() => {
        const text = $getRoot().getTextContent().trim()
        const w = text ? text.split(/\s+/).length : 0
        setWords(w)
        onChange(text ? (toPayload(state.toJSON()) as RichJson) : null, w)
      })
    },
    [onChange],
  )

  return (
    <LexicalComposer
      initialConfig={{
        namespace: 'yangilik',
        theme,
        nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, AutoLinkNode],
        editorState: initial,
        onError: (e) => console.error(e),
      }}
    >
      <div className="ed">
        <Toolbar />
        <div className="ed-body">
          <RichTextPlugin
            contentEditable={<ContentEditable className="ed-ce" aria-label="To‘liq matn" />}
            placeholder={<p className="ed-ph">Yangilik matnini shu yerga yozing yoki nusxalab qo‘ying…</p>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <div className="ed-foot">
          <span>Matn saqlanganda yangi alifboga avtomatik o‘tkaziladi</span>
          <span className="nb">{words} so‘z</span>
        </div>
      </div>
      <HistoryPlugin />
      <ListPlugin />
      <LinkPlugin validateUrl={(u) => /^https?:\/\/\S+/.test(u)} />
      <OnChangePlugin onChange={handle} ignoreSelectionChange />
    </LexicalComposer>
  )
}
