import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DownloadIcon, FileIcon } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_URL

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

function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function DetailView({ data }: { data: DetailData }) {
  const navigate = useNavigate()
  // 확장자 중복 없이 추출
  const uniqueExtensions = Array.from(new Set((data.files || []).map((f: FileItem) => f.extension?.name?.toLowerCase())))

  // 수정 요청 모달 상태
  const [showEditModal, setShowEditModal] = useState(false)
  const [editPassword, setEditPassword] = useState('')
  const [editReason, setEditReason] = useState('')
  const [editError, setEditError] = useState('')
  const [isEditSubmitting, setIsEditSubmitting] = useState(false)

  // 삭제 요청 모달 상태
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteReason, setDeleteReason] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [isDeleteSubmitting, setIsDeleteSubmitting] = useState(false)

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEditError('')
    if (!editPassword.trim()) {
      setEditError('비밀번호를 입력해주세요.')
      return
    }
    if (!editReason.trim()) {
      setEditError('사유를 입력해주세요.')
      return
    }
    setIsEditSubmitting(true)
    
    try {
      const requestPayload = {
        password: editPassword,
        reason: editReason
      }
      
      const response = await fetch(`${API_BASE_URL}/api/v1/articles/${data.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload)
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `요청 실패: ${response.status}`)
      }
      
      // 성공 시 모달 닫기 및 상태 초기화
      setShowEditModal(false)
      setEditPassword('')
      setEditReason('')
      alert('수정 요청이 전송되었습니다. 게시글 수정을 위해 수정 페이지로 이동합니다.')
      navigate(`/edit/${data.id}`)
    } catch (error) {
      console.error('Edit request failed:', error)
      setEditError(error instanceof Error ? error.message : '요청 전송 중 오류가 발생했습니다.')
    } finally {
      setIsEditSubmitting(false)
    }
  }

  const handleDeleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setDeleteError('')
    if (!deletePassword.trim()) {
      setDeleteError('비밀번호를 입력해주세요.')
      return
    }
    if (!deleteReason.trim()) {
      setDeleteError('사유를 입력해주세요.')
      return
    }
    setIsDeleteSubmitting(true)
    
    try {
      const requestPayload = {
        password: deletePassword,
        reason: deleteReason
      }
      
      const response = await fetch(`${API_BASE_URL}/api/v1/articles/${data.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload)
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `요청 실패: ${response.status}`)
      }
      
      // 성공 시 모달 닫기 및 상태 초기화
      setShowDeleteModal(false)
      setDeletePassword('')
      setDeleteReason('')
      alert('삭제 요청이 전송되었습니다.')
      navigate(`/search`)
    } catch (error) {
      console.error('Delete request failed:', error)
      setDeleteError(error instanceof Error ? error.message : '요청 전송 중 오류가 발생했습니다.')
    } finally {
      setIsDeleteSubmitting(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-medium mb-4">{data.title}</h1>
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h2 className="text-lg font-medium mb-2">문서 설명</h2>
          <div className="text-gray-700 text-base whitespace-pre-line">{data.description}</div>
        </div>
      </div>
      {/* 수정/삭제 요청 모달 */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm border">
            <h3 className="text-lg font-medium mb-4">데이터 수정 요청</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={e => setEditPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:border-blue-500"
                  placeholder="등록 시 사용한 비밀번호 입력"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사유</label>
                <textarea
                  value={editReason}
                  onChange={e => setEditReason(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md h-24 focus:border-blue-500"
                  placeholder="요청 사유를 입력하세요"
                />
              </div>
              {editError && <div className="text-red-600 text-sm">{editError}</div>}
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs"
                  onClick={() => setShowEditModal(false)}
                  disabled={isEditSubmitting}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                  disabled={isEditSubmitting}
                >
                  관리자에게 전송하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm border">
            <h3 className="text-lg font-medium mb-4">데이터 삭제 요청</h3>
            <form onSubmit={handleDeleteSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={e => setDeletePassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:border-blue-500"
                  placeholder="등록 시 사용한 비밀번호 입력"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사유</label>
                <textarea
                  value={deleteReason}
                  onChange={e => setDeleteReason(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md h-24 focus:border-blue-500"
                  placeholder="요청 사유를 입력하세요"
                />
              </div>
              {deleteError && <div className="text-red-600 text-sm">{deleteError}</div>}
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleteSubmitting}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                  disabled={isDeleteSubmitting}
                >
                  관리자에게 전송하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-black">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">파일데이터 정보</h2>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
              onClick={() => setShowEditModal(true)}
            >
              데이터 수정 요청
            </button>
            <button
              type="button"
              className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
              onClick={() => setShowDeleteModal(true)}
            >
              데이터 삭제 요청
            </button>
          </div>
        </div>
        <div className="border rounded-lg bg-white overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium w-1/4">파일데이터명</td>
                <td className="py-3 px-4">{data.title}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">분류체계</td>
                <td className="py-3 px-4">{data.classification?.name || '-'}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">서비스유형</td>
                <td className="py-3 px-4">{data.serviceType?.name || '-'}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">제공기관</td>
                <td className="py-3 px-4">{data.authorOrganization}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">관리부서</td>
                <td className="py-3 px-4">{data.department}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">작성자</td>
                <td className="py-3 px-4">{data.author}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">등록일</td>
                <td className="py-3 px-4">{data.createdAt ? new Date(data.createdAt).toLocaleString('ko-KR') : '-'}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 bg-gray-50 font-medium">수정일</td>
                <td className="py-3 px-4">{data.updatedAt ? new Date(data.updatedAt).toLocaleString('ko-KR') : '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* 첨부파일 다운로드 영역 */}
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-lg font-medium mb-4">첨부파일</h2>
        {data.files && data.files.length > 0 ? (
          <ul className="space-y-3">
            {data.files.map((file: FileItem) => (
              <li key={file.id} className="flex items-center justify-between bg-gray-50 rounded p-3">
                <div className="flex items-center gap-3">
                  <FileIcon className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium text-gray-900">{file.originalFilename}</div>
                    <div className="text-xs text-gray-500">
                      {file.extension?.name?.toUpperCase()} / {formatFileSize(file.fileSize)}
                    </div>
                  </div>
                </div>
                <a
                  href={`${API_BASE_URL}/api/v1/multipart-upload/files/${file.id}/download`}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DownloadIcon className="w-4 h-4" /> 다운로드
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 text-sm">첨부파일이 없습니다.</div>
        )}
      </div>
    </div>
  )
}
