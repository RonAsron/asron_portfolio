import { skills } from '../data/skills'
import { projects } from '../data/projects'
import { personalInfo } from '../data/personal'

// Helper functions for data access and manipulation

export const getSkillsByCategory = (category: string) => {
  return skills.filter(skill => skill.category === category)
}

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured)
}

export const getProjectById = (id: string) => {
  return projects.find(project => project.id === id)
}

export const getSkillCategories = () => {
  const categories = [...new Set(skills.map(skill => skill.category))]
  return categories.sort()
}

export const getPersonalInfo = () => {
  return personalInfo
}

// Validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Smooth scrolling utility
export const smoothScrollToSection = (sectionId: string, offset: number = 80): void => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - offset
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}