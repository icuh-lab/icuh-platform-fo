import React from 'react'
import { RefreshCwIcon } from 'lucide-react'

export function SearchFilters({ filters, onFilterChange, onReset }) {
  const selectClass = 'py-2 pl-3 pr-8 text-sm rounded bg-gray-50 border-gray-100 hover:border-gray-200 focus:border-gray-200 focus:bg-white w-40 transition-colors'
  
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button onClick={onReset} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors">
        <RefreshCwIcon className="w-4 h-4" />
          검색 초기화
      </button>
      <div className="relative">
        <select className={selectClass} value={filters.category} onChange={(e) => onFilterChange('category', e.target.value)}>
          <option value="">문서 성격</option>
          <option value="공공행정">공공행정</option>
          <option value="문화관광">문화관광</option>
          <option value="환경기상">환경기상</option>
          <option value="교육">교육</option>
        </select>
      </div>
      <div className="relative">
        <select className={selectClass} value={filters.serviceType} onChange={(e) => onFilterChange('serviceType', e.target.value)}>
          <option value="">주제 영역</option>
          <option value="파일데이터">파일데이터</option>
          <option value="오픈API">오픈API</option>
          <option value="표준데이터">표준데이터</option>
        </select>
      </div>
      <div className="relative">
        <select className={selectClass} value={filters.user} onChange={(e) => onFilterChange('user', e.target.value)}>
          <option value="">출처</option>
          <option value="CSV">CSV</option>
          <option value="JSON">JSON</option>
          <option value="XML">XML</option>
          <option value="PDF">PDF</option>
          <option value="XLS">XLS</option>
        </select>
      </div>
    </div>
  )
}
