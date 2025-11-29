export interface AdUnit {
  id: string
  name: string
  type: 'banner' | 'sidebar' | 'in-article' | 'popup'
  position: 'top' | 'bottom' | 'left' | 'right'
  content: string
  isActive: boolean
  themeAware: boolean
  languageAware: boolean
}

export interface AdResponse {
  ads: AdUnit[]
}
