'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/ui/Button'

interface HeroBottomProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  theme?: 'light' | 'dark'
}

const HeroBottom: React.FC<HeroBottomProps> = ({
  title = "Ready to Get Started?",
  subtitle = "Join thousands of satisfied users today",
  ctaText = "Sign Up Now",
  ctaLink = "/signup",
  theme = 'dark',
}) => {
  const { dir } = useLanguage()
  
  const isDark = theme === 'dark'
  const bgColor = isDark ? 'bg-gray-900' : 'bg-gray-100'
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const subtitleColor = isDark ? 'text-gray-300' : 'text-gray-600'

  return (
    <section className={`${bgColor} py-16 px-4`}>
      <div className="container mx-auto max-w-4xl text-center">
        <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>
            {title}
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${subtitleColor}`}>
            {subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={ctaLink}>
              <Button
                size="lg"
                className={isDark ? 
                  "bg-blue-600 hover:bg-blue-700" : 
                  "bg-blue-600 text-white hover:bg-blue-700"
                }
              >
                {ctaText}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant={isDark ? "outline" : "secondary"}
                size="lg"
                className={isDark ? 
                  "border-white text-white hover:bg-white hover:text-gray-900" :
                  "bg-gray-600 text-white hover:bg-gray-700"
                }
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBottom