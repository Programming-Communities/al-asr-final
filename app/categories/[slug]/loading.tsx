import React from 'react'
import Skeleton from '@/components/ui/Skeleton'
import PostCardSkeleton from '@/components/cards/PostCardSkeleton'

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="w-64 h-12 mx-auto mb-4" />
          <Skeleton className="w-96 h-6 mx-auto mb-2" />
          <Skeleton className="w-32 h-4 mx-auto" />
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}