export const adsConfig = {
  adSlots: {
    header: {
      enabled: true,
      desktop: 'header_desktop',
      mobile: 'header_mobile',
    },
    sidebar: {
      enabled: true, 
      desktop: 'sidebar_desktop',
    },
    inArticle: {
      enabled: true,
      frequency: 3, // Show ad after every 3 paragraphs
    },
    footer: {
      enabled: true,
    },
  },
  adNetworks: {
    googleAdsense: {
      enabled: true,
      clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
    },
    sponsor: {
      enabled: true,
    },
  },
}

export type AdSlot = keyof typeof adsConfig.adSlots
