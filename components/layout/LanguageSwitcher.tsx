  'use client'

  import React, { useState } from 'react'
  import { useLanguage } from '@/hooks/useLanguage'
  import { i18nConfig } from '@/config/i18n'
  import Button from '@/components/ui/Button'

  const LanguageSwitcher: React.FC = () => {
    const { locale, setLocale, dir } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const isRTL = dir === 'rtl'

    const currentLanguage = i18nConfig.locales.find(lang => lang.code === locale)

    const handleLanguageChange = (newLocale: string) => {
      setLocale(newLocale as any)
      setIsOpen(false)
    }

    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1"
        >
          <span className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-medium">
            {locale.toUpperCase()}
          </span>
          <svg 
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>

        {isOpen && (
          <div className={`absolute top-full mt-1 py-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 ${
            isRTL ? 'left-0' : 'right-0'
          }`}>
            {i18nConfig.locales.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3 ${
                  locale === language.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                } ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <span className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium">
                  {language.code.toUpperCase()}
                </span>
                <span className="flex-1">{language.name}</span>
                {locale === language.code && (
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  export default LanguageSwitcher
