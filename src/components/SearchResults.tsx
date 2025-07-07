import React from 'react'
import { ResultItem } from './ResultItem'
import { PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router'

export function SearchResults({ query, results, filters }) {
  const navigate = useNavigate()
  
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base text-gray-600">
          검색결과 ({results.length}건)
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" onClick={() => navigate('/create')}>
          <PlusIcon className="w-4 h-4" />
          게시글 작성
        </button>
      </div>
      <div className="space-y-6">
        {results.map((result) => (
          <ResultItem key={result.id} data={result} />
        ))}
      </div>
    </div>
  )
}
