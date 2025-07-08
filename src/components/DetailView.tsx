import React from 'react'
import { DownloadIcon, FileIcon } from 'lucide-react'

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
  // 확장자 중복 없이 추출
  const uniqueExtensions = Array.from(new Set((data.files || []).map((f: FileItem) => f.extension?.name?.toLowerCase())))
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-medium mb-4">{data.title}</h1>
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h2 className="text-lg font-medium mb-2">문서 설명</h2>
          <div className="text-gray-700 text-base whitespace-pre-line">{data.description}</div>
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-black">
        <h2 className="text-lg font-medium mb-4">파일데이터 정보</h2>
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
                <td className="py-3 px-4 bg-gray-50 font-medium">확장자</td>
                <td className="py-3 px-4">{uniqueExtensions.length > 0 ? uniqueExtensions.join(', ').toUpperCase() : '-'}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">등록일</td>
                <td className="py-3 px-4">{data.createdAt ? new Date(data.createdAt).toLocaleString('ko-KR') : '-'}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">수정일</td>
                <td className="py-3 px-4">{data.updatedAt ? new Date(data.updatedAt).toLocaleString('ko-KR') : '-'}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 bg-gray-50 font-medium">조회수</td>
                <td className="py-3 px-4">{data.views}</td>
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
                  href={file.filePath}
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
