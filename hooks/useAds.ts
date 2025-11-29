'use client'

import { useState, useEffect } from 'react'
import { type AdUnit } from '@/types'

export function useAds(position: string) {
  const [ads, setAds] = useState<AdUnit[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAds = async () => {
      try {
        // Simulate API call to get ads for position
        const response = await fetch(`/api/ads?position=${position}`)
        if (response.ok) {
          const data = await response.json()
          setAds(data.ads || [])
        }
      } catch (error) {
        console.error('Failed to load ads:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAds()
  }, [position])

  const trackAdClick = (adId: string) => {
    // Track ad click analytics
    fetch('/api/ads/click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ adId, position }),
    }).catch(() => {}) // Silent fail

    // Open ad URL
    const ad = ads.find(a => a.id === adId)
    if (ad) {
      window.open(ad.content, '_blank', 'noopener,noreferrer')
    }
  }

  return {
    ads,
    isLoading,
    trackAdClick,
  }
}

export function useAdVisibility(adId: string) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Track ad impression
            fetch('/api/ads/impression', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ adId }),
            }).catch(() => {}) // Silent fail
          }
        })
      },
      { threshold: 0.5 }
    )

    const element = document.getElementById(`ad-${adId}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [adId])

  return isVisible
}
