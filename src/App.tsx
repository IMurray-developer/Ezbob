import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { SearchProvider } from './context/SearchContext'
import PostPage from './pages/PostPage'

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="post/:id" element={<PostPage />} />
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  )
}

export default App
