// utils/api.ts
import { GRAPHQL_ENDPOINT } from './constants'

// Fallback implementation if graphql-request is not available
const fallbackFetcher = async (query: string, variables?: any) => {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('GraphQL request failed:', error)
    throw error
  }
}

// Try to use graphql-request if available, otherwise use fallback
let graphqlRequest: any = null

try {
  // Dynamic import to avoid build-time errors
  graphqlRequest = require('graphql-request')
} catch (error) {
  console.warn('graphql-request not available, using fallback fetcher')
}

export const fetcher = (query: string, variables?: any) => {
  if (graphqlRequest && graphqlRequest.request) {
    return graphqlRequest.request(GRAPHQL_ENDPOINT, query, variables)
  } else {
    return fallbackFetcher(query, variables)
  }
}

export const fetchAPI = async (query: string, variables?: any) => {
  try {
    const data = await fetcher(query, variables)
    return { data, error: null }
  } catch (error) {
    console.error('API Error:', error)
    return { data: null, error }
  }
}

export const getPosts = async (first: number = 10, after?: string) => {
  const query = `
    query GetPosts($first: Int!, $after: String) {
      posts(first: $first, after: $after) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          author {
            node {
              name
              slug
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `
  return fetchAPI(query, { first, after })
}

export const getPostBySlug = async (slug: string) => {
  const query = `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        content
        excerpt
        date
        modified
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
            slug
            description
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
        }
      }
    }
  `
  return fetchAPI(query, { slug })
}

export const getCategories = async () => {
  const query = `
    query GetCategories {
      categories {
        nodes {
          id
          name
          slug
          description
          count
        }
      }
    }
  `
  return fetchAPI(query)
}

export const getCategoryBySlug = async (slug: string) => {
  const query = `
    query GetCategoryBySlug($slug: ID!) {
      category(id: $slug, idType: SLUG) {
        id
        name
        slug
        description
        seo {
          title
          metaDesc
        }
      }
    }
  `
  return fetchAPI(query, { slug })
}

// Mock data for development when WordPress is not available
const mockPosts = [
  {
    id: '1',
    title: 'Welcome to Al-Asr - Multi-language News Platform',
    slug: 'welcome-to-al-asr',
    excerpt: 'Discover our new multi-language news platform with support for 10 languages and modern features.',
    content: '<p>Welcome to Al-Asr, your new multi-language news platform!</p><p>We support 10 languages including English, Urdu, Arabic, Hindi, Farsi, Punjabi, Sindhi, Pashto, Turkish, and French.</p>',
    date: '2024-01-15T10:00:00Z',
    author: { node: { name: 'Admin', slug: 'admin' } },
    categories: { nodes: [{ name: 'Announcements', slug: 'announcements' }] },
    featuredImage: {
      node: {
        sourceUrl: '/api/placeholder/800/400',
        altText: 'Al-Asr Platform'
      }
    }
  },
  {
    id: '2',
    title: 'Getting Started with Next.js 14',
    slug: 'nextjs-14-features',
    excerpt: 'Learn about the latest features in Next.js 14 and how to build modern web applications.',
    content: '<p>Next.js 14 brings many exciting new features...</p>',
    date: '2024-01-14T14:30:00Z',
    author: { node: { name: 'Tech Writer', slug: 'tech-writer' } },
    categories: { nodes: [{ name: 'Technology', slug: 'technology' }] },
    featuredImage: {
      node: {
        sourceUrl: '/api/placeholder/800/400',
        altText: 'Next.js 14'
      }
    }
  }
]

// Fallback functions for development
export const getMockPosts = async (first: number = 10) => {
  return {
    data: {
      posts: {
        nodes: mockPosts.slice(0, first),
        pageInfo: {
          hasNextPage: mockPosts.length > first,
          endCursor: 'mock-cursor'
        }
      }
    },
    error: null
  }
}

export const getMockPostBySlug = async (slug: string) => {
  const post = mockPosts.find(p => p.slug === slug)
  return {
    data: {
      post: post || null
    },
    error: post ? null : 'Post not found'
  }
}