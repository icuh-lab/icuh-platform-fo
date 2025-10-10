import type { SearchRequest, SearchResponse, OpenAPIResult } from '../types/search'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1'

// 하드코딩된 OpenAPI 데이터 생성 함수 (가뭄 관련 API)
export const generateMockOpenAPIData = (query: string, filters: any): OpenAPIResult[] => {
  const mockData: OpenAPIResult[] = [
    // 가뭄에 의한 농산물(노지작물) 도매가격 변동영향 분석
    {
      id: 1,
      title: '가뭄에 의한 농산물(노지작물) 도매가격 변동영향 분석_고랭지배추_주산지_지도 정보 API',
      description: '고랭지배추 주산지의 상세 지도 정보를 제공하여 가뭄으로 인한 농산물 생산지역 영향 분석 및 지역별 생산량 변화 추적에 활용할 수 있는 API',
      apiUrl: 'https://api.ndmi.go.kr/v1/drought/agriculture/cabbage/highland/map',
      provider: '(재)인프라재난관리진흥원',
      category: 'agriculture',
      documentType: 'statistical_data',
      subjectDomain: 'agriculture',
      source: '국내',
      updatedAt: '2024-01-15T10:30:00Z',
      status: 'active',
      responseFormat: 'JSON',
      rateLimit: '1000 requests/hour',
      authentication: 'API Key'
    },
    {
      id: 2,
      title: '가뭄에 의한 농산물(노지작물) 도매가격 변동영향 분석_고랭지배추_월별 예상 도매 가격 및 변동률 API',
      description: '고랭지배추의 월별 예상 도매 가격과 가뭄으로 인한 변동률을 분석하여 시장 예측 및 가격 동향 모니터링에 활용할 수 있는 API',
      apiUrl: 'https://api.ndmi.go.kr/v1/drought/agriculture/cabbage/highland/price/forecast',
      provider: '(재)인프라재난관리진흥원',
      category: 'agriculture',
      documentType: 'statistical_data',
      subjectDomain: 'agriculture',
      source: '국내',
      updatedAt: '2024-01-14T15:45:00Z',
      status: 'active',
      responseFormat: 'JSON',
      rateLimit: '800 requests/hour',
      authentication: 'API Key'
    },
    {
      id: 3,
      title: '가뭄에 의한 농산물(노지작물) 도매가격 변동영향 분석_고랭지배추_월별 예상 도매 반입량 및 변동률 API',
      description: '고랭지배추의 월별 예상 도매 반입량과 가뭄으로 인한 변동률을 분석하여 공급량 예측 및 물량 계획 수립에 활용할 수 있는 API',
      apiUrl: 'https://api.ndmi.go.kr/v1/drought/agriculture/cabbage/highland/supply/forecast',
      provider: '(재)인프라재난관리진흥원',
      category: 'agriculture',
      documentType: 'statistical_data',
      subjectDomain: 'agriculture',
      source: '국내',
      updatedAt: '2024-01-13T09:20:00Z',
      status: 'active',
      responseFormat: 'JSON',
      rateLimit: '600 requests/hour',
      authentication: 'API Key'
    },
    {
      id: 4,
      title: '가뭄에 의한 농산물(노지작물) 도매가격 변동영향 분석_고랭지배추_농산물 도매가격 예상 변동률 달력 API',
      description: '고랭지배추의 농산물 도매가격 예상 변동률을 달력 형태로 제공하여 가뭄 시기별 가격 변동을 예측하고 계절적 가격 패턴을 분석할 수 있는 API',
      apiUrl: 'https://api.ndmi.go.kr/v1/drought/agriculture/cabbage/highland/price/calendar',
      provider: '(재)인프라재난관리진흥원',
      category: 'agriculture',
      documentType: 'statistical_data',
      subjectDomain: 'agriculture',
      source: '국내',
      updatedAt: '2024-01-12T14:15:00Z',
      status: 'active',
      responseFormat: 'JSON',
      rateLimit: '1200 requests/hour',
      authentication: 'API Key'
    },
    {
      id: 5,
      title: '가뭄에 의한 농산물(노지작물) 도매가격 변동영향 분석_고랭지배추_산지별 생산량_도매시장 반입량_추이 API',
      description: '고랭지배추의 산지별 생산량과 도매시장 반입량 추이를 분석하여 가뭄으로 인한 지역별 생산 영향을 파악하고 공급망 변화를 모니터링할 수 있는 API',
      apiUrl: 'https://api.ndmi.go.kr/v1/drought/agriculture/cabbage/highland/production/trend',
      provider: '(재)인프라재난관리진흥원',
      category: 'agriculture',
      documentType: 'statistical_data',
      subjectDomain: 'agriculture',
      source: '국내',
      updatedAt: '2024-01-11T11:30:00Z',
      status: 'active',
      responseFormat: 'JSON',
      rateLimit: '900 requests/hour',
      authentication: 'API Key'
    },
    {
      id: 6,
      title: '가뭄에 의한 농산물(노지작물) 도매가격 변동영향 분석_고랭지배추_산지별 평균 도매가격 추이 API',
      description: '고랭지배추의 산지별 평균 도매가격 추이를 분석하여 가뭄으로 인한 지역별 가격 변동을 모니터링하고 지역간 가격 격차를 분석할 수 있는 API',
      apiUrl: 'https://api.ndmi.go.kr/v1/drought/agriculture/cabbage/highland/price/trend',
      provider: '(재)인프라재난관리진흥원',
      category: 'agriculture',
      documentType: 'statistical_data',
      subjectDomain: 'agriculture',
      source: '국내',
      updatedAt: '2024-01-10T16:45:00Z',
      status: 'active',
      responseFormat: 'JSON',
      rateLimit: '700 requests/hour',
      authentication: 'API Key'
    },
    // 가뭄에 의한 다목적댐 수력발전량 변동영향 분석
    {
      id: 7,
      title: '가뭄에 의한 다목적댐 수력발전량 변동영향 분석_다목적댐_수력발전량_예상발전량_지도 API',
      description: '다목적댐의 수력발전량 예상발전량을 지도 형태로 제공하여 가뭄으로 인한 발전량 변동을 시각적으로 분석하고 지역별 발전량 분포를 파악할 수 있는 API',
      apiUrl: 'https://api.ndmi.go.kr/v1/drought/hydropower/dam/forecast/map',
      provider: '(재)인프라재난관리진흥원',
      category: 'energy',
      documentType: 'statistical_data',
      subjectDomain: 'energy',
      source: '국내',
      updatedAt: '2024-01-09T13:20:00Z',
      status: 'active',
      responseFormat: 'JSON',
      rateLimit: '500 requests/hour',
      authentication: 'API Key'
    },
    {
      id: 14,
      title: 'NASA 가뭄 모니터링 및 예측 API',
      description: 'NASA에서 제공하는 전 세계 가뭄 모니터링 데이터와 예측 정보를 실시간으로 제공하는 API',
      apiUrl: 'https://api.nasa.gov/v1/drought/monitoring',
      provider: 'NASA (National Aeronautics and Space Administration)',
      category: 'weather',
      documentType: 'monitoring_data',
      subjectDomain: 'drought_monitoring',
      source: '해외',
      updatedAt: '2024-01-20T08:00:00Z',
      status: 'active',
      responseFormat: 'JSON',
      rateLimit: '1000 requests/hour',
      authentication: 'API Key'
    },
    {
      id: 15,
      title: 'NOAA 기후 데이터 및 가뭄 지수 API',
      description: 'NOAA에서 제공하는 미국 및 전 세계 기후 데이터와 가뭄 지수를 분석할 수 있는 API',
      apiUrl: 'https://api.noaa.gov/v1/climate/drought',
      provider: 'NOAA (National Oceanic and Atmospheric Administration)',
      category: 'weather',
      documentType: 'statistical_data',
      subjectDomain: 'climate_change',
      source: '해외',
      updatedAt: '2024-01-19T12:30:00Z',
      status: 'active',
      responseFormat: 'JSON',
      rateLimit: '800 requests/hour',
      authentication: 'API Key'
    },
    {
      id: 8,
      title: '가뭄에 의한 다목적댐 수력발전량 변동영향 분석_다목적대_수력발전량_월별 예상 수력발전량 및 월평균 저수량 API',
      description: '다목적댐의 월별 예상 수력발전량과 월평균 저수량을 분석하여 가뭄으로 인한 발전량 변동을 예측하고 계절적 발전 패턴을 분석할 수 있는 API',
      apiUrl: 'https://api.ndmi.go.kr/v1/drought/hydropower/dam/monthly/forecast',
      provider: '(재)인프라재난관리진흥원',
      category: 'energy',
      documentType: 'statistical_data',
      subjectDomain: 'energy',
      source: '국내',
      updatedAt: '2024-01-08T10:15:00Z',
      status: 'active',
      responseFormat: 'JSON',
      rateLimit: '400 requests/hour',
      authentication: 'API Key'
    },
    {
      id: 9,
      title: '가뭄에 의한 다목적댐 수력발전량 변동영향 분석_다목적대_수력발전량_전년 동월 대비 수력발전량 및 변동률 API',
      description: '다목적댐의 전년 동월 대비 수력발전량과 변동률을 분석하여 가뭄으로 인한 발전량 변화를 비교 분석하고 연도별 발전량 추세를 파악할 수 있는 API',
      apiUrl: 'https://api.ndmi.go.kr/v1/drought/hydropower/dam/yearly/comparison',
      provider: '(재)인프라재난관리진흥원',
      category: 'energy',
      documentType: 'statistical_data',
      subjectDomain: 'energy',
      source: '국내',
      updatedAt: '2024-01-07T09:30:00Z',
      status: 'active',
      responseFormat: 'JSON',
      rateLimit: '600 requests/hour',
      authentication: 'API Key'
    },
    {
      id: 10,
      title: '가뭄에 의한 다목적댐 수력발전량 변동영향 분석_다목적댐_수력발전량_전월 대비 수력발전량 및 변동률 API',
      description: '다목적댐의 전월 대비 수력발전량과 변동률을 분석하여 가뭄으로 인한 단기 발전량 변동을 모니터링하고 월간 발전량 변화 추세를 파악할 수 있는 API',
      apiUrl: 'https://api.ndmi.go.kr/v1/drought/hydropower/dam/monthly/comparison',
      provider: '(재)인프라재난관리진흥원',
      category: 'energy',
      documentType: 'statistical_data',
      subjectDomain: 'energy',
      source: '국내',
      updatedAt: '2024-01-06T14:45:00Z',
      status: 'active',
      responseFormat: 'JSON',
      rateLimit: '800 requests/hour',
      authentication: 'API Key'
    },
    {
      id: 11,
      title: '가뭄에 의한 다목적댐 수력발전량 변동영향 분석_다목적댐_수력발전량_계획발전량 및 실적발전량 추이 API',
      description: '다목적댐의 계획발전량과 실적발전량 추이를 분석하여 가뭄으로 인한 발전 계획 대비 실제 성과를 비교하고 발전 효율성을 평가할 수 있는 API',
      apiUrl: 'https://api.ndmi.go.kr/v1/drought/hydropower/dam/planned/actual/trend',
      provider: '(재)인프라재난관리진흥원',
      category: 'energy',
      documentType: 'statistical_data',
      subjectDomain: 'energy',
      source: '국내',
      updatedAt: '2024-01-05T11:20:00Z',
      status: 'active',
      responseFormat: 'JSON',
      rateLimit: '700 requests/hour',
      authentication: 'API Key'
    },
    {
      id: 12,
      title: '가뭄에 의한 다목적댐 수력발전량 변동영향 분석_다목적댐_수력발전량_월평균 저수위 추이 API',
      description: '다목적댐의 월평균 저수위 추이를 분석하여 가뭄으로 인한 수위 변화와 발전량 영향 관계를 파악하고 수위별 발전량 상관관계를 분석할 수 있는 API',
      apiUrl: 'https://api.ndmi.go.kr/v1/drought/hydropower/dam/water-level/trend',
      provider: '(재)인프라재난관리진흥원',
      category: 'energy',
      documentType: 'statistical_data',
      subjectDomain: 'energy',
      source: '국내',
      updatedAt: '2024-01-04T16:30:00Z',
      status: 'active',
      responseFormat: 'JSON',
      rateLimit: '900 requests/hour',
      authentication: 'API Key'
    },
    {
      id: 13,
      title: '가뭄에 의한 다목적댐 수력발전량 변동영향 분석_다목적댐_수력발전량_월평균 저수량 추이 API',
      description: '다목적댐의 월평균 저수량 추이를 분석하여 가뭄으로 인한 수량 변화와 발전량 영향 관계를 파악하고 수량별 발전량 상관관계를 분석할 수 있는 API',
      apiUrl: 'https://api.ndmi.go.kr/v1/drought/hydropower/dam/water-volume/trend',
      provider: '(재)인프라재난관리진흥원',
      category: 'energy',
      documentType: 'statistical_data',
      subjectDomain: 'energy',
      source: '국내',
      updatedAt: '2024-01-03T10:15:00Z',
      status: 'active',
      responseFormat: 'JSON',
      rateLimit: '1000 requests/hour',
      authentication: 'API Key'
    }
  ]

  // 검색어와 필터에 따른 필터링
  let filteredData = mockData

  if (query) {
    filteredData = filteredData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.provider.toLowerCase().includes(query.toLowerCase())
    )
  }

  if (filters.subjectDomain) {
    const domainMapping: Record<string, string[]> = {
      'agriculture': ['agriculture'],
      'ecosystem': ['environment'],
      'energy': ['energy'],
      'wildfire': ['wildfire'],
      'water_supply': ['water_supply'],
      'sanitation': ['environment'],
      'industry': ['transportation'],
      'socio_economy': ['transportation'],
      'climate_change': ['weather', 'environment'],
      'drought_monitoring': ['water_supply'],
      'international': ['weather', 'environment'],
      'environment': ['environment'],
      'livestock': ['agriculture'],
      'fisheries': ['fisheries'],
      'others': ['weather', 'environment', 'agriculture', 'fisheries', 'wildfire', 'energy', 'water_supply', 'transportation']
    }
    
    const allowedCategories = domainMapping[filters.subjectDomain] || []
    if (allowedCategories.length > 0) {
      filteredData = filteredData.filter(item => 
        allowedCategories.includes(item.category)
      )
    }
  }

  if (filters.source) {
    if (filters.source === 'domestic') {
      filteredData = filteredData.filter(item => 
        item.source === '국내'
      )
    } else if (filters.source === 'foreign') {
      filteredData = filteredData.filter(item => 
        item.source === '해외'
      )
    }
  }

  return filteredData
}

export async function searchData(request: SearchRequest): Promise<SearchResponse> {
  const queryParams = new URLSearchParams()
  
  if (request.query) queryParams.append('query', request.query)
  if (request.documentType) queryParams.append('documentType', request.documentType)
  if (request.subjectDomain) queryParams.append('subjectDomain', request.subjectDomain)
  if (request.source) queryParams.append('source', request.source)
  if (request.page !== undefined) queryParams.append('page', request.page.toString())
  if (request.size) queryParams.append('size', request.size.toString())

  const response = await fetch(`${API_BASE_URL}/articles?${queryParams.toString()}`)
  
  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`)
  }
  
  return response.json()
}

// 통합 검색 함수 (파일 데이터 + OpenAPI 데이터)
export async function unifiedSearch(request: SearchRequest): Promise<{ fileData: SearchResponse, openAPIData: OpenAPIResult[] }> {
  try {
    // 파일 데이터 검색
    const fileDataResponse = await searchData(request)
    
    // OpenAPI 데이터 생성 (하드코딩)
    const openAPIData = generateMockOpenAPIData(request.query || '', {
      documentType: request.documentType,
      subjectDomain: request.subjectDomain,
      source: request.source
    })

  return {
      fileData: fileDataResponse,
      openAPIData
    }
  } catch (error) {
    console.error('Unified search error:', error)
    throw error
  }
} 