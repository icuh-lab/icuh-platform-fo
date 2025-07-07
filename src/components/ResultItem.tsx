import React from 'react'
import { DownloadIcon } from 'lucide-react'
import { useNavigate } from 'react-router'

export function ResultItem({ data }) {
  const navigate = useNavigate()
  return (
    <div className="py-6 first:pt-0 border-t border-gray-100 first:border-0">
      <div className="mb-3">
        <h3
          className="text-lg mb-1 hover:text-blue-600 cursor-pointer"
          onClick={() => navigate(`/detail/${data.id}`)}
        >
          <span>{data.title.split('_')[0]}</span>
          <span className="text-gray-500">_{data.title.split('_')[1]}</span>
        </h3>
        <div className="flex gap-1">
          {data.formats.map((format) => (
            <span key={format} className="text-xs text-gray-500">
              {format}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap text-sm text-gray-500 gap-x-4 gap-y-1 mb-4">
        <div>{data.provider}</div>
        <div>수정일: {data.date}</div>
        <div>조회수: {data.views}</div>
        <div>다운로드: {data.downloads}</div>
        {data.updateFrequency && <div>갱신: {data.updateFrequency}일</div>}
      </div>
      <div className="flex gap-2">
        {data.formats.map((format) => (
          <button
            key={format}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
          >
            {format} 다운로드
          </button>
        ))}
      </div>
    </div>
  )
}
