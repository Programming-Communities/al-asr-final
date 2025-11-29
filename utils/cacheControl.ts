const CACHE_PREFIX = 'al-asr-'
const CACHE_VERSION = 'v1'

export const getCacheKey = (key: string): string => {
  return `${CACHE_PREFIX}${CACHE_VERSION}-${key}`
}

export const setCache = <T>(key: string, data: T, ttl: number = 3600): void => {
  if (typeof window === 'undefined') return

  const cacheData = {
    data,
    expires: Date.now() + (ttl * 1000),
  }

  try {
    localStorage.setItem(getCacheKey(key), JSON.stringify(cacheData))
  } catch (error) {
    console.warn('Failed to set cache:', error)
  }
}

export const getCache = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null

  try {
    const cached = localStorage.getItem(getCacheKey(key))
    if (!cached) return null

    const { data, expires } = JSON.parse(cached)
    
    if (Date.now() > expires) {
      localStorage.removeItem(getCacheKey(key))
      return null
    }

    return data
  } catch (error) {
    console.warn('Failed to get cache:', error)
    return null
  }
}

export const clearCache = (key?: string): void => {
  if (typeof window === 'undefined') return

  try {
    if (key) {
      localStorage.removeItem(getCacheKey(key))
    } else {
      // Clear all app cache
      Object.keys(localStorage)
        .filter(k => k.startsWith(CACHE_PREFIX))
        .forEach(k => localStorage.removeItem(k))
    }
  } catch (error) {
    console.warn('Failed to clear cache:', error)
  }
}

export const preloadCache = async (urls: string[]): Promise<void> => {
  if (typeof window === 'undefined') return

  const cache = await caches.open(getCacheKey('preload'))
  await Promise.all(
    urls.map(url => cache.add(url).catch(() => {}))
  )
}
