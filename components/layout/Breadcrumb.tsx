'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'

interface BreadcrumbProps {
  items: {
    label: string
    href?: string
  }[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { dir } = useLanguage()
  const isRTL = dir === 'rtl'

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Link 
        href="/"
        className="hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        Home
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className={`text-gray-400 ${isRTL ? 'rotate-180' : ''}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
          
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-white font-medium">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumb
