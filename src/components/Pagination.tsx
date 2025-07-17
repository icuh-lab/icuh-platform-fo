import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  // 최대 5개 페이지 버튼만 노출 (ex: 3,4,5,6,7)
  const getPageNumbers = () => {
    const pages = []
    let start = Math.max(1, currentPage - 2)
    let end = Math.min(totalPages, currentPage + 2)
    if (end - start < 4) {
      if (start === 1) end = Math.min(totalPages, start + 4)
      if (end === totalPages) start = Math.max(1, end - 4)
    }
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  return (
    <nav className="flex justify-center mt-10">
      <ul className="inline-flex items-center gap-1">
        <li>
          <button
            className="px-3 py-1 rounded border text-sm disabled:text-gray-300"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            처음
          </button>
        </li>
        <li>
          <button
            className="px-3 py-1 rounded border text-sm disabled:text-gray-300"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전
          </button>
        </li>
        {getPageNumbers().map((page) => (
          <li key={page}>
            <button
              className={`px-3 py-1 rounded border text-sm ${page === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-blue-50'}`}
              onClick={() => onPageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className="px-3 py-1 rounded border text-sm disabled:text-gray-300"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </li>
        <li>
          <button
            className="px-3 py-1 rounded border text-sm disabled:text-gray-300"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            마지막
          </button>
        </li>
      </ul>
    </nav>
  )
} 