'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { type Locale, i18nConfig } from '@/config/i18n'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(i18nConfig.defaultLocale)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    
    // Extract locale from pathname or use default
    const pathLocale = pathname.split('/')[1] as Locale
    if (i18nConfig.locales.some(loc => loc.code === pathLocale)) {
      setLocale(pathLocale)
    } else {
      setLocale(i18nConfig.defaultLocale)
    }
  }, [pathname])

  const handleSetLocale = (newLocale: Locale) => {
    if (!mounted) return

    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)

    // Update URL with new locale
    const segments = pathname.split('/')
    if (i18nConfig.locales.some(loc => loc.code === segments[1])) {
      segments[1] = newLocale
    } else {
      segments.splice(1, 0, newLocale)
    }
    
    const newPath = segments.join('/')
    router.push(newPath)
  }

  const currentLocaleConfig = i18nConfig.locales.find(loc => loc.code === locale)
  const dir = currentLocaleConfig?.dir || 'ltr'

  const value = {
    locale,
    setLocale: handleSetLocale,
    dir,
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="hidden">
        {children}
      </div>
    )
  }

  return (
    <LanguageContext.Provider value={value}>
      <div dir={dir} className="min-h-screen">
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}