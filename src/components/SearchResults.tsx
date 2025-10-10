import React from 'react'
import { ResultItem } from './ResultItem'
import { PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { SearchResult, SearchFilters } from '../types/search'

interface SearchResultsProps {
  query: string
  results: SearchResult[]
  filters: SearchFilters
  isLoading?: boolean
  error?: string | null
  totalElements?: number
}

export function SearchResults({ query, results, filters, isLoading = false, error = null, totalElements }: SearchResultsProps) {
  const navigate = useNavigate()
  
  if (isLoading) {
    return (
      <div className="mt-8 flex justify-center items-center py-12">
        <div className="text-gray-600">검색 중...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 flex justify-center items-center py-12">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base text-gray-600">
          검색결과 ({typeof totalElements === 'number' ? totalElements : results.length}건)
        </h2>
        {/* 중복된 게시글 작성 버튼 - 상단 UnifiedSearchResults에서 이미 제공됨 */}
        {/* <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" onClick={() => navigate('/create')}>
          <PlusIcon className="w-4 h-4" />
          게시글 작성
        </button> */}
      </div>
      
      <div className="space-y-6">
        {results.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            검색 결과가 없습니다.
          </div>
        ) : (
          results.map((result) => (
            <ResultItem key={result.id} data={result} filters={filters} />
          ))
        )}
      </div>
    </div>
  )
}
