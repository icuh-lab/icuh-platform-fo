import React from 'react'
import { useNavigate } from 'react-router'
import type { SearchResult, SearchFilters } from '../types/search'

interface ResultItemProps {
  data: SearchResult
  filters?: SearchFilters
}

export function ResultItem({ data }: ResultItemProps) {
  const navigate = useNavigate()
  // 확장자 중복 제거
  const uniqueExtensions = Array.from(new Set(data.extensions))

  // 태그 리스트: 각 게시글의 필터 정보
  const tagList = [
    { type: 'documentType', value: data.documentType },
    { type: 'subjectDomain', value: data.subjectDomain },
    { type: 'source', value: data.source },
  ].filter(tag => tag.value)

  // 태그 스타일/라벨/한글값 함수 기존 그대로 사용
  const getTagColor = (filterType: string) => {
    switch (filterType) {
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
  const getTagLabel = (filterType: string) => {
    switch (filterType) {
      case 'documentType':
        return '문서성격'
      case 'subjectDomain':
        return '주제영역'
      case 'source':
        return '출처'
      default:
        return filterType
    }
  }
  const getKoreanValue = (filterType: string, value: string) => {
    switch (filterType) {
      case 'documentType':
        const documentTypeMap: { [key: string]: string } = {
          report: '보고서',
          survey_data: '조사자료',
          guideline: '가이드라인',
          manual: '매뉴얼',
          statistical_data: '통계자료',
          program: '프로그램',
          thesis: '논문',
          research_data: '연구자료',
          others: '기타',
        }
        return documentTypeMap[value] || value
      case 'subjectDomain':
        const subjectDomainMap: { [key: string]: string } = {
          agriculture: '농업',
          ecosystem: '생태계',
          energy: '에너지',
          wildfire: '산불',
          water_supply: '물 공급 및 수도시설',
          sanitation: '위생',
          industry: '산업',
          socio_economy: '사회 경제',
          climate_change: '기후 변화',
          drought_monitoring: '가뭄진단 및 예경보',
          international: '해외',
          environment: '환경',
          livestock: '축산업',
          fisheries: '수산업',
          others: '기타',
        }
        return subjectDomainMap[value] || value
      case 'source':
        const sourceMap: { [key: string]: string } = {
          domestic: '국내',
          foreign: '해외',
        }
        return sourceMap[value] || value
      default:
        return value
    }
  }

  return (
    <div className="py-6 first:pt-0 border-t border-gray-100 first:border-0">
      <div className="mb-3">
        <h3
          className="text-lg mb-1 hover:text-blue-600 cursor-pointer"
          onClick={() => navigate(`/detail/${data.id}`)}
        >
          {data.title}
        </h3>
        <div className="flex gap-1">
          {uniqueExtensions.map((extension) => (
            <span key={extension} className="text-xs text-gray-500">
              {extension.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap text-sm text-gray-500 gap-x-4 gap-y-1 mb-4">
        <div>{data.authorOrganization}</div>
        <div>수정일: {new Date(data.updatedAt).toLocaleDateString('ko-KR')}</div>
        <div>조회수: {data.views}</div>
      </div>
      <div className="flex gap-2">
        {uniqueExtensions.map((extension) => (
          <span
            key={extension}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
          >
            {extension.toUpperCase()}
          </span>
        ))}
        {/* 각 게시글의 필터 태그 항상 노출 */}
        {tagList.map(({ type, value }) => (
          <div
            key={`${type}-${value}`}
            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getTagColor(type)}`}
          >
            <span className="mr-1">{getTagLabel(type)}:</span>
            <span>{getKoreanValue(type, value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
