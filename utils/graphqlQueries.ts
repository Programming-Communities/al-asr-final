export const POSTS_QUERY = `
  query GetPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
            slug
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export const POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      date
      modified
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          name
          slug
          description
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`

export const CATEGORIES_QUERY = `
  query GetCategories {
    categories {
      nodes {
        id
        name
        slug
        description
        count
      }
    }
  }
`

export const CATEGORY_BY_SLUG_QUERY = `
  query GetCategoryBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      id
      name
      slug
      description
      seo {
        title
        metaDesc
      }
    }
  }
`

export const COMMENTS_QUERY = `
  query GetComments($postId: ID!) {
    comments(where: {contentId: $postId}) {
      nodes {
        id
        content
        date
        author {
          node {
            name
            email
            avatar {
              url
            }
          }
        }
      }
    }
  }
`
