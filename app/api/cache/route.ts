import { NextRequest, NextResponse } from 'next/server'

// Mock cache store
let cacheStore: Record<string, { value: any; expires: number }> = {}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  if (!key) {
    return NextResponse.json(
      { error: 'Key parameter is required' },
      { status: 400 }
    )
  }

  const cached = cacheStore[key]
  
  if (!cached) {
    return NextResponse.json({ value: null })
  }

  if (Date.now() > cached.expires) {
    delete cacheStore[key]
    return NextResponse.json({ value: null })
  }

  return NextResponse.json({ value: cached.value })
}

export async function POST(request: NextRequest) {
  try {
    const { key, value, ttl = 3600 } = await request.json()

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: 'Key and value are required' },
        { status: 400 }
      )
    }

    cacheStore[key] = {
      value,
      expires: Date.now() + (ttl * 1000)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to set cache' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { key } = await request.json()

    if (key) {
      // Delete specific key
      delete cacheStore[key]
    } else {
      // Clear all cache
      cacheStore = {}
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    )
  }
}