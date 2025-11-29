'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { usePosts, useCategories } from '@/hooks/usePosts'
import PostCard from '@/components/cards/PostCard'
import CategoryCard from '@/components/cards/CategoryCard'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { type Post, type Category } from '@/types'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [activeTab, setActiveTab] = useState<'posts' | 'categories'>('posts')
  
  const { posts, isLoading: postsLoading } = usePosts(50)
  const { categories, isLoading: categoriesLoading } = useCategories()

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (category.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled in real-time through state
  }

  useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Search Content
          </h1>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Search posts, categories, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Results */}
        {searchQuery && (
          <div className="mb-8">
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
              <button
                onClick={() => setActiveTab('posts')}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === 'posts'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Posts ({filteredPosts.length})
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === 'categories'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Categories ({filteredCategories.length})
              </button>
            </div>

            {activeTab === 'posts' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Posts Found: {filteredPosts.length}
                </h2>
                {postsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 animate-pulse"></div>
                    ))}
                  </div>
                ) : filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post: Post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No posts found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your search terms or browse all posts.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'categories' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Categories Found: {filteredCategories.length}
                </h2>
                {categoriesLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32 animate-pulse"></div>
                    ))}
                  </div>
                ) : filteredCategories.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCategories.map((category: Category) => (
                      <CategoryCard key={category.id} category={category} showCount={true} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No categories found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try different search terms or browse all categories.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Browse All (when no search query) */}
        {!searchQuery && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Browse Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.slice(0, 4).map((post: Post) => (
                  <PostCard key={post.id} post={post} variant="horizontal" />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Browse Categories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {categories.slice(0, 6).map((category: Category) => (
                  <CategoryCard key={category.id} category={category} variant="minimal" />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Search - Al-Asr',
  description: 'Search through all posts and categories on Al-Asr.',
}
