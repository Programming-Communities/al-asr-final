import React from 'react'
import Skeleton from '@/components/ui/Skeleton'

export default function PostLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Category Skeleton */}
        <Skeleton className="w-24 h-6 mb-4" />
        
        {/* Title Skeleton */}
        <Skeleton className="w-full h-12 mb-4" />
        <Skeleton className="w-3/4 h-12 mb-6" />
        
        {/* Meta Skeleton */}
        <div className="flex space-x-4 mb-8">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-28 h-4" />
        </div>
        
        {/* Featured Image Skeleton */}
        <Skeleton className="w-full h-96 rounded-2xl mb-8" />
        
        {/* Content Skeletons */}
        <div className="space-y-4">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-4/5 h-4" />
        </div>
        
        {/* Ad Skeleton */}
        <div className="my-8">
          <Skeleton className="w-full h-32" />
        </div>
        
        {/* More Content Skeletons */}
        <div className="space-y-4">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>
      </div>
    </div>
  )
}