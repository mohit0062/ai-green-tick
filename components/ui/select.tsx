"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Check } from "lucide-react"

const SelectContext = React.createContext<{
  value?: string
  onValueChange?: (val: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  label: React.ReactNode
  setLabel: (label: React.ReactNode) => void
  disabled?: boolean
  triggerRef: React.RefObject<HTMLButtonElement | null>
} | null>(null)

export function Select({
  children,
  value,
  onValueChange,
  disabled,
  className,
}: {
  children: React.ReactNode
  value?: string
  onValueChange?: (val: string) => void
  disabled?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [label, setLabel] = React.useState<React.ReactNode>(null)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)

  React.useEffect(() => {
    if (!open) return
    const handleOutsideClick = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [open])

  // Reset label if value changes to empty/falsy
  React.useEffect(() => {
    if (!value) {
      setLabel(null)
    }
  }, [value])

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen, label, setLabel, disabled, triggerRef }}>
      <div className={cn("relative w-full", className)}>{children}</div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectTrigger must be used within Select")
  return (
    <button
      ref={context.triggerRef}
      type="button"
      disabled={context.disabled}
      onClick={() => context.setOpen(!context.open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-left",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
}

export function SelectValue({
  placeholder,
}: {
  placeholder?: string
}) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectValue must be used within Select")
  return (
    <span className="text-sm">
      {context.label !== null && context.label !== undefined ? context.label : placeholder}
    </span>
  )
}

export function SelectContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectContent must be used within Select")
  if (!context.open) return null
  return (
    <div
      className={cn(
        "absolute z-50 max-h-60 w-full overflow-y-auto rounded-md border border-[#C5C4C2] bg-white p-1 text-black shadow-md mt-1",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SelectItem({
  className,
  value,
  children,
}: {
  className?: string
  value: string
  children: React.ReactNode
}) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectItem must be used within Select")
  const isSelected = context.value === value

  React.useEffect(() => {
    if (isSelected) {
      context.setLabel(children)
    }
  }, [isSelected, children])

  return (
    <button
      type="button"
      onClick={() => {
        context.onValueChange?.(value)
        context.setOpen(false)
      }}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden hover:bg-neutral-100 hover:text-black data-disabled:pointer-events-none data-disabled:opacity-50 text-left text-neutral-750",
        className
      )}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="h-4 w-4 text-[#00b259]" />
        </span>
      )}
      <span>{children}</span>
    </button>
  )
}

export function SelectGroup({ children }: { children: React.ReactNode }) {
  return <div className="p-1">{children}</div>
}
