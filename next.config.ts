import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin-al-asr.centers.pk',
      },
      {
        protocol: 'https', 
        hostname: 'al-asr.centers.pk',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://al-asr.centers.pk',
    WORDPRESS_URL: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || 'https://admin-al-asr.centers.pk/graphql',
  },
}

export default nextConfig