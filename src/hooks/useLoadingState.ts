import { useState, useEffect } from 'react'

interface UseLoadingStateOptions {
  initialDelay?: number
  minLoadingTime?: number
}

export const useLoadingState = (
  isDataReady: boolean = true,
  options: UseLoadingStateOptions = {}
) => {
  const { initialDelay = 0, minLoadingTime = 500 } = options
  const [isLoading, setIsLoading] = useState(true)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    if (!isDataReady) {
      setIsLoading(true)
      return
    }

    const elapsed = Date.now() - startTime
    const remainingTime = Math.max(0, minLoadingTime - elapsed)
    
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, initialDelay + remainingTime)

    return () => clearTimeout(timer)
  }, [isDataReady, initialDelay, minLoadingTime, startTime])

  return isLoading
}

export default useLoadingState