'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import Button from '@/components/ui/Button'

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const themes = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'amoled', label: 'AMOLED', icon: '⬛' },
    { value: 'colorful', label: 'Colorful', icon: '🌈' }
  ]

  const currentTheme = themes.find(t => t.value === theme) || themes[0]

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-2"
        onClick={() => {
          const currentIndex = themes.findIndex(t => t.value === theme)
          const nextIndex = (currentIndex + 1) % themes.length
          setTheme(themes[nextIndex].value)
        }}
      >
        <span className="text-lg">{currentTheme.icon}</span>
        <span className="hidden sm:block">{currentTheme.label}</span>
      </Button>
    </div>
  )
}

export default ThemeSwitcher
