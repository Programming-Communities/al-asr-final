'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'
import { useApp } from '@/context/AppContext'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from '@/components/theme/ThemeToggle'
import Button from '@/components/ui/Button'
import { siteConfig } from '@/config/site'

const Header: React.FC = () => {
  const { dir, locale } = useLanguage()
  const { theme } = useTheme()
  const { toggleSidebar, toggleSearch } = useApp()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isRTL = dir === 'rtl'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Mobile Menu Button */}
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <Link href={`/${locale}`} className={`flex items-center ${isRTL ? 'ml-4' : 'mr-4'} lg:ml-0`}>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">ع</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href={`/${locale}`}
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href={`/${locale}/posts`}
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Posts
            </Link>
            <Link
              href={`/${locale}/categories`}
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Categories
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              About
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            {/* Search button */}
            <button
              onClick={toggleSearch}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Language switcher */}
            <LanguageSwitcher />

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Auth buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = `/auth/login`}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => window.location.href = `/auth/signup`}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href={`/${locale}`}
                className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href={`/${locale}/posts`}
                className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Posts
              </Link>
              <Link
                href={`/${locale}/categories`}
                className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href={`/${locale}/about`}
                className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile auth links */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/auth/login"
                  className="block text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="block text-base font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header