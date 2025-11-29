'use client'

import React from 'react'
import { usePosts } from '@/hooks/usePosts'
import { useLanguage } from '@/hooks/useLanguage'
import PostCard from '@/components/cards/PostCard'
import AdRight from '@/components/ads/AdRight'
import { type Post } from '@/types'

const SidebarRight: React.FC = () => {
  const { posts: featuredPosts, isLoading } = usePosts(5)
  const { dir } = useLanguage()
  const isRTL = dir === 'rtl'

  return (
    <aside className={`w-80 ${isRTL ? 'lg:pl-8' : 'lg:pr-8'} hidden lg:block`}>
      <div className="space-y-6 sticky top-24">
        {/* About Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            About Al-Asr
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            Your multi-language news portal bringing you the latest content in 10 different languages. 
            Stay informed with our diverse range of articles and insights.
          </p>
          <button 
            onClick={() => window.location.href = '/about'}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Learn More
          </button>
        </div>

        {/* Right Ad */}
        <AdRight />

        {/* Featured Posts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Featured Posts
          </h3>
          <div className="space-y-4">
            {isLoading ? (
              // Loading skeletons
              [...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="flex space-x-3">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="w-3/4 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              featuredPosts.slice(0, 3).map((post: Post) => (
                <div
                  key={post.id}
                  className="flex space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
                  onClick={() => window.location.href = `/posts/${post.slug}`}
                >
                  {post.featuredImage?.node && (
                    <img
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.title}
                      className="w-16 h-16 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                      {post.title}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Follow Us
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Twitter', icon: '🐦', color: 'bg-blue-500 hover:bg-blue-600' },
              { name: 'Facebook', icon: '📘', color: 'bg-blue-700 hover:bg-blue-800' },
              { name: 'LinkedIn', icon: '💼', color: 'bg-blue-600 hover:bg-blue-700' },
              { name: 'Instagram', icon: '📷', color: 'bg-pink-500 hover:bg-pink-600' },
            ].map((social) => (
              <button
                key={social.name}
                className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-white text-sm font-medium transition-colors ${social.color}`}
              >
                <span>{social.icon}</span>
                <span>{social.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-green-600 to-blue-700 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Site Stats</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">1.2K</div>
              <div className="text-green-200 text-xs">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold">45</div>
              <div className="text-green-200 text-xs">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold">50K</div>
              <div className="text-green-200 text-xs">Readers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">10</div>
              <div className="text-green-200 text-xs">Languages</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SidebarRight
