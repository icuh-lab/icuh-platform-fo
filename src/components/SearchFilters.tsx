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
          <option value="report">보고서</option>
          <option value="survey_data">조사자료</option>
          <option value="guideline">가이드라인</option>
          <option value="manual">매뉴얼</option>
          <option value="statistical_data">통계자료</option>
          <option value="program">프로그램</option>
          <option value="thesis">논문</option>
          <option value="research_data">연구자료</option>
          <option value="others">기타</option>
        </select>
      </div>
      <div className="relative">
        <select className={selectClass} value={filters.subjectDomain} onChange={(e) => onFilterChange('subjectDomain', e.target.value)}>
          <option value="">주제 영역</option>
          <option value="agriculture">농업</option>
          <option value="ecosystem">생태계</option>
          <option value="energy">에너지</option>
          <option value="wildfire">산불</option>
          <option value="water_supply">물 공급 및 수도시설</option>
          <option value="sanitation">위생</option>
          <option value="industry">산업</option>
          <option value="socio_economy">사회 경제</option>
          <option value="climate_change">기후 변화</option>
          <option value="drought_monitoring">가뭄진단 및 예경보</option>
          <option value="international">해외</option>
          <option value="environment">환경</option>
          <option value="livestock">축산업</option>
          <option value="fisheries">수산업</option>
          <option value="others">기타</option>
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
