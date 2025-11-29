import React from 'react'
import Skeleton from '@/components/ui/Skeleton'

const ModalSkeleton: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-pulse">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-8 h-8 rounded" />
        </div>
        
        {/* Content Skeleton */}
        <div className="p-6 space-y-4">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-full h-20" variant="rectangular" />
        </div>
        
        {/* Footer Skeleton */}
        <div className="flex justify-end space-x-2 p-6 border-t border-gray-200 dark:border-gray-700">
          <Skeleton className="w-20 h-10" />
          <Skeleton className="w-20 h-10" />
        </div>
      </div>
    </div>
  )
}

export default ModalSkeleton