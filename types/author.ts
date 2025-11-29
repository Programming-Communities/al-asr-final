export interface Author {
  id: string
  name: string
  slug: string
  description?: string
  avatar?: {
    url: string
  }
}

export interface AuthorsResponse {
  users: {
    nodes: Author[]
  }
}
