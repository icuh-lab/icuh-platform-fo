import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { SearchBar } from '../components/SearchBar'
import { SearchFilters } from '../components/SearchFilters'
import { SearchResults } from '../components/SearchResults'
import type { SearchFilters as SearchFiltersType, SearchResult } from '../types/search'
import { searchData } from '../services/searchService'

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
  
  // URL 파라미터에서 검색 상태 복원
  useEffect(() => {
    const queryFromUrl = searchParams.get('query') || ''
    const documentType = searchParams.get('documentType') || ''
    const subjectDomain = searchParams.get('subjectDomain') || ''
    const source = searchParams.get('source') || ''
    
    setSearchQuery(queryFromUrl)
    setFilters({
      documentType,
      subjectDomain,
      source,
    })
    
    // 검색 실행
    performSearch(queryFromUrl, { documentType, subjectDomain, source })
  }, [searchParams])
  
  const performSearch = async (query: string, currentFilters: SearchFiltersType) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const searchRequest = {
        query: query || undefined,
        documentType: currentFilters.documentType || undefined,
        subjectDomain: currentFilters.subjectDomain || undefined,
        source: currentFilters.source || undefined,
      }
      
      const response = await searchData(searchRequest)
      setResults(response.data.content)
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
    
    // URL 파라미터 초기화
    setSearchParams({})
  }
  
  const handleBackToSearch = () => {
    navigate('/', { replace: true })
  }
  
  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={handleBackToSearch}className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
            ← 검색 페이지로 돌아가기
          </button>
        </div>
        
        <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
        <SearchFilters filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />
        <SearchResults query={searchQuery} results={results} filters={filters} isLoading={isLoading} error={error} />
      </div>
    </div>
  )
} 