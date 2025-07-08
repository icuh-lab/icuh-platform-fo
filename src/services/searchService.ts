import type { SearchRequest, SearchResponse } from '../types/search'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1'

export async function searchData(request: SearchRequest): Promise<SearchResponse> {
  try {
    // 쿼리 파라미터 구성
    const params = new URLSearchParams()
    
    if (request.query) params.append('query', request.query)
    if (request.documentType) params.append('documentType', request.documentType)
    if (request.subjectDomain) params.append('subjectDomain', request.subjectDomain)
    if (request.source) params.append('source', request.source)
    
    const url = `${API_BASE_URL}/articles?${params.toString()}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Search request failed:', error)
    throw error
  }
}

// Mock data for development/testing
export function getMockSearchResults(request: SearchRequest): SearchResponse {
  const mockResults = [
    {
      id: 18,
      title: '전자정부 표준 프레임워크 가이드 테스터 문서',
      authorOrganization: '행정안전부',
      updatedAt: '2025-07-07T10:48:39',
      views: 0,
      extensions: ['pdf'],
    },
    {
      id: 19,
      title: '전자정부 표준 프레임워크 가이드 테스터 문서',
      authorOrganization: '행정안전부',
      updatedAt: '2025-07-07T11:56:36',
      views: 0,
      extensions: ['pdf'],
    },
    {
      id: 20,
      title: '전자정부 표준 프레임워크 가이드 테스터 문서',
      authorOrganization: '행정안전부',
      updatedAt: '2025-07-07T11:56:56',
      views: 0,
      extensions: ['pdf'],
    },
    {
      id: 21,
      title: '전자정부 표준 프레임워크 가이드 테스터 문서',
      authorOrganization: '행정안전부',
      updatedAt: '2025-07-07T11:57:19',
      views: 0,
      extensions: ['pdf'],
    },
  ]

  // 필터링 로직 (실제로는 서버에서 처리)
  let filteredResults = mockResults

  if (request.documentType) {
    filteredResults = filteredResults.filter(item => 
      item.title.includes(request.documentType!) || 
      item.authorOrganization.includes(request.documentType!)
    )
  }

  if (request.subjectDomain) {
    filteredResults = filteredResults.filter(item => 
      item.title.includes(request.subjectDomain!) || 
      item.authorOrganization.includes(request.subjectDomain!)
    )
  }

  if (request.query) {
    filteredResults = filteredResults.filter(item => 
      item.title.toLowerCase().includes(request.query!.toLowerCase()) ||
      item.authorOrganization.toLowerCase().includes(request.query!.toLowerCase())
    )
  }

  return {
    status: 200,
    message: 'Success',
    data: filteredResults,
  }
} 