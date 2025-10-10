import React, { useState } from 'react'
import { SearchResults } from './SearchResults'
import { OpenAPIResultItem } from './OpenAPIResultItem'
import { PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { SearchResult, SearchFilters, OpenAPIResult } from '../types/search'

interface UnifiedSearchResultsProps {
  query: string
  fileResults: SearchResult[]
  openAPIResults: OpenAPIResult[]
  filters: SearchFilters
  isLoading?: boolean
  error?: string | null
  fileTotalElements?: number
  openAPITotalElements?: number
}

export function UnifiedSearchResults({ 
  query, 
  fileResults, 
  openAPIResults, 
  filters, 
  isLoading = false, 
  error = null, 
  fileTotalElements = 0,
  openAPITotalElements = 0
}: UnifiedSearchResultsProps) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'files' | 'openapi'>('files')

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
          검색결과 ({fileTotalElements + openAPITotalElements}건)
        </h2>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" 
          onClick={() => navigate('/create')}
        >
          <PlusIcon className="w-4 h-4" />
          게시글 작성
        </button>
      </div>

      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('files')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'files'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            파일 데이터 검색결과 ({fileTotalElements}건)
          </button>
          <button
            onClick={() => setActiveTab('openapi')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'openapi'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Open API 검색결과 ({openAPITotalElements}건)
          </button>
        </nav>
      </div>

      {/* 탭 콘텐츠 */}
      {activeTab === 'files' && (
        <SearchResults 
          query={query} 
          results={fileResults} 
          filters={filters} 
          isLoading={false} 
          error={null} 
          totalElements={fileTotalElements} 
        />
      )}

      {activeTab === 'openapi' && (
        <div className="space-y-6">
          {openAPIResults.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Open API 검색 결과가 없습니다.
            </div>
          ) : (
            openAPIResults.map((result) => (
              <OpenAPIResultItem key={result.id} data={result} />
            ))
          )}
        </div>
      )}
    </div>
  )
}
