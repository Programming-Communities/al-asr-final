'use client'

import React from 'react'
import { usePosts } from '@/hooks/usePosts'
import { useCategories } from '@/hooks/useCategories'
import HeroTop from '@/components/banner/HeroTop'
import PostCard from '@/components/cards/PostCard'
import CategoryCard from '@/components/cards/CategoryCard'
import AdInFeed from '@/components/ads/AdInFeed'
import AdLeft from '@/components/ads/AdLeft'
import AdRight from '@/components/ads/AdRight'
import SidebarLeft from '@/components/layout/SidebarLeft'
import SidebarRight from '@/components/layout/SidebarRight'
import { type Post, type Category } from '@/types'

interface HomePageProps {
  params: {
    lang: string
  }
}

export default function HomePage({ params }: HomePageProps) {
  const { posts, isLoading: postsLoading } = usePosts(10)
  const { categories, isLoading: categoriesLoading } = useCategories()

  if (postsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <HeroTop 
        title="Welcome to Al-Asr"
        subtitle="Your source for the latest news and insights across multiple languages"
        ctaText="Explore Posts"
        ctaLink="/posts"
        backgroundImage="/api/placeholder/1200/600"
      />

      {/* Main Content with Sidebars */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar & Ad */}
          <div className="lg:w-1/4 space-y-6">
            <SidebarLeft />
            <AdLeft />
          </div>

          {/* Main Content */}
          <div className="lg:w-2/4">
            {/* Featured Posts */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Latest Posts
                </h2>
                <a 
                  href="/posts" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  View All →
                </a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post: Post, index: number) => (
                  <React.Fragment key={post.id}>
                    <PostCard post={post} />
                    {/* Insert ad after every 4th post */}
                    {(index + 1) % 4 === 0 && (
                      <div className="col-span-full">
                        <AdInFeed index={(index + 1) / 4} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </section>

            {/* Categories Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Browse Categories
                </h2>
                <a 
                  href="/categories" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  View All →
                </a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.slice(0, 6).map((category: Category) => (
                  <CategoryCard 
                    key={category.id} 
                    category={category} 
                    showCount={true}
                    variant="minimal"
                  />
                ))}
              </div>
            </section>

            {/* Trending Posts */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Trending Now
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {posts.slice(0, 3).map((post: Post, index: number) => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    variant="horizontal"
                    showExcerpt={true}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar & Ad */}
          <div className="lg:w-1/4 space-y-6">
            <SidebarRight />
            <AdRight />
          </div>
        </div>
      </div>
    </div>
  )
}