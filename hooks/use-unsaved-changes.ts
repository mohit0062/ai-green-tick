'use client'

import { useEffect } from 'react'

/**
 * Warns the user before leaving the page (reload / tab close / navigation that
 * triggers a full unload) while there are unsaved edits in a CMS editor.
 */
export function useUnsavedChanges(isDirty: boolean) {
  useEffect(() => {
    if (!isDirty) return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      // Required for the native confirmation prompt in most browsers.
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])
}
