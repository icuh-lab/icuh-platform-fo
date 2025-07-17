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