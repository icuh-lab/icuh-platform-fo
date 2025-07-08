import React, { useState } from 'react'
import { SearchBar } from '../components/SearchBar'
import { SearchFilters } from '../components/SearchFilters'
import { SearchResults } from '../components/SearchResults'
import type { SearchFilters as SearchFiltersType, SearchResult } from '../types/search'
import { searchData, getMockSearchResults } from '../services/searchService'

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<SearchFiltersType>({
    documentType: '',
    subjectDomain: '',
    source: '',
  })
  const [results, setResults] = useState<SearchResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setHasSearched(true)
    setIsLoading(true)
    setError(null)
    
    try {
      // 서버 요청을 위한 파라미터 구성
      const searchRequest = {
        query: query || undefined,
        documentType: filters.documentType || undefined,
        subjectDomain: filters.subjectDomain || undefined,
        source: filters.source || undefined,
      }
      
      // 실제 서버 요청 (개발 중에는 mock 데이터 사용)
      const response = await searchData(searchRequest)
      // const response = getMockSearchResults(searchRequest)
      setResults(response.data)
    } catch (err) {
      setError('검색 중 오류가 발생했습니다.')
      console.error('Search error:', err)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleFilterChange = async (filterType: keyof SearchFiltersType, value: string) => {
    const newFilters = {
      ...filters,
      [filterType]: value,
    }
    setFilters(newFilters)
    
    // 검색어가 있고 이미 검색한 상태라면 필터 변경 시 자동으로 재검색
    if (searchQuery && hasSearched) {
      setIsLoading(true)
      setError(null)
      
      try {
        const searchRequest = {
          query: searchQuery || undefined,
          documentType: newFilters.documentType || undefined,
          subjectDomain: newFilters.subjectDomain || undefined,
          source: newFilters.source || undefined,
        }
        const response = await searchData(searchRequest)
        setResults(response.data)
      } catch (err) {
        setError('검색 중 오류가 발생했습니다.')
        console.error('Search error:', err)
      } finally {
        setIsLoading(false)
      }
    }
  }
  const handleReset = () => {
    setSearchQuery('')
    setFilters({
      documentType: '',
      subjectDomain: '',
      source: '',
    })
    setHasSearched(false)
    setResults([])
  }
  return (
    <div className="min-h-screen bg-white w-full">
      {!hasSearched ? (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-3xl mx-auto mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="w-full max-w-3xl mx-auto">
            <SearchFilters filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />
          </div>
        </div>
      ) : (
        <div className="w-full py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <SearchBar onSearch={handleSearch} />
            <SearchFilters filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />
            <SearchResults 
              query={searchQuery} 
              results={results} 
              filters={filters} 
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  )
}
