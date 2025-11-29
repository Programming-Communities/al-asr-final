import { NextRequest, NextResponse } from 'next/server'

// Mock ads data
const ads = [
  {
    id: '1',
    name: 'Header Banner',
    type: 'banner',
    position: 'top',
    content: '<div class="ad-banner">Sponsored Content</div>',
    isActive: true,
    impressions: 12450,
    clicks: 345
  },
  {
    id: '2',
    name: 'Sidebar Ad',
    type: 'sidebar', 
    position: 'right',
    content: '<div class="ad-sidebar">Special Offer</div>',
    isActive: true,
    impressions: 8670,
    clicks: 123
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const position = searchParams.get('position')
  const type = searchParams.get('type')

  let filteredAds = ads.filter(ad => ad.isActive)

  if (position) {
    filteredAds = filteredAds.filter(ad => ad.position === position)
  }

  if (type) {
    filteredAds = filteredAds.filter(ad => ad.type === type)
  }

  return NextResponse.json({ ads: filteredAds })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Track impression
    if (body.action === 'impression') {
      const ad = ads.find(a => a.id === body.adId)
      if (ad) {
        ad.impressions++
      }
      return NextResponse.json({ success: true })
    }

    // Track click
    if (body.action === 'click') {
      const ad = ads.find(a => a.id === body.adId)
      if (ad) {
        ad.clicks++
      }
      return NextResponse.json({ success: true })
    }

    // Create new ad
    const newAd = {
      id: (ads.length + 1).toString(),
      impressions: 0,
      clicks: 0,
      ...body
    }

    ads.push(newAd)

    return NextResponse.json({ ad: newAd }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process ad request' },
      { status: 500 }
    )
  }
}