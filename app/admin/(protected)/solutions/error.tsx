'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RotateCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('CMS Solutions error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full border border-red-500/30 bg-red-500/5 backdrop-blur-md rounded-2xl p-8 text-center space-y-6 shadow-xl">
        <div className="mx-auto size-16 rounded-full bg-red-100 flex items-center justify-center text-red-650 animate-bounce">
          <AlertCircle className="h-9 w-9 text-red-600" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-neutral-900">CMS Loading Exception</h3>
          <p className="text-neutral-500 text-xs leading-relaxed">
            A client-side error occurred while loading this page:
          </p>
          <div className="font-mono bg-neutral-100/80 p-3 border border-[#C5C4C2]/40 rounded text-left text-red-700 text-xs overflow-x-auto max-h-40 select-all">
            {error.message || error.toString()}
            {error.stack && (
              <pre className="mt-2 text-[10px] text-neutral-500 overflow-x-auto">
                {error.stack}
              </pre>
            )}
          </div>
        </div>

        <div className="border-t border-[#C5C4C2]/30 pt-6 flex flex-col gap-3">
          <Button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 w-full bg-[#00b259] hover:bg-[#009b4d] text-white text-xs font-bold uppercase transition-colors"
          >
            <RotateCcw className="h-4 w-4" /> Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}
