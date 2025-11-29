'use client'

import React from 'react'
import Modal from '@/components/ui/Modal'

interface AdModalProps {
  isOpen: boolean
  onClose: () => void
  adContent: string
}

const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, adContent }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sponsored Content"
      size="md"
    >
      <div className="text-center">
        <div 
          className="mb-6"
          dangerouslySetInnerHTML={{ __html: adContent }}
        />
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          This content is sponsored by our partners.
        </p>
        
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              // Handle ad click
              window.open('#', '_blank')
              onClose()
            }}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default AdModal
