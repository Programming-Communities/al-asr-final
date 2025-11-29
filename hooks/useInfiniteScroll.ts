'use client'

import { useEffect, useRef, useCallback } from 'react'

interface UseInfiniteScrollOptions {
  hasNextPage: boolean
  isFetching: boolean
  fetchNextPage: () => void
  threshold?: number
  enabled?: boolean
}

export function useInfiniteScroll({
  hasNextPage,
  isFetching,
  fetchNextPage,
  threshold = 100,
  enabled = true,
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver>()
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage && !isFetching && enabled) {
        fetchNextPage()
      }
    },
    [hasNextPage, isFetching, fetchNextPage, enabled]
  )

  useEffect(() => {
    const element = loadMoreRef.current
    if (!element) return

    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: `${threshold}px`,
    })

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleObserver, threshold])

  return { loadMoreRef }
}

// Alternative hook for button-based load more
export function useLoadMore({
  hasNextPage,
  isFetching,
  fetchNextPage,
}: Omit<UseInfiniteScrollOptions, 'threshold' | 'enabled'>) {
  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetching, fetchNextPage])

  return {
    handleLoadMore,
    canLoadMore: hasNextPage && !isFetching,
  }
}
