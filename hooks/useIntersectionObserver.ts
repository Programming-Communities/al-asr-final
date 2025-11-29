'use client'

import { useState, useEffect, useRef } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false,
}: UseIntersectionObserverOptions = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<Element>(null)

  const frozen = entry?.isIntersecting && freezeOnceVisible

  useEffect(() => {
    const element = elementRef.current
    if (!element || frozen) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)
        setIsVisible(entry.isIntersecting)
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, frozen])

  return { elementRef, isVisible, entry }
}

// Simplified version for lazy loading
export function useLazyLoad(options?: UseIntersectionObserverOptions) {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    ...options,
  })

  return { elementRef, isVisible }
}

// For infinite scroll
export function useInfiniteScrollObserver(
  callback: () => void,
  options?: UseIntersectionObserverOptions
) {
  const { elementRef, isVisible } = useIntersectionObserver(options)

  useEffect(() => {
    if (isVisible) {
      callback()
    }
  }, [isVisible, callback])

  return elementRef
}
