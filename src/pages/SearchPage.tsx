import React, { useState } from 'react'
import { SearchBar } from '../components/SearchBar'
import { SearchFilters } from '../components/SearchFilters'
import { SearchResults } from '../components/SearchResults'

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    serviceType: '',
    user: '',
  })
  const [results, setResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const handleSearch = (query) => {
    setSearchQuery(query)
    setHasSearched(true)
    // Mock search results
    setResults([
      {
        id: 1,
        title: '한국농어촌공사_가뭄지도 정보',
        provider: '한국농어촌공사',
        manager: '수질원',
        date: '2025-03-13',
        views: 6260,
        downloads: 3310,
        updateFrequency: 18,
        keywords: '농업용수,저수지수위,가뭄정보',
        formats: ['CSV', 'JSON', 'XML'],
      },
      // ... rest of mock data
    ])
  }
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    })
  }
  const handleReset = () => {
    setSearchQuery('')
    setFilters({
      category: '',
      serviceType: '',
      user: '',
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
            <SearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
          </div>
        </div>
      ) : (
        <div className="w-full py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <SearchBar onSearch={handleSearch} />
            <SearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
            <SearchResults
              query={searchQuery}
              results={results}
              filters={filters}
            />
          </div>
        </div>
      )}
    </div>
  )
}
