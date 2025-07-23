// Responsive design utilities and breakpoint helpers

export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1600,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS

// Hook to detect current breakpoint
export const useBreakpoint = () => {
  if (typeof window === 'undefined') return 'lg' // Default for SSR
  
  const width = window.innerWidth
  
  if (width < BREAKPOINTS.xs) return 'xs'
  if (width < BREAKPOINTS.sm) return 'sm'
  if (width < BREAKPOINTS.md) return 'md'
  if (width < BREAKPOINTS.lg) return 'lg'
  if (width < BREAKPOINTS.xl) return 'xl'
  if (width < BREAKPOINTS['2xl']) return '2xl'
  return '3xl'
}

// Check if current viewport is mobile
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < BREAKPOINTS.md
}

// Check if current viewport is tablet
export const isTablet = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= BREAKPOINTS.md && window.innerWidth < BREAKPOINTS.lg
}

// Check if current viewport is desktop
export const isDesktop = () => {
  if (typeof window === 'undefined') return true
  return window.innerWidth >= BREAKPOINTS.lg
}

// Touch device detection
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

// Get optimal image size based on viewport
export const getOptimalImageSize = (baseWidth: number, baseHeight: number) => {
  if (typeof window === 'undefined') return { width: baseWidth, height: baseHeight }
  
  const devicePixelRatio = window.devicePixelRatio || 1
  const viewportWidth = window.innerWidth
  
  let scaleFactor = 1
  
  if (viewportWidth < BREAKPOINTS.sm) {
    scaleFactor = 0.8
  } else if (viewportWidth < BREAKPOINTS.md) {
    scaleFactor = 0.9
  }
  
  return {
    width: Math.round(baseWidth * scaleFactor * devicePixelRatio),
    height: Math.round(baseHeight * scaleFactor * devicePixelRatio),
  }
}

// Responsive text sizing helper
export const getResponsiveTextSize = (sizes: {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
}) => {
  const classes = []
  
  if (sizes.xs) classes.push(`text-${sizes.xs}`)
  if (sizes.sm) classes.push(`sm:text-${sizes.sm}`)
  if (sizes.md) classes.push(`md:text-${sizes.md}`)
  if (sizes.lg) classes.push(`lg:text-${sizes.lg}`)
  if (sizes.xl) classes.push(`xl:text-${sizes.xl}`)
  
  return classes.join(' ')
}

// Responsive spacing helper
export const getResponsiveSpacing = (sizes: {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
}, property: 'p' | 'm' | 'px' | 'py' | 'mx' | 'my' = 'p') => {
  const classes = []
  
  if (sizes.xs) classes.push(`${property}-${sizes.xs}`)
  if (sizes.sm) classes.push(`sm:${property}-${sizes.sm}`)
  if (sizes.md) classes.push(`md:${property}-${sizes.md}`)
  if (sizes.lg) classes.push(`lg:${property}-${sizes.lg}`)
  if (sizes.xl) classes.push(`xl:${property}-${sizes.xl}`)
  
  return classes.join(' ')
}