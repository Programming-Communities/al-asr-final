/**
 * Utility functions for the application
 */

// Simple classNames alternative (replaces clsx)
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Date formatting
export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'Unknown date'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch (error) {
    return 'Invalid date'
  }
}

// Text truncation
export const truncateText = (text: string | null | undefined, maxLength: number): string => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Excerpt generation
export const generateExcerpt = (content: string | null | undefined, length: number = 150): string => {
  if (!content) return ''
  
  try {
    const strippedContent = content.replace(/<[^>]*>/g, '')
    return truncateText(strippedContent, length)
  } catch (error) {
    return truncateText(content, length)
  }
}

// Reading time calculation
export const getReadingTime = (content: string | null | undefined): number => {
  if (!content) return 1 // Default to 1 min if no content
  
  try {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  } catch (error) {
    return 1 // Default to 1 min on error
  }
}

// RTL language detection
export const isRTL = (locale: string | null | undefined): boolean => {
  if (!locale) return false
  
  const rtlLanguages = ['ar', 'ur', 'fa', 'ps', 'he']
  return rtlLanguages.includes(locale)
}

// Slug generation
export const generateSlug = (text: string | null | undefined): string => {
  if (!text) return ''
  
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

// Number formatting
export const formatNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined) return '0'
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Currency formatting
export const formatCurrency = (amount: number | null | undefined, currency: string = 'USD'): string => {
  if (amount === null || amount === undefined) return '$0.00'
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount)
  } catch (error) {
    return `$${amount?.toFixed(2) || '0.00'}`
  }
}

// File size formatting
export const formatFileSize = (bytes: number | null | undefined): string => {
  if (bytes === null || bytes === undefined) return '0 Bytes'
  if (bytes === 0) return '0 Bytes'
  
  try {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  } catch (error) {
    return '0 Bytes'
  }
}

// Email validation
export const validateEmail = (email: string | null | undefined): boolean => {
  if (!email) return false
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password validation
export const validatePassword = (password: string | null | undefined): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!password) {
    errors.push('Password is required')
    return { isValid: false, errors }
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Name validation
export const validateName = (name: string | null | undefined): boolean => {
  if (!name) return false
  return name.trim().length >= 2
}

// Comment validation
export const validateComment = (comment: string | null | undefined): boolean => {
  if (!comment) return false
  return comment.trim().length >= 10 && comment.trim().length <= 1000
}

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Local storage helpers
export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn('Failed to get localStorage:', error)
    return defaultValue
  }
}

export const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn('Failed to set localStorage:', error)
  }
}

export const removeLocalStorage = (key: string): void => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.warn('Failed to remove localStorage:', error)
  }
}

// Session storage helpers
export const getSessionStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue
  try {
    const item = window.sessionStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn('Failed to get sessionStorage:', error)
    return defaultValue
  }
}

export const setSessionStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn('Failed to set sessionStorage:', error)
  }
}

export const removeSessionStorage = (key: string): void => {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(key)
  } catch (error) {
    console.warn('Failed to remove sessionStorage:', error)
  }
}

// Safe string manipulation
export const safeToString = (value: any): string => {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return value.toString()
  
  try {
    return String(value)
  } catch (error) {
    return ''
  }
}

// Safe number conversion
export const safeToNumber = (value: any, defaultValue: number = 0): number => {
  if (value === null || value === undefined) return defaultValue
  
  const num = Number(value)
  return isNaN(num) ? defaultValue : num
}

// Safe array access
export const safeArray = <T>(value: any, defaultValue: T[] = []): T[] => {
  if (!value) return defaultValue
  if (Array.isArray(value)) return value
  return defaultValue
}

// Safe object access
export const safeObject = <T extends Record<string, any>>(value: any, defaultValue: T = {} as T): T => {
  if (!value) return defaultValue
  if (typeof value === 'object' && value !== null) return value
  return defaultValue
}

// URL parameter encoding
export const encodeParams = (params: Record<string, any>): string => {
  try {
    return Object.keys(params)
      .filter(key => params[key] !== undefined && params[key] !== null)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&')
  } catch (error) {
    return ''
  }
}

// Deep clone (simple version)
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as any
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as any
  
  const cloned = {} as T
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key])
    }
  }
  return cloned
}

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Capitalize first letter
export const capitalize = (str: string | null | undefined): string => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Format phone number (US format)
export const formatPhoneNumber = (phone: string | null | undefined): string => {
  if (!phone) return ''
  
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  
  return phone
}

// Check if value is empty
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

// Delay function
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}