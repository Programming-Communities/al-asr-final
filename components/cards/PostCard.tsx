'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { type Post } from '@/types'
import { formatDate, generateExcerpt, getReadingTime } from '@/utils/helpers'

interface PostCardProps {
  post: Post
  variant?: 'horizontal' | 'vertical'
  showExcerpt?: boolean
  showMeta?: boolean
  showCategory?: boolean
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  variant = 'vertical',
  showExcerpt = true,
  showMeta = true,
  showCategory = true,
}) => {
  const { dir } = useLanguage()
  const isRTL = dir === 'rtl'

  const excerpt = generateExcerpt(post.excerpt || post.content || '', 100)
  const readingTime = getReadingTime(post.content)
  const featuredImage = post.featuredImage?.node?.sourceUrl
  const category = post.categories?.nodes?.[0]

  if (variant === 'horizontal') {
    return (
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className={`flex flex-col md:flex-row ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          {/* Image */}
          {featuredImage && (
            <div className="md:w-48 flex-shrink-0">
              <Link href={`/posts/${post.slug}`}>
                <img
                  src={featuredImage}
                  alt={post.title}
                  className="w-full h-48 md:h-full object-cover hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 p-6">
            {showCategory && category && (
              <Link 
                href={`/categories/${category.slug}`}
                className="inline-block mb-3"
              >
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                  {category.name}
                </span>
              </Link>
            )}
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 leading-tight">
              <Link 
                href={`/posts/${post.slug}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {post.title}
              </Link>
            </h3>
            
            {showExcerpt && excerpt && (
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {excerpt}
              </p>
            )}
            
            {showMeta && (
              <div className={`flex items-center text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span>{formatDate(post.date)}</span>
                <span className="mx-2">•</span>
                <span>{readingTime} min read</span>
                {post.author?.node && (
                  <>
                    <span className="mx-2">•</span>
                    <span>By {post.author.node.name}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    )
  }

  // Vertical variant
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      {/* Image */}
      {featuredImage && (
        <div className="aspect-w-16 aspect-h-9">
          <Link href={`/posts/${post.slug}`}>
            <img
              src={featuredImage}
              alt={post.title}
              className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 p-6 flex flex-col">
        {showCategory && category && (
          <Link 
            href={`/categories/${category.slug}`}
            className="inline-block mb-3 self-start"
          >
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
              {category.name}
            </span>
          </Link>
        )}
        
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 leading-tight flex-1">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
          >
            {post.title}
          </Link>
        </h3>
        
        {showExcerpt && excerpt && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1">
            {excerpt}
          </p>
        )}
        
        {showMeta && (
          <div className={`flex items-center text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'flex-row-reverse' : ''} mt-auto pt-4 border-t border-gray-100 dark:border-gray-700`}>
            <span>{formatDate(post.date)}</span>
            <span className="mx-2">•</span>
            <span>{readingTime} min read</span>
          </div>
        )}
      </div>
    </article>
  )
}

export default PostCard