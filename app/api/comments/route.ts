import { NextRequest, NextResponse } from 'next/server'

// Mock comments data
let comments = [
  {
    id: '1',
    postId: '1',
    author: 'John Doe',
    email: 'john@example.com',
    content: 'Great article! Very informative.',
    status: 'approved',
    date: '2024-01-15T14:30:00Z'
  },
  {
    id: '2',
    postId: '1', 
    author: 'Jane Smith',
    email: 'jane@example.com',
    content: 'Thanks for sharing these insights.',
    status: 'approved',
    date: '2024-01-15T15:45:00Z'
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const postId = searchParams.get('postId')
  const status = searchParams.get('status')

  let filteredComments = comments

  if (postId) {
    filteredComments = filteredComments.filter(comment => comment.postId === postId)
  }

  if (status) {
    filteredComments = filteredComments.filter(comment => comment.status === status)
  }

  // Sort by date descending
  filteredComments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return NextResponse.json({ comments: filteredComments })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newComment = {
      id: (comments.length + 1).toString(),
      status: 'pending', // Comments need approval
      date: new Date().toISOString(),
      ...body
    }

    comments.push(newComment)

    return NextResponse.json({ comment: newComment }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json()
    
    const commentIndex = comments.findIndex(comment => comment.id === id)
    if (commentIndex === -1) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    comments[commentIndex].status = status

    return NextResponse.json({ comment: comments[commentIndex] })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    )
  }
}