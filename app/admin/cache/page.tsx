'use client'

import React, { useState } from 'react'
import Button from '@/components/ui/Button'

export default function AdminCache() {
  const [isClearing, setIsClearing] = useState(false)
  const [lastCleared, setLastCleared] = useState<string | null>(null)

  const cacheStats = {
    total: '2.4 GB',
    objects: '15,234',
    hitRate: '94.2%',
    memory: '256 MB'
  }

  const handleClearCache = async (type: string) => {
    setIsClearing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setLastCleared(new Date().toLocaleString())
    setIsClearing(false)
    
    alert(`${type} cache cleared successfully!`)
  }

  const handleClearAll = async () => {
    setIsClearing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setLastCleared(new Date().toLocaleString())
    setIsClearing(false)
    
    alert('All caches cleared successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cache Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and clear various caches for optimal performance
          </p>
        </div>

        {/* Last Cleared */}
        {lastCleared && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-800 dark:text-green-200">
                Cache last cleared: {lastCleared}
              </span>
            </div>
          </div>
        )}

        {/* Cache Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {Object.entries(cacheStats).map(([key, value]) => (
            <div
              key={key}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center"
            >
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>

        {/* Cache Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Page Cache',
              description: 'Clear cached pages and static content',
              icon: '📄',
              action: () => handleClearCache('Page')
            },
            {
              title: 'Object Cache',
              description: 'Clear database query results and objects',
              icon: '🗄️',
              action: () => handleClearCache('Object')
            },
            {
              title: 'Transient Cache',
              description: 'Clear temporary data and transients',
              icon: '⏱️',
              action: () => handleClearCache('Transient')
            },
            {
              title: 'CDN Cache',
              description: 'Clear content delivery network cache',
              icon: '🌐',
              action: () => handleClearCache('CDN')
            },
            {
              title: 'Browser Cache',
              description: 'Clear browser-side caching headers',
              icon: '🧭',
              action: () => handleClearCache('Browser')
            },
            {
              title: 'All Caches',
              description: 'Clear all cache types at once',
              icon: '💥',
              action: handleClearAll,
              variant: 'danger' as const
            }
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-4">{item.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
              <Button
                variant={item.variant === 'danger' ? 'danger' : 'outline'}
                size="sm"
                onClick={item.action}
                isLoading={isClearing}
                disabled={isClearing}
                className="w-full"
              >
                Clear {item.title}
              </Button>
            </div>
          ))}
        </div>

        {/* Cache Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Cache Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cache Expiration
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>1 hour</option>
                <option>6 hours</option>
                <option selected>12 hours</option>
                <option>24 hours</option>
                <option>1 week</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cache Method
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>Redis</option>
                <option selected>File System</option>
                <option>Database</option>
              </select>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              defaultChecked
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Enable caching
            </label>
          </div>
          <Button className="mt-4">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}