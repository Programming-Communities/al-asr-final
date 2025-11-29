'use client'

import React from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/ui/Button'
import Link from 'next/link'

interface HeroLeftProps {
  title?: string
  subtitle?: string
  imageUrl?: string
  ctaText?: string
  ctaLink?: string
}

const HeroLeft: React.FC<HeroLeftProps> = ({
  title = "Innovative Solutions",
  subtitle = "We provide cutting-edge solutions for your business needs with our expert team and advanced technology.",
  imageUrl = "/api/placeholder/600/400",
  ctaText = "Explore Solutions",
  ctaLink = "/solutions",
}) => {
  const { dir } = useLanguage()
  const isRTL = dir === 'rtl'

  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className={`flex flex-col lg:flex-row items-center gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Text Content */}
          <div className={`flex-1 ${isRTL ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {subtitle}
            </p>
            <div className={`flex flex-wrap gap-4 ${isRTL ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
           <Link href={ctaLink}>
  <Button
    size="lg"
    className="bg-blue-600 hover:bg-blue-700"
  >
    {ctaText}
  </Button>
</Link>
<Link href="/about">
  <Button
    variant="outline"
    size="lg"
    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
  >
    Learn More
  </Button>
</Link>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex-1">
            <div className="relative">
              <img
                src={imageUrl}
                alt={title}
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              {/* Decorative elements */}
              <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500 rounded-2xl opacity-20 -z-10 ${isRTL ? 'lg:-left-4 lg:right-auto' : ''}`}></div>
              <div className={`absolute -top-4 -left-4 w-16 h-16 bg-purple-500 rounded-2xl opacity-20 -z-10 ${isRTL ? 'lg:-right-4 lg:left-auto' : ''}`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroLeft
