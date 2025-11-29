import React from 'react'
import Skeleton from '@/components/ui/Skeleton'

const CategoryCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
      {/* Title Skeleton */}
      <Skeleton className="w-3/4 h-6 mb-3" />
      
      {/* Description Skeleton */}
      <div className="space-y-2 mb-4">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
      </div>
      
      {/* Count Skeleton */}
      <Skeleton className="w-16 h-4" />
    </div>
  )
}

export default CategoryCardSkeleton