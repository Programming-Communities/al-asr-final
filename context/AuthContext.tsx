'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthService, type User } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: { name: string; email: string; password: string }) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedUser = AuthService.getUser()
        if (savedUser && (await AuthService.validateToken())) {
          setUser(savedUser)
        } else {
          AuthService.logout()
        }
      } catch (error) {
        console.error('Auth initialization failed:', error)
        AuthService.logout()
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const result = await AuthService.login(email, password)
      if (result.user && result.token) {
        setUser(result.user)
        return true
      }
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: { name: string; email: string; password: string }): Promise<boolean> => {
    setIsLoading(true)
    try {
      const result = await AuthService.register(userData)
      if (result.user && result.token) {
        setUser(result.user)
        return true
      }
      return false
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    AuthService.logout()
    setUser(null)
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
