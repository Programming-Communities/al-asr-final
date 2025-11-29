import React from 'react'
import { getPosts } from '@/utils/api'
import { notFound } from 'next/navigation'
import PostCard from '@/components/cards/PostCard'
import { type Post } from '@/types'

interface TagPageProps {
  params: {
    slug: string
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const postsResponse = await getPosts(20) // In real implementation, filter by tag
  const posts = postsResponse.data?.posts.nodes || []

  if (posts.length === 0) {
    notFound()
  }

  const tagName = params.slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Tag Header */}
        <header className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
            Tag
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {tagName}
          </h1>
          <div className="text-gray-500 dark:text-gray-400">
            {posts.length} posts tagged with "{tagName}"
          </div>
        </header>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: TagPageProps) {
  const tagName = params.slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return {
    title: `${tagName} - Tag - Al-Asr`,
    description: `Browse posts tagged with "${tagName}" on Al-Asr`,
  }
}