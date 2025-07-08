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
        <select className={selectClass} value={filters.documentType} onChange={(e) => onFilterChange('documentType', e.target.value)}>
          <option value="">문서 성격</option>
          <option value="보고서">보고서</option>
          <option value="조사자료">조사자료</option>
          <option value="가이드라인">가이드라인</option>
          <option value="매뉴얼">매뉴얼</option>
          <option value="통계자료">통계자료</option>
          <option value="프로그램">프로그램</option>
          <option value="논문">논문</option>
          <option value="연구자료">연구자료</option>
          <option value="기타">기타</option>
        </select>
      </div>
      <div className="relative">
        <select className={selectClass} value={filters.subjectDomain} onChange={(e) => onFilterChange('subjectDomain', e.target.value)}>
          <option value="">주제 영역</option>
          <option value="농업">농업</option>
          <option value="생태계">생태계</option>
          <option value="에너지">에너지</option>
          <option value="산불">산불</option>
          <option value="물 공급 및 수도시설">물 공급 및 수도시설</option>
          <option value="위생">위생</option>
          <option value="산업">산업</option>
          <option value="사회 경제">사회 경제</option>
          <option value="기후 변화">기후 변화</option>
          <option value="가뭄진단 및 예경보">가뭄진단 및 예경보</option>
          <option value="해외">해외</option>
          <option value="환경">환경</option>
          <option value="축산업">축산업</option>
          <option value="수산업">수산업</option>
          <option value="기타">기타</option>
        </select>
      </div>
      <div className="relative">
        <select className={selectClass} value={filters.source} onChange={(e) => onFilterChange('source', e.target.value)}>
          <option value="">출처</option>
          <option value="국내">국내</option>
          <option value="해외">해외</option>
        </select>
      </div>
    </div>
  )
}
