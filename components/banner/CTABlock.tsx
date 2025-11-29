'use client'

import React from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/ui/Button'
import Link from 'next/link'

interface CTABlockProps {
  title: string
  description?: string
  primaryButton?: {
    text: string
    link: string
    variant?: 'primary' | 'secondary' | 'outline'
  }
  secondaryButton?: {
    text: string
    link: string
    variant?: 'primary' | 'secondary' | 'outline'
  }
  theme?: 'blue' | 'green' | 'purple' | 'gradient'
  alignment?: 'left' | 'center' | 'right'
  size?: 'sm' | 'md' | 'lg'
}

const CTABlock: React.FC<CTABlockProps> = ({
  title,
  description,
  primaryButton = {
    text: 'Get Started',
    link: '/get-started',
    variant: 'primary'
  },
  secondaryButton,
  theme = 'blue',
  alignment = 'center',
  size = 'md'
}) => {
  const { dir } = useLanguage()
  const isRTL = dir === 'rtl'

  const themeClasses = {
    blue: 'bg-blue-600 text-white',
    green: 'bg-green-600 text-white',
    purple: 'bg-purple-600 text-white',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-700 text-white'
  }

  const sizeClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16'
  }

  const alignmentClasses = {
    left: isRTL ? 'text-right' : 'text-left',
    center: 'text-center',
    right: isRTL ? 'text-left' : 'text-right'
  }

  const buttonAlignmentClasses = {
    left: isRTL ? 'lg:justify-end' : 'lg:justify-start',
    center: 'justify-center',
    right: isRTL ? 'lg:justify-start' : 'lg:justify-end'
  }

  return (
    <section className={`${themeClasses[theme]} ${sizeClasses[size]} px-4`}>
      <div className="container mx-auto max-w-4xl">
        <div className={alignmentClasses[alignment]}>
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${alignment === 'center' ? 'mx-auto' : ''}`}>
            {title}
          </h2>
          
          {description && (
            <p className={`text-lg opacity-90 mb-8 ${alignment === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
              {description}
            </p>
          )}
          
          <div className={`flex flex-wrap gap-4 ${buttonAlignmentClasses[alignment]} ${alignment === 'center' ? 'justify-center' : ''}`}>
            <Link href={primaryButton.link}>
              <Button
                size="lg"
                variant={primaryButton.variant === 'primary' ? 'primary' : primaryButton.variant === 'secondary' ? 'secondary' : 'outline'}
                className={
                  theme === 'gradient' && primaryButton.variant === 'primary' 
                    ? 'bg-white text-blue-600 hover:bg-blue-50' 
                    : primaryButton.variant === 'outline'
                    ? 'border-white text-white hover:bg-white hover:text-blue-600'
                    : ''
                }
              >
                {primaryButton.text}
              </Button>
            </Link>
            
            {secondaryButton && (
              <Link href={secondaryButton.link}>
                <Button
                  size="lg"
                  variant={secondaryButton.variant === 'primary' ? 'primary' : secondaryButton.variant === 'secondary' ? 'secondary' : 'outline'}
                  className={
                    theme === 'gradient' && secondaryButton.variant === 'outline'
                      ? 'border-white text-white hover:bg-white hover:text-blue-600'
                      : secondaryButton.variant === 'outline'
                      ? 'border-white text-white hover:bg-white hover:text-blue-600'
                      : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
                  }
                >
                  {secondaryButton.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTABlock