'use client'

import React from 'react'
import { useAds } from '@/hooks/useAds'
import AdSkeleton from './AdSkeleton'

interface AdInFeedProps {
  index: number
}

const AdInFeed: React.FC<AdInFeedProps> = ({ index }) => {
  const { ads, isLoading, trackAdClick } = useAds(`in-feed-${index}`)

  if (isLoading) {
    return <AdSkeleton />
  }

  if (ads.length === 0) {
    return (
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center my-4">
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          Advertisement
        </span>
      </div>
    )
  }

  return (
    <div className="w-full my-4">
      {ads.map((ad) => (
        <div
          key={ad.id}
          id={`ad-${ad.id}`}
          className="ad-container bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div
            className="ad-content cursor-pointer"
            onClick={() => trackAdClick(ad.id)}
            dangerouslySetInnerHTML={{ __html: ad.content }}
          />
        </div>
      ))}
    </div>
  )
}

export default AdInFeed
