import React from 'react'
import { DownloadIcon } from 'lucide-react'

export function DetailView({ data }) {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-medium mb-4">{data.title}</h1>
        <p className="text-gray-600 mb-6">{data.description}</p>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          <DownloadIcon className="w-4 h-4" />
          CSV {data.title} 자료 다운로드
        </button>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-medium mb-4">파일데이터 정보</h2>
        <div className="border rounded-lg bg-white overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium w-1/4">
                  파일데이터명
                </td>
                <td className="py-3 px-4">{data.title}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">분류체계</td>
                <td className="py-3 px-4">농림 - 농업·농촌</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">제공기관</td>
                <td className="py-3 px-4">{data.provider}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">관리부서</td>
                <td className="py-3 px-4">{data.manager}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">확장자</td>
                <td className="py-3 px-4">{data.formats.join(', ')}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">등록일</td>
                <td className="py-3 px-4">{data.date}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">수정일</td>
                <td className="py-3 px-4">{data.date}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">갱신</td>
                <td className="py-3 px-4">{data.updateFrequency}일</td>
              </tr>
              <tr>
                <td className="py-3 px-4 bg-gray-50 font-medium">조회수</td>
                <td className="py-3 px-4">{data.views}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
