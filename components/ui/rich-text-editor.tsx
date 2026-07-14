'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Image as ImageIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  minHeight?: string
}

export function RichTextEditor({ value, onChange, placeholder = 'Write content here...', minHeight = '140px' }: RichTextEditorProps) {
  const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual')
  const [activeBlockFormat, setActiveBlockFormat] = useState('<p>')
  const [showColorMenu, setShowColorMenu] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || ''
      }
    }
  }, [editorMode, value])

  const handleVisualInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, val: string = '') => {
    if (editorMode !== 'visual') return
    editorRef.current?.focus()
    document.execCommand(command, false, val)
    handleVisualInput()
  }

  const handleInsertLink = () => {
    const url = prompt('Enter the link URL (e.g. https://google.com):')
    if (url) {
      execCommand('createLink', url)
    }
  }

  const handleInsertImage = () => {
    const url = prompt('Enter Image URL:')
    if (url) {
      execCommand('insertImage', url)
    }
  }

  const COLORS = ['#000000', '#374151', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#ffffff']

  return (
    <div className="border border-[#C5C4C2]/50 rounded-xl bg-background shadow-xs overflow-hidden flex flex-col w-full text-black">
      {/* Top bar controls */}
      <div className="flex justify-between items-center px-3 py-1.5 bg-neutral-50 border-b border-[#C5C4C2]/50 select-none">
        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide">Editor Tools</span>
        <div className="flex bg-neutral-200/60 p-0.5 rounded-lg border border-neutral-300 select-none">
          <button
            type="button"
            onClick={() => setEditorMode('visual')}
            className={cn(
              "h-6 text-[10px] px-2.5 font-bold rounded-md transition-all cursor-pointer",
              editorMode === 'visual'
                ? "bg-black text-white shadow-xs"
                : "text-neutral-500 hover:text-black"
            )}
          >
            Visual
          </button>
          <button
            type="button"
            onClick={() => setEditorMode('code')}
            className={cn(
              "h-6 text-[10px] px-2.5 font-bold rounded-md transition-all cursor-pointer",
              editorMode === 'code'
                ? "bg-black text-white shadow-xs"
                : "text-neutral-500 hover:text-black"
            )}
          >
            Code
          </button>
        </div>
      </div>

      {/* Editing Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-1 bg-neutral-50/50 border-b border-[#C5C4C2]/50 select-none">
        <Select
          value={activeBlockFormat}
          onValueChange={(val) => {
            const fallbackVal = val || '<p>'
            setActiveBlockFormat(fallbackVal)
            execCommand('formatBlock', fallbackVal)
          }}
          disabled={editorMode !== 'visual'}
        >
          <SelectTrigger className="w-[100px] h-7 text-[11px] bg-background border-[#C5C4C2] text-black">
            <SelectValue placeholder="Paragraph" />
          </SelectTrigger>
          <SelectContent className="text-black bg-white">
            <SelectItem value="<p>">Paragraph</SelectItem>
            <SelectItem value="<h2>">Heading 2</SelectItem>
            <SelectItem value="<h3>">Heading 3</SelectItem>
            <SelectItem value="<h4>">Heading 4</SelectItem>
            <SelectItem value="<blockquote>">Blockquote</SelectItem>
          </SelectContent>
        </Select>

        <div className="h-4 w-px bg-[#C5C4C2]/50 mx-1" />

        <Button type="button" variant="ghost" size="icon" onMouseDown={(e) => e.preventDefault()} onClick={() => execCommand('bold')} disabled={editorMode !== 'visual'} className="h-7 w-7 hover:bg-[#00b259]/10 hover:text-[#00b259] cursor-pointer text-black" title="Bold"><Bold className="h-3.5 w-3.5" /></Button>
        <Button type="button" variant="ghost" size="icon" onMouseDown={(e) => e.preventDefault()} onClick={() => execCommand('italic')} disabled={editorMode !== 'visual'} className="h-7 w-7 hover:bg-[#00b259]/10 hover:text-[#00b259] cursor-pointer text-black" title="Italic"><Italic className="h-3.5 w-3.5" /></Button>
        <Button type="button" variant="ghost" size="icon" onMouseDown={(e) => e.preventDefault()} onClick={() => execCommand('insertUnorderedList')} disabled={editorMode !== 'visual'} className="h-7 w-7 hover:bg-[#00b259]/10 hover:text-[#00b259] cursor-pointer text-black" title="Unordered List"><List className="h-3.5 w-3.5" /></Button>
        <Button type="button" variant="ghost" size="icon" onMouseDown={(e) => e.preventDefault()} onClick={() => execCommand('insertOrderedList')} disabled={editorMode !== 'visual'} className="h-7 w-7 hover:bg-[#00b259]/10 hover:text-[#00b259] cursor-pointer text-black" title="Ordered List"><ListOrdered className="h-3.5 w-3.5" /></Button>

        <div className="h-4 w-px bg-[#C5C4C2]/50 mx-1" />

        <Button type="button" variant="ghost" size="icon" onMouseDown={(e) => e.preventDefault()} onClick={() => execCommand('justifyLeft')} disabled={editorMode !== 'visual'} className="h-7 w-7 hover:bg-[#00b259]/10 hover:text-[#00b259] cursor-pointer text-black" title="Align Left"><AlignLeft className="h-3.5 w-3.5" /></Button>
        <Button type="button" variant="ghost" size="icon" onMouseDown={(e) => e.preventDefault()} onClick={() => execCommand('justifyCenter')} disabled={editorMode !== 'visual'} className="h-7 w-7 hover:bg-[#00b259]/10 hover:text-[#00b259] cursor-pointer text-black" title="Align Center"><AlignCenter className="h-3.5 w-3.5" /></Button>
        <Button type="button" variant="ghost" size="icon" onMouseDown={(e) => e.preventDefault()} onClick={() => execCommand('justifyRight')} disabled={editorMode !== 'visual'} className="h-7 w-7 hover:bg-[#00b259]/10 hover:text-[#00b259] cursor-pointer text-black" title="Align Right"><AlignRight className="h-3.5 w-3.5" /></Button>

        <div className="h-4 w-px bg-[#C5C4C2]/50 mx-1" />

        <Button type="button" variant="ghost" size="icon" onMouseDown={(e) => e.preventDefault()} onClick={handleInsertLink} disabled={editorMode !== 'visual'} className="h-7 w-7 hover:bg-[#00b259]/10 hover:text-[#00b259] cursor-pointer text-black" title="Insert Link"><Link2 className="h-3.5 w-3.5" /></Button>
        <Button type="button" variant="ghost" size="icon" onMouseDown={(e) => e.preventDefault()} onClick={handleInsertImage} disabled={editorMode !== 'visual'} className="h-7 w-7 hover:bg-[#00b259]/10 hover:text-[#00b259] cursor-pointer text-black" title="Insert Image"><ImageIcon className="h-3.5 w-3.5" /></Button>

        <div className="h-4 w-px bg-[#C5C4C2]/50 mx-1" />

        {/* Color Picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColorMenu(!showColorMenu)}
            className="flex flex-col items-center justify-center h-7 w-7 rounded hover:bg-neutral-200 cursor-pointer text-black"
            title="Text color"
          >
            <span className="text-[10px] font-extrabold text-neutral-800">A</span>
            <div className="w-3.5 h-0.5 bg-red-500" />
          </button>
          {showColorMenu && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-[#C5C4C2] rounded-lg shadow-lg z-20 p-2">
              <div className="grid grid-cols-5 gap-1">
                {COLORS.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      execCommand('foreColor', color)
                      setShowColorMenu(false)
                    }}
                    className="w-4 h-4 rounded cursor-pointer border border-[#e3e3e3] hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Canvas Container */}
      <div className="flex-grow flex flex-col bg-background" style={{ minHeight }}>
        <div
          ref={editorRef}
          contentEditable={editorMode === 'visual'}
          onInput={handleVisualInput}
          className={cn(
            "flex-grow p-3 outline-none overflow-y-auto cursor-text select-text focus-visible:ring-0 text-neutral-700 text-sm leading-relaxed",
            editorMode === 'visual' ? "block" : "hidden",
            "[&_p]:leading-6 [&_p]:text-sm [&_p]:text-neutral-600 [&_strong]:font-bold [&_strong]:text-black [&_a]:text-[#00b259] [&_a]:underline [&_img]:inline-block [&_img]:max-w-full [&_img]:h-auto [&_img]:my-2"
          )}
          style={{ minHeight }}
        />
        <textarea
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "flex-grow p-3 font-mono text-xs leading-relaxed border-0 focus:ring-0 outline-none bg-neutral-50/50 resize-none overflow-y-auto text-black",
            editorMode === 'code' ? "block" : "hidden"
          )}
          style={{ minHeight }}
        />
      </div>
    </div>
  )
}
