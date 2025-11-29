'use client'

import React from 'react'
import { usePosts } from '@/hooks/usePosts'
import { useCategories } from '@/hooks/useCategories'
import HeroTop from '@/components/banner/HeroTop'
import PostCard from '@/components/cards/PostCard'
import CategoryCard from '@/components/cards/CategoryCard'
import AdTop from '@/components/ads/AdTop'
import AdInFeed from '@/components/ads/AdInFeed'
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroTop 
        title="Welcome to Al-Asr"
        subtitle="Your source for the latest news and insights across multiple languages"
        ctaText="Explore Posts"
        ctaLink="/posts"
      />

      {/* Top Ad */}
      <div className="container mx-auto px-4 py-8">
        <AdTop />
      </div>

      {/* Featured Posts */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Latest Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: Post, index: number) => (
              <React.Fragment key={post.id}>
                <PostCard post={post} />
                {/* Insert ad after every 3rd post */}
                {(index + 1) % 3 === 0 && (
                  <div className="col-span-full">
                    <AdInFeed index={(index + 1) / 3} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Browse Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category: Category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                showCount={true}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}