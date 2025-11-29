'use client'

import { useLanguage } from '@/hooks/useLanguage'

export default function DebugPage() {
  const { locale, dir } = useLanguage()
  
  return (
    <div className="p-8">
      <h1>Debug Page</h1>
      <p>Locale: {locale}</p>
      <p>Direction: {dir}</p>
    </div>
  )
}