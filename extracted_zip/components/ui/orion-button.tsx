'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

interface OrionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

function PrimaryOrionButton({ children, asChild = false, className, ...props }: OrionButtonProps) {
  return (
    <Button
      asChild={asChild}
      className={cn(
        '[a]:hover:bg-primary hover:bg-primary h-10 rounded-md border-0 px-6 text-base shadow-[inset_0_2px_3px_0_var(--primary),inset_2px_-4px_4px_0_rgba(0,0,0,0.25),inset_-2px_4px_4px_0_rgba(255,255,255,0.35)] transition-shadow duration-300 hover:shadow-[inset_0_0_0_0_var(--primary),inset_1px_-1.5px_2px_0_rgba(0,0,0,0.25),inset_-1px_1.5px_2px_0_rgba(255,255,255,0.35)] active:translate-y-0',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

function SecondaryOrionButton({ children, asChild = false, className, ...props }: OrionButtonProps) {
  return (
    <Button
      variant='secondary'
      asChild={asChild}
      className={cn(
        'bg-secondary text-secondary-foreground hover:bg-secondary h-10 rounded-md border-0 px-6 text-base shadow-[inset_0_2px_3px_0_var(--secondary),inset_2px_-4px_4px_0_rgba(0,0,0,0.25),inset_-2px_4px_4px_0_rgba(255,255,255,0.35)] transition-shadow duration-300 hover:shadow-[inset_0_0_0_0_var(--secondary),inset_1px_-1.5px_2px_0_rgba(0,0,0,0.25),inset_-1px_1.5px_2px_0_rgba(255,255,255,0.35)] active:translate-y-0',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

export { PrimaryOrionButton, SecondaryOrionButton, type OrionButtonProps }
