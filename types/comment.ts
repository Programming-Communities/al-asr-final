export interface Comment {
  id: string
  content: string
  date: string
  author: {
    node: {
      name: string
      email?: string
      avatar?: {
        url: string
      }
    }
  }
}

export interface CommentsResponse {
  comments: {
    nodes: Comment[]
  }
}

export interface CommentSubmit {
  author: string
  authorEmail: string
  content: string
  commentOn: number
}
