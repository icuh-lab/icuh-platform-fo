import React, { useState } from 'react'
import { ExternalLinkIcon, GlobeIcon, ShieldIcon, ClockIcon, CodeIcon, FileTextIcon, DatabaseIcon, PlayIcon } from 'lucide-react'
import type { OpenAPIResult } from '../types/search'

interface OpenAPIDetailViewProps {
  data: OpenAPIResult
}

export function OpenAPIDetailView({ data }: OpenAPIDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'documentation' | 'examples' | 'schema'>('overview')

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200'
  }

  const getStatusText = (status: string) => {
    return status === 'active' ? '활성' : '비활성'
  }

  const getDocumentTypeText = (documentType: string) => {
    const documentTypeMap: Record<string, string> = {
      RESEARCH_SURVEY: '연구/조사 자료',
      POLICY_STANDARD: '정책/기준 문서',
      REPORT: '보고서',
      DATA_TECHNICAL: '데이터/기술 자료',
      PLANNING_PROPOSAL: '기획/계획 문서',
      OTHERS: '기타'
    }
    return documentTypeMap[documentType] || documentType
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{data.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
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
                <DatabaseIcon className="w-4 h-4" />
                출처: {data.source}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-3 py-1.5 rounded text-sm font-medium border ${getStatusColor(data.status)}`}>
              {getStatusText(data.status)}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded text-sm font-medium border bg-blue-100 text-blue-800 border-blue-200">
              {getDocumentTypeText(data.documentType)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded border">
            {data.responseFormat}
          </span>
          {data.rateLimit && (
            <span className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded border">
              {data.rateLimit}
            </span>
          )}
          <a
            href={data.apiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <ExternalLinkIcon className="w-4 h-4" />
            API 문서
          </a>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FileTextIcon className="w-4 h-4" />
            개요
          </button>
          <button
            onClick={() => setActiveTab('documentation')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'documentation'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <CodeIcon className="w-4 h-4" />
            API 문서
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'examples'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <PlayIcon className="w-4 h-4" />
            사용 예시
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'schema'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <DatabaseIcon className="w-4 h-4" />
            응답 스키마
          </button>
        </nav>
      </div>

      {/* 탭 콘텐츠 */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">API 개요</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">기능 설명</h4>
                <p className="text-gray-600">
                  이 API는 가뭄으로 인한 농산물 생산지역 영향 분석을 위한 고랭지배추 주산지의 상세 지도 정보를 제공합니다. 
                  지역별 생산량 변화 추적과 가뭄 피해 영향도를 시각적으로 분석할 수 있어 농업 정책 수립 및 위험 관리에 활용됩니다.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">주요 특징</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>전국 고랭지배추 주산지의 상세 지도 정보 제공</li>
                  <li>가뭄 시기별 생산지역 영향도 분석</li>
                  <li>지역별 생산량 변화 추적 및 모니터링</li>
                  <li>농업 정책 수립을 위한 데이터 기반 제공</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documentation' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">API 엔드포인트</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Base URL</h4>
                <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                  https://api.icuhlab.com/v1/drought/agriculture/cabbage/highland
                </code>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">주산지 지도 정보 조회</h4>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">GET</span>
                    <code className="text-sm font-mono">/map</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">고랭지배추 주산지의 지도 정보를 조회합니다.</p>
                  
                  <h5 className="font-medium text-gray-900 mb-2">요청 파라미터</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-gray-200 px-2 py-1 rounded">region</code>
                      <span className="text-sm text-gray-600">지역 코드 (선택)</span>
                      <span className="text-xs text-gray-500">예: 강원도, 경상북도</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-gray-200 px-2 py-1 rounded">year</code>
                      <span className="text-sm text-gray-600">연도 (선택)</span>
                      <span className="text-xs text-gray-500">기본값: 현재 연도</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'examples' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">사용 예시</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">cURL</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <div>curl -X GET \</div>
                  <div className="ml-4">-H "Authorization: Bearer YOUR_API_KEY" \</div>
                  <div className="ml-4">"https://api.icuhlab.com/v1/drought/agriculture/cabbage/highland/map?region=강원도&year=2024"</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">JavaScript (Node.js)</h4>
                <div className="bg-gray-900 text-yellow-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <div>const axios = require('axios');</div>
                  <div className="mt-2">const response = await axios.get(</div>
                  <div className="ml-4">'https://api.icuhlab.com/v1/drought/agriculture/cabbage/highland/map',</div>
                  <div className="ml-4">{'{'}</div>
                  <div className="ml-8">params: {'{'}</div>
                  <div className="ml-12">region: '강원도',</div>
                  <div className="ml-12">year: 2024</div>
                  <div className="ml-8">{'}'},</div>
                  <div className="ml-8">headers: {'{'}</div>
                  <div className="ml-12">'Authorization': 'Bearer YOUR_API_KEY'</div>
                  <div className="ml-8">{'}'}</div>
                  <div className="ml-4">{'}'}</div>
                  <div>);</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Python</h4>
                <div className="bg-gray-900 text-blue-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <div>import requests</div>
                  <div className="mt-2">response = requests.get(</div>
                  <div className="ml-4">'https://api.icuhlab.com/v1/drought/agriculture/cabbage/highland/map',</div>
                  <div className="ml-4">params={'{'}</div>
                  <div className="ml-8">'region': '강원도',</div>
                  <div className="ml-8">'year': 2024</div>
                  <div className="ml-4">{'}'},</div>
                  <div className="ml-4">headers={'{'}</div>
                  <div className="ml-8">'Authorization': 'Bearer YOUR_API_KEY'</div>
                  <div className="ml-4">{'}'}</div>
                  <div>);</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'schema' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">응답 스키마</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">성공 응답 (200)</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <div>{'{'}</div>
                  <div className="ml-4">"status": 200,</div>
                  <div className="ml-4">"message": "success",</div>
                  <div className="ml-4">"data": {'{'}</div>
                  <div className="ml-8">"regions": [</div>
                  <div className="ml-12">{'{'}</div>
                  <div className="ml-16">"regionCode": "GW",</div>
                  <div className="ml-16">"regionName": "강원도",</div>
                  <div className="ml-16">"coordinates": {'{'}</div>
                  <div className="ml-20">"lat": 37.8228,</div>
                  <div className="ml-20">"lng": 128.1555</div>
                  <div className="ml-16">{'}'},</div>
                  <div className="ml-16">"productionArea": 1250.5,</div>
                  <div className="ml-16">"unit": "ha",</div>
                  <div className="ml-16">"droughtLevel": "moderate",</div>
                  <div className="ml-16">"lastUpdated": "2024-01-15T10:30:00Z"</div>
                  <div className="ml-12">{'}'}</div>
                  <div className="ml-8">]</div>
                  <div className="ml-4">{'}'}</div>
                  <div>{'}'}</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">응답 필드 설명</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 border">필드명</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 border">타입</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 border">설명</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 text-sm font-mono bg-gray-50">regionCode</td>
                        <td className="px-4 py-2 text-sm text-gray-600">String</td>
                        <td className="px-4 py-2 text-sm text-gray-600">지역 코드 (GW: 강원도, GNB: 경상북도 등)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm font-mono bg-gray-50">regionName</td>
                        <td className="px-4 py-2 text-sm text-gray-600">String</td>
                        <td className="px-4 py-2 text-sm text-gray-600">지역명</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm font-mono bg-gray-50">coordinates</td>
                        <td className="px-4 py-2 text-sm text-gray-600">Object</td>
                        <td className="px-4 py-2 text-sm text-gray-600">위도(lat)와 경도(lng) 좌표</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm font-mono bg-gray-50">productionArea</td>
                        <td className="px-4 py-2 text-sm text-gray-600">Number</td>
                        <td className="px-4 py-2 text-sm text-gray-600">생산 면적 (헥타르)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm font-mono bg-gray-50">droughtLevel</td>
                        <td className="px-4 py-2 text-sm text-gray-600">String</td>
                        <td className="px-4 py-2 text-sm text-gray-600">가뭄 수준 (low, moderate, high, severe)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">에러 응답</h4>
                <div className="bg-gray-900 text-red-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <div>{'{'}</div>
                  <div className="ml-4">"status": 400,</div>
                  <div className="ml-4">"message": "Invalid region code",</div>
                  <div className="ml-4">"error": "REGION_NOT_FOUND"</div>
                  <div>{'}'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
