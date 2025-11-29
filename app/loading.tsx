import React from 'react'
import Loader from '@/components/ui/Loader'

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        {/* Logo/Spinner */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">AA</span>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="mb-4">
          <Loader size="lg" variant="spinner" />
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Loading Al-Asr
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Preparing your content...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 w-64 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-1">
          <div 
            className="bg-blue-600 h-1 rounded-full animate-pulse"
            style={{
              width: '60%',
              animation: 'pulse 2s ease-in-out infinite'
            }}
          />
        </div>

        {/* Loading Tips */}
        <div className="mt-8 max-w-sm mx-auto">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Tip:</strong> Content is loading faster with our optimized caching system
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto">
          {[
            { icon: '🌍', text: 'Multi-language' },
            { icon: '🎨', text: '4 Themes' },
            { icon: '⚡', text: 'Fast Loading' },
            { icon: '📱', text: 'Mobile Ready' }
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm"
            >
              <span>{feature.icon}</span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Alternative loading component for smaller loads
export function InlineLoading() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <Loader size="md" />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Loading...
        </p>
      </div>
    </div>
  )
}

// Skeleton loading for content areas
export function ContentLoading() {
  return (
    <div className="animate-pulse">
      <div className="space-y-4">
        {/* Header skeleton */}
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        
        {/* Content skeleton */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
        
        {/* Action skeleton */}
        <div className="flex space-x-4 pt-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
      </div>
    </div>
  )
}