'use client'

import { useRef, useState, useEffect } from 'react'

import Matter from 'matter-js'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface BadgeItem {
  text: string
  className?: string
}

interface FallingBadgeProps {
  badges?: BadgeItem[]
  trigger?: 'auto' | 'scroll' | 'click' | 'hover'
  backgroundColor?: string
  wireframes?: boolean
  gravity?: number
  className?: string
  mouseConstraintStiffness?: number
}

const FallingBadge: React.FC<FallingBadgeProps> = ({
  badges = [],
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  className,
  mouseConstraintStiffness = 0.2
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const badgesRef = useRef<HTMLDivElement | null>(null)
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)

  const [effectStarted, setEffectStarted] = useState(false)

  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true)

      return
    }

    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true)
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(containerRef.current)

      return () => observer.disconnect()
    }
  }, [trigger])

  useEffect(() => {
    if (!effectStarted) return

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter

    if (!containerRef.current || !canvasContainerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const width = containerRect.width
    const height = containerRect.height

    if (width <= 0 || height <= 0) return

    const engine = Engine.create()

    engine.world.gravity.y = gravity

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes
      }
    })

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' }
    }

    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions)
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions)
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions)
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions)

    if (!badgesRef.current) return
    const badgeElements = badgesRef.current.querySelectorAll('[data-badge-item]')

    const badgeBodies = [...badgeElements].map(elem => {
      const rect = elem.getBoundingClientRect()

      const x = rect.left - containerRect.left + rect.width / 2
      const y = rect.top - containerRect.top + rect.height / 2

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2,
        chamfer: { radius: rect.height / 2 } // Makes the physics body rounded like a badge
      })

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: 0
      })
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05)

      return { elem, body }
    })

    badgeBodies.forEach(({ elem, body }) => {
      ;(elem as HTMLElement).style.position = 'absolute'
      ;(elem as HTMLElement).style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`
      ;(elem as HTMLElement).style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`
      ;(elem as HTMLElement).style.transform = 'none'
    })

    const mouse = Mouse.create(containerRef.current)

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false }
      }
    })

    render.mouse = mouse

    World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...badgeBodies.map(bb => bb.body)])

    const runner = Runner.create()

    Runner.run(runner, engine)
    Render.run(render)

    const updateLoop = () => {
      badgeBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position

        ;(elem as HTMLElement).style.left = `${x}px`
        ;(elem as HTMLElement).style.top = `${y}px`
        ;(elem as HTMLElement).style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`
      })
      Matter.Engine.update(engine)
      requestAnimationFrame(updateLoop)
    }

    updateLoop()

    return () => {
      Render.stop(render)
      Runner.stop(runner)

      if (render.canvas) {
        render.canvas.remove()
      }

      World.clear(engine.world, false)
      Engine.clear(engine)
    }
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness])

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true)
    }
  }

  return (
    <div
      ref={containerRef}
      className='relative z-1 h-full w-full cursor-pointer overflow-hidden'
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
    >
      <div ref={badgesRef} className={cn('flex flex-wrap items-center justify-center gap-2 p-4', className)}>
        {badges.map((badge, index) => (
          <Badge key={index} data-badge-item className={cn('h-auto select-none', badge.className)}>
            {badge.text}
          </Badge>
        ))}
      </div>

      <div className='absolute top-0 left-0 z-0' ref={canvasContainerRef} />
    </div>
  )
}

export default FallingBadge
