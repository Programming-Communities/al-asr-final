'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { type Category } from '@/types'

interface CategoryCardProps {
  category: Category
  showCount?: boolean
  showDescription?: boolean
  variant?: 'default' | 'minimal' | 'featured'
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  showCount = true,
  showDescription = false,
  variant = 'default',
}) => {
  const { dir } = useLanguage()
  const isRTL = dir === 'rtl'

  if (variant === 'minimal') {
    return (
      <Link
        href={`/categories/${category.slug}`}
        className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all duration-300 group"
      >
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
            {category.name}
          </h3>
          {showCount && category.count !== undefined && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {category.count} posts
            </p>
          )}
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/categories/${category.slug}`}
        className="block relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-500 z-10"></div>
        
        <div className="relative z-20 p-8 text-white h-64 flex flex-col justify-end">
          <h3 className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300">
            {category.name}
          </h3>
          
          {showDescription && category.description && (
            <p className="text-blue-100 mb-4 line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity">
              {category.description}
            </p>
          )}
          
          {showCount && category.count !== undefined && (
            <div className="flex items-center text-blue-200 text-sm">
              <span>{category.count} posts</span>
              <svg 
                className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </div>
          )}
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-blue-600 opacity-90 group-hover:opacity-95 transition-opacity duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px, rgba(255,255,255,0.15)_1px, transparent_0)] bg-[length:20px_20px]"></div>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-6">
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
            {category.name}
          </h3>
          
          {showDescription && category.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 text-sm">
              {category.description}
            </p>
          )}
          
          {showCount && category.count !== undefined && (
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              {!isRTL && (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12" />
                </svg>
              )}
              <span>{category.count} posts</span>
              {isRTL && (
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12" />
                </svg>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard
