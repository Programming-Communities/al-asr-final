'use client'

import React from 'react'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import Loader from './Loader'

interface InfiniteScrollProps {
  hasNextPage: boolean
  isFetching: boolean
  fetchNextPage: () => void
  children: React.ReactNode
  loader?: React.ReactNode
  endMessage?: React.ReactNode
  className?: string
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  hasNextPage,
  isFetching,
  fetchNextPage,
  children,
  loader,
  endMessage,
  className,
}) => {
  const { loadMoreRef } = useInfiniteScroll({
    hasNextPage,
    isFetching,
    fetchNextPage,
    threshold: 100,
  })

  const defaultLoader = (
    <div className="flex justify-center py-8">
      <Loader size="lg" />
    </div>
  )

  const defaultEndMessage = (
    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
      You've reached the end!
    </div>
  )

  return (
    <div className={className}>
      {children}
      
      {isFetching && (loader || defaultLoader)}
      
      {hasNextPage && !isFetching && (
        <div ref={loadMoreRef} className="h-4" />
      )}
      
      {!hasNextPage && !isFetching && endMessage && (
        <div>{endMessage || defaultEndMessage}</div>
      )}
    </div>
  )
}

export default InfiniteScroll
