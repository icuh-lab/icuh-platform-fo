import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router'
import { SearchResultsPage } from './pages/SearchResultsPage'
import DetailPage from './pages/DetailPage'
import EditPage from './pages/EditPage'
import { CreateForm } from './components/CreateForm'
import { OpenAPIDetailView } from './components/OpenAPIDetailView'

// Mock OpenAPI 데이터 (1번: 고랭지배추_주산지_지도 정보)
const mockOpenAPIData = [
  {
    id: 1,
    title: '가뭄에 의한 농산물(노지작물) 도매가격 변동영향 분석_고랭지배추_주산지_지도 정보 API',
    description: '고랭지배추 주산지의 상세 지도 정보를 제공하여 가뭄으로 인한 농산물 생산지역 영향 분석 및 지역별 생산량 변화 추적에 활용할 수 있는 API',
    apiUrl: 'https://api.icuhlab.com/v1/drought/agriculture/cabbage/highland/map',
    provider: '(재)인프라재난관리진흥원',
    category: 'agriculture',
    documentType: 'statistical_data',
    subjectDomain: 'agriculture',
    source: '(재)인프라재난관리진흥원',
    updatedAt: '2024-01-15T10:30:00Z',
    status: 'active' as const,
    responseFormat: 'JSON',
    rateLimit: '1000 requests/hour',
    authentication: 'API Key'
  }
]

export function App() {
  return (
    <Router>
      <Routes>
        {/* 최상단 루트: 검색 리스트 페이지 */}
        <Route path="/" element={<SearchResultsPage />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/openapi-detail/:id" element={<OpenAPIDetailView data={mockOpenAPIData[0]} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
