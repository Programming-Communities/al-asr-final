'use client'

import React from 'react'
import Skeleton from '@/components/ui/Skeleton'

const SidebarSkeleton: React.FC = () => {
  return (
    <aside className="w-80 hidden lg:block">
      <div className="space-y-6 sticky top-24">
        {/* Categories Section Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <Skeleton className="w-32 h-6 mb-4" />
          <div className="space-y-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="w-3/4 h-4 mb-1" />
                  <Skeleton className="w-1/2 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Skeleton */}
        <Skeleton className="w-full h-32 rounded-lg" />

        {/* Trending Tags Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <Skeleton className="w-24 h-6 mb-4" />
          <div className="flex flex-wrap gap-2">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} className="w-16 h-6 rounded-full" />
            ))}
          </div>
        </div>

        {/* Newsletter Skeleton */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg p-6">
          <Skeleton className="w-24 h-6 mb-2 bg-blue-500" />
          <Skeleton className="w-full h-4 mb-4 bg-blue-500" />
          <div className="space-y-3">
            <Skeleton className="w-full h-8 rounded-lg bg-blue-500" />
            <Skeleton className="w-full h-8 rounded-lg bg-blue-500" />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SidebarSkeleton
