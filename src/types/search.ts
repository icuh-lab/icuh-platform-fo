export interface SearchFilters {
  documentType: string
  subjectDomain: string
  source: string
}

export interface SearchResult {
  id: number
  title: string
  authorOrganization: string
  updatedAt: string
  views: number
  extensions: string[]
  documentType: string
  subjectDomain: string
  source: string
}

// OpenAPI 데이터 타입 추가
export interface OpenAPIResult {
  id: number
  title: string
  description: string
  apiUrl: string
  provider: string
  category: string
  documentType: string
  subjectDomain: string
  source: string
  updatedAt: string
  status: 'active' | 'inactive'
  responseFormat: string
  rateLimit?: string
  authentication?: string
}

export interface SearchRequest {
  query?: string
  documentType?: string
  subjectDomain?: string
  source?: string
  page?: number
  size?: number
}

export interface SearchResponse {
  status: number
  message: string
  data: {
    content: SearchResult[]
    totalPages: number
    totalElements: number
    size: number
    number: number
    first: boolean
    last: boolean
    pageable?: any
    sort?: any
    numberOfElements?: number
    empty?: boolean
  }
}

// 통합 검색 응답 타입
export interface UnifiedSearchResponse {
  fileData: {
    content: SearchResult[]
    totalPages: number
    totalElements: number
    size: number
    number: number
    first: boolean
    last: boolean
    pageable?: any
    sort?: any
    numberOfElements?: number
    empty?: boolean
  }
  openAPIData: {
    content: OpenAPIResult[]
    totalPages: number
    totalElements: number
    size: number
    number: number
    first: boolean
    last: boolean
    pageable?: any
    sort?: any
    numberOfElements?: number
    empty?: boolean
  }
} 