"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import "./Preloader.css"

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

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

    // Simulate loading time, then fade out
    const timeout = setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            setIsVisible(false)
            sessionStorage.setItem("preloadAnimationShown", "true")
            document.body.style.overflow = ""
          }
        })
      }
    }, 2500) // 2.5 seconds loading simulation

    return () => {
      clearTimeout(timeout)
      document.body.style.overflow = ""
    }
  }, [])

  if (!isVisible) return null

  return (
    <div ref={containerRef} className="uiverse-preloader-container">
      <div className="loader">
        <span><span></span><span></span><span></span><span></span></span>
        <div className="base">
          <span></span>
          <div className="face"></div>
        </div>
      </div>
      <div className="longfazers">
        <span></span><span></span><span></span><span></span>
      </div>
    </div>
  )
}
