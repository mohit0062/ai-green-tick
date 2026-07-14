'use client'

import React from 'react'
import * as Icons from 'lucide-react'

interface LucideIconProps {
  name: string
  className?: string
}

export function LucideIcon({ name, className }: LucideIconProps) {
  // Get the component dynamically by string name
  const IconComponent = (Icons as any)[name]

  if (!IconComponent) {
    // Return a fallback search icon if name not found
    const Fallback = Icons.HelpCircle
    return <Fallback className={className} />
  }

  return <IconComponent className={className} />
}
