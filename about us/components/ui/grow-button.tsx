import * as React from 'react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

interface GrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  asChild?: boolean
}

function PrimaryGrowButton(props: GrowButtonProps) {
  const { children, asChild = false, className, ...rest } = props

  return (
    <Button
      asChild={asChild}
      className={cn(
        'hover:bg-primary/90 [a]:hover:bg-primary/90 h-10 gap-2 rounded-lg border-0 px-6 text-base duration-200 ease-in-out active:-translate-x-0.5 active:translate-y-0.5',

        // default shadows
        '[box-shadow:0px_1px_8px_0px_color-mix(in_oklab,white_7%,transparent)_inset,0px_0px_4.3px_0px_color-mix(in_oklab,var(--primary)_11%,transparent)_inset,0px_0px_0px_2.5px_var(--primary),0px_9px_21.7px_3px_color-mix(in_oklab,var(--primary)_40%,transparent),0px_-1px_0px_1px_color-mix(in_oklab,white_18%,transparent)_inset,0px_4px_4px_0px_color-mix(in_oklab,var(--primary)_16%,transparent)] dark:[box-shadow:0px_1px_8px_0px_color-mix(in_oklab,black_7%,transparent)_inset,0px_0px_4.3px_0px_color-mix(in_oklab,var(--primary)_11%,transparent)_inset,0px_0px_0px_2.5px_var(--primary),0px_9px_21.7px_3px_color-mix(in_oklab,var(--primary)_40%,transparent),0px_-1px_0px_1px_color-mix(in_oklab,black_18%,transparent)_inset,0px_4px_4px_0px_color-mix(in_oklab,var(--primary)_16%,transparent)]',

        // shadows on active state
        'active:[box-shadow:0px_1px_8px_0px_color-mix(in_oklab,white_7%,transparent)_inset,0px_0px_4.3px_0px_color-mix(in_oklab,var(--primary)_11%,transparent)_inset,0px_0px_0px_2.5px_var(--primary),0px_7px_12px_0px_color-mix(in_oklab,var(--primary)_60%,transparent),0px_-1px_0px_1px_color-mix(in_oklab,white_18%,transparent)_inset,0px_4px_4px_0px_color-mix(in_oklab,var(--primary)_16%,transparent)] dark:active:[box-shadow:0px_1px_8px_0px_color-mix(in_oklab,black_7%,transparent)_inset,0px_0px_4.3px_0px_color-mix(in_oklab,var(--primary)_11%,transparent)_inset,0px_0px_0px_2.5px_var(--primary),0px_7px_12px_0px_color-mix(in_oklab,var(--primary)_60%,transparent),0px_-1px_0px_1px_color-mix(in_oklab,black_18%,transparent)_inset,0px_4px_4px_0px_color-mix(in_oklab,var(--primary)_16%,transparent)]',

        // shadows on focus state
        'focus-visible:[box-shadow:0px_1px_8px_0px_color-mix(in_oklab,white_7%,transparent)_inset,0px_0px_4.3px_0px_color-mix(in_oklab,var(--primary)_11%,transparent)_inset,0px_0px_0px_2.5px_var(--primary),0px_7px_12px_0px_color-mix(in_oklab,var(--primary)_60%,transparent),0px_-1px_0px_1px_color-mix(in_oklab,white_18%,transparent)_inset,0px_4px_4px_0px_color-mix(in_oklab,var(--primary)_16%,transparent)] dark:focus-visible:[box-shadow:0px_1px_8px_0px_color-mix(in_oklab,black_7%,transparent)_inset,0px_0px_4.3px_0px_color-mix(in_oklab,var(--primary)_11%,transparent)_inset,0px_0px_0px_2.5px_var(--primary),0px_7px_12px_0px_color-mix(in_oklab,var(--primary)_60%,transparent),0px_-1px_0px_1px_color-mix(in_oklab,black_18%,transparent)_inset,0px_4px_4px_0px_color-mix(in_oklab,var(--primary)_16%,transparent)]',
        className
      )}
      {...rest}
    >
      {children}
    </Button>
  )
}

function SecondaryGrowButton(props: GrowButtonProps) {
  const { children, asChild = false, className, ...rest } = props

  return (
    <Button
      variant='secondary'
      asChild={asChild}
      className={cn(
        'text-primary h-10 cursor-pointer gap-2 rounded-lg border border-[color-mix(in_oklab,var(--primary)_30%,var(--card))] bg-[color-mix(in_oklab,var(--primary)_10%,var(--card))] px-6 text-base hover:bg-[color-mix(in_oklab,var(--primary)_15%,var(--card))] active:translate-y-0 active:scale-95',

        className
      )}
      {...rest}
    >
      {children}
    </Button>
  )
}

export { PrimaryGrowButton, SecondaryGrowButton, type GrowButtonProps }
