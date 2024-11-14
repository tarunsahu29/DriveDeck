import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import Header from './components/Header'
import { AuthProvider } from './context/AuthContext'
import CreateProduct from './pages/home/CreateProduct'
import ProductDetailPage from './pages/home/ProductDetailPage'
import SearchResults from './pages/SearchResults'
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/car/:id" element={<ProductDetailPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
