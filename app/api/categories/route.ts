import { NextRequest, NextResponse } from 'next/server'

// Mock categories data
const categories = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    description: 'Latest technology news and trends',
    count: 45
  },
  {
    id: '2',
    name: 'Business',
    slug: 'business', 
    description: 'Business insights and strategies',
    count: 32
  },
  {
    id: '3',
    name: 'Health',
    slug: 'health',
    description: 'Health and wellness tips',
    count: 28
  },
  {
    id: '4',
    name: 'Entertainment',
    slug: 'entertainment',
    description: 'Entertainment news and reviews',
    count: 19
  }
]

export async function GET() {
  return NextResponse.json({ categories })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newCategory = {
      id: (categories.length + 1).toString(),
      slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      count: 0,
      ...body
    }

    categories.push(newCategory)

    return NextResponse.json({ category: newCategory }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}