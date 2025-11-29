import { NextRequest, NextResponse } from 'next/server'

// Mock posts data
let posts = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14',
    slug: 'getting-started-with-nextjs-14',
    content: '<p>Next.js 14 introduces many exciting new features...</p>',
    excerpt: 'Learn about the latest features in Next.js 14',
    author: { id: '1', name: 'Admin User' },
    categories: [{ id: '1', name: 'Technology', slug: 'technology' }],
    tags: [{ id: '1', name: 'Next.js' }, { id: '2', name: 'React' }],
    featuredImage: { url: '/api/placeholder/800/400' },
    date: '2024-01-15T10:00:00Z',
    status: 'published'
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  let filteredPosts = posts.filter(post => post.status === 'published')

  // Filter by category
  if (category) {
    filteredPosts = filteredPosts.filter(post => 
      post.categories.some(cat => cat.slug === category)
    )
  }

  // Search posts
  if (search) {
    filteredPosts = filteredPosts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase())
    )
  }

  // Pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

  return NextResponse.json({
    posts: paginatedPosts,
    pagination: {
      current: page,
      total: Math.ceil(filteredPosts.length / limit),
      hasNext: endIndex < filteredPosts.length,
      hasPrev: page > 1
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newPost = {
      id: (posts.length + 1).toString(),
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      date: new Date().toISOString(),
      status: 'published',
      ...body
    }

    posts.push(newPost)

    return NextResponse.json({ post: newPost }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}