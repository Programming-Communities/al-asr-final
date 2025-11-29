'use client'

import React, { useEffect } from 'react'
import Button from '@/components/ui/Button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  const isNetworkError = error.message.includes('network') || error.message.includes('fetch')
  const isAuthError = error.message.includes('auth') || error.message.includes('token')
  const isNotFound = error.message.includes('404') || error.message.includes('not found')

  const getErrorDetails = () => {
    if (isNetworkError) {
      return {
        title: 'Connection Error',
        description: 'There seems to be a problem with your internet connection. Please check your network and try again.',
        icon: '📡'
      }
    }
    
    if (isAuthError) {
      return {
        title: 'Authentication Error',
        description: 'There was a problem with your session. Please sign in again to continue.',
        icon: '🔐'
      }
    }
    
    if (isNotFound) {
      return {
        title: 'Content Not Found',
        description: 'The content you are trying to access is currently unavailable or has been moved.',
        icon: '🔍'
      }
    }

    return {
      title: 'Something Went Wrong',
      description: 'An unexpected error occurred. Our team has been notified and we are working to fix the issue.',
      icon: '⚠️'
    }
  }

  const errorDetails = getErrorDetails()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-4xl">
            {errorDetails.icon}
          </div>
        </div>

        {/* Error Content */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {errorDetails.title}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {errorDetails.description}
        </p>

        {/* Error Code (for debugging) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
              <strong>Error:</strong> {error.message}
              {error.digest && (
                <>
                  <br />
                  <strong>Digest:</strong> {error.digest}
                </>
              )}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button
            onClick={reset}
            className="flex-1 sm:flex-none"
          >
            Try Again
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="flex-1 sm:flex-none"
          >
            Go Home
          </Button>
        </div>

        {/* Recovery Steps */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Quick Recovery Steps:
          </h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {isNetworkError && (
              <>
                <p>• Check your internet connection</p>
                <p>• Refresh the page</p>
                <p>• Try again in a few minutes</p>
              </>
            )}
            {isAuthError && (
              <>
                <p>• Clear your browser cookies</p>
                <p>• Sign in again</p>
                <p>• Check if cookies are enabled</p>
              </>
            )}
            {!isNetworkError && !isAuthError && (
              <>
                <p>• Refresh the page</p>
                <p>• Clear your browser cache</p>
                <p>• Try a different browser</p>
              </>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Still having issues?{' '}
            <a
              href="/contact"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              Contact support
            </a>
          </p>
        </div>

        {/* Status Indicators */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-xs">
          <div className={`p-2 rounded ${
            !isNetworkError 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {!isNetworkError ? '✅ Online' : '❌ Offline'}
          </div>
          <div className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded">
            🔄 Retrying...
          </div>
          <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 p-2 rounded">
            ⚠️ Error #{error.digest ? error.digest.slice(0, 6) : 'UNKNOWN'}
          </div>
        </div>
      </div>
    </div>
  )
}

// Specialized error components for different error types
export function NetworkError({ reset }: { reset: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 text-red-500">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Network Connection Lost
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Please check your internet connection and try again.
      </p>
      <Button onClick={reset} size="sm">
        Retry
      </Button>
    </div>
  )
}

export function AuthError({ reset }: { reset: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 text-yellow-500">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Session Expired
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Your session has expired. Please sign in again.
      </p>
      <div className="space-x-2">
        <Button onClick={reset} size="sm">
          Sign In Again
        </Button>
        <Button variant="outline" onClick={() => window.location.href = '/'} size="sm">
          Go Home
        </Button>
      </div>
    </div>
  )
}