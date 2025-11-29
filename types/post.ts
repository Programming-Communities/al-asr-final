export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage?: {
    node: {
      sourceUrl: string
      altText: string
    }
  }
  author: {
    node: Author
  }
  categories: {
    nodes: Category[]
  }
  tags: {
    nodes: Tag[]
  }
  commentCount?: number
  commentStatus: string
  date: string
  modified: string
  seo?: SEO
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface SEO {
  title: string
  metaDesc: string
  opengraphTitle: string
  opengraphDescription: string
  opengraphImage?: {
    sourceUrl: string
  }
}

export interface PostsResponse {
  posts: {
    nodes: Post[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string
    }
  }
}

export interface PostResponse {
  post: Post
}
