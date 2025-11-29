import React from 'react'
import { getCategoryBySlug, getPosts } from '@/utils/api'
import { notFound } from 'next/navigation'
import PostCard from '@/components/cards/PostCard'
import AdInFeed from '@/components/ads/AdInFeed'
import { type Post, type Category } from '@/types'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  // This would typically fetch all categories
  return [
    { slug: 'technology' },
    { slug: 'business' },
    { slug: 'health' },
    { slug: 'entertainment' },
  ]
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [categoryResponse, postsResponse] = await Promise.all([
    getCategoryBySlug(params.slug),
    getPosts(20) // In real implementation, filter by category
  ])

  if (!categoryResponse.data?.category) {
    notFound()
  }

  const category = categoryResponse.data.category
  const posts = postsResponse.data?.posts.nodes || []

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
          <div className="mt-4 text-gray-500 dark:text-gray-400">
            {category.count || posts.length} posts
          </div>
        </header>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: Post, index: number) => (
            <React.Fragment key={post.id}>
              <PostCard post={post} />
              {/* Insert ad after every 6th post */}
              {(index + 1) % 6 === 0 && (
                <div className="col-span-full">
                  <AdInFeed index={(index + 1) / 6} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              There are no posts in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { data } = await getCategoryBySlug(params.slug)
  
  if (!data?.category) {
    return {
      title: 'Category Not Found',
    }
  }

  const category = data.category
  const seo = category.seo

  return {
    title: seo?.title || `${category.name} - Al-Asr`,
    description: seo?.metaDesc || category.description || `Browse ${category.name} posts on Al-Asr`,
  }
}