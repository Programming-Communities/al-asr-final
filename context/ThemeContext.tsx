'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { type Theme, themeConfig } from '@/config/theme'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && themeConfig.themes.some(t => t.name === savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
    
    // Update theme class
    const root = document.documentElement
    root.classList.remove('light', 'dark', 'amoled', 'colorful')
    root.classList.add(theme)
  }, [theme, mounted])

  const value = {
    theme,
    setTheme,
  }

  if (!mounted) {
    return <div className="hidden">{children}</div>
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
