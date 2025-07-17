import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { SearchBar } from '../components/SearchBar'
import { SearchFilters } from '../components/SearchFilters'
import { SearchResults } from '../components/SearchResults'
import type { SearchFilters as SearchFiltersType, SearchResult } from '../types/search'
import { searchData } from '../services/searchService'
import { Pagination } from '../components/Pagination'

export function SearchResultsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<SearchFiltersType>({
    documentType: '',
    subjectDomain: '',
    source: '',
  })
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  // URL 파라미터에서 검색 상태 복원
  useEffect(() => {
    const queryFromUrl = searchParams.get('query') || ''
    const documentType = searchParams.get('documentType') || ''
    const subjectDomain = searchParams.get('subjectDomain') || ''
    const source = searchParams.get('source') || ''
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10)

    setSearchQuery(queryFromUrl)
    setFilters({
      documentType,
      subjectDomain,
      source,
    })
    setCurrentPage(pageFromUrl)
    // 검색 실행
    performSearch(queryFromUrl, { documentType, subjectDomain, source }, pageFromUrl)
  }, [searchParams])

  const performSearch = async (query: string, currentFilters: SearchFiltersType, page: number = 1) => {
    setIsLoading(true)
    setError(null)
    try {
      const searchRequest = {
        query: query || undefined,
        documentType: currentFilters.documentType || undefined,
        subjectDomain: currentFilters.subjectDomain || undefined,
        source: currentFilters.source || undefined,
        page: page - 1, // 백엔드가 0-base면 -1, 1-base면 그대로
        size: pageSize,
      } as any
      const response = await searchData(searchRequest)
      // response.data.content, response.data.totalPages, ...
      setResults(response.data.content)
      setTotalPages(response.data.totalPages)
      setTotalElements(response.data.totalElements)
      setPageSize(response.data.size)
    } catch (err) {
      setError('검색 중 오류가 발생했습니다.')
      console.error('Search error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    // URL 파라미터 업데이트
    const newSearchParams = new URLSearchParams()
    if (query) newSearchParams.set('query', query)
    if (filters.documentType) newSearchParams.set('documentType', filters.documentType)
    if (filters.subjectDomain) newSearchParams.set('subjectDomain', filters.subjectDomain)
    if (filters.source) newSearchParams.set('source', filters.source)
    newSearchParams.set('page', '1')
    setSearchParams(newSearchParams)
  }

  const handleFilterChange = async (filterType: keyof SearchFiltersType, value: string) => {
    const newFilters = {
      ...filters,
      [filterType]: value,
    }
    setFilters(newFilters)
    // URL 파라미터 업데이트
    const newSearchParams = new URLSearchParams()
    if (searchQuery) newSearchParams.set('query', searchQuery)
    if (newFilters.documentType) newSearchParams.set('documentType', newFilters.documentType)
    if (newFilters.subjectDomain) newSearchParams.set('subjectDomain', newFilters.subjectDomain)
    if (newFilters.source) newSearchParams.set('source', newFilters.source)
    newSearchParams.set('page', '1')
    setSearchParams(newSearchParams)
  }

  const handleReset = () => {
    setSearchQuery('')
    setFilters({
      documentType: '',
      subjectDomain: '',
      source: '',
    })
    setResults([])
    setError(null)
    setCurrentPage(1)
    // URL 파라미터 초기화
    setSearchParams({})
  }

  const handleBackToSearch = () => {
    navigate('/', { replace: true })
  }

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', String(page))
    setSearchParams(newSearchParams)
    setCurrentPage(page)
  }

  // 페이지 사이즈 변경 핸들러
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10)
    setPageSize(newSize)
    setCurrentPage(1)
    // URL 파라미터에 size, page=1 반영
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('size', String(newSize))
    newSearchParams.set('page', '1')
    setSearchParams(newSearchParams)
  }

  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={handleBackToSearch}className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
            ← 검색 페이지로 돌아가기
          </button>
        </div>
        {/* 페이지 사이즈 선택 */}
        <div className="flex justify-end mb-2">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            페이지당 표시:
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            건
          </label>
        </div>
        
        <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
        <SearchFilters filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />
        <SearchResults query={searchQuery} results={results} filters={filters} isLoading={isLoading} error={error} totalElements={totalElements} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  )
} 