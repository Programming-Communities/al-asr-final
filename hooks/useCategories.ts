'use client'

import useSWR from 'swr'
import { getCategories, getCategoryBySlug } from '@/utils/api'
import { type Category } from '@/types'

const categoriesFetcher = () => getCategories()
const categoryFetcher = (slug: string) => getCategoryBySlug(slug)

export function useCategories() {
  const { data, error, isLoading } = useSWR(
    'categories',
    categoriesFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
    }
  )

  return {
    categories: data?.data?.categories.nodes || [],
    error,
    isLoading,
  }
}

export function useCategory(slug: string) {
  const { data, error, isLoading } = useSWR(
    slug ? ['category', slug] : null,
    ([, slug]) => categoryFetcher(slug),
    {
      revalidateOnFocus: false,
    }
  )

  return {
    category: data?.data?.category || null,
    error,
    isLoading,
  }
}

export function usePopularCategories(limit: number = 10) {
  const { categories, error, isLoading } = useCategories()

  const popularCategories = categories
    .filter((category: Category) => (category.count || 0) > 0)
    .sort((a: Category, b: Category) => (b.count || 0) - (a.count || 0))
    .slice(0, limit)

  return {
    categories: popularCategories,
    error,
    isLoading,
  }
}
