import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UploadIcon, FileIcon, XIcon, AlertCircleIcon } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1'

interface FileItem {
  id: number
  originalFilename: string
  filePath: string
  fileSize: number
  createdAt: string
  extension?: { id: number; name: string }
  downloadUrl?: string
}

interface DetailData {
  id: number
  title: string
  description: string
  author: string
  authorOrganization: string
  department: string
  createdAt: string
  updatedAt: string
  views: number
  classification?: { id: number; name: string }
  serviceType?: { id: number; name: string }
  files?: FileItem[]
}

export function EditForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    documentType: '',
    subjectDomain: '',
    source: '',
    provider: '',
    manager: '',
    description: '',
    password: '',
    files: [] as File[],
  })
  
  const [errors, setErrors] = useState<{
    title?: string
    documentType?: string
    subjectDomain?: string
    source?: string
    provider?: string
    manager?: string
    description?: string
    files?: string
    password?: string
  }>({})
  
  const [showFileTypeAlert, setShowFileTypeAlert] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 기존 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/articles/${id}`)
        if (!response.ok) {
          throw new Error('데이터를 불러오지 못했습니다.')
        }
        const json = await response.json()
        const data: DetailData = json.data
        
        // 기존 데이터로 폼 초기화
        setFormData({
          title: data.title || '',
          documentType: data.serviceType?.name || '',
          subjectDomain: data.classification?.name || '',
          source: '', // 기존 데이터에 없을 수 있음
          provider: data.authorOrganization || '',
          manager: data.department || '',
          description: data.description || '',
          password: '', // 비밀번호는 비활성화
          files: [],
        })
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터 로드 중 오류가 발생했습니다.')
        setLoading(false)
      }
    }
    
    if (id) {
      loadData()
    }
  }, [id])

  const validateForm = () => {
    const newErrors: typeof errors = {}
    if (!formData.title.trim()) {
      newErrors.title = '파일데이터명을 입력해주세요.'
    } else if (formData.title.trim().length < 2) {
      newErrors.title = '파일데이터명은 2자 이상 입력해주세요.'
    }
    if (!formData.documentType) {
      newErrors.documentType = '문서 유형을 선택해주세요.'
    }
    if (!formData.subjectDomain) {
      newErrors.subjectDomain = '주제 영역을 선택해주세요.'
    }
    if (!formData.source) {
      newErrors.source = '출처를 선택해주세요.'
    }
    if (!formData.provider.trim()) {
      newErrors.provider = '제공기관을 입력해주세요.'
    }
    if (!formData.manager.trim()) {
      newErrors.manager = '관리부서를 입력해주세요.'
    }
    if (!formData.description.trim()) {
      newErrors.description = '설명을 입력해주세요.'
    } else if (formData.description.trim().length < 10) {
      newErrors.description = '설명은 10자 이상 입력해주세요.'
    }
    if (!formData.password.trim()) {
      newErrors.password = '임시 비밀번호를 입력해주세요.'
    } else if (formData.password.trim().length < 4) {
      newErrors.password = '비밀번호는 4자 이상 입력해주세요.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    try {
      // request 객체 생성
      const requestPayload = {
        title: formData.title,
        documentType: formData.documentType,
        subjectDomain: formData.subjectDomain,
        source: formData.source,
        description: formData.description,
        author: formData.provider,
        authorOrganization: formData.provider,
        department: formData.manager,
        tempPassword: formData.password,
        documentTypeId: documentTypeMap[formData.documentType] || null,
        subjectDomainId: subjectDomainMap[formData.subjectDomain] || null,
      }
      
      // form-data 생성
      const fd = new FormData()
      const json = JSON.stringify(requestPayload);
      const blob = new Blob([json], { type: 'application/json' });
      
      fd.append('request', blob)
      formData.files.forEach(file => {
        fd.append('files', file)
      })
      
      const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
        method: 'PATCH',
        body: fd,
      })
      
      if (res.ok) {
        alert('수정이 완료되었습니다!')
        navigate(`/detail/${id}`)
      } else {
        const errText = await res.text()
        alert('수정에 실패했습니다.\n' + errText)
      }
    } catch (err) {
      alert('오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateFileType = (file: File) => {
    const allowedTypes = ['application/pdf']
    return allowedTypes.includes(file.type)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    const invalidFiles = newFiles.filter(file => !validateFileType(file))
    if (invalidFiles.length > 0) {
      setShowFileTypeAlert(true)
      const validFiles = newFiles.filter(file => validateFileType(file))
      setFormData({
        ...formData,
        files: [...formData.files, ...validFiles],
      })
    } else {
      setFormData({
        ...formData,
        files: [...formData.files, ...newFiles],
      })
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    const newFiles = Array.from(e.dataTransfer.files)
    if (newFiles.length > 0) {
      const invalidFiles = newFiles.filter(file => !validateFileType(file))
      if (invalidFiles.length > 0) {
        setShowFileTypeAlert(true)
        const validFiles = newFiles.filter(file => validateFileType(file))
        setFormData({
          ...formData,
          files: [...formData.files, ...validFiles],
        })
      } else {
        setFormData({
          ...formData,
          files: [...formData.files, ...newFiles],
        })
      }
    }
  }
  
  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }
  
  const removeFile = (index: number) => {
    setFormData({
      ...formData,
      files: formData.files.filter((_, i) => i !== index),
    })
  }
  
  const removeAllFiles = () => {
    setFormData({
      ...formData,
      files: [],
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  const clearFieldError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  // 문서 유형 및 주제 영역 value-ID 매핑
  const documentTypeMap: Record<string, number> = {
    report: 1,
    survey_data: 2,
    guideline: 3,
    manual: 4,
    statistical_data: 5,
    program: 6,
    thesis: 7,
    research_data: 8,
    others: 9,
  }
  
  const subjectDomainMap: Record<string, number> = {
    agriculture: 1,
    ecosystem: 2,
    energy: 3,
    wildfire: 4,
    water_supply: 5,
    sanitation: 6,
    industry: 7,
    socio_economy: 8,
    climate_change: 9,
    drought_monitoring: 10,
    international: 11,
    environment: 12,
    livestock: 13,
    fisheries: 14,
    others: 15,
  }

  if (loading) return <div className="max-w-3xl mx-auto py-8 px-4">로딩 중...</div>
  if (error) return <div className="max-w-3xl mx-auto py-8 px-4 text-red-500">{error}</div>

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-medium mb-8">데이터 수정</h1>
      {showFileTypeAlert && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircleIcon className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">
                지원하지 않는 파일 형식
              </h3>
              <p className="mt-1 text-sm text-red-700">
                PDF 파일만 업로드 가능합니다. 다른 형식의 파일은 자동으로 제외되었습니다.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowFileTypeAlert(false)}
              className="text-red-400 hover:text-red-600"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            파일데이터명
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => {
              setFormData({
                ...formData,
                title: e.target.value,
              })
              clearFieldError('title')
            }}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.title ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>
      
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제공기관
          </label>
          <input
            type="text"
            value={formData.provider}
            onChange={(e) => {
              setFormData({
                ...formData,
                provider: e.target.value,
              })
              clearFieldError('provider')
            }}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.provider ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          />
          {errors.provider && (
            <p className="mt-1 text-sm text-red-600">{errors.provider}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            관리부서
          </label>
          <input
            type="text"
            value={formData.manager}
            onChange={(e) => {
              setFormData({
                ...formData,
                manager: e.target.value,
              })
              clearFieldError('manager')
            }}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.manager ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          />
          {errors.manager && (
            <p className="mt-1 text-sm text-red-600">{errors.manager}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            설명
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => {
              setFormData({
                ...formData,
                description: e.target.value,
              })
              clearFieldError('description')
            }}
            className={`w-full px-3 py-2 border rounded-md h-32 ${
              errors.description ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
        
        {/* 문서 유형, 주제 영역, 출처 select */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-2">문서 유형</label>
            <select
              value={formData.documentType}
              onChange={e => {
                setFormData({ ...formData, documentType: e.target.value })
                clearFieldError('documentType')
              }}
              className={`w-full px-3 py-2 border rounded-md bg-white ${errors.documentType ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            >
              <option value="">문서 유형 선택</option>
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
            {errors.documentType && (
              <p className="mt-1 text-sm text-red-600">{errors.documentType}</p>
            )}
          </div>
          <div className="md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-2">주제 영역</label>
            <select
              value={formData.subjectDomain}
              onChange={e => {
                setFormData({ ...formData, subjectDomain: e.target.value })
                clearFieldError('subjectDomain')
              }}
              className={`w-full px-3 py-2 border rounded-md bg-white ${errors.subjectDomain ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            >
              <option value="">주제 영역 선택</option>
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
            {errors.subjectDomain && (
              <p className="mt-1 text-sm text-red-600">{errors.subjectDomain}</p>
            )}
          </div>
          <div className="md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-2">출처</label>
            <select
              value={formData.source}
              onChange={e => {
                setFormData({ ...formData, source: e.target.value })
                clearFieldError('source')
              }}
              className={`w-full px-3 py-2 border rounded-md bg-white ${errors.source ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            >
              <option value="">출처 선택</option>
              <option value="domestic">국내</option>
              <option value="foreign">해외</option>
            </select>
            {errors.source && (
              <p className="mt-1 text-sm text-red-600">{errors.source}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            임시 비밀번호
          </label>
          <div className="space-y-1">
            <input
              type="password"
              value={formData.password}
              onChange={e => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
                clearFieldError('password')
              }}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="데이터 수정/삭제 시 사용할 비밀번호를 입력하세요"
            />
            <p className="text-xs text-gray-500">
              데이터 수정/삭제 시 사용할 비밀번호를 입력하세요.
            </p>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            파일 업로드
          </label>
          {errors.files && (
            <p className="mb-2 text-sm text-red-600">{errors.files}</p>
          )}
          {formData.files.length === 0 ? (
            <div
              className={`w-full border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-700">
                  파일을 드래그하여 업로드하거나
                </p>
                <p className="text-sm text-gray-500">
                  클릭하여 파일을 선택하세요 (PDF 파일만 가능)
                </p>
                <button
                  type="button"
                  onClick={handleFileSelect}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  파일 선택
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                multiple
              />
            </div>
          ) : (
            <div className="w-full border border-gray-300 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">
                  선택된 파일 ({formData.files.length}개)
                </h3>
                <button
                  type="button"
                  onClick={removeAllFiles}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  모두 제거
                </button>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {formData.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileIcon className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleFileSelect}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + 파일 추가
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(`/detail/${id}`)}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
            disabled={isSubmitting}
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? '수정 중...' : '수정하기'}
          </button>
        </div>
      </form>
    </div>
  )
} 