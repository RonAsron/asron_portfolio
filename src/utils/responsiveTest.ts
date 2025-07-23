// Responsive design testing utilities

interface ResponsiveTestResult {
  component: string
  test: string
  passed: boolean
  details?: string
}

export const runResponsiveTests = (): ResponsiveTestResult[] => {
  const results: ResponsiveTestResult[] = []
  
  // Test 1: Check if mobile menu button exists and has proper touch targets
  const mobileMenuButton = document.querySelector('[aria-label*="menu"]')
  results.push({
    component: 'Header',
    test: 'Mobile menu button exists with proper touch targets',
    passed: !!(mobileMenuButton && 
      getComputedStyle(mobileMenuButton).minHeight >= '44px' &&
      getComputedStyle(mobileMenuButton).minWidth >= '44px'),
    details: mobileMenuButton ? 'Found mobile menu button with proper sizing' : 'Mobile menu button not found'
  })
  
  // Test 2: Check if navigation links have proper spacing on mobile
  const navLinks = document.querySelectorAll('nav button, nav a')
  const hasProperTouchTargets = Array.from(navLinks).every(link => {
    const styles = getComputedStyle(link)
    const height = parseInt(styles.minHeight) || parseInt(styles.height)
    return height >= 44
  })
  
  results.push({
    component: 'Navigation',
    test: 'Navigation links have proper touch targets (min 44px)',
    passed: hasProperTouchTargets,
    details: `Checked ${navLinks.length} navigation elements`
  })
  
  // Test 3: Check if buttons have proper touch targets
  const buttons = document.querySelectorAll('button')
  const buttonsWithProperTargets = Array.from(buttons).filter(button => {
    const styles = getComputedStyle(button)
    const height = parseInt(styles.minHeight) || parseInt(styles.height)
    const width = parseInt(styles.minWidth) || parseInt(styles.width)
    return height >= 44 && width >= 44
  })
  
  results.push({
    component: 'Buttons',
    test: 'Buttons have proper touch targets',
    passed: buttonsWithProperTargets.length >= buttons.length * 0.8, // Allow 80% pass rate
    details: `${buttonsWithProperTargets.length}/${buttons.length} buttons have proper touch targets`
  })
  
  // Test 4: Check if images are responsive
  const images = document.querySelectorAll('img')
  const responsiveImages = Array.from(images).filter(img => {
    const styles = getComputedStyle(img)
    return styles.maxWidth === '100%' || styles.width === '100%'
  })
  
  results.push({
    component: 'Images',
    test: 'Images are responsive',
    passed: responsiveImages.length === images.length,
    details: `${responsiveImages.length}/${images.length} images are responsive`
  })
  
  // Test 5: Check if text is readable on mobile (not too small)
  const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6')
  const readableText = Array.from(textElements).filter(element => {
    const styles = getComputedStyle(element)
    const fontSize = parseInt(styles.fontSize)
    return fontSize >= 14 // Minimum readable size on mobile
  })
  
  results.push({
    component: 'Typography',
    test: 'Text is readable on mobile (min 14px)',
    passed: readableText.length >= textElements.length * 0.9, // Allow 90% pass rate
    details: `${readableText.length}/${textElements.length} text elements are readable`
  })
  
  // Test 6: Check if layout doesn't cause horizontal scroll
  const bodyWidth = document.body.scrollWidth
  const viewportWidth = window.innerWidth
  
  results.push({
    component: 'Layout',
    test: 'No horizontal scroll on mobile',
    passed: bodyWidth <= viewportWidth + 5, // Allow 5px tolerance
    details: `Body width: ${bodyWidth}px, Viewport: ${viewportWidth}px`
  })
  
  // Test 7: Check if form inputs are properly sized for mobile
  const inputs = document.querySelectorAll('input, textarea, select')
  const properInputs = Array.from(inputs).filter(input => {
    const styles = getComputedStyle(input)
    const height = parseInt(styles.height) || parseInt(styles.minHeight)
    return height >= 44
  })
  
  results.push({
    component: 'Forms',
    test: 'Form inputs have proper touch targets',
    passed: properInputs.length === inputs.length,
    details: `${properInputs.length}/${inputs.length} form inputs have proper sizing`
  })
  
  return results
}

// Function to display test results in console
export const displayTestResults = (results: ResponsiveTestResult[]) => {
  console.group('🔍 Responsive Design Test Results')
  
  const passed = results.filter(r => r.passed).length
  const total = results.length
  
  console.log(`✅ Overall Score: ${passed}/${total} tests passed (${Math.round(passed/total*100)}%)`)
  console.log('')
  
  results.forEach(result => {
    const icon = result.passed ? '✅' : '❌'
    console.log(`${icon} ${result.component}: ${result.test}`)
    if (result.details) {
      console.log(`   ${result.details}`)
    }
  })
  
  console.groupEnd()
  
  return { passed, total, score: Math.round(passed/total*100) }
}

// Function to run tests automatically when DOM is ready
export const autoRunResponsiveTests = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        const results = runResponsiveTests()
        displayTestResults(results)
      }, 1000) // Wait 1 second for components to render
    })
  } else {
    setTimeout(() => {
      const results = runResponsiveTests()
      displayTestResults(results)
    }, 1000)
  }
}

// Export for manual testing
export const testResponsiveDesign = () => {
  const results = runResponsiveTests()
  return displayTestResults(results)
}