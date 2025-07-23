import { useState, useEffect, useCallback } from 'react'

interface UseScrollSpyOptions {
  offset?: number
  throttleMs?: number
}

/**
 * Custom hook for scroll spy functionality
 * Detects which section is currently active based on scroll position
 */
export const useScrollSpy = (
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
) => {
  const { offset = 100, throttleMs = 100 } = options
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '')

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + offset

    // Find the section that is currently in view
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const sectionId = sectionIds[i]
      const element = document.getElementById(sectionId)
      
      if (element) {
        const sectionTop = element.offsetTop
        const sectionHeight = element.offsetHeight
        const sectionBottom = sectionTop + sectionHeight

        // Check if the scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(sectionId)
          break
        }
        
        // Special case for the last section - if we're past all sections, 
        // make sure the last one is active
        if (i === sectionIds.length - 1 && scrollPosition >= sectionTop) {
          setActiveSection(sectionId)
          break
        }
      }
    }
  }, [sectionIds, offset])

  // Throttle scroll events for better performance
  const throttledHandleScroll = useCallback(() => {
    let timeoutId: number
    
    return () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, throttleMs)
    }
  }, [handleScroll, throttleMs])

  useEffect(() => {
    const throttledScroll = throttledHandleScroll()
    
    // Set initial active section
    handleScroll()
    
    // Add scroll event listener
    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [handleScroll, throttledHandleScroll])

  return activeSection
}