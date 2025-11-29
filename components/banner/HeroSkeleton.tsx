import React from 'react'
import Skeleton from '@/components/ui/Skeleton'

const HeroSkeleton: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 py-20 px-4 animate-pulse">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-2xl">
          {/* Title Skeleton */}
          <Skeleton className="w-3/4 h-12 mb-4" />
          <Skeleton className="w-full h-12 mb-6" />
          
          {/* Subtitle Skeleton */}
          <Skeleton className="w-2/3 h-6 mb-8" />
          
          {/* Button Skeletons */}
          <div className="flex flex-wrap gap-4">
            <Skeleton className="w-32 h-12" />
            <Skeleton className="w-28 h-12" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSkeleton