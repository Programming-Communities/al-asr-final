import React from 'react'
import { getPosts } from '@/utils/api'
import { notFound } from 'next/navigation'
import PostCard from '@/components/cards/PostCard'
import AuthorCard from '@/components/cards/AuthorCard'
import { type Post, type Author } from '@/types'

interface AuthorPageProps {
  params: {
    slug: string
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const postsResponse = await getPosts(20) // In real implementation, filter by author
  const posts = postsResponse.data?.posts.nodes || []

  if (posts.length === 0) {
    notFound()
  }

  // Mock author data - in real implementation, fetch author by slug
  const author: Author = {
    id: '1',
    name: params.slug.split('-').map((word: string) => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    slug: params.slug,
    description: 'Experienced writer and journalist with a passion for sharing knowledge and insights.',
    avatar: {
      url: '/api/placeholder/150/150'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Author Header */}
        <div className="mb-12">
          <AuthorCard 
            author={author} 
            postCount={posts.length}
            variant="detailed"
          />
        </div>

        {/* Author's Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Posts by {author.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const authorName = params.slug.split('-').map((word: string) => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return {
    title: `${authorName} - Author - Al-Asr`,
    description: `Read posts by ${authorName} on Al-Asr`,
  }
}