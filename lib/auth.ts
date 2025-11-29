// lib/auth.ts
export interface User {
  id: string
  name: string
  email: string
  role: string
}

export interface AuthResponse {
  user: User | null
  token: string | null
  error?: string
}

export class AuthService {
  private static readonly TOKEN_KEY = 'auth-token'
  private static readonly USER_KEY = 'auth-user'

  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      // Use the correct API endpoint based on environment
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://al-asr.centers.pk/api/auth'
        : 'http://localhost:3000/api/auth'

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password,
          action: 'login'
        }),
      })

      const data = await response.json()

      if (response.ok && data.token) {
        this.setToken(data.token)
        this.setUser(data.user)
        return { user: data.user, token: data.token }
      } else {
        return { user: null, token: null, error: data.error || 'Login failed' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { user: null, token: null, error: 'Network error. Please try again.' }
    }
  }

  // ... rest of the AuthService methods remain the same
  static async register(userData: {
    name: string
    email: string
    password: string
  }): Promise<AuthResponse> {
    try {
      const apiUrl = process.env.NODE_ENV === 'production'
        ? 'https://al-asr.centers.pk/api/auth'
        : 'http://localhost:3000/api/auth'

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          action: 'register'
        }),
      })

      const data = await response.json()

      if (response.ok && data.token) {
        this.setToken(data.token)
        this.setUser(data.user)
        return { user: data.user, token: data.token }
      } else {
        return { user: null, token: null, error: data.error || 'Registration failed' }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { user: null, token: null, error: 'Network error. Please try again.' }
    }
  }

  static logout(): void {
    this.clearToken()
    this.clearUser()
  }

  static getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.TOKEN_KEY)
  }

  static setToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  static clearToken(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.TOKEN_KEY)
  }

  static getUser(): User | null {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem(this.USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  }

  static setUser(user: User): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  static clearUser(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.USER_KEY)
  }

  static isAuthenticated(): boolean {
    return !!this.getToken()
  }

  static async validateToken(): Promise<boolean> {
    const token = this.getToken()
    if (!token) return false

    try {
      const apiUrl = process.env.NODE_ENV === 'production'
        ? 'https://al-asr.centers.pk/api/auth'
        : 'http://localhost:3000/api/auth'

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.ok
    } catch {
      return false
    }
  }
}