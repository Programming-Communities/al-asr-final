'use client'

import React from 'react'
import Skeleton from '@/components/ui/Skeleton'

const HeaderSkeleton: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center">
            <div className="lg:hidden mr-4">
              <Skeleton className="w-8 h-8 rounded" />
            </div>
            <div className="flex items-center">
              <Skeleton className="w-8 h-8 rounded-lg mr-3" />
              <Skeleton className="w-32 h-6" />
            </div>
          </div>

          {/* Desktop Navigation Skeleton */}
          <div className="hidden lg:flex items-center space-x-8">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="w-16 h-6" />
            ))}
          </div>

          {/* Right Actions Skeleton */}
          <div className="flex items-center space-x-2">
            <Skeleton className="w-10 h-10 rounded" />
            <Skeleton className="w-10 h-10 rounded" />
            <Skeleton className="w-10 h-10 rounded" />
            <div className="hidden sm:flex space-x-2">
              <Skeleton className="w-20 h-10 rounded-lg" />
              <Skeleton className="w-20 h-10 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderSkeleton
