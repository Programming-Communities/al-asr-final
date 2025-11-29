// app/api/auth/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, action, name } = body

    // Simulate API processing
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (action === 'login') {
      // Mock login validation
      if (email === 'admin@al-asr.com' && password === 'password') {
        return NextResponse.json({
          success: true,
          user: {
            id: '1',
            name: 'Admin User',
            email: 'admin@al-asr.com',
            role: 'admin'
          },
          token: 'mock-jwt-token-' + Date.now()
        })
      } else {
        return NextResponse.json(
          { success: false, error: 'Invalid email or password' },
          { status: 401 }
        )
      }
    }

    if (action === 'register') {
      // Mock registration
      if (!name || !email || !password) {
        return NextResponse.json(
          { success: false, error: 'All fields are required' },
          { status: 400 }
        )
      }

      return NextResponse.json({
        success: true,
        user: {
          id: Date.now().toString(),
          name: name,
          email: email,
          role: 'user'
        },
        token: 'mock-jwt-token-' + Date.now()
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Auth API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Mock token validation
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  
  if (token && token.startsWith('mock-jwt-token')) {
    return NextResponse.json({ valid: true })
  }
  
  return NextResponse.json({ valid: false }, { status: 401 })
}