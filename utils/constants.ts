// utils/constants.ts
export const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || 'https://admin-al-asr.centers.pk/graphql'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === 'production' ? 'https://al-asr.centers.pk' : 'http://localhost:3000')

export const CACHE_KEYS = {
  POSTS: 'posts',
  CATEGORIES: 'categories',
  POST: (slug: string) => `post-${slug}`,
  CATEGORY: (slug: string) => `category-${slug}`,
}

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  large: 1280,
}

export const AD_UNITS = {
  HEADER: 'header_ad',
  SIDEBAR: 'sidebar_ad', 
  IN_ARTICLE: 'in_article_ad',
  FOOTER: 'footer_ad',
  POPUP: 'popup_ad',
}

// Environment flags
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const SITE_NAME = 'Al-Asr'