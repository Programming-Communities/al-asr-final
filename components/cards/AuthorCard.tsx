'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { type Author } from '@/types'

interface AuthorCardProps {
  author: Author
  showBio?: boolean
  postCount?: number
  variant?: 'default' | 'compact' | 'detailed'
}

const AuthorCard: React.FC<AuthorCardProps> = ({
  author,
  showBio = true,
  postCount,
  variant = 'default',
}) => {
  const { dir } = useLanguage()
  const isRTL = dir === 'rtl'

  const avatarUrl = author.avatar?.url || '/api/placeholder/100/100'

  if (variant === 'compact') {
    return (
      <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <img
          src={avatarUrl}
          alt={author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <Link
            href={`/authors/${author.slug}`}
            className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {author.name}
          </Link>
          {postCount !== undefined && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {postCount} posts
            </p>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'detailed') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className={`flex flex-col sm:flex-row items-center ${isRTL ? 'sm:flex-row-reverse' : ''} gap-4`}>
          <img
            src={avatarUrl}
            alt={author.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
          />
          <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'} text-center sm:text-left`}>
            <Link
              href={`/authors/${author.slug}`}
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors block mb-2"
            >
              {author.name}
            </Link>
            
            {postCount !== undefined && (
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {postCount} published posts
              </p>
            )}
            
            {showBio && author.description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {author.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link
            href={`/authors/${author.slug}`}
            className={`inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium ${
              isRTL ? 'flex-row-reverse' : ''
            }`}
          >
            <span>View all posts</span>
            <svg 
              className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-5 text-center hover:shadow-lg transition-shadow duration-300">
      <img
        src={avatarUrl}
        alt={author.name}
        className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border-2 border-white dark:border-gray-800 shadow-sm"
      />
      
      <Link
        href={`/authors/${author.slug}`}
        className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors block mb-2"
      >
        {author.name}
      </Link>
      
      {postCount !== undefined && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
          {postCount} posts
        </p>
      )}
      
      {showBio && author.description && (
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {author.description}
        </p>
      )}
    </div>
  )
}

export default AuthorCard
