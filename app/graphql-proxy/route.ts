// app/api/graphql-proxy/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, variables } = body

    // This is a mock implementation for development
    // In production, this would forward to your actual WordPress GraphQL endpoint
    
    // Mock responses based on query
    if (query.includes('GetPosts')) {
      const mockPosts = [
        {
          id: '1',
          title: 'Welcome to Al-Asr - Multi-language News Platform',
          slug: 'welcome-to-al-asr',
          excerpt: 'Discover our new multi-language news platform with support for 10 languages and modern features.',
          date: '2024-01-15T10:00:00Z',
          featuredImage: {
            node: {
              sourceUrl: '/api/placeholder/800/400',
              altText: 'Al-Asr Platform'
            }
          },
          author: {
            node: {
              name: 'Admin',
              slug: 'admin'
            }
          },
          categories: {
            nodes: [
              {
                name: 'Announcements',
                slug: 'announcements'
              }
            ]
          }
        },
        {
          id: '2',
          title: 'Getting Started with Next.js 14',
          slug: 'nextjs-14-features',
          excerpt: 'Learn about the latest features in Next.js 14 and how to build modern web applications.',
          date: '2024-01-14T14:30:00Z',
          featuredImage: {
            node: {
              sourceUrl: '/api/placeholder/800/400',
              altText: 'Next.js 14'
            }
          },
          author: {
            node: {
              name: 'Tech Writer',
              slug: 'tech-writer'
            }
          },
          categories: {
            nodes: [
              {
                name: 'Technology',
                slug: 'technology'
              }
            ]
          }
        }
      ]

      return NextResponse.json({
        data: {
          posts: {
            nodes: mockPosts,
            pageInfo: {
              hasNextPage: false,
              endCursor: null
            }
          }
        }
      })
    }

    if (query.includes('GetPostBySlug')) {
      const mockPost = {
        id: '1',
        title: 'Welcome to Al-Asr - Multi-language News Platform',
        slug: 'welcome-to-al-asr',
        content: `
          <h2>Welcome to Al-Asr</h2>
          <p>This is a multi-language news platform built with Next.js and WordPress headless CMS.</p>
          <p>Features include:</p>
          <ul>
            <li>10 Language Support</li>
            <li>4 Different Themes</li>
            <li>PWA Capabilities</li>
            <li>Advanced Caching</li>
            <li>SEO Optimized</li>
          </ul>
        `,
        excerpt: 'Discover our new multi-language news platform with support for 10 languages and modern features.',
        date: '2024-01-15T10:00:00Z',
        modified: '2024-01-15T10:00:00Z',
        featuredImage: {
          node: {
            sourceUrl: '/api/placeholder/800/400',
            altText: 'Al-Asr Platform'
          }
        },
        author: {
          node: {
            name: 'Admin',
            slug: 'admin',
            description: 'Platform administrator and content manager.'
          }
        },
        categories: {
          nodes: [
            {
              name: 'Announcements',
              slug: 'announcements'
            }
          ]
        },
        tags: {
          nodes: [
            {
              name: 'Welcome',
              slug: 'welcome'
            },
            {
              name: 'Introduction',
              slug: 'introduction'
            }
          ]
        },
        seo: {
          title: 'Welcome to Al-Asr - Multi-language News Platform',
          metaDesc: 'Discover our new multi-language news platform with support for 10 languages and modern features.',
          opengraphTitle: 'Welcome to Al-Asr',
          opengraphDescription: 'Multi-language news platform built with Next.js and WordPress',
          opengraphImage: {
            sourceUrl: '/api/placeholder/1200/630'
          }
        }
      }

      return NextResponse.json({
        data: {
          post: mockPost
        }
      })
    }

    if (query.includes('GetCategories')) {
      const mockCategories = [
        {
          id: '1',
          name: 'Technology',
          slug: 'technology',
          description: 'Latest technology news and updates',
          count: 15
        },
        {
          id: '2',
          name: 'Business',
          slug: 'business',
          description: 'Business and economic news',
          count: 12
        },
        {
          id: '3',
          name: 'Health',
          slug: 'health',
          description: 'Health and wellness information',
          count: 8
        },
        {
          id: '4',
          name: 'Entertainment',
          slug: 'entertainment',
          description: 'Entertainment news and reviews',
          count: 10
        }
      ]

      return NextResponse.json({
        data: {
          categories: {
            nodes: mockCategories
          }
        }
      })
    }

    // Default response for unknown queries
    return NextResponse.json({
      data: null,
      errors: [{ message: 'Mock GraphQL endpoint - query not implemented' }]
    })

  } catch (error) {
    console.error('GraphQL proxy error:', error)
    return NextResponse.json(
      {
        errors: [{ message: 'Internal server error' }]
      },
      { status: 500 }
    )
  }
}