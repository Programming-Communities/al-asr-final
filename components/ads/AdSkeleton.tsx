import React from 'react'

const AdSkeleton = () => {
  return (
    <div className="ad-skeleton animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-24 flex items-center justify-center">
      <span className="text-gray-400 dark:text-gray-500">Advertisement</span>
    </div>
  )
}

export default AdSkeleton
