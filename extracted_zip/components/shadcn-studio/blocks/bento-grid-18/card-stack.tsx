'use client'

import * as React from 'react'

import { motion, useMotionValue, useTransform } from 'motion/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { cn } from '@/lib/utils'
import { ThumbsUpIcon, MessageSquareTextIcon } from 'lucide-react'

interface CardRotateProps {
  children: React.ReactNode
  onSendToBack: () => void
  sensitivity: number
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [60, -60])
  const rotateY = useTransform(x, [-100, 100], [-60, 60])

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack()
    } else {
      x.set(0)
      y.set(0)
    }
  }

  return (
    <motion.div
      className='absolute cursor-grab'
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
      tabIndex={-1}
    >
      {children}
    </motion.div>
  )
}

interface StackProps {
  randomRotation?: boolean
  sensitivity?: number
  sendToBackOnClick?: boolean
  cardsData?: {
    id: number
    img: string
    avatars: { src: string; fallback: string }[]
    title: string
    days: number
    href: string
  }[]
  animationConfig?: { stiffness: number; damping: number }
  className?: string
  perspective?: number
}

function CardStack({
  randomRotation = false,
  sensitivity = 200,
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  className,
  sendToBackOnClick = false,
  perspective
}: StackProps) {
  const [cards, setCards] = React.useState(cardsData)

  const sendToBack = (id: number) => {
    setCards(prev => {
      const newCards = [...prev]
      const index = newCards.findIndex(card => card.id === id)
      const [card] = newCards.splice(index, 1)

      newCards.unshift(card)

      return newCards
    })
  }

  return (
    <div
      className={cn('relative', className)}
      style={{
        perspective: perspective ?? 600
      }}
      tabIndex={-1}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0

        return (
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
            <motion.div
              className='bg-card text-card-foreground flex flex-col gap-4.5 overflow-hidden rounded-xl border p-4 shadow-sm focus-visible:outline-none'
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 2 - randomRotate,
                transformOrigin: 'center center'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
              tabIndex={-1}
            >
              <div className='relative'>
                <img src={card.img} alt={`card-${card.id}`} className='pointer-events-none rounded-md' />
                <div className='absolute -bottom-1 -left-1 flex -space-x-2'>
                  {card.avatars.map((avatar, index) => (
                    <Avatar key={index} className='ring-background ring-2'>
                      <AvatarImage src={avatar.src} alt={`avatar-${card.id}-${index}`} />
                      <AvatarFallback className='text-xs'>{avatar.fallback}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <h4 className='text-base font-medium'>{card.title}</h4>
                <span className='text-muted-foreground text-sm'>{card.days} days ago</span>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <ThumbsUpIcon className='size-4.5' />
                  <MessageSquareTextIcon className='size-4.5' />
                </div>

                <a href={card.href} className='text-sm text-sky-600 underline dark:text-sky-400'>
                  Details
                </a>
              </div>
            </motion.div>
          </CardRotate>
        )
      })}
    </div>
  )
}

export { CardRotate, CardStack, type CardRotateProps, type StackProps }
