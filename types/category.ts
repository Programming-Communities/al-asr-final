export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  count?: number
  seo?: {
    title: string
    metaDesc: string
  }
}

export interface CategoriesResponse {
  categories: {
    nodes: Category[]
  }
}

export interface CategoryResponse {
  category: Category
}
