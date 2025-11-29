import React from 'react'
import Skeleton from '@/components/ui/Skeleton'

const PostCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-w-16 aspect-h-9">
        <Skeleton className="w-full h-48" variant="rectangular" />
      </div>
      
      {/* Content Skeleton */}
      <div className="p-6">
        {/* Category Skeleton */}
        <Skeleton className="w-20 h-6 mb-3" />
        
        {/* Title Skeleton */}
        <Skeleton className="w-full h-6 mb-2" />
        <Skeleton className="w-3/4 h-6 mb-4" />
        
        {/* Excerpt Skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-2/3 h-4" />
        </div>
        
        {/* Meta Skeleton */}
        <div className="flex items-center space-x-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-16 h-4" />
        </div>
      </div>
    </div>
  )
}

export default PostCardSkeleton