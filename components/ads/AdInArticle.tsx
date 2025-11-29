'use client'

import React from 'react'
import { useAds } from '@/hooks/useAds'
import AdSkeleton from './AdSkeleton'

interface AdInArticleProps {
  position?: number
}

const AdInArticle: React.FC<AdInArticleProps> = ({ position = 1 }) => {
  const { ads, isLoading, trackAdClick } = useAds(`in-article-${position}`)

  if (isLoading) {
    return <AdSkeleton />
  }

  if (ads.length === 0) {
    return (
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center my-8">
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          Advertisement
        </span>
      </div>
    )
  }

  return (
    <div className="w-full my-8">
      {ads.map((ad) => (
        <div
          key={ad.id}
          id={`ad-${ad.id}`}
          className="ad-container bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden text-center"
        >
          <div
            className="ad-content cursor-pointer inline-block"
            onClick={() => trackAdClick(ad.id)}
            dangerouslySetInnerHTML={{ __html: ad.content }}
          />
        </div>
      ))}
    </div>
  )
}

export default AdInArticle
