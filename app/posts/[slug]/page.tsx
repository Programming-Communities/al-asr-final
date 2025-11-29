import React from 'react'
import { getPostBySlug, getPosts } from '@/utils/api'
import { notFound } from 'next/navigation'
import PostCard from '@/components/cards/PostCard'
import AdInArticle from '@/components/ads/AdInArticle'
import { type Post, type Tag } from '@/types'
import { formatDate, getReadingTime } from '@/utils/helpers'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const response = await getPosts(100)
  const posts = response.data?.posts.nodes || []
  
  return posts.map((post: Post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { data, error } = await getPostBySlug(params.slug)
  
  if (!data?.post || error) {
    notFound()
  }

  const post = data.post
  const readingTime = getReadingTime(post.content)

  // Split content for ad placement
  const contentParts = post.content.split('</p>')
  const contentWithAds = []

  for (let i = 0; i < contentParts.length; i++) {
    contentWithAds.push(contentParts[i])
    if ((i + 1) % 3 === 0 && i !== contentParts.length - 1) {
      contentWithAds.push(`<div class="my-8"><AdInArticle position="${(i + 1) / 3}" /></div>`)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          {post.categories?.nodes?.[0] && (
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full mb-4">
              {post.categories.nodes[0].name}
            </span>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 text-sm mb-6">
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <span className="mx-2">•</span>
            <span>{readingTime} min read</span>
            {post.author?.node && (
              <>
                <span className="mx-2">•</span>
                <span>By {post.author.node.name}</span>
              </>
            )}
          </div>

          {post.featuredImage?.node && (
            <img
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8"
            />
          )}
        </header>

        {/* Content with Ads */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: contentWithAds.join('</p>') + (contentWithAds[contentWithAds.length - 1].endsWith('</p>') ? '' : '</p>')
          }}
        />

        {/* Tags */}
        {post.tags?.nodes && post.tags.nodes.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.nodes.map((tag: Tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}

export async function generateMetadata({ params }: PostPageProps) {
  const { data } = await getPostBySlug(params.slug)
  
  if (!data?.post) {
    return {
      title: 'Post Not Found',
    }
  }

  const post = data.post
  const seo = post.seo

  return {
    title: seo?.title || post.title,
    description: seo?.metaDesc || post.excerpt,
    openGraph: {
      title: seo?.opengraphTitle || post.title,
      description: seo?.opengraphDescription || post.excerpt,
      images: seo?.opengraphImage ? [seo.opengraphImage.sourceUrl] : 
              post.featuredImage?.node ? [post.featuredImage.node.sourceUrl] : [],
      publishedTime: post.date,
      modifiedTime: post.modified,
      type: 'article',
    },
  }
}