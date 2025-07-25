import React, { useState, useEffect, useCallback } from 'react'
import { HiArrowUp } from 'react-icons/hi'

interface BackToTopProps {
  showAfter?: number
  scrollDuration?: number
  className?: string
}

const BackToTop: React.FC<BackToTopProps> = ({ 
  showAfter = 300, 
  scrollDuration = 500,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    setIsVisible(scrollTop > showAfter)
  }, [showAfter])

  // Show button when page is scrolled down
useEffect(() => {
  let timeoutId: ReturnType<typeof setTimeout>

  const throttledScroll = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(handleScroll, 100)
  }

  handleScroll()

  window.addEventListener('scroll', throttledScroll, { passive: true })
  return () => {
    window.removeEventListener('scroll', throttledScroll)
    clearTimeout(timeoutId)
  }
}, [handleScroll])


  // Smooth scroll to top with animation feedback
  const scrollToTop = useCallback(() => {
    if (isScrolling) return

    setIsScrolling(true)
    
    const startPosition = window.scrollY || document.documentElement.scrollTop
    const startTime = performance.now()

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / scrollDuration, 1)
      
      // Easing function for smooth animation
      const easeInOutCubic = (t: number) => 
        t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

      const currentPosition = startPosition * (1 - easeInOutCubic(progress))
      
      window.scrollTo(0, currentPosition)

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        setIsScrolling(false)
      }
    }

    requestAnimationFrame(animateScroll)
  }, [scrollDuration, isScrolling])

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      scrollToTop()
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      disabled={isScrolling}
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-secfontcolor hover:bg-mainfontcolor active:bg-sobackfontcolor disabled:bg-ssfontcolor text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-40 touch-manipulation min-w-[48px] min-h-[48px] ${
        isScrolling ? 'animate-pulse cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      aria-label="Back to top"
      title="Back to top"
    >
      <HiArrowUp 
        className={`h-5 w-5 transition-transform duration-200 ${
          isScrolling ? 'animate-bounce' : ''
        }`} 
      />
    </button>
  )
}

export default BackToTop