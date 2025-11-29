'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { getPosts, getPostBySlug } from '@/utils/api'
import { type Post, type PostsResponse } from '@/types'

const postsFetcher = (query: string, first: number, after?: string) => 
  getPosts(first, after)

const postFetcher = (slug: string) => 
  getPostBySlug(slug)

export function usePosts(first: number = 10) {
  const getKey = (pageIndex: number, previousPageData: PostsResponse) => {
    if (previousPageData && !previousPageData.posts.pageInfo.hasNextPage) return null
    if (pageIndex === 0) return ['posts', first, undefined]
    return ['posts', first, previousPageData.posts.pageInfo.endCursor]
  }

  const { data, error, size, setSize, isLoading, isValidating } = useSWRInfinite(
    getKey,
    ([, first, after]: [string, number, string | undefined]) => postsFetcher('', first, after),
    {
      revalidateFirstPage: false,
      parallel: true,
    }
  )

  const posts = data?.flatMap(page => page.data?.posts.nodes || []) || []
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isReachingEnd = data?.[data.length - 1]?.data?.posts.pageInfo.hasNextPage === false
  const isEmpty = data?.[0]?.data?.posts.nodes.length === 0

  const loadMore = () => {
    if (!isLoadingMore && !isReachingEnd) {
      setSize(size + 1)
    }
  }

  return {
    posts,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    loadMore,
    size,
  }
}

export function usePost(slug: string) {
  const { data, error, isLoading } = useSWR(
    slug ? ['post', slug] : null,
    ([, slug]: [string, string]) => postFetcher(slug),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  )

  return {
    post: data?.data?.post || null,
    error,
    isLoading,
  }
}

export function useFeaturedPosts(limit: number = 5) {
  const { data, error, isLoading } = useSWR(
    ['featured-posts', limit],
    () => getPosts(limit),
    {
      revalidateOnFocus: false,
    }
  )

  return {
    posts: data?.data?.posts.nodes || [],
    error,
    isLoading,
  }
}

export function useRelatedPosts(categoryIds: string[], currentPostId: string, limit: number = 3) {
  const { data, error, isLoading } = useSWR(
    categoryIds.length > 0 ? ['related-posts', categoryIds.join(','), currentPostId, limit] : null,
    () => getPosts(limit), // This would need a proper related posts query
    {
      revalidateOnFocus: false,
    }
  )

  const relatedPosts = (data?.data?.posts.nodes || [])
    .filter((post: Post) => post.id !== currentPostId)
    .slice(0, limit)

  return {
    posts: relatedPosts,
    error,
    isLoading,
  }
}