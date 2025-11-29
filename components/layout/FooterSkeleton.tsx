'use client'

import React from 'react'
import Skeleton from '@/components/ui/Skeleton'

const FooterSkeleton: React.FC = () => {
  return (
    <footer className="bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Main Footer Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section Skeleton */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Skeleton className="w-8 h-8 rounded-lg mr-3" />
              <Skeleton className="w-32 h-6" />
            </div>
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-3/4 h-4 mb-4" />
            <div className="flex space-x-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="w-6 h-6 rounded" />
              ))}
            </div>
          </div>

          {/* Footer Links Skeleton */}
          {[...Array(3)].map((_, colIndex) => (
            <div key={colIndex}>
              <Skeleton className="w-24 h-6 mb-4" />
              <div className="space-y-3">
                {[...Array(4)].map((_, linkIndex) => (
                  <Skeleton key={linkIndex} className="w-32 h-4" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar Skeleton */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <Skeleton className="w-48 h-4 mb-4 md:mb-0" />
          <div className="flex space-x-6">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="w-16 h-4" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSkeleton
