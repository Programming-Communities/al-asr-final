'use client'

import React from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/ui/Button'
import Link from 'next/link'

interface HeroRightProps {
  title?: string
  subtitle?: string
  imageUrl?: string
  ctaText?: string
  ctaLink?: string
  features?: string[]
}

const HeroRight: React.FC<HeroRightProps> = ({
  title = "Powerful Features",
  subtitle = "Discover our comprehensive set of features designed to help you succeed in your digital journey.",
  imageUrl = "/api/placeholder/600/400",
  ctaText = "View Features",
  ctaLink = "/features",
  features = [
    "Easy to use interface",
    "Advanced customization",
    "24/7 Support",
    "Regular updates"
  ],
}) => {
  const { dir } = useLanguage()
  const isRTL = dir === 'rtl'

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className={`flex flex-col lg:flex-row items-center gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Image */}
          <div className="flex-1">
            <div className="relative">
              <img
                src={imageUrl}
                alt={title}
                className="rounded-2xl shadow-xl w-full h-auto"
              />
              {/* Decorative background */}
              <div className={`absolute -bottom-4 -left-4 w-32 h-32 bg-blue-100 dark:bg-blue-900 rounded-2xl opacity-50 -z-10 ${isRTL ? 'lg:-right-4 lg:left-auto' : ''}`}></div>
            </div>
          </div>
          
          {/* Text Content */}
          <div className={`flex-1 ${isRTL ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {subtitle}
            </p>
            
            {/* Features List */}
            {features && features.length > 0 && (
              <div className={`mb-8 ${isRTL ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                      {!isRTL && (
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span>{feature}</span>
                      {isRTL && (
                        <svg className="w-5 h-5 text-green-500 ml-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className={`flex flex-wrap gap-4 ${isRTL ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
            <Link href={ctaLink}>
  <Button
    size="lg"
    className="bg-blue-600 hover:bg-blue-700"
  >
    {ctaText}
  </Button>
</Link>
<Link href="/demo">
  <Button
    variant="outline"
    size="lg"
    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
  >
    Live Demo
  </Button>
</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroRight
