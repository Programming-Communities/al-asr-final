import React from 'react'
import Skeleton from '@/components/ui/Skeleton'

const AuthorCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center animate-pulse">
      {/* Avatar Skeleton */}
      <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" variant="circular" />
      
      {/* Name Skeleton */}
      <Skeleton className="w-32 h-5 mx-auto mb-2" />
      
      {/* Post Count Skeleton */}
      <Skeleton className="w-20 h-4 mx-auto mb-3" />
      
      {/* Bio Skeleton */}
      <div className="space-y-2">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-2/3 h-3 mx-auto" />
      </div>
    </div>
  )
}

export default AuthorCardSkeleton