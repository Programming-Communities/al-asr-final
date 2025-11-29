// This would be server-side only for Redis operations
// Client-side we'll use localStorage as a fallback

export class RedisService {
  private static readonly API_PATH = '/api/cache'

  static async get<T>(key: string): Promise<T | null> {
    try {
      const response = await fetch(`${this.API_PATH}?key=${encodeURIComponent(key)}`)
      if (response.ok) {
        const data = await response.json()
        return data.value
      }
      return null
    } catch (error) {
      console.warn('Redis get failed:', error)
      return null
    }
  }

  static async set(key: string, value: any, ttl: number = 3600): Promise<boolean> {
    try {
      const response = await fetch(this.API_PATH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value, ttl }),
      })
      return response.ok
    } catch (error) {
      console.warn('Redis set failed:', error)
      return false
    }
  }

  static async delete(key: string): Promise<boolean> {
    try {
      const response = await fetch(this.API_PATH, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      })
      return response.ok
    } catch (error) {
      console.warn('Redis delete failed:', error)
      return false
    }
  }

  static async clear(): Promise<boolean> {
    try {
      const response = await fetch(this.API_PATH, {
        method: 'DELETE',
      })
      return response.ok
    } catch (error) {
      console.warn('Redis clear failed:', error)
      return false
    }
  }
}
