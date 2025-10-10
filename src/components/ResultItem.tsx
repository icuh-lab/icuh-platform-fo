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
          RESEARCH_SURVEY: '연구/조사 자료',
          POLICY_STANDARD: '정책/기준 문서',
          REPORT: '보고서',
          DATA_TECHNICAL: '데이터/기술 자료',
          PLANNING_PROPOSAL: '기획/계획 문서',
          OTHERS: '기타'
        }
        return documentTypeMap[value] || value
      case 'subjectDomain':
        const subjectDomainMap: { [key: string]: string } = {
          CLIMATE_IMPACT_INDUSTRY: '기후 영향 산업 분야',
          RESOURCE_ENVIRONMENTAL_MANAGEMENT: '자원 및 환경 관리',
          DISASTER_CLIMATE_RISK: '재난 및 기후 리스크',
          SOCIO_ECONOMIC_IMPACT: '사회/경제적 영향',
          REGIONAL_EXTERNAL_REFERENCE: '지역/외부 참조 정보',
          OTHERS: '기타'
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
