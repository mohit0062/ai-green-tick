'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Bold, Italic, List, ListOrdered, Quote, AlignLeft, AlignCenter, AlignRight, Link, Maximize2, Image, Check, Loader2 } from 'lucide-react'
import { Button } from './button'
import { uploadCMSImageAction } from '@/app/admin/(protected)/cms-actions'
import { cn } from '@/lib/utils'

interface WpRichEditorProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

export default function WpRichEditor({ value, onChange, placeholder }: WpRichEditorProps) {
  const [isVisual, setIsVisual] = useState(true)
  const [uploading, setUploading] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  // Sync state to contentEditable div
  useEffect(() => {
    if (editorRef.current && isVisual) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '<p><br></p>'
      }
    }
  }, [value, isVisual])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const runCommand = (command: string, arg: string = '') => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
    document.execCommand(command, false, arg)
    handleInput()
  }

  const handleAddMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const reader = new FileReader()
      reader.onload = async () => {
        const base64String = (reader.result as string).split(',')[1]
        const mimeType = file.type
        const fileExtension = file.name.split('.').pop()
        const fileName = `media_${Date.now()}.${fileExtension}`

        const result = await uploadCMSImageAction(fileName, base64String, mimeType)
        if (result.publicUrl) {
          const imgTag = `<img src="${result.publicUrl}" alt="${file.name}" class="my-4 max-w-full h-auto rounded-lg shadow-sm" />`
          if (isVisual) {
            if (editorRef.current) {
              editorRef.current.focus()
            }
            document.execCommand('insertHTML', false, imgTag)
            handleInput()
          } else {
            onChange(value + `\n${imgTag}`)
          }
        } else {
          alert('Upload failed: ' + result.error)
        }
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (err: any) {
      alert('Upload failed: ' + err.message)
      setUploading(false)
    }
  }

  const insertLink = () => {
    const url = prompt('Enter the link URL (e.g. https://google.com):')
    if (url) {
      runCommand('createLink', url)
    }
  }

  const formatBlock = (blockType: string) => {
    runCommand('formatBlock', blockType)
  }

  return (
    <div className="border border-neutral-200 bg-white rounded-lg overflow-hidden flex flex-col font-sans text-black">
      {/* Top Header Row: Add Media on left, Visual/Code tabs on right */}
      <div className="flex justify-between items-center bg-neutral-50 px-4 py-2 border-b border-neutral-200">
        <div>
          <input
            type="file"
            accept="image/*"
            id={`wp-media-upload-${placeholder || 'editor'}`}
            className="hidden"
            onChange={handleAddMedia}
            disabled={uploading}
          />
          <button
            type="button"
            onClick={() => document.getElementById(`wp-media-upload-${placeholder || 'editor'}`)?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 rounded-md bg-white text-xs font-semibold hover:bg-neutral-50 cursor-pointer shadow-xs transition-all text-neutral-700"
          >
            {uploading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Image className="h-3.5 w-3.5 text-neutral-500" /> Add Media
              </>
            )}
          </button>
        </div>

        {/* Visual / Code Pill Tabs */}
        <div className="flex bg-neutral-200 p-0.5 rounded-lg border border-neutral-300">
          <button
            type="button"
            onClick={() => setIsVisual(true)}
            className={cn(
              "px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer",
              isVisual ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-600 hover:text-black"
            )}
          >
            Visual
          </button>
          <button
            type="button"
            onClick={() => setIsVisual(false)}
            className={cn(
              "px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer",
              !isVisual ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-600 hover:text-black"
            )}
          >
            Code
          </button>
        </div>
      </div>

      {/* Toolbar (Only visible in Visual Mode) */}
      {isVisual && (
        <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-neutral-200 bg-white select-none">
          {/* Format Block Select */}
          <select
            onChange={(e) => formatBlock(e.target.value)}
            className="rounded-md border border-neutral-300 h-8 px-2 text-xs font-semibold bg-white cursor-pointer mr-2 outline-none text-neutral-700"
            defaultValue="<p>"
          >
            <option value="<p>">Paragraph</option>
            <option value="<h1>">Heading 1</option>
            <option value="<h2>">Heading 2</option>
            <option value="<h3>">Heading 3</option>
            <option value="<blockquote>">Blockquote</option>
          </select>

          <div className="h-4 w-px bg-neutral-200 mx-1" />

          {/* Formatting command buttons */}
          <button
            type="button"
            onClick={() => runCommand('bold')}
            className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-black cursor-pointer"
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => runCommand('italic')}
            className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-black cursor-pointer"
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => runCommand('insertUnorderedList')}
            className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-black cursor-pointer"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => runCommand('insertOrderedList')}
            className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-black cursor-pointer"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => runCommand('formatBlock', '<blockquote>')}
            className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-black cursor-pointer"
            title="Quote"
          >
            <Quote className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-neutral-200 mx-1" />

          <button
            type="button"
            onClick={() => runCommand('justifyLeft')}
            className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-black cursor-pointer"
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => runCommand('justifyCenter')}
            className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-black cursor-pointer"
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => runCommand('justifyRight')}
            className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-black cursor-pointer"
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-neutral-200 mx-1" />

          <button
            type="button"
            onClick={insertLink}
            className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-black cursor-pointer"
            title="Insert Link"
          >
            <Link className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Editor Content Area */}
      <div className="flex-1 bg-white relative">
        {isVisual ? (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            className="p-4 min-h-[300px] outline-none text-sm text-neutral-800 leading-relaxed font-sans prose max-w-none focus:ring-0 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:shadow-sm"
            data-placeholder={placeholder}
          />
        ) : (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-h-[300px] p-4 font-mono text-xs bg-neutral-900 text-white outline-none leading-normal border-0 resize-y"
            placeholder="Write raw HTML/Tailwind code here..."
          />
        )}
      </div>
    </div>
  )
}
