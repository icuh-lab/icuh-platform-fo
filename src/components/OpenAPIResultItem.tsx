import React from 'react'
import { ExternalLinkIcon, GlobeIcon, ShieldIcon, ClockIcon } from 'lucide-react'
import type { OpenAPIResult } from '../types/search'

interface OpenAPIResultItemProps {
  data: OpenAPIResult
}

export function OpenAPIResultItem({ data }: OpenAPIResultItemProps) {
  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200'
  }

  const getStatusText = (status: string) => {
    return status === 'active' ? '활성' : '비활성'
  }

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      weather: 'bg-blue-100 text-blue-800 border-blue-200',
      environment: 'bg-green-100 text-green-800 border-green-200',
      agriculture: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      fisheries: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      wildfire: 'bg-orange-100 text-orange-800 border-orange-200',
      energy: 'bg-purple-100 text-purple-800 border-purple-200',
      water_supply: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      transportation: 'bg-gray-100 text-gray-800 border-gray-200',
      drought_monitoring: 'bg-red-100 text-red-800 border-red-200',
      infrastructure: 'bg-pink-100 text-pink-800 border-pink-200'
    }
    return colorMap[category] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getCategoryText = (category: string) => {
    const categoryMap: Record<string, string> = {
      weather: '날씨',
      environment: '환경',
      agriculture: '농업',
      fisheries: '수산',
      wildfire: '산불',
      energy: '에너지',
      water_supply: '수자원',
      transportation: '교통',
      drought_monitoring: '가뭄모니터링',
      infrastructure: '인프라'
    }
    return categoryMap[category] || category
  }

  const getDocumentTypeText = (documentType: string) => {
    const documentTypeMap: Record<string, string> = {
      CLIMATE_IMPACT_INDUSTRY: '기후 영향 산업 분야',
      RESOURCE_ENVIRONMENTAL_MANAGEMENT: '자원 및 환경 관리',
      DISASTER_CLIMATE_RISK: '재난 및 기후 리스크',
      SOCIO_ECONOMIC_IMPACT: '사회/경제적 영향',
      REGIONAL_EXTERNAL_REFERENCE: '지역/외부 참조 정보',
      OTHERS: '기타'
    }
    return documentTypeMap[documentType] || documentType
  }

  const getSubjectDomainText = (subjectDomain: string) => {
    const subjectDomainMap: Record<string, string> = {
      CLIMATE_IMPACT_INDUSTRY: '기후 영향 산업 분야',
      RESOURCE_ENVIRONMENTAL_MANAGEMENT: '자원 및 환경 관리',
      DISASTER_CLIMATE_RISK: '재난 및 기후 리스크',
      SOCIO_ECONOMIC_IMPACT: '사회/경제적 영향',
      REGIONAL_EXTERNAL_REFERENCE: '지역/외부 참조 정보',
      OTHERS: '기타'
    }
    return subjectDomainMap[subjectDomain] || subjectDomain
  }

  return (
    <div className="py-6 first:pt-0 border-t border-gray-100 first:border-0">
      <div className="mb-3">
        <div className="flex items-start justify-between mb-2">
          <h3 
            className="text-lg font-medium text-gray-900 flex-1 mr-4 hover:text-blue-600 cursor-pointer"
            onClick={() => window.open(`/openapi-detail/${data.id}`, '_blank')}
          >
            {data.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(data.status)}`}>
              {getStatusText(data.status)}
            </span>
            {/* <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(data.category)}`}>
              {getCategoryText(data.category)}
            </span> */}
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3">{data.description}</p>
      </div>
      
      <div className="flex flex-wrap text-sm text-gray-500 gap-x-4 gap-y-2 mb-4">
        <div className="flex items-center gap-1">
          <GlobeIcon className="w-4 h-4" />
          {data.provider}
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon className="w-4 h-4" />
          수정일: {new Date(data.updatedAt).toLocaleDateString('ko-KR')}
        </div>
        <div className="flex items-center gap-1">
          <ShieldIcon className="w-4 h-4" />
          {data.authentication}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs">출처: {data.source}</span>
        </div>
      </div>

      {/* 문서 유형과 주제 영역 정보 추가 */}
      <div className="flex gap-2 mb-4">
        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded border">
          문서유형: {getDocumentTypeText(data.documentType)}
        </span>
        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded border">
          주제영역: {getSubjectDomainText(data.subjectDomain)}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
            {data.responseFormat}
          </span>
          {data.rateLimit && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
              {data.rateLimit}
            </span>
          )}
        </div>
        
        <a
          href={data.apiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
        >
          <ExternalLinkIcon className="w-4 h-4" />
          API 문서
        </a>
      </div>
    </div>
  )
}
