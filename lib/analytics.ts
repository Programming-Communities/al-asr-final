export interface AnalyticsEvent {
  category: string
  action: string
  label?: string
  value?: number
}

export class AnalyticsService {
  static trackPageView(url: string): void {
    if (typeof window === 'undefined') return

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
        page_path: url,
      })
    }

    // Custom analytics
    this.trackEvent({
      category: 'Page',
      action: 'View',
      label: url,
    })
  }

  static trackEvent(event: AnalyticsEvent): void {
    if (typeof window === 'undefined') return

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      })
    }

    // Custom event tracking
    console.log('Analytics Event:', event)

    // Send to your analytics endpoint
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {}) // Silent fail
    }
  }

  static trackPostView(slug: string, title: string): void {
    this.trackEvent({
      category: 'Post',
      action: 'View',
      label: title,
    })
  }

  static trackCategoryView(slug: string, name: string): void {
    this.trackEvent({
      category: 'Category',
      action: 'View', 
      label: name,
    })
  }

  static trackSearch(query: string, results: number): void {
    this.trackEvent({
      category: 'Search',
      action: 'Query',
      label: query,
      value: results,
    })
  }

  static trackAdClick(adId: string, position: string): void {
    this.trackEvent({
      category: 'Ad',
      action: 'Click',
      label: `${adId}-${position}`,
    })
  }
}

// Extend Window interface
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
