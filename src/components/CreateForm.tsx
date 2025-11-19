import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadIcon, FileIcon, XIcon, AlertCircleIcon } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_URL

export function CreateForm() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    documentType: '', // 추가
    subjectDomain: '', // 추가
    source: '', // 출처 추가
    provider: '',
    manager: '',
    author: '', // 작성자 추가
    description: '',
    password: '',
    files: [] as File[],
  })
  
  const [errors, setErrors] = useState<{
    title?: string
    documentType?: string // 추가
    subjectDomain?: string // 추가
    source?: string // 출처 추가
    provider?: string
    manager?: string
    author?: string // 작성자 추가
    description?: string
    password?: string
    files?: string
  }>({})
  
  const [showFileTypeAlert, setShowFileTypeAlert] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: typeof errors = {}
    if (!formData.title.trim()) {
      newErrors.title = '파일데이터명을 입력해주세요.'
    } else if (formData.title.trim().length < 2) {
      newErrors.title = '파일데이터명은 2자 이상 입력해주세요.'
    }
    if (!formData.documentType) {
      newErrors.documentType = '문서 유형을 선택해주세요.'
    } else if (!documentTypeMap[formData.documentType]) {
      newErrors.documentType = '올바른 문서 유형을 선택해주세요.'
    }
    if (!formData.subjectDomain) {
      newErrors.subjectDomain = '주제 영역을 선택해주세요.'
    } else if (!subjectDomainMap[formData.subjectDomain]) {
      newErrors.subjectDomain = '올바른 주제 영역을 선택해주세요.'
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
    if (!formData.author.trim()) {
      newErrors.author = '작성자를 입력해주세요.'
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
    if (formData.files.length === 0) {
      newErrors.files = '최소 1개 이상의 파일을 업로드해주세요.'
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
        author: formData.author, // 작성자
        authorOrganization: formData.provider, // 제공기관
        department: formData.manager, // 관리부서
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
      const res = await fetch(`${API_BASE_URL}/api/v1/articles`, {
        method: 'POST',
        body: fd,
      })
      if (res.ok) {
        alert('등록 신청이 완료되었습니다!')
        navigate(-1)
      } else {
        const errText = await res.text()
        alert('등록 신청에 실패했습니다.\n' + errText)
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
    RESEARCH_SURVEY: 1,
    POLICY_STANDARD: 2,
    REPORT: 3,
    DATA_TECHNICAL: 4,
    PLANNING_PROPOSAL: 5,
    OTHERS: 6
  }
  const subjectDomainMap: Record<string, number> = {
    CLIMATE_IMPACT_INDUSTRY: 1,
    RESOURCE_ENVIRONMENTAL_MANAGEMENT: 2,
    DISASTER_CLIMATE_RISK: 3,
    SOCIO_ECONOMIC_IMPACT: 4,
    REGIONAL_EXTERNAL_REFERENCE: 5,
    OTHERS: 6
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-medium mb-8">새 데이터 등록</h1>
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
            작성자
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => {
              setFormData({
                ...formData,
                author: e.target.value,
              })
              clearFieldError('author')
            }}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.author ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-600">{errors.author}</p>
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
        {/* 문서 유형, 주제 영역, 출처 select 추가 */}
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
              <option value="RESEARCH_SURVEY">연구/조사 자료</option>
              <option value="POLICY_STANDARD">정책/기준 문서</option>
              <option value="REPORT">보고서</option>
              <option value="DATA_TECHNICAL">데이터/기술 자료</option>
              <option value="PLANNING_PROPOSAL">기획/계획 문서</option>
              <option value="OTHERS">기타</option>
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
              <option value="CLIMATE_IMPACT_INDUSTRY">기후 영향 산업 분야</option>
              <option value="RESOURCE_ENVIRONMENTAL_MANAGEMENT">자원 및 환경 관리</option>
              <option value="DISASTER_CLIMATE_RISK">재난 및 기후 리스크</option>
              <option value="SOCIO_ECONOMIC_IMPACT">사회/경제적 영향</option>
              <option value="REGIONAL_EXTERNAL_REFERENCE">지역/외부 참조 정보</option>
              <option value="OTHERS">기타</option>
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
              onChange={(e) => {
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
              등록 후 데이터 수정이나 삭제 요청 시 필요합니다. 안전한 곳에 보관해주세요.
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
            onClick={() => navigate(-1)}
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
            {isSubmitting ? '등록 중...' : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  )
}
