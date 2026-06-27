"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const zero1Ref = useRef<HTMLDivElement>(null)
  const zero2Ref = useRef<HTMLDivElement>(null)
  const zero3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if animation has already been shown in this session
    if (typeof window !== "undefined") {
      const hasShown = sessionStorage.getItem("preloadAnimationShown") === "true"
      if (hasShown) {
        setIsVisible(false)
        return
      }
    }

    // Lock scrolling on page load
    document.body.style.overflow = "hidden"

    // Initial state: digits are opacity 0
    gsap.set([zero1Ref.current, zero2Ref.current, zero3Ref.current], { opacity: 0 })

    // 1. Flicker animation for the three "0"s
    const flickerTimeline = gsap.timeline({
      onComplete: () => {
        startCounter()
      }
    })

    flickerTimeline
      .to([zero1Ref.current, zero2Ref.current, zero3Ref.current], {
        opacity: 1,
        duration: 0.15,
        stagger: 0.05,
      })
      .to([zero1Ref.current, zero2Ref.current, zero3Ref.current], {
        opacity: 0.2,
        duration: 0.05,
        stagger: 0.03,
      })
      .to([zero1Ref.current, zero2Ref.current, zero3Ref.current], {
        opacity: 1,
        duration: 0.1,
        stagger: 0.05,
      })
      .to([zero1Ref.current, zero2Ref.current, zero3Ref.current], {
        opacity: 0.3,
        duration: 0.05,
      })
      .to([zero1Ref.current, zero2Ref.current, zero3Ref.current], {
        opacity: 1,
        duration: 0.2,
      })

    // 2. Counter animation: 000 -> 100
    const startCounter = () => {
      let count = 0
      let mainCount = 0

      // The interval updates the second digit (units) from 0 to 9
      const interval = setInterval(() => {
        count++
        if (zero2Ref.current) {
          zero2Ref.current.innerText = count.toString()
        }

        if (count >= 9) {
          clearInterval(interval)
          
          // Reset units to 0 and increment main digit (tens/hundreds) to 1 -> representing 100%
          if (zero2Ref.current) {
            zero2Ref.current.innerText = "0"
          }
          if (zero1Ref.current) {
            zero1Ref.current.innerText = "1"
          }

          // Trigger digit fade-out 400ms after reaching 100%
          setTimeout(() => {
            gsap.to([zero1Ref.current, zero2Ref.current, zero3Ref.current], {
              opacity: 0,
              duration: 0.5,
            })
          }, 200)

          // Trigger pixelation 400ms after reaching 100%
          setTimeout(() => {
            pixelate()
          }, 400)
        }
      }, 180) // 180ms per tick (approx 2s total duration)
    }

    // 3. Pixelation effect (bottom half randomly fades out)
    const pixelate = () => {
      const preloader = containerRef.current
      if (!preloader) return
      
      const columns = preloader.querySelectorAll(".col")
      let allTargetDivs: HTMLDivElement[] = []

      columns.forEach((column) => {
        const allDivs = column.querySelectorAll(".pixel")
        // Get divs in row 4, 5, 6 (index 9 onwards of the 18 pixels)
        const targetDivs = Array.from(allDivs).filter((_, i) => i >= 9) as HTMLDivElement[]
        allTargetDivs = allTargetDivs.concat(targetDivs)
      })

      // Get a random 75% subset of bottom pixels to fade out
      const getRandomSubset = (array: HTMLDivElement[], probability = 0.75) => {
        return array.filter(() => Math.random() < probability)
      }

      const targetSubset = getRandomSubset(allTargetDivs, 0.75)

      if (targetSubset.length > 0) {
        gsap.to(targetSubset, {
          backgroundColor: "transparent",
          opacity: 0,
          duration: 0.6,
          stagger: {
            amount: 0.9,
            from: "random",
          },
          onComplete: () => {
            // Fade out the entire overlay
            gsap.to(preloader, {
              opacity: 0,
              duration: 0.4,
              onComplete: () => {
                setIsVisible(false)
                sessionStorage.setItem("preloadAnimationShown", "true")
                document.body.style.overflow = ""
              }
            })
          }
        })
      } else {
        setIsVisible(false)
        sessionStorage.setItem("preloadAnimationShown", "true")
        document.body.style.overflow = ""
      }
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  if (!isVisible) return null

  return (
    <div ref={containerRef} className="preload-container">
      <div className="text-grid">
        {/* Column 1 */}
        <div className="col">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="pixel" />
          ))}
        </div>

        {/* Column 2: First digit */}
        <div className="col">
          <div ref={zero1Ref} id="zero1" className="zero-text zero">
            0
          </div>
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="pixel" />
          ))}
        </div>

        {/* Column 3: Second digit */}
        <div className="col">
          <div ref={zero2Ref} id="zero2" className="zero-text zero">
            0
          </div>
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="pixel" />
          ))}
        </div>

        {/* Column 4: Third digit */}
        <div className="col">
          <div ref={zero3Ref} id="zero3" className="zero-text zero">
            0
          </div>
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="pixel" />
          ))}
        </div>

        {/* Column 5 */}
        <div className="col">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="pixel" />
          ))}
        </div>

        {/* Column 6 */}
        <div className="col">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="pixel" />
          ))}
        </div>
      </div>
    </div>
  )
}
