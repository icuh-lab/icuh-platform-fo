import React from 'react'
import type { SearchFilters } from '../types/search'

interface FilterTagsProps {
  filters: SearchFilters
}

export function FilterTags({ filters }: FilterTagsProps) {
  const getTagColor = (type: string, value: string) => {
    switch (type) {
      case 'documentType':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'subjectDomain':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'source':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTagLabel = (type: string) => {
    switch (type) {
      case 'documentType':
        return '문서성격'
      case 'subjectDomain':
        return '주제영역'
      case 'source':
        return '출처'
      default:
        return type
    }
  }

  const activeFilters = Object.entries(filters).filter(([_, value]) => value !== '')

  if (activeFilters.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {activeFilters.map(([type, value]) => (
        <div
          key={`${type}-${value}`}
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(type, value)}`}
        >
          <span className="mr-1">{getTagLabel(type)}:</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  )
} 