// lib/graphql.ts
import { GRAPHQL_ENDPOINT } from '@/utils/constants'

// Fallback GraphQL client implementation
class FallbackGraphQLClient {
  private endpoint: string
  private headers: Record<string, string>

  constructor(endpoint: string, options: { headers?: Record<string, string> } = {}) {
    this.endpoint = endpoint
    this.headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
  }

  async request<T = any>(query: string, variables?: any): Promise<T> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`)
    }

    const result = await response.json()

    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`)
    }

    return result.data
  }

  setHeader(key: string, value: string): void {
    this.headers[key] = value
  }
}

// Try to use the real GraphQLClient, otherwise use fallback
let GraphQLClient: any = FallbackGraphQLClient

try {
  const { GraphQLClient: RealGraphQLClient } = require('graphql-request')
  GraphQLClient = RealGraphQLClient
} catch (error) {
  console.warn('Using fallback GraphQL client')
}

export const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
})

export const setGraphQLAuthToken = (token: string) => {
  if (graphQLClient.setHeader) {
    graphQLClient.setHeader('Authorization', `Bearer ${token}`)
  }
}

export const clearGraphQLAuthToken = () => {
  if (graphQLClient.setHeader) {
    graphQLClient.setHeader('Authorization', '')
  }
}