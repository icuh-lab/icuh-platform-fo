import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function CreateForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    provider: '',
    manager: '',
    category: '',
    formats: [],
    updateFrequency: '',
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-medium mb-8">새 데이터 등록</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            파일데이터명
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            설명
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded-md h-32"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제공기관
            </label>
            <input
              type="text"
              value={formData.provider}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  provider: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              관리부서
            </label>
            <input
              type="text"
              value={formData.manager}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  manager: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              분류체계
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">선택하세요</option>
              <option value="농림">농림 - 농업·농촌</option>
              <option value="공공행정">공공행정</option>
              <option value="환경기상">환경기상</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              갱신주기 (일)
            </label>
            <input
              type="number"
              value={formData.updateFrequency}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  updateFrequency: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제공 포맷
          </label>
          <div className="flex gap-4">
            {['CSV', 'JSON', 'XML'].map((format) => (
              <label key={format} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.formats.includes(format)}
                  onChange={(e) => {
                    const newFormats = e.target.checked
                      ? [...formData.formats, format]
                      : formData.formats.filter((f) => f !== format)
                    setFormData({
                      ...formData,
                      formats: newFormats,
                    })
                  }}
                  className="mr-2"
                />
                {format}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  )
}
