import React, { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  initialQuery?: string
}

export function SearchBar({ onSearch, initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(query)
  }


  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        placeholder="어떤 공공데이터를 찾으시나요?"
        className="w-full py-3 px-5 text-lg rounded-lg border-gray-100 bg-gray-50 focus:bg-white focus:border-gray-200 transition-colors"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 text-gray-400 hover:text-gray-600 flex items-center justify-center transition-colors"
      >
        <SearchIcon className="w-5 h-5" />
      </button>
    </form>
  )
}
