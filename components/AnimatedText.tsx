"use client"

import { useEffect, useState } from "react"

interface AnimatedTextProps {
  texts: string[]
  interval?: number
  className?: string
}

export function AnimatedText({ texts, interval = 2000, className = "" }: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, interval)

    return () => clearInterval(timer)
  }, [texts.length, interval])

  return (
    <span className={`inline-block ${className}`}>
      {texts[currentIndex]}
    </span>
  )
} 