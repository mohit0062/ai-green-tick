'use client'

import { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Upload, Loader2, X, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageInputProps {
  value: string
  onChange: (url: string) => void
  label?: string
  placeholder?: string
  className?: string
}

export function ImageInput({
  value,
  onChange,
  label = 'Image',
  placeholder = 'https://... or upload an image',
  className,
}: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setIsUploading(true)

    try {
      // Read the file as a data URL, then strip the "data:*;base64," prefix.
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          const commaIndex = result.indexOf(',')
          resolve(commaIndex >= 0 ? result.slice(commaIndex + 1) : result)
        }
        reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'))
        reader.readAsDataURL(file)
      })

      const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
      const fileName = `${Date.now()}-${sanitizedName}`

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName,
          base64Data,
          mimeType: file.type,
        }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Upload failed. Please try again.')
      }

      if (data.publicUrl) {
        onChange(data.publicUrl)
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
      // Reset the input so selecting the same file again re-triggers change.
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleClear = () => {
    onChange('')
    setError(null)
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label>{label}</Label>}

      <div className="flex items-start gap-3">
        {/* Live square preview */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#C5C4C2] bg-neutral-100">
          {value ? (
            <img
              src={value}
              alt="Image preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon className="h-6 w-6 text-neutral-400" />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={value}
              placeholder={placeholder}
              onChange={(e) => onChange(e.target.value)}
              className="border-[#C5C4C2]"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleUploadClick}
              disabled={isUploading}
              className="shrink-0 border-[#C5C4C2]"
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              <span className="ml-1.5">Upload</span>
            </Button>
          </div>

          {value && (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={handleClear}
              disabled={isUploading}
              className="h-6 px-2 text-xs text-neutral-500 hover:text-destructive"
            >
              <X className="h-3 w-3" />
              <span className="ml-1">Clear</span>
            </Button>
          )}

          {error && (
            <p className="text-[11px] font-medium text-destructive">{error}</p>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
