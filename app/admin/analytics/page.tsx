'use client'

import React from 'react'
import Button from '@/components/ui/Button'

export default function AdminAnalytics() {
  const analyticsData = {
    overview: {
      visitors: '45,231',
      pageviews: '78,452',
      bounceRate: '42.3%',
      avgSession: '4m 32s'
    },
    traffic: [
      { source: 'Organic Search', visitors: '24,123', percentage: 53 },
      { source: 'Direct', visitors: '12,456', percentage: 28 },
      { source: 'Social Media', visitors: '5,678', percentage: 13 },
      { source: 'Referral', visitors: '2,974', percentage: 6 }
    ],
    popularPages: [
      { page: '/posts/nextjs-14-features', views: '12,345' },
      { page: '/categories/technology', views: '9,876' },
      { page: '/posts/react-best-practices', views: '8,543' },
      { page: '/about', views: '7,210' },
      { page: '/contact', views: '6,543' }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track and analyze your website performance
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline">
              Last 7 days
            </Button>
            <Button variant="outline">
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {Object.entries(analyticsData.overview).map(([key, value]) => (
            <div
              key={key}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center"
            >
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traffic Sources */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Traffic Sources
            </h3>
            <div className="space-y-4">
              {analyticsData.traffic.map((item, index) => (
                <div key={item.source} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{
                        backgroundColor: [
                          '#3B82F6', 
                          '#10B981', 
                          '#F59E0B', 
                          '#EF4444'
                        ][index % 4]
                      }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {item.source}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-16 text-right">
                      {item.visitors}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Pages */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Popular Pages
            </h3>
            <div className="space-y-3">
              {analyticsData.popularPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-xs flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[200px]">
                      {page.page}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {page.views} views
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Top Countries</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>United States</span>
                <span className="text-gray-500">32%</span>
              </div>
              <div className="flex justify-between">
                <span>United Kingdom</span>
                <span className="text-gray-500">15%</span>
              </div>
              <div className="flex justify-between">
                <span>Canada</span>
                <span className="text-gray-500">12%</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Devices</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Desktop</span>
                <span className="text-gray-500">58%</span>
              </div>
              <div className="flex justify-between">
                <span>Mobile</span>
                <span className="text-gray-500">35%</span>
              </div>
              <div className="flex justify-between">
                <span>Tablet</span>
                <span className="text-gray-500">7%</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Engagement</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Pages/Session</span>
                <span className="text-gray-500">3.2</span>
              </div>
              <div className="flex justify-between">
                <span>New Visitors</span>
                <span className="text-gray-500">68%</span>
              </div>
              <div className="flex justify-between">
                <span>Returning</span>
                <span className="text-gray-500">32%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}