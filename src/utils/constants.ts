// Application constants
export const SECTION_IDS = {
  HERO: 'hero',
  ABOUT: 'about',
  PROJECTS: 'projects',
  GALLERY: 'gallery',  // ✅ เพิ่ม gallery
  CONTACT: 'contact',
} as const

export const NAVIGATION_LINKS = [
  { id: SECTION_IDS.HERO, label: 'Home' },
  { id: SECTION_IDS.ABOUT, label: 'About' },
  { id: SECTION_IDS.PROJECTS, label: 'Projects' },
  { id: SECTION_IDS.GALLERY, label: 'Gallery' },  // ✅ เพิ่มในเมนู
  { id: SECTION_IDS.CONTACT, label: 'Contact' },
]

export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 1024,
} as const

// Animation and UI constants
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const

export const SCROLL_OFFSET = 80 // Offset for fixed header when scrolling to sections

// Contact form configuration
export const CONTACT_FORM_CONFIG = {
  MAX_MESSAGE_LENGTH: 1000,
  REQUIRED_FIELDS: ['name', 'email', 'message'],
} as const

// Project display configuration
export const PROJECT_CONFIG = {
  FEATURED_COUNT: 3,
  GRID_COLUMNS: {
    MOBILE: 1,
    TABLET: 2,
    DESKTOP: 3,
  },
} as const