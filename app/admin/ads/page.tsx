'use client'

import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'

interface AdUnit {
  id: string
  name: string
  type: 'banner' | 'sidebar' | 'in-article' | 'popup'
  position: 'top' | 'bottom' | 'left' | 'right'
  content: string
  isActive: boolean
  impressions: number
  clicks: number
}

export default function AdminAds() {
  const [ads, setAds] = useState<AdUnit[]>([
    {
      id: '1',
      name: 'Header Banner',
      type: 'banner',
      position: 'top',
      content: '<div>Header Ad Content</div>',
      isActive: true,
      impressions: 12450,
      clicks: 345
    },
    {
      id: '2',
      name: 'Sidebar Ad',
      type: 'sidebar',
      position: 'right',
      content: '<div>Sidebar Ad Content</div>',
      isActive: true,
      impressions: 8670,
      clicks: 123
    }
  ])
  
  const [isCreating, setIsCreating] = useState(false)
  const [newAd, setNewAd] = useState({
    name: '',
    type: 'banner' as AdUnit['type'],
    position: 'top' as AdUnit['position'],
    content: '',
    isActive: true
  })

  const handleCreateAd = () => {
    const newAdUnit: AdUnit = {
      ...newAd,
      id: Date.now().toString(),
      impressions: 0,
      clicks: 0
    }
    setAds(prev => [...prev, newAdUnit])
    setNewAd({
      name: '',
      type: 'banner',
      position: 'top',
      content: '',
      isActive: true
    })
    setIsCreating(false)
  }

  const toggleAdStatus = (adId: string) => {
    setAds(prev => prev.map(ad => 
      ad.id === adId ? { ...ad, isActive: !ad.isActive } : ad
    ))
  }

  const getCTR = (ad: AdUnit) => {
    return ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : '0.00'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ad Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage advertisements and sponsorships
            </p>
          </div>
          <Button onClick={() => setIsCreating(true)} className="mt-4 md:mt-0">
            + New Ad Unit
          </Button>
        </div>

        {/* Create Ad Form */}
        {isCreating && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Create New Ad Unit
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Ad Name"
                value={newAd.name}
                onChange={(e) => setNewAd(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter ad unit name"
              />
              <Select
                label="Ad Type"
                value={newAd.type}
                onChange={(e) => setNewAd(prev => ({ ...prev, type: e.target.value as AdUnit['type'] }))}
                options={[
                  { value: 'banner', label: 'Banner' },
                  { value: 'sidebar', label: 'Sidebar' },
                  { value: 'in-article', label: 'In-Article' },
                  { value: 'popup', label: 'Popup' }
                ]}
              />
              <Select
                label="Position"
                value={newAd.position}
                onChange={(e) => setNewAd(prev => ({ ...prev, position: e.target.value as AdUnit['position'] }))}
                options={[
                  { value: 'top', label: 'Top' },
                  { value: 'bottom', label: 'Bottom' },
                  { value: 'left', label: 'Left' },
                  { value: 'right', label: 'Right' }
                ]}
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newAd.isActive}
                  onChange={(e) => setNewAd(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Active
                </label>
              </div>
            </div>
            <Textarea
              label="Ad Content (HTML)"
              value={newAd.content}
              onChange={(e) => setNewAd(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Enter HTML content for the ad"
              rows={4}
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={handleCreateAd}>
                Create Ad Unit
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Ads Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {ad.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {ad.type} • {ad.position}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ad.isActive 
                        ? 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400'
                        : 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400'
                    }`}>
                      {ad.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleAdStatus(ad.id)}
                >
                  {ad.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </div>

              {/* Ad Preview */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 mb-4">
                <div 
                  className="text-center text-gray-500 dark:text-gray-400"
                  dangerouslySetInnerHTML={{ __html: ad.content || '<div class="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">Ad Preview</div>' }}
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {ad.impressions.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Impressions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {ad.clicks.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Clicks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {getCTR(ad)}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">CTR</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {ads.length === 0 && !isCreating && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No ad units found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get started by creating your first ad unit
            </p>
            <Button onClick={() => setIsCreating(true)}>
              + Create Ad Unit
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}