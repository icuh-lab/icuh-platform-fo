import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router'
import { SearchPage } from './pages/SearchPage'
import { SearchResultsPage } from './pages/SearchResultsPage'
import DetailPage from './pages/DetailPage'
import { CreateForm } from './components/CreateForm'

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
