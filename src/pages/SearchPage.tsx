import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { SearchBar } from '../components/SearchBar'
import { SearchFilters } from '../components/SearchFilters'
import type { SearchFilters as SearchFiltersType } from '../types/search'

export function SearchPage() {
  const navigate = useNavigate()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<SearchFiltersType>({
    documentType: '',
    subjectDomain: '',
    source: '',
  })
  
  const handleSearch = (query: string) => {
    // 검색 결과 페이지로 이동
    const searchParams = new URLSearchParams()
    if (query) searchParams.set('query', query)
    if (filters.documentType) searchParams.set('documentType', filters.documentType)
    if (filters.subjectDomain) searchParams.set('subjectDomain', filters.subjectDomain)
    if (filters.source) searchParams.set('source', filters.source)
    
    navigate(`/search?${searchParams.toString()}`)
  }
  
  const handleFilterChange = (filterType: keyof SearchFiltersType, value: string) => {
    const newFilters = {
      ...filters,
      [filterType]: value,
    }
    setFilters(newFilters)
  }
  
  const handleReset = () => {
    setSearchQuery('')
    setFilters({
      documentType: '',
      subjectDomain: '',
      source: '',
    })
  }
  
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-3xl mx-auto mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="w-full max-w-3xl mx-auto">
          <SearchFilters filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />
        </div>
      </div>
    </div>
  )
}
