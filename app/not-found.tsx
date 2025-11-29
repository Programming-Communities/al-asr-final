import React from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-8 flex items-center justify-center">
              <span className="text-6xl font-bold text-gray-700 dark:text-gray-300">404</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered an incorrect URL.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.history.back()}
            className="flex-1 sm:flex-none"
          >
            ← Go Back
          </Button>
          
          <Link href="/" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full">
              Go Home
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Popular pages you might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              href="/posts" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm transition-colors"
            >
              All Posts
            </Link>
            <Link 
              href="/categories" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm transition-colors"
            >
              Categories
            </Link>
            <Link 
              href="/about" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm transition-colors"
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Can't find what you're looking for?
          </p>
          <Link 
            href="/search" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            Try searching instead
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: '404 - Page Not Found | Al-Asr',
  description: 'The page you are looking for does not exist or has been moved.',
}