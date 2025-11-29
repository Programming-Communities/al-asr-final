'use client'

import React from 'react'
import { useCategories } from '@/hooks/useCategories'
import { useLanguage } from '@/hooks/useLanguage'
import CategoryCard from '@/components/cards/CategoryCard'
import AdLeft from '@/components/ads/AdLeft'
import { type Category } from '@/types'

const SidebarLeft: React.FC = () => {
  const { categories, isLoading } = useCategories()
  const { dir } = useLanguage()
  const isRTL = dir === 'rtl'

  const popularCategories = categories
    .filter((category: Category) => (category.count || 0) > 0)
    .sort((a: Category, b: Category) => (b.count || 0) - (a.count || 0))
    .slice(0, 8)

  return (
    <aside className={`w-80 ${isRTL ? 'lg:pr-8' : 'lg:pl-8'} hidden lg:block`}>
      <div className="space-y-6 sticky top-24">
        {/* Categories Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Popular Categories
          </h3>
          <div className="space-y-3">
            {isLoading ? (
              // Loading skeletons
              [...Array(6)].map((_, index) => (
                <div key={index} className="flex items-center space-x-3 animate-pulse">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                    <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))
            ) : (
              popularCategories.map((category: Category) => (
                <div
                  key={category.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
                  onClick={() => window.location.href = `/categories/${category.slug}`}
                >
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      {category.count || 0}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </h4>
                    {category.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <svg 
                    className={`w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${isRTL ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Left Ad */}
        <AdLeft />

        {/* Trending Tags */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Trending Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Technology', 'React', 'NextJS', 'WordPress', 'JavaScript', 'TypeScript', 'Web Development', 'CSS'].map((tag, index) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
                onClick={() => window.location.href = `/tags/${tag.toLowerCase()}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
          <p className="text-blue-100 text-sm mb-4">
            Get the latest posts delivered to your inbox.
          </p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            />
            <button className="w-full bg-white text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SidebarLeft
