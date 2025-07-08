import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router'
import { SearchPage } from './pages/SearchPage'
import { SearchResultsPage } from './pages/SearchResultsPage'
import { DetailView } from './components/DetailView'
import { CreateForm } from './components/CreateForm'

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/create" element={<CreateForm />} />
        <Route
          path="/detail/:id"
          element={
            <DetailView
              data={{
                id: 1,
                title: '한국농어촌공사_가뭄지도 정보',
                provider: '한국농어촌공사',
                manager: '수질원',
                date: '2025-03-13',
                views: 6260,
                downloads: 3310,
                updateFrequency: 18,
                keywords: '농업용수,저수지수위,가뭄정보',
                formats: ['CSV', 'JSON', 'XML'],
              }}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
