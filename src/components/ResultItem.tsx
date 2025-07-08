import React from 'react'
import { useNavigate } from 'react-router'
import type { SearchResult, SearchFilters } from '../types/search'

interface ResultItemProps {
  data: SearchResult
  filters?: SearchFilters
}

export function ResultItem({ data, filters }: ResultItemProps) {
  const navigate = useNavigate()
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
          {data.extensions.map((extension) => (
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
        {data.extensions.map((extension) => (
          <span
            key={extension}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
          >
            {extension.toUpperCase()}
          </span>
        ))}
        
        {/* 필터 태그 표시 */}
        {filters && Object.entries(filters).filter(([_, value]) => value !== '').map(([type, value]) => {
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
                  '보고서': '보고서',
                  '조사자료': '조사자료',
                  '가이드라인': '가이드라인',
                  '매뉴얼': '매뉴얼',
                  '통계자료': '통계자료',
                  '프로그램': '프로그램',
                  '논문': '논문',
                  '연구자료': '연구자료',
                  '기타': '기타',
                  // 영어 값 매핑 (필요시 추가)
                  'report': '보고서',
                  'survey': '조사자료',
                  'guideline': '가이드라인',
                  'manual': '매뉴얼',
                  'statistics': '통계자료',
                  'program': '프로그램',
                  'thesis': '논문',
                  'research': '연구자료',
                  'other': '기타'
                }
                return documentTypeMap[value] || value
              
              case 'subjectDomain':
                const subjectDomainMap: { [key: string]: string } = {
                  '농업': '농업',
                  '생태계': '생태계',
                  '에너지': '에너지',
                  '산불': '산불',
                  '물 공급 및 수도시설': '물 공급 및 수도시설',
                  '위생': '위생',
                  '산업': '산업',
                  '사회 경제': '사회 경제',
                  '기후 변화': '기후 변화',
                  '가뭄진단 및 예경보': '가뭄진단 및 예경보',
                  '해외': '해외',
                  '환경': '환경',
                  '축산업': '축산업',
                  '수산업': '수산업',
                  '기타': '기타',
                  // 영어 값 매핑 (필요시 추가)
                  'agriculture': '농업',
                  'ecosystem': '생태계',
                  'energy': '에너지',
                  'wildfire': '산불',
                  'water_supply': '물 공급 및 수도시설',
                  'sanitation': '위생',
                  'industry': '산업',
                  'social_economy': '사회 경제',
                  'climate_change': '기후 변화',
                  'drought': '가뭄진단 및 예경보',
                  'overseas': '해외',
                  'environment': '환경',
                  'livestock': '축산업',
                  'fishery': '수산업',
                  'other': '기타'
                }
                return subjectDomainMap[value] || value
              
              case 'source':
                const sourceMap: { [key: string]: string } = {
                  '국내': '국내',
                  '해외': '해외',
                  // 영어 값 매핑 (필요시 추가)
                  'domestic': '국내',
                  'overseas': '해외',
                  'foreign': '해외'
                }
                return sourceMap[value] || value
              
              default:
                return value
            }
          }

          return (
            <div
              key={`${type}-${value}`}
              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getTagColor(type)}`}
            >
              <span className="mr-1">{getTagLabel(type)}:</span>
              <span>{getKoreanValue(type, value)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
