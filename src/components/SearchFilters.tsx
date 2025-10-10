import React from 'react'
import { RefreshCwIcon } from 'lucide-react'
import type { SearchFilters as SearchFiltersType } from '../types/search'

interface SearchFiltersProps {
  filters: SearchFiltersType
  onFilterChange: (filterType: keyof SearchFiltersType, value: string) => void
  onReset: () => void
}

export function SearchFilters({ filters, onFilterChange, onReset }: SearchFiltersProps) {
  const selectClass = 'py-2 pl-3 pr-8 text-sm rounded bg-gray-50 border-gray-100 hover:border-gray-200 focus:border-gray-200 focus:bg-white w-40 transition-colors'
  
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button onClick={onReset} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors">
        <RefreshCwIcon className="w-4 h-4" />
          검색 초기화
      </button>
      <div className="relative">
        <select className={selectClass} value={filters.documentType} onChange={(e) => onFilterChange('documentType', e.target.value)}>
          <option value="">문서 성격</option>
          <option value="RESEARCH_SURVEY">연구/조사 자료</option>
          <option value="POLICY_STANDARD">정책/기준 문서</option>
          <option value="REPORT">보고서</option>
          <option value="DATA_TECHNICAL">데이터/기술 자료</option>
          <option value="PLANNING_PROPOSAL">기획/계획 문서</option>
          <option value="OTHERS">기타</option>
        </select>
      </div>
      <div className="relative">
        <select className={selectClass} value={filters.subjectDomain} onChange={(e) => onFilterChange('subjectDomain', e.target.value)}>
          <option value="">주제 영역</option>
          <option value="CLIMATE_IMPACT_INDUSTRY">기후 영향 산업 분야</option>
          <option value="RESOURCE_ENVIRONMENTAL_MANAGEMENT">자원 및 환경 관리</option>
          <option value="DISASTER_CLIMATE_RISK">재난 및 기후 리스크</option>
          <option value="SOCIO_ECONOMIC_IMPACT">사회/경제적 영향</option>
          <option value="REGIONAL_EXTERNAL_REFERENCE">지역/외부 참조 정보</option>
          <option value="OTHERS">기타</option>
        </select>
      </div>
      <div className="relative">
        <select className={selectClass} value={filters.source} onChange={(e) => onFilterChange('source', e.target.value)}>
          <option value="">출처</option>
          <option value="domestic">국내</option>
          <option value="foreign">해외</option>
        </select>
      </div>
    </div>
  )
}
